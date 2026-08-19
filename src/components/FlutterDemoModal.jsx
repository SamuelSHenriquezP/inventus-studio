// src/components/FlutterDemoModal.jsx
import { useState, useEffect } from 'react';
import { X, Play, QrCode, Zap, Smartphone, Gamepad2, Download } from 'lucide-react';

export default function FlutterDemoModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('game');
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [neonX, setNeonX] = useState(50);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setScore(s => s + 20 * combo);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, combo]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTap = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setScore(0);
      setCombo(1);
      return;
    }
    setCombo(c => Math.min(8, c + 1));
    setScore(s => s + 150);
    setNeonX(Math.floor(Math.random() * 70) + 15);
  };

  return (
    <div 
      data-modal="true"
      data-prevent-slide="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200 select-none modal-container"
    >
      <div onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-xl modal-backdrop" />

      <div 
        data-prevent-slide="true"
        onWheel={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl space-y-6"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-white uppercase tracking-wider">
              Flutter 3.x WebAssembly
            </span>
            <span className="text-xs font-mono text-zinc-400">60 FPS CanvasKit Engine</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 font-mono text-xs">
          <button
            onClick={() => { setActiveTab('game'); setIsPlaying(false); }}
            className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'game' 
                ? 'bg-white text-black font-bold border-white' 
                : 'bg-zinc-900/60 border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5 inline mr-1.5" /> Cyber Rush (Juego 60 FPS)
          </button>

          <button
            onClick={() => { setActiveTab('app'); setIsPlaying(false); }}
            className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'app' 
                ? 'bg-white text-black font-bold border-white' 
                : 'bg-zinc-900/60 border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 inline mr-1.5" /> Fortress (App Biometría)
          </button>
        </div>

        {/* Minimal Interactive Stage */}
        {activeTab === 'game' ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400 px-1">
              <span>SCORE: <strong className="text-white font-bold">{score.toLocaleString()}</strong></span>
              <span>COMBO: <strong className="text-white font-bold">{combo}x</strong></span>
              <span className="text-emerald-400">● 60 FPS DETERMINISTIC</span>
            </div>

            <div 
              onClick={handleTap}
              className="relative h-64 rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden cursor-pointer flex flex-col items-center justify-center p-6 group active:scale-99 transition-transform"
            >
              <img 
                src="/assets/projects/cyber_rush.jpg" 
                alt="Cyber Rush" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-103 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/60 pointer-events-none" />

              <div 
                className="absolute w-7 h-7 rounded-full bg-white shadow-[0_0_25px_#ffffff] flex items-center justify-center transition-all duration-150"
                style={{ left: `${neonX}%`, top: '45%' }}
              >
                <Zap className="w-3.5 h-3.5 text-black fill-black" />
              </div>

              {!isPlaying ? (
                <div className="relative z-10 text-center space-y-2">
                  <span className="text-lg font-extrabold text-white tracking-tight uppercase block">
                    FLUTTER WASM ENGINE
                  </span>
                  <p className="text-xs font-mono text-zinc-400">
                    Haz clic para iniciar el loop de físicas a 60 FPS
                  </p>
                  <button className="px-5 py-2.5 bg-white text-black font-mono font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 mx-auto hover:bg-zinc-200 transition-colors">
                    <Play className="w-3.5 h-3.5 fill-black" /> Iniciar Prueba
                  </button>
                </div>
              ) : (
                <div className="relative z-10 text-center space-y-1">
                  <span className="text-sm font-mono text-white font-bold animate-bounce block">
                    ¡TOCA PARA ESQUIVAR!
                  </span>
                  <span className="text-xs font-mono text-zinc-400 block">
                    Aceleración por GPU Activa
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between text-zinc-400">
              <span>ENCLAVE SEGURO:</span>
              <span className="text-emerald-400 font-bold">● AES-256 GCM</span>
            </div>
            <div className="p-4 rounded-xl bg-black border border-white/10 text-center space-y-1">
              <span className="text-zinc-500 text-[10px] uppercase">Balance Simulado</span>
              <span className="text-2xl font-bold text-white font-mono block">$145,780.32</span>
            </div>
            <div className="text-[11px] text-zinc-400 leading-relaxed">
              Integración nativa con iOS Keychain y Android KeyStore mediante FFI en Rust. Arquitectura reactiva con persistencia offline sub-segundo.
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono">
          <button
            onClick={() => setShowQR(!showQR)}
            className="text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>{showQR ? 'Ocultar QR' : 'Escanear APK en Móvil'}</span>
          </button>

          <a
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-white text-black font-bold flex items-center gap-1.5 hover:bg-zinc-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Descargar APK
          </a>
        </div>

        {showQR && (
          <div className="p-4 rounded-2xl bg-black border border-white/10 flex items-center gap-4 animate-in fade-in duration-150">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-1 shrink-0">
              <QrCode className="w-12 h-12 text-black" />
            </div>
            <div className="text-xs font-mono text-zinc-400 leading-relaxed">
              Apunta la cámara de tu smartphone para descargar el paquete de instalación optimizado directamente a tu dispositivo.
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
