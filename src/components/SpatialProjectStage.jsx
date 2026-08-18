import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { 
  ArrowLeft, ArrowRight, Play, Code2, ArrowUpRight, 
  MessageSquare, CheckCircle2, Sparkles, Terminal
} from 'lucide-react';

import RealisticDevice3D from './RealisticDevice3D';
import { personalInfo } from '../Data/projectsData';
import { sounds } from '../utils/soundEngine';

export default function SpatialProjectStage({ projects, onPlayDemo }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const stageRef = useRef(null);
  const contentRef = useRef(null);

  const currentProject = projects[currentIndex];

  const changeProject = useCallback((newIndex, direction = 1) => {
    if (newIndex === currentIndex || isTransitioning) return;
    setIsTransitioning(true);
    sounds.playClick();

    const stageEl = contentRef.current;
    if (!stageEl) {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
      return;
    }

    // 3D Spatial Box / Dimension Flip Transition
    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
      }
    });

    // Exit current dimension with 3D rotation & depth recession
    tl.to(stageEl, {
      opacity: 0,
      rotateY: direction > 0 ? -28 : 28,
      z: -160,
      scale: 0.92,
      duration: 0.45,
      ease: 'power3.in',
      onComplete: () => {
        setCurrentIndex(newIndex);
      }
    });

    // Enter new dimension with 3D snap and momentum
    tl.fromTo(stageEl, {
      opacity: 0,
      rotateY: direction > 0 ? 28 : -28,
      z: -160,
      scale: 0.92,
    }, {
      opacity: 1,
      rotateY: 0,
      z: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
    });
  }, [currentIndex, isTransitioning]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % projects.length;
    changeProject(nextIdx, 1);
  }, [currentIndex, projects.length, changeProject]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
    changeProject(prevIdx, -1);
  }, [currentIndex, projects.length, changeProject]);

  // Keyboard Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section 
      id="proyectos"
      ref={stageRef}
      className="relative min-h-[95vh] flex flex-col justify-center py-24 px-6 max-w-7xl mx-auto select-none overflow-hidden"
    >
      
      {/* 1. Dynamic Morphing Ambient Atmosphere */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none -z-10 transition-all duration-1000"
        style={{
          background: currentProject.accentGlow,
        }}
      />

      {/* 2. Top Spatial Dimension Switcher Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>ESCENARIO ESPACIAL 3D • 0{currentIndex + 1} DE 0{projects.length}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Casos de Estudio & Código Flutter
          </h2>
        </div>

        {/* Project Selector Dimension Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs">
          {projects.map((p, i) => {
            const isActive = i === currentIndex;
            return (
              <button
                key={p.id}
                onClick={() => changeProject(i, i > currentIndex ? 1 : -1)}
                className={`px-4 py-2 rounded-full border transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  isActive 
                    ? 'bg-white text-black font-bold border-white shadow-lg' 
                    : 'bg-zinc-950/80 border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
                }`}
                data-cursor={p.number}
              >
                <span>{p.number}</span>
                <span className="hidden sm:inline">{p.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. 3D Spatial Box Stage Viewport (Perspective Room) */}
      <div className="relative py-10 [perspective:1600px] overflow-visible">
        
        <div 
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          
          {/* Left Column: Monumental Free-Floating 3D Mockup (NO BOX) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <RealisticDevice3D 
              type={currentProject.deviceType}
              image={currentProject.image}
              accentColor={currentProject.accent}
              title={currentProject.title}
              codeSnippet={currentProject.codeSnippet}
              projectId={currentProject.id}
            />
          </div>

          {/* Right Column: Editorial Case Study & Code Narrative */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Project Index & Category Pill */}
            <div className="flex items-center gap-3">
              <span 
                className="px-3.5 py-1 rounded-full text-xs font-mono tracking-widest uppercase font-bold"
                style={{ 
                  backgroundColor: `${currentProject.accent}20`,
                  color: currentProject.accent,
                  border: `1px solid ${currentProject.accent}40`
                }}
              >
                {currentProject.badge}
              </span>
              <span className="text-xs font-mono text-zinc-500">
                {currentProject.year} • {currentProject.category}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1.5">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.06]">
                {currentProject.title}
              </h3>
              <p className="text-base font-serif-italic text-zinc-400">
                {currentProject.subtitle}
              </p>
            </div>

            {/* Headline */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-zinc-200 font-sans font-medium leading-relaxed">
              "{currentProject.headline}"
            </div>

            {/* Narrative */}
            <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
              {currentProject.description}
            </p>

            {/* Metric Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {currentProject.metrics.map((m) => (
                <div 
                  key={m.label} 
                  className="p-3 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-white/20 transition-colors shadow-inner"
                >
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    {m.label}
                  </span>
                  <span 
                    className="text-sm sm:text-base font-mono font-bold mt-1 block"
                    style={{ color: currentProject.accent }}
                  >
                    {m.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="space-y-1.5 font-mono text-xs text-zinc-300 pt-1">
              {currentProject.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentProject.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-zinc-900/90 border border-white/10 text-zinc-300 text-[11px] font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 font-mono text-xs">
              <button
                onClick={() => onPlayDemo(currentProject)}
                className="px-6 py-3.5 rounded-full bg-white text-black font-bold flex items-center gap-2 hover:bg-zinc-200 transition-all cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95"
                data-cursor="PLAY"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>{currentProject.demoType === 'game' ? 'Jugar Demo Completo' : 'Probar Simulador en Vivo'}</span>
              </button>

              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
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

              <a
                href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20me%20interesa%20un%20proyecto%20similar%20a%20${encodeURIComponent(currentProject.title)}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 rounded-full border border-white/15 text-zinc-400 hover:text-white hover:border-white/30 transition-all flex items-center gap-1.5"
                data-cursor="WHATSAPP"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Cotizar</span>
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* 4. Bottom 3D Spatial Navigation Controls */}
      <div className="flex items-center justify-between pt-8 border-t border-white/10 font-mono text-xs text-zinc-400">
        
        {/* Left / Prev 3D Stage Button */}
        <button
          onClick={handlePrev}
          disabled={isTransitioning}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-950 border border-white/10 hover:border-white/30 hover:text-white transition-all cursor-pointer shadow-md"
          data-cursor="PREV"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Anterior:</span>
          <span className="text-white font-bold">{projects[(currentIndex - 1 + projects.length) % projects.length].title}</span>
        </button>

        {/* Center Hint */}
        <div className="hidden md:flex items-center gap-2 text-zinc-500 text-[11px]">
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span>Usa las flechas del teclado ← → para rotar la dimensión 3D</span>
        </div>

        {/* Right / Next 3D Stage Button */}
        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-950 border border-white/10 hover:border-white/30 hover:text-white transition-all cursor-pointer shadow-md"
          data-cursor="NEXT"
        >
          <span className="hidden sm:inline">Siguiente:</span>
          <span className="text-white font-bold">{projects[(currentIndex + 1) % projects.length].title}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>

    </section>
  );
}
