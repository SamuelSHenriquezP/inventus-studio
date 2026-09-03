// src/components/RealisticDevice3D.jsx
import { useState } from 'react';
import { Code2, Play, Image as ImageIcon } from 'lucide-react';

import FlutterCodeViewer from './FlutterCodeViewer';
import NidoPhoneApp from './apps/NidoPhoneApp';
import ServiIntelLaptopApp from './apps/ServiIntelLaptopApp';
import DaysPhoneApp from './apps/DaysPhoneApp';
import PazHoyPhoneApp from './apps/PazHoyPhoneApp';
import EnterprisePowerApp from './apps/EnterprisePowerApp';
import SopaSeniorApp from './apps/SopaSeniorApp';

export default function RealisticDevice3D({ 
  type = 'phone-vertical', 
  image, 
  accentColor = '#e4e4e7', 
  title,
  codeSnippet,
  projectId = 'lovecost-nido',
  isActive = true
}) {
  const [screenMode, setScreenMode] = useState('live-app');

  const isLaptop = type === 'laptop' || projectId === 'serviintel-ops';
  const isTablet = type === 'tablet' || projectId === 'enterprise-powerapps' || projectId === 'otek-powerapps';

  return (
    <div className="w-full flex flex-col items-center justify-center relative select-none py-1">
      
      {/* Minimalist Controls Bar */}
      <div className="flex items-center gap-1 p-0.5 sm:p-1 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-md shadow-xl mb-2 z-30 font-mono text-[9.5px] sm:text-[10.5px]">
        <button
          onClick={() => setScreenMode('live-app')}
          className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer ${
            screenMode === 'live-app' 
              ? 'bg-white text-black font-semibold shadow-sm' 
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
          <span>App Interactiva</span>
        </button>

        <button
          onClick={() => setScreenMode('screenshot')}
          className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer ${
            screenMode === 'screenshot' 
              ? 'bg-white text-black font-semibold shadow-sm' 
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span>Captura Real</span>
        </button>

        <button
          onClick={() => setScreenMode('code')}
          className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer ${
            screenMode === 'code' 
              ? 'bg-white text-black font-semibold shadow-sm' 
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Code2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span>{codeSnippet?.language === 'powerfx' ? 'Power Fx' : 'Código Dart'}</span>
        </button>
      </div>

      {/* Static 3D Realistic Hardware Chassis (Fluid & Responsive Proportions) */}
      {screenMode !== 'code' ? (
        <div className="relative w-full flex justify-center items-center">
          
          {/* ========================================================================= */}
          {/* TABLET INDUSTRIAL / IPAD HARDWARE MOCKUP (VERTICAL ON PHONES, HORIZONTAL ON PC/TABLET) */}
          {/* ========================================================================= */}
          {isTablet ? (
            <>
              {/* 1. MOBILE PHONES (< sm): SLEEK VERTICAL SMARTPHONE CHASSIS */}
              <div 
                data-prevent-slide="true"
                className="sm:hidden mockup-interactive relative w-full max-w-[200px] max-h-[34vh] aspect-9/14 rounded-2xl bg-linear-to-b from-[#1b2234] via-[#121622] to-[#0c0e17] p-1.5 border border-sky-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col justify-between"
              >
                {/* Dynamic Island Pill */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-black border border-white/10 flex items-center justify-between px-1.5 z-30 pointer-events-none">
                  <div className="w-0.5 h-0.5 rounded-full bg-sky-400/80 shadow-[0_0_3px_#38bdf8] animate-pulse" />
                  <div className="w-1 h-1 rounded-full bg-[#111] border border-white/20 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-sky-400/60" />
                  </div>
                </div>

                {/* Inner Screen */}
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-black shadow-inner interactive-screen">
                  {screenMode === 'live-app' ? (
                    <EnterprisePowerApp isActive={isActive} />
                  ) : (
                    <img 
                      src={image} 
                      alt={title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover select-none"
                    />
                  )}
                </div>
              </div>

              {/* 2. TABLETS & PC (>= sm): INDUSTRIAL HORIZONTAL TABLET CHASSIS */}
              <div 
                data-prevent-slide="true"
                className="hidden sm:flex mockup-interactive relative w-full sm:max-w-64 md:max-w-80 lg:max-w-90 xl:max-w-110 2xl:max-w-125 max-h-[24vh] lg:max-h-[32vh] xl:max-h-[36vh] 2xl:max-h-[40vh] aspect-16/10 rounded-xl sm:rounded-3xl bg-[#151720] p-1 sm:p-2 xl:p-2.5 border border-sky-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden flex-col justify-between"
              >
                {/* Front Camera Dot */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black border border-white/10 flex items-center justify-center z-30 pointer-events-none">
                  <div className="w-0.5 h-0.5 rounded-full bg-sky-400/50" />
                </div>

                {/* Inner Screen */}
                <div className="relative w-full h-full rounded-lg sm:rounded-2xl overflow-hidden bg-black shadow-inner interactive-screen">
                  {screenMode === 'live-app' ? (
                    <EnterprisePowerApp isActive={isActive} />
                  ) : (
                    <img 
                      src={image} 
                      alt={title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover select-none"
                    />
                  )}
                </div>
              </div>
            </>
          ) : isLaptop ? (
            /* ========================================================================= */
            /* LAPTOP HARDWARE MOCKUP (MACBOOK UNIBODY) */
            /* ========================================================================= */
            <div 
              data-prevent-slide="true"
              className="mockup-interactive relative w-full max-w-[280px] sm:max-w-64 md:max-w-80 lg:max-w-95 xl:max-w-115 2xl:max-w-130 flex flex-col items-center"
            >
              {/* Display Chassis */}
              <div className="relative w-full max-h-[22vh] sm:max-h-[24vh] lg:max-h-[32vh] xl:max-h-[36vh] 2xl:max-h-[40vh] aspect-16/10 rounded-xl sm:rounded-2xl bg-[#18191e] p-1 sm:p-2 xl:p-2.5 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
                {/* Camera Notch */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-black border border-white/10 flex items-center justify-center z-30 pointer-events-none">
                  <div className="w-0.5 h-0.5 rounded-full bg-emerald-500/40" />
                </div>

                {/* Inner Screen */}
                <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-black shadow-inner interactive-screen">
                  {screenMode === 'live-app' ? (
                    <ServiIntelLaptopApp isActive={isActive} />
                  ) : (
                    <img 
                      src={image} 
                      alt={title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover select-none"
                    />
                  )}
                </div>
              </div>

              {/* Aluminum Laptop Base */}
              <div className="w-[104%] h-1.5 sm:h-2.5 bg-linear-to-b from-[#252730] to-[#14151a] rounded-b-xl border-t border-white/15 shadow-2xl relative -mt-0.5 flex justify-center pointer-events-none">
                <div className="w-8 sm:w-14 h-0.5 bg-black/60 rounded-b-md" />
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* VERTICAL PHONE HARDWARE MOCKUP (2D FLAT ON MOBILE, 3D ON DESKTOP) */
            /* ========================================================================= */
            <>
              {/* 1. MOBILE PHONES (< sm): FLAT 2D MINIMALIST FRAME */}
              <div 
                data-prevent-slide="true"
                className="sm:hidden relative w-full max-w-[210px] xs:max-w-[230px] aspect-9/18 rounded-xl bg-[#0c0d12] border border-white/15 overflow-hidden flex flex-col justify-between shadow-md"
              >
                {/* Flat Top Header Bar */}
                <div className="w-full bg-[#14151c] px-2.5 py-1 border-b border-white/10 flex items-center justify-between text-[8.5px] font-mono text-zinc-400 shrink-0 select-none">
                  <div className="flex items-center gap-1 font-bold text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="truncate max-w-28">{title || 'App Móvil'}</span>
                  </div>
                  <span className="text-[7.5px] text-zinc-500 font-semibold uppercase">2D Live App</span>
                </div>

                {/* Flat Inner Screen */}
                <div className="w-full flex-1 min-h-0 bg-black relative overflow-hidden interactive-screen">
                  {screenMode === 'live-app' ? (
                    projectId === 'days-focus-flow' ? (
                      <DaysPhoneApp isActive={isActive} />
                    ) : projectId === 'sopa-senior' ? (
                      <SopaSeniorApp isActive={isActive} />
                    ) : projectId === 'paz-hoy' ? (
                      <PazHoyPhoneApp isActive={isActive} />
                    ) : (
                      <NidoPhoneApp isActive={isActive} />
                    )
                  ) : (
                    <img 
                      src={image} 
                      alt={title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover select-none"
                    />
                  )}
                </div>
              </div>

              {/* 2. DESKTOP & TABLETS (>= sm): HIGH-FIDELITY 3D CHASSIS */}
              <div 
                data-prevent-slide="true"
                className="hidden sm:flex mockup-interactive relative w-full sm:max-w-44 md:max-w-52 lg:max-w-56 xl:max-w-64 2xl:max-w-72 max-h-[36vh] lg:max-h-[48vh] xl:max-h-[52vh] 2xl:max-h-[56vh] aspect-9/19 rounded-[36px] bg-[#15161c] p-2 xl:p-2.5 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex-col justify-between overflow-hidden"
              >
                <div className="relative w-full h-full min-h-0 rounded-[26px] overflow-hidden bg-black flex flex-col justify-between shadow-inner interactive-screen">
                  {/* Dynamic Island */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-14 h-2.5 bg-black rounded-full border border-white/10 flex items-center justify-between px-1 z-30 pointer-events-none">
                    <div className="w-1 h-1 rounded-full bg-white/40" />
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                  </div>

                  {/* Inner Screen */}
                  <div className="w-full h-full min-h-0 overflow-hidden relative flex flex-col rounded-3xl">
                    {screenMode === 'live-app' ? (
                      projectId === 'days-focus-flow' ? (
                        <DaysPhoneApp isActive={isActive} />
                      ) : projectId === 'sopa-senior' ? (
                        <SopaSeniorApp isActive={isActive} />
                      ) : projectId === 'paz-hoy' ? (
                        <PazHoyPhoneApp isActive={isActive} />
                      ) : (
                        <NidoPhoneApp isActive={isActive} />
                      )
                    ) : (
                      <img 
                        src={image} 
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover select-none"
                      />
                    )}
                  </div>

                  {/* Home Indicator Bar */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-14 h-0.5 bg-white/30 rounded-full z-20 pointer-events-none" />
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        /* Architecture & Code Inspector */
        <div 
          data-prevent-slide="true"
          className="code-viewer-container w-full max-w-md h-60 sm:h-72 xl:h-80 rounded-2xl bg-zinc-950/95 border border-white/15 p-1 shadow-2xl overflow-hidden animate-fadeIn"
        >
          <FlutterCodeViewer codeSnippet={codeSnippet} accentColor={accentColor} />
        </div>
      )}

      {/* Minimalist Hint */}
      <div className="mt-2.5 text-[9.5px] sm:text-[10px] font-mono text-zinc-500 pointer-events-none text-center">
        Interactúa directamente con la aplicación dentro del dispositivo
      </div>
    </div>
  );
}
