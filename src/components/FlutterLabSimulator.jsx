// src/components/FlutterLabSimulator.jsx
import { useState, useEffect } from 'react';
import { 
  Smartphone, Gamepad2, Download, QrCode, Play, 
  Flame, Zap, KeyRound, Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEngine';

export default function FlutterLabSimulator() {
  const [activeApp, setActiveApp] = useState('game');
  const [showQR, setShowQR] = useState(false);
  
  // Cyber Rush Mini-Game State
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [neonPosition, setNeonPosition] = useState(50);
  const highScore = 1438750;

  // CryptoVault State
  const [vaultUnlocked, setVaultUnlocked] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlayingGame) {
      interval = setInterval(() => {
        setScore(s => s + 25 * combo);
      }, 120);
    }
    return () => clearInterval(interval);
  }, [isPlayingGame, combo]);

  const handleGameAction = () => {
    sounds.playClick();
    if (!isPlayingGame) {
      setIsPlayingGame(true);
      setScore(0);
      setCombo(1);
      return;
    }
    setCombo(c => Math.min(8, c + 1));
    setScore(s => s + 250);
    setNeonPosition(Math.floor(Math.random() * 75) + 12);
    
    if (combo >= 4) {
      confetti({
        particleCount: 15,
        spread: 30,
        origin: { y: 0.6, x: 0.7 },
        colors: ['#FF0077', '#00F0FF', '#A855F7']
      });
    }
  };

  const toggleVault = () => {
    sounds.playClick();
    setVaultUnlocked(prev => !prev);
    if (!vaultUnlocked) {
      sounds.playSuccess();
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.6, x: 0.7 },
        colors: ['#A855F7', '#00F0FF', '#10B981']
      });
    }
  };

  const handleTabChange = (app) => {
    sounds.playClick();
    setActiveApp(app);
    setIsPlayingGame(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-white/10 bg-linear-to-b from-zinc-900/60 via-zinc-950/80 to-zinc-900/60 backdrop-blur-xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
      
      {/* Decorative Glows */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Columna Izquierda: Información & Selector */}
      <div className="lg:col-span-6 space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-mono">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Flutter 3.x • WebAssembly & CanvasKit 60-120 FPS</span>
        </div>

        <h3 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
          Laboratorio Interactivo de Flutter: <br />
          <span className="bg-clip-text text-transparent bg-linear-to-r from-pink-400 via-purple-300 to-cyan-400">
            Juegos 60 FPS & Apps Nativas
          </span>
        </h3>

        <p className="text-zinc-400 text-sm leading-relaxed font-sans">
          Nuestros desarrollos multiplataforma corren con aceleración por GPU y físicas vectoriales nativas en WebAssembly. Experimenta con el simulador en vivo o genera el código QR para descarga directa del paquete APK.
        </p>

        {/* Botones de Cambio de App */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleTabChange('game')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
              activeApp === 'game' 
                ? 'bg-pink-500 text-white font-bold shadow-[0_0_20px_rgba(236,72,153,0.4)] scale-102' 
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-white/10'
            }`}
            data-cursor="PLAY"
          >
            <Gamepad2 className="w-4 h-4" /> Cyber Rush (Juego 60 FPS)
          </button>
          
          <button
            onClick={() => handleTabChange('app')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
              activeApp === 'app' 
                ? 'bg-purple-500 text-white font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-102' 
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-white/10'
            }`}
            data-cursor="ENCLAVE"
          >
            <Smartphone className="w-4 h-4" /> CryptoVault (App Biometría)
          </button>
        </div>

        {/* Acciones de Descarga / QR */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
          <a
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            onClick={() => sounds.playClick()}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono flex items-center gap-2 border border-white/10 transition-all hover:border-cyan-500/40"
            data-cursor="DOWNLOAD"
          >
            <Download className="w-4 h-4 text-cyan-400" /> Descargar APK Compilado
          </a>

          <button
            onClick={() => { setShowQR(!showQR); sounds.playClick(); }}
            className="px-4 py-2.5 rounded-xl border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center gap-2 hover:bg-cyan-500/10 transition-all cursor-pointer"
            data-cursor="QR CODE"
          >
            <QrCode className="w-4 h-4" /> {showQR ? 'Ocultar QR' : 'Escanear con Smartphone'}
          </button>
        </div>

        {showQR && (
          <div className="p-4 rounded-2xl bg-zinc-950 border border-cyan-500/40 flex items-center gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-white rounded-xl p-1 flex flex-col items-center justify-center text-black font-mono text-[9px] font-bold text-center shrink-0 shadow-lg">
              <QrCode className="w-12 h-12 text-zinc-950" />
              <span>SCAN APK</span>
            </div>
            <div className="text-xs font-mono text-zinc-400">
              <span className="font-bold text-white block mb-1">Instalación Directa Android</span>
              Apunta la cámara de tu smartphone para descargar el paquete de instalación optimizado directamente desde el repositorio.
            </div>
          </div>
        )}
      </div>

      {/* Frame de Smartphone con simulador interactivo */}
      <div className="lg:col-span-6 flex justify-center relative z-10">
        <div className="relative w-72 sm:w-80 bg-zinc-900 rounded-[50px] p-3 shadow-[0_0_60px_rgba(236,72,153,0.25)] border-4 border-zinc-700/70">
          
          <div className="relative bg-zinc-950 rounded-[40px] overflow-hidden aspect-9/18.5 border border-white/10 flex flex-col justify-between p-4 pt-10">
            
            {/* Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full border border-white/10 flex items-center justify-between px-3 z-30 shadow-md">
              <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <div className="text-[8px] font-mono text-zinc-300">WASM Impeller</div>
            </div>

            {/* Top Bar inside simulator */}
            <div className="flex justify-between items-center text-[10px] font-mono text-pink-300 pt-1">
              <span>{activeApp === 'game' ? 'CYBER RUSH v2.0' : 'CRYPTO VAULT SECURE'}</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> 60 FPS
              </span>
            </div>

            {/* VISTA 1: Mini-Juego Cyber Rush */}
            {activeApp === 'game' ? (
              <div className="my-auto text-center space-y-3">
                
                {/* HUD de Juego */}
                <div className="p-3 rounded-2xl bg-zinc-900/90 border border-pink-500/30 font-mono text-xs shadow-md">
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span>SCORE: <strong className="text-pink-400">{score.toLocaleString()}</strong></span>
                    <span>COMBO: <strong className="text-cyan-400">{combo}x</strong></span>
                  </div>
                  <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-linear-to-r from-pink-500 via-purple-500 to-cyan-400 h-full transition-all duration-150"
                      style={{ width: `${Math.min(100, combo * 15)}%` }}
                    />
                  </div>
                </div>

                {/* Canvas de juego interactivo con artwork de fondo */}
                <div 
                  onClick={handleGameAction}
                  className="relative h-48 rounded-2xl border border-white/10 overflow-hidden cursor-pointer flex flex-col items-center justify-center p-4 select-none active:scale-98 transition-transform shadow-inner group"
                  data-cursor="TAP / DODGE"
                >
                  <img 
                    src="/assets/projects/cyber_rush.jpg" 
                    alt="Cyber Rush" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/60" />
                  
                  {/* Nave / Orbe Neón interactivo */}
                  <div 
                    className="absolute w-8 h-8 rounded-full bg-pink-500 shadow-[0_0_25px_#ff0077] flex items-center justify-center transition-all duration-150"
                    style={{ left: `${neonPosition}%`, top: '45%' }}
                  >
                    <Zap className="w-4 h-4 text-white fill-white" />
                  </div>

                  {!isPlayingGame ? (
                    <div className="relative z-10 space-y-2 text-center">
                      <div className="text-base font-black text-white tracking-wider uppercase bg-clip-text text-transparent bg-linear-to-r from-pink-400 via-purple-300 to-cyan-400">
                        NEON FLUTTER ENGINE
                      </div>
                      <p className="text-[10px] font-mono text-zinc-300">
                        Toca para iniciar el benchmark a 60 FPS
                      </p>
                      <button className="px-4 py-2 bg-pink-500 hover:bg-pink-400 text-white font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.5)] flex items-center gap-1.5 mx-auto transition-all">
                        <Play className="w-3.5 h-3.5 fill-white" /> Iniciar Prueba
                      </button>
                    </div>
                  ) : (
                    <div className="relative z-10 text-center space-y-1">
                      <div className="text-xs font-mono text-pink-300 font-bold animate-bounce">
                        ¡TOCA PARA ESQUIVAR!
                      </div>
                      <div className="text-[10px] font-mono text-cyan-300">
                        Combo Boost Activo ({combo}x)
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>Shader: Custom GLSL</span>
                  <span>Record: {highScore.toLocaleString()}</span>
                </div>
              </div>
            ) : (
              /* VISTA 2: CryptoVault App Simulator */
              <div className="my-auto space-y-3 text-left font-mono">
                <div className="p-4 rounded-2xl bg-linear-to-br from-purple-950/60 via-zinc-900 to-zinc-950 border border-purple-500/30 relative overflow-hidden shadow-lg">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-purple-400" /> Bóveda Criptográfica
                    </span>
                    <span className="text-emerald-400 text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      AES-256 GCM
                    </span>
                  </div>

                  <div className="text-xl font-bold text-white tracking-wider">
                    {vaultUnlocked ? '$145,780.32' : '••••  ••••  ••••'}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-400 pt-2 border-t border-white/5">
                    <span>Estado:</span>
                    <span className={vaultUnlocked ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                      {vaultUnlocked ? '✓ Enclave Desbloqueado' : 'Bloqueado (FIDO2)'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={toggleVault}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all cursor-pointer active:scale-95"
                  data-cursor="BIOMETRICS"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  {vaultUnlocked ? 'Bloquear Bóveda' : 'Simular Desbloqueo Biométrico'}
                </button>

                <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-white/5 text-[10px] text-zinc-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Sincronización Offline:</span>
                    <span className="text-cyan-400">Hive / Isar DB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Secure Storage:</span>
                    <span className="text-emerald-400">iOS Keychain / KeyStore</span>
                  </div>
                </div>
              </div>
            )}

            {/* iPhone Home Indicator */}
            <div className="w-24 h-1 bg-white/40 rounded-full mx-auto" />
          </div>
        </div>
      </div>

    </div>
  );
}