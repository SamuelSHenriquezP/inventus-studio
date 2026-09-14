// src/components/apps/DenElectricosApp.jsx
import { useState, useEffect } from 'react';
import { 
  Zap, Power, ShieldCheck, Activity, Cpu, 
  Sun, CheckCircle2, ChevronRight, MessageSquare, Flame
} from 'lucide-react';

export default function DenElectricosApp() {
  const [isOnline, setIsOnline] = useState(false);
  const [igniting, setIgniting] = useState(false);
  const [activeTab, setActiveTab] = useState('loxone'); // 'loxone' | 'tableros' | 'cotizador'
  
  // Loxone Smart Home toggles
  const [lightsOn, setLightsOn] = useState(true);
  const [climatePower, setClimatePower] = useState(21); // 21 C
  const [securityArmed, setSecurityArmed] = useState(true);

  // Quote calculator
  const [circuitsCount, setCircuitsCount] = useState(8);
  const [hasLoxone, setHasLoxone] = useState(true);
  const [hasSolar, setHasSolar] = useState(false);

  const handleActivate = () => {
    setIgniting(true);
    setTimeout(() => {
      setIsOnline(true);
      setIgniting(false);
    }, 1200);
  };

  const estimatedBudget = (circuitsCount * 120000) + (hasLoxone ? 2800000 : 0) + (hasSolar ? 4500000 : 0);

  return (
    <div className="w-full h-full flex flex-col font-sans select-none overflow-hidden relative bg-[#0B0D14] text-white">
      {/* Top Industrial Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-[#10121D]">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#FFE600] fill-current" />
          <span className="text-xs font-mono font-black tracking-wider text-white">
            DEN ELÉCTRICOS
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px]">
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-ping' : 'bg-amber-500'}`} />
          <span className={isOnline ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
            {isOnline ? 'ONLINE 220V' : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. STANDBY POWER SWITCH SCREEN (Before Activation)
      ───────────────────────────────────────────────────────────── */}
      {!isOnline && (
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center space-y-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#00A3FF]/40 flex items-center justify-center animate-spin-slow">
              <div className="w-16 h-16 rounded-full bg-[#00A3FF]/10 flex items-center justify-center">
                <Power className="w-8 h-8 text-[#00A3FF]" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold font-mono tracking-tight text-white">
              CIRCUITO EN ESPERA
            </h2>
            <p className="text-[10px] text-zinc-400 max-w-[220px] mt-1">
              Ingeniería eléctrica, tableros de potencia y domótica inteligente Loxone.
            </p>
          </div>

          <button
            onClick={handleActivate}
            disabled={igniting}
            className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all shadow-xl cursor-pointer ${
              igniting 
                ? 'bg-amber-500 text-black animate-pulse' 
                : 'bg-[#FFE600] text-black hover:bg-yellow-300 hover:scale-105 active:scale-95'
            }`}
          >
            {igniting ? 'IGNICIÓN EN CURSO...' : 'ACTIVAR POTENCIA'}
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. ONLINE INDUSTRIAL TELEMETRY & CONTROLS
      ───────────────────────────────────────────────────────────── */}
      {isOnline && (
        <div className="flex-1 overflow-y-auto custom-scroll p-3 space-y-3">
          {/* Telemetry Grid */}
          <div className="grid grid-cols-3 gap-1.5">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[7.5px] font-mono uppercase text-zinc-400 block">Voltaje</span>
              <span className="text-xs font-mono font-bold text-[#FFE600]">220V AC</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[7.5px] font-mono uppercase text-zinc-400 block">Frecuencia</span>
              <span className="text-xs font-mono font-bold text-[#00A3FF]">60.0 Hz</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-center">
              <span className="text-[7.5px] font-mono uppercase text-zinc-400 block">Eficiencia</span>
              <span className="text-xs font-mono font-bold text-emerald-400">99.8%</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex rounded-lg bg-white/5 p-0.5 border border-white/10 font-mono text-[9px]">
            <button
              onClick={() => setActiveTab('loxone')}
              className={`flex-1 py-1 rounded cursor-pointer ${activeTab === 'loxone' ? 'bg-[#00A3FF] text-black font-bold' : 'text-zinc-400'}`}
            >
              Domótica
            </button>
            <button
              onClick={() => setActiveTab('tableros')}
              className={`flex-1 py-1 rounded cursor-pointer ${activeTab === 'tableros' ? 'bg-[#00A3FF] text-black font-bold' : 'text-zinc-400'}`}
            >
              Tableros
            </button>
            <button
              onClick={() => setActiveTab('cotizador')}
              className={`flex-1 py-1 rounded cursor-pointer ${activeTab === 'cotizador' ? 'bg-[#00A3FF] text-black font-bold' : 'text-zinc-400'}`}
            >
              Cotizador
            </button>
          </div>

          {/* Tab 1: Loxone Smart Home */}
          {activeTab === 'loxone' && (
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-[#141824] border border-[#00A3FF]/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-white block">Iluminación Escénica RGBW</span>
                  <span className="text-[8px] font-mono text-zinc-400">Bus digital DMX / Loxone Tree</span>
                </div>
                <button
                  onClick={() => setLightsOn(!lightsOn)}
                  className={`px-3 py-1 rounded-full text-[9px] font-mono font-bold cursor-pointer ${
                    lightsOn ? 'bg-[#FFE600] text-black' : 'bg-white/10 text-zinc-400'
                  }`}
                >
                  {lightsOn ? 'ENCENDIDO' : 'OFF'}
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-[#141824] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-white block">Climatización Automatizada</span>
                  <span className="text-[8px] font-mono text-zinc-400">Zonificación termostática</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <button onClick={() => setClimatePower(p => Math.max(16, p - 1))} className="w-5 h-5 rounded bg-white/10 flex items-center justify-center">-</button>
                  <span className="text-[#00A3FF] font-bold">{climatePower}°C</span>
                  <button onClick={() => setClimatePower(p => Math.min(30, p + 1))} className="w-5 h-5 rounded bg-white/10 flex items-center justify-center">+</button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Tableros */}
          {activeTab === 'tableros' && (
            <div className="space-y-1.5">
              {[
                { name: 'Interruptor General Trifásico', val: '63A Schneider', status: 'Carga Normal' },
                { name: 'Supresor de Transitorios DPS', val: 'Clase II 40kA', status: 'Operativo' },
                { name: 'Controlador Loxone Miniserver', val: 'Ethernet IPv6', status: '0.02ms Latencia' }
              ].map(item => (
                <div key={item.name} className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-[10px]">
                  <div>
                    <span className="font-bold text-white block">{item.name}</span>
                    <span className="text-[8px] font-mono text-zinc-400">{item.val}</span>
                  </div>
                  <span className="text-[8.5px] font-mono text-emerald-400 font-bold">{item.status}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Cotizador Instantáneo */}
          {activeTab === 'cotizador' && (
            <div className="p-3 rounded-xl bg-[#141824] border border-white/10 space-y-2.5">
              <div className="flex justify-between items-center text-[10px]">
                <span>Circuitos Eléctricos:</span>
                <span className="font-mono font-bold text-[#FFE600]">{circuitsCount} unidades</span>
              </div>
              <input
                type="range"
                min="4"
                max="24"
                value={circuitsCount}
                onChange={e => setCircuitsCount(Number(e.target.value))}
                className="w-full accent-[#FFE600]"
              />

              <div className="flex items-center justify-between text-[10px] pt-1">
                <span>Integrar Domótica Loxone:</span>
                <input
                  type="checkbox"
                  checked={hasLoxone}
                  onChange={e => setHasLoxone(e.target.checked)}
                  className="accent-[#00A3FF]"
                />
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-[9px] font-mono text-zinc-400">Presupuesto Estimado:</span>
                <span className="text-sm font-mono font-black text-[#FFE600]">
                  ${estimatedBudget.toLocaleString('es-CO')} COP
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
