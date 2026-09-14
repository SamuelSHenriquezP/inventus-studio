// src/components/sections/MoreProjectsSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, ExternalLink, Sparkles, Code2, Smartphone, Globe } from 'lucide-react';
import { secondaryProjectsData } from '../../Data/projectsData';
import ProjectDetailModal from '../ProjectDetailModal';
import { sounds } from '../../utils/soundEngine';

export default React.memo(function MoreProjectsSection({ isActive = true }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isActive) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    if (isMobile) return;

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
          0.08
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
          stagger: 0.04,
          ease: 'power2.out',
          clearProps: 'all',
        },
        0.1
      );
    }, el);

    return () => ctx.revert();
  }, [isActive, activeFilter]);

  const mainWord = "Trabajo".split("");
  const hlWord = "Adicional".split("");

  const filteredProjects = secondaryProjectsData.filter(p => {
    if (activeFilter === 'flutter') return p.deviceType === 'phone-vertical';
    if (activeFilter === 'web') return p.deviceType === 'laptop';
    return true;
  });

  return (
    <>
      <section
        id="more-projects-section"
        ref={containerRef}
        className="w-full min-h-full flex flex-col justify-start md:justify-center px-3 sm:px-8 md:px-12 lg:px-20 pt-20 sm:pt-20 pb-16 sm:pb-24 relative select-none custom-scroll overflow-y-auto"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 15%, #0f111a 0%, #0a0b10 55%, #050508 100%)'
        }}
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 right-1/4 w-96 sm:w-112.5 h-96 sm:h-112.5 bg-violet-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-7xl w-full mx-auto flex flex-col my-auto space-y-3 sm:space-y-4.5 perspective-[1000px]">

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-3 sm:pb-3.5">
            <div className="space-y-1 sm:space-y-1.5">
              <div className="more-header-anim inline-flex items-center gap-2 text-xs font-mono text-violet-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
                </span>
                <span>07 // MÁS PROYECTOS & HERRAMIENTAS ({secondaryProjectsData.length})</span>
              </div>

              {/* Animated 3D Cinematic Title */}
              <h2 ref={titleRef} className="text-xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight perspective-[1000px] flex flex-wrap items-center gap-1.5 sm:gap-2 overflow-visible py-0.5">
                <span className="inline-flex overflow-visible">
                  {mainWord.map((ch, i) => (
                    <span key={`mw-${i}`} className="more-title-main-char inline-block will-change-transform text-white">
                      {ch}
                    </span>
                  ))}
                </span>
                <span className="inline-flex ml-1.5 sm:ml-2 overflow-visible">
                  {hlWord.map((ch, i) => (
                    <span key={`hw-${i}`} className="more-title-hl-char inline-block will-change-transform text-violet-400 drop-shadow-[0_0_16px_rgba(167,139,250,0.6)]">
                      {ch}
                    </span>
                  ))}
                </span>
              </h2>

              <p className="more-header-anim text-xs sm:text-sm text-zinc-400 font-sans max-w-xl leading-relaxed">
                Ecosistema de proyectos desarrollados en la suite de ingeniería — pulsa en cualquier tarjeta para abrir su simulador interactivo y explorar su código en GitHub.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="more-header-anim flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10.5px]">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'flutter', label: 'Flutter Apps' },
                { id: 'web', label: 'Web & SaaS' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { sounds.playClick(); setActiveFilter(tab.id); }}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-violet-500 text-white font-bold shadow-sm shadow-violet-500/30'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 pb-6 sm:pb-0">
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedProject(project);
                }}
                className="more-card-anim group text-left p-3.5 sm:p-4 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer space-y-2 sm:space-y-2.5 relative overflow-hidden active:scale-[0.98] hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
              >
                {/* Top dynamic accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2.5px] rounded-t-2xl transition-all duration-300 opacity-40 group-hover:opacity-100 group-hover:h-0.75 shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                  style={{ backgroundColor: project.accent }}
                />

                {/* Category & Year */}
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors font-medium">{project.category}</span>
                  <div className="flex items-center gap-1.5">
                    {project.githubUrl && (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400 group-hover:text-violet-300 transition-colors">
                        <Code2 className="w-2.5 h-2.5" />
                        <span>Git</span>
                      </span>
                    )}
                    {project.liveUrl && (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:text-emerald-300 transition-colors">
                        <Globe className="w-2.5 h-2.5" />
                        <span>En vivo</span>
                      </span>
                    )}
                    <span className="text-zinc-500">{project.year}</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs sm:text-sm font-display font-bold text-white tracking-tight leading-tight group-hover:text-violet-200 transition-colors">
                      {project.title}
                    </h3>
                    <ExternalLink
                      className="w-3.5 h-3.5 text-zinc-500 group-hover:text-violet-400 group-hover:rotate-12 transition-all shrink-0 mt-0.5"
                    />
                  </div>
                  <p className="text-[10.5px] sm:text-[11px] text-zinc-400 font-sans leading-relaxed line-clamp-2">
                    {project.subtitle}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 font-mono text-[9px] sm:text-[9.5px]">
                  {project.tags.slice(0, 3).map(t => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-zinc-400 group-hover:border-white/10 group-hover:text-zinc-300 transition-all"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/5 text-zinc-500">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Bottom CTA hint */}
                <div
                  className="flex items-center justify-between font-mono text-[10px] pt-0.5 border-t border-white/5"
                >
                  <span
                    className="flex items-center gap-1 font-semibold transition-all duration-300 group-hover:translate-x-0.5"
                    style={{ color: project.accent }}
                  >
                    <span>Probar simulador</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="text-zinc-500 text-[9px]">
                    {project.deviceType === 'phone-vertical' ? 'Mobile' : 'Web'}
                  </span>
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
});
