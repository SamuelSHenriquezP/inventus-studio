import { useState, useEffect } from 'react';
import { 
  Smartphone, Monitor, Activity, ShieldCheck, 
  RefreshCw, Wifi, Database, CheckCircle2, ArrowRightLeft, 
  Zap, Lock, EyeOff, Eye, Cpu, Radio, TrendingUp
} from 'lucide-react';
import { sounds } from '../utils/soundEngine';

export default function EnterpriseDualMockup() {
  const [latency, setLatency] = useState(38);
  const [isSyncing, setIsSyncing] = useState(false);
  const [confidentialMode, setConfidentialMode] = useState(true);
  const [events, setEvents] = useState([
    { id: 1, time: '12:44:02', title: 'Socket Channel #9 Replicado', node: 'aws-us-east-1', status: 'ok', val: '$14,200.00' },
    { id: 2, time: '12:44:15', title: 'Data Ingestion Peak (1.4 GB/s)', node: 'edge-cloudflare', status: 'ok', val: '99.98%' },
    { id: 3, time: '12:44:38', title: 'Biometric Auth Verified (Client #809)', node: 'auth-vault', status: 'secure', val: 'E2E Valid' },
    { id: 4, time: '12:45:01', title: 'Inventario Sincronizado en Almacén #4', node: 'redis-stream', status: 'ok', val: '1,420 u' }
  ]);
  const [metrics, setMetrics] = useState({
    throughput: 1.42,
    nodes: 12,
    activeOrders: 894,
    totalVolume: 489240.00
  });
  const [syncFeedback, setSyncFeedback] = useState(false);

  // Latencia dinámica fluctuante realista
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency((prev) => Math.max(26, Math.min(64, prev + Math.floor(Math.random() * 7) - 3)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const triggerLiveSync = () => {
    if (isSyncing) return;
    sounds.playClick();
    setIsSyncing(true);
    setSyncFeedback(true);

    setTimeout(() => {
      sounds.playSuccess();
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const randomOrder = Math.floor(Math.random() * 9000 + 1000);
      const randomAmount = Math.floor(Math.random() * 4500 + 500);

      const newEvent = {
        id: Date.now(),
        time: timeStr,
        title: `Transacción #${randomOrder} Sincronizada en Móvil y Web`,
        node: 'redis-pubsub-cluster',
        status: 'sync',
        val: `$${randomAmount.toLocaleString()}.00`
      };

      setEvents(prev => [newEvent, ...prev.slice(0, 4)]);
      setMetrics(prev => ({
        ...prev,
        activeOrders: prev.activeOrders + 1,
        totalVolume: prev.totalVolume + randomAmount,
        throughput: parseFloat((prev.throughput + (Math.random() * 0.05 - 0.02)).toFixed(2))
      }));

      setIsSyncing(false);
      
      import('canvas-confetti').then((module) => {
        const confetti = module.default;
        confetti({
          particleCount: 30,
          spread: 45,
          origin: { y: 0.65, x: 0.75 },
          colors: ['#00F0FF', '#A855F7', '#10B981']
        });
      }).catch(() => {});

      setTimeout(() => setSyncFeedback(false), 1500);
    }, 550);
  };

  const toggleConfidential = () => {
    sounds.playClick();
    setConfidentialMode(!confidentialMode);
  };

  return (
    <div className="relative rounded-3xl border border-white/10 bg-linear-to-b from-zinc-900/90 via-zinc-950/95 to-black p-6 md:p-10 shadow-2xl overflow-hidden backdrop-blur-2xl">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header with Title & Interactive Action Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-8 border-b border-white/10 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>Misión Crítica • Zero-Downtime • Sincronización WebSockets</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
            Ecosistema B2B: Web & Móvil en Tiempo Real
          </h3>
          <p className="text-zinc-400 text-xs md:text-sm mt-1 max-w-xl font-sans">
            Simulación en vivo de arquitectura distribuida para clientes corporativos con protección estricta de NDA.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Confidential Mode Toggle */}
          <button
            onClick={toggleConfidential}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
              confidentialMode
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
            }`}
            title="Oculta datos sensibles de clientes respetando acuerdos NDA"
            data-cursor="NDA MASK"
          >
            {confidentialMode ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{confidentialMode ? 'NDA / Mask Activo' : 'Datos Descubiertos'}</span>
          </button>

          {/* Latency Pill */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-white/10 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-zinc-400">Ping Sync:</span>
            <span className="text-emerald-400 font-bold">{latency}ms</span>
          </div>

          {/* Trigger Event Button */}
          <button
            onClick={triggerLiveSync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs transition-all shadow-[0_0_25px_rgba(0,240,255,0.35)] active:scale-95 cursor-pointer"
            data-cursor="SYNC"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Emitiendo Evento...' : 'Disparar Evento Sync'}</span>
          </button>
        </div>
      </div>

      {/* DUAL MOCKUP STAGE: MacBook Pro (Left 8 cols) + iPhone 15 Pro (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center relative z-10">
        
        {/* 1. MACBOOK PRO CHASSIS */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="rounded-2xl border-2 border-zinc-700/80 bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300">
            
            {/* MacBook Top Bezel / Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/90 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="ml-3 px-3.5 py-1 rounded-lg bg-zinc-900/90 border border-white/10 text-[11px] font-mono text-zinc-300 flex items-center gap-2 shadow-inner">
                  <Lock className="w-3 h-3 text-cyan-400" />
                  <span>https://enterprise-core.inventus.cloud/v4/console</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                <Monitor className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">MacBook Pro 16" • Cluster Activo</span>
              </div>
            </div>

            {/* Dashboard Inner App Screen */}
            <div className="p-5 md:p-6 bg-zinc-950 space-y-5">
              
              {/* Visual Banner Preview */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-21/9 bg-zinc-900 shadow-inner group">
                <img 
                  src="/assets/projects/enterprise.jpg" 
                  alt="Enterprise Telemetry Dashboard" 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/90">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Telemetría Global en Vivo (99.8% Health)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-cyan-300">
                    1.2M req/s
                  </span>
                </div>
              </div>

              {/* Dynamic KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Volumen Transaccional</span>
                  <span className="text-lg font-bold text-white font-mono mt-1 block">
                    {confidentialMode ? '$••••••.••' : `$${metrics.totalVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                  </span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                    <TrendingUp className="w-3 h-3" /> +18.4% WoW
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Throughput Edge</span>
                  <span className="text-lg font-bold text-cyan-400 font-mono mt-1 block">{metrics.throughput} GB/s</span>
                  <span className="text-[10px] text-cyan-300/80 flex items-center gap-1 mt-1 font-mono">
                    <Zap className="w-3 h-3" /> HTTP/3 QUIC
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Órdenes Sincronizadas</span>
                  <span className="text-lg font-bold text-purple-400 font-mono mt-1 block">{metrics.activeOrders}</span>
                  <span className="text-[10px] text-purple-300 flex items-center gap-1 mt-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" /> Consistencia 100%
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Nodos Kubernetes</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono mt-1 block">12 / 12</span>
                  <span className="text-[10px] text-emerald-300 flex items-center gap-1 mt-1 font-mono">
                    <Cpu className="w-3 h-3" /> Auto-Scaling OK
                  </span>
                </div>
              </div>

              {/* Realtime Event Stream Table */}
              <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-zinc-300 font-bold flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" /> Registro de Eventos en Tiempo Real
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 animate-pulse">
                    Live Stream Conectado
                  </span>
                </div>

                <div className="space-y-2 font-mono text-xs max-h-36 overflow-y-auto pr-1">
                  {events.map((ev) => (
                    <div 
                      key={ev.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/80 border border-white/5 hover:border-cyan-500/40 transition-all text-[11px]"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="text-zinc-500 shrink-0">{ev.time}</span>
                        <span className="text-zinc-200 truncate">{ev.title}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-2">
                        <span className="text-emerald-400 font-bold">
                          {confidentialMode ? '••••' : ev.val}
                        </span>
                        <span className="text-cyan-400 text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-white/5">
                          {ev.node}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security & Database Status Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs font-mono text-zinc-400 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-sky-400" />
                  <span>PostgreSQL Pool: <strong className="text-white font-normal">Multi-Region Master-Replica</strong></span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Seguridad de Grado Bancario & SOC-2</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 2. IPHONE 15 PRO TITANIUM FRAME */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          
          <div className={`relative w-72 sm:w-80 bg-zinc-900 rounded-[50px] p-3 shadow-2xl border-4 transition-all duration-500 ${
            syncFeedback 
              ? 'border-cyan-400 shadow-[0_0_60px_rgba(0,240,255,0.45)] scale-103' 
              : 'border-zinc-700/70 shadow-[0_20px_50px_rgba(0,0,0,0.9)]'
          }`}>
            
            {/* Dynamic Reflection Sheen */}
            <div className="absolute inset-0 rounded-[46px] bg-linear-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

            {/* Screen Inner */}
            <div className="relative bg-zinc-950 rounded-[40px] overflow-hidden aspect-9/18.5 border border-white/10 flex flex-col justify-between p-4 pt-10">
              
              {/* Dynamic Island */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full border border-white/10 flex items-center justify-between px-3 z-30 shadow-md">
                <div className={`w-2 h-2 rounded-full ${syncFeedback ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400'}`} />
                <div className="text-[9px] font-mono text-zinc-300">
                  {syncFeedback ? 'Push Sync...' : '5G Connected'}
                </div>
              </div>

              {/* Mobile App Header */}
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-white font-bold">Inventus Enterprise</span>
                </div>
                <span className="text-cyan-400 flex items-center gap-1 text-[10px]">
                  <Wifi className="w-3 h-3" /> Latencia {latency}ms
                </span>
              </div>

              {/* Main Dynamic Mobile Card */}
              <div className="my-auto space-y-4">
                <div className="p-4 rounded-2xl bg-linear-to-br from-cyan-950/70 via-zinc-900 to-purple-950/50 border border-cyan-500/30 relative overflow-hidden shadow-lg">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
                    <span>Balance Sincronizado</span>
                    <span className="text-cyan-300 font-bold">LIVE</span>
                  </div>
                  
                  <div className="text-2xl font-black text-white font-mono tracking-tight">
                    {confidentialMode ? '$••••••.••' : `$${metrics.totalVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-2 border-t border-white/10">
                    <span>Nodos: 12 K8s</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Encriptado E2E
                    </span>
                  </div>
                </div>

                {/* Mobile Quick Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={triggerLiveSync}
                    className="p-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-cyan-400/50 text-left transition-all group cursor-pointer active:scale-95"
                    data-cursor="TRIGGER"
                  >
                    <ArrowRightLeft className="w-4 h-4 text-cyan-400 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-white block">Sincronizar</span>
                    <span className="text-[9px] text-zinc-500 font-mono">Disparar orden</span>
                  </button>

                  <div className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-left">
                    <Zap className="w-4 h-4 text-purple-400 mb-1" />
                    <span className="text-xs font-bold text-white block">Push Event</span>
                    <span className="text-[9px] text-zinc-500 font-mono">Sub-85ms</span>
                  </div>
                </div>

                {/* Realtime Alert Pill */}
                <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-white/5 flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-pulse" />
                  <div className="truncate text-[10px]">
                    Socket: <span className="text-cyan-300 font-bold">100% sincronizado</span>
                  </div>
                </div>
              </div>

              {/* iPhone Home Bar */}
              <div className="w-28 h-1 bg-white/40 rounded-full mx-auto" />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
