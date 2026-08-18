// src/components/ProjectEstimator.jsx
import { useState } from 'react';
import { 
  Calculator, MessageSquare, Check, 
  Smartphone, Globe, Gamepad2, Server, ArrowRight,
  Shield, Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEngine';

export default function ProjectEstimator() {
  const [projectType, setProjectType] = useState('enterprise');
  const [selectedFeatures, setSelectedFeatures] = useState([
    'realtime', 'auth', 'admin_panel'
  ]);
  const [timeline, setTimeline] = useState('standard');

  const projectTypes = [
    {
      id: 'enterprise',
      title: 'Plataforma Web B2B / SaaS',
      desc: 'Portal corporativo, dashboard y APIs de misión crítica.',
      icon: <Server className="w-5 h-5 text-cyan-400" />,
      baseWeeks: 6
    },
    {
      id: 'flutter_app',
      title: 'App Móvil en Flutter (iOS + Android)',
      desc: 'Experiencia nativa a 60 FPS con un solo código base.',
      icon: <Smartphone className="w-5 h-5 text-purple-400" />,
      baseWeeks: 5
    },
    {
      id: 'game_3d',
      title: 'Videojuego 3D / Experiencia WebGL',
      desc: 'Físicas interactivas, shaders personalizados y WebAssembly.',
      icon: <Gamepad2 className="w-5 h-5 text-pink-400" />,
      baseWeeks: 7
    },
    {
      id: 'custom_web',
      title: 'Sitio Web 3D de Alta Conversión',
      desc: 'Diseño Awwwards-level con micro-animaciones cinematográficas.',
      icon: <Globe className="w-5 h-5 text-emerald-400" />,
      baseWeeks: 3
    }
  ];

  const features = [
    { id: 'realtime', label: 'WebSockets & Sync en Tiempo Real (<85ms)', category: 'Backend' },
    { id: 'auth', label: 'Autenticación Biométrica / OAuth / JWT Seguro', category: 'Seguridad' },
    { id: 'admin_panel', label: 'Panel de Administración & Métricas en Vivo', category: 'UI' },
    { id: 'payment', label: 'Pasarela de Pagos Stripe / Crypto Gateway', category: 'Fintech' },
    { id: 'offline_sync', label: 'Sincronización Offline & Base de Datos Local', category: 'Mobile' },
    { id: 'three_d', label: 'Modelos 3D Interactivos & Shaders WebGL', category: '3D' }
  ];

  const toggleFeature = (id) => {
    sounds.playClick();
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const calculateEstimate = () => {
    const typeObj = projectTypes.find(p => p.id === projectType);
    let weeks = (typeObj?.baseWeeks || 4) + Math.ceil(selectedFeatures.length * 0.8);
    if (timeline === 'urgent') weeks = Math.max(3, Math.round(weeks * 0.7));
    return weeks;
  };

  const handleLaunchProposal = () => {
    sounds.playSuccess();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#00F0FF', '#A855F7', '#10B981']
    });

    const chosenType = projectTypes.find(p => p.id === projectType)?.title;
    const chosenFeatures = features
      .filter(f => selectedFeatures.includes(f.id))
      .map(f => `• ${f.label}`)
      .join('%0A');

    const msg = `¡Hola Inventus Tech Studio! Me gustaría cotizar un proyecto:%0A%0A*Tipo de Proyecto:* ${chosenType}%0A*Tiempo estimado:* ~${calculateEstimate()} semanas (${timeline === 'urgent' ? 'Modo Sprint Rápido' : 'Desarrollo Estándar'})%0A%0A*Módulos requeridos:*%0A${chosenFeatures}%0A%0A¿Podemos agendar una llamada técnica de 15 minutos?`;

    window.open(`https://wa.me/573000000000?text=${msg}`, '_blank');
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-linear-to-b from-zinc-900/80 via-zinc-950/95 to-black p-6 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      
      {/* Background Neon Lighting */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Calculator className="w-3.5 h-3.5 text-cyan-400" />
          <span>Configurador de Arquitectura & Alcance B2B</span>
        </div>
        <h3 className="text-2xl md:text-4xl font-extrabold text-white">
          Calcula el Alcance de tu Proyecto
        </h3>
        <p className="text-zinc-400 text-xs md:text-sm mt-2 font-sans">
          Selecciona tus requerimientos técnicos y obtén una estimación de tiempos y arquitectura recomendada al instante.
        </p>
      </div>

      {/* Grid: Configurator Controls + Live Architecture Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Form: Options (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* 1. Tipo de Proyecto */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold block mb-3">
              1. Selecciona la Plataforma Principal:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projectTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => { setProjectType(type.id); sounds.playClick(); }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                    projectType === type.id
                      ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                      : 'bg-zinc-900/50 border-white/10 hover:border-white/20 hover:bg-zinc-900'
                  }`}
                  data-cursor="SELECT"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-zinc-950 border border-white/5">
                      {type.icon}
                    </div>
                    {projectType === type.id && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{type.title}</h4>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed font-sans">{type.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Módulos Técnicos */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold block mb-3">
              2. Módulos & Capacidades Requeridas:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {features.map((feat) => {
                const isSelected = selectedFeatures.includes(feat.id);
                return (
                  <div
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer select-none flex items-center gap-3 ${
                      isSelected
                        ? 'bg-purple-950/40 border-purple-400/80 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                        : 'bg-zinc-900/40 border-white/5 hover:border-white/15'
                    }`}
                    data-cursor="TOGGLE"
                  >
                    <div className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                      isSelected ? 'bg-purple-500 border-purple-400 text-white' : 'border-zinc-700 bg-zinc-950'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-xs text-zinc-200 font-medium block truncate">
                        {feat.label}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-500 uppercase">{feat.category}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Plazo de Entrega */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold block mb-3">
              3. Ritmo de Entrega:
            </label>
            <div className="grid grid-cols-2 gap-3 font-mono">
              <button
                onClick={() => { setTimeline('standard'); sounds.playClick(); }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  timeline === 'standard'
                    ? 'bg-zinc-800 border-cyan-400 text-white'
                    : 'bg-zinc-900/40 border-white/10 text-zinc-400 hover:text-white'
                }`}
                data-cursor="TIMELINE"
              >
                <span className="text-xs font-bold block">Desarrollo Estándar</span>
                <span className="text-[10px] text-zinc-400">Iteraciones continuas</span>
              </button>

              <button
                onClick={() => { setTimeline('urgent'); sounds.playClick(); }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  timeline === 'urgent'
                    ? 'bg-linear-to-r from-amber-500/20 to-orange-500/20 border-amber-400 text-amber-200'
                    : 'bg-zinc-900/40 border-white/10 text-zinc-400 hover:text-white'
                }`}
                data-cursor="SPRINT"
              >
                <span className="text-xs font-bold block flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Sprint Rápido
                </span>
                <span className="text-[10px] text-zinc-400">Prioridad absoluta</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Summary Card: Realtime Output (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-zinc-950 border border-white/10 shadow-2xl flex flex-col justify-between space-y-6">
          
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Resumen de Especificación
              </span>
              <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                100% Personalizado
              </span>
            </div>

            <div className="space-y-4 my-6 font-mono text-xs">
              <div className="flex justify-between items-center text-zinc-300">
                <span className="text-zinc-500">Plataforma:</span>
                <span className="font-bold text-white text-right">
                  {projectTypes.find(p => p.id === projectType)?.title}
                </span>
              </div>

              <div className="flex justify-between items-center text-zinc-300">
                <span className="text-zinc-500">Módulos seleccionados:</span>
                <span className="font-bold text-purple-300">
                  {selectedFeatures.length} activos
                </span>
              </div>

              <div className="flex justify-between items-center text-zinc-300">
                <span className="text-zinc-500">Tiempo estimado:</span>
                <span className="font-bold text-cyan-300 text-sm">
                  ~{calculateEstimate()} Semanas
                </span>
              </div>

              <div className="flex justify-between items-center text-zinc-300">
                <span className="text-zinc-500">Garantía Inventus:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> SLA & Código 100% Tuyo
                </span>
              </div>
            </div>

            {/* Architecture Stack Badge Preview */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                Arquitectura Sugerida:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {projectType === 'flutter_app' && (
                  <>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">Flutter 3.x</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">Riverpod/Bloc</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">Clean Arch</span>
                  </>
                )}
                {projectType === 'enterprise' && (
                  <>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">React 19 / Next</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">WebSockets</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">PostgreSQL</span>
                  </>
                )}
                {projectType === 'game_3d' && (
                  <>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20">Three.js / WebGL</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">Flame WASM</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">GPU Shaders</span>
                  </>
                )}
                {projectType === 'custom_web' && (
                  <>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">React + Vite</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">Tailwind v4</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">Lenis Smooth</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action CTA Button */}
          <button
            onClick={handleLaunchProposal}
            className="w-full py-4 rounded-2xl bg-linear-to-r from-cyan-400 via-sky-400 to-purple-500 text-black font-extrabold text-xs font-mono flex items-center justify-center gap-2 shadow-[0_0_35px_rgba(0,240,255,0.4)] hover:scale-102 active:scale-98 transition-all cursor-pointer"
            data-cursor="SEND ESTIMATE"
          >
            <MessageSquare className="w-4 h-4 fill-black" />
            <span>Enviar Requerimientos a WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
}
