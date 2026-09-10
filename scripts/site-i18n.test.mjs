import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import ts from "typescript";

const projectRoot = process.cwd();
const languageCodes = ["hi", "mr", "ta", "gu"];

function readLanguageKeys(file, variableName) {
  const source = readFileSync(file, "utf8");
  const parsed = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let rootObject;

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === variableName
    ) {
      rootObject = ts.isAsExpression(node.initializer) ? node.initializer.expression : node.initializer;
    }
    ts.forEachChild(node, visit);
  }
  visit(parsed);
  assert.ok(rootObject && ts.isObjectLiteralExpression(rootObject), `${variableName} object is missing`);

  return Object.fromEntries(
    languageCodes.map((code) => {
      const language = rootObject.properties.find(
        (property) =>
          ts.isPropertyAssignment(property) &&
          ((ts.isIdentifier(property.name) && property.name.text === code) ||
            (ts.isStringLiteral(property.name) && property.name.text === code)),
      );
      assert.ok(language && ts.isPropertyAssignment(language), `${code} translations are missing`);
      assert.ok(ts.isObjectLiteralExpression(language.initializer), `${code} must be an object`);
      const keys = language.initializer.properties.map((property) => {
        assert.ok(ts.isPropertyAssignment(property), `${code} contains an invalid translation entry`);
        return ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
          ? property.name.text
          : property.name.getText(parsed);
      });
      return [code, keys];
    }),
  );
}

for (const [fileName, variableName, requiredKeys] of [
  [
    "home.ts",
    "homeTranslations",
    [
      "AI-Powered Banking Technology",
      "The Future Of Banking.",
      "Secure, scalable technology for core banking, payments, cards, risk and financial infrastructure — engineered for institutions that move economies forward.",
      "Built To Deliver At Scale.",
      "Banking Specialists",
      "One Connected Product Ecosystem.",
      "Intelligence Built Into Banking.",
      "Designed For Financial Institutions.",
      "Standards That Strengthen Trust.",
      "Real Delivery. Real Experiences.",
      "Common Questions.",
    ],
  ],
  [
    "team.ts",
    "teamTranslations",
    [
      "One Team",
      "Leaders Across Every Function.",
      "Artificial Intelligence",
      "AI & Automation Head",
      "React Engineering Lead",
      "Flutter Application Developer",
      "View {value} details",
    ],
  ],
]) {
  test(`${fileName} has matching Hindi, Marathi, Tamil and Gujarati coverage`, () => {
    const file = join(projectRoot, "src", "i18n", fileName);
    const keysByLanguage = readLanguageKeys(file, variableName);
    const expected = [...keysByLanguage.hi].sort();

    for (const code of languageCodes) {
      assert.deepEqual([...keysByLanguage[code]].sort(), expected, `${code} key coverage differs`);
      for (const key of requiredKeys) {
        assert.ok(keysByLanguage[code].includes(key), `${code} is missing ${key}`);
      }
    }
  });
}

test("the site translator loads the current Home and Team dictionaries", () => {
  const source = readFileSync(join(projectRoot, "src", "lib", "site-i18n.ts"), "utf8");
  assert.match(source, /homeTranslations\.hi/);
  assert.match(source, /teamTranslations\.hi/);
  assert.match(source, /translateTemplate\(source, code\)/);
});
