export type AdvisorMessage = { role: "user" | "assistant"; content: string };

export function prepareChatHistory(messages: AdvisorMessage[]): AdvisorMessage[] {
  const recent = messages
    .slice(-12)
    .map(({ role, content }) => ({ role, content: content.trim().slice(0, 1500) }));
  // The window may start with a reply whose question has already fallen out.
  const firstUser = recent.findIndex((message) => message.role === "user");
  return firstUser < 0 ? [] : recent.slice(firstUser);
}

export function redactChatSecrets(text: string): string {
  // Keep the conversation flowing through Gemini without forwarding obvious credentials.
  return text
    .replace(/\b((?:password|otp|pin|cvv|api[ -]?key)\s*(?::|=|is)\s*)\S+/gi, "$1[REDACTED]")
    .replace(/\b((?:otp|pin|cvv)\s+)\d{3,8}\b/gi, "$1[REDACTED]")
    .replace(/\b(?:\d[ -]?){13,19}\b/g, "[REDACTED NUMBER]");
}

export function toGeminiContents(messages: AdvisorMessage[]) {
  const contents: { role: "user" | "model"; parts: { text: string }[] }[] = [];
  for (const message of prepareChatHistory(messages)) {
    const role = message.role === "assistant" ? "model" : "user";
    const part = { text: redactChatSecrets(message.content) };
    const previous = contents.at(-1);
    if (previous?.role === role) previous.parts.push(part);
    else contents.push({ role, parts: [part] });
  }
  return contents;
}
