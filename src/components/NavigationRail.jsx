// src/components/NavigationRail.jsx
import { useMemo, useState } from 'react';
import { sounds } from '../utils/soundEngine';

export default function NavigationRail({ 
  projects = [], 
  activeSectionIndex = 0, 
  onSelectSection 
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navItems = useMemo(() => [
    { id: 'hero', label: 'Inicio', number: '00', accent: '#ffffff' },
    ...projects.map((p, i) => ({
      id: `project-${p.id}`,
      label: p.title,
      number: `0${i + 1}`,
      accent: p.accent || '#38bdf8'
    })),
    { id: 'mas-proyectos', label: 'Más Proyectos', number: `0${projects.length + 1}`, accent: '#a78bfa' },
    { id: 'sobre-mi', label: 'Stack & Servicios', number: `0${projects.length + 2}`, accent: '#34d399' },
    { id: 'contacto', label: 'Contacto', number: `0${projects.length + 3}`, accent: '#10b981' },
  ], [projects]);

  const total = navItems.length;
  const activeItem = navItems[activeSectionIndex] || navItems[0];

  // Canvas / SVG Dimensions for Natural Asymmetrical Constellation
  const railWidth = 100;
  const railHeight = 470;
  const padY = 24;
  const usableHeight = railHeight - 2 * padY;

  // Organic, asymmetrical constellation coordinates with natural celestial scatter
  const constellationData = useMemo(() => [
    { x: 54, yRel: 0.00, baseR: 3.0 }, // 00 - Inicio
    { x: 30, yRel: 0.11, baseR: 2.5 }, // 01 - Servi Intel
    { x: 16, yRel: 0.22, baseR: 3.0 }, // 02 - O-tek Power Apps
    { x: 68, yRel: 0.33, baseR: 3.0 }, // 03 - Sopa Senior
    { x: 84, yRel: 0.44, baseR: 2.5 }, // 04 - LoveCost / Nido
    { x: 42, yRel: 0.55, baseR: 3.5 }, // 05 - Days: focus.flow
    { x: 78, yRel: 0.67, baseR: 2.5 }, // 06 - Cyber Rush
    { x: 24, yRel: 0.78, baseR: 3.0 }, // 07 - Más Proyectos
    { x: 64, yRel: 0.89, baseR: 2.5 }, // 08 - Stack & Servicios
    { x: 46, yRel: 1.00, baseR: 3.0 }  // 09 - Contacto
  ], []);

  // Calculate coordinates for each dispersed node
  const points = useMemo(() => {
    return navItems.map((_, i) => {
      const data = constellationData[i % constellationData.length];
      const x = data.x;
      const y = padY + data.yRel * usableHeight;
      return { x, y, baseR: data.baseR };
    });
  }, [navItems, constellationData, usableHeight]);

  const handleClick = (idx) => {
    sounds.playClick();
    if (onSelectSection) onSelectSection(idx);
  };

  return (
    <aside 
      className="fixed right-2 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end select-none pointer-events-auto"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div 
        className="relative"
        style={{ width: `${railWidth}px`, height: `${railHeight}px` }}
      >
        {/* Floating Labels / Tooltips layer */}
        {navItems.map((item, idx) => {
          const pt = points[idx];
          if (!pt) return null;
          const isActive = activeSectionIndex === idx;
          const isHovered = hoveredIndex === idx;
          const isVisible = isActive || isHovered;

          return (
            <div
              key={`label-${item.id}`}
              className={`absolute transition-all duration-300 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/92 border backdrop-blur-xl shadow-2xl font-mono text-[11px] whitespace-nowrap ${
                isVisible
                  ? 'opacity-100 translate-x-0 scale-100'
                  : 'opacity-0 translate-x-2 scale-95'
              }`}
              style={{
                right: `${railWidth - pt.x + 14}px`,
                top: `${pt.y}px`,
                transform: 'translateY(-50%)',
                borderColor: isActive ? `${item.accent}60` : 'rgba(255,255,255,0.12)',
                boxShadow: isActive ? `0 0 22px ${item.accent}25` : '0 10px 25px rgba(0,0,0,0.6)'
              }}
            >
              <span className="font-bold tracking-wider" style={{ color: item.accent }}>
                {item.number}
              </span>
              <span className="text-zinc-600">//</span>
              <span className={`font-medium ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                {item.label}
              </span>
            </div>
          );
        })}

        {/* SVG Dispersed Nodes (No Connecting Lines) */}
        <svg 
          width={railWidth} 
          height={railHeight} 
          className="overflow-visible"
        >
          <defs>
            {/* Glow Filter for Active Beacon */}
            <filter id="rail-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Interactive Dispersed Nodes */}
          {navItems.map((item, idx) => {
            const pt = points[idx];
            if (!pt) return null;
            const isActive = activeSectionIndex === idx;
            const isHovered = hoveredIndex === idx;

            return (
              <g 
                key={item.id}
                onClick={() => handleClick(idx)}
                onMouseEnter={() => {
                  sounds.playHover?.();
                  setHoveredIndex(idx);
                }}
                className="cursor-pointer group"
                data-cursor={item.number}
              >
                {/* Hit area (generous clickable area) */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="16"
                  fill="transparent"
                />

                {/* Active Pulsing Ripple Aura */}
                {isActive && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="9"
                    fill={item.accent}
                    fillOpacity="0.28"
                    className="animate-ping origin-center"
                    style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
                  />
                )}

                {/* Outer Ring */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isActive ? 6.5 : isHovered ? 5.5 : pt.baseR + 0.5}
                  fill={isActive ? `${item.accent}25` : isHovered ? '#27272a' : '#141416'}
                  stroke={isActive ? item.accent : isHovered ? '#ffffff' : '#52525b'}
                  strokeWidth={isActive ? 1.75 : 1}
                  className="transition-all duration-300"
                />

                {/* Core Center Dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isActive ? 3.5 : isHovered ? 2.5 : Math.max(1.5, pt.baseR - 1.2)}
                  fill={isActive ? item.accent : isHovered ? '#ffffff' : '#71717a'}
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
        </svg>
      </div>
    </aside>
  );
}
