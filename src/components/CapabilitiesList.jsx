// src/components/CapabilitiesList.jsx
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function CapabilitiesList() {
  const [openIndex, setOpenIndex] = useState(0);

  const capabilities = [
    {
      num: "01",
      title: "Arquitecturas Cloud & Misión Crítica",
      category: "Backend & Distributed Systems",
      desc: "Diseño y despliegue de infraestructuras escalables con sincronización bidireccional en tiempo real vía WebSockets (<85ms). Replicación de bases de datos PostgreSQL, clustering en Redis y arquitectura zero-downtime.",
      stack: ["React 19 / Next.js", "Node.js & Go", "PostgreSQL", "WebSockets", "Docker", "Redis", "AWS / GCP"]
    },
    {
      num: "02",
      title: "Desarrollo Móvil Nativo & Juegos en Flutter",
      category: "Cross-Platform High Performance",
      desc: "Aplicaciones nativas para iOS, Android y Web compiladas con el motor CanvasKit / Skia a 60-120 FPS estables. Físicas vectoriales deterministas en WebAssembly, persistencia local cifrada y sincronización offline-first.",
      stack: ["Flutter 3.x", "Dart", "Flame 2D Engine", "WebAssembly", "Riverpod / Bloc", "Isar DB", "Rust FFI"]
    },
    {
      num: "03",
      title: "Ingeniería Web 3D & Sitios Cinemáticos",
      category: "Creative Web & WebGL",
      desc: "Portales inmersivos y dashboards corporativos con Three.js, shaders GLSL personalizados y scroll inercial suave. Puntuación de 100/100 en Google Lighthouse y costos de hosting de $0.00/mes en Cloudflare Edge.",
      stack: ["React 19", "Three.js / WebGL", "Tailwind CSS v4", "Lenis Scroll", "Framer Motion", "Cloudflare Pages"]
    },
    {
      num: "04",
      title: "Ciberseguridad & Enclaves Criptográficos",
      category: "Security & Confidentiality",
      desc: "Autenticación biométrica nativa, firma de transacciones offline, almacenamiento seguro en Secure Enclave / Android KeyStore y cumplimiento riguroso de normativas SOC-2 y acuerdos NDA.",
      stack: ["Rust FFI", "AES-256 GCM", "iOS Keychain", "Android KeyStore", "FIDO2 / Biometrics"]
    }
  ];

  return (
    <section id="capacidades" className="py-28 px-6 max-w-7xl mx-auto border-t border-white/10">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Manifesto Statement */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
            Capabilities & Philosophy
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ingeniería de precisión con estética rigurosa.
          </h2>
          <p className="text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
            No usamos plantillas ni arquitecturas genéricas. Cada proyecto se diseña desde sus fundamentos matemáticos y de software para garantizar rendimiento extremo, seguridad y una experiencia memorable.
          </p>

          <div className="pt-4 font-mono text-xs text-zinc-500 space-y-2 border-t border-white/5">
            <div>• SLA: 99.99% Uptime de Producción</div>
            <div>• Código: 100% Propietario del Cliente</div>
            <div>• Velocidad: Sub-100ms Time to First Byte</div>
          </div>
        </div>

        {/* Right Column: Swiss Accordion List */}
        <div className="lg:col-span-7 divide-y divide-white/10">
          {capabilities.map((cap, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={cap.num}
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="py-6 sm:py-8 cursor-pointer select-none group"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-xs font-mono text-zinc-500 font-bold">{cap.num}</span>
                    <div>
                      <h3 className="text-lg sm:text-2xl font-bold text-white group-hover:text-zinc-300 transition-colors">
                        {cap.title}
                      </h3>
                      <span className="text-[11px] font-mono text-zinc-500 block mt-0.5">
                        {cap.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-2 rounded-full border border-white/10 text-zinc-400 group-hover:text-white group-hover:border-white/30 transition-all shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded Content */}
                {isOpen && (
                  <div className="mt-4 pt-4 pl-8 sm:pl-10 space-y-4 animate-in fade-in duration-200">
                    <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                      {cap.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cap.stack.map((s) => (
                        <span 
                          key={s} 
                          className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-zinc-900 border border-white/5 text-zinc-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
