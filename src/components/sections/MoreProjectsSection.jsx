// src/components/sections/MoreProjectsSection.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { secondaryProjectsData } from '../../Data/projectsData';
import ProjectDetailModal from '../ProjectDetailModal';
import { sounds } from '../../utils/soundEngine';

export default function MoreProjectsSection({ isActive = true }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Badge & Header elements
      tl.from(
        el.querySelectorAll('.more-header-anim'),
        { opacity: 0, y: -12, duration: 0.4, ease: 'power2.out', stagger: 0.03, clearProps: 'all' },
        0
      );

      // Character-by-character Title 3D Animation
      const mainChars = el.querySelectorAll('.more-title-main-char');
      const hlChars = el.querySelectorAll('.more-title-hl-char');

      if (mainChars.length) {
        tl.from(
          mainChars,
          {
            opacity: 0,
            y: 24,
            duration: 0.85,
            stagger: 0.035,
            ease: 'power3.out',
            clearProps: 'all',
          },
          0.04
        );
      }

      if (hlChars.length) {
        tl.from(
          hlChars,
          {
            opacity: 0,
            y: 24,
            scale: 0.92,
            duration: 0.85,
            stagger: 0.035,
            ease: 'power3.out',
            clearProps: 'all',
          },
          0.12
        );
      }

      // Staggered Cards Entry
      tl.from(
        el.querySelectorAll('.more-card-anim'),
        {
          opacity: 0,
          y: 24,
          scale: 0.95,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power2.out',
          clearProps: 'all',
        },
        0.15
      );
    }, el);

    return () => ctx.revert();
  }, [isActive]);

  const mainWord = "Trabajo".split("");
  const hlWord = "Adicional".split("");

  return (
    <>
      <section
        id="mas-proyectos"
        ref={containerRef}
        className="w-full h-full min-h-screen flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 pt-24 pb-16 relative select-none overflow-y-auto"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 15%, #141218 0%, #0c0a10 55%, #070508 100%)'
        }}
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 right-1/4 w-112.5 h-112.5 bg-violet-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-7xl w-full mx-auto flex flex-col my-auto space-y-7 perspective-[1000px]">

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-5">
            <div className="space-y-1.5">
              <div className="more-header-anim inline-flex items-center gap-2 text-xs font-mono text-violet-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
                </span>
                <span>07 // MÁS PROYECTOS & HERRAMIENTAS</span>
              </div>

              {/* Animated 3D Cinematic Title */}
              <h2 ref={titleRef} className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight perspective-[1000px] flex items-center gap-2 overflow-hidden py-0.5">
                <span className="inline-flex">
                  {mainWord.map((ch, i) => (
                    <span key={`mw-${i}`} className="more-title-main-char inline-block will-change-transform text-white">
                      {ch}
                    </span>
                  ))}
                </span>
                <span className="inline-flex ml-2">
                  {hlWord.map((ch, i) => (
                    <span key={`hw-${i}`} className="more-title-hl-char inline-block will-change-transform text-violet-400 drop-shadow-[0_0_16px_rgba(167,139,250,0.6)]">
                      {ch}
                    </span>
                  ))}
                </span>
              </h2>

              <p className="more-header-anim text-xs sm:text-sm text-zinc-400 font-sans max-w-lg leading-relaxed">
                Proyectos complementarios y herramientas de ingeniería que demuestran el alcance técnico — toca cualquier tarjeta para abrir el simulador interactivo.
              </p>
            </div>

            <div className="more-header-anim hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-500">
              <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
              <span>Simuladores Interactivos Habilitados</span>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {secondaryProjectsData.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedProject(project);
                }}
                className="more-card-anim group text-left p-5 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer space-y-4 relative overflow-hidden active:scale-[0.98] hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
              >
                {/* Top dynamic accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2.5px] rounded-t-2xl transition-all duration-300 opacity-40 group-hover:opacity-100 group-hover:h-0.75 shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                  style={{ backgroundColor: project.accent }}
                />

                {/* Category & Year */}
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors font-medium">{project.category}</span>
                  <span className="text-zinc-500">{project.year}</span>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-display font-bold text-white tracking-tight leading-tight group-hover:text-violet-200 transition-colors">
                      {project.title}
                    </h3>
                    <ExternalLink
                      className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:rotate-12 transition-all shrink-0 mt-0.5"
                    />
                  </div>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-2">
                    {project.subtitle}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {project.tags.slice(0, 3).map(t => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-zinc-400 group-hover:border-white/10 group-hover:text-zinc-300 transition-all"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-zinc-500">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Bottom CTA hint */}
                <div
                  className="flex items-center gap-1.5 font-mono text-[10.5px] font-semibold transition-all duration-300 group-hover:translate-x-1"
                  style={{ color: project.accent }}
                >
                  <span>Probar simulador</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
