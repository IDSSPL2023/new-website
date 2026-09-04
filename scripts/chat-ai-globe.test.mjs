import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import * as globeMath from "../src/lib/chat-ai-globe.ts";

const { createNeuralGlobe, globeArcPoint, rotateGlobePoint, rotateGlobePointsInto } = globeMath;

const globe = createNeuralGlobe();
const radius = ({ x, y, z }) => Math.hypot(x, y, z);

test("globe nodes are deterministic and lie on a sphere", () => {
  assert.equal(globe.nodes.length, 64);
  assert.deepEqual(createNeuralGlobe(), globe);
  for (const point of globe.nodes) assert.ok(Math.abs(radius(point) - 1) < 1e-12);
});

test("neural links are unique and connect every globe node", () => {
  const pairs = new Set();
  const degree = Array(64).fill(0);
  for (const link of globe.links) {
    assert.notEqual(link.start, link.end);
    const key = [link.start, link.end].sort((a, b) => a - b).join(":");
    assert.ok(!pairs.has(key));
    pairs.add(key);
    degree[link.start]++;
    degree[link.end]++;
  }
  assert.ok(degree.every((value) => value >= 3));
});

test("connection paths and moving signals stay on the globe surface", () => {
  for (const link of globe.links) {
    const start = globe.nodes[link.start];
    const end = globe.nodes[link.end];
    for (const point of link.points) assert.ok(Math.abs(radius(point) - 1) < 1e-12);
    for (const progress of [0, 0.1, 0.5, 0.8, 1]) {
      assert.ok(Math.abs(radius(globeArcPoint(start, end, progress)) - 1) < 1e-12);
    }
  }
});

test("rotation preserves depth geometry and globe guide loops remain closed", () => {
  for (const point of globe.nodes) {
    for (const yaw of [0, 0.5, Math.PI, 5]) {
      assert.ok(Math.abs(radius(rotateGlobePoint(point, yaw, -0.23)) - 1) < 1e-12);
    }
  }
  for (const curve of globe.guides) {
    const start = curve[0];
    const end = curve.at(-1);
    assert.ok(Math.hypot(start.x - end.x, start.y - end.y, start.z - end.z) < 1e-12);
  }
});

test("batched rotation matches the original geometry without replacing output points", () => {
  const output = globe.nodes.map(() => ({ x: 0, y: 0, z: 0 }));
  const references = [...output];
  const original = structuredClone(globe.nodes);
  for (const yaw of [0, 0.7, 2.8]) {
    rotateGlobePointsInto(globe.nodes, output, yaw, -0.2);
    output.forEach((point, index) => {
      assert.equal(point, references[index]);
      assert.deepEqual(point, rotateGlobePoint(globe.nodes[index], yaw, -0.2));
    });
  }
  assert.deepEqual(globe.nodes, original);
});

