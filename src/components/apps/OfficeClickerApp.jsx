// src/components/apps/OfficeClickerApp.jsx
import { useState, useEffect, useRef } from 'react';
import { 
  Building2, Briefcase, DollarSign, TrendingUp, Zap, 
  Cpu, Users, Coffee, Rocket, Sparkles, Award, BarChart3, 
  ShieldCheck, ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

// =========================================================================
// 1. EXECUTIVE FINTECH PALETTE (From Flutter lib/utils/constants.dart)
// =========================================================================
const COLORS = {
  bg: '#0A0F1D',           // Deep navy slate
  bgCard: '#131C2E',       // Primary card container
  bgPanel: '#1A263D',      // Elevated sheet
  accent: '#2563EB',       // Royal blue
  accentBright: '#38BDF8', // Cyan blue
  gold: '#F59E0B',         // Amber Gold
  goldLight: '#FBBF24',
  success: '#10B981',      // Profit emerald
  danger: '#F43F5E',
  border: 'rgba(148, 163, 184, 0.12)',
  textDim: '#64748B',
  textMid: '#94A3B8',
  textWhite: '#F8FAFC'
};

const UPGRADES_DATA = [
  { id: 'intern', name: 'Contratar Pasante', cost: 40, perSec: 3, icon: Users, count: 0 },
  { id: 'coffee', name: 'Máquina Espresso Italiana', cost: 180, perSec: 12, icon: Coffee, count: 0 },
  { id: 'aws', name: 'Cluster Cloud AWS', cost: 850, perSec: 65, icon: Cpu, count: 0 },
  { id: 'ai', name: 'Modelo de IA Generativa', cost: 4200, perSec: 380, icon: Sparkles, count: 0 },
  { id: 'unicorn', name: 'Adquisición de FinTech', cost: 22000, perSec: 2100, icon: Rocket, count: 0 }
];

export default function OfficeClickerApp() {
  const [balance, setBalance] = useState(150);
  const [clickPower, setClickPower] = useState(5);
  const [upgrades, setUpgrades] = useState(UPGRADES_DATA);
  const [clickParticles, setClickParticles] = useState([]);
  const [activeTab, setActiveTab] = useState('empire'); // 'empire' | 'operations' | 'finance'
  const [frenzyMultiplier, setFrenzyMultiplier] = useState(1);
  const [goldenBriefcase, setGoldenBriefcase] = useState(false);
  const [corpLevel, setCorpLevel] = useState('Startup de Garaje');

  // Calculate passive income per second
  const totalPerSec = upgrades.reduce((acc, u) => acc + u.count * u.perSec, 0) * frenzyMultiplier;

  // Passive tick every 100ms for ultra-smooth financial growth
  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(prev => prev + totalPerSec / 10);
    }, 100);
    return () => clearInterval(interval);
  }, [totalPerSec]);

  // Corporate level evaluation
  useEffect(() => {
    if (balance > 100000) setCorpLevel('Conglomerado Global');
    else if (balance > 25000) setCorpLevel('Unicornio Tecnológico');
    else if (balance > 5000) setCorpLevel('Incubadora Serie A');
    else if (balance > 800) setCorpLevel('Estudio Boutique');
  }, [balance]);

  // Random Golden Briefcase event every 35s
  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.4) {
        setGoldenBriefcase(true);
        setTimeout(() => setGoldenBriefcase(false), 9000);
      }
    }, 32000);
    return () => clearInterval(timer);
  }, []);

  // Handle Orb Click
  const handleOrbClick = (e) => {
    const earned = clickPower * frenzyMultiplier;
    setBalance(prev => prev + earned);

    // Particle effect
    const id = Date.now() + Math.random();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX || rect.left + rect.width / 2) - rect.left;
    const y = (e.clientY || rect.top + rect.height / 2) - rect.top;

    setClickParticles(prev => [
      ...prev.slice(-12),
      { id, x, y, text: `+$${earned}` }
    ]);

    setTimeout(() => {
      setClickParticles(prev => prev.filter(p => p.id !== id));
    }, 800);
  };

  // Buy upgrade
  const buyUpgrade = (id) => {
    const item = upgrades.find(u => u.id === id);
    if (!item || balance < item.cost) return;

    setBalance(prev => prev - item.cost);
    setUpgrades(prev => prev.map(u => {
      if (u.id === id) {
        return {
          ...u,
          count: u.count + 1,
          cost: Math.floor(u.cost * 1.25)
        };
      }
      return u;
    }));
    setClickPower(prev => prev + Math.ceil(item.perSec * 0.15));
  };

  // Claim Golden Briefcase Frenzy
  const claimBriefcase = () => {
    setGoldenBriefcase(false);
    setFrenzyMultiplier(5);
    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.5 } });
    } catch (e) {}
    setTimeout(() => {
      setFrenzyMultiplier(1);
    }, 12000);
  };

  return (
    <div 
      className="w-full h-full flex flex-col font-sans select-none overflow-hidden relative"
      style={{ backgroundColor: COLORS.bg, color: COLORS.textWhite }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. TOP EXECUTIVE FINANCIAL STATS BAR
      ───────────────────────────────────────────────────────────── */}
      <div 
        className="p-3 border-b shadow-lg z-10"
        style={{ backgroundColor: COLORS.bgCard, borderColor: COLORS.border }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-[10px] font-bold font-mono tracking-wider text-zinc-300 uppercase">
              {corpLevel}
            </span>
          </div>
          {frenzyMultiplier > 1 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
              <Zap className="w-2.5 h-2.5 fill-current" /> FRENESÍ 5X ACTIVO
            </span>
          )}
        </div>

        {/* Net Worth Big Counter */}
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[8px] font-mono uppercase text-zinc-400 block leading-none">Capital Corporativo</span>
            <span className="text-xl sm:text-2xl font-black font-mono text-[#38BDF8] tracking-tight">
              ${Math.floor(balance).toLocaleString('en-US')}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[8px] font-mono uppercase text-zinc-400 block leading-none">Ingreso Pasivo</span>
            <span className="text-xs font-bold font-mono text-[#10B981] flex items-center justify-end gap-0.5">
              <TrendingUp className="w-3 h-3" />
              +${totalPerSec.toFixed(1)}/s
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN TAB CONTENT
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto custom-scroll p-3 flex flex-col justify-between">
        {/* TAB 1: EMPIRE (The Clicker Orb & Quick Buy) */}
        {activeTab === 'empire' && (
          <div className="flex-1 flex flex-col items-center justify-between">
            {/* Random Golden Briefcase Floating Drop */}
            {goldenBriefcase && (
              <div 
                onClick={claimBriefcase}
                className="w-full p-2 rounded-xl bg-linear-to-r from-amber-600/30 via-yellow-500/30 to-amber-600/30 border border-amber-400/60 shadow-xl cursor-pointer flex items-center justify-between animate-bounce"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-amber-300 animate-pulse" />
                  <div>
                    <span className="text-[10px] font-bold text-amber-200 block leading-none">¡MALETÍN DE INVERSIÓN!</span>
                    <span className="text-[8px] text-amber-300/80 font-mono">Toca para 5x ingresos por 12s</span>
                  </div>
                </div>
                <span className="px-2 py-1 rounded bg-amber-500 text-black text-[9px] font-bold font-mono">
                  RECLAMAR
                </span>
              </div>
            )}

            {/* Central Holographic Clicker Orb */}
            <div className="relative my-auto flex flex-col items-center">
              {/* Pulsating Neon Rings */}
              <div 
                className="absolute inset-0 w-36 h-36 -top-3 -left-3 rounded-full blur-xl pointer-events-none opacity-40 transition-all animate-pulse"
                style={{ backgroundColor: frenzyMultiplier > 1 ? COLORS.gold : COLORS.accentBright }}
              />

              {/* The Interactive Orb */}
              <div 
                onClick={handleOrbClick}
                className="relative w-30 h-30 sm:w-34 sm:h-34 rounded-full border-2 cursor-pointer flex flex-col items-center justify-center transition-all duration-150 active:scale-92 shadow-2xl hover:border-[#38BDF8]"
                style={{ 
                  backgroundColor: COLORS.bgCard,
                  borderColor: frenzyMultiplier > 1 ? COLORS.gold : COLORS.accent,
                  boxShadow: `0 0 35px ${frenzyMultiplier > 1 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(56, 189, 248, 0.25)'}`
                }}
              >
                <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 text-[#38BDF8] drop-shadow-md" />
                <span className="text-[9px] font-mono text-zinc-400 font-bold">
                  +${clickPower * frenzyMultiplier}
                </span>

                {/* Floating click particles */}
                {clickParticles.map(p => (
                  <span
                    key={p.id}
                    className="absolute text-[11px] font-mono font-black text-[#FBBF24] pointer-events-none animate-fade-out"
                    style={{
                      left: p.x,
                      top: p.y,
                      transform: 'translate(-50%, -100%)',
                      textShadow: '0 0 6px rgba(245,158,11,0.8)'
                    }}
                  >
                    {p.text}
                  </span>
                ))}
              </div>

              <span className="text-[9px] font-mono text-zinc-400 mt-2">
                Toca el Orbe de Capital para facturar
              </span>
            </div>

            {/* Quick Upgrades Mini-Dock */}
            <div className="w-full space-y-1.5 mt-2">
              <span className="text-[8px] font-mono uppercase text-zinc-500 block">
                MEJORAS PRIORITARIAS
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {upgrades.slice(0, 2).map(u => (
                  <button
                    key={u.id}
                    onClick={() => buyUpgrade(u.id)}
                    disabled={balance < u.cost}
                    className="p-2 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs active:scale-98"
                    style={{ backgroundColor: COLORS.bgCard, borderColor: COLORS.border }}
                  >
                    <div className="truncate">
                      <span className="text-[9px] font-bold text-white block truncate">{u.name}</span>
                      <span className="text-[8px] font-mono text-[#10B981]">+{u.perSec}/s</span>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-[#F59E0B] shrink-0 ml-1">
                      ${u.cost}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OPERATIONS (Full Store) */}
        {activeTab === 'operations' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1 border-b" style={{ borderColor: COLORS.border }}>
              <h3 className="text-xs font-bold text-white">Infraestructura & Personal</h3>
              <span className="text-[8px] font-mono text-zinc-400">EXPANSIÓN</span>
            </div>
            {upgrades.map(u => (
              <div 
                key={u.id}
                onClick={() => buyUpgrade(u.id)}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all shadow-xs ${
                  balance < u.cost ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#38BDF8]'
                }`}
                style={{ backgroundColor: COLORS.bgCard, borderColor: COLORS.border }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-950/60 border border-blue-500/20 text-[#38BDF8]">
                    <u.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-white">{u.name}</span>
                      {u.count > 0 && (
                        <span className="px-1.5 py-0.2 rounded text-[7px] font-mono bg-white/10 text-[#38BDF8] font-bold">
                          x{u.count}
                        </span>
                      )}
                    </div>
                    <span className="text-[8px] font-mono text-[#10B981]">Genera +{u.perSec}/s</span>
                  </div>
                </div>
                <button
                  disabled={balance < u.cost}
                  className="px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors"
                >
                  ${u.cost}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: FINANCE (Stock & Crypto Simulation) */}
        {activeTab === 'finance' && (
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl border" style={{ backgroundColor: COLORS.bgCard, borderColor: COLORS.border }}>
              <span className="text-[8px] font-mono uppercase text-[#38BDF8] font-bold block">BOLSA EJECUTIVA</span>
              <h4 className="text-xs font-bold text-white mt-0.5">Rendimiento de Acciones</h4>
              <div className="flex justify-between items-end h-16 pt-3 px-2 gap-1.5">
                {[35, 55, 40, 78, 62, 90, 100].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full rounded-t-sm transition-all"
                      style={{ height: `${val}%`, backgroundColor: COLORS.accentBright }}
                    />
                    <span className="text-[7px] font-mono text-zinc-500">
                      T{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-2.5 rounded-xl border space-y-1.5" style={{ backgroundColor: COLORS.bgCard, borderColor: COLORS.border }}>
              <span className="text-[8px] font-mono uppercase text-emerald-400 font-bold block">CALIFICACIÓN CREDITICIA</span>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-zinc-300">Rating Moody's</span>
                <span className="font-mono font-bold text-emerald-400">AAA Sovereign</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-zinc-300">Margen Operativo</span>
                <span className="font-mono font-bold text-white">48.2% EBITDA</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. BOTTOM EXECUTIVE TAB BAR
      ───────────────────────────────────────────────────────────── */}
      <div 
        className="flex items-center justify-around py-2 border-t"
        style={{ backgroundColor: COLORS.bgCard, borderColor: COLORS.border }}
      >
        {[
          { id: 'empire', label: 'Imperio', icon: Zap },
          { id: 'operations', label: 'Operaciones', icon: Cpu },
          { id: 'finance', label: 'Finanzas', icon: BarChart3 }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-0.5 cursor-pointer transition-all"
              style={{ color: isActive ? COLORS.accentBright : COLORS.textDim }}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="text-[8px] font-mono font-bold uppercase">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
