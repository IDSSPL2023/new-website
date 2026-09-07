import { createFileRoute } from "@tanstack/react-router";
import { handleLocalChat } from "../lib/idsspl-local-ai.server";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: ({ request }) =>
        import.meta.env.DEV
          ? handleLocalChat(request)
          : Response.json(
              { message: "Configure the production chatbot endpoint." },
              { status: 503 },
            ),
    },
  },
});
