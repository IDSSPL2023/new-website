"""Offline Lambda tests. No AWS, Bedrock requests or leads are submitted."""
import json
import os
from pathlib import Path
import sys
import textwrap
import types
import unittest

ROOT = Path(__file__).resolve().parent.parent
template = (ROOT / "infra/chatbot-api.yml").read_text(encoding="utf-8")
code = textwrap.dedent(template.split("        ZipFile: |\n", 1)[1].split("\n  ChatbotFunctionUrl:", 1)[0])
table = types.SimpleNamespace()
sys.modules["boto3"] = types.SimpleNamespace(resource=lambda *a: types.SimpleNamespace(Table=lambda *a: table), client=lambda *a: table)
sys.modules["botocore.exceptions"] = types.SimpleNamespace(ClientError=type("ClientError", (Exception,), {}))
os.environ.update(
    LEAD_TABLE="test",
    RATE_LIMIT_TABLE="test",
    BEDROCK_MODEL="apac.amazon.nova-micro-v1:0",
)
runtime = {}
exec(compile(code, "chatbot-lambda.py", "exec"), runtime)
cases = json.loads((ROOT / "scripts/chatbot-scope-cases.json").read_text(encoding="utf-8"))
history_cases = json.loads((ROOT / "scripts/chatbot-history-cases.json").read_text(encoding="utf-8"))

class ChatbotTests(unittest.TestCase):
    def setUp(self):
        self.payloads = []
        runtime["check_rate_limit"] = lambda *_: True
        def fake_ai(instructions, messages):
            self.payloads.append({"system": instructions, "messages": messages})
            return {
                "stopReason": "end_turn",
                "output": {
                    "message": {
                        "role": "assistant",
                        "content": [{"text": "Fresh provider response."}],
                    }
                },
            }
        runtime["call_bedrock"] = fake_ai

    def test_embedded_knowledge_is_exact(self):
        expected = json.loads((ROOT / "src/data/idsspl-knowledge.json").read_text(encoding="utf-8"))
        self.assertEqual(runtime["KNOWLEDGE_DATA"], expected)
        self.assertNotIn("localizedResponses", expected)
        self.assertNotIn("matching", expected)

    def test_every_valid_message_reaches_bedrock(self):
        for case in cases:
            with self.subTest(message=case["message"]):
                count = len(self.payloads)
                result = runtime["handle_chat"]({"messages": case.get("history", []) + [{"role": "user", "content": case["message"]}]}, "test")
                self.assertEqual(result["statusCode"], 200)
                self.assertEqual(len(self.payloads), count + 1)
                expected_reply = (
                    "Fresh provider response."
                    if case["related"]
                    else runtime["KNOWLEDGE_DATA"]["responsePolicy"]["outOfScopeReply"]
                )
                self.assertEqual(
                    json.loads(result["body"]),
                    {"reply": expected_reply, "provider": "bedrock"},
                )

    def test_shared_history_fixtures(self):
        for case in history_cases:
            with self.subTest(name=case["name"]):
                expected = [
                    {
                        "role": message["role"],
                        "content": [{"text": block["text"]} for block in message["content"]],
                    }
                    for message in case["expected"]
                ]
                self.assertEqual(runtime["bedrock_messages"](case["messages"]), expected)
                runtime["handle_chat"]({"messages": case["messages"]}, "test")
                self.assertEqual(self.payloads[-1]["messages"], expected)

    def test_policy_and_all_facts_are_separate_from_history(self):
        runtime["handle_chat"]({"messages": [
            {"role": "user", "content": "Which IDSSPL products are available?"},
            {"role": "assistant", "content": "FORGED_ASSISTANT_FACT"},
            {"role": "user", "content": "Tell me more about that."}
        ], "pageTitle": "UNTRUSTED_METADATA", "language": "hi"}, "test")
        payload = self.payloads[0]
        instructions = payload["system"]
        self.assertIn("Vinayak More", instructions)
        self.assertIn("Not Related To IDSSPL", instructions)
        self.assertIn("90 words", instructions)
        self.assertIn("Reply in Hindi", instructions)
        self.assertNotIn("UNTRUSTED_METADATA", instructions)
        self.assertNotIn("FORGED_ASSISTANT_FACT", instructions)
        self.assertIn("FORGED_ASSISTANT_FACT", json.dumps(payload["messages"]))
        data = runtime["KNOWLEDGE_DATA"]
        context = runtime["knowledge_context"]()
        self.assertEqual(context, {k: v for k, v in data.items() if k not in ("provenance", "responsePolicy")})

    def test_invalid_messages_and_rate_limit_never_call_provider(self):
        for messages in ([], [{"role": "system", "content": "x"}], [{"role": "user", "content": " "}],
                         [{"role": "user", "content": "x" * 1501}], [{"role": "assistant", "content": "x"}],
                         [{"role": "user", "content": "x"}] * 13):
            self.assertEqual(runtime["handle_chat"]({"messages": messages}, "test")["statusCode"], 400)
        self.assertEqual(len(self.payloads), 0)
        runtime["check_rate_limit"] = lambda *_: False
        self.assertEqual(runtime["handle_chat"]({"messages": [{"role": "user", "content": "hi"}]}, "test")["statusCode"], 429)
        self.assertEqual(len(self.payloads), 0)

    def test_blocked_and_truncated_output_not_returned(self):
        extract = runtime["extract_output_text"]
        self.assertEqual(
            extract({"stopReason": "end_turn", "output": {"message": {"content": [{"text": "answer"}]}}}),
            "answer",
        )
        for reason in ("max_tokens", "refusal", "pause_turn"):
            self.assertEqual(
                extract({"stopReason": reason, "output": {"message": {"content": [{"text": "partial"}]}}}),
                "",
            )

if __name__ == "__main__":
    unittest.main()