const renderer = ts.transpileModule(
  readFileSync(new URL("../src/components/site/ChatAIOrb.tsx", import.meta.url), "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  },
).outputText;

function eventTarget() {
  const listeners = new Map();
  return {
    listeners,
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: (name) => listeners.delete(name),
    emit: (name) => listeners.get(name)?.(),
  };
}

function mountOrb(reduced = false) {
  const stats = { paints: 0, gradients: 0, strokes: 0, points: [], paths: [] };
  const frames = new Map();
  const effects = [];
  let frameId = 0;
  let clock = 0;
  let intersection;
  let disconnected = 0;
  const makeContext = (main = false) => ({
    path: [],
    setTransform() {},
    clearRect() {
      if (!main) return;
      stats.paints++;
      stats.strokes = 0;
      stats.points = [];
      stats.paths = [];
    },
    drawImage() {},
    createRadialGradient() {
      stats.gradients++;
      return { addColorStop() {} };
    },
    fillRect() {},
    beginPath() {
      this.path = [];
    },
    arc(x, y, radius) {
      if (main) stats.points.push([x, y, radius]);
    },
    fill() {},
    stroke() {
      if (!main) return;
      stats.strokes++;
      stats.paths.push({ width: this.lineWidth, color: this.strokeStyle, points: this.path });
    },
    moveTo(x, y) {
      if (main) this.path.push([x, y]);
    },
    lineTo(x, y) {
      if (main) this.path.push([x, y]);
    },
  });
  const context = makeContext(true);
  const baseContext = makeContext();
  const canvas = { getContext: () => context };
  const media = { ...eventTarget(), matches: reduced };
  const window = {
    devicePixelRatio: 2,
    matchMedia: () => media,
    requestAnimationFrame(callback) {
      frames.set(++frameId, callback);
      return frameId;
    },
    cancelAnimationFrame: (id) => frames.delete(id),
  };
  const document = {
    ...eventTarget(),
    hidden: false,
    createElement: () => ({ getContext: () => baseContext }),
  };
  const exports = {};
  vm.runInNewContext(renderer, {
    exports,
    window,
    document,
    performance: { now: () => clock },
    ResizeObserver: class {
      constructor(callback) {
        this.callback = callback;
      }
      observe() {
        this.callback([{ contentRect: { width: 224, height: 195 } }]);
      }
      disconnect() {
        disconnected++;
      }
    },
    IntersectionObserver: class {
      constructor(callback) {
        intersection = callback;
      }
      observe() {
        intersection([{ isIntersecting: true }]);
      }
      disconnect() {
        disconnected++;
      }
    },
    require(name) {
      if (name === "react") {
        return { useRef: () => ({ current: canvas }), useEffect: (effect) => effects.push(effect) };
      }
      if (name === "react/jsx-runtime") return { jsx: () => null };
      if (name === "@/lib/chat-ai-globe") return globeMath;
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  exports.ChatAIOrb();
  const cleanup = effects[0]();
  return {
    stats,
    frames,
    media,
    document,
    cleanup,
    disconnected: () => disconnected,
    intersect: (visible) => intersection([{ isIntersecting: visible }]),
    step(time) {
      clock = time;
      const callbacks = [...frames.values()];
      frames.clear();
      callbacks.forEach((callback) => callback(time));
    },
  };
}

test("globe draws each display frame while caching gradients and batching network strokes", () => {
  for (const fps of [60, 120]) {
    const app = mountOrb();
    const initial = app.stats.paints;
    for (let index = 1; index <= fps; index++) app.step((index * 1000) / fps);
    assert.equal(app.stats.paints - initial, fps);
    assert.equal(app.stats.gradients, 2, "lighting is baked once, not recreated per frame");
    assert.ok(
      app.stats.strokes > 0 && app.stats.strokes <= 10,
      "network connections share batched strokes",
    );
    assert.equal(app.frames.size, 1);
    app.cleanup();
  }
});

test("globe rotation and signal trails have consistent speed at 60 and 120 Hz", () => {
  const snapshots = [60, 120].map((fps) => {
    const app = mountOrb();
    for (let index = 1; index <= fps; index++) app.step((index * 1000) / fps);
    const points = app.stats.points;
    app.cleanup();
    return points;
  });
  assert.ok(snapshots[0].length >= 64);
  assert.equal(snapshots[0].length, snapshots[1].length);
  snapshots[0].forEach((point, index) => {
    point.forEach((value, axis) => assert.ok(Math.abs(value - snapshots[1][index][axis]) < 1e-8));
  });
});

test("globe pauses offscreen or in hidden tabs and releases its observers and listeners", () => {
  const app = mountOrb();
  app.intersect(false);
  assert.equal(app.frames.size, 0);
  app.intersect(true);
  assert.equal(app.frames.size, 1);
  app.document.hidden = true;
  app.document.emit("visibilitychange");
  assert.equal(app.frames.size, 0);
  app.document.hidden = false;
  app.document.emit("visibilitychange");
  assert.equal(app.frames.size, 1);
  app.cleanup();
  assert.equal(app.frames.size, 0);
  assert.equal(app.disconnected(), 2);
  assert.equal(app.media.listeners.size, 0);
  assert.equal(app.document.listeners.size, 0);
});

test("reduced motion renders a static globe without scheduling animation", () => {
  const app = mountOrb(true);
  assert.equal(app.frames.size, 0);
  const paints = app.stats.paints;
  app.step(5000);
  assert.equal(app.stats.paints, paints);
  app.cleanup();
});

test("the scanning ring moves on the globe and no outer orbit is drawn", () => {
  const app = mountOrb();
  const firstScan = app.stats.paths.find((path) => path.width === 1.25);
  assert.ok(firstScan.points.length > 20);
  for (let index = 1; index <= 90; index++) {
    app.step((index * 1000) / 60);
    assert.ok(app.stats.paths.some((path) => path.width === 1.25));
    assert.ok(app.stats.paths.every((path) => path.width !== 0.8));
    for (const path of app.stats.paths) {
      for (const [x, y] of path.points) {
        assert.ok(Math.hypot(x - 112, y - 195 * 0.48) <= 195 * 0.355 + 1e-8);
      }
    }
  }
  const finalScan = app.stats.paths.find((path) => path.width === 1.25);
  assert.notDeepEqual(firstScan.points, finalScan.points);
  assert.ok(
    app.stats.points.some((point) => point[2] === 4.2),
    "nearby nodes have activation halos",
  );
  app.cleanup();
});
