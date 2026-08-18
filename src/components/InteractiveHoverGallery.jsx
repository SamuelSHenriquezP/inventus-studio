// src/components/InteractiveHoverGallery.jsx
import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { projectsData } from '../Data/projectsData';
import { sounds } from '../utils/soundEngine';
import ProjectModal from './ProjectModal';

export default function InteractiveHoverGallery() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const mousePos = useRef({ x: 0, y: 0 });
  const cardPos = useRef({ x: 0, y: 0 });
  const previewRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationId;
    const updateCard = () => {
      // Spring interpolation for floating preview card
      cardPos.current.x += (mousePos.current.x - cardPos.current.x) * 0.14;
      cardPos.current.y += (mousePos.current.y - cardPos.current.y) * 0.14;

      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${cardPos.current.x + 28}px, ${cardPos.current.y - 120}px, 0) rotate(1.5deg)`;
      }
      animationId = requestAnimationFrame(updateCard);
    };
    animationId = requestAnimationFrame(updateCard);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(p => p.type === activeFilter);

  const handleMouseEnter = (project) => {
    setHoveredProject(project);
    sounds.playHover();
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
  };

  const handleOpenModal = (project) => {
    sounds.playClick();
    setSelectedProject(project);
  };

  return (
    <section id="proyectos" className="py-28 px-6 max-w-7xl mx-auto relative select-none">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Exhibición de Obras & Arquitecturas</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Trabajos Seleccionados
          </h2>
        </div>

        {/* Minimalist Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-zinc-950 border border-white/10 font-mono text-xs">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'enterprise', label: 'B2B Cloud' },
            { id: 'game', label: 'Juegos WASM' },
            { id: 'mobile-github', label: 'Flutter Mobile' },
            { id: 'web', label: 'Webs 3D' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveFilter(tab.id); sounds.playClick(); }}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
              data-cursor="FILTER"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Follower Card Preview (Desktop Only) */}
      <div
        ref={previewRef}
        className={`fixed top-0 left-0 pointer-events-none z-40 hidden md:block transition-opacity duration-300 ${
          hoveredProject ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ width: '360px' }}
      >
        {hoveredProject && (
          <div 
            className="rounded-2xl overflow-hidden border border-white/20 bg-zinc-950 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-2.5 backdrop-blur-xl"
            style={{
              boxShadow: `0 20px 50px -10px ${hoveredProject.accentColor}33`
            }}
          >
            <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-zinc-900 mb-2">
              <img 
                src={hoveredProject.image} 
                alt={hoveredProject.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-white">
                <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-cyan-300">
                  {hoveredProject.badge}
                </span>
                <span className="text-zinc-300">Explorar Caso &rarr;</span>
              </div>
            </div>
            <div className="px-2 py-1">
              <span className="text-xs font-bold text-white block truncate">{hoveredProject.title}</span>
              <span className="text-[10px] font-mono text-zinc-400 block truncate mt-0.5">{hoveredProject.subtitle}</span>
            </div>
          </div>
        )}
      </div>

      {/* Editorial Interactive Project Rows */}
      <div className="divide-y divide-white/10">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => handleMouseEnter(project)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleOpenModal(project)}
            className="group py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer transition-all duration-300 hover:px-4 rounded-2xl hover:bg-zinc-900/40"
            data-cursor="DISCOVER"
          >
            {/* Left: Number + Title */}
            <div className="flex items-start md:items-center gap-6 md:gap-10">
              <span className="text-2xl md:text-3xl font-black font-mono text-zinc-600 group-hover:text-cyan-400 transition-colors">
                {project.number}
              </span>

              <div>
                <div className="flex items-center gap-3 mb-1.5">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <p className="text-xs md:text-sm text-zinc-400 max-w-xl line-clamp-1 font-sans">
                  {project.subtitle}
                </p>
              </div>
            </div>

            {/* Right: Category + Tech Chips */}
            <div className="flex flex-wrap md:flex-nowrap items-center gap-4 self-start md:self-center">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((t) => (
                  <span 
                    key={t} 
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 group-hover:border-white/15 transition-all"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 hidden sm:inline shrink-0">
                Ver Blueprint
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Fullscreen Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

    </section>
  );
}
