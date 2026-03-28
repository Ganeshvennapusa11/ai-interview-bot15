import React, { useState, useEffect } from 'react';

const DEFAULT_BEAM_COUNT = 70;

const CybercoreBackground = ({ beamCount = DEFAULT_BEAM_COUNT }) => {
  const [beams, setBeams] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: beamCount }).map((_, i) => {
      const riseDur = Math.random() * 3 + 5;   // 5–8s rise
      const fadeDur = riseDur;                // sync fade
      const type = Math.random() < 0.15 ? 'secondary' : 'primary';
      return {
        id: i,
        type,
        style: {
          left: `${Math.random() * 100}%`,
          width: `${Math.floor(Math.random() * 2) + 1}px`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${riseDur}s, ${fadeDur}s`,
        },
      };
    });
    setBeams(generated);
  }, [beamCount]);

  return (
    <div
      className="scene fixed inset-0 z-0 pointer-events-none"
      role="img"
      aria-label="Animated cybercore grid background"
    >
      <div 
        className="floor absolute bottom-0 w-full h-[40%]" 
        style={{ 
          backgroundSize: '50px 50px',
          backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.2) 1px, transparent 1px)',
          maskImage: 'linear-gradient(to top, black 10%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 100%)',
          animation: 'moveGrid 15s linear infinite'
        }} 
      />
      <div 
        className="main-column absolute left-1/2 -translate-x-1/2 top-0 w-full max-w-[800px] h-full" 
        style={{ 
          background: 'radial-gradient(ellipse at 50% 30%, rgba(0, 150, 255, 0.2) 0%, transparent 60%)', 
          animation: 'mainGlow 4s infinite alternate' 
        }} 
      />
      <div className="light-stream-container absolute inset-0">
        {beams.map((beam) => (
          <div
            key={beam.id}
            className={`light-beam absolute top-0 bottom-0 opacity-0 ${beam.type}`}
            style={{ 
              ...beam.style, 
              animationName: 'rise, fade', 
              animationTimingFunction: 'linear', 
              animationIterationCount: 'infinite' 
            }}
          />
        ))}
      </div>
      <style>{`
        .light-beam.primary {
          background: var(--light-color);
        }
        .light-beam.secondary {
          background: var(--highlight-color);
          box-shadow: 0 0 10px var(--highlight-glow);
        }
      `}</style>
    </div>
  );
};

export default CybercoreBackground;
