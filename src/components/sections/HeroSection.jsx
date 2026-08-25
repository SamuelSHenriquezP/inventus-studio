import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Terminal, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../../Data/projectsData';
import { sounds } from '../../utils/soundEngine';

const HeroSection = React.memo(function HeroSection({ onExploreWorks, onExploreStack, isActive = true }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || !isActive) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        el.querySelectorAll('.hero-capsule'),
        { opacity: 0, y: -15, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' },
        0
      );

      tl.fromTo(
        el.querySelectorAll('.hero-char'),
        {
          opacity: 0,
          y: 22,
          filter: 'blur(5px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.72,
          stagger: 0.013,
          ease: 'power3.out',
        },
        0.05
      );

      tl.fromTo(
        el.querySelectorAll('.hero-fade'),
        { opacity: 0, y: 15, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, stagger: 0.04, ease: 'power3.out' },
        0.2
      );

      tl.fromTo(
        el.querySelectorAll('.hero-console'),
        { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
        0.1
      );
    }, el);

    return () => ctx.revert();
  }, [isActive]);

  const headlineText = "Arquitectura cloud en tiempo real, backend serverless y ecosistemas digitales de alto nivel.";

  return (
    <section 
      id="hero"
      ref={heroRef}
      className="w-full min-h-full flex flex-col justify-start md:justify-center px-3 sm:px-8 md:px-12 lg:px-20 pt-20 sm:pt-20 pb-6 sm:pb-16 relative select-none custom-scroll"
      style={{
        background: 'radial-gradient(ellipse 100% 100% at 50% 20%, #111218 0%, #0a0b0f 55%, #050508 100%)'
      }}
    >
      {/* Subtle Ambient Aura */}
      <div className="absolute top-1/3 left-1/4 w-96 sm:w-125 h-96 sm:h-125 bg-white/2 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 lg:gap-8 xl:gap-12 items-center my-auto">
        
        {/* Left Column: Headline & Bio */}
        <div className="lg:col-span-7 space-y-3.5 sm:space-y-4 xl:space-y-5">
          
          {/* Status Capsule */}
          <div className="hero-capsule inline-flex items-center gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-[10.5px] sm:text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span>{personalInfo.studio} • {personalInfo.name} | SOFTWARE ARCHITECT</span>
          </div>

          {/* Main Display Headline (Fluid Typography) */}
          <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.12] flex flex-wrap items-baseline">
            {headlineText.split(' ').map((word, wIdx) => (
              <span key={wIdx} className="inline-block whitespace-nowrap mr-1.5 sm:mr-2.5 md:mr-3">
                {word.split('').map((char, cIdx) => (
                  <span key={cIdx} className="hero-char inline-block will-change-transform">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* Subtitle & Focus */}
          <p className="hero-fade text-xs sm:text-sm md:text-base text-zinc-300 font-sans max-w-xl leading-relaxed">
            Arquitectura de software escalable, consolas web administrativas de alta velocidad y aplicaciones móviles integradas en tiempo real. Productos digitales rápidos, seguros y listos para operar.
          </p>

          {/* Technology Badges */}
          <div className="hero-fade flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px] text-zinc-400">
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-white/5 border border-white/10 text-zinc-200">
              Backend Cloud & Serverless
            </span>
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-white/5 border border-white/10 text-zinc-200">
              Firebase Realtime DB &lt;38ms
            </span>
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-white/5 border border-white/10 text-zinc-200">
              Consolas Web Administrativas
            </span>
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-white/5 border border-white/10 text-zinc-200">
              Apps Móviles Flutter Integradas
            </span>
          </div>

          {/* Action Buttons */}
          <div className="hero-fade flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2 font-mono text-xs">
            <button 
              onClick={() => { sounds.playClick(); if (onExploreWorks) onExploreWorks(); }}
              className="px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-white text-black font-bold flex items-center gap-2 hover:bg-zinc-200 transition-all cursor-pointer shadow-lg active:scale-95 text-xs"
              data-cursor="PROYECTOS"
            >
              <span>Explorar Proyectos</span>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button 
              onClick={() => { sounds.playClick(); if (onExploreStack) onExploreStack(); }}
              className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center gap-2 active:scale-95 text-xs"
              data-cursor="SERVICIOS"
            >
              <span>Stack & Servicios</span>
            </button>
          </div>

        </div>

        {/* Right Column: Live Software Architecture Terminal */}
        <div className="lg:col-span-5 flex items-center justify-center hero-console w-full">
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-md xl:max-w-lg rounded-2xl bg-[#0d0e14] border border-white/10 p-4 sm:p-5 shadow-2xl space-y-3 sm:space-y-4 font-mono text-xs">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-[10px] sm:text-[11px] text-zinc-500 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>inventus-backend.config.dart</span>
              </div>
            </div>

            {/* Terminal Logs & Telemetry */}
            <div className="space-y-2.5 sm:space-y-3 text-[10.5px] sm:text-[11px] leading-relaxed text-zinc-400">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">$</span>
                <span>system.verifyBackend(target: <span className="text-white">EnterpriseCloud.all</span>)</span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-lg bg-black/50 border border-white/5 space-y-1.5 text-zinc-300">
                <div className="flex items-center justify-between text-zinc-400 text-[9.5px] sm:text-[10px]">
                  <span>[BACKEND] Cloud Functions & APIs</span>
                  <span className="text-emerald-400 font-bold">SERVERLESS READY</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400 text-[9.5px] sm:text-[10px]">
                  <span>[DATA] Realtime Cloud Firestore</span>
                  <span className="text-sky-400 font-bold">SYNC TIEMPO REAL &lt;38ms</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400 text-[9.5px] sm:text-[10px]">
                  <span>[WEB CONSOLE] Vanilla JS Dashboard</span>
                  <span className="text-amber-400 font-bold">0 KB OVERHEAD</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400 text-[9.5px] sm:text-[10px]">
                  <span>[MOBILE ENGINE] Flutter Native App</span>
                  <span className="text-purple-400 font-bold">DESPACHO EN CALIENTE</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-emerald-400 text-[10.5px] sm:text-[11px] pt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Arquitectura Cloud: Verificada • Lista para operaciones.</span>
              </div>
            </div>

            {/* Terminal Footer */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9.5px] sm:text-[10px] text-zinc-500">
              <span>Inventus Studio — Samuel Henríquez</span>
              <span className="text-emerald-400 font-bold">v2.5-cloud-architect</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
});

export default HeroSection;
