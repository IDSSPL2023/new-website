# IDSSPL chatbot knowledge and continuity

The editable knowledge file is `src/data/idsspl-knowledge.json`. It reflects the
current website checkout, not an independently verified company database. It
contains company/contact information, all six product families and 49 sub-product
entries, features, benefits, FAQs, nine leadership profiles, 23 team profiles,
capabilities, published outcomes/metrics, certifications and navigation.

## Gemini-only conversations

Every valid submitted chat message goes to Gemini, including greetings, thanks,
short follow-ups and unrelated questions. There is no keyword classifier,
predefined answer catalog or offline answer fallback. Optional preset question
buttons appear for new conversations in all five supported languages. Clicking
one uses the same Gemini request and conversation history as typing a question;
the buttons do not supply canned answers. There is no initial canned chat greeting.

The empty chat panel displays a decorative 3D neural globe with connected points,
moving signals, and restrained navy/slate-blue shading. It is rendered locally
without an external animation service. It rotates slowly and moves
automatically without play/pause controls, appears only while an empty chat is
open, and disappears on the first message. Rendering stops in hidden tabs and
uses a still frame for reduced-motion preferences. Its introductory text is UI
guidance, not an assistant reply, and is never included in Gemini conversation history.

The server sends the approved JSON facts separately in system instructions and
recent conversation as ordered Gemini `user` / `model` turns. Both sides of the
conversation are preserved, so a follow-up such as “explain the second one” can
refer to a numbered option in the previous assistant reply. Adjacent same-role
messages are grouped without changing their order. Leading orphaned assistant
replies are omitted when their questions fall outside the retained window.

History is context, not a source of truth: the model is instructed to correct
earlier answers that conflict with the approved JSON. Client page metadata is
never inserted into system instructions. The server's API key is never sent in
the prompt or exposed to the browser.

The model's instructions retain these rules:

- Answer IDSSPL and its product/capability questions, even without the company name.
- Resolve follow-ups from recent conversation; ask a brief clarification if unclear.
- Return exactly `Not Related To IDSSPL` for unrelated or mixed off-topic requests.
- Acknowledge unpublished information naturally, without inventing facts.
- Keep replies short, plain-language and grounded in the JSON.
- Do not request credentials or confidential banking records.

Scope decisions are now made by Gemini, not guaranteed by a deterministic keyword
filter. Offline tests verify transport/policy/context behavior; real-model smoke
tests are needed to evaluate response quality. No model can guarantee perfect
grounding or injection resistance. Only public information belongs in this file.

## History boundaries and failure behavior

- The browser retains the last 18 messages in tab session storage.
- Each request carries at most the last 12 messages (questions and replies).
- Refreshes/page navigation in the same tab restore available history. This is not
  permanent, cross-device or 24-hour storage. The backend does not persist chats.
- New conversation clears context and aborts any pending request; late replies
  cannot repopulate the new conversation.
- Obvious password/OTP/PIN/CVV/API-key patterns and long card-like numbers are
  redacted before being sent to Gemini. This is not comprehensive sensitive-data
  detection: visitors must not submit confidential information.
- Invalid requests, missing configuration and rate limits are rejected before
  model calls. Provider failures display an error rather than a canned answer.
- The body limit is 64 KB; at most 12 messages of 1,500 characters are accepted.

## Updating the data

1. Edit the public website source for products, leadership, team, capabilities,
   FAQs, published outcomes and metrics.
2. Edit curated `company` and `responsePolicy` fields in the JSON when necessary.
3. Run `pnpm knowledge:sync` to regenerate derived data and embed the identical
   knowledge in the Lambda template.
4. Run `pnpm knowledge:check`, `pnpm test:chatbot` and
   `python scripts/test-chatbot-api.py`. These checks make no external requests.
5. Build and publish the frontend and redeploy Lambda when authorized. Local
   edits alone do not change the live website.

See [chatbot-deployment.md](./chatbot-deployment.md) for secure configuration.
