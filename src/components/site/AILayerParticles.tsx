import { useEffect, useRef, type RefObject } from "react";

const COLUMNS = 58;
const ROWS = 28;
const particles = Array.from({ length: COLUMNS * ROWS }, (_, index) => ({
  x: ((index % COLUMNS) / (COLUMNS - 1)) * 11 - 5.5,
  z: (Math.floor(index / COLUMNS) / (ROWS - 1)) * 6.4 - 3.2,
  accent: index % 37 === 0,
}));

export function AILayerParticles({ stageRef }: { stageRef: RefObject<HTMLDivElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !stage || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let visible = false;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let lastPaint = 0;
    let elapsed = 0;
    let panelTop = 0;
    let panelBottom = 0;
    let pointerX = 0;
    let pointerZ = 0;
    let targetX = 0;
    let targetZ = 0;
    let influence = 0;
    let targetInfluence = 0;

    const draw = () => {
      if (!width || !height) return;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      const scaleX = width / 12.8;
      const scaleY = height / 7;
      const cosine = Math.cos(0.82);
      const sine = Math.sin(0.82);

      for (const particle of particles) {
        const dx = particle.x - pointerX;
        const dz = particle.z - pointerZ;
        const distance = Math.hypot(dx, dz);
        const response = Math.exp(-distance * distance * 0.42) * influence;
        const ripple = Math.sin(distance * 3.3 - elapsed * 2.1) * response * 0.55;
        const x = particle.x + dx * response * 0.12;
        const z = particle.z + dz * response * 0.09;
        const y =
          Math.sin(x * 0.78 + elapsed * 0.65) * 0.38 +
          Math.cos(z * 1.25 - elapsed * 0.48 + x * 0.23) * 0.32 +
          ripple;
        const depth = z * cosine + y * sine;
        const perspective = 9 / (9 - depth);
        const screenX = width / 2 + x * scaleX * perspective;
        const screenY = height / 2 + (z * sine - y * cosine) * scaleY * perspective;
        if (screenX < 0 || screenX > width || screenY < 0 || screenY > height) continue;

        const edge = Math.min(
          1,
          screenX / 70,
          (width - screenX) / 70,
          screenY / 40,
          (height - screenY) / 40,
        );
        // Leave the original text panel readable; the wave is strongest around it.
        const panelDistance = Math.max(panelTop - screenY, screenY - panelBottom, 0);
        const textMask = 0.16 + Math.min(1, panelDistance / 32) * 0.84;
        const alpha = Math.max(0, (0.17 + (depth + 3) * 0.045 + response * 0.12) * edge * textMask);
        const size = Math.max(0.5, (0.7 + (depth + 3) * 0.065) * (particle.accent ? 1.35 : 1));

        if (response > 0.28 && textMask > 0.5) {
          context.beginPath();
          context.arc(screenX, screenY, size * 3.1, 0, Math.PI * 2);
          context.fillStyle = "rgba(69, 139, 184, " + alpha * response * 0.065 + ")";
          context.fill();
        }
        context.beginPath();
        context.arc(screenX, screenY, size, 0, Math.PI * 2);
        context.fillStyle = particle.accent
          ? "rgba(107, 184, 214, " + alpha + ")"
          : "rgba(66, 139, 189, " + alpha + ")";
        context.fill();
      }
    };

    const tick = (now: number) => {
      if (now - lastPaint >= 1000 / 30) {
        elapsed += Math.min((now - lastPaint) / 1000, 0.05);
        lastPaint = now;
        pointerX += (targetX - pointerX) * 0.075;
        pointerZ += (targetZ - pointerZ) * 0.075;
        influence += (targetInfluence - influence) * 0.055;
        draw();
      }
      frame = window.requestAnimationFrame(tick);
    };
    const syncMotion = () => {
      window.cancelAnimationFrame(frame);
      if (reducedMotion.matches || !finePointer.matches) targetInfluence = influence = 0;
      draw();
      lastPaint = performance.now();
      if (visible && !document.hidden && !reducedMotion.matches)
        frame = window.requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || !finePointer.matches || reducedMotion.matches) return;
      const bounds = canvas.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 11;
      targetZ = ((event.clientY - bounds.top) / bounds.height - 0.5) * 6.4;
      targetInfluence = 1;
    };
    const leave = () => {
      targetInfluence = 0;
    };
    const resize = new ResizeObserver(() => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      const panel = stage.querySelector(".ai-motion-panel")?.getBoundingClientRect();
      panelTop = panel ? panel.top - bounds.top : height * 0.35;
      panelBottom = panel ? panel.bottom - bounds.top : height * 0.65;
      draw();
    });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        visible = entry.isIntersecting;
        syncMotion();
      },
      { threshold: 0.01 },
    );
    resize.observe(canvas);
    observer.observe(stage);
    stage.addEventListener("pointermove", move, { passive: true });
    stage.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", syncMotion);
    reducedMotion.addEventListener("change", syncMotion);
    finePointer.addEventListener("change", syncMotion);

    return () => {
      window.cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", syncMotion);
      reducedMotion.removeEventListener("change", syncMotion);
      finePointer.removeEventListener("change", syncMotion);
    };
  }, [stageRef]);

  return <canvas ref={canvasRef} className="ai-motion-particles" aria-hidden="true" />;
}
