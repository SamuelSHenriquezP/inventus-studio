// src/components/sections/ProjectSection.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowUpRight, Play, Code2, CheckCircle2, 
  MessageSquare, ShieldCheck, RefreshCw, KeyRound, EyeOff, Eye, Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

import RealisticDevice3D from '../RealisticDevice3D';
import { sounds } from '../../utils/soundEngine';
import { personalInfo } from '../../Data/projectsData';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectSection({ project, index, onPlayDemo }) {
  const sectionRef = useRef(null);
  const textColRef = useRef(null);
  const mockupColRef = useRef(null);

  // Bespoke Micro-States for Interactive 3D Mockups
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [confidentialMask, setConfidentialMask] = useState(true);
  const [customLatency, setCustomLatency] = useState(38);

  const isEven = index % 2 === 1;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // 1. Text Column Reveal Animation
      gsap.fromTo(
        textColRef.current?.querySelectorAll('.gsap-reveal'),
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 2. Mockup 3D Parallax Tilt on Scroll
      gsap.fromTo(
        mockupColRef.current,
        {
          opacity: 0,
          scale: 0.92,
          y: 60,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // Biometric Unlock Simulation (Fortress Vault)
  const triggerBiometricUnlock = () => {
    sounds.playClick();
    setVaultUnlocked(prev => !prev);
    if (!vaultUnlocked) {
      sounds.playSuccess();
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.6 },
        colors: ['#c084fc', '#ffffff', '#38bdf8']
      });
    }
  };

  // Live WebSocket Sync Simulation (CloudStream)
  const triggerCloudSync = () => {
    if (isSyncing) return;
    sounds.playClick();
    setIsSyncing(true);
    setTimeout(() => {
      sounds.playSuccess();
      setIsSyncing(false);
      setCustomLatency(Math.floor(Math.random() * 15) + 24);
      confetti({
        particleCount: 20,
        spread: 35,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#ffffff', '#34d399']
      });
    }, 600);
  };

  // Map device type string
  const deviceTypeKey = project.id === 'cyber-rush'
    ? 'arcade'
    : project.deviceType === 'laptop3d' 
      ? 'laptop' 
      : project.deviceType === 'sculpture3d' 
        ? 'sculpture' 
        : 'phone-vertical';

  return (
    <section
      id={project.id}
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-28 px-6 max-w-7xl mx-auto border-t border-white/10 overflow-hidden select-none"
    >
      {/* Dynamic Ambient Background Glow */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none -z-10 transition-all duration-700"
        style={{
          background: project.accentGlow,
          left: isEven ? '60%' : '5%',
        }}
      />

      <div className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
        isEven ? 'lg:flex-row-reverse' : ''
      }`}>
        
        {/* ========================================================================= */}
        {/* 1. EDITORIAL & CASE STUDY COLUMN */}
        {/* ========================================================================= */}
        <div 
          ref={textColRef}
          className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
        >
          
          {/* Badge & Index */}
          <div className="gsap-reveal flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-zinc-300 uppercase">
              {project.badge}
            </span>
            <span className="text-xs font-mono text-zinc-500">
              {project.year} • {project.category}
            </span>
          </div>

          {/* Title with Fluid Editorial Typography */}
          <div className="gsap-reveal space-y-2">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
              {project.title}
            </h2>
            <p className="text-base font-serif-italic text-zinc-400">
              {project.subtitle}
            </p>
          </div>

          {/* Impact Statement Headline */}
          <div className="gsap-reveal p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-zinc-200 font-sans font-medium leading-relaxed">
            "{project.headline}"
          </div>

          {/* Deep-Dive Narrative */}
          <p className="gsap-reveal text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            {project.description}
          </p>

          {/* Dynamic Technical Metrics Matrix */}
          <div className="gsap-reveal grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {project.metrics.map((m) => (
              <div 
                key={m.label} 
                className="p-3 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-white/20 transition-colors shadow-inner"
              >
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  {m.label}
                </span>
                <span 
                  className="text-sm sm:text-base font-mono font-bold mt-1 block"
                  style={{ color: project.accent }}
                >
                  {m.val}
                </span>
              </div>
            ))}
          </div>

          {/* Architecture Highlights */}
          <div className="gsap-reveal space-y-2 pt-2">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
              Aspectos Destacados de Ingeniería
            </span>
            <div className="space-y-1.5 font-mono text-xs text-zinc-300">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="gsap-reveal flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 rounded-lg bg-zinc-900/90 border border-white/10 text-zinc-300 text-[11px] font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Toolbar */}
          <div className="gsap-reveal flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 font-mono text-xs">
            
            {/* Primary Interactive Demo Trigger */}
            <button
              onClick={() => onPlayDemo(project)}
              className="px-6 py-3.5 rounded-full bg-white text-black font-bold flex items-center gap-2 hover:bg-zinc-200 transition-all cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95"
              data-cursor="PLAY"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>{project.demoType === 'game' ? 'Jugar Demo Completo' : 'Probar Simulador en Vivo'}</span>
            </button>

            {/* Repositorio GitHub */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 rounded-full bg-zinc-900 border border-white/15 text-zinc-300 hover:text-white hover:border-white/30 transition-all flex items-center gap-2"
                data-cursor="CODE"
              >
                <Code2 className="w-4 h-4" />
                <span>Código</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Iniciar WhatsApp con mensaje de contexto */}
            <a
              href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20me%20interesa%20un%20proyecto%20con%20arquitectura%20similar%20a%20${encodeURIComponent(project.title)}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3.5 rounded-full border border-white/15 text-zinc-400 hover:text-white hover:border-white/30 transition-all flex items-center gap-1.5"
              data-cursor="CONSULTA"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Cotizar Similar</span>
            </a>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. REALISTIC 3D MOCKUP & INTERACTIVE STAGE COLUMN */}
        {/* ========================================================================= */}
        <div 
          ref={mockupColRef}
          className={`lg:col-span-6 flex flex-col items-center justify-center relative ${
            isEven ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          
          {/* Card Container for 3D Mockup */}
          <div className="w-full rounded-3xl bg-linear-to-b from-zinc-900/70 via-zinc-950/80 to-zinc-900/70 border border-white/10 p-5 sm:p-7 shadow-2xl relative backdrop-blur-xl group hover:border-white/20 transition-all duration-500">
            
            {/* Top Mockup Header / Interactive Status */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span 
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ backgroundColor: project.accent }}
                />
                <span className="text-white font-bold tracking-wider">
                  MOCKUP 3D PERSPECTIVA
                </span>
              </div>

              <span className="text-[11px] text-zinc-500">
                Puntero reactivo 3D
              </span>
            </div>

            {/* Render Realistic 3D Device */}
            <div className="relative py-2">
              <RealisticDevice3D 
                type={deviceTypeKey}
                image={project.image}
                accentColor={project.accent}
                title={project.title}
              />
            </div>

            {/* Bottom Bespoke Micro-Controls tailored to this App */}
            {project.id === 'cyber-rush' && (
              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <span>Modo Arcade: <strong>Flutter WebAssembly</strong></span>
                </div>
                <button
                  onClick={() => onPlayDemo(project)}
                  className="px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[11px] hover:bg-pink-500/20 transition-all cursor-pointer font-bold"
                  data-cursor="TEST 60FPS"
                >
                  Probar Físicas →
                </button>
              </div>
            )}

            {project.id === 'cloudstream-sync' && (
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { sounds.playClick(); setConfidentialMask(!confidentialMask); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white text-[11px] cursor-pointer"
                    data-cursor="NDA MASK"
                  >
                    {confidentialMask ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{confidentialMask ? 'NDA Oculto' : 'Datos Descubiertos'}</span>
                  </button>

                  <span className="text-[11px] text-emerald-400 font-bold">
                    {customLatency}ms Socket Ping
                  </span>
                </div>

                <button
                  onClick={triggerCloudSync}
                  disabled={isSyncing}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-[11px] hover:bg-sky-500/20 transition-all cursor-pointer font-bold"
                  data-cursor="SYNC EVENT"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Sincronizando...' : 'Disparar Evento Socket'}</span>
                </button>
              </div>
            )}

            {project.id === 'fortress-vault' && (
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Estado Bóveda: <strong className={vaultUnlocked ? 'text-emerald-400' : 'text-purple-300'}>
                    {vaultUnlocked ? 'Desbloqueada ($145,780)' : 'Bloqueada (AES-256)'}
                  </strong></span>
                </div>

                <button
                  onClick={triggerBiometricUnlock}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] hover:bg-purple-500/20 transition-all cursor-pointer font-bold flex items-center gap-1.5"
                  data-cursor="FIDO2 FACEID"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{vaultUnlocked ? 'Bloquear Enclave' : 'Simular FaceID'}</span>
                </button>
              </div>
            )}

            {project.id === 'nexus-experience' && (
              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-zinc-400">
                <span className="text-[11px]">Three.js • Shaders GLSL Procedurales</span>
                <span className="text-emerald-400 text-[11px] font-bold">60 FPS Smooth Inercial</span>
              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}
