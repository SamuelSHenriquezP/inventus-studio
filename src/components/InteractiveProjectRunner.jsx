// src/components/InteractiveProjectRunner.jsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  X, Play, QrCode, Zap, 
  Code2, RotateCcw, ArrowRight, ArrowLeft, ArrowUp,
  CheckCircle2, Compass, Shield, Radio, DollarSign,
  Plus, Minus, TrendingUp, Sliders, RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEngine';
import { personalInfo } from '../Data/projectsData';

export default function InteractiveProjectRunner({ project, onClose }) {
  const [showQR, setShowQR] = useState(false);

  // LoveCost State
  const [income, setIncome] = useState(3800);
  const [fixedCosts, setFixedCosts] = useState(1450);
  const [extraExpenses, setExtraExpenses] = useState(420);
  
  // ServiIntel State
  const [fleetNodes, setFleetNodes] = useState([
    { id: 'OP-101', name: 'Carlos Mendoza', status: 'En Ruta', battery: '92%', lat: '4.6097', lng: '-74.0817' },
    { id: 'OP-102', name: 'Laura Gómez', status: 'En Servicio', battery: '85%', lat: '4.6534', lng: '-74.0543' },
    { id: 'OP-103', name: 'Andrés Silva', status: 'Disponible', battery: '98%', lat: '4.7110', lng: '-74.0721' }
  ]);
  const [activeTicketStatus, setActiveTicketStatus] = useState('En Espera');
  const [isDispatching, setIsDispatching] = useState(false);

  // Days State
  const [taskIndex, setTaskIndex] = useState(0);
  const [sortedCounts, setSortedCounts] = useState({ menu: 4, estantes: 2, radar: 5 });
  const tasksToSwipe = [
    { title: "Definir arquitectura Isar DB offline-first", tag: "⚡ Alta Energía", time: "45m" },
    { title: "Optimizar Shaders GLSL a SPIR-V para Impeller", tag: "🎯 Foco Profundo", time: "1h 30m" },
    { title: "Configurar canal WebSocket bidireccional", tag: "🚀 Backend", time: "30m" },
    { title: "Validar reglas de seguridad RBAC Firestore", tag: "🔒 Seguridad", time: "50m" },
    { title: "Crear widget de Android Home Screen con Glance", tag: "🌿 Zen Flow", time: "40m" }
  ];

  // Cyber Rush State
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameCombo, setGameCombo] = useState(1);
  const [playerX, setPlayerX] = useState(50);
  const [highScore, setHighScore] = useState(3450);

  // Nexus 3D Controls
  const [noiseDistort, setNoiseDistort] = useState(1.0);
  const [isWireframe, setIsWireframe] = useState(false);
  const [glowSpeed, setGlowSpeed] = useState(1.2);

  // Keyboard close & game controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (isPlayingGame) {
        if (e.key === 'ArrowLeft') setPlayerX(p => Math.max(12, p - 8));
        if (e.key === 'ArrowRight') setPlayerX(p => Math.min(88, p + 8));
        if (e.key === ' ') handleCyberDodge();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isPlayingGame, onClose]);

  // Cyber Rush timer loop
  useEffect(() => {
    let interval;
    if (isPlayingGame) {
      interval = setInterval(() => {
        setGameScore(s => s + 25 * gameCombo);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlayingGame, gameCombo]);

  const handleCyberDodge = () => {
    sounds.playClick();
    if (!isPlayingGame) {
      setIsPlayingGame(true);
      setGameScore(0);
      setGameCombo(1);
      return;
    }
    setGameCombo(c => Math.min(8, c + 1));
    setGameScore(s => s + 300);
    setPlayerX(Math.floor(Math.random() * 70) + 15);

    if (gameCombo >= 3) {
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.6 },
        colors: [project?.accent || '#f43f5e', '#ffffff', '#00f0ff']
      });
    }
  };

  const handleDaysSwipe = (bucket) => {
    sounds.playClick();
    setSortedCounts(prev => ({ ...prev, [bucket]: prev[bucket] + 1 }));
    setTaskIndex(prev => (prev + 1) % tasksToSwipe.length);
    sounds.playSuccess();
    confetti({
      particleCount: 15,
      spread: 30,
      origin: { y: 0.6 },
      colors: ['#8B9A86', '#FAF8F5', '#ffffff']
    });
  };

  const handleDispatchOrder = () => {
    if (isDispatching) return;
    sounds.playClick();
    setIsDispatching(true);
    setActiveTicketStatus('Despachando vía WebSocket...');
    setTimeout(() => {
      sounds.playSuccess();
      setIsDispatching(false);
      setActiveTicketStatus('Asignado a OP-103 (GPS En Ruta)');
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#0284c7', '#ffffff']
      });
    }, 700);
  };

  const handleLoveCostAdd = (val) => {
    sounds.playClick();
    setExtraExpenses(prev => Math.max(0, prev + val));
    sounds.playSuccess();
    if (val < 0) {
      confetti({
        particleCount: 20,
        spread: 35,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#ffffff']
      });
    }
  };

  if (!project) return null;

  const loveCostDisponible = income - fixedCosts - extraExpenses;

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
            <span 
              className="text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider"
              style={{
                backgroundColor: `${project.accent}20`,
                color: project.accent,
                border: `1px solid ${project.accent}40`
              }}
            >
              {project.badge}
            </span>
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
              Simulador Interactivo en Vivo
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
        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            {project.description}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* BESPOKE INTERACTIVE WORKBENCH PER PROJECT */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          
          {/* 1. LOVECOST BUDGET ENGINE */}
          {project.id === 'lovecost-nido' && (
            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-5">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> MOTOR DE DISPONIBLE REAL
                </span>
                <span className="text-xs font-mono text-zinc-400">Offline Isar DB &lt;1.2ms</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs text-center">
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/5">
                  <span className="text-zinc-500 text-[10px] block">INGRESOS DEL MES</span>
                  <span className="text-base font-bold text-white">${income.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/5">
                  <span className="text-zinc-500 text-[10px] block">GASTOS FIJOS</span>
                  <span className="text-base font-bold text-zinc-300">${fixedCosts.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-900/30 border border-emerald-500/40">
                  <span className="text-emerald-400 text-[10px] block font-bold">DISPONIBLE REAL</span>
                  <span className="text-xl font-extrabold text-emerald-300">${loveCostDisponible.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs">
                <button
                  onClick={() => handleLoveCostAdd(50)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-rose-300 font-bold flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Registrar Gasto ($50)
                </button>
                <button
                  onClick={() => handleLoveCostAdd(-200)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-md"
                >
                  <Minus className="w-3.5 h-3.5" /> Registrar Ingreso Extra ($200)
                </button>
              </div>
            </div>
          )}

          {/* 2. SERVIINTEL DISPATCH WORKSPACE */}
          {project.id === 'serviintel-ops' && (
            <div className="p-6 rounded-2xl bg-sky-950/20 border border-sky-500/30 space-y-5">
              <div className="flex items-center justify-between border-b border-sky-500/20 pb-3">
                <span className="text-xs font-mono text-sky-400 font-bold flex items-center gap-2">
                  <Radio className="w-4 h-4 animate-pulse" /> CENTRO DE COMANDO & FLOTA GPS
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">99.98% SLA Conectado</span>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-mono text-zinc-400">Operarios en Terreno (Live Telemetry):</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                  {fleetNodes.map((node) => (
                    <div key={node.id} className="p-3 rounded-xl bg-zinc-950/80 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-sky-400 font-bold">{node.id}</span>
                        <span className="text-zinc-500">Bat: {node.battery}</span>
                      </div>
                      <div className="font-bold text-white text-xs truncate">{node.name}</div>
                      <div className="text-[10px] text-emerald-400">● {node.status}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-sky-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 block">ESTADO DE ORDEN ACTIVA:</span>
                  <span className="text-white font-bold">{activeTicketStatus}</span>
                </div>
                <button
                  onClick={handleDispatchOrder}
                  disabled={isDispatching}
                  className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold flex items-center gap-2 cursor-pointer active:scale-95 transition-all shadow-md"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isDispatching ? 'animate-spin' : ''}`} />
                  <span>{isDispatching ? 'Despachando...' : 'Despachar Orden Urgente'}</span>
                </button>
              </div>
            </div>
          )}

          {/* 3. DAYS ZEN SWIPE ENGINE */}
          {project.id === 'days-focus-flow' && (
            <div className="p-6 rounded-2xl bg-[#17221b] border border-[#8B9A86]/40 space-y-5">
              <div className="flex items-center justify-between border-b border-[#8B9A86]/20 pb-3">
                <span className="text-xs font-mono text-[#8B9A86] font-bold flex items-center gap-2">
                  <Compass className="w-4 h-4" /> CLASIFICADOR DE TAREAS ZEN SWIPE
                </span>
                <span className="text-xs font-mono text-zinc-400">Sin formularios estáticos</span>
              </div>

              {/* Active Card */}
              <div className="p-5 rounded-2xl bg-[#0f1712] border border-[#8B9A86]/30 text-center space-y-2 shadow-inner font-mono">
                <div className="flex justify-between text-[11px] text-[#8B9A86]">
                  <span>{tasksToSwipe[taskIndex].tag}</span>
                  <span>{tasksToSwipe[taskIndex].time}</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#FAF8F5] leading-snug">
                  "{tasksToSwipe[taskIndex].title}"
                </h4>
                <div className="text-[10px] text-zinc-400 pt-1">
                  Arrastra o selecciona un espacio para clasificar instantáneamente
                </div>
              </div>

              {/* Buckets Count & Actions */}
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <button
                  onClick={() => handleDaysSwipe('radar')}
                  className="p-3 rounded-xl bg-[#233329] hover:bg-[#2e4336] text-[#FAF8F5] font-bold flex flex-col items-center gap-1 cursor-pointer transition-all border border-[#8B9A86]/20 active:scale-95"
                >
                  <span className="text-[10px] text-[#8B9A86]">← MI RADAR</span>
                  <span className="text-sm font-black">{sortedCounts.radar} tareas</span>
                </button>
                <button
                  onClick={() => handleDaysSwipe('estantes')}
                  className="p-3 rounded-xl bg-[#233329] hover:bg-[#2e4336] text-[#FAF8F5] font-bold flex flex-col items-center gap-1 cursor-pointer transition-all border border-[#8B9A86]/20 active:scale-95"
                >
                  <span className="text-[10px] text-[#8B9A86]">↑ LOS ESTANTES</span>
                  <span className="text-sm font-black">{sortedCounts.estantes} tareas</span>
                </button>
                <button
                  onClick={() => handleDaysSwipe('menu')}
                  className="p-3 rounded-xl bg-[#8B9A86] hover:bg-[#9cb097] text-black font-bold flex flex-col items-center gap-1 cursor-pointer transition-all shadow-md active:scale-95"
                >
                  <span className="text-[10px] text-zinc-900 font-extrabold">EL MENÚ →</span>
                  <span className="text-sm font-black">{sortedCounts.menu} tareas</span>
                </button>
              </div>
            </div>
          )}

          {/* 4. CYBER RUSH ARCADE GAME */}
          {project.id === 'cyber-rush' && (
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-rose-300">
                <div className="flex items-center gap-4">
                  <span>SCORE: <strong className="text-white font-bold">{gameScore.toLocaleString()}</strong></span>
                  <span>COMBO: <strong className="text-cyan-400 font-bold">{gameCombo}x</strong></span>
                </div>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> WASM CanvasKit 120 FPS
                </span>
              </div>

              {/* Interactive Player Canvas */}
              <div 
                onClick={handleCyberDodge}
                className="relative h-64 rounded-2xl bg-black border border-rose-500/30 overflow-hidden cursor-pointer flex flex-col items-center justify-center p-6 group active:scale-99 transition-transform shadow-2xl"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-104 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/60 pointer-events-none" />

                {/* Laser Ship */}
                <div 
                  className="absolute w-8 h-8 rounded-full bg-rose-500 shadow-[0_0_25px_#f43f5e] flex items-center justify-center transition-all duration-150"
                  style={{ left: `${playerX}%`, top: '50%' }}
                >
                  <Zap className="w-4 h-4 text-white fill-white" />
                </div>

                {!isPlayingGame ? (
                  <div className="relative z-10 text-center space-y-3">
                    <span className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-wider block uppercase">
                      {project.title}
                    </span>
                    <p className="text-xs font-mono text-zinc-300 max-w-sm mx-auto">
                      Haz clic o pulsa [Espacio] para iniciar el motor arcade a 120 FPS
                    </p>
                    <button className="px-6 py-3 bg-white text-black font-mono font-extrabold text-xs rounded-xl shadow-xl flex items-center gap-2 mx-auto hover:bg-zinc-200 transition-colors cursor-pointer">
                      <Play className="w-4 h-4 fill-black" /> Iniciar Carrera
                    </button>
                  </div>
                ) : (
                  <div className="relative z-10 text-center space-y-1">
                    <span className="text-sm font-mono text-white font-bold animate-bounce block">
                      ¡HAZ CLIC O USA LAS FLECHAS [← →] PARA ESQUIVAR!
                    </span>
                    <span className="text-xs font-mono text-rose-300 block">
                      Combo Multiplier ({gameCombo}x) Activo
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 5. NEXUS 3D SCULPTURE STUDIO */}
          {project.id === 'nexus-experience' && (
            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-5">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-2">
                  <Sliders className="w-4 h-4" /> PARÁMETROS DE SHADER PROCEDURAL
                </span>
                <span className="text-xs font-mono text-zinc-400">Three.js WebGL 2.0</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/5 space-y-2">
                  <span className="text-zinc-500 text-[10px] block">DISTORSIÓN GPU: {noiseDistort}x</span>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="2.5" 
                    step="0.1"
                    value={noiseDistort}
                    onChange={(e) => setNoiseDistort(parseFloat(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/5 space-y-2">
                  <span className="text-zinc-500 text-[10px] block">VELOCIDAD ROTACIÓN: {glowSpeed}x</span>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="3.0" 
                    step="0.2"
                    value={glowSpeed}
                    onChange={(e) => setGlowSpeed(parseFloat(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/5 flex flex-col justify-between">
                  <span className="text-zinc-500 text-[10px] block">MODO MALLA:</span>
                  <button 
                    onClick={() => { sounds.playClick(); setIsWireframe(!isWireframe); }}
                    className="py-1.5 px-3 rounded-lg bg-emerald-500 text-black font-bold text-[11px] cursor-pointer"
                  >
                    {isWireframe ? 'Malla Sólida' : 'Wireframe 3D'}
                  </button>
                </div>
              </div>
            </div>
          )}

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
              onClick={() => sounds.playClick()}
              className="text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Code2 className="w-4 h-4" /> <span>Ver Repositorio</span>
            </a>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono">
          <button
            onClick={() => { sounds.playClick(); setShowQR(!showQR); }}
            className="text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>{showQR ? 'Ocultar QR' : 'Escanear en Móvil'}</span>
          </button>

          <a
            href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20cotizar%20un%20proyecto%20similar%20a%20${encodeURIComponent(project.title)}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => sounds.playClick()}
            className="px-6 py-3 rounded-full bg-white text-black font-bold flex items-center gap-2 hover:bg-zinc-200 transition-colors shadow-lg active:scale-95"
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
