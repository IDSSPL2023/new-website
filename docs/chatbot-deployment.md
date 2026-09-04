# IDSSPL Gemini chatbot

The chatbot uses the [Gemini generateContent API](https://ai.google.dev/api/generate-content)
with `gemini-3.7-flash` and low thinking. It answers from the reviewed
`src/data/idsspl-knowledge.json`, the current question and recent user/assistant exchanges as ordered Gemini
user/model turns. All approved facts are included so follow-ups do not depend on
keywords. History and page metadata are not trusted company facts.

Replies normally use 15–55 words, with a requested maximum of 90, in plain language.
Gemini is instructed to return exactly `Not Related To IDSSPL` for unrelated
questions. Every valid submitted message goes to Gemini; no local canned replies
or keyword-based scope shortcuts are used. Missing relevant facts
are acknowledged instead of invented. Safety-blocked, empty and truncated model
outputs are not displayed. Gemini's default safety settings are not disabled.

## Local development

Create `.env.local` (ignored by Git):

```dotenv
GEMINI_API_KEY=your-key-here
GEMINI_MODEL=gemini-3.7-flash
```

Leave `VITE_CHATBOT_ENDPOINT` unset locally. Start the development server and open
`http://127.0.0.1:8080/`. Chat calls the loopback-only `/api/chat` server route.
The key is read only by the server, never added to browser code or model prompts.
Restart the server fully after rotating a key or changing models.
Model overrides must support `thinkingLevel: low`.

Never use `VITE_GEMINI_API_KEY` or paste a key into source code, logs, screenshots
or Git. Rotate keys exposed in chat using Google AI Studio, then update `.env.local`.

The local route validates origin, body size and messages. It permits 12
model requests per minute, with an 18-second timeout per attempt, and retries one
transient HTTP 5xx failure only. The browser allows 42 seconds for both attempts.
Errors return a safe message rather than a fabricated successful reply.

Local chat does not submit expert enquiries. Those require the deployed
`VITE_CHATBOT_ENDPOINT`; without it the form reports failure, not success.

## Production: existing S3/CloudFront architecture

S3 serves static files, not server routes. Production uses:

`Browser → VITE_CHATBOT_ENDPOINT (Lambda) → Gemini`

Updating local files does not deploy anything. When ready to publish:

1. Store a secret in AWS Secrets Manager, for example `idsspl/gemini`, with JSON
   field `GEMINI_API_KEY`. Keep the key out of frontend build settings and Git.
2. Refresh and test the shared knowledge:

   ```powershell
   pnpm knowledge:sync
   pnpm knowledge:check
   pnpm test:chatbot
   python scripts/test-chatbot-api.py
   ```

3. Deploy or update the existing chatbot stack. The new parameters are
   `GeminiSecretArn` and `GeminiModel`; old OpenAI parameters are no longer used:

   ```powershell
   aws cloudformation deploy `
     --stack-name idsspl-ai-chatbot `
     --template-file infra/chatbot-api.yml `
     --region ap-south-1 `
     --capabilities CAPABILITY_NAMED_IAM `
     --parameter-overrides `
       GeminiSecretArn="arn:aws:secretsmanager:ap-south-1:ACCOUNT_ID:secret:idsspl/gemini-XXXX" `
       GeminiModel="gemini-3.7-flash" `
       AllowedOrigin="https://YOUR_PRODUCTION_DOMAIN" `
       AllowedOriginSecondary="http://127.0.0.1:8080"
   ```

   Existing logical resources and lead tables are preserved. Lambda reads only
   the specified secret and retains durable per-IP rate limits and opted-in lead
   capture. Origin checks are not authentication: monitor usage and configure
   appropriate API quotas/budgets.

4. Read the `ChatbotEndpoint` stack output and set `.env.production.local`:

   ```dotenv
   VITE_CHATBOT_ENDPOINT=https://YOUR_FUNCTION_URL.lambda-url.ap-south-1.on.aws/
   ```

5. Build and publish `dist/client` using the existing website deployment workflow.
   Do not upload `.env.local` or `dist/server`. Never use a `VITE_` key variable.
6. Test product answers, follow-ups, exact unrelated fallback, selected languages,
   rejected origins and an explicitly authorized test enquiry on the deployed site.

Normal chats are not written to the backend database; recent conversation is
retained in the visitor's browser session storage. Recent user questions, assistant replies and
public knowledge are sent to Google for inference. Basic credential patterns are
redacted first; visitors must still avoid submitting confidential information. Only explicitly submitted,
consented expert enquiries are stored in DynamoDB. Apply Google's current data-use
terms to the API account and do not submit confidential banking data.

See [chatbot-knowledge.md](./chatbot-knowledge.md) for data maintenance.
