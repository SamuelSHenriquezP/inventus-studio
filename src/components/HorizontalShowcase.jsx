// src/components/HorizontalShowcase.jsx
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../Data/projectsData';
import { Play, ArrowUpRight } from 'lucide-react';
import HolographicCard from './HolographicCard';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalShowcase({ onOpenProject }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    // Calculate total horizontal scroll distance
    const totalScrollWidth = container.scrollWidth - window.innerWidth + 120;

    const ctx = gsap.context(() => {
      gsap.to(container, {
        x: () => -totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalScrollWidth + 400}`,
          invalidateOnRefresh: true,
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black min-h-screen overflow-hidden select-none py-12 flex flex-col justify-center">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 w-full mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-1">
            GSAP Horizontal Reel • Desplazamiento Continuo
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Galería Horizontal de Obras
          </h2>
        </div>
        <span className="text-xs font-mono text-zinc-500">
          Desliza o haz scroll hacia abajo para avanzar &rarr;
        </span>
      </div>

      {/* Horizontal Scroll Track */}
      <div 
        ref={containerRef} 
        className="flex gap-8 px-6 sm:px-12 w-max will-change-transform items-center"
      >
        {projectsData.map((project, idx) => (
          <div
            key={project.id}
            className="w-[85vw] sm:w-[480px] md:w-[560px] shrink-0"
          >
            <HolographicCard
              onClick={() => onOpenProject(project)}
              className="group cursor-pointer rounded-3xl bg-zinc-950 border border-white/15 p-5 shadow-2xl flex flex-col justify-between"
            >
              {/* Artwork Box */}
              <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-zinc-900 border border-white/10 mb-5">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors pointer-events-none" />

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span 
                    className="text-[10px] font-mono font-bold px-3 py-1 rounded-full text-black"
                    style={{ backgroundColor: project.accentColor || '#ffffff' }}
                  >
                    {project.category}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-300 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                    0{idx + 1}
                  </span>
                </div>

                {/* Playable Demo Button */}
                <div className="absolute bottom-3 right-3">
                  <span className="px-4 py-2 rounded-full bg-white text-black font-mono font-bold text-[10px] flex items-center gap-1.5 shadow-xl hover:bg-zinc-200 transition-all">
                    <Play className="w-3 h-3 fill-black" /> Probar Demo
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2 px-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-zinc-900 border border-white/5 text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </HolographicCard>
          </div>
        ))}
      </div>

    </section>
  );
}
