export type MapNode = { x: number; y: number; r: number; accent: boolean };
export type MapEdge = { x1: number; y1: number; x2: number; y2: number };

const WIDTH = 1360;
const HEIGHT = 900;
const NODE_COUNT = 22;
const MAX_EDGE_DIST = 190;

export function generateSystemsMap(): { nodes: MapNode[]; edges: MapEdge[] } {
  let seed = 42;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };

  const nodes: MapNode[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.round(rand() * WIDTH),
      y: Math.round(rand() * HEIGHT),
      r: 2 + rand() * 2,
      accent: rand() > 0.82,
    });
  }

  const edges: MapEdge[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_EDGE_DIST && rand() > 0.55) {
        edges.push({ x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y });
      }
    }
  }

  return { nodes, edges };
}
