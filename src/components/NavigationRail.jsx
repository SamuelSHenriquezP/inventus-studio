// src/components/NavigationRail.jsx
import { useMemo } from 'react';
import { sounds } from '../utils/soundEngine';

export default function NavigationRail({ 
  projects = [], 
  activeSectionIndex = 0, 
  onSelectSection 
}) {
  const navItems = useMemo(() => [
    { id: 'hero', label: 'Inicio', number: '00', accent: '#ffffff' },
    ...projects.map((p, i) => ({
      id: `project-${p.id}`,
      label: p.title,
      number: `0${i + 1}`,
      accent: p.accent
    })),
    { id: 'mas-proyectos', label: 'Más Proyectos', number: `0${projects.length + 1}`, accent: '#a78bfa' },
    { id: 'sobre-mi', label: 'Stack & Servicios', number: `0${projects.length + 2}`, accent: '#a1a1aa' },
    { id: 'contacto', label: 'Contacto', number: `0${projects.length + 3}`, accent: '#10b981' },
  ], [projects]);

  const activeItem = navItems[activeSectionIndex] || navItems[0];
  const scrollProgress = ((activeSectionIndex) / Math.max(1, navItems.length - 1)) * 100;

  const handleClick = (idx) => {
    sounds.playClick();
    if (onSelectSection) onSelectSection(idx);
  };

  return (
    <aside className="fixed right-3.5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end select-none pointer-events-auto">
      
      {/* Horizontally Compact Rail */}
      <div className="relative flex flex-col gap-3 pr-2 py-1">
        
        {/* Progress Track Line */}
        <div className="absolute right-0 top-1 bottom-1 w-[2px] bg-white/10 rounded-full">
          <div 
            className="w-full rounded-full transition-all duration-300"
            style={{ 
              height: `${scrollProgress}%`,
              backgroundColor: activeItem.accent || '#ffffff'
            }}
          />
        </div>

        {/* Nav Points List */}
        {navItems.map((item, idx) => {
          const isActive = activeSectionIndex === idx;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(idx)}
              className="group flex items-center gap-1.5 text-right cursor-pointer py-0.5"
              data-cursor={item.number}
            >
              <span className={`text-[11px] font-mono transition-all duration-300 ${
                isActive 
                  ? 'text-white font-bold translate-x-0 opacity-100' 
                  : 'text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:text-zinc-300 translate-x-1 group-hover:translate-x-0'
              }`}>
                {item.number} — {item.label}
              </span>

              <span 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'scale-125 shadow-md' 
                    : 'bg-zinc-700 group-hover:bg-zinc-400'
                }`}
                style={isActive ? { 
                  backgroundColor: item.accent,
                  boxShadow: `0 0 10px ${item.accent}`
                } : {}}
              />
            </button>
          );
        })}
      </div>

    </aside>
  );
}
