// src/components/SimpleDeviceMockup.jsx
import { useState } from 'react';
import { Monitor, Smartphone, Play, ArrowUpRight, Code2 } from 'lucide-react';

export default function SimpleDeviceMockup({ project, onPlayDemo }) {
  const [deviceType, setDeviceType] = useState('desktop');

  return (
    <div className="group rounded-3xl bg-[#0f0f13] border border-white/10 p-6 sm:p-8 transition-all duration-500 hover:border-white/20 shadow-xl flex flex-col justify-between space-y-6">
      
      {/* Top Header of the Card */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-zinc-500">
            {project.number}
          </span>
          <div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-zinc-200 transition-colors">
              {project.title}
            </h3>
            <span className="text-xs font-mono text-zinc-400">
              {project.subtitle}
            </span>
          </div>
        </div>

        {/* Device Switcher Pills */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-900 border border-white/10 font-mono text-xs">
          <button
            onClick={() => setDeviceType('desktop')}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              deviceType === 'desktop' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
            }`}
            title="Vista Escritorio"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceType('mobile')}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              deviceType === 'mobile' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
            }`}
            title="Vista Móvil"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MINIMALIST VISUAL DEVICE FRAME */}
      {/* ========================================================================= */}
      <div className="relative flex items-center justify-center py-4 overflow-hidden">
        
        {deviceType === 'desktop' ? (
          /* Clean Browser Mockup */
          <div className="w-full rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden shadow-2xl transition-all duration-500">
            {/* Browser Header */}
            <div className="px-4 py-2.5 bg-zinc-900/80 border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              </div>
              <span className="truncate max-w-xs text-zinc-400">
                https://{project.id}.demo
              </span>
              <span className="text-[10px] text-zinc-600">60 FPS</span>
            </div>

            {/* Screen Image with subtle hover zoom */}
            <div className="relative aspect-16/10 overflow-hidden group/img">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover/img:scale-104 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors" />

              {/* Overlay Play Button */}
              <button
                onClick={() => onPlayDemo(project)}
                className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-white text-black font-mono font-bold text-xs flex items-center gap-1.5 shadow-xl hover:bg-zinc-200 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>{project.demoType === 'game' ? 'Jugar Demo' : 'Ver Demo'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Clean Mobile Mockup */
          <div className="w-64 rounded-[36px] bg-zinc-950 border-4 border-zinc-800 p-2 shadow-2xl transition-all duration-500">
            <div className="relative rounded-[28px] overflow-hidden aspect-9/18 bg-zinc-900 border border-white/5 flex flex-col justify-between">
              {/* Screen Top Pill */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-10" />

              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover" 
              />

              <button
                onClick={() => onPlayDemo(project)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white text-black font-mono font-bold text-[11px] flex items-center gap-1.5 shadow-xl whitespace-nowrap hover:bg-zinc-200 transition-all cursor-pointer z-10"
              >
                <Play className="w-3 h-3 fill-black" />
                <span>{project.demoType === 'game' ? 'Jugar en Móvil' : 'Probar App'}</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Description & Tags */}
      <div className="space-y-4">
        <p className="text-sm text-zinc-400 leading-relaxed font-sans">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5 font-mono text-xs">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 text-[11px]"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Código</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

    </div>
  );
}
