import { createFileRoute } from "@tanstack/react-router";
import { handleGeminiChat } from "../lib/idsspl-gemini.server";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: ({ request }) =>
        import.meta.env.DEV
          ? handleGeminiChat(request)
          : Response.json(
              { message: "Configure the production chatbot endpoint." },
              { status: 503 },
            ),
    },
  },
});
