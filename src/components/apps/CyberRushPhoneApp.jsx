import { useState, useEffect } from 'react';
import { Play, RotateCcw, Zap } from 'lucide-react';

export default function CyberRushPhoneApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [playerX, setPlayerX] = useState(50);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setScore(s => s + 15 * combo);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, combo]);

  const handleTap = (e) => {
    e.stopPropagation();
    if (!isPlaying) {
      setIsPlaying(true);
      setScore(0);
      setCombo(1);
      return;
    }
    const newX = Math.floor(Math.random() * 70) + 15;
    setPlayerX(newX);
    setCombo(c => Math.min(10, c + 1));
    setScore(s => s + 150);
  };

  const handleRestart = (e) => {
    e.stopPropagation();
    setIsPlaying(false);
    setScore(0);
    setCombo(1);
    setPlayerX(50);
  };

  return (
    <div 
      onClick={handleTap}
      className="w-full h-full bg-[#080205] text-rose-50 font-mono flex flex-col justify-between p-3 select-none relative overflow-hidden cursor-pointer"
    >
      {/* Background Starfield Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.1)_0,transparent_70%)] pointer-events-none" />

      {/* Top HUD */}
      <div className="flex items-center justify-between text-[10px] z-10 border-b border-rose-500/20 pb-1 px-1 font-['JetBrains_Mono',monospace]">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-white tracking-widest">CYBER RUSH WASM</span>
          <span className="text-cyan-300 font-bold">120 FPS</span>
        </div>
        <div className="flex items-center gap-4">
          <span>SCORE: <strong className="text-white font-extrabold">{score}</strong></span>
          <span className="text-rose-400 font-extrabold">{combo}x COMBO</span>
        </div>
      </div>

      {/* Center Game Arena */}
      <div className="relative flex-1 flex items-center justify-center my-1">
        
        {/* Interactive Ship / Vector Node */}
        <div 
          className="absolute w-8 h-8 rounded-full bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.8)] flex items-center justify-center transition-all duration-150 transform -translate-x-1/2"
          style={{ left: `${playerX}%`, top: '45%' }}
        >
          <Zap className="w-4 h-4 text-white fill-white" />
        </div>

        {!isPlaying ? (
          <div className="text-center space-y-2 z-10 bg-black/60 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="text-sm font-bold text-white uppercase tracking-wider">
              MOTOR GRÁFICO IMPELLER WASM
            </div>
            <div className="text-[10px] text-zinc-400">
              Toca la pantalla para esquivar a 120 FPS
            </div>
            <button className="px-4 py-1.5 rounded-lg bg-rose-500 text-white font-bold text-[10px] flex items-center gap-1.5 mx-auto">
              <Play className="w-3 h-3 fill-white" /> JUGAR DEMO
            </button>
          </div>
        ) : (
          <div className="text-center z-10 pointer-events-none">
            <div className="text-[10px] text-cyan-300 font-bold animate-pulse">
              ¡TOCA PARA ESQUIVAR OBSTÁCULOS!
            </div>
          </div>
        )}

      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between text-[9px] text-zinc-400 z-10 border-t border-rose-500/20 pt-1 px-1">
        <span>GPU Pipeline Activo • 4.16ms</span>
        {isPlaying && (
          <button 
            onClick={handleRestart}
            className="hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reiniciar
          </button>
        )}
      </div>

    </div>
  );
}
