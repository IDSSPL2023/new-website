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
    let pointerX = 0;
    let pointerY = 0;
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
      const x = !reduced && finePointer.matches && hasPointer ? pointerX : 0;
      const y = !reduced && finePointer.matches && hasPointer ? pointerY : 0;
      stage.style.setProperty("--ai-pointer-x", 50 + x * 42 + "%");
      stage.style.setProperty("--ai-pointer-y", 50 + y * 42 + "%");
      stage.style.setProperty("--ai-scroll-shift", progress * 12 + "px");
      stage.dataset["motion"] = visible && !document.hidden && !reduced ? "running" : "paused";
      stage.dataset["pointer"] = hasPointer && finePointer.matches && !reduced ? "active" : "idle";
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches || event.pointerType === "touch") return;
      const bounds = stage.getBoundingClientRect();
      pointerX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
      pointerY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));
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
