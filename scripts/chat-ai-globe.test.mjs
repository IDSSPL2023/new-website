import test from "node:test";
import assert from "node:assert/strict";
import { createNeuralGlobe, globeArcPoint, rotateGlobePoint } from "../src/lib/chat-ai-globe.ts";

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
