/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';

interface ParticlesBackgroundProps {
  enabled: boolean;
}

export const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ enabled }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${(i * 6.25 + (i % 3) * 2.5) % 96}%`,
      duration: `${8 + (i % 5) * 2.5}s`,
      delay: `${(i * 0.7) % 6}s`,
      size: `${5 + (i % 4) * 2.5}px`,
    }));
  }, []);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute -bottom-6 rounded-full opacity-35"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, var(--c1), var(--c2))',
            animation: `rise ${p.duration} linear ${p.delay} infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes rise {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          12% { opacity: 0.55; }
          85% { opacity: 0.35; }
          100% { transform: translateY(-110vh) scale(1.1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
