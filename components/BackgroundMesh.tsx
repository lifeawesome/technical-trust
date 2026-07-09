import { generateBackgroundMesh } from "@/lib/background-mesh";

export default function BackgroundMesh() {
  const { nodes, edges } = generateBackgroundMesh();

  return (
    <div
      data-hero-mesh
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1360 900"
        style={{ opacity: 0.55 }}
        preserveAspectRatio="xMidYMid slice"
      >
        {edges.map((edge, i) => (
          <line
            key={i}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke="#334155"
            strokeWidth={1}
          />
        ))}
        {nodes.map((node, i) => (
          <circle
            key={i}
            data-hero-mesh-node
            cx={node.x}
            cy={node.y}
            r={node.r}
            style={{ fill: node.accent ? "var(--accent)" : "#475569" }}
          />
        ))}
      </svg>
    </div>
  );
}
