// src/components/ProjectModal.jsx
import { useEffect } from 'react';
import { X, ArrowUpRight, ShieldCheck, Cpu, MessageSquare } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  const handleConsult = () => {
    const msg = `¡Hola Inventus Studio! Vi el caso de estudio de *${project.title}* en su portafolio y me gustaría cotizar una solución técnica similar para mi empresa.`;
    window.open(`https://wa.me/573000000000?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200 select-none">
      
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl overflow-y-auto z-10 font-sans text-zinc-100 flex flex-col">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-zinc-950/95 border-b border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/10 text-white uppercase tracking-wider">
              {project.badge}
            </span>
            <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
              Caso de Estudio 2026
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 md:p-10 space-y-8">
          
          {/* Main Visual Artwork Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-zinc-900 shadow-2xl">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
              <span className="font-bold">{project.title}</span>
              <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-zinc-300">
                Arquitectura Verificada
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              {project.title}
            </h2>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          {/* Technical Metrics Grid */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-900/60 border border-white/10 font-mono text-center">
              {project.metrics.map((m, idx) => (
                <div key={idx}>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">{m.label}</span>
                  <span className="text-base sm:text-xl font-bold text-white mt-0.5 block">{m.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Architecture Layer Breakdown */}
          {project.architecture && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                <Cpu className="w-4 h-4 text-white" />
                <span>Desglose de Ingeniería & Capas Técnicas</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                {Object.entries(project.architecture).map(([key, val]) => (
                  <div key={key} className="p-4 rounded-xl bg-zinc-900/40 border border-white/5 space-y-1">
                    <span className="text-[10px] text-white uppercase font-bold tracking-wider block">
                      {key.toUpperCase()} LAYER
                    </span>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">
              Stack Tecnológico:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-xl bg-zinc-900 text-zinc-300 border border-white/10">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantía de Código 100% Propietario & SLA de Producción</span>
            </div>

            <button
              onClick={handleConsult}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all cursor-pointer shadow-lg"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>Cotizar Solución Similar</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
