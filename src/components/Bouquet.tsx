// Illustrated bouquet used until real photos are added. Deterministic per product id.
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

interface Props {
  seed: string;
  colors: string[];
  wrap?: string;
}

export default function Bouquet({ seed, colors, wrap = '#C9A27A' }: Props) {
  const rnd = seeded(seed);
  const heads = Array.from({ length: 9 }, (_, i) => {
    const angle = -Math.PI / 2 + (rnd() - 0.5) * 2.1;
    const dist = 30 + rnd() * 48;
    return {
      x: 100 + Math.cos(angle) * dist,
      y: 92 + Math.sin(angle) * dist * 0.85,
      r: 15 + rnd() * 9,
      petals: 5 + Math.floor(rnd() * 4),
      rot: rnd() * 360,
      color: colors[i % colors.length],
    };
  }).sort((a, b) => a.y - b.y);

  const leaves = Array.from({ length: 6 }, (_, i) => ({
    x: 60 + i * 16 + rnd() * 6,
    y: 112 + rnd() * 20,
    rot: -60 + i * 24 + rnd() * 10,
  }));

  return (
    <svg viewBox="0 0 200 230" role="img" aria-hidden="true" className="bouquet">
      {leaves.map((l, i) => (
        <ellipse key={i} cx={l.x} cy={l.y} rx="8" ry="24" fill={i % 2 ? '#2F6B4F' : '#3F8562'} transform={`rotate(${l.rot} ${l.x} ${l.y})`} />
      ))}
      {heads.map((h, i) => (
        <g key={i} transform={`translate(${h.x} ${h.y}) rotate(${h.rot})`}>
          {Array.from({ length: h.petals }, (_, p) => (
            <ellipse
              key={p}
              cx="0"
              cy={-h.r * 0.55}
              rx={h.r * 0.42}
              ry={h.r * 0.62}
              fill={h.color}
              stroke="rgba(30,27,36,.12)"
              strokeWidth="1"
              transform={`rotate(${(360 / h.petals) * p})`}
            />
          ))}
          <circle r={h.r * 0.28} fill={h.color === '#FFFFFF' ? '#F2C94C' : 'rgba(30,27,36,.25)'} />
        </g>
      ))}
      <path d="M52 128 L148 128 L112 222 L88 222 Z" fill={wrap} />
      <path d="M52 128 L100 140 L148 128 L136 160 L100 150 L64 160 Z" fill="rgba(255,255,255,.18)" />
      <path d="M86 178 Q100 186 114 178 L112 190 Q100 196 88 190 Z" fill="#8E2A4A" />
    </svg>
  );
}
