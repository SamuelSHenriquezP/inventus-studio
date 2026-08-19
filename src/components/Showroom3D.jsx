import { useState } from 'react';
import { 
  Laptop, Smartphone, RefreshCw, Radio, Sparkles, 
  CheckCircle2
} from 'lucide-react';
import ThreeLaptop3D from './ThreeLaptop3D';
import ThreePhone3D from './ThreePhone3D';
import { sounds } from '../utils/soundEngine';

export default function Showroom3D() {
  const [activeModel, setActiveModel] = useState('laptop');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncCount, setSyncCount] = useState(1482);
  const [phoneApp, setPhoneApp] = useState('game');

  const triggerLiveSync = () => {
    if (isSyncing) return;
    sounds.playClick();
    setIsSyncing(true);

    setTimeout(() => {
      sounds.playSuccess();
      setSyncCount(prev => prev + 1);
      setIsSyncing(false);

      import('canvas-confetti').then((module) => {
        const confetti = module.default;
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#00F0FF', '#FF0077', '#A855F7']
        });
      }).catch(() => {});
    }, 600);
  };

  return (
    <section id="flagship" className="py-28 px-6 max-w-7xl mx-auto select-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>Showroom Interactivo 3D • Modelos en Tiempo Real</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Laboratorio de Dispositivos 3D
          </h2>
        </div>

        {/* Model Switcher Controls */}
        <div className="flex items-center gap-2 font-mono text-xs p-1.5 rounded-2xl bg-zinc-900 border border-white/10">
          <button
            onClick={() => { setActiveModel('laptop'); sounds.playClick(); }}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeModel === 'laptop'
                ? 'bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Laptop className="w-4 h-4" /> MacBook Pro 3D
          </button>

          <button
            onClick={() => { setActiveModel('phone'); sounds.playClick(); }}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeModel === 'phone'
                ? 'bg-pink-500 text-white font-bold shadow-[0_0_20px_rgba(236,72,153,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" /> Smartphone 3D
          </button>
        </div>
      </div>

      {/* Main 3D Stage Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-white/15 bg-linear-to-b from-zinc-900/90 via-zinc-950/95 to-black p-6 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Background Ambience */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Left Column: 3D Canvas Stage (7 cols) */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center">
          
          <div className="w-full relative">
            {activeModel === 'laptop' ? (
              <ThreeLaptop3D isSyncing={isSyncing} />
            ) : (
              <ThreePhone3D 
                texturePath={phoneApp === 'game' ? '/assets/projects/cyber_rush.jpg' : '/assets/projects/cryptovault.jpg'} 
                isGlowing={isSyncing}
              />
            )}
          </div>

          {/* 3D Interaction Tip */}
          <div className="mt-2 flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-[11px] font-mono text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Arrastra con el ratón para rotar el modelo en 360°</span>
          </div>

        </div>

        {/* Right Column: Live Telemetry & Control Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6 relative z-10">
          
          {activeModel === 'laptop' ? (
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                Arquitectura de Misión Crítica
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Ecosistema Cloud & Telemetría Distribuida
              </h3>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Renderizado WebGL en tiempo real con conexión WebSocket duplex. La consola central procesa más de 1.4 GB/s con balanceo de carga global.
              </p>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                  <span className="text-zinc-500 text-[10px] uppercase block">Throughput</span>
                  <span className="text-base font-bold text-cyan-300 mt-0.5 block">1.4 GB/s</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                  <span className="text-zinc-500 text-[10px] uppercase block">Eventos Sync</span>
                  <span className="text-base font-bold text-white mt-0.5 block">{syncCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-pink-400 font-bold block">
                Motor Flutter 3.x Multiplataforma
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {phoneApp === 'game' ? 'Cyber Rush: Arcade a 60 FPS' : 'Fortress: Enclave Biométrico'}
              </h3>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Desarrollos nativos compilados con aceleración por hardware. Puedes alternar la pantalla proyectada en el modelo 3D en tiempo real:
              </p>

              <div className="flex gap-2 font-mono text-xs pt-2">
                <button
                  onClick={() => { setPhoneApp('game'); sounds.playClick(); }}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    phoneApp === 'game' ? 'bg-pink-500/20 border-pink-400 text-pink-300 font-bold' : 'bg-zinc-900 text-zinc-400 border-white/10'
                  }`}
                >
                  Juego Cyber Rush
                </button>
                <button
                  onClick={() => { setPhoneApp('vault'); sounds.playClick(); }}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    phoneApp === 'vault' ? 'bg-purple-500/20 border-purple-400 text-purple-300 font-bold' : 'bg-zinc-900 text-zinc-400 border-white/10'
                  }`}
                >
                  App CryptoVault
                </button>
              </div>
            </div>
          )}

          {/* Real-time Sync Action Button */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={triggerLiveSync}
              disabled={isSyncing}
              className="w-full py-4 rounded-2xl bg-linear-to-r from-cyan-400 via-sky-400 to-purple-500 text-black font-mono font-extrabold text-xs flex items-center justify-center gap-2 shadow-[0_0_35px_rgba(0,240,255,0.4)] hover:scale-102 active:scale-98 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Transmitiendo Paquete...' : 'Disparar Sincronización en Vivo'}</span>
            </button>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> WebSockets Activos
              </span>
              <span>Latencia: &lt;38ms</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
