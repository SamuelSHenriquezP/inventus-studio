// src/components/LiveWebShowcase.jsx
import { useState } from 'react';
import { 
  Monitor, Tablet, Smartphone, Sparkles, ArrowUpRight
} from 'lucide-react';
import { sounds } from '../utils/soundEngine';

export default function LiveWebShowcase() {
  const [deviceView, setDeviceView] = useState('desktop');
  const [activeSite, setActiveSite] = useState(0);

  const sites = [
    {
      id: 'nexus-3d',
      title: 'Nexus Global: Portal 3D & Analytics',
      client: 'Fintech & AI Analytics Corp',
      category: 'Experiencia Web 3D & Dashboard',
      description: 'Plataforma con renderizado WebGL en tiempo real, micro-animaciones con scroll inercial suave y optimización extrema para Google Lighthouse.',
      metrics: { performance: 100, accessibility: 100, seo: 100, bestPractices: 100 },
      tech: ['React 19', 'Three.js', 'Tailwind CSS v4', 'Lenis', 'Vite', 'Cloudflare Pages'],
      previewImage: '/assets/projects/nexus_3d.jpg',
      demoUrl: 'https://example.com'
    },
    {
      id: 'enterprise-cloud',
      title: 'Vanguard: Ecosistema Cloud B2B',
      client: 'Logistics & Supply Chain Int.',
      category: 'Plataforma SaaS de Alta Conversión',
      description: 'Interfaz corporativa para monitorización de flotas y telemetría distribuida con tiempos de carga sub-segundo en Cloudflare Pages.',
      metrics: { performance: 99, accessibility: 100, seo: 100, bestPractices: 100 },
      tech: ['Next.js', 'WebSockets', 'PostgreSQL', 'Docker', 'Redis'],
      previewImage: '/assets/projects/enterprise.jpg',
      demoUrl: 'https://example.com'
    }
  ];

  const currentSite = sites[activeSite];

  const handleDeviceChange = (view) => {
    sounds.playClick();
    setDeviceView(view);
  };

  const handleSiteChange = (idx) => {
    sounds.playClick();
    setActiveSite(idx);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-linear-to-b from-zinc-900/60 via-zinc-950/80 to-zinc-900/60 p-6 md:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      
      {/* Header & Site Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Desarrollo Web a Medida • 100% Responsivo</span>
          </div>
          <h3 className="text-2xl md:text-4xl font-extrabold text-white">
            Simulador de Sitios Web & Auditoría de Rendimiento
          </h3>
        </div>

        {/* Device Viewport Selector */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-900/90 border border-white/10 self-start lg:self-auto font-mono">
          <button
            onClick={() => handleDeviceChange('desktop')}
            className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              deviceView === 'desktop'
                ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
            data-cursor="DESKTOP"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            onClick={() => handleDeviceChange('tablet')}
            className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              deviceView === 'tablet'
                ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
            data-cursor="TABLET"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>

          <button
            onClick={() => handleDeviceChange('mobile')}
            className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              deviceView === 'mobile'
                ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
            data-cursor="MOBILE"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>
      </div>

      {/* Main Showcase Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
        
        {/* Left: Info & Lighthouse Scores (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex gap-2">
            {sites.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleSiteChange(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                  activeSite === idx
                    ? 'bg-zinc-800 border-cyan-400 text-cyan-300 font-bold'
                    : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-white'
                }`}
                data-cursor="SWITCH"
              >
                {s.title.split(':')[0]}
              </button>
            ))}
          </div>

          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
              {currentSite.category}
            </span>
            <h4 className="text-2xl font-bold text-white mb-2">{currentSite.title}</h4>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">{currentSite.description}</p>
          </div>

          {/* Google Lighthouse Benchmark Widget */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                Auditoría Google Lighthouse:
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 100 / 100 Score
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center font-mono">
              <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-emerald-500/30">
                <span className="text-base font-bold text-emerald-400 block">{currentSite.metrics.performance}</span>
                <span className="text-[9px] text-zinc-400 block mt-0.5">Speed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-emerald-500/30">
                <span className="text-base font-bold text-emerald-400 block">{currentSite.metrics.accessibility}</span>
                <span className="text-[9px] text-zinc-400 block mt-0.5">Acceso</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-emerald-500/30">
                <span className="text-base font-bold text-emerald-400 block">{currentSite.metrics.bestPractices}</span>
                <span className="text-[9px] text-zinc-400 block mt-0.5">Best Pr.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-emerald-500/30">
                <span className="text-base font-bold text-emerald-400 block">{currentSite.metrics.seo}</span>
                <span className="text-[9px] text-zinc-400 block mt-0.5">SEO</span>
              </div>
            </div>
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2">
            {currentSite.tech.map(t => (
              <span key={t} className="text-xs font-mono px-3 py-1 rounded-lg bg-zinc-800/80 text-zinc-300 border border-white/5">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Interactive Responsive Viewport Frame (7 cols) */}
        <div className="lg:col-span-7 flex justify-center items-center">
          <div className={`transition-all duration-500 mx-auto rounded-3xl border-2 border-zinc-700/80 bg-zinc-950 shadow-2xl overflow-hidden ${
            deviceView === 'desktop' ? 'w-full max-w-2xl h-80 sm:h-100' :
            deviceView === 'tablet' ? 'w-80 sm:w-100 h-100' :
            'w-64 h-100 rounded-[44px] border-4'
          }`}>
            
            {/* Viewport Top Header */}
            <div className="px-4 py-2.5 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="text-[10px] text-zinc-500 truncate max-w-40 sm:max-w-xs">
                https://{currentSite.id}.inventus-studio.dev
              </span>
              <span className="text-[9px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                {deviceView === 'desktop' ? '1920 × 1080' : deviceView === 'tablet' ? '768 × 1024' : '375 × 812'}
              </span>
            </div>

            {/* Simulated Live Viewport Content with Artwork */}
            <div className="h-full relative overflow-hidden group">
              <img 
                src={currentSite.previewImage} 
                alt={currentSite.title} 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
                <span className="text-[10px] text-zinc-400">
                  Despliegue Global Cloudflare ($0/mes)
                </span>
                <span className="px-3 py-1 rounded-xl bg-cyan-400 text-black font-bold flex items-center gap-1 shadow-lg text-[11px]">
                  <span>100% WebGL</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
