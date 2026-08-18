// src/components/sections/HeroSection.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Terminal, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react';
import { personalInfo } from '../../Data/projectsData';
import { sounds } from '../../utils/soundEngine';

export default function HeroSection({ onExploreWorks, onExploreStack, isActive = true }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || !isActive) return;

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
          y: 30,
          filter: 'blur(6px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          stagger: 0.012,
          ease: 'power3.out',
        },
        0.05
      );

      tl.fromTo(
        el.querySelectorAll('.hero-fade'),
        { opacity: 0, y: 15, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, stagger: 0.06, ease: 'power3.out' },
        0.25
      );

      tl.fromTo(
        el.querySelectorAll('.hero-console'),
        { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
        0.15
      );
    }, el);

    return () => ctx.revert();
  }, [isActive]);

  const headlineText = "Desarrollo aplicaciones móviles, backend y plataformas cloud con arquitectura sólida y alto rendimiento.";

  return (
    <section 
      id="hero"
      ref={heroRef}
      className="w-full h-full min-h-screen flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 pt-24 sm:pt-28 md:pt-32 pb-16 relative select-none overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 100% 100% at 50% 20%, #111218 0%, #0a0b0f 55%, #050508 100%)'
      }}
    >
      {/* Subtle Ambient Aura */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto">
        
        {/* Left Column: Headline & Bio */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Status Capsule */}
          <div className="hero-capsule inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{personalInfo.studio} • {personalInfo.name}</span>
          </div>

          {/* Main Display Headline (Serious, Crisp, Authoritative) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
            {headlineText.split(' ').map((word, wIdx) => (
              <span key={wIdx} className="inline-block whitespace-nowrap mr-2.5 sm:mr-3">
                {word.split('').map((char, cIdx) => (
                  <span key={cIdx} className="hero-char inline-block will-change-transform">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* Subtitle & Focus */}
          <p className="hero-fade text-sm sm:text-base text-zinc-400 font-sans max-w-xl leading-relaxed">
            {personalInfo.bio}
          </p>

          {/* Technology Badges */}
          <div className="hero-fade flex flex-wrap items-center gap-2 font-mono text-[11px] text-zinc-400">
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300">
              Flutter & Dart
            </span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300">
              Firebase Firestore
            </span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300">
              Cloud Functions
            </span>
            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300">
              Isar DB Offline
            </span>
          </div>

          {/* Action Buttons */}
          <div className="hero-fade flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
            <button 
              onClick={() => { sounds.playClick(); if (onExploreWorks) onExploreWorks(); }}
              className="px-7 py-3.5 rounded-full bg-white text-black font-bold flex items-center gap-2 hover:bg-zinc-200 transition-all cursor-pointer shadow-lg active:scale-95 text-xs"
              data-cursor="EXPLORAR"
            >
              <span>Ver Proyectos</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button 
              onClick={() => { sounds.playClick(); if (onExploreStack) onExploreStack(); }}
              className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center gap-2 active:scale-95 text-xs"
              data-cursor="STACK"
            >
              <span>Stack & Servicios</span>
            </button>
          </div>

        </div>

        {/* Right Column: Live Software Architecture Terminal */}
        <div className="lg:col-span-5 flex items-center justify-center hero-console">
          <div className="w-full max-w-md rounded-2xl bg-[#0d0e14] border border-white/10 p-5 shadow-2xl space-y-4 font-mono text-xs">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-[11px] text-zinc-500 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>inventus-core.config.dart</span>
              </div>
            </div>

            {/* Terminal Logs & Telemetry */}
            <div className="space-y-3 text-[11px] leading-relaxed text-zinc-400">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">$</span>
                <span>system.verifyArchitecture(target: <span className="text-white">MobilePlatform.all</span>)</span>
              </div>

              <div className="p-3 rounded-lg bg-black/50 border border-white/5 space-y-1.5 text-zinc-300">
                <div className="flex items-center justify-between text-zinc-400 text-[10px]">
                  <span>[ENGINE] Flutter 3.x Native</span>
                  <span className="text-emerald-400 font-bold">120 FPS READY</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400 text-[10px]">
                  <span>[CLOUD] Firebase Firestore</span>
                  <span className="text-sky-400 font-bold">REALTIME SYNC &lt;35ms</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400 text-[10px]">
                  <span>[LOCAL] Isar Database</span>
                  <span className="text-amber-400 font-bold">OFFLINE-FIRST 0.8ms</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400 text-[10px]">
                  <span>[SECURITY] Cloud Security Rules</span>
                  <span className="text-purple-400 font-bold">RBAC VERIFIED</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-emerald-400 text-[11px] pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>All software systems verified and active.</span>
              </div>
            </div>

            {/* Terminal Footer */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-500">
              <span>Samuel Henríquez — Software Dev</span>
              <span className="text-zinc-400 font-bold">v2.4.0-stable</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
