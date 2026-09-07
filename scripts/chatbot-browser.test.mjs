import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { answerFromWebsiteKnowledge } from "../src/lib/idsspl-browser-advisor.ts";
import { createChatRequest } from "../src/lib/chatbot-request.ts";
import { prepareChatHistory } from "../src/lib/idsspl-chat-history.ts";

function withoutStaticAbortMethods(t) {
  for (const name of ["any", "timeout"]) {
    const descriptor = Object.getOwnPropertyDescriptor(AbortSignal, name);
    Object.defineProperty(AbortSignal, name, { configurable: true, value: undefined });
    t.after(() => {
      if (descriptor) Object.defineProperty(AbortSignal, name, descriptor);
      else delete AbortSignal[name];
    });
  }
}

function loadFunctions(path, names, globals) {
  const source = ts.createSourceFile(
    path,
    readFileSync(new URL(path, import.meta.url), "utf8"),
    ts.ScriptTarget.Latest,
    true,
    path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const declarations = new Map();
  function visit(node) {
    if (ts.isFunctionDeclaration(node) && node.name && names.includes(node.name.text)) {
      declarations.set(node.name.text, node.getText(source).replace(/^export\s+/, ""));
    } else if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      names.includes(node.name.text) &&
      node.initializer
    ) {
      declarations.set(
        node.name.text,
        `const ${node.name.text} = ${node.initializer.getText(source)};`,
      );
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  for (const name of names) assert.ok(declarations.has(name), `Missing tested function: ${name}`);
  const code = ts.transpileModule(
    `${names.map((name) => declarations.get(name)).join("\n")}\n({ ${names.join(", ")} });`,
    { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None } },
  ).outputText;
  return vm.runInNewContext(code, globals, { filename: path });
}

function mountChat(fetcher, endpoint = "https://chat.example.test/") {
  const requests = [];
  const errors = [];
  const copy = {
    connectionError: "Connection failed. Please retry.",
    rateLimitError: "Please wait.",
  };
  const state = {
    messages: [],
    draft: "",
    isTyping: false,
    showLeadForm: false,
    lead: {},
    leadConsent: false,
    leadStatus: "idle",
  };
  const globals = {
    ...state,
    copy,
    language: "en",
    initialLead: {},
    CHAT_STORAGE_KEY: "test-chat-session",
    chatMessageEndpoint: endpoint,
    answerFromWebsiteKnowledge,
    sessionIdRef: { current: "chat-test" },
    conversationVersionRef: { current: 0 },
    chatRequestRef: { current: null },
    createId: (prefix) => `${prefix}-${requests.length}-${state.messages.length}`,
    createChatRequest: (...args) => {
      const request = createChatRequest(...args);
      requests.push(request);
      return request;
    },
    prepareChatHistory,
    AbortController,
    AbortSignal,
    setTimeout,
    clearTimeout,
    fetch: fetcher,
    console: { error: (...args) => errors.push(args) },
    document: { title: "IDSSPL" },
    window: {
      location: { pathname: "/", hash: "" },
      sessionStorage: { removeItem() {} },
      setTimeout,
      clearTimeout,
    },
  };
  for (const name of Object.keys(state)) {
    globals[`set${name[0].toUpperCase()}${name.slice(1)}`] = (value) => {
      state[name] = typeof value === "function" ? value(state[name]) : value;
      globals[name] = state[name];
    };
  }
  const handlers = loadFunctions(
    "../src/components/site/AIChatbot.tsx",
    ["sendMessage", "resetConversation"],
    globals,
  );
  return { ...handlers, state, globals, requests, errors, copy };
}

const awaitAbort = (_, { signal }) =>
  new Promise((resolve, reject) => {
    if (signal.aborted) reject(signal.reason);
    else signal.addEventListener("abort", () => reject(signal.reason), { once: true });
  });

test("request helper works without AbortSignal.any or AbortSignal.timeout", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  withoutStaticAbortMethods(t);
  const request = createChatRequest();
  assert.ok(request.controller instanceof AbortController);
  assert.equal(request.controller.signal.aborted, false);
  assert.equal(request.timedOut, false);
  request.dispose();
});

test("request timeout aborts at its deadline and distinguishes a timeout", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const request = createChatRequest(100);
  t.mock.timers.tick(99);
  assert.equal(request.controller.signal.aborted, false);
  assert.equal(request.timedOut, false);
  t.mock.timers.tick(1);
  assert.equal(request.controller.signal.aborted, true);
  assert.equal(request.timedOut, true);
  request.dispose();
});

test("explicit cancellation clears the deadline without being marked a timeout", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const request = createChatRequest(100);
  request.controller.abort();
  t.mock.timers.tick(1000);
  assert.equal(request.controller.signal.aborted, true);
  assert.equal(request.timedOut, false);
  request.dispose();
});

