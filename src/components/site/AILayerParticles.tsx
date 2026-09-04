import { useEffect, useRef, type RefObject } from "react";

const COLUMNS = 88;
const ROWS = 18;
const particles = Array.from({ length: COLUMNS * ROWS }, (_, index) => ({
  x: ((index % COLUMNS) / (COLUMNS - 1)) * 11 - 5.5,
  z: (Math.floor(index / COLUMNS) / (ROWS - 1)) * 6.4 - 3.2,
  accent: index % 37 === 0,
}));
const cosine = Math.cos(0.82);
const sine = Math.sin(0.82);

function createDotSprite(color: string) {
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = 32;
  const context = sprite.getContext("2d");
  if (!context) return sprite;

  const halo = context.createRadialGradient(16, 16, 0, 16, 16, 16);
  halo.addColorStop(0, `rgba(${color}, 0.045)`);
  halo.addColorStop(1, `rgba(${color}, 0)`);
  context.fillStyle = halo;
  context.fillRect(0, 0, 32, 32);

  const dot = context.createRadialGradient(16, 16, 0, 16, 16, 4.5);
  dot.addColorStop(0, `rgba(${color}, 1)`);
  dot.addColorStop(0.7, `rgba(${color}, 1)`);
  dot.addColorStop(1, `rgba(${color}, 0)`);
  context.fillStyle = dot;
  context.fillRect(11, 11, 10, 10);
  return sprite;
}

export function AILayerParticles({ stageRef }: { stageRef: RefObject<HTMLDivElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !stage || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    // Bake the dot and its soft edge once, instead of creating 1,600+ paths per frame.
    const dotSprite = createDotSprite("66, 139, 189");
    const accentSprite = createDotSprite("107, 184, 214");
    let frame = 0;
    let visible = false;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let lastPaint = 0;
    let elapsed = 0;
    let activeParticles = particles;
    let pointerX = 0;
    let pointerZ = 0;
    let targetX = 0;
    let targetZ = 0;
    let influence = 0;
    let targetInfluence = 0;
    let pointerClientX = 0;
    let pointerClientY = 0;
    let boundsLeft = 0;
    let boundsTop = 0;
    let boundsDirty = true;

    const draw = () => {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const scaleX = width / 11.4;
      const scaleY = height / 5.8;
      const interactive = influence > 0.001;

      for (const particle of activeParticles) {
        const dx = particle.x - pointerX;
        const dz = particle.z - pointerZ;
        const distanceSquared = dx * dx + dz * dz;
        const response = interactive ? Math.exp(-distanceSquared * 0.42) * influence : 0;
        const ripple =
          response > 0.001
            ? Math.sin(Math.sqrt(distanceSquared) * 3.3 - elapsed * 2.1) * response * 0.55
            : 0;
        const x = particle.x + dx * response * 0.12;
        const z = particle.z + dz * response * 0.09;
        const y =
          Math.sin(x * 0.78 + elapsed * 0.65) * 0.38 +
          Math.cos(z * 1.25 - elapsed * 0.48 + x * 0.23) * 0.32 +
          ripple;
        const depth = z * cosine + y * sine;
        const perspective = 9 / (9 - depth);
        const screenX = width / 2 + x * scaleX * perspective;
        const screenY = height * 0.38 + (z * sine - y * cosine) * scaleY * perspective;
        if (screenX < 0 || screenX > width || screenY < 0 || screenY > height) continue;

        const edge = Math.min(
          1,
          screenX / 48,
          (width - screenX) / 48,
          screenY / 18,
          (height - screenY) / 22,
        );
        const alpha = Math.max(0, (0.17 + (depth + 3) * 0.045 + response * 0.12) * edge);
        const size = Math.max(0.5, (0.7 + (depth + 3) * 0.065) * (particle.accent ? 1.35 : 1));

        context.globalAlpha = Math.min(1, alpha);
        context.drawImage(
          particle.accent ? accentSprite : dotSprite,
          screenX - size * 4,
          screenY - size * 4,
          size * 8,
          size * 8,
        );
      }
      context.globalAlpha = 1;
    };

    const tick = (now: number) => {
      // Draw on every display frame. Time-based damping feels the same at 60/120 Hz.
      const delta = Math.max(0, Math.min((now - lastPaint) / 1000, 0.05));
      lastPaint = now;
      elapsed += delta;
      if (targetInfluence && width && height) {
        if (boundsDirty) {
          const bounds = canvas.getBoundingClientRect();
          boundsLeft = bounds.left;
          boundsTop = bounds.top;
          boundsDirty = false;
        }
        const u = (pointerClientX - boundsLeft) / width;
        const v = (pointerClientY - boundsTop) / height;
        if (u >= 0 && u <= 1 && v >= 0 && v <= 1) {
          // Invert the plane's perspective so the ripple follows the cursor's visible position.
          const projectedY = (v - 0.38) * 5.8;
          targetZ = Math.max(
            -3.2,
            Math.min(3.2, (9 * projectedY) / (9 * sine + projectedY * cosine)),
          );
          targetX = Math.max(-5.5, Math.min(5.5, ((u - 0.5) * 11.4 * (9 - targetZ * cosine)) / 9));
        } else {
          targetInfluence = 0;
        }
      }
      const pointerEase = 1 - Math.exp(-delta * 9);
      const influenceEase = 1 - Math.exp(-delta * 6);
      pointerX += (targetX - pointerX) * pointerEase;
      pointerZ += (targetZ - pointerZ) * pointerEase;
      influence += (targetInfluence - influence) * influenceEase;
      draw();
      frame = window.requestAnimationFrame(tick);
    };
    const syncMotion = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      boundsDirty = true;
      if (reducedMotion.matches || !finePointer.matches) targetInfluence = influence = 0;
      if (!visible || document.hidden) return;
      draw();
      lastPaint = performance.now();
      if (visible && !document.hidden && !reducedMotion.matches)
        frame = window.requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || !finePointer.matches || reducedMotion.matches) return;
      pointerClientX = event.clientX;
      pointerClientY = event.clientY;
      targetInfluence = 1;
    };
    const leave = () => {
      targetInfluence = 0;
    };
    const invalidateBounds = () => {
      boundsDirty = true;
    };
    const resize = new ResizeObserver(() => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      // Keep the broad wave dense on desktop without over-drawing tiny mobile screens.
      activeParticles = width < 640 ? particles.filter((_, index) => index % 2 === 0) : particles;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      boundsLeft = bounds.left;
      boundsTop = bounds.top;
      boundsDirty = false;
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
    stage.addEventListener("pointerenter", invalidateBounds);
    stage.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", invalidateBounds, { passive: true });
    window.addEventListener("resize", invalidateBounds, { passive: true });
    document.addEventListener("visibilitychange", syncMotion);
    reducedMotion.addEventListener("change", syncMotion);
    finePointer.addEventListener("change", syncMotion);

    return () => {
      window.cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerenter", invalidateBounds);
      stage.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", invalidateBounds);
      window.removeEventListener("resize", invalidateBounds);
      document.removeEventListener("visibilitychange", syncMotion);
      reducedMotion.removeEventListener("change", syncMotion);
      finePointer.removeEventListener("change", syncMotion);
    };
  }, [stageRef]);

  return <canvas ref={canvasRef} className="ai-motion-particles" aria-hidden="true" />;
}
