# IDSSPL Claude chatbot

The chatbot uses the [Claude Messages API](https://platform.claude.com/docs/en/api/overview)
with `claude-sonnet-4-6`. It answers from the reviewed
`src/data/idsspl-knowledge.json`, the current question and recent user/assistant exchanges as ordered Claude
user/assistant turns. All approved facts are included so follow-ups do not depend
on keywords. History and page metadata are not trusted company facts.

Replies normally use 15–55 words, with a requested maximum of 90, in plain language.
Claude is instructed to return exactly `Not Related To IDSSPL` for unrelated
questions. Every valid submitted message goes to Claude; no local canned replies
or keyword-based scope shortcuts are used. Missing relevant facts
are acknowledged instead of invented. Safety-blocked, empty and truncated model
outputs are not displayed.

## Local development

Create `.env.local` (ignored by Git):

```dotenv
ANTHROPIC_API_KEY=your-key-here
CLAUDE_MODEL=claude-sonnet-4-6
```

Leave `VITE_CHATBOT_ENDPOINT` unset locally. Start the development server and open
`http://127.0.0.1:8080/`. Chat calls the loopback-only `/api/chat` server route.
The key is read only by the server, never added to browser code or model prompts.
Restart the server fully after rotating a key or changing models.
Model overrides must be valid Claude model identifiers.

Never use `VITE_ANTHROPIC_API_KEY` or paste a key into source code, logs, screenshots
or Git. Revoke keys exposed in chat in the Anthropic Console, then update `.env.local`.

The local route validates origin, body size and messages. It permits 12
model requests per minute, with an 18-second timeout per attempt, and retries one
transient HTTP 5xx failure only. The browser allows 42 seconds for both attempts.
Errors return a safe message rather than a fabricated successful reply.

Local chat does not submit expert enquiries. Those require the deployed
`VITE_CHATBOT_ENDPOINT`; without it the form reports failure, not success.

## Production: existing S3/CloudFront architecture

S3 serves static files, not server routes. Production uses:

`Browser → VITE_CHATBOT_ENDPOINT (Lambda) → Claude`

Updating local files does not deploy anything. When ready to publish:

1. Store a secret in AWS Secrets Manager, for example `idsspl/anthropic`, with JSON
   field `ANTHROPIC_API_KEY`. Keep the key out of frontend build settings and Git.
2. Refresh and test the shared knowledge:

   ```powershell
   pnpm knowledge:sync
   pnpm knowledge:check
   pnpm test:chatbot
   python scripts/test-chatbot-api.py
   ```

3. Deploy or update the existing chatbot stack. The new parameters are
   `AnthropicSecretArn` and `ClaudeModel`:

   ```powershell
   aws cloudformation deploy `
     --stack-name idsspl-ai-chatbot `
     --template-file infra/chatbot-api.yml `
     --region ap-south-1 `
     --capabilities CAPABILITY_NAMED_IAM `
     --parameter-overrides `
       AnthropicSecretArn="arn:aws:secretsmanager:ap-south-1:ACCOUNT_ID:secret:idsspl/anthropic-XXXX" `
       ClaudeModel="claude-sonnet-4-6" `
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
public knowledge are sent to Anthropic for inference. Basic credential patterns are
redacted first; visitors must still avoid submitting confidential information. Only explicitly submitted,
consented expert enquiries are stored in DynamoDB. Apply Anthropic's current data-use
terms to the API account and do not submit confidential banking data.

See [chatbot-knowledge.md](./chatbot-knowledge.md) for data maintenance.
