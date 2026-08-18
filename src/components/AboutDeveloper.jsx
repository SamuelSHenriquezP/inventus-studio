// src/components/AboutDeveloper.jsx
import { MessageSquare, Gamepad2, Sparkles, Cpu, Code2 } from 'lucide-react';
import { personalInfo } from '../Data/projectsData';

export default function AboutDeveloper() {
  const stackCategories = [
    {
      title: "Desarrollo de Videojuegos & 3D",
      icon: <Gamepad2 className="w-5 h-5 text-pink-400" />,
      items: ["Flame Engine", "Flutter WASM", "Three.js / WebGL", "GLSL Shaders", "CanvasKit", "Físicas Vectoriales 2D"]
    },
    {
      title: "Ingeniería Web & Frontend Creativo",
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      items: ["React 19", "GSAP ScrollTrigger", "Tailwind CSS v4", "Lenis Smooth Scroll", "Vite", "Cloudflare Edge"]
    },
    {
      title: "Mobile Nativo & Backend Cloud",
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      items: ["Flutter 3.x (iOS & Android)", "Rust FFI", "Isar DB", "WebSockets Realtime", "PostgreSQL", "Docker / Redis"]
    }
  ];

  return (
    <section id="sobre-mi" className="py-28 px-6 max-w-7xl mx-auto border-t border-white/10 select-none">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Personal Bio */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
            About the Developer & Studio
          </span>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {personalInfo.name} <span className="text-zinc-500">/ {personalInfo.studioName}</span>
          </h2>

          <p className="text-base text-zinc-300 font-sans leading-relaxed">
            {personalInfo.tagline} Me enfoco en construir software con física interactiva, animaciones fluidas y experiencias memorables donde el diseño y la ingeniería se unen.
          </p>

          <p className="text-sm text-zinc-400 font-sans leading-relaxed">
            Cada videojuego, aplicación o portal web que desarrollo está optimizado para funcionar a 60–120 FPS sin fricción técnica, con arquitecturas limpias y código 100% mantenible.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-zinc-900 border border-white/15 text-zinc-300 hover:text-white hover:border-white/40 transition-all flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" /> GitHub Repositorios
            </a>

            <a
              href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20conversar%20sobre%20un%20proyecto`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg"
            >
              <MessageSquare className="w-4 h-4 fill-black" /> Chatear en WhatsApp
            </a>
          </div>
        </div>

        {/* Right Column: Stack & Technologies Matrix */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold block">
              Stack de Tecnologías & Herramientas
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stackCategories.map((cat) => (
                <div 
                  key={cat.title}
                  className="p-5 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col justify-between space-y-4 shadow-xl"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-3">
                      {cat.icon}
                    </div>
                    <h3 className="text-sm font-bold text-white mb-3">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="space-y-1.5 font-mono text-[11px] text-zinc-400">
                    {cat.items.map((item) => (
                      <div key={item} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-zinc-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Badge */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{personalInfo.availability}</span>
            </div>
            <span className="text-zinc-500 hidden sm:inline">{personalInfo.location}</span>
          </div>

        </div>

      </div>

    </section>
  );
}
