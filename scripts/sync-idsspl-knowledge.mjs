import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { deflateSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const knowledgePath = path.join(root, "src/data/idsspl-knowledge.json");
const templatePath = path.join(root, "infra/chatbot-api.yml");
const checking = process.argv.includes("--check");
const current = JSON.parse(fs.readFileSync(knowledgePath, "utf8"));
const sourceHashes = {};

// Parse literals only; never execute UI modules or include asset imports / private data.
function literal(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) return literal(node.expression);
  if (ts.isArrayLiteralExpression(node))
    return node.elements.map(literal).filter((x) => x !== undefined);
  if (ts.isObjectLiteralExpression(node))
    return Object.fromEntries(
      node.properties.flatMap((p) => {
        if (!ts.isPropertyAssignment(p)) return [];
        const value = literal(p.initializer);
        const key = ts.isStringLiteral(p.name) ? p.name.text : p.name.getText();
        return value === undefined ? [] : [[key, value]];
      }),
    );
  return undefined;
}

function read(file, variable) {
  const relative = `src/components/site/${file}.tsx`;
  const text = fs.readFileSync(path.join(root, relative), "utf8");
  sourceHashes[relative] = crypto
    .createHash("sha256")
    .update(text.replace(/\r\n/g, "\n"))
    .digest("hex");
  const source = ts.createSourceFile(
    relative,
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  let result;
  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      node.name.getText(source) === variable &&
      node.initializer
    )
      result = literal(node.initializer);
    ts.forEachChild(node, visit);
  }
  visit(source);
  if (!Array.isArray(result) || !result.length)
    throw new Error(`Missing published data: ${relative}:${variable}`);
  return result;
}

function pick(value, fields) {
  return Object.fromEntries(
    fields.filter((key) => value[key] !== undefined).map((key) => [key, value[key]]),
  );
}

const products = read("ProductCatalog", "products").map((product) => ({
  ...pick(product, [
    "id",
    "label",
    "shortDescription",
    "overview",
    "subProducts",
    "keyFeatures",
    "benefits",
    "faqs",
  ]),
  route: `/products#${product.id}`,
}));
if (
  products.length !== 6 ||
  products.some((p) => !p.subProducts.length || !p.keyFeatures.length || !p.faqs.length)
)
  throw new Error("Incomplete product snapshot");
const leadership = [...read("Leadership", "leaders"), ...read("Leadership", "chiefOfficers")].map(
  (person) => ({
    ...pick(person, ["id", "name", "role", "abbreviation", "focus", "functionName", "bio"]),
    ...(person.credentials
      ? { credentials: person.credentials.map((c) => pick(c, ["title", "label"])) }
      : {}),
    route: "/leadership",
  }),
);
const team = [...read("OurTeam", "functionLeads"), ...read("OurTeam", "teamMembers")].map(
  (person) => ({
    ...pick(person, ["id", "name", "role", "functionName", "group", "summary"]),
    route: "/team",
  }),
);
const data = {
  ...current,
  products,
  leadership,
  team,
  capabilities: read("AboutCompany", "strengths").map((x) => pick(x, ["title", "description"])),
  principles: read("AboutCompany", "principles"),
  publishedMetrics: read("HomeJourney", "trustMetrics").map((x) =>
    pick(x, ["value", "suffix", "label", "detail"]),
  ),
  publishedOutcomes: read("HomeJourney", "implementationStories").map((x) =>
    pick(x, ["institution", "location", "focus", "quote", "result"]),
  ),
  faqs: read("Faq", "faqs"),
  certifications: read("CertificateTrust", "certificates").map((x) =>
    pick(x, ["title", "description"]),
  ),
  socialLinks: read("Footer", "socialLinks").map((x) => pick(x, ["label", "href"])),
  navigation: read("Footer", "columns").flatMap((x) => x.links),
};
data.provenance = { ...data.provenance, sourceHashes };
if (JSON.stringify(sourceHashes) !== JSON.stringify(current.provenance.sourceHashes))
  data.lastUpdated = new Date().toISOString().slice(0, 10);
const serialized = JSON.stringify(data, null, 2) + "\n";

// CloudFormation inline Lambda cannot read frontend files. Embed a compressed,
// generated copy so both runtimes use the same reviewed JSON without an extra service.
// Both runtimes receive identical approved facts and model instructions.
const serverData = data;
const encoded = deflateSync(Buffer.from(JSON.stringify(serverData)), { level: 9 }).toString(
  "base64",
);
const generated = [
  "          # BEGIN GENERATED IDSSPL KNOWLEDGE (pnpm knowledge:sync)",
  "          KNOWLEDGE_DATA = json.loads(zlib.decompress(base64.b64decode(",
  ...encoded.match(/.{1,100}/g).map((line) => `              \"${line}\"`),
  "          )))",
  "          # END GENERATED IDSSPL KNOWLEDGE",
].join("\n");
const template = fs.readFileSync(templatePath, "utf8").replace(/\r\n/g, "\n");
const marker =
  /          # BEGIN GENERATED IDSSPL KNOWLEDGE[^\n]*\n[\s\S]*?          # END GENERATED IDSSPL KNOWLEDGE/;
const newTemplate = marker.test(template) ? template.replace(marker, () => generated) : template;
if (!marker.test(template))
  throw new Error("Knowledge embedding markers missing from chatbot template");
if (Buffer.byteLength(newTemplate) > 51_200)
  throw new Error(
    "Chatbot template is too large for direct deployment; package its code before expanding it further.",
  );
if (checking) {
  if (
    serialized !== fs.readFileSync(knowledgePath, "utf8").replace(/\r\n/g, "\n") ||
    template !== newTemplate
  )
    throw new Error("Chatbot knowledge is stale. Run pnpm knowledge:sync.");
} else {
  fs.writeFileSync(knowledgePath, serialized);
  fs.writeFileSync(templatePath, newTemplate);
}
console.log(
  `${checking ? "Verified" : "Updated"}: ${products.length} products, ${products.reduce((n, p) => n + p.subProducts.length, 0)} sub-products, ${leadership.length} leaders, ${team.length} team profiles.`,
);
