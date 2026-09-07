/** Keep chat cancellation compatible with browsers without AbortSignal.any/timeout. */
export function createChatRequest(timeoutMs = 42_000) {
  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  const dispose = () => {
    clearTimeout(timer);
    controller.signal.removeEventListener("abort", dispose);
  };
  controller.signal.addEventListener("abort", dispose, { once: true });

  return {
    controller,
    get timedOut() {
      return timedOut;
    },
    dispose,
  };
}
