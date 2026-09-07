import { createFileRoute } from "@tanstack/react-router";
import { handleClaudeChat } from "../lib/idsspl-claude.server";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: ({ request }) =>
        import.meta.env.DEV
          ? handleClaudeChat(request)
          : Response.json(
              { message: "Configure the production chatbot endpoint." },
              { status: 503 },
            ),
    },
  },
});
