import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync(
  new URL("../src/components/site/AILayerParticles.tsx", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    jsx: ts.JsxEmit.ReactJSX,
  },
}).outputText;

function eventTarget() {
  const listeners = new Map();
  return {
    listeners,
    addEventListener(name, callback) {
      listeners.set(name, callback);
    },
    removeEventListener(name) {
      listeners.delete(name);
    },
    emit(name, event = {}) {
      listeners.get(name)?.(event);
    },
  };
}

function mount({ reduced = false, fine = true, width = 1000, height = 120 } = {}) {
  const stats = { paints: 0, boundsReads: 0, sprites: 0, points: [] };
  const frames = new Map();
  const effects = [];
  const context = {
    setTransform() {},
    clearRect() {
      stats.paints++;
      stats.points = [];
    },
    drawImage(_sprite, x, y, width, height) {
      stats.points.push([x, y, width, height, this.globalAlpha]);
    },
  };
  const canvas = {
    getContext: () => context,
    getBoundingClientRect() {
      stats.boundsReads++;
      return { left: 0, top: 0, width, height };
    },
  };
  const stage = {
    ...eventTarget(),
    querySelector: () => ({ getBoundingClientRect: () => ({ top: 160, bottom: 300 }) }),
  };
  const reducedMotion = { ...eventTarget(), matches: reduced };
  const finePointer = { ...eventTarget(), matches: fine };
  let frameId = 0;
  let intersection;
  let disconnected = 0;
  const window = {
    ...eventTarget(),
    devicePixelRatio: 2,
    matchMedia: (query) => (query.includes("reduced-motion") ? reducedMotion : finePointer),
    requestAnimationFrame(callback) {
      frames.set(++frameId, callback);
      return frameId;
    },
    cancelAnimationFrame(id) {
      frames.delete(id);
    },
  };
  const document = {
    ...eventTarget(),
    hidden: false,
    createElement() {
      stats.sprites++;
      return {
        getContext: () => ({
          createRadialGradient: () => ({ addColorStop() {} }),
          fillRect() {},
        }),
      };
    },
  };
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    window,
    document,
    performance: { now: () => 0 },
    ResizeObserver: class {
      constructor(callback) {
        this.callback = callback;
      }
      observe() {
        this.callback();
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
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  exports.AILayerParticles({ stageRef: { current: stage } });
  const cleanup = effects[0]();
  return {
    stats,
    stage,
    window,
    document,
    reducedMotion,
    finePointer,
    frames,
    canvas,
    cleanup,
    disconnected: () => disconnected,
    intersect: (visible) => intersection([{ isIntersecting: visible }]),
    step(time) {
      const callbacks = [...frames.values()];
      frames.clear();
      callbacks.forEach((callback) => callback(time));
    },
  };
}

test("paints every display frame at 60 and 120 Hz, with only two cached sprites", () => {
  for (const fps of [60, 120]) {
    const app = mount();
    const initial = app.stats.paints;
    for (let index = 1; index <= fps; index++) app.step((index * 1000) / fps);
    assert.equal(app.stats.paints - initial, fps);
    assert.equal(app.stats.sprites, 2);
    assert.equal(app.frames.size, 1);
    assert.equal(app.canvas.width, 1500, "pixel density is bounded");
    app.cleanup();
  }
});

test("wave and cursor damping stay consistent across refresh rates", () => {
  const positions = [60, 120].map((fps) => {
    const app = mount();
    app.stage.emit("pointermove", { pointerType: "mouse", clientX: 630, clientY: 90 });
    for (let index = 1; index <= fps; index++) app.step((index * 1000) / fps);
    const points = app.stats.points;
    app.cleanup();
    return points;
  });
  assert.ok(positions[0].length > 1000);
  assert.equal(positions[0].length, positions[1].length);
  positions[0].forEach((point, index) => {
    point.forEach((value, axis) => assert.ok(Math.abs(value - positions[1][index][axis]) < 1e-8));
  });
});

test("pointer events avoid synchronous layout reads; scrolling invalidates cached bounds", () => {
  const app = mount();
  const initial = app.stats.boundsReads;
  for (let index = 0; index < 100; index++) {
    app.stage.emit("pointermove", { pointerType: "mouse", clientX: index, clientY: 100 });
  }
  assert.equal(app.stats.boundsReads, initial);
  app.step(17);
  assert.equal(app.stats.boundsReads, initial + 1);
  app.step(34);
  assert.equal(app.stats.boundsReads, initial + 1);
  app.window.emit("scroll");
  app.step(51);
  assert.equal(app.stats.boundsReads, initial + 2);
  app.cleanup();
});

test("hidden and offscreen sections stop the animation; cleanup removes all listeners", () => {
  const app = mount();
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
  for (const target of [app.stage, app.window, app.document, app.reducedMotion, app.finePointer]) {
    assert.equal(target.listeners.size, 0);
  }
});

test("reduced motion stays static and touch does not trigger cursor effects", () => {
  const reduced = mount({ reduced: true });
  assert.equal(reduced.frames.size, 0);
  const paints = reduced.stats.paints;
  reduced.step(1000);
  assert.equal(reduced.stats.paints, paints);
  reduced.cleanup();

  const touch = mount();
  const baseline = mount();
  touch.stage.emit("pointermove", { pointerType: "touch", clientX: 700, clientY: 75 });
  touch.step(17);
  baseline.step(17);
  assert.deepEqual(touch.stats.points, baseline.stats.points);
  touch.cleanup();
  baseline.cleanup();
});

test("bottom wave fills the width and stays inside its shallow field on mobile and desktop", () => {
  const counts = [];
  for (const width of [390, 1440]) {
    const app = mount({ width, height: 120 });
    app.step(17);
    const centers = app.stats.points.map(([x, y, w, h]) => [x + w / 2, y + h / 2]);
    assert.ok(centers.some(([x]) => x < width * 0.1));
    assert.ok(centers.some(([x]) => x > width * 0.9));
    assert.ok(centers.some(([, y]) => y > 100));
    for (const [x, y] of centers) {
      assert.ok(x >= 0 && x <= width && y >= 0 && y <= 120);
    }
    counts.push(centers.length);
    app.cleanup();
  }
  assert.ok(counts[0] < counts[1], "mobile uses fewer particles");
});

test("a cursor in the bottom field visibly changes the wave", () => {
  const interactive = mount();
  const baseline = mount();
  interactive.stage.emit("pointermove", { pointerType: "mouse", clientX: 620, clientY: 80 });
  for (let index = 1; index <= 30; index++) {
    interactive.step((index * 1000) / 60);
    baseline.step((index * 1000) / 60);
  }
  assert.notDeepEqual(interactive.stats.points, baseline.stats.points);
  interactive.cleanup();
  baseline.cleanup();
});
