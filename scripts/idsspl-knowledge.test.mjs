import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import knowledge from "../src/data/idsspl-knowledge.json" with { type: "json" };
import { getGeminiKnowledgeContext } from "../src/lib/idsspl-gemini.server.ts";

test("knowledge matches current website content and Lambda embedding", () => {
  execFileSync(process.execPath, ["scripts/sync-idsspl-knowledge.mjs", "--check"], {
    cwd: new URL("..", import.meta.url),
  });
});

test("all current company, product and people details are retained", () => {
  assert.equal(knowledge.products.length, 6);
  assert.equal(
    knowledge.products.reduce((n, p) => n + p.subProducts.length, 0),
    49,
  );
  assert.equal(knowledge.leadership.length, 9);
  assert.equal(knowledge.team.length, 23);
  assert.equal(knowledge.company.contact.email, "info@idsspl.com");
  assert.ok(knowledge.leadership.some((p) => p.name === "Vinayak More" && p.role.includes("CEO")));
  assert.ok(
    knowledge.leadership.some(
      (p) =>
        p.name === "Suja Nair" && p.functionName === "People, Culture & Workplace Administration",
    ),
  );
  assert.equal(knowledge.responsePolicy.outOfScopeReply, "Not Related To IDSSPL");
  assert.equal(knowledge.matching, undefined);
  assert.equal(knowledge.localizedResponses, undefined);
  assert.equal(knowledge.responsePolicy.greetingReply, undefined);
});

for (const product of knowledge.products) {
  for (const name of [product.label, ...product.subProducts]) {
    test("Gemini can see published product: " + name + " / " + product.id, () => {
      const matching = getGeminiKnowledgeContext().products.find((p) => p.id === product.id);
      assert.deepEqual(matching, product);
      assert.ok(matching.label === name || matching.subProducts.includes(name));
    });
  }
}

test("preset questions use the same Gemini conversation without canned replies", () => {
  const source = fs.readFileSync(
    new URL("../src/components/site/AIChatbot.tsx", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(source, /getLocalAdvisorReply|getAdvisorScope|copy\.greeting/);
  assert.match(source, /: copy\.suggestions/);
  assert.match(source, /onClick=\{\(\) => void sendMessage\(suggestion\)\}/);
  assert.match(source, /fetch\(chatMessageEndpoint/);
  assert.match(source, /prepareChatHistory\(\[\.\.\.messages, userMessage\]\)/);
  assert.match(source, /chatRequestRef\.current\?\.abort\(\)/);
  assert.match(source, /version !== conversationVersionRef\.current/);
});

test("neural globe is limited to an empty open chat and respects motion preferences", () => {
  const source = fs.readFileSync(
    new URL("../src/components/site/AIChatbot.tsx", import.meta.url),
    "utf8",
  );
  const animation = fs.readFileSync(
    new URL("../src/components/site/ChatAIOrb.tsx", import.meta.url),
    "utf8",
  );
  assert.match(source, /open && historyReady && messages\.length === 0 &&/);
  assert.match(source, /className="chatbot-ai-art" aria-hidden="true"/);
  assert.match(source, /<ChatAIOrb \/>/);
  assert.doesNotMatch(
    source,
    /pauseAnimation|resumeAnimation|chatbot-animation-toggle|BrainCircuit/,
  );
  assert.match(animation, /prefers-reduced-motion: reduce/);
  assert.match(animation, /createNeuralGlobe/);
  assert.doesNotMatch(animation, /createRibbon|function knot/);
  assert.match(animation, /!document\.hidden && !reducedMotion\.matches/);
  assert.match(animation, /cancelAnimationFrame\(frame\)/);
  assert.match(animation, /resize\.disconnect\(\)/);
  assert.match(animation, /className="chatbot-ai-canvas" aria-hidden="true"/);
});
