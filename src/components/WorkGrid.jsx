import { useState, lazy, Suspense } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { projectsData } from '../Data/projectsData';
import HolographicCard from './HolographicCard';

const ProjectModal = lazy(() => import('./ProjectModal'));
const FlutterDemoModal = lazy(() => import('./FlutterDemoModal'));

export default function WorkGrid() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [flutterModalOpen, setFlutterModalOpen] = useState(false);

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(p => p.type === activeFilter || (activeFilter === 'mobile' && (p.type === 'game' || p.type === 'mobile-github')));

  return (
    <section id="proyectos" className="py-28 px-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 pb-8 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
            Selected Commissions • 2024 — 2026
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Obras Destacadas
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'enterprise', label: 'Plataformas B2B' },
            { id: 'mobile', label: 'Flutter Apps & Juegos' },
            { id: 'web', label: 'Webs 3D' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-white text-black font-bold border-white shadow-lg'
                  : 'bg-transparent text-zinc-400 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column 3D Holographic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {filteredProjects.map((project, idx) => (
          <HolographicCard
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className={`group cursor-pointer flex flex-col justify-between select-none ${
              idx % 2 === 1 ? 'md:translate-y-12' : ''
            }`}
          >
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/15 aspect-16/10 mb-6 shadow-2xl">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              
              {/* Badges on Image */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white font-semibold">
                  {project.badge}
                </span>
                <span className="text-[10px] font-mono text-zinc-300 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                  2026
                </span>
              </div>

              {/* Special interactive badge for Flutter projects */}
              {(project.type === 'game' || project.id === 'cryptovault-app') && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFlutterModalOpen(true);
                  }}
                  className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-white text-black font-mono font-bold text-[10px] flex items-center gap-1.5 shadow-xl hover:bg-zinc-200 transition-all z-10 pointer-events-auto"
                >
                  <Play className="w-3 h-3 fill-black" /> Probar Demo Flutter
                </button>
              )}
            </div>

            {/* Typography & Metadata */}
            <div className="space-y-2 px-1">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
              </div>

              <p className="text-sm text-zinc-400 font-sans leading-relaxed line-clamp-2">
                {project.subtitle}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tech.slice(0, 4).map((t) => (
                  <span 
                    key={t} 
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-zinc-900 border border-white/5 text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </HolographicCard>
        ))}
      </div>

      {/* Case Study Lightbox */}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        </Suspense>
      )}

      {/* Flutter Web Simulator Lightbox */}
      {flutterModalOpen && (
        <Suspense fallback={null}>
          <FlutterDemoModal 
            isOpen={flutterModalOpen} 
            onClose={() => setFlutterModalOpen(false)} 
          />
        </Suspense>
      )}

    </section>
  );
}
