// src/components/sections/AboutStackSection.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Code2, MessageSquare, ArrowUpRight, Sparkles
} from 'lucide-react';
import { personalInfo } from '../../Data/projectsData';
import { sounds } from '../../utils/soundEngine';

export default function AboutStackSection({ isActive = true }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isActive) return;

    const ctx = gsap.context(() => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      const tl = gsap.timeline({ delay: 0.1 });

      // Badge & Header elements
      tl.from(
        el.querySelectorAll('.about-header-anim'),
        { opacity: 0, y: -12, duration: isMobile ? 0.25 : 0.4, ease: 'power2.out', stagger: isMobile ? 0.015 : 0.03, clearProps: 'all' },
        0
      );

      // Character-by-character Title 3D Animation
      const mainChars = el.querySelectorAll('.about-title-main-char');
      const hlChars = el.querySelectorAll('.about-title-hl-char');

      if (mainChars.length) {
        tl.from(
          mainChars,
          {
            opacity: 0,
            y: isMobile ? 12 : 24,
            duration: isMobile ? 0.4 : 0.85,
            stagger: isMobile ? 0.015 : 0.035,
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
            y: isMobile ? 12 : 24,
            scale: isMobile ? 0.98 : 0.92,
            duration: isMobile ? 0.4 : 0.85,
            stagger: isMobile ? 0.015 : 0.035,
            ease: 'power3.out',
            clearProps: 'all',
          },
          0.08
        );
      }

      // Technologies Slide-in (Left Column)
      tl.from(
        el.querySelectorAll('.about-tech-item'),
        {
          opacity: 0,
          x: isMobile ? -8 : -18,
          duration: isMobile ? 0.3 : 0.45,
          stagger: isMobile ? 0.02 : 0.04,
          ease: 'power2.out',
          clearProps: 'all',
        },
        0.12
      );

      // Services Pop-in (Right Column)
      tl.from(
        el.querySelectorAll('.about-service-card'),
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power2.out',
          clearProps: 'all',
        },
        0.15
      );

      // Buttons pop
      tl.from(
        el.querySelectorAll('.about-btn-anim'),
        { opacity: 0, y: 14, scale: 0.96, duration: 0.45, ease: 'power2.out', clearProps: 'all' },
        0.2
      );
    }, el);

    return () => ctx.revert();
  }, [isActive]);

  const technologies = [
    { name: "Flutter & Dart", desc: "Desarrollo nativo multiplataforma (iOS / Android) a 60–120 FPS.", tag: "NATIVO" },
    { name: "Firebase Cloud & Firestore", desc: "Bases de datos no relacionales en tiempo real, Auth y reglas RBAC.", tag: "REALTIME" },
    { name: "Cloud Functions", desc: "Lógica de backend serverless (Node.js/TypeScript) y orquestación.", tag: "SERVERLESS" },
    { name: "Isar Database & Hive", desc: "Persistencia local de alto rendimiento y arquitecturas Offline-First.", tag: "<1ms" },
    { name: "State Management & Clean Arch", desc: "Riverpod, Bloc, separación por capas y código testeable.", tag: "PATRONES" }
  ];

  const services = [
    {
      num: "01",
      title: "Desarrollo de Apps Móviles",
      desc: "Creación completa de aplicaciones para iOS y Android con Flutter, diseño de interfaces fluidas y publicación en tiendas."
    },
    {
      num: "02",
      title: "Arquitectura Cloud & Firebase",
      desc: "Modelado de datos en Firestore, sincronización en caliente, funciones en la nube y configuración de seguridad estricta."
    },
    {
      num: "03",
      title: "Sistemas Offline-First",
      desc: "Desarrollo de aplicaciones preparadas para operar sin internet con sincronización bidireccional inmediata."
    },
    {
      num: "04",
      title: "Paneles Web de Gestión",
      desc: "Consolas administrativas para control de operaciones, monitoreo en tiempo real y despacho de órdenes."
    }
  ];

  const mainChars = "Stack Técnico &".split("");
  const hlChars = "Servicios".split("");

  return (
    <section 
      id="sobre-mi"
      ref={containerRef}
      className="w-full min-h-full flex flex-col justify-start md:justify-center px-3 sm:px-8 md:px-12 lg:px-20 pt-12 sm:pt-20 pb-12 sm:pb-16 relative select-none overflow-y-auto custom-scroll"
      style={{
        background: 'radial-gradient(ellipse 100% 100% at 50% 20%, #13141a 0%, #0a0b0f 55%, #050508 100%)'
      }}
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-96 sm:w-112.5 h-96 sm:h-112.5 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto flex flex-col my-auto space-y-2.5 sm:space-y-4.5 perspective-[1000px]">
        
        {/* Clean Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-3.5 sm:pb-4">
          <div className="space-y-1 sm:space-y-1.5">
            <div className="about-header-anim inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>08 // PERFIL PROFESIONAL & CAPACIDADES</span>
            </div>

            {/* Kinetic 3D Split Title */}
            <h2 ref={titleRef} className="text-xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight perspective-[1000px] flex flex-wrap items-center gap-1.5 sm:gap-2 overflow-visible py-0.5">
              <span className="inline-flex overflow-visible">
                {mainChars.map((ch, i) => (
                  <span key={`amc-${i}`} className="about-title-main-char inline-block will-change-transform text-white">
                    {ch === ' ' ? '\u00A0' : ch}
                  </span>
                ))}
              </span>
              <span className="inline-flex ml-1.5 sm:ml-2 overflow-visible">
                {hlChars.map((ch, i) => (
                  <span key={`ahc-${i}`} className="about-title-hl-char inline-block will-change-transform text-emerald-400 drop-shadow-[0_0_16px_rgba(52,211,153,0.65)]">
                    {ch}
                  </span>
                ))}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 font-mono text-xs">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              className="about-btn-anim px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-white/25 transition-all flex items-center gap-1.5 text-xs"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20cotizar%20un%20proyecto`}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              className="about-btn-anim px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 cursor-pointer text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-black" />
              <span>Cotizar</span>
            </a>
          </div>
        </div>

        {/* 2-Column Minimalist Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-start pb-6 sm:pb-0">
          
          {/* Column 1: Tecnologías & Enfoque */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <div className="about-header-anim font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Tecnologías que Domino</span>
              <span className="text-[10px] text-emerald-400">STACK 2026</span>
            </div>

            <div className="space-y-2 sm:space-y-2.5 font-sans">
              {technologies.map((t) => (
                <div 
                  key={t.name} 
                  className="about-tech-item group p-2 sm:p-2.5 rounded-xl bg-white/1.5 border border-white/5 hover:bg-white/4 hover:border-white/15 transition-all duration-300 space-y-0.5"
                >
                  <div className="text-xs sm:text-sm font-semibold text-white flex items-center justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] group-hover:scale-125 transition-transform" />
                      <span className="group-hover:text-emerald-200 transition-colors">{t.name}</span>
                    </div>
                    <span className="font-mono text-[9px] sm:text-[9.5px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 group-hover:text-emerald-300 group-hover:bg-emerald-500/10 transition-all">
                      {t.tag}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-zinc-400 pl-3 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Lo que puedo ofrecer */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="about-header-anim font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Servicios de Software</span>
              <span className="text-[10px] text-zinc-500">LLAVE EN MANO</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {services.map((s) => (
                <div 
                  key={s.num} 
                  className="about-service-card group p-3.5 sm:p-4.5 rounded-xl sm:rounded-2xl bg-white/2 border border-white/5 hover:bg-white/5 hover:border-emerald-500/30 transition-all duration-300 space-y-1.5 sm:space-y-2 relative overflow-hidden active:scale-[0.98] hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
                >
                  {/* Subtle Top Accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-center justify-between font-mono text-[10.5px] sm:text-[11px] font-bold">
                    <span className="text-emerald-400 group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">{s.num} // SERVICIO</span>
                    <Sparkles className="w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white font-display group-hover:text-emerald-100 transition-colors">
                    {s.title}
                  </div>
                  <p className="text-[11px] sm:text-xs text-zinc-400 font-sans leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
