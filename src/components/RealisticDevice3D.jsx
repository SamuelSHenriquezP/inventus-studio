// src/components/RealisticDevice3D.jsx
import { useState } from 'react';
import { 
  Smartphone, Laptop, Code2, Play, Image as ImageIcon, 
  Layers, Terminal, RotateCcw, Check
} from 'lucide-react';

import NexusSculpture3D from './NexusSculpture3D';
import FlutterCodeViewer from './FlutterCodeViewer';
import NidoPhoneApp from './apps/NidoPhoneApp';
import ServiIntelLaptopApp from './apps/ServiIntelLaptopApp';
import DaysPhoneApp from './apps/DaysPhoneApp';
import CyberRushPhoneApp from './apps/CyberRushPhoneApp';

export default function RealisticDevice3D({ 
  type = 'phone-vertical', 
  image, 
  accentColor = '#e4e4e7', 
  title,
  codeSnippet,
  projectId = 'lovecost-nido'
}) {
  const [screenMode, setScreenMode] = useState('live-app'); // 'live-app' | 'screenshot' | 'code'

  if (type === 'sculpture' || projectId === 'nexus-experience') {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <NexusSculpture3D accentColor={accentColor} />
      </div>
    );
  }

  const isLaptop = type === 'laptop' || projectId === 'serviintel-ops';
  const isHorizontalPhone = projectId === 'cyber-rush';

  return (
    <div 
      data-mockup="true"
      className="device-mockup w-full h-[470px] sm:h-[530px] lg:h-[570px] flex flex-col items-center justify-center relative select-none"
    >
      
      {/* Minimalist Controls Bar */}
      <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-md shadow-xl mb-3.5 z-30 font-mono text-[11px]">
        <button
          onClick={() => setScreenMode('live-app')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            screenMode === 'live-app' 
              ? 'bg-white text-black font-semibold shadow-sm' 
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Play className="w-3 h-3 fill-current" />
          <span>App Interactiva</span>
        </button>

        <button
          onClick={() => setScreenMode('screenshot')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            screenMode === 'screenshot' 
              ? 'bg-white text-black font-semibold shadow-sm' 
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-3 h-3" />
          <span>Captura Real</span>
        </button>

        <button
          onClick={() => setScreenMode('code')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            screenMode === 'code' 
              ? 'bg-white text-black font-semibold shadow-sm' 
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Code2 className="w-3 h-3" />
          <span>Código Dart</span>
        </button>
      </div>

      {/* Static 3D Realistic Hardware Chassis (No Tilt Movement for Maximum Usability) */}
      {screenMode !== 'code' ? (
        <div className="relative">
          
          {/* ========================================================================= */}
          {/* LAPTOP HARDWARE MOCKUP (MACBOOK UNIBODY) */}
          {/* ========================================================================= */}
          {isLaptop ? (
            <div className="relative w-[340px] sm:w-[460px] lg:w-[500px] flex flex-col items-center">
              {/* Display Chassis */}
              <div className="relative w-full aspect-16/10 rounded-2xl bg-[#18191e] p-3 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden">
                {/* Static Specular Glass Glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none z-30" />
                
                {/* Camera Notch */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black border border-white/10 flex items-center justify-center z-30 pointer-events-none">
                  <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
                </div>

                {/* Inner Screen */}
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-black border border-white/10 shadow-inner">
                  {screenMode === 'live-app' ? (
                    <ServiIntelLaptopApp />
                  ) : (
                    <img 
                      src={image} 
                      alt={title}
                      className="w-full h-full object-cover select-none"
                    />
                  )}
                </div>
              </div>

              {/* Aluminum Laptop Base */}
              <div className="w-[104%] h-3.5 bg-gradient-to-b from-[#252730] to-[#14151a] rounded-b-xl border-t border-white/15 shadow-2xl relative -mt-0.5 flex justify-center pointer-events-none">
                <div className="w-16 h-1 bg-black/60 rounded-b-md" />
              </div>
            </div>
          ) : isHorizontalPhone ? (
            /* ========================================================================= */
            /* HORIZONTAL PHONE HARDWARE MOCKUP */
            /* ========================================================================= */
            <div className="relative w-[340px] sm:w-[440px] lg:w-[480px] aspect-18.8/9 rounded-[38px] bg-[#16171d] p-3 border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.85)]">
              <div className="absolute inset-0 rounded-[34px] bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none z-30" />
              <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-black border border-white/10 flex flex-col justify-between shadow-inner">
                {screenMode === 'live-app' ? (
                  <CyberRushPhoneApp />
                ) : (
                  <img 
                    src={image} 
                    alt={title}
                    className="w-full h-full object-cover select-none"
                  />
                )}
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* VERTICAL PHONE HARDWARE MOCKUP (TITANIUM SMARTPHONE) */
            /* ========================================================================= */
            <div className="relative w-64 sm:w-72 lg:w-76 aspect-9/18.8 rounded-[44px] bg-[#15161c] p-3 border border-white/15 shadow-[0_35px_80px_rgba(0,0,0,0.9)]">
              {/* Static Glass Specular Tone */}
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none z-30" />
              
              <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-black border border-white/10 flex flex-col justify-between shadow-inner">
                {/* Dynamic Island */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full border border-white/10 flex items-center justify-between px-2 z-30 pointer-events-none">
                  <div className="w-1 h-1 rounded-full bg-white/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>

                {/* Inner Screen */}
                <div className="w-full h-full">
                  {screenMode === 'live-app' ? (
                    projectId === 'days-focus-flow' ? (
                      <DaysPhoneApp />
                    ) : (
                      <NidoPhoneApp />
                    )
                  ) : (
                    <img 
                      src={image} 
                      alt={title}
                      className="w-full h-full object-cover select-none"
                    />
                  )}
                </div>

                {/* Home Indicator Bar */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/30 rounded-full z-20 pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Architecture & Code Inspector */
        <div className="w-full max-w-md h-84 rounded-2xl bg-zinc-950/95 border border-white/15 p-1 shadow-2xl overflow-hidden animate-fadeIn">
          <FlutterCodeViewer codeSnippet={codeSnippet} accentColor={accentColor} />
        </div>
      )}

      {/* Minimalist Hint */}
      <div className="mt-3 text-[10px] font-mono text-zinc-500 pointer-events-none">
        Interactúa directamente con la aplicación dentro del dispositivo
      </div>
    </div>
  );
}
