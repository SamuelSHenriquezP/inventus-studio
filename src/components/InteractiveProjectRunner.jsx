// src/components/InteractiveProjectRunner.jsx
import { useState, useEffect, useCallback } from 'react';
import { 
  X, QrCode, ArrowRight,
  Radio, Smartphone, Laptop, Tablet, Maximize2, ShieldCheck, Heart, Sparkles, ChevronRight
} from 'lucide-react';
import { sounds } from '../utils/soundEngine';
import { personalInfo } from '../Data/projectsData';

import OtekPowerApp from './apps/OtekPowerApp';
import SopaSeniorApp from './apps/SopaSeniorApp';
import DaysPhoneApp from './apps/DaysPhoneApp';
import NidoPhoneApp from './apps/NidoPhoneApp';
import PazHoyPhoneApp from './apps/PazHoyPhoneApp';
import ServiIntelOperarioApp from './apps/ServiIntelOperarioApp';
import ServiIntelLaptopApp from './apps/ServiIntelLaptopApp';

export default function InteractiveProjectRunner({ project, onClose }) {
  const [showQR, setShowQR] = useState(false);
  const [serviIntelView, setServiIntelView] = useState('operario'); // 'operario' | 'web' | 'dual'
  const [nidoUser, setNidoUser] = useState('samuel'); // 'samuel' | 'rochy'
  
  // Nido Shared State in Expanded Modal
  const [nidoBalance, setNidoBalance] = useState(2450.00);
  const [nidoTransactions, setNidoTransactions] = useState([
    { id: 1, title: 'Mercado Carulla', category: 'Hogar', amount: -145.50, author: 'Samuel', time: 'Hoy 10:30 AM' },
    { id: 2, title: 'Cena Aniversario', category: 'Citas', amount: -85.00, author: 'Rochy', time: 'Ayer' },
    { id: 3, title: 'Nómina Quincena', category: 'Ingreso', amount: 1800.00, author: 'Samuel', time: 'Ayer' }
  ]);
  const [nidoSyncNotice, setNidoSyncNotice] = useState('👩‍❤️‍👨 Dispositivos sincronizados en tiempo real');
  const [nidoLastPing, setNidoLastPing] = useState(null);

  const handleNidoAddTransaction = (title, category, amount, author) => {
    const newTx = {
      id: Date.now(),
      title,
      category,
      amount: -amount,
      author,
      time: 'Justo ahora'
    };
    const newBal = parseFloat((nidoBalance - amount).toFixed(2));
    setNidoBalance(newBal);
    setNidoTransactions(prev => [newTx, ...prev.slice(0, 5)]);
    setNidoSyncNotice(`✨ ${author} registró: ${title} (-$${amount.toFixed(2)})`);
  };

  const handleNidoSendPing = (message, author) => {
    setNidoLastPing({ message, author, time: Date.now() });
    setNidoSyncNotice(`💌 ${author} envió guiño: "${message}"`);
  };

  // Keyboard close handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  const isPhoneVertical = ['sopa-senior', 'days-focus-flow', 'lovecost-nido', 'paz-hoy'].includes(project.id);
  const isServiIntel = project.id === 'serviintel-ops';
  const isTablet = project.id === 'otek-powerapps';

  return (
    <div 
      data-modal="true"
      data-prevent-slide="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 select-none modal-container"
    >
      
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/90 backdrop-blur-2xl modal-backdrop" 
      />

      {/* Modal Container */}
      <div 
        data-prevent-slide="true"
        onWheel={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[95vh] bg-[#0c0d12] border border-white/15 rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-6 z-10 shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col justify-between overflow-hidden font-sans text-zinc-100 animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-2.5 sm:gap-4 border-b border-white/10 pb-2.5 sm:pb-3 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {/* Desktop / Tablet Full Badge */}
            <span 
              className="hidden sm:inline-flex text-[10.5px] sm:text-xs font-mono font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shrink-0"
              style={{
                backgroundColor: `${project.accent || '#38bdf8'}20`,
                color: project.accent || '#38bdf8',
                border: `1px solid ${project.accent || '#38bdf8'}40`
              }}
            >
              {project.badge || 'DEMO LIVE'}
            </span>

            {/* Mobile Compact Badge */}
            <span 
              className="sm:hidden text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0"
              style={{
                backgroundColor: `${project.accent || '#38bdf8'}20`,
                color: project.accent || '#38bdf8',
                border: `1px solid ${project.accent || '#38bdf8'}40`
              }}
            >
              LIVE DEMO
            </span>

            <div className="min-w-0 flex-1">
              <h3 className="font-display font-bold text-sm sm:text-base md:text-lg text-white tracking-tight truncate flex items-center gap-1.5 sm:gap-2">
                <span className="truncate">{project.title}</span>
                <span className="text-zinc-500 font-normal text-xs font-sans hidden md:inline shrink-0">• Modo Pantalla Grande</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Exit Button with Key Hint */}
            <button
              onClick={() => { sounds.playClick(); onClose(); }}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-200 hover:text-white border border-white/15 transition-all text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-sm shrink-0"
              title="Cerrar modal (Esc)"
            >
              <span>✕ Salir</span>
              <kbd className="hidden sm:inline px-1.5 py-0.2 bg-black/40 border border-white/20 rounded text-[9px] text-zinc-400">Esc</kbd>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE WORKBENCH BODY */}
        {/* ========================================================================= */}
        <div className="flex-1 min-h-0 my-2.5 sm:my-3 overflow-y-auto custom-scroll flex flex-col justify-center items-center">
          
          {/* 1. SOPA SENIOR EXPANDED HARDWARE FRAME */}
          {project.id === 'sopa-senior' && (
            <div className="w-full flex flex-col items-center justify-center space-y-2">
              <div className="w-full max-w-82.5 sm:max-w-92.5 h-130 sm:h-147.5 rounded-4xl sm:rounded-[38px] bg-[#15161c] p-2 sm:p-2.5 border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden relative">
                {/* Dynamic Island */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2 bg-black rounded-full border border-white/10 flex items-center justify-between px-1 z-30 pointer-events-none">
                  <div className="w-0.5 h-0.5 rounded-full bg-white/40" />
                  <div className="w-0.5 h-0.5 rounded-full bg-white/20" />
                </div>
                <div className="relative w-full h-full rounded-3xl sm:rounded-[30px] overflow-hidden bg-black shadow-inner">
                  <SopaSeniorApp isActive={true} />
                </div>
              </div>
              <div className="text-[10.5px] font-mono text-amber-300/80 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Haz clic y arrastra sobre la cuadrícula para conectar palabras</span>
              </div>
            </div>
          )}

          {/* 2. DAYS FOCUS FLOW EXPANDED HARDWARE FRAME */}
          {project.id === 'days-focus-flow' && (
            <div className="w-full flex flex-col items-center justify-center space-y-2">
              <div className="w-full max-w-82.5 sm:max-w-92.5 h-130 sm:h-147.5 rounded-4xl sm:rounded-[38px] bg-[#15161c] p-2 sm:p-2.5 border border-[#8B9A86]/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden relative">
                {/* Dynamic Island */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2 bg-black rounded-full border border-white/10 flex items-center justify-between px-1 z-30 pointer-events-none">
                  <div className="w-0.5 h-0.5 rounded-full bg-white/40" />
                  <div className="w-0.5 h-0.5 rounded-full bg-white/20" />
                </div>
                <div className="relative w-full h-full rounded-3xl sm:rounded-[30px] overflow-hidden bg-black shadow-inner">
                  <DaysPhoneApp isActive={true} />
                </div>
              </div>
              <div className="text-[10.5px] font-mono text-emerald-300/80 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>Prueba el temporizador Pomodoro, arrastra tareas o cambia entre estantes</span>
              </div>
            </div>
          )}

          {/* 3. NIDO EXPANDED WITH ACTIVE PARTNER SWITCHER */}
          {project.id === 'lovecost-nido' && (
            <div className="w-full flex flex-col items-center justify-center space-y-2">
              {/* Profile Switcher */}
              <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10 font-mono text-xs w-full max-w-xs">
                <button
                  onClick={() => setNidoUser('samuel')}
                  className={`flex-1 py-1 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold ${
                    nidoUser === 'samuel' ? 'bg-[#0D9488] text-white shadow-md' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>🦊 Samuel (Él)</span>
                </button>
                <button
                  onClick={() => setNidoUser('rochy')}
                  className={`flex-1 py-1 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold ${
                    nidoUser === 'rochy' ? 'bg-rose-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>🌸 Rochy (Ella)</span>
                </button>
              </div>

              {/* Hardware Phone */}
              <div className="w-full max-w-82.5 sm:max-w-92.5 h-130 sm:h-147.5 rounded-4xl sm:rounded-[38px] bg-[#15161c] p-2 sm:p-2.5 border border-teal-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden relative">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2 bg-black rounded-full border border-white/10 flex items-center justify-between px-1 z-30 pointer-events-none">
                  <div className="w-0.5 h-0.5 rounded-full bg-white/40" />
                  <div className="w-0.5 h-0.5 rounded-full bg-white/20" />
                </div>
                <div className="relative w-full h-full rounded-3xl sm:rounded-[30px] overflow-hidden bg-black shadow-inner">
                  <NidoPhoneApp
                    user={nidoUser}
                    sharedState={{
                      balance: nidoBalance,
                      transactions: nidoTransactions,
                      syncNotice: nidoSyncNotice,
                      lastPing: nidoLastPing
                    }}
                    onAddTransaction={handleNidoAddTransaction}
                    onSendPing={handleNidoSendPing}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 4. SERVIINTEL FULL COMMAND STATION WITH DUAL OR FOCUSED SWITCHER */}
          {isServiIntel && (
            <div className="w-full flex flex-col items-center justify-center space-y-2.5">
              {/* Segment Switcher */}
              <div className="flex items-center p-1 rounded-xl bg-white/5 border border-sky-500/20 font-mono text-xs w-full max-w-md">
                <button
                  onClick={() => setServiIntelView('operario')}
                  className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold ${
                    serviIntelView === 'operario' ? 'bg-sky-400 text-black shadow-md' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>App Móvil Terreno</span>
                </button>
                <button
                  onClick={() => setServiIntelView('web')}
                  className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold ${
                    serviIntelView === 'web' ? 'bg-sky-400 text-black shadow-md' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Consola Web Admin</span>
                </button>
                <button
                  onClick={() => setServiIntelView('dual')}
                  className={`hidden sm:flex flex-1 py-1.5 px-3 rounded-lg items-center justify-center gap-1.5 transition-all cursor-pointer font-bold ${
                    serviIntelView === 'dual' ? 'bg-sky-400 text-black shadow-md' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Vista Dual</span>
                </button>
              </div>

              {/* View Content */}
              {serviIntelView === 'operario' && (
                <div className="w-full max-w-82.5 sm:max-w-92.5 h-130 sm:h-147.5 rounded-4xl sm:rounded-[38px] bg-[#15161c] p-2 sm:p-2.5 border border-sky-500/30 shadow-2xl flex flex-col justify-between overflow-hidden relative">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2 bg-black rounded-full border border-white/10 flex items-center justify-between px-1 z-30 pointer-events-none">
                    <div className="w-0.5 h-0.5 rounded-full bg-sky-400 animate-pulse" />
                  </div>
                  <div className="relative w-full h-full rounded-3xl sm:rounded-[30px] overflow-hidden bg-black shadow-inner">
                    <ServiIntelOperarioApp />
                  </div>
                </div>
              )}

              {serviIntelView === 'web' && (
                <div className="w-full max-w-3xl flex flex-col items-center">
                  <div className="relative w-full aspect-16/10 rounded-2xl bg-linear-to-b from-[#1c1f2c] via-[#141722] to-[#0f1118] p-2 border border-sky-500/30 shadow-2xl overflow-hidden">
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black border border-white/15 flex items-center justify-center z-30 pointer-events-none">
                      <div className="w-0.5 h-0.5 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#07090e] border border-white/10 shadow-inner">
                      <ServiIntelLaptopApp />
                    </div>
                  </div>
                  <div className="w-[102%] h-2.5 bg-linear-to-b from-[#252838] to-[#12141c] rounded-b-xl border-t border-white/15 shadow-xl relative -mt-0.5 flex justify-center pointer-events-none">
                    <div className="w-12 h-0.5 bg-black/60 rounded-b-sm mt-0.5" />
                  </div>
                </div>
              )}

              {serviIntelView === 'dual' && (
                <div className="w-full grid grid-cols-12 gap-4 items-center max-w-4xl">
                  <div className="col-span-5 flex justify-center">
                    <div className="w-full max-w-70 h-120 rounded-[30px] bg-[#15161c] p-2 border border-sky-500/30 shadow-xl overflow-hidden">
                      <div className="w-full h-full rounded-[22px] overflow-hidden bg-black">
                        <ServiIntelOperarioApp />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-7 flex flex-col items-center">
                    <div className="w-full aspect-16/10 rounded-xl bg-[#141722] p-1.5 border border-sky-500/30 shadow-xl overflow-hidden">
                      <div className="w-full h-full rounded-lg overflow-hidden bg-black">
                        <ServiIntelLaptopApp />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-[10.5px] font-mono text-sky-400 flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>Sincronización bidireccional reactiva sub-38ms entre App Móvil y Web Admin</span>
              </div>
            </div>
          )}

          {/* 5. PAZ HOY EXPANDED HANDHELD FRAME */}
          {project.id === 'paz-hoy' && (
            <div className="w-full flex flex-col items-center justify-center space-y-2">
              <div className="w-full max-w-82.5 sm:max-w-92.5 h-130 sm:h-147.5 rounded-4xl sm:rounded-[38px] bg-[#15161c] p-2 sm:p-2.5 border border-indigo-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden relative">
                {/* Dynamic Island */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2 bg-black rounded-full border border-white/10 flex items-center justify-between px-1 z-30 pointer-events-none">
                  <div className="w-0.5 h-0.5 rounded-full bg-indigo-400/80 shadow-[0_0_3px_#818cf8] animate-pulse" />
                  <div className="w-0.5 h-0.5 rounded-full bg-white/20" />
                </div>
                <div className="relative w-full h-full rounded-3xl sm:rounded-[30px] overflow-hidden bg-black shadow-inner">
                  <PazHoyPhoneApp isActive={true} />
                </div>
              </div>
              <div className="text-[10.5px] font-mono text-indigo-300/90 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>Toca para avanzar frases, abre el editor de fuentes y sincroniza el Home Widget</span>
              </div>
            </div>
          )}

          {/* 6. O-TEK QUALITY CONTROL EXPANDED TABLET/PHONE FRAME */}
          {isTablet && (
            <div className="w-full flex flex-col items-center justify-center space-y-2">
              {/* Mobile Phones: Large Vertical Smartphone Frame (like Sopa de Letras & Days) */}
              <div className="sm:hidden w-full max-w-82.5 h-130 rounded-4xl bg-[#15161c] p-2 border border-sky-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden relative">
                {/* Dynamic Island */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2 bg-black rounded-full border border-white/10 flex items-center justify-between px-1 z-30 pointer-events-none">
                  <div className="w-0.5 h-0.5 rounded-full bg-sky-400/80 shadow-[0_0_3px_#38bdf8] animate-pulse" />
                  <div className="w-1 h-1 rounded-full bg-[#111] border border-white/20 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-sky-400/60" />
                  </div>
                </div>
                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-black shadow-inner">
                  <OtekPowerApp isActive={true} />
                </div>
              </div>

              {/* Tablets & PC: Industrial Horizontal Tablet Frame */}
              <div className="hidden sm:flex w-full max-w-3xl aspect-16/10 max-h-130 rounded-2xl bg-[#151720] p-2.5 border border-sky-500/30 shadow-2xl overflow-hidden flex-col justify-between">
                <div className="w-full h-full rounded-xl overflow-hidden bg-black shadow-inner">
                  <OtekPowerApp isActive={true} />
                </div>
              </div>

              <div className="text-[10.5px] font-mono text-sky-300 text-center">
                Inspección de tuberías y control de calidad industrial con SharePoint & Power Apps
              </div>
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM ACTION BAR */}
        {/* ========================================================================= */}
        <div className="pt-2.5 sm:pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5 shrink-0 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { sounds.playClick(); setShowQR(!showQR); }}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>{showQR ? 'Ocultar QR' : 'Abrir en tu Teléfono'}</span>
            </button>

            {project.googlePlayUrl && (
              <a
                href={project.googlePlayUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 flex items-center gap-1.5 transition-all text-xs font-bold"
              >
                <span>Google Play Store</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20estoy%20probando%20el%20demo%20de%20${encodeURIComponent(project.title)}%20y%20quiero%20cotizar%20un%20proyecto`}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white text-black font-bold flex items-center gap-1.5 hover:bg-zinc-200 transition-all shadow-md active:scale-95 text-xs"
            >
              <span>Cotizar Proyecto</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* QR Scanner Drawer */}
        {showQR && (
          <div className="mt-2 p-3 rounded-xl bg-zinc-900 border border-white/10 flex items-center gap-3 animate-in fade-in duration-150 shrink-0">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 shrink-0">
              <QrCode className="w-10 h-10 text-black" />
            </div>
            <div className="text-[11px] font-mono text-zinc-300 leading-tight">
              Escanea con la cámara de tu smartphone para probar la versión web en vivo y evaluar la fluidez nativa a 60 FPS.
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
