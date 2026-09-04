import { useEffect, useRef } from "react";

export function useAILayerMotion() {
  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let visible = false;
    let frame = 0;
    let pointerClientX = 0;
    let pointerClientY = 0;
    let hasPointer = false;

    const update = () => {
      frame = 0;
      const reduced = reducedMotion.matches;
      const bounds = stage.getBoundingClientRect();
      const progress = reduced
        ? 0
        : Math.max(
            -1,
            Math.min(
              1,
              (window.innerHeight / 2 - bounds.top - bounds.height / 2) / window.innerHeight,
            ),
          );
      const active = !reduced && finePointer.matches && hasPointer;
      const x = active
        ? Math.max(-1, Math.min(1, ((pointerClientX - bounds.left) / bounds.width) * 2 - 1))
        : 0;
      const y = active
        ? Math.max(-1, Math.min(1, ((pointerClientY - bounds.top) / bounds.height) * 2 - 1))
        : 0;
      stage.style.setProperty("--ai-glow-x", x * 28 + "%");
      stage.style.setProperty("--ai-glow-y", y * 28 + "%");
      stage.style.setProperty("--ai-scroll-shift", progress * 12 + "px");
      stage.dataset["motion"] = visible && !document.hidden && !reduced ? "running" : "paused";
      stage.dataset["pointer"] = hasPointer && finePointer.matches && !reduced ? "active" : "idle";
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches || event.pointerType === "touch") return;
      // Coalesce high-frequency pointer events into one layout read per display frame.
      pointerClientX = event.clientX;
      pointerClientY = event.clientY;
      hasPointer = true;
      schedule();
    };
    const leave = () => {
      hasPointer = false;
      schedule();
    };
    const scroll = () => {
      if (visible && !reducedMotion.matches) schedule();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        visible = entry.isIntersecting;
        schedule();
      },
      { threshold: 0.05 },
    );
    observer.observe(stage);
    stage.addEventListener("pointermove", move, { passive: true });
    stage.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    reducedMotion.addEventListener("change", schedule);
    finePointer.addEventListener("change", schedule);
    schedule();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      reducedMotion.removeEventListener("change", schedule);
      finePointer.removeEventListener("change", schedule);
    };
  }, []);

  return stageRef;
}
