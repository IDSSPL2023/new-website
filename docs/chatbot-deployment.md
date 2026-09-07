# IDSSPL AI chatbot

The public chatbot uses Amazon Bedrock with the low-cost Amazon Nova Micro model.
Local development uses Ollama. Both runtimes answer from the reviewed
`src/data/idsspl-knowledge.json`, the current question and recent user/assistant
exchanges. Conversation history and page metadata are never trusted as company facts.

Replies normally use 15–55 words, with a requested maximum of 90, in plain language.
The model is instructed to return exactly `Not Related To IDSSPL` for unrelated
questions. Missing relevant facts
are acknowledged instead of invented. Safety-blocked, empty and truncated model
outputs are not displayed.

## Local development

Install Ollama, pull the configured model, and create `.env.local` (ignored by Git):

```dotenv
OLLAMA_URL=http://127.0.0.1:11434
OLLAMA_MODEL=qwen3:1.7b
```

Leave `VITE_CHATBOT_ENDPOINT` unset locally. Start the development server and open
`http://127.0.0.1:8080/`. Chat calls the loopback-only `/api/chat` server route.
No external AI key is needed for local development. Restart the server fully after
changing the Ollama URL or model.

Never place AWS credentials, Bedrock API keys, or third-party model keys in `VITE_`
variables, source code, logs, screenshots, chat, or Git.

The local route validates origin, body size and messages. It permits 12 model
requests per minute with a 40-second model timeout. The browser allows 42 seconds.
Errors return a safe message rather than a fabricated successful reply.

Local chat does not submit expert enquiries. Those require the deployed
`VITE_CHATBOT_ENDPOINT`; without it the form reports failure, not success.

## Production: existing S3/CloudFront architecture

S3 serves static files, not server routes. Production uses:

`Browser → VITE_CHATBOT_ENDPOINT (Lambda) → Amazon Bedrock Nova Micro`

Updating local files does not deploy anything. When ready to publish:

1. Refresh and test the shared knowledge:

   ```powershell
   pnpm knowledge:sync
   pnpm knowledge:check
   pnpm test:chatbot
   python scripts/test-chatbot-api.py
   ```

2. Deploy or update the chatbot stack. Lambda uses its IAM role to call Bedrock, so
   there is no model API key to create or store:

   ```powershell
   aws cloudformation deploy `
     --stack-name idsspl-ai-chatbot `
     --template-file infra/chatbot-api.yml `
     --region ap-south-1 `
     --capabilities CAPABILITY_NAMED_IAM `
     --parameter-overrides `
       BedrockModel="apac.amazon.nova-micro-v1:0" `
       AllowedOrigin="https://YOUR_PRODUCTION_DOMAIN" `
       AllowedOriginSecondary="http://127.0.0.1:8080"
   ```

   The stack retains durable per-IP rate limits and opted-in lead capture. Origin
   checks are not authentication: monitor usage and configure an AWS Budget alert.
   Bedrock and Lambda are pay-per-use services; there is no continuously running AI server.

3. Read the `ChatbotEndpoint` stack output and set the GitHub Actions repository
   variable `VITE_CHATBOT_ENDPOINT` to that URL.

   ```dotenv
   VITE_CHATBOT_ENDPOINT=https://YOUR_FUNCTION_URL.lambda-url.ap-south-1.on.aws/
   ```

4. Build and publish `dist/client` using the existing website deployment workflow.
   Do not upload `.env.local` or `dist/server`. Never use a `VITE_` key variable.
5. Test product answers, follow-ups, exact unrelated fallback, selected languages,
   rejected origins and an explicitly authorized test enquiry on the deployed site.

Normal chats are not written to the backend database; recent conversation is
retained in the visitor's browser session storage. Recent user questions, assistant replies and
public knowledge are sent to Amazon Bedrock for inference. Basic credential patterns are
redacted first; visitors must still avoid submitting confidential information. Only explicitly submitted,
consented expert enquiries are stored in DynamoDB. Apply AWS's current Bedrock data-use
terms and do not submit confidential banking data.

See [chatbot-knowledge.md](./chatbot-knowledge.md) for data maintenance.
