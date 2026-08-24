// src/components/ProjectScreenStage.jsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import {
  Code2, Compass, Zap, Sparkles,
  Activity, Eye, MapPin, Navigation, RefreshCw,
  ShieldCheck, Monitor, ArrowLeftRight, Radio, Workflow
} from 'lucide-react';
import RealisticDevice3D from './RealisticDevice3D';
import CinematicTitle from './CinematicTitle';
import ServiIntelOperarioApp from './apps/ServiIntelOperarioApp';
import ServiIntelLaptopApp from './apps/ServiIntelWebApp';
import OtekArchitectureModal from './OtekArchitectureModal';
import NidoCoupleStage from './NidoCoupleStage';
import { personalInfo } from '../Data/projectsData';

function WhatsAppIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.71 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

// 1. FIELD TITLE: Dynamic Rolling Character Pop (White + Sky Colored Accent)
function ServiIntelFieldTitle({ isActive }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !isActive) return;

    const ctx = gsap.context(() => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      const mainChars = containerRef.current.querySelectorAll('.field-main-char');
      const hlChars = containerRef.current.querySelectorAll('.field-hl-char');

      gsap.fromTo(
        mainChars,
        {
          opacity: 0,
          y: isMobile ? 10 : 18,
          rotateX: isMobile ? 0 : -30,
          ...(isMobile ? {} : { filter: 'blur(6px)' }),
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          ...(isMobile ? {} : { filter: 'blur(0px)' }),
          duration: isMobile ? 0.45 : 0.8,
          stagger: isMobile ? 0.015 : 0.035,
          ease: 'power3.out',
          clearProps: 'all',
        }
      );

      gsap.fromTo(
        hlChars,
        {
          opacity: 0,
          y: isMobile ? 10 : 18,
          rotateX: isMobile ? 0 : -30,
          ...(isMobile ? {} : { filter: 'blur(6px)' }),
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          ...(isMobile ? {} : { filter: 'blur(0px)' }),
          duration: isMobile ? 0.45 : 0.8,
          stagger: isMobile ? 0.015 : 0.035,
          ease: 'power3.out',
          delay: 0.08,
          clearProps: 'all',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  const mainChars = "Servi Intel".split("");
  const highlightChars = "Operario".split("");

  return (
    <h2
      ref={containerRef}
      style={{ perspective: '800px' }}
      className="text-xl sm:text-3xl lg:text-[34px] font-display font-extrabold tracking-tight leading-tight flex flex-wrap items-center gap-1 sm:gap-1.5 overflow-visible py-1"
    >
      <span className="inline-flex overflow-visible">
        {mainChars.map((ch, i) => (
          <span key={`f-main-${i}`} className="field-main-char inline-block will-change-transform text-white">
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </span>
      <span className="inline-flex ml-1.5 overflow-visible">
        {highlightChars.map((ch, i) => (
          <span key={`f-hl-${i}`} className="field-hl-char inline-block will-change-transform text-sky-400 drop-shadow-[0_0_14px_rgba(56,189,248,0.55)]">
            {ch}
          </span>
        ))}
      </span>
    </h2>
  );
}

// 2. ADMIN TITLE: Lateral Focus Expansion & Shimmer (White + Emerald Colored Accent)
function ServiIntelAdminTitle({ isActive }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !isActive) return;

    const ctx = gsap.context(() => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      const mainChars = containerRef.current.querySelectorAll('.admin-main-char');
      const hlChars = containerRef.current.querySelectorAll('.admin-hl-char');

      gsap.fromTo(
        mainChars,
        {
          opacity: 0,
          x: isMobile ? -8 : -16,
          scale: 0.96,
          ...(isMobile ? {} : { filter: 'blur(6px)' }),
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          ...(isMobile ? {} : { filter: 'blur(0px)' }),
          duration: isMobile ? 0.45 : 0.8,
          stagger: isMobile ? 0.015 : 0.035,
          ease: 'power3.out',
          clearProps: 'all',
        }
      );

      gsap.fromTo(
        hlChars,
        {
          opacity: 0,
          x: isMobile ? -8 : -16,
          scale: 0.96,
          ...(isMobile ? {} : { filter: 'blur(6px)' }),
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          ...(isMobile ? {} : { filter: 'blur(0px)' }),
          duration: isMobile ? 0.45 : 0.8,
          stagger: isMobile ? 0.015 : 0.035,
          ease: 'power3.out',
          delay: 0.08,
          clearProps: 'all',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  const mainChars = "Servi Intel".split("");
  const highlightChars = "Admin".split("");

  return (
    <h2
      ref={containerRef}
      className="text-xl sm:text-3xl lg:text-[34px] font-display font-extrabold tracking-tight leading-tight flex flex-wrap items-center gap-1 sm:gap-1.5 overflow-visible py-1"
    >
      <span className="inline-flex overflow-visible">
        {mainChars.map((ch, i) => (
          <span key={`a-main-${i}`} className="admin-main-char inline-block will-change-transform text-white">
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </span>
      <span className="inline-flex ml-2 overflow-visible">
        {highlightChars.map((ch, i) => (
          <span key={`a-hl-${i}`} className="admin-hl-char inline-block will-change-transform text-emerald-400 drop-shadow-[0_0_14px_rgba(52,211,153,0.55)]">
            {ch}
          </span>
        ))}
      </span>
    </h2>
  );
}

// 3. O-TEK QUALITY TITLE: Industrial Precision Wave (White + Sky Colored Accent)
function OtekQualityTitle({ isActive }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !isActive) return;

    const ctx = gsap.context(() => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      const mainChars = containerRef.current.querySelectorAll('.otek-main-char');
      const hlChars = containerRef.current.querySelectorAll('.otek-hl-char');

      gsap.fromTo(mainChars, 
        {
          opacity: 0,
          y: isMobile ? 10 : 18,
          rotateX: isMobile ? 0 : -30,
          ...(isMobile ? {} : { filter: 'blur(6px)' }),
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          ...(isMobile ? {} : { filter: 'blur(0px)' }),
          duration: isMobile ? 0.45 : 0.85,
          stagger: isMobile ? 0.015 : 0.035,
          ease: 'power3.out',
          clearProps: 'all',
        }
      );

      gsap.fromTo(hlChars,
        {
          opacity: 0,
          y: isMobile ? 10 : 18,
          rotateX: isMobile ? 0 : -30,
          ...(isMobile ? {} : { filter: 'blur(6px)' }),
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          ...(isMobile ? {} : { filter: 'blur(0px)' }),
          duration: isMobile ? 0.45 : 0.85,
          stagger: isMobile ? 0.015 : 0.035,
          ease: 'power3.out',
          delay: 0.08,
          clearProps: 'all',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  const mainChars = "Control Calidad".split("");
  const highlightChars = "Integrado".split("");

  return (
    <h2
      ref={containerRef}
      style={{ perspective: '800px' }}
      className="text-xl sm:text-3xl lg:text-5xl font-display font-extrabold tracking-tight leading-tight flex flex-col items-start overflow-visible py-0.5"
    >
      <span className="inline-flex overflow-visible">
        {mainChars.map((ch, i) => (
          <span key={`ot-m-${i}`} className="otek-main-char inline-block will-change-transform text-white">
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </span>
      <span className="inline-flex mt-0.5 overflow-visible">
        {highlightChars.map((ch, i) => (
          <span key={`ot-h-${i}`} className="otek-hl-char inline-block will-change-transform text-sky-400 drop-shadow-[0_0_14px_rgba(14,165,233,0.55)]">
            {ch}
          </span>
        ))}
      </span>
    </h2>
  );
}

function GooglePlayIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-.954V2.768c.13-.377.348-.71.61-.954zm11.241 11.244l2.42 2.42-12.016 6.937 9.596-9.357zm2.42-2.116l-2.42 2.42-9.596-9.357 12.016 6.937zm1.189 1.189l3.018 1.742a1.378 1.378 0 0 1 0 2.384l-3.018 1.742-2.15-2.15 2.15-1.718z" />
    </svg>
  );
}

// 4. SOPA SENIOR TITLE: Playful Gold Accent (White + Amber Glow Accent)
function SopaSeniorTitle({ isActive }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !isActive) return;

    const ctx = gsap.context(() => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      const mainChars = containerRef.current.querySelectorAll('.sopa-main-char');
      const hlChars = containerRef.current.querySelectorAll('.sopa-hl-char');

      gsap.fromTo(mainChars,
        {
          opacity: 0,
          y: isMobile ? 10 : 18,
          rotateX: isMobile ? 0 : -30,
          ...(isMobile ? {} : { filter: 'blur(6px)' }),
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          ...(isMobile ? {} : { filter: 'blur(0px)' }),
          duration: isMobile ? 0.45 : 0.85,
          stagger: isMobile ? 0.015 : 0.035,
          ease: 'power3.out',
          clearProps: 'all',
        }
      );

      gsap.fromTo(hlChars,
        {
          opacity: 0,
          y: isMobile ? 10 : 18,
          rotateX: isMobile ? 0 : -30,
          ...(isMobile ? {} : { filter: 'blur(6px)' }),
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          ...(isMobile ? {} : { filter: 'blur(0px)' }),
          duration: isMobile ? 0.45 : 0.85,
          stagger: isMobile ? 0.015 : 0.035,
          ease: 'power3.out',
          delay: 0.08,
          clearProps: 'all',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  const mainChars = "Sopa".split("");
  const highlightChars = "Senior".split("");

  return (
    <h2
      ref={containerRef}
      style={{ perspective: '800px' }}
      className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-tight flex flex-wrap items-center gap-1.5 overflow-visible py-0.5"
    >
      <span className="inline-flex overflow-visible">
        {mainChars.map((ch, i) => (
          <span key={`sp-m-${i}`} className="sopa-main-char inline-block will-change-transform text-white">
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </span>
      <span className="inline-flex ml-1.5 overflow-visible">
        {highlightChars.map((ch, i) => (
          <span key={`sp-h-${i}`} className="sopa-hl-char inline-block will-change-transform text-amber-400 drop-shadow-[0_0_14px_rgba(245,158,11,0.55)]">
            {ch}
          </span>
        ))}
      </span>
    </h2>
  );
}

export default function ProjectScreenStage({ project, onPlayDemo, isActive }) {
  const containerRef = useRef(null);
  const [mobileTab, setMobileTab] = useState('mobile');
  const [showOtekModal, setShowOtekModal] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      if (isActive) {
        gsap.from(
          containerRef.current.querySelectorAll('.custom-stage-anim'),
          {
            opacity: 0,
            y: 12,
            duration: 0.35,
            stagger: 0.02,
            ease: 'power2.out',
            clearProps: 'all',
          }
        );
      }
    }, containerRef.current);

    return () => ctx.revert();
  }, [isActive, project?.id]);

  if (!project) return null;

  // =========================================================================
  // 1. SERVIINTEL ECOSYSTEM — BALANCED DUAL CARDS (VIEWPORT FIT & RESPONSIVE)
  // =========================================================================
  if (project.id === 'serviintel-ops') {
    return (
      <div 
        ref={containerRef}
        className="w-full min-h-full flex flex-col justify-start md:justify-center px-3 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 pt-20 sm:pt-16 lg:pt-18 pb-6 sm:pb-8 relative select-none text-zinc-100 font-sans custom-scroll"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 20%, #0d1017 0%, #080a10 60%, #040508 100%)'
        }}
      >
        <div className="max-w-7xl 2xl:max-w-8xl w-full mx-auto flex flex-col justify-between my-auto space-y-1.5 lg:space-y-2 xl:space-y-3">
          
          {/* Header Bar with Strategic Ecosystem Placement & Actions */}
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-1.5 sm:pb-2 border-b border-white/10 custom-stage-anim shrink-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm text-zinc-400">
              <span className="font-bold tracking-widest text-zinc-200">01 // SERVI INTEL</span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-zinc-200 flex items-center gap-1.5">
                <ArrowLeftRight className="w-3.5 h-3.5 text-sky-400" />
                ECOSISTEMA INTEGRADO
              </span>
              <span className="text-zinc-300 hidden md:inline text-xs sm:text-[13px] font-sans">
                Terminal Móvil de Terreno + Consola Web en tiempo real
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0 font-mono text-xs">
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-[10.5px] sm:text-[11px] font-medium hidden sm:flex">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Firestore &lt;38ms</span>
              </div>
              <button
                onClick={() => onPlayDemo(project)}
                className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 text-xs shadow-md"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Ver Consola</span>
              </button>
              <a
                href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20cotizar%20un%20ecosistema%20como%20${encodeURIComponent(project.title)}`}
                target="_blank"
                rel="noreferrer"
                data-cursor="WHATSAPP"
                className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 text-xs hover:border-emerald-500/50"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                <span>Cotizar</span>
              </a>
            </div>
          </div>

          {/* ================================================================= */}
          {/* DESKTOP VIEW (lg:flex): BALANCED 4-4-4 COLUMNS & FLUID SCALING */}
          {/* ================================================================= */}
          <div className="hidden lg:flex lg:flex-col justify-between flex-1 min-h-0 space-y-1.5 xl:space-y-2.5">
            
            {/* TOP SECTION: APP MÓVIL (Info Left 4 + 3 Callouts Center 4 + Smartphone Right 4) */}
            <div className="w-full custom-stage-anim">
              <div className="grid grid-cols-12 gap-3 xl:gap-5 2xl:gap-6 items-center">
                
                {/* Left Column (4 cols): App Móvil Info & Features */}
                <div className="col-span-4 space-y-1">
                  <div className="space-y-0.5">
                    <div className="inline-flex items-center gap-1.5 text-[9.5px] lg:text-[10px] xl:text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                      <span>TERMINAL DE CAMPO & MÓVIL</span>
                    </div>
                    <ServiIntelFieldTitle isActive={isActive} />
                    <p className="text-xs xl:text-sm font-semibold text-zinc-200">
                      Aplicación de Terreno & Geo-Ticketing
                    </p>
                    <p className="text-[9.5px] lg:text-[10px] xl:text-[11px] text-zinc-300 leading-snug font-sans">
                      App nativa en <span className="text-white font-semibold">Flutter & Dart</span> para cuadrillas en campo con órdenes en tiempo real, geolocalización GPS y sincronización con <span className="text-sky-300 font-semibold">Cloud Firestore</span>.
                    </p>
                  </div>

                  {/* 3 Key Features */}
                  <div className="grid grid-cols-3 gap-1 pt-1 border-t border-white/10">
                    <div className="flex items-start gap-1">
                      <div className="w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-md bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                        <MapPin className="w-2 h-2" />
                      </div>
                      <div>
                        <div className="text-[9.5px] xl:text-[11px] font-bold text-zinc-100">Operaciones</div>
                        <div className="text-[8px] xl:text-[8.5px] text-zinc-400 leading-tight">En terreno</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-1">
                      <div className="w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-md bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                        <Navigation className="w-2 h-2" />
                      </div>
                      <div>
                        <div className="text-[9.5px] xl:text-[11px] font-bold text-zinc-100">Geo-GPS</div>
                        <div className="text-[8px] xl:text-[8.5px] text-zinc-400 leading-tight">Ruta en vivo</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-1">
                      <div className="w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-md bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                        <RefreshCw className="w-2 h-2" />
                      </div>
                      <div>
                        <div className="text-[9.5px] xl:text-[11px] font-bold text-zinc-100">Offline</div>
                        <div className="text-[8px] xl:text-[8.5px] text-zinc-400 leading-tight">Firestore</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Column (4 cols): 3 FIELD APP CARDS */}
                <div className="col-span-4 flex flex-col justify-center gap-1 px-1">
                  <div className="p-1 xl:p-1.5 rounded-lg bg-white/3 border border-white/10 space-y-0.5 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-1.5 text-[9.5px] lg:text-[10px] xl:text-[11px] font-bold text-zinc-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                      <span>UX Táctil para Operarios</span>
                    </div>
                    <p className="text-[8.5px] lg:text-[9px] xl:text-[10px] text-zinc-300 leading-tight pl-3">
                      Interacción táctil de alto contraste y registro de evidencias fotográficas en ruta.
                    </p>
                  </div>

                  <div className="p-1 xl:p-1.5 rounded-lg bg-white/3 border border-white/10 space-y-0.5 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-1.5 text-[9.5px] lg:text-[10px] xl:text-[11px] font-bold text-zinc-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Sincronización Reactiva</span>
                    </div>
                    <p className="text-[8.5px] lg:text-[9px] xl:text-[10px] text-zinc-300 leading-tight pl-3">
                      Flujo de datos bidireccional instantáneo entre cuadrillas y despacho central.
                    </p>
                  </div>

                  <div className="p-1 xl:p-1.5 rounded-lg bg-white/3 border border-white/10 space-y-0.5 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-1.5 text-[9.5px] lg:text-[10px] xl:text-[11px] font-bold text-zinc-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                      <span>Geo-Ticketing & GPS en Ruta</span>
                    </div>
                    <p className="text-[8.5px] lg:text-[9px] xl:text-[10px] text-zinc-300 leading-tight pl-3">
                      Trazabilidad continua de recorridos y geolocalización de órdenes en tiempo real.
                    </p>
                  </div>
                </div>

                {/* Right Column (4 cols): SMARTPHONE MOCKUP (Fluid Scaling) */}
                <div className="col-span-4 flex justify-center py-0.5">
                  <div 
                    data-prevent-slide="true"
                    className="mockup-interactive relative w-full max-w-32.5 lg:max-w-36.25 xl:max-w-41.25 2xl:max-w-48.75 max-h-[22vh] lg:max-h-[25vh] xl:max-h-[29vh] 2xl:max-h-[33vh] aspect-9/13 rounded-2xl bg-linear-to-b from-[#2a2f42] via-[#161822] to-[#0b0d13] p-1.5 border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.85)] group transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  >
                    {/* Dynamic Island Pill */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-black border border-white/10 flex items-center justify-between px-1.5 z-30 pointer-events-none">
                      <div className="w-0.5 h-0.5 rounded-full bg-sky-400/80 shadow-[0_0_3px_#38bdf8] animate-pulse" />
                      <div className="w-1 h-1 rounded-full bg-[#111] border border-white/20 flex items-center justify-center">
                        <div className="w-0.5 h-0.5 rounded-full bg-emerald-400/60" />
                      </div>
                    </div>

                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#07090e] shadow-inner interactive-screen">
                      <ServiIntelOperarioApp />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* REAL-TIME ECOSYSTEM SYNC STREAM RIBBON */}
            <div className="w-full py-1 px-3 rounded-lg bg-sky-500/5 border border-sky-500/15 flex items-center justify-between font-mono text-[9px] lg:text-[9.5px] xl:text-[10.5px] text-sky-400/90 custom-stage-anim shrink-0">
              <div className="flex items-center gap-2">
                <Radio className="w-3 h-3 text-sky-400 animate-pulse" />
                <span className="font-bold tracking-wider">LIVE DATA BUS // FIRESTORE STREAM</span>
                <span className="text-zinc-400 hidden xl:inline">|</span>
                <span className="text-zinc-300 hidden xl:inline">Sincronización bidireccional campo ⇄ central</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-200 font-semibold">
                <span>Vanilla JS Web</span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              </div>
            </div>

            {/* BOTTOM SECTION: WEB ADMIN CONSOLE */}
            <div className="w-full custom-stage-anim">
              <div className="grid grid-cols-12 gap-3 xl:gap-5 2xl:gap-6 items-center">
                
                {/* Left Column (4 cols): MACBOOK / WEB CONSOLE MOCKUP (Fluid Scaling) */}
                <div className="col-span-4 flex justify-center py-0.5">
                  <div 
                    data-prevent-slide="true"
                    className="mockup-interactive relative w-full max-w-52.5 lg:max-w-62.5 xl:max-w-75 2xl:max-w-90 max-h-[22vh] lg:max-h-[25vh] xl:max-h-[29vh] 2xl:max-h-[33vh] flex flex-col items-center group transition-all duration-300"
                  >
                    {/* Display Chassis */}
                    <div className="relative w-full aspect-16/10 rounded-xl bg-linear-to-b from-[#1c1f2c] via-[#141722] to-[#0f1118] p-1.5 border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.85)] overflow-hidden">
                      {/* Camera Notch */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black border border-white/15 flex items-center justify-center z-30 pointer-events-none">
                        <div className="w-0.5 h-0.5 rounded-full bg-emerald-500/50" />
                      </div>

                      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/4 to-transparent pointer-events-none z-30" />

                      <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#07090e] border border-white/10 shadow-inner interactive-screen">
                        <ServiIntelLaptopApp />
                      </div>
                    </div>

                    {/* Aluminum Laptop Base */}
                    <div className="w-[104%] h-2 bg-linear-to-b from-[#252838] to-[#12141c] rounded-b-lg border-t border-white/15 shadow-xl relative -mt-0.5 flex justify-center pointer-events-none">
                      <div className="w-10 h-0.5 bg-black/60 rounded-b-sm mt-0.5" />
                    </div>
                  </div>
                </div>

                {/* Center Column (4 cols): 3 WEB CONSOLE CARDS */}
                <div className="col-span-4 flex flex-col justify-center gap-1 px-1">
                  <div className="p-1 xl:p-1.5 rounded-lg bg-white/3 border border-white/10 space-y-0.5 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-1.5 text-[9.5px] lg:text-[10px] xl:text-[11px] font-bold text-zinc-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                      <span>Rendimiento Puro & 0 KB Overhead</span>
                    </div>
                    <p className="text-[8.5px] lg:text-[9px] xl:text-[10px] text-zinc-300 leading-tight pl-3">
                      Sin sobrecarga de librerías: carga instantánea y manipulación nativa ultra-rápida.
                    </p>
                  </div>

                  <div className="p-1 xl:p-1.5 rounded-lg bg-white/3 border border-white/10 space-y-0.5 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-1.5 text-[9.5px] lg:text-[10px] xl:text-[11px] font-bold text-zinc-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Monitoreo & Roles RBAC</span>
                    </div>
                    <p className="text-[8.5px] lg:text-[9px] xl:text-[10px] text-zinc-300 leading-tight pl-3">
                      Despacho de órdenes y supervisión de cuadrillas en tiempo real con seguridad.
                    </p>
                  </div>

                  <div className="p-1 xl:p-1.5 rounded-lg bg-white/3 border border-white/10 space-y-0.5 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-1.5 text-[9.5px] lg:text-[10px] xl:text-[11px] font-bold text-zinc-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                      <span>Despacho en Caliente Live</span>
                    </div>
                    <p className="text-[8.5px] lg:text-[9px] xl:text-[10px] text-zinc-300 leading-tight pl-3">
                      Canal WebSockets en vivo para actualización de estados sin recargar pantalla.
                    </p>
                  </div>
                </div>

                {/* Right Column (4 cols): Web Admin Console Info */}
                <div className="col-span-4 space-y-1">
                  <div className="space-y-0.5">
                    <div className="inline-flex items-center gap-1.5 text-[9.5px] lg:text-[10px] xl:text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                      <span>WEB ADMIN CONSOLE</span>
                    </div>
                    <ServiIntelAdminTitle isActive={isActive} />
                    <p className="text-xs xl:text-sm font-semibold text-zinc-200">
                      Consola Web de Administración & Despacho
                    </p>
                    <p className="text-[9.5px] lg:text-[10px] xl:text-[11px] text-zinc-300 leading-snug font-sans">
                      Consola administrativa en <span className="text-white font-semibold">JavaScript Vanilla</span> puro: 0 KB sobrecarga, manipulación DOM nativa y sync sub-38ms con <span className="text-sky-300 font-semibold">Cloud Firestore & WebSockets</span>.
                    </p>
                  </div>

                  {/* 3 Key Features */}
                  <div className="grid grid-cols-3 gap-1 pt-1 border-t border-white/10">
                    <div className="flex items-start gap-1">
                      <div className="w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-md bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                        <Zap className="w-2 h-2" />
                      </div>
                      <div>
                        <div className="text-[9.5px] xl:text-[11px] font-bold text-zinc-100">Cero Overhead</div>
                        <div className="text-[8px] xl:text-[8.5px] text-zinc-400 leading-tight">Ultra rápido</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-1">
                      <div className="w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-md bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                        <Monitor className="w-2 h-2" />
                      </div>
                      <div>
                        <div className="text-[9.5px] xl:text-[11px] font-bold text-zinc-100">Dashboard</div>
                        <div className="text-[8px] xl:text-[8.5px] text-zinc-400 leading-tight">En vivo</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-1">
                      <div className="w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-md bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                        <ShieldCheck className="w-2 h-2" />
                      </div>
                      <div>
                        <div className="text-[9.5px] xl:text-[11px] font-bold text-zinc-100">Seguridad</div>
                        <div className="text-[8px] xl:text-[8.5px] text-zinc-400 leading-tight">RBAC</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* MOBILE VIEW (lg:hidden): CLEAN SEGMENTED TAB SWITCHER & NATIVE FIT */}
          {/* ========================================================================= */}
          <div className="flex lg:hidden flex-col space-y-3 pb-8 pt-0.5 custom-stage-anim">
            
            {/* Segmented Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10 font-mono text-xs">
              <button
                onClick={() => setMobileTab('mobile')}
                className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold ${
                  mobileTab === 'mobile'
                    ? 'bg-sky-400 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>📱 App Terreno</span>
              </button>
              <button
                onClick={() => setMobileTab('web')}
                className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold ${
                  mobileTab === 'web'
                    ? 'bg-sky-400 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>💻 Consola Web</span>
              </button>
            </div>

            {/* Realtime Stream Pill */}
            <div className="flex items-center justify-between px-3 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 font-mono text-[10.5px] text-sky-300">
              <div className="flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-sky-400 animate-pulse" />
                <span>FLIGHT SYNC STREAM // FIRESTORE</span>
              </div>
              <span className="text-emerald-400 font-bold">&lt;38ms Live</span>
            </div>

            {/* TAB 1: FIELD MOBILE APP */}
            {mobileTab === 'mobile' ? (
              <div className="space-y-3">
                {/* Smartphone Mockup */}
                <div className="flex justify-center py-0.5">
                  <div 
                    data-prevent-slide="true"
                    className="mockup-interactive relative w-full max-w-52 sm:max-w-64 aspect-9/13 rounded-2xl bg-linear-to-b from-[#2a2f42] via-[#161822] to-[#0b0d13] p-1.5 border border-white/20 shadow-2xl"
                  >
                    {/* Dynamic Island */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-black border border-white/10 flex items-center justify-between px-1.5 z-30 pointer-events-none">
                      <div className="w-0.5 h-0.5 rounded-full bg-sky-400/80 shadow-[0_0_3px_#38bdf8] animate-pulse" />
                      <div className="w-1 h-1 rounded-full bg-[#111] border border-white/20 flex items-center justify-center">
                        <div className="w-0.5 h-0.5 rounded-full bg-emerald-400/60" />
                      </div>
                    </div>

                    <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-transparent via-white/4 to-transparent pointer-events-none z-30" />

                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#07090e] border border-white/10 shadow-inner interactive-screen">
                      <ServiIntelOperarioApp />
                    </div>
                  </div>
                </div>

                {/* Info Text */}
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    <span>TERMINAL DE CAMPO & MÓVIL</span>
                  </div>
                  <ServiIntelFieldTitle isActive={isActive} />
                  <p className="text-xs font-semibold text-zinc-200">
                    Aplicación de Terreno & Geo-Ticketing
                  </p>
                  <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                    Aplicación móvil nativa en <span className="text-white font-semibold">Flutter & Dart</span> diseñada para cuadrillas operativas en campo con geolocalización GPS de rutas y sincronización con <span className="text-sky-300 font-semibold">Cloud Firestore</span>.
                  </p>
                </div>

                {/* 3 Features */}
                <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-white/10">
                  <div className="p-1.5 rounded-lg bg-white/3 border border-white/5 flex flex-col items-center text-center space-y-0.5">
                    <MapPin className="w-3 h-3 text-sky-400" />
                    <span className="text-[10px] font-bold text-white">Operaciones</span>
                    <span className="text-[8.5px] text-zinc-400">En terreno</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/3 border border-white/5 flex flex-col items-center text-center space-y-0.5">
                    <Navigation className="w-3 h-3 text-sky-400" />
                    <span className="text-[10px] font-bold text-white">Geo-GPS</span>
                    <span className="text-[8.5px] text-zinc-400">Ruta en vivo</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/3 border border-white/5 flex flex-col items-center text-center space-y-0.5">
                    <RefreshCw className="w-3 h-3 text-sky-400" />
                    <span className="text-[10px] font-bold text-white">Offline</span>
                    <span className="text-[8.5px] text-zinc-400">Firestore</span>
                  </div>
                </div>
              </div>
            ) : (
              /* TAB 2: WEB ADMIN CONSOLE */
              <div className="space-y-3">
                {/* Laptop Mockup */}
                <div className="flex justify-center py-0.5">
                  <div 
                    data-prevent-slide="true"
                    className="mockup-interactive relative w-full max-w-72 sm:max-w-96 flex flex-col items-center"
                  >
                    <div className="relative w-full aspect-16/10 rounded-xl bg-linear-to-b from-[#1c1f2c] via-[#141722] to-[#0f1118] p-1.5 border border-white/20 shadow-2xl overflow-hidden">
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black border border-white/15 flex items-center justify-center z-30 pointer-events-none">
                        <div className="w-0.5 h-0.5 rounded-full bg-emerald-500/50" />
                      </div>
                      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/4 to-transparent pointer-events-none z-30" />
                      <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#07090e] border border-white/10 shadow-inner interactive-screen">
                        <ServiIntelLaptopApp />
                      </div>
                    </div>
                    <div className="w-[104%] h-2 bg-linear-to-b from-[#252838] to-[#12141c] rounded-b-lg border-t border-white/15 shadow-xl relative -mt-0.5 flex justify-center pointer-events-none">
                      <div className="w-10 h-0.5 bg-black/60 rounded-b-sm mt-0.5" />
                    </div>
                  </div>
                </div>

                {/* Info Text */}
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    <span>WEB ADMIN CONSOLE</span>
                  </div>
                  <ServiIntelAdminTitle isActive={isActive} />
                  <p className="text-xs font-semibold text-zinc-200">
                    Consola Web de Administración & Despacho
                  </p>
                  <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                    Plataforma administrativa construida en <span className="text-white font-semibold">JavaScript Vanilla</span> puro: cero sobrecarga de librerías, manipulación nativa del DOM y sincronización continua para despacho en caliente.
                  </p>
                </div>

                {/* 3 Features */}
                <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-white/10">
                  <div className="p-1.5 rounded-lg bg-white/3 border border-white/5 flex flex-col items-center text-center space-y-0.5">
                    <Zap className="w-3 h-3 text-sky-400" />
                    <span className="text-[10px] font-bold text-white">Rendimiento</span>
                    <span className="text-[8.5px] text-zinc-400">Cero overhead</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/3 border border-white/5 flex flex-col items-center text-center space-y-0.5">
                    <Monitor className="w-3 h-3 text-sky-400" />
                    <span className="text-[10px] font-bold text-white">Dashboard</span>
                    <span className="text-[8.5px] text-zinc-400">En vivo</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/3 border border-white/5 flex flex-col items-center text-center space-y-0.5">
                    <ShieldCheck className="w-3 h-3 text-sky-400" />
                    <span className="text-[10px] font-bold text-white">Seguridad</span>
                    <span className="text-[8.5px] text-zinc-400">RBAC</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. O-TEK QUALITY CONTROL — INDUSTRIAL POWER PLATFORM (MOCKUP LEFT, NARRATIVE RIGHT)
  // =========================================================================
  if (project.id === 'otek-powerapps') {
    return (
      <div
        ref={containerRef}
        className="w-full min-h-full flex flex-col justify-start md:justify-center px-3 sm:px-8 md:px-12 lg:px-20 pt-2 sm:pt-16 pb-4 sm:pb-12 relative select-none overflow-y-auto custom-scroll text-zinc-100 font-sans"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 15%, #081626 0%, #050d18 55%, #02050b 100%)'
        }}
      >
        <div className="max-w-7xl w-full mx-auto flex flex-col my-auto space-y-2 sm:space-y-4 relative z-10">

          {/* Header Bar */}
          <div className="w-full flex items-center justify-between pb-1.5 sm:pb-2.5 border-b border-sky-500/20 custom-stage-anim shrink-0 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-bold tracking-widest text-zinc-200">02 // CONTROL CALIDAD INTEGRADO</span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono text-[10px] sm:text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                POWER PLATFORM SUITE @ O-TEK
              </span>
            </div>
            <div className="flex items-center gap-2 text-sky-300 font-mono text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="hidden sm:inline">SharePoint + Power Automate Live</span>
            </div>
          </div>

          {/* 2-Column Content: Mockup LEFT (Tablet), Content RIGHT */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 xl:gap-12 items-center">

            {/* Left: Device Mockup (Tablet Industrial) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center custom-stage-anim">
              <RealisticDevice3D
                type={project.deviceType}
                image={project.image}
                accentColor="#0ea5e9"
                title={project.title}
                codeSnippet={project.codeSnippet}
                projectId={project.id}
                isActive={isActive}
              />
            </div>

            {/* Right: Text Narrative & Enterprise Engineering */}
            <div className="lg:col-span-6 space-y-2 lg:space-y-2.5 custom-stage-anim">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[10px] sm:text-xs font-mono font-medium text-sky-400 tracking-wider uppercase block">
                  Digitalización Industrial & Cloud Automation
                </span>
                <OtekQualityTitle isActive={isActive} />
                <p className="text-xs sm:text-[13px] text-zinc-300 font-normal leading-relaxed">
                  {project.subtitle}
                </p>
              </div>

              {/* Internal Project Attribution Pill */}
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-lg bg-sky-500/10 border border-sky-500/25 text-[11px] text-sky-300">
                <ShieldCheck className="w-3 h-3 text-sky-400 shrink-0" />
                <span className="font-medium">Proyecto Corporativo Interno @ O-tek (Power Platform)</span>
              </div>

              <p className="text-xs sm:text-[13px] text-zinc-300 font-sans leading-relaxed">
                {project.description}
              </p>

              {/* Technical Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1.5 font-mono text-xs border-t border-white/10">
                {project.metrics.map(m => (
                  <div key={m.label} className="space-y-0.5">
                    <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider block font-medium">{m.label}</span>
                    <span className="text-xs sm:text-sm font-bold text-sky-400 block">{m.val}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5 font-mono text-xs">
                <button
                  onClick={() => setShowOtekModal(true)}
                  className="px-3.5 sm:px-4 py-1.5 rounded-full bg-sky-500 hover:bg-sky-400 text-black font-bold flex items-center gap-1.5 shadow-lg shadow-sky-500/20 transition-all cursor-pointer active:scale-95 text-xs"
                >
                  <Workflow className="w-3.5 h-3.5" />
                  <span>Ver Flujo & Arquitectura</span>
                </button>

                <button
                  onClick={() => onPlayDemo(project)}
                  className="px-3 sm:px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-200 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer text-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Probar Formulario</span>
                </button>

                <a
                  href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20cotizar%20un%20proyecto%20con%20Power%20Apps%20y%20SharePoint`}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="WHATSAPP"
                  className="px-3 sm:px-3.5 py-1.5 rounded-full border border-white/15 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 hover:border-emerald-500/50 text-xs"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                  <span>Cotizar</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Architecture Modal */}
        <OtekArchitectureModal
          isOpen={showOtekModal}
          onClose={() => setShowOtekModal(false)}
        />
      </div>
    );
  }

  // =========================================================================
  // 3. SOPA SENIOR — GOOGLE PLAY STORE (LAYOUT: CONTENT LEFT, MOCKUP RIGHT)
  // =========================================================================
  if (project.id === 'sopa-senior') {
    return (
      <div
        ref={containerRef}
        className="w-full min-h-full flex flex-col justify-start md:justify-center px-3 sm:px-8 md:px-12 lg:px-20 pt-2 sm:pt-16 pb-4 sm:pb-12 relative select-none overflow-y-auto custom-scroll text-zinc-100 font-sans"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 15%, #1c1003 0%, #0d0701 55%, #050300 100%)'
        }}
      >
        <div className="max-w-7xl w-full mx-auto flex flex-col my-auto space-y-2 sm:space-y-4 relative z-10">

          {/* Header Bar */}
          <div className="w-full flex items-center justify-between pb-1.5 sm:pb-2.5 border-b border-amber-500/20 custom-stage-anim shrink-0 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-bold tracking-widest text-zinc-200">03 // SOPA SENIOR</span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] sm:text-[11px] flex items-center gap-1.5">
                <GooglePlayIcon className="w-3.5 h-3.5 fill-current" />
                PUBLICADO EN GOOGLE PLAY STORE
              </span>
            </div>
            <div className="flex items-center gap-2 text-amber-300 font-mono text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="hidden sm:inline">AdMob + IAP Producción</span>
            </div>
          </div>

          {/* 2-Column Content: Content LEFT, Mockup RIGHT */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 xl:gap-12 items-center">

            {/* Left: Text Narrative */}
            <div className="lg:col-span-7 space-y-2 lg:space-y-2.5 custom-stage-anim order-1 lg:order-1">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[10px] sm:text-xs font-mono font-medium text-amber-400/90 tracking-wider uppercase block">
                  Juego Móvil Nativo & Monetización en Producción
                </span>
                <SopaSeniorTitle isActive={isActive} />
                <p className="text-xs sm:text-[13px] text-zinc-300 font-normal leading-relaxed">
                  {project.subtitle}
                </p>
              </div>

              {/* Attribution Pill */}
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-300">
                <GooglePlayIcon className="w-3 h-3 fill-current text-amber-400 shrink-0" />
                <span className="font-medium">Publicado en Google Play Store • Google Mobile Ads & IAP</span>
              </div>

              {/* Key Objective Highlight */}
              <div className="flex items-stretch gap-2.5 px-3 py-1.5 rounded-xl bg-white/3 border border-white/10 shadow-sm backdrop-blur-md">
                <div className="w-1 rounded-full bg-amber-400 shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                <p className="text-xs sm:text-[13px] font-sans font-medium text-zinc-200 tracking-[-0.01em] leading-relaxed self-center">
                  {project.headline}
                </p>
              </div>

              <p className="text-xs sm:text-[13px] text-zinc-400 font-sans leading-relaxed max-w-2xl">
                {project.description}
              </p>

              {/* Technical Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1.5 font-mono text-xs border-t border-white/10">
                {project.metrics.map(m => (
                  <div key={m.label} className="space-y-0.5">
                    <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider block font-medium">{m.label}</span>
                    <span className="text-xs sm:text-sm font-bold text-amber-400 block">{m.val}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5 font-mono text-xs">
                {/* En teléfonos únicamente: opción de probar en pantalla grande */}
                <button
                  onClick={() => onPlayDemo(project)}
                  className="sm:hidden px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer active:scale-95 text-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Probar en Pantalla Grande</span>
                </button>

                <a
                  href={project.googlePlayUrl || "https://play.google.com/store/apps/details?id=com.inventus.sopasenior"}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="PLAYSTORE"
                  className="px-3.5 sm:px-4 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold hidden sm:flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-95 text-xs"
                >
                  <GooglePlayIcon className="w-3.5 h-3.5 fill-current" />
                  <span>Probar en Google Play</span>
                </a>

                <button
                  onClick={() => onPlayDemo(project)}
                  className="hidden sm:flex px-3 sm:px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-200 hover:text-white items-center gap-1.5 transition-all cursor-pointer text-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Probar Simulación</span>
                </button>

                <a
                  href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20cotizar%20un%20juego%20o%20app%20móvil%20con%20monetización%20AdMob`}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="WHATSAPP"
                  className="px-3 sm:px-3.5 py-1.5 rounded-full border border-white/15 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 hover:border-amber-500/50 text-xs"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                  <span>Cotizar</span>
                </a>
              </div>

            </div>

            {/* Right: Device Mockup (Phone Vertical) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center custom-stage-anim order-1 lg:order-2">
              <RealisticDevice3D
                type={project.deviceType}
                image={project.image}
                accentColor="#f59e0b"
                title={project.title}
                codeSnippet={project.codeSnippet}
                projectId={project.id}
                isActive={isActive}
              />
            </div>

          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. LOVECOST / NIDO — FINTECH & WEALTH (DUAL-PHONE COUPLE STAGE)
  // =========================================================================
  if (project.id === 'lovecost-nido') {
    return <NidoCoupleStage project={project} isActive={isActive} onPlayDemo={onPlayDemo} />;
  }

  // =========================================================================
  // 5. DAYS: FOCUS.FLOW — ZEN UX (LAYOUT: CONTENT LEFT, MOCKUP RIGHT)
  // =========================================================================
  if (project.id === 'days-focus-flow') {
    return (
      <div
        ref={containerRef}
        className="w-full min-h-full flex flex-col justify-start md:justify-center px-3 sm:px-8 md:px-12 lg:px-20 pt-12 sm:pt-20 pb-12 sm:pb-16 relative select-none overflow-y-auto custom-scroll text-[#FAF8F5] font-sans"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 15%, #161e18 0%, #0e1410 55%, #050806 100%)'
        }}
      >
        <div className="max-w-7xl w-full mx-auto flex flex-col my-auto space-y-2 sm:space-y-4 relative z-10">

          {/* Header Bar */}
          <div className="w-full flex items-center justify-between pb-1.5 sm:pb-2.5 border-b border-[#8B9A86]/20 custom-stage-anim shrink-0 font-mono text-xs text-[#8B9A86]">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-bold tracking-widest text-[#FAF8F5]">05 // DAYS: FOCUS.FLOW</span>
              <span className="text-[#8B9A86]/50 hidden sm:inline">•</span>
              <span className="text-[#FAF8F5]/80 hidden sm:inline font-sans font-normal text-[10.5px] sm:text-xs">Diseño Mindful & Gestos Naturales</span>
            </div>
            <div className="flex items-center gap-2 text-[#FAF8F5] text-xs">
              <span>🌿 Salvia #8B9A86</span>
            </div>
          </div>

          {/* 2-Column Content: Content LEFT, Mockup RIGHT */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 xl:gap-12 items-center">

            {/* Left: Text Narrative */}
            <div className="lg:col-span-7 space-y-2 lg:space-y-2.5 custom-stage-anim order-2 lg:order-1">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[10px] sm:text-xs font-mono font-medium text-[#8B9A86] tracking-wider uppercase block">
                  Productividad Consciente & UX Orgánica
                </span>
                <CinematicTitle
                  text={project.title}
                  isActive={isActive}
                  className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-display font-extrabold text-[#FAF8F5] tracking-tight leading-[1.08]"
                  accentColor="#8B9A86"
                />
                <span className="text-[11px] sm:text-xs font-mono text-[#8B9A86] block">
                  Flutter 3.x • State Pattern • Canvas UI
                </span>
              </div>

              {/* Attribution Pill */}
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-lg bg-[#8B9A86]/15 border border-[#8B9A86]/30 text-[11px] text-[#FAF8F5]">
                <Sparkles className="w-3 h-3 text-[#8B9A86] shrink-0" />
                <span className="font-medium">Diseño Mindful & Gestos Naturales • Paleta Salvia #8B9A86</span>
              </div>

              {/* Key Objective Highlight */}
              <div className="flex items-stretch gap-2.5 px-3 py-1.5 rounded-xl bg-white/3 border border-white/10 shadow-sm backdrop-blur-md">
                <div className="w-1 rounded-full bg-[#8B9A86] shrink-0 shadow-[0_0_10px_rgba(139,154,134,0.5)]" />
                <p className="text-xs sm:text-[13px] font-sans font-medium text-[#FAF8F5] tracking-[-0.01em] leading-relaxed self-center">
                  {project.headline}
                </p>
              </div>

              <p className="text-xs sm:text-[13px] text-[#FAF8F5]/70 font-sans leading-relaxed max-w-2xl">
                {project.description}
              </p>

              {/* Technical Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1.5 font-mono text-xs border-t border-[#8B9A86]/25">
                {project.metrics.map(m => (
                  <div key={m.label} className="space-y-0.5">
                    <span className="text-[9px] sm:text-[10px] text-[#8B9A86] uppercase tracking-wider block font-medium">{m.label}</span>
                    <span className="text-xs sm:text-sm font-bold text-[#FAF8F5] block">{m.val}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5 font-mono text-xs">
                {/* En teléfonos únicamente: opción de probar en pantalla grande */}
                <button
                  onClick={() => onPlayDemo(project)}
                  className="sm:hidden px-3.5 py-1.5 rounded-full bg-[#8B9A86] hover:bg-[#9db097] text-[#0f1712] font-bold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer active:scale-95 text-xs"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Probar en Pantalla Grande</span>
                </button>

                <button
                  onClick={() => onPlayDemo(project)}
                  className="hidden sm:flex px-3.5 sm:px-4 py-1.5 rounded-full bg-[#8B9A86] hover:bg-[#9db097] text-[#0f1712] font-bold items-center gap-1.5 shadow-lg transition-all cursor-pointer active:scale-95 text-xs"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Navegación Zen</span>
                </button>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 sm:px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#8B9A86]/30 text-[#FAF8F5] flex items-center gap-1.5 transition-all text-xs"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Código Gestos</span>
                  </a>
                )}
                <a
                  href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20cotizar%20un%20proyecto%20similar%20a%20${encodeURIComponent(project.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="WHATSAPP"
                  className="px-3 sm:px-3.5 py-1.5 rounded-full border border-[#8B9A86]/20 text-[#FAF8F5]/80 hover:text-white transition-all flex items-center gap-1.5 hover:border-emerald-500/50 text-xs"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                  <span>Cotizar</span>
                </a>
              </div>

            </div>

            {/* Right: Device Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center custom-stage-anim order-1 lg:order-2">
              <RealisticDevice3D
                type={project.deviceType}
                image={project.image}
                accentColor="#8B9A86"
                title={project.title}
                codeSnippet={project.codeSnippet}
                projectId={project.id}
                isActive={isActive}
              />
            </div>

          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 6. PAZ HOY — MINDFULNESS & HOME WIDGETS (LAYOUT: CONTENT LEFT, MOCKUP RIGHT)
  // =========================================================================
  return (
    <div
      ref={containerRef}
      className="w-full min-h-full flex flex-col justify-start md:justify-center px-3 sm:px-8 md:px-12 lg:px-20 pt-12 sm:pt-20 pb-12 sm:pb-16 relative select-none overflow-y-auto custom-scroll text-zinc-100 font-sans"
      style={{
        background: 'radial-gradient(ellipse 100% 100% at 50% 15%, #140f28 0%, #0c0819 55%, #05030a 100%)'
      }}
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col my-auto space-y-2 sm:space-y-4 relative z-10">

        {/* Header Bar */}
        <div className="w-full flex items-center justify-between pb-1.5 sm:pb-2.5 border-b border-indigo-500/20 custom-stage-anim shrink-0 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-bold tracking-widest text-zinc-200">06 // PAZ HOY</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-[10px] sm:text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              HOME WIDGET SYNC ANDROID & IOS
            </span>
          </div>
          <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="hidden sm:inline">Google Fonts Runtime + Provider</span>
          </div>
        </div>

        {/* 2-Column Content: Content LEFT, Mockup RIGHT */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 xl:gap-12 items-center">

          {/* Left: Text Narrative */}
          <div className="lg:col-span-7 space-y-2 lg:space-y-2.5 custom-stage-anim order-2 lg:order-1">
            <div className="space-y-0.5 sm:space-y-1">
              <span className="text-[10px] sm:text-xs font-mono font-medium text-indigo-400/90 tracking-wider uppercase block">
                App Móvil Flutter & Ecosistema de Widgets Nativos
              </span>
              <CinematicTitle
                text={project.title}
                isActive={isActive}
                className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-display font-extrabold text-white tracking-tight uppercase leading-[1.08]"
                accentColor="#818cf8"
              />
              <p className="text-xs sm:text-[13px] text-zinc-300 font-normal leading-relaxed">
                {project.subtitle}
              </p>
            </div>

            {/* Attribution Pill */}
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-lg bg-indigo-500/10 border border-indigo-500/25 text-[11px] text-indigo-300">
              <Sparkles className="w-3 h-3 text-indigo-400 shrink-0" />
              <span className="font-medium">Widgets Nativos Android / iOS • Google Fonts Runtime • Screenshot Hi-Res</span>
            </div>

            {/* Key Objective Highlight */}
            <div className="flex items-stretch gap-2.5 px-3 py-1.5 rounded-xl bg-white/3 border border-white/10 shadow-sm backdrop-blur-md">
              <div className="w-1 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_10px_rgba(129,140,248,0.5)]" />
              <p className="text-xs sm:text-[13px] font-sans font-medium text-zinc-200 tracking-[-0.01em] leading-relaxed self-center">
                {project.headline}
              </p>
            </div>

            <p className="text-xs sm:text-[13px] text-zinc-400 font-sans leading-relaxed">
              {project.description}
            </p>

            {/* Technical Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1.5 font-mono text-xs border-t border-white/10">
              {project.metrics.map(m => (
                <div key={m.label} className="space-y-0.5">
                  <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider block font-medium">{m.label}</span>
                  <span className="text-xs sm:text-sm font-bold text-indigo-400 block">{m.val}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5 font-mono text-xs">
              {/* En teléfonos únicamente: opción de probar en pantalla grande */}
              <button
                onClick={() => onPlayDemo(project)}
                className="sm:hidden px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer active:scale-95 text-xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Probar en Pantalla Grande</span>
              </button>

              <button
                onClick={() => onPlayDemo(project)}
                className="hidden sm:flex px-3.5 sm:px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold items-center gap-1.5 shadow-lg transition-all cursor-pointer active:scale-95 text-xs shadow-indigo-500/20"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Personalizar en Grande</span>
              </button>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 sm:px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all text-xs"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Código StyleProvider</span>
                </a>
              )}
              <a
                href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20cotizar%20un%20proyecto%20móvil%20similar%20a%20${encodeURIComponent(project.title)}`}
                target="_blank"
                rel="noreferrer"
                data-cursor="WHATSAPP"
                className="px-3 sm:px-3.5 py-1.5 rounded-full border border-white/15 text-zinc-400 hover:text-white transition-all flex items-center gap-1.5 hover:border-emerald-500/50 text-xs"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                <span>Cotizar</span>
              </a>
            </div>

          </div>

          {/* Right: Device Mockup (Phone Vertical) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center custom-stage-anim order-1 lg:order-2">
            <RealisticDevice3D
              type={project.deviceType}
              image={project.image}
              accentColor="#818cf8"
              title={project.title}
              codeSnippet={project.codeSnippet}
              projectId={project.id}
              isActive={isActive}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
