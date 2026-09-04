export type GlobePoint = { x: number; y: number; z: number };

export function rotateGlobePoint(point: GlobePoint, yaw: number, tilt: number): GlobePoint {
  const x = point.x * Math.cos(yaw) + point.z * Math.sin(yaw);
  const z = -point.x * Math.sin(yaw) + point.z * Math.cos(yaw);
  return {
    x,
    y: point.y * Math.cos(tilt) - z * Math.sin(tilt),
    z: point.y * Math.sin(tilt) + z * Math.cos(tilt),
  };
}

export function globeArcPoint(start: GlobePoint, end: GlobePoint, progress: number): GlobePoint {
  const x = start.x + (end.x - start.x) * progress;
  const y = start.y + (end.y - start.y) * progress;
  const z = start.z + (end.z - start.z) * progress;
  const length = Math.hypot(x, y, z) || 1;
  return { x: x / length, y: y / length, z: z / length };
}

export function createNeuralGlobe() {
  const count = 64;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const nodes = Array.from({ length: count }, (_, index) => {
    const y = 1 - ((index + 0.5) / count) * 2;
    const radius = Math.sqrt(1 - y * y);
    const angle = index * goldenAngle;
    return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius };
  });
  const pairs = new Set<string>();
  const links: { start: number; end: number; points: GlobePoint[] }[] = [];
  nodes.forEach((node, start) => {
    const neighbors = nodes
      .map((other, end) => ({
        end,
        distance: Math.hypot(node.x - other.x, node.y - other.y, node.z - other.z),
      }))
      .filter(({ end }) => end !== start)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
    neighbors.forEach(({ end }) => {
      const key = [Math.min(start, end), Math.max(start, end)].join(":");
      if (pairs.has(key)) return;
      pairs.add(key);
      links.push({
        start,
        end,
        points: Array.from({ length: 9 }, (_, index) => globeArcPoint(node, nodes[end], index / 8)),
      });
    });
  });
  const guides: GlobePoint[][] = [];
  for (let meridian = 0; meridian < 6; meridian++) {
    const longitude = (meridian / 6) * Math.PI;
    guides.push(
      Array.from({ length: 65 }, (_, index) => {
        const angle = (index / 64) * Math.PI * 2;
        return {
          x: Math.cos(angle) * Math.cos(longitude),
          y: Math.sin(angle),
          z: Math.cos(angle) * Math.sin(longitude),
        };
      }),
    );
  }
  for (const latitude of [-0.5, 0, 0.5]) {
    const radius = Math.sqrt(1 - latitude * latitude);
    guides.push(
      Array.from({ length: 65 }, (_, index) => {
        const angle = (index / 64) * Math.PI * 2;
        return { x: Math.cos(angle) * radius, y: latitude, z: Math.sin(angle) * radius };
      }),
    );
  }
  return { nodes, links, guides };
}
