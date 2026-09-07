# IDSSPL website advisor

The public website advisor runs inside each visitor's browser. It uses the reviewed
`src/data/idsspl-knowledge.json` snapshot and deterministic retrieval rules; it does
not call Gemini, Claude, Bedrock, Ollama, Lambda or another paid AI service.

This mode works for every visitor on the existing static S3/CloudFront website with
no separate chatbot hosting or per-message model charge. It provides short answers
from published IDSSPL information, preserves recent conversation context in session
storage and returns exactly `Not Related To IDSSPL` for unrelated questions.

Because no language model is used in production, replies are grounded and
predictable rather than open-ended. Update and test the knowledge snapshot whenever
website content changes:

```powershell
pnpm knowledge:sync
pnpm knowledge:check
pnpm test:chatbot
pnpm build
```

The normal website deployment workflow publishes the advisor automatically. No
`VITE_CHATBOT_ENDPOINT`, model API key or AWS chatbot stack is required.

## Optional local development model

Developers can use Ollama while running the site on their own computer. Create an
ignored `.env.local` file:

```dotenv
OLLAMA_URL=http://127.0.0.1:11434
OLLAMA_MODEL=qwen3:1.7b
```

Start the development server and open `http://127.0.0.1:8080/`. The private
loopback-only `/api/chat` route uses Ollama. This local model is never available to
public website visitors and no external AI key is needed.

Never place API keys, AWS credentials, passwords, OTPs, PINs, CVVs or confidential
banking records in source code, browser variables, screenshots, chat or Git.

Expert enquiries are separate from chat replies and require a real, configured lead
submission service. The interface must not claim that an enquiry was delivered when
no service confirmed it.

See [chatbot-knowledge.md](./chatbot-knowledge.md) for data maintenance.
