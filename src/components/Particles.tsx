import { type CSSProperties, useMemo } from 'react';

type ParticleItem = {
  className: string;
  style: CSSProperties;
};

export function Particles() {
  const particles = useMemo<ParticleItem[]>(
    () =>
      Array.from({ length: 18 }, (_, index) => {
        const size = 1.5 + Math.random() * 3;

        return {
          className: `particle${index % 3 === 0 ? ' pink' : ''}`,
          style: {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            bottom: `${-10 - Math.random() * 30}%`,
            animationDuration: `${10 + Math.random() * 14}s`,
            animationDelay: `${-Math.random() * 16}s`,
            opacity: Number((0.25 + Math.random() * 0.5).toFixed(2)),
          },
        };
      }),
    [],
  );

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((particle, index) => (
        <span key={index} className={particle.className} style={particle.style} />
      ))}
    </div>
  );
}
