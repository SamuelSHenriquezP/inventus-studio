// src/App.jsx
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { ArrowUpRight, MessageSquare, Menu, X, Code2, Copy, Check } from 'lucide-react';

import CustomCursor from './components/CustomCursor';
import OrganicSculpture3D from './components/OrganicSculpture3D';
import SimpleDeviceMockup from './components/SimpleDeviceMockup';
import InteractiveProjectRunner from './components/InteractiveProjectRunner';
import { personalInfo, projectsData, skillsList } from './Data/projectsData';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Live Local Time in GMT-5
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString('en-US', { 
        timeZone: 'America/Bogota', 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Lenis Smooth Inertial Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="relative min-h-screen bg-[#08080a] text-[#ededef] selection:bg-white selection:text-black overflow-x-hidden font-sans">
      
      {/* Minimal Custom Cursor */}
      <CustomCursor />

      {/* ========================================================================= */}
      {/* NAVBAR */}
      {/* ========================================================================= */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'py-4 bg-[#08080a]/90 backdrop-blur-xl border-b border-white/10' 
          : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" data-cursor="SAMUEL">
            <span className="font-display font-bold text-base tracking-tight text-white">
              {personalInfo.name}
            </span>
            <span className="text-[11px] font-mono text-zinc-500">
              / {personalInfo.studio}
            </span>
          </a>

          {/* Clean Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-zinc-400">
            <a href="#proyectos" className="hover:text-white transition-colors">Trabajos</a>
            <a href="#sobre-mi" className="hover:text-white transition-colors">Sobre Mí</a>
            <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
          </nav>

          {/* Quick Action */}
          <div className="flex items-center gap-4">
            <a 
              href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20conversar%20sobre%20un%20proyecto`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-mono text-white hover:bg-white hover:text-black transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              data-cursor="CHAT"
            >
              <span>Hablemos</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white md:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-6 bg-[#08080a]/95 border-b border-white/10 backdrop-blur-xl flex flex-col gap-4 font-mono text-xs uppercase tracking-wider text-zinc-300">
            <a href="#proyectos" onClick={() => setMobileMenuOpen(false)}>Trabajos Seleccionados</a>
            <a href="#sobre-mi" onClick={() => setMobileMenuOpen(false)}>Sobre Mí</a>
            <a href="#contacto" onClick={() => setMobileMenuOpen(false)}>Contacto & WhatsApp</a>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* HERO SECTION: REFINED MINIMALIST EDITORIAL */}
      {/* ========================================================================= */}
      <section className="min-h-[88vh] flex flex-col justify-center px-6 pt-36 pb-16 max-w-7xl mx-auto relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Typography Statement */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{personalInfo.role} • {personalInfo.location}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-white tracking-tight leading-[1.08]">
              Desarrollo videojuegos, aplicaciones y experiencias web con <span className="font-serif-italic font-normal text-zinc-400">estética y precisión.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 font-sans max-w-xl leading-relaxed">
              {personalInfo.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
              <a 
                href="#proyectos"
                className="px-6 py-3.5 rounded-full bg-white text-black font-bold flex items-center gap-2 hover:bg-zinc-200 transition-all cursor-pointer shadow-lg"
                data-cursor="VIEW"
              >
                <span>Ver Trabajos</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a 
                href="#sobre-mi"
                className="px-6 py-3.5 rounded-full border border-white/15 text-zinc-300 hover:text-white hover:border-white/30 transition-all"
              >
                Stack & Tecnologías
              </a>
            </div>

          </div>

          {/* Right Column: Organic Kinetic 3D Sculpture */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <OrganicSculpture3D />
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* SELECTED WORKS (Visual Mockups Grid) */}
      {/* ========================================================================= */}
      <section id="proyectos" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/5">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-1">
              Selected Works • 2024 — 2026
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Trabajos Seleccionados
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            Alterna entre vista Desktop y Móvil en cada proyecto
          </span>
        </div>

        {/* 2-Column Device Mockup Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {projectsData.map((project) => (
            <SimpleDeviceMockup
              key={project.id}
              project={project}
              onPlayDemo={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* ABOUT & SKILLS MATRIX */}
      {/* ========================================================================= */}
      <section id="sobre-mi" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
              About & Philosophy
            </span>
            
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              {personalInfo.name} <span className="text-zinc-500 font-serif-italic font-normal">/ {personalInfo.studio}</span>
            </h2>

            <p className="text-base text-zinc-300 font-sans leading-relaxed">
              Creo proyectos donde el código es limpio, los tiempos de carga son instantáneos y las interacciones se sienten naturales y vivas.
            </p>

            <div className="pt-2 font-mono text-xs text-zinc-400 space-y-2">
              <div>• Rendimiento constante a 60–120 FPS</div>
              <div>• Arquitecturas reactivas y modulares</div>
              <div>• Diseño centrado en la experiencia de usuario</div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3 font-mono text-xs">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-zinc-900 border border-white/15 text-zinc-300 hover:text-white hover:border-white/30 transition-all flex items-center gap-2"
              >
                <Code2 className="w-4 h-4" /> GitHub Repositorios
              </a>

              <a
                href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20conversar%20sobre%20un%20proyecto`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4 fill-black" /> Iniciar Chat
              </a>
            </div>
          </div>

          {/* Skills Columns */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              Stack de Tecnologías
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {skillsList.map((skill) => (
                <div 
                  key={skill.category}
                  className="p-5 rounded-2xl bg-[#0f0f13] border border-white/10 flex flex-col justify-between space-y-4 shadow-xl"
                >
                  <h3 className="text-sm font-display font-bold text-white">
                    {skill.category}
                  </h3>

                  <div className="space-y-1.5 font-mono text-[11px] text-zinc-400">
                    {skill.items.map((item) => (
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

        </div>

      </section>

      {/* ========================================================================= */}
      {/* MINIMAL FOOTER & CONTACT */}
      {/* ========================================================================= */}
      <footer id="contacto" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10 select-none">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
              Contacto
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight leading-[1.08]">
              ¿Tienes una idea en mente? <br />
              <span className="font-serif-italic font-normal text-zinc-400">Hagámosla realidad.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 font-mono text-xs">
            <a
              href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20conversar%20sobre%20un%20proyecto`}
              target="_blank"
              rel="noreferrer"
              className="px-7 py-4 rounded-full bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all cursor-pointer shadow-lg"
              data-cursor="WHATSAPP"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>Iniciar en WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={copyEmail}
              className="px-6 py-4 rounded-full bg-zinc-900 border border-white/15 text-white font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all cursor-pointer"
              data-cursor="COPY"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedEmail ? 'Email Copiado' : personalInfo.email}</span>
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span className="flex items-center gap-1.5 text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              DISPONIBLE
            </span>
            <span>•</span>
            <span>HORA LOCAL: {localTime || '19:15:00'} (GMT-5)</span>
          </div>
        </div>

      </footer>

      {/* ========================================================================= */}
      {/* FLOATING ACTION BUTTON */}
      {/* ========================================================================= */}
      <a
        href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20conversar%20sobre%20un%20proyecto`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-white text-black font-mono font-bold text-xs shadow-2xl hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all cursor-pointer group border border-black/10"
        title="Chatear en WhatsApp"
        data-cursor="CHAT"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <MessageSquare className="w-3.5 h-3.5 fill-black" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      {/* ========================================================================= */}
      {/* PLAYABLE PROJECT DEMO / GAME RUNNER MODAL */}
      {/* ========================================================================= */}
      {selectedProject && (
        <InteractiveProjectRunner 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

    </div>
  );
}