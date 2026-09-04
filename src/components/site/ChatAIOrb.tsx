import { useEffect, useRef } from "react";

import {
  createNeuralGlobe,
  globeArcPoint,
  rotateGlobePoint,
  type GlobePoint,
} from "@/lib/chat-ai-globe";

const globe = createNeuralGlobe();
const TAU = Math.PI * 2;
const orbit = Array.from({ length: 97 }, (_, index) => {
  const angle = (index / 96) * TAU;
  return { x: Math.cos(angle) * 1.19, y: Math.sin(angle) * 0.38, z: Math.sin(angle) * 1.1 };
});

export function ChatAIOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let elapsed = 0;
    let lastPaint = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const draw = (time: number) => {
      if (!width || !height) return;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      const radius = Math.min(width, height) * 0.355;
      const centerX = width / 2;
      const centerY = height * 0.48;
      const yaw = time * 0.095 + 0.4;
      const tilt = -0.23 + Math.sin(time * 0.11) * 0.055;
      const transform = (point: GlobePoint) => rotateGlobePoint(point, yaw, tilt);
      const projected = (point: GlobePoint) => ({
        x: centerX + point.x * radius,
        y: centerY + point.y * radius,
      });
      const color = (alpha: number) => "rgba(108, 161, 190, " + alpha + ")";

      // Draw back and front hemispheres separately so routes wrap around
      // a shaded glass globe instead of reading as a flat network diagram.
      const strokeHemisphere = (
        points: GlobePoint[],
        front: boolean,
        alpha: number,
        lineWidth = 0.7,
      ) => {
        context.beginPath();
        for (let index = 1; index < points.length; index++) {
          const a = points[index - 1];
          const b = points[index];
          if (a.z + b.z >= 0 !== front) continue;
          const from = projected(a);
          const to = projected(b);
          context.moveTo(from.x, from.y);
          context.lineTo(to.x, to.y);
        }
        context.strokeStyle = color(alpha);
        context.lineWidth = lineWidth;
        context.stroke();
      };
      const dot = (point: GlobePoint, size: number, alpha: number) => {
        const position = projected(point);
        context.beginPath();
        context.arc(position.x, position.y, size, 0, TAU);
        context.fillStyle = color(alpha);
        context.fill();
      };
      const guides = globe.guides.map((curve) => curve.map(transform));
      const links = globe.links.map((link) => link.points.map(transform));
      const nodes = globe.nodes.map(transform);
      const orbitPoints = orbit.map((point) => rotateGlobePoint(point, 0.35, -0.32));

      // Restrained navy atmosphere; bright cyan is reserved for tiny signals.
      const atmosphere = context.createRadialGradient(
        centerX,
        centerY,
        radius * 0.55,
        centerX,
        centerY,
        radius * 1.38,
      );
      atmosphere.addColorStop(0, "rgba(49, 89, 129, 0.12)");
      atmosphere.addColorStop(0.7, "rgba(30, 64, 103, 0.05)");
      atmosphere.addColorStop(1, "rgba(30, 64, 103, 0)");
      context.fillStyle = atmosphere;
      context.fillRect(0, 0, width, height);
      strokeHemisphere(orbitPoints, false, 0.13);

      const surface = context.createRadialGradient(
        centerX - radius * 0.38,
        centerY - radius * 0.48,
        radius * 0.05,
        centerX,
        centerY,
        radius,
      );
      surface.addColorStop(0, "rgba(35, 65, 94, 0.82)");
      surface.addColorStop(0.46, "rgba(16, 35, 59, 0.88)");
      surface.addColorStop(0.85, "rgba(7, 19, 36, 0.94)");
      surface.addColorStop(1, "rgba(18, 39, 61, 0.9)");
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, TAU);
      context.fillStyle = surface;
      context.fill();
      context.strokeStyle = color(0.28);
      context.lineWidth = 0.85;
      context.stroke();

      guides.forEach((curve) => strokeHemisphere(curve, false, 0.045, 0.55));
      links.forEach((curve) => strokeHemisphere(curve, false, 0.06, 0.55));
      nodes.filter((point) => point.z < 0).forEach((point) => dot(point, 0.65, 0.13));

      guides.forEach((curve) => strokeHemisphere(curve, true, 0.15, 0.6));
      links.forEach((curve) => strokeHemisphere(curve, true, 0.25, 0.65));
      nodes
        .filter((point) => point.z >= 0)
        .sort((a, b) => a.z - b.z)
        .forEach((point) => {
          dot(point, 0.8 + point.z * 0.65, 0.42 + point.z * 0.38);
        });

      // Small traveling signals suggest intelligence moving across connections.
      for (let index = 0; index < 5; index++) {
        const link = globe.links[(index * 19 + 7) % globe.links.length];
        const progress = (time * 0.16 + index * 0.23) % 1;
        const point = transform(
          globeArcPoint(globe.nodes[link.start], globe.nodes[link.end], progress),
        );
        if (point.z <= 0) continue;
        const opacity = Math.sin(progress * Math.PI) * (0.4 + point.z * 0.3);
        dot(point, 3.2, opacity * 0.09);
        dot(point, 1.2, opacity);
      }

      // A narrow glass reflection and a single tilted orbit reinforce volume.
      context.beginPath();
      context.arc(centerX, centerY, radius - 1, -Math.PI * 0.94, -Math.PI * 0.57);
      context.strokeStyle = color(0.33);
      context.lineWidth = 1.2;
      context.stroke();
      strokeHemisphere(orbitPoints, true, 0.33, 0.8);
      const orbitAngle = time * 0.28 + 0.5;
      const satellite = rotateGlobePoint(
        {
          x: Math.cos(orbitAngle) * 1.19,
          y: Math.sin(orbitAngle) * 0.38,
          z: Math.sin(orbitAngle) * 1.1,
        },
        0.35,
        -0.32,
      );
      if (satellite.z >= 0) {
        dot(satellite, 3.5, 0.07);
        dot(satellite, 1.6, 0.8);
      }
    };

    const tick = (now: number) => {
      if (now - lastPaint >= 1000 / 30) {
        elapsed += Math.min((now - lastPaint) / 1000, 0.05);
        lastPaint = now;
        draw(elapsed);
      }
      frame = window.requestAnimationFrame(tick);
    };
    const syncMotion = () => {
      window.cancelAnimationFrame(frame);
      lastPaint = performance.now();
      draw(elapsed);
      if (!document.hidden && !reducedMotion.matches) frame = window.requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      draw(elapsed);
    });
    resize.observe(canvas);
    reducedMotion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncMotion);
    syncMotion();

    return () => {
      window.cancelAnimationFrame(frame);
      resize.disconnect();
      reducedMotion.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncMotion);
    };
  }, []);

  return <canvas ref={canvasRef} className="chatbot-ai-canvas" aria-hidden="true" />;
}
