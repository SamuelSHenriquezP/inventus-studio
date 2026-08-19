import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X, Code2, MessageSquare, Play } from 'lucide-react';

import FlutterCodeViewer from './FlutterCodeViewer';
import SopaSeniorApp from './apps/SopaSeniorApp';
import InventusWebApp from './apps/InventusWebApp';
import ServiIntelOperarioApp from './apps/ServiIntelOperarioApp';

import { personalInfo } from '../Data/projectsData';

function AppSimulator({ simulator, deviceType }) {
  const isLaptop = deviceType === 'laptop';

  const getApp = () => {
    switch (simulator) {
      case 'sopa-senior':      return <SopaSeniorApp />;
      case 'inventus-web':     return <InventusWebApp />;
      case 'serviintel-operario': return <ServiIntelOperarioApp />;
      default:                 return null;
    }
  };

  const app = getApp();

  if (isLaptop) {
    return (
      <div className="relative w-full max-w-105 flex flex-col items-center mx-auto">
        <div className="relative w-full aspect-16/10 rounded-xl bg-[#18191e] p-2.5 border border-white/15 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/3 to-transparent pointer-events-none z-30" />
          <div className="relative w-full h-full rounded-lg overflow-hidden bg-black border border-white/10 shadow-inner">
            {app}
          </div>
        </div>
        <div className="w-[104%] h-3 bg-linear-to-b from-[#252730] to-[#14151a] rounded-b-xl border-t border-white/15 shadow-xl relative -mt-0.5 flex justify-center pointer-events-none">
          <div className="w-12 h-0.5 bg-black/60 rounded-b-md mt-0.5" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-48 sm:w-56 aspect-9/18.8 rounded-[36px] bg-[#15161c] p-2.5 border border-white/15 shadow-2xl mx-auto">
      <div className="absolute inset-0 rounded-4xl bg-linear-to-tr from-transparent via-white/3 to-transparent pointer-events-none z-30" />
      <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-black border border-white/10 shadow-inner">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full border border-white/10 z-30 pointer-events-none" />
        {app}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-14 h-0.5 bg-white/30 rounded-full z-20 pointer-events-none" />
      </div>
    </div>
  );
}

export default function ProjectDetailModal({ project, onClose }) {
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const [screenMode, setScreenMode] = useState('live-app');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    const tl = gsap.timeline();
    tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
    tl.fromTo(panelRef.current,
      { opacity: 0, y: 40, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' },
      0.05
    );

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, { opacity: 0, y: 30, scale: 0.97, duration: 0.3, ease: 'power2.in' }, 0);
    tl.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0);
  };

  if (!project) return null;

  return (
    <div 
      data-modal="true"
      data-prevent-slide="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 modal-container"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-md modal-backdrop"
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        data-prevent-slide="true"
        onWheel={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0d0e14] border border-white/10 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          className="sticky top-0 z-20 flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#0d0e14]/95 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 font-mono text-xs">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: project.accent }}
            />
            <span className="text-zinc-400">{project.category.toUpperCase()}</span>
            <span className="text-zinc-600">•</span>
            <span className="font-bold text-white">{project.title}</span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Left: Simulator */}
          <div className="lg:col-span-5 flex flex-col items-center gap-3">
            {/* Mode Switcher */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-900/90 border border-white/10 font-mono text-[11px]">
              <button
                onClick={() => setScreenMode('live-app')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  screenMode === 'live-app' ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>App</span>
              </button>
              <button
                onClick={() => setScreenMode('code')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  screenMode === 'code' ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3 h-3" />
                <span>Código</span>
              </button>
            </div>

            {screenMode === 'live-app' ? (
              <AppSimulator simulator={project.appSimulator} deviceType={project.deviceType} />
            ) : (
              <div className="w-full rounded-xl bg-zinc-950 border border-white/10 overflow-hidden" style={{ height: '340px' }}>
                <FlutterCodeViewer codeSnippet={project.codeSnippet} accentColor={project.accent} />
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-7 space-y-5">
            {/* Title Block */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-medium uppercase tracking-wider" style={{ color: project.accent }}>
                {project.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight leading-tight">
                {project.title}
              </h2>
              <p className="text-sm text-zinc-300 font-light">{project.subtitle}</p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              {project.description}
            </p>

            {/* Highlights */}
            <div className="space-y-2">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-zinc-300 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: project.accent }} />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs border-t border-white/10">
              {project.metrics.map(m => (
                <div key={m.label} className="space-y-0.5">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">{m.label}</span>
                  <span className="text-sm font-bold text-white block">{m.val}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px]">
              {project.tags.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300">
                  {t}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
              <a
                href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20cotizar%20algo%20similar%20a%20${encodeURIComponent(project.title)}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-white text-black font-bold flex items-center gap-1.5 hover:bg-zinc-200 transition-all shadow-md active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-black" />
                <span>Cotizar Proyecto</span>
              </a>
              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-all"
              >
                Cerrar
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
