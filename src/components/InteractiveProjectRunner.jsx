// src/components/InteractiveProjectRunner.jsx
import { useState, useEffect, useCallback } from 'react';
import { 
  X, Play, QrCode, Zap, 
  Code2, RotateCcw, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEngine';

export default function InteractiveProjectRunner({ project, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [playerX, setPlayerX] = useState(50);
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
    setScore(s => s + 250);
    setPlayerX(Math.floor(Math.random() * 70) + 15);

    if (combo >= 3) {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.6 },
        colors: [project?.accent || '#ffffff', '#ffffff', '#71717a']
      });
    }
  }, [isPlaying, combo, project]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (isPlaying) {
        if (e.key === 'ArrowLeft') setPlayerX(p => Math.max(15, p - 10));
        if (e.key === 'ArrowRight') setPlayerX(p => Math.min(85, p + 10));
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

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setScore(s => s + 20 * combo);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200 select-none">
      
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/90 backdrop-blur-2xl" 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#0f0f13] border border-white/15 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto font-sans text-zinc-100">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/10 text-white uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
              Demo Interactivo • 60 FPS
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Project Info */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE DEMO CANVAS */}
        {/* ========================================================================= */}
        <div className="space-y-3">
          
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-2">
            <div className="flex items-center gap-4">
              <span>SCORE: <strong className="text-white font-bold">{score.toLocaleString()}</strong></span>
              <span>COMBO: <strong className="text-white font-bold">{combo}x</strong></span>
            </div>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Motor en Vivo
            </span>
          </div>

          {/* Interactive Player Box */}
          <div 
            onClick={handleAction}
            className="relative h-72 sm:h-80 rounded-2xl bg-zinc-950 border border-white/15 overflow-hidden cursor-pointer flex flex-col items-center justify-center p-6 group active:scale-99 transition-transform shadow-2xl"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-104 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/60 pointer-events-none" />

            {/* Interactive Vector Player */}
            <div 
              className="absolute w-8 h-8 rounded-full bg-white shadow-[0_0_25px_rgba(255,255,255,0.8)] flex items-center justify-center transition-all duration-150"
              style={{ left: `${playerX}%`, top: '48%' }}
            >
              <Zap className="w-4 h-4 text-black fill-black" />
            </div>

            {/* Overlay Start Screen */}
            {!isPlaying ? (
              <div className="relative z-10 text-center space-y-3">
                <span className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-wider block uppercase">
                  {project.title}
                </span>
                <p className="text-xs font-mono text-zinc-300 max-w-sm mx-auto">
                  Haz clic o pulsa [Espacio] para iniciar la simulación interactiva
                </p>
                <button className="px-6 py-3 bg-white text-black font-mono font-extrabold text-xs rounded-xl shadow-xl flex items-center gap-2 mx-auto hover:bg-zinc-200 transition-colors cursor-pointer">
                  <Play className="w-4 h-4 fill-black" /> Iniciar Prueba
                </button>
              </div>
            ) : (
              <div className="relative z-10 text-center space-y-1">
                <span className="text-sm font-mono text-white font-bold animate-bounce block">
                  ¡HAZ CLIC O USA LAS FLECHAS [← →] PARA ESQUIVAR!
                </span>
                <span className="text-xs font-mono text-zinc-300 block">
                  Combo Multiplier Activo ({combo}x)
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-1">
            <button 
              onClick={handleReset}
              className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reiniciar
            </button>
            <span>Controles: Clic / Tap / Flechas [← →] / Espacio</span>
          </div>

        </div>

        {/* Tech Stack Chips */}
        <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-white/10 text-zinc-300">
                {t}
              </span>
            ))}
          </div>

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

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono">
          <button
            onClick={() => setShowQR(!showQR)}
            className="text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>{showQR ? 'Ocultar QR' : 'Escanear en Móvil'}</span>
          </button>

          <a
            href={`https://wa.me/573000000000?text=Hola%20Samuel,%20quiero%20cotizar%20un%20proyecto%20similar%20a%20${encodeURIComponent(project.title)}`}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-white text-black font-bold flex items-center gap-2 hover:bg-zinc-200 transition-colors shadow-lg"
          >
            <span>Conversar por WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {showQR && (
          <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 flex items-center gap-4 animate-in fade-in duration-150">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-1 shrink-0">
              <QrCode className="w-12 h-12 text-black" />
            </div>
            <div className="text-xs font-mono text-zinc-400 leading-relaxed">
              Apunta la cámara de tu teléfono para probar este demo directamente en tu pantalla móvil a 60 FPS.
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
