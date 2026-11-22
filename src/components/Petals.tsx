// Jacaranda petals drifting across the hero. Hidden when the visitor prefers reduced motion.
const PETALS = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 47) % 100,
  delay: (i * 1.3) % 12,
  duration: 9 + ((i * 7) % 8),
  size: 10 + ((i * 5) % 10),
  drift: ((i % 5) - 2) * 30,
}));

export default function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.8,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
