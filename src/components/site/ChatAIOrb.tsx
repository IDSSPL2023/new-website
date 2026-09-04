import { useEffect, useRef } from "react";

import {
  createNeuralGlobe,
  globeArcPoint,
  rotateGlobePoint,
  rotateGlobePointsInto,
  type GlobePoint,
} from "@/lib/chat-ai-globe";

const globe = createNeuralGlobe();
const TAU = Math.PI * 2;
const scanCircle = Array.from({ length: 65 }, (_, index) => {
  const angle = (index / 64) * TAU;
  return { x: Math.cos(angle), z: Math.sin(angle) };
});
const sourcePoints = [
  ...globe.guides.flat(),
  ...globe.links.flatMap((link) => link.points),
  ...globe.nodes,
];
const color = (alpha: number) => "rgba(108, 161, 190, " + alpha + ")";

export function ChatAIOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const base = document.createElement("canvas");
    const baseContext = base.getContext("2d");
    if (!baseContext) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const emptyPoint = () => ({ x: 0, y: 0, z: 0 });
    const guides = globe.guides.map((curve) => curve.map(emptyPoint));
    const links = globe.links.map((link) => link.points.map(emptyPoint));
    const nodes = globe.nodes.map(emptyPoint);
    const rotatedPoints = [...guides.flat(), ...links.flat(), ...nodes];
    const scanPlane = scanCircle.map(emptyPoint);
    const scanRing = [scanCircle.map(emptyPoint)];
    const illuminatedLinks: GlobePoint[][] = [];
    let visible = false;
    let frame = 0;
    let elapsed = 0;
    let lastPaint = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let radius = 0;
    let centerX = 0;
    let centerY = 0;

    // Batch all routes of a hemisphere into one path instead of one stroke per link.
    const strokeHemisphere = (
      curves: GlobePoint[][],
      front: boolean,
      alpha: number,
      lineWidth = 0.7,
      target = context,
    ) => {
      target.beginPath();
      for (const points of curves) {
        for (let index = 1; index < points.length; index++) {
          const a = points[index - 1];
          const b = points[index];
          if (a.z + b.z >= 0 !== front) continue;
          target.moveTo(centerX + a.x * radius, centerY + a.y * radius);
          target.lineTo(centerX + b.x * radius, centerY + b.y * radius);
        }
      }
      target.strokeStyle = color(alpha);
      target.lineWidth = lineWidth;
      target.stroke();
    };
    const dot = (point: GlobePoint, size: number, alpha: number) => {
      context.beginPath();
      context.arc(centerX + point.x * radius, centerY + point.y * radius, size, 0, TAU);
      context.fillStyle = color(alpha);
      context.fill();
    };

    // The glass lighting is static: bake it only when the canvas changes size.
    const paintBase = () => {
      const atmosphere = baseContext.createRadialGradient(
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
      baseContext.fillStyle = atmosphere;
      baseContext.fillRect(0, 0, width, height);

      const surface = baseContext.createRadialGradient(
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
      baseContext.beginPath();
      baseContext.arc(centerX, centerY, radius, 0, TAU);
      baseContext.fillStyle = surface;
      baseContext.fill();
      baseContext.strokeStyle = color(0.28);
      baseContext.lineWidth = 0.85;
      baseContext.stroke();
    };

    const draw = (time: number) => {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      context.drawImage(base, 0, 0, width, height);
      const yaw = time * 0.18 + 0.4;
      const tilt = -0.23 + Math.sin(time * 0.18) * 0.055;
      const transform = (point: GlobePoint) => rotateGlobePoint(point, yaw, tilt);
      rotateGlobePointsInto(sourcePoints, rotatedPoints, yaw, tilt);

      // The scanning ring follows the globe surface; there is no outer orbit ring.
      const activityLatitude = Math.sin(time * 0.85 - 0.3) * 0.88;
      const activityRadius = Math.sqrt(1 - activityLatitude * activityLatitude);
      for (let index = 0; index < scanCircle.length; index++) {
        scanPlane[index].x = scanCircle[index].x * activityRadius;
        scanPlane[index].y = activityLatitude;
        scanPlane[index].z = scanCircle[index].z * activityRadius;
      }
      rotateGlobePointsInto(scanPlane, scanRing[0], yaw, tilt);
      illuminatedLinks.length = 0;
      for (let index = 0; index < globe.links.length; index++) {
        const link = globe.links[index];
        const latitude = (globe.nodes[link.start].y + globe.nodes[link.end].y) / 2;
        if (Math.abs(latitude - activityLatitude) < 0.13) illuminatedLinks.push(links[index]);
      }

      strokeHemisphere(guides, false, 0.045, 0.55);
      strokeHemisphere(links, false, 0.06, 0.55);
      strokeHemisphere(scanRing, false, 0.18, 0.9);
      for (const point of nodes) if (point.z < 0) dot(point, 0.65, 0.13);

      strokeHemisphere(guides, true, 0.15, 0.6);
      strokeHemisphere(links, true, 0.25, 0.65);
      strokeHemisphere(illuminatedLinks, true, 0.4, 0.9);
      strokeHemisphere(scanRing, true, 0.11, 5);
      strokeHemisphere(scanRing, true, 0.72, 1.25);
      for (let index = 0; index < nodes.length; index++) {
        const point = nodes[index];
        if (point.z < 0) continue;
        const pulse = Math.sin(time * 1.6 + index * 0.7) * 0.035;
        const proximity = Math.exp(-Math.pow((globe.nodes[index].y - activityLatitude) * 10, 2));
        if (proximity > 0.08) dot(point, 4.2, proximity * 0.18);
        dot(
          point,
          0.8 + point.z * 0.65 + proximity * 0.65,
          Math.min(0.95, 0.42 + point.z * 0.38 + pulse + proximity * 0.22),
        );
      }

      // A small signal travels over the surface as nearby nodes and routes wake up.
      const probe = transform({
        x: Math.cos(time * 1.4) * activityRadius,
        y: activityLatitude,
        z: Math.sin(time * 1.4) * activityRadius,
      });
      if (probe.z >= 0) {
        dot(probe, 5.2, 0.14);
        dot(probe, 2, 0.9);
      }

      // Small traveling signals suggest intelligence moving across connections.
      for (let index = 0; index < 5; index++) {
        const link = globe.links[(index * 19 + 7) % globe.links.length];
        const progress = (time * 0.28 + index * 0.23) % 1;
        // A short, fading trail adds motion without extra rings or brighter colours.
        for (let trail = 3; trail > 0; trail--) {
          const trailingProgress = progress - trail * 0.045;
          if (trailingProgress < 0) continue;
          const trailingPoint = transform(
            globeArcPoint(globe.nodes[link.start], globe.nodes[link.end], trailingProgress),
          );
          if (trailingPoint.z <= 0) continue;
          dot(trailingPoint, 0.85, Math.sin(trailingProgress * Math.PI) * (1 - trail / 4) * 0.3);
        }
        const point = transform(
          globeArcPoint(globe.nodes[link.start], globe.nodes[link.end], progress),
        );
        if (point.z <= 0) continue;
        const opacity = Math.sin(progress * Math.PI) * (0.4 + point.z * 0.3);
        dot(point, 3.2, opacity * 0.09);
        dot(point, 1.2, opacity);
      }

      // A narrow glass reflection reinforces the globe's volume.
      context.beginPath();
      context.arc(centerX, centerY, radius - 1, -Math.PI * 0.94, -Math.PI * 0.57);
      context.strokeStyle = color(0.33);
      context.lineWidth = 1.2;
      context.stroke();
    };

    const tick = (now: number) => {
      elapsed += Math.max(0, Math.min((now - lastPaint) / 1000, 0.05));
      lastPaint = now;
      draw(elapsed);
      frame = window.requestAnimationFrame(tick);
    };
    const syncMotion = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      lastPaint = performance.now();
      if (!visible || document.hidden) return;
      draw(elapsed);
      if (!document.hidden && !reducedMotion.matches) frame = window.requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(([entry]) => {
      if (!entry) return;
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      base.width = canvas.width;
      base.height = canvas.height;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      baseContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      radius = Math.min(width, height) * 0.355;
      centerX = width / 2;
      centerY = height * 0.48;
      if (!width || !height) return;
      paintBase();
      draw(elapsed);
    });
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      visible = entry.isIntersecting;
      syncMotion();
    });
    resize.observe(canvas);
    observer.observe(canvas);
    reducedMotion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncMotion);
    syncMotion();

    return () => {
      window.cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncMotion);
    };
  }, []);

  return <canvas ref={canvasRef} className="chatbot-ai-canvas" aria-hidden="true" />;
}
