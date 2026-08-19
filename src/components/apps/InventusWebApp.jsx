import { useState } from 'react';
import { Terminal } from 'lucide-react';

const SECTIONS = [
  { id: 'hero', label: 'Inicio', accent: '#ffffff' },
  { id: 'nido', label: 'LoveCost / Nido', accent: '#10b981' },
  { id: 'serviintel', label: 'ServiIntel', accent: '#38bdf8' },
  { id: 'days', label: 'Days: focus.flow', accent: '#8B9A86' },
  { id: 'cyber', label: 'Cyber Rush', accent: '#f43f5e' },
  { id: 'stack', label: 'Stack & Servicios', accent: '#a1a1aa' },
];

const STACK = ['React 19', 'Vite 8', 'GSAP 3', 'Tailwind v4', 'Three.js'];

export default function InventusWebApp() {
  const [activeSection, setActiveSection] = useState(0);
  const [buildOutput, setBuildOutput] = useState([
    '> inventus-studio@0.0.0 build',
    '> vite build',
    '✓ 2368 modules transformed.',
    'dist/index.html   1.56 kB │ gzip: 0.86 kB',
    'dist/assets/*.js  1,285 kB │ gzip: 359 kB',
    '✓ built in 659ms',
  ]);

  const runBuild = () => {
    setBuildOutput(['Building...', 'Transforming modules...']);
    setTimeout(() => {
      setBuildOutput([
        '> inventus-studio@0.0.0 build',
        '> vite build',
        `✓ ${2368 + Math.floor(Math.random() * 5)} modules transformed.`,
        `dist/assets/*.js  ${(1280 + Math.random() * 10).toFixed(0)} kB │ gzip: 359 kB`,
        `✓ built in ${(600 + Math.random() * 200).toFixed(0)}ms`,
      ]);
    }, 1200);
  };

  const section = SECTIONS[activeSection];

  return (
    <div className="w-full h-full bg-[#0d0e14] text-white font-mono text-[10px] flex flex-col select-none overflow-hidden">
      {/* Menubar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#111218] border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2 text-[10px]">
          <span className="font-bold text-white">Inventus Studio</span>
          <span className="text-zinc-500">— localhost:5173</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/80" />
          <span className="w-2 h-2 rounded-full bg-amber-500/80" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar - Sections */}
        <div className="w-28 shrink-0 border-r border-white/10 flex flex-col bg-[#0a0b0f]">
          <div className="px-2 py-1.5 text-[9px] text-zinc-500 uppercase tracking-wider border-b border-white/5">Secciones</div>
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(i)}
              className={`text-left px-2 py-1.5 text-[9px] transition-all cursor-pointer border-l-2 ${
                i === activeSection
                  ? 'text-white bg-white/5 border-l-white/60'
                  : 'text-zinc-500 border-l-transparent hover:text-zinc-300 hover:bg-white/2'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Right - Content Preview */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Section Preview */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: section.accent }} />
              <span className="text-white font-bold text-[11px]">{section.label}</span>
            </div>
            <div className="text-[9px] text-zinc-400 space-y-1 pl-3 border-l border-white/10">
              <div>accent: <span style={{ color: section.accent }}>{section.accent}</span></div>
              <div>transition: parallax-vertical</div>
              <div>layout: editorial 12-col grid</div>
            </div>
            <div className="pt-2 border-t border-white/10">
              <div className="text-[9px] text-zinc-400 mb-1.5">Tech Stack</div>
              <div className="flex flex-wrap gap-1">
                {STACK.map(t => (
                  <span key={t} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[8px] text-zinc-300">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Build Terminal */}
          <div className="border-t border-white/10 bg-black/40 p-2 shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-[9px] text-zinc-400">
                <Terminal className="w-3 h-3" />
                <span>Terminal</span>
              </div>
              <button
                onClick={runBuild}
                className="px-2 py-0.5 rounded text-[8px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-pointer hover:bg-emerald-500/30 transition-all"
              >
                npm run build
              </button>
            </div>
            <div className="space-y-0.5 text-[8px] font-mono">
              {buildOutput.map((line, i) => (
                <div
                  key={i}
                  className={line.startsWith('✓') ? 'text-emerald-400' : line.startsWith('>') ? 'text-amber-400' : 'text-zinc-400'}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
