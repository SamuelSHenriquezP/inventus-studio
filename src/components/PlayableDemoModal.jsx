// src/components/PlayableDemoModal.jsx
import { useState, useEffect, useCallback } from 'react';
import { 
  X, Play, QrCode, Zap, 
  ExternalLink, Code2, RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEngine';

export default function PlayableDemoModal({ project, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [playerPosition, setPlayerPosition] = useState(50);
  const [showQR, setShowQR] = useState(false);

  const handleAction = useCallback(() => {
    sounds.playClick();
    if (!isPlaying) {
      setIsPlaying(true);
      setScore(0);
      setCombo(1);
      return;
    }
    setCombo(c => Math.min(8, c + 1));
    setScore(s => s + 200);
    setPlayerPosition(Math.floor(Math.random() * 65) + 18);

    if (combo >= 4) {
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.6 },
        colors: [project?.accentColor || '#ffffff', '#00f0ff', '#a855f7']
      });
    }
  }, [isPlaying, combo, project]);

  // Keyboard controls for game testing (Left/Right or Space/Click)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (isPlaying) {
        if (e.key === 'ArrowLeft') setPlayerPosition(p => Math.max(15, p - 12));
        if (e.key === 'ArrowRight') setPlayerPosition(p => Math.min(85, p + 12));
        if (e.key === ' ') handleAction();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isPlaying, onClose, handleAction]);

  // Game continuous loop
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setScore(s => s + 25 * combo);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, combo]);

  if (!project) return null;

  const handleReset = () => {
    sounds.playClick();
    setScore(0);
    setCombo(1);
    setIsPlaying(false);
  };

  return (
    <div 
      data-modal="true"
      data-prevent-slide="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200 select-none modal-container"
    >
      
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/90 backdrop-blur-2xl modal-backdrop" 
      />

      {/* Modal Container */}
      <div 
        data-prevent-slide="true"
        onWheel={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0f0f13] border border-white/15 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto font-sans text-zinc-100"
      >
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span 
              className="text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider text-black"
              style={{ backgroundColor: project.accentColor || '#ffffff' }}
            >
              {project.category}
            </span>
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
              Demo Interactivo en Vivo
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Project Info Header */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE DEMO PLAYER CANVAS */}
        {/* ========================================================================= */}
        <div className="space-y-3">
          
          {/* Game Stats HUD */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-2">
            <div className="flex items-center gap-4">
              <span>SCORE: <strong className="text-white font-bold">{score.toLocaleString()}</strong></span>
              <span>COMBO: <strong className="text-cyan-400 font-bold">{combo}x</strong></span>
            </div>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> 60 FPS CanvasKit
            </span>
          </div>

          {/* Interactive Screen Box */}
          <div 
            onClick={handleAction}
            className="relative h-72 sm:h-80 rounded-2xl bg-zinc-900 border border-white/15 overflow-hidden cursor-pointer flex flex-col items-center justify-center p-6 group active:scale-99 transition-transform shadow-2xl"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-104 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/60 pointer-events-none" />

            {/* Interactive Player Neon Orb / Ship */}
            <div 
              className="absolute w-8 h-8 rounded-full shadow-[0_0_30px_#ffffff] flex items-center justify-center transition-all duration-150"
              style={{ 
                left: `${playerPosition}%`, 
                top: '48%',
                backgroundColor: project.accentColor || '#ffffff'
              }}
            >
              <Zap className="w-4 h-4 text-black fill-black" />
            </div>

            {/* Overlay Instructions */}
            {!isPlaying ? (
              <div className="relative z-10 text-center space-y-3">
                <span className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider block">
                  {project.title}
                </span>
                <p className="text-xs font-mono text-zinc-300 max-w-sm mx-auto">
                  Haz clic o pulsa [Espacio] para iniciar la simulación en tiempo real a 60 FPS
                </p>
                <button className="px-6 py-3 bg-white text-black font-mono font-extrabold text-xs rounded-xl shadow-xl flex items-center gap-2 mx-auto hover:bg-zinc-200 transition-colors cursor-pointer">
                  <Play className="w-4 h-4 fill-black" /> Iniciar Demo Jugable
                </button>
              </div>
            ) : (
              <div className="relative z-10 text-center space-y-1">
                <span className="text-base font-mono text-white font-black animate-bounce block">
                  ¡HAZ CLIC O USA LAS FLECHAS PARA MOVERTE!
                </span>
                <span className="text-xs font-mono text-zinc-300 block">
                  Combo Multiplier Activo ({combo}x)
                </span>
              </div>
            )}
          </div>

          {/* Quick Controls Bar under Player */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-1">
            <div className="flex items-center gap-2">
              <button 
                onClick={handleReset}
                className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reiniciar
              </button>
            </div>
            <span>Controles: Clic / Tap / Flechas [← →]</span>
          </div>

        </div>

        {/* Tech Tags & Project Stats */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Code2 className="w-4 h-4" /> <span>Ver Repositorio</span>
              </a>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono">
          <button
            onClick={() => setShowQR(!showQR)}
            className="text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>{showQR ? 'Ocultar QR' : 'Escanear Demo en Smartphone'}</span>
          </button>

          <a
            href={`https://wa.me/573000000000?text=Hola%20Samuel,%20quiero%20conversar%20sobre%20un%20proyecto%20similar%20a%20${encodeURIComponent(project.title)}`}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-white text-black font-bold flex items-center gap-1.5 hover:bg-zinc-200 transition-colors shadow-lg"
          >
            <span>Conversar sobre este Proyecto</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {showQR && (
          <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 flex items-center gap-4 animate-in fade-in duration-150">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-1 shrink-0">
              <QrCode className="w-12 h-12 text-black" />
            </div>
            <div className="text-xs font-mono text-zinc-400 leading-relaxed">
              Apunta la cámara de tu teléfono para abrir el demo interactivo directamente en tu pantalla móvil a 60 FPS.
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
