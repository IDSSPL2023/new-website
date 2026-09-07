const baseUrl = process.env.OLLAMA_URL || "http://127.0.0.1:11434";
const model = process.env.OLLAMA_MODEL || "qwen3:1.7b";

try {
  const response = await fetch(`${baseUrl}/api/tags`, { signal: AbortSignal.timeout(3_000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const payload = await response.json();
  const installed = payload.models?.some((item) => item.name === model || item.model === model);
  if (!installed) {
    console.error(`Ollama is running, but ${model} is not installed. Run: pnpm ai:pull`);
    process.exitCode = 1;
  } else {
    console.log(`Local AI ready: ${model} at ${baseUrl}`);
  }
} catch {
  console.error("Ollama is not reachable. Install/start Ollama, then run: pnpm ai:pull");
  process.exitCode = 1;
}
