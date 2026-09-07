import assert from "node:assert/strict";
import { test } from "node:test";
import knowledge from "../src/data/idsspl-knowledge.json" with { type: "json" };
import {
  buildLocalModelRequest,
  createLocalChatHandler,
  retrieveKnowledgeContext,
} from "../src/lib/idsspl-local-ai.server.ts";

const origin = "http://127.0.0.1:8080";
const message = (content, role = "user") => ({ role, content });
const request = (body = {}, headers = {}) =>
  new Request(origin + "/api/chat", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json", ...headers },
    body: JSON.stringify({
      eventType: "chatbot_message",
      messages: [message("Who is your CEO?")],
      ...body,
    }),
  });
const localMessage = (text = "Vinayak More is IDSSPL’s Associate Director and CEO.") => ({
  model: "qwen3:1.7b",
  done: true,
  message: { role: "assistant", content: text },
});
const settings = { baseUrl: "http://127.0.0.1:11434", model: "qwen3:1.7b" };

test("local model receives retrieved facts, policy and no external API key", async () => {
  let calls = 0;
  const handler = createLocalChatHandler({
    ...settings,
    fetcher: async (url, init) => {
      calls++;
      assert.equal(url, "http://127.0.0.1:11434/api/chat");
      assert.deepEqual(init.headers, { "Content-Type": "application/json" });
      const payload = JSON.parse(init.body);
      assert.equal(payload.model, settings.model);
      assert.equal(payload.stream, false);
      assert.equal(payload.think, false);
      assert.equal(payload.keep_alive, "30m");
      assert.ok(payload.messages[0].content.includes("Vinayak More"));
      assert.ok(payload.messages[0].content.includes(knowledge.responsePolicy.answerStyle));
      assert.ok(payload.messages[0].content.includes("Not Related To IDSSPL"));
      return Response.json(localMessage());
    },
  });
  const response = await handler(request());
  assert.equal(calls, 1);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), {
    reply: "Vinayak More is IDSSPL’s Associate Director and CEO.",
    provider: "local",
    model: "qwen3:1.7b",
  });
});

test("retrieval keeps the subject of a short follow-up", () => {
  const context = retrieveKnowledgeContext([
    message("Tell me about mobile banking."),
    message("IDSSPL offers secure digital channels.", "assistant"),
    message("What are its benefits?"),
  ]);
  assert.equal(context.relevance, "matching approved facts found");
  assert.ok(context.snippets.some((item) => /mobile banking/i.test(item.text)));
});

test("unrelated questions still reach the model but always use the exact fallback", async () => {
  let prompt = "";
  const handler = createLocalChatHandler({
    ...settings,
    fetcher: async (_, init) => {
      prompt = JSON.parse(init.body).messages[0].content;
      return Response.json(localMessage("Here is an unrelated recipe."));
    },
  });
  const response = await handler(request({ messages: [message("Write a pasta recipe")] }));
  assert.equal(response.status, 200);
  assert.ok(prompt.includes("no matching approved fact found"));
  assert.equal((await response.json()).reply, "Not Related To IDSSPL");
});

test("history and requested language are forwarded safely", () => {
  const payload = buildLocalModelRequest(
    [
      message("Tell me about CBS"),
      message("It is a core banking platform.", "assistant"),
      message("More"),
    ],
    "hi",
  );
  assert.ok(payload.messages[0].content.includes("Reply in Hindi"));
  assert.deepEqual(
    payload.messages.slice(1).map(({ role }) => role),
    ["user", "assistant", "user"],
  );
});

test("invalid requests and expert enquiries never reach the local model", async () => {
  const handler = createLocalChatHandler({ ...settings, fetcher: () => assert.fail("Not valid") });
  assert.equal((await handler(request({}, { Origin: "https://attacker.example" }))).status, 403);
  assert.equal((await handler(request({}, { "Content-Type": "text/plain" }))).status, 415);
  for (const body of [
    { messages: [] },
    { messages: [message("x", "system")] },
    { messages: [message("x", "assistant")] },
    { messages: [message("x".repeat(1501))] },
    { messages: Array(13).fill(message("CBS")) },
    { eventType: "chatbot_lead" },
  ]) {
    assert.equal((await handler(request(body))).status, 400);
  }
  assert.equal((await handler(request({ pageTitle: "x".repeat(64001) }))).status, 413);
  assert.equal((await handler(new Request(origin + "/api/chat"))).status, 405);
});

test("only loopback Ollama is accepted", async () => {
  const handler = createLocalChatHandler({
    baseUrl: "https://remote-ai.example",
    fetcher: () => assert.fail("Remote service must not be called"),
  });
  assert.equal((await handler(request())).status, 503);
});

test("provider failures, empty output and hidden thinking are handled safely", async () => {
  const failed = createLocalChatHandler({
    ...settings,
    fetcher: async () => Response.json({ secret: "do-not-show" }, { status: 500 }),
  });
  const failedResponse = await failed(request());
  assert.equal(failedResponse.status, 502);
  assert.ok(!(await failedResponse.text()).includes("do-not-show"));

  const empty = createLocalChatHandler({
    ...settings,
    fetcher: async () => Response.json({ done: true, message: { content: "" } }),
  });
  assert.equal((await empty(request())).status, 502);

  const thinking = createLocalChatHandler({
    ...settings,
    fetcher: async () => Response.json(localMessage("<think>private</think>Short answer.")),
  });
  assert.equal(
    (await thinking(request()).then((response) => response.json())).reply,
    "Short answer.",
  );
});

test("local rate limiter caps calls and recovers after its window", async () => {
  let now = 60_000;
  let calls = 0;
  const handler = createLocalChatHandler({
    ...settings,
    now: () => now,
    fetcher: async () => {
      calls++;
      return Response.json(localMessage());
    },
  });
  for (let index = 0; index < 12; index++) assert.equal((await handler(request())).status, 200);
  assert.equal((await handler(request())).status, 429);
  assert.equal(calls, 12);
  now += 60_000;
  assert.equal((await handler(request())).status, 200);
});