test("disposing a completed request clears its timer without aborting it", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const request = createChatRequest(100);
  request.dispose();
  request.dispose();
  t.mock.timers.tick(1000);
  assert.equal(request.controller.signal.aborted, false);
  assert.equal(request.timedOut, false);
});

test("actual chatbot sends and displays a reply without newer AbortSignal static APIs", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  withoutStaticAbortMethods(t);
  const calls = [];
  const app = mountChat(async (url, init) => {
    calls.push({ url, init });
    return Response.json({ reply: "IDSSPL builds banking technology." });
  });
  await app.sendMessage("What does IDSSPL do?");
  assert.equal(calls.length, 1);
  assert.ok(calls[0].init.signal instanceof AbortSignal);
  assert.equal(JSON.parse(calls[0].init.body).messages[0].content, "What does IDSSPL do?");
  assert.equal(app.state.messages.at(-1).content, "IDSSPL builds banking technology.");
  assert.equal(app.state.isTyping, false);
  assert.equal(app.globals.chatRequestRef.current, null);
  assert.equal(app.errors.length, 0);
  t.mock.timers.tick(60_000);
  assert.equal(calls[0].init.signal.aborted, false, "successful fetch releases its timeout");
});

test("public chatbot answers in the browser without a network request", async () => {
  let calls = 0;
  const app = mountChat(async () => {
    calls++;
    throw new Error("Network should not be called");
  }, null);
  await app.sendMessage("Tell me about UPI");
  assert.equal(calls, 0);
  assert.match(app.state.messages.at(-1).content, /UPI.*NPCI Products/i);
  assert.equal(app.state.isTyping, false);
});

test("actual chatbot shows a retry message instead of silently dropping a timeout", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const app = mountChat(awaitAbort);
  const pending = app.sendMessage("Tell me about CBS.");
  assert.equal(app.state.isTyping, true);
  t.mock.timers.tick(42_000);
  await pending;
  assert.equal(app.requests[0].timedOut, true);
  assert.equal(app.state.messages.length, 2);
  assert.equal(app.state.messages.at(-1).content, app.copy.connectionError);
  assert.equal(app.state.isTyping, false);
  assert.equal(app.globals.chatRequestRef.current, null);
});

test("actual chatbot reset cancels the request without adding a failure reply", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const app = mountChat(awaitAbort);
  const pending = app.sendMessage("Tell me about mobile banking.");
  app.resetConversation();
  await pending;
  t.mock.timers.tick(60_000);
  assert.equal(app.requests[0].controller.signal.aborted, true);
  assert.equal(app.requests[0].timedOut, false);
  assert.equal(app.state.messages.length, 0);
  assert.equal(app.state.isTyping, false);
  assert.equal(app.globals.chatRequestRef.current, null);
  assert.equal(app.errors.length, 0);
});

function languageFunctions(storage) {
  const changedLanguages = [];
  const globals = {
    SITE_LANGUAGE_STORAGE_KEY: "test-language",
    isSiteLanguageCode: (code) => ["en", "hi", "mr", "ta", "gu"].includes(code),
    window: { localStorage: storage },
    document: { documentElement: { lang: "en" } },
    siteI18n: { changeLanguage: (code) => changedLanguages.push(code) },
  };
  const handlers = loadFunctions(
    "../src/lib/site-i18n.ts",
    ["getSavedSiteLanguage", "setSiteLanguage"],
    globals,
  );
  return { ...handlers, globals, changedLanguages };
}

test("blocked browser storage defaults the saved language without breaking chat initialization", () => {
  const app = languageFunctions({
    getItem() {
      throw new DOMException("Storage access blocked", "SecurityError");
    },
  });
  assert.equal(app.getSavedSiteLanguage(), "en");
});

test("blocked browser storage still applies the visitor's chosen language", () => {
  const app = languageFunctions({
    setItem() {
      throw new DOMException("Storage access blocked", "SecurityError");
    },
  });
  app.setSiteLanguage("hi");
  assert.equal(app.globals.document.documentElement.lang, "hi");
  assert.deepEqual(app.changedLanguages, ["hi"]);
});

test("available browser storage preserves saved languages and persists changes", () => {
  const entries = new Map([["test-language", "mr"]]);
  const app = languageFunctions({
    getItem: (key) => entries.get(key) ?? null,
    setItem: (key, value) => entries.set(key, value),
  });
  assert.equal(app.getSavedSiteLanguage(), "mr");
  app.setSiteLanguage("gu");
  assert.equal(entries.get("test-language"), "gu");
  assert.equal(app.getSavedSiteLanguage(), "gu");
});
