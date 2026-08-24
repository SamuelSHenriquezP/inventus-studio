import { useState, useCallback, lazy, Suspense } from 'react';
import { MessageSquare, Menu, X } from 'lucide-react';

import CustomCursor from './components/CustomCursor';
import NavigationRail from './components/NavigationRail';
import FullscreenDeck from './components/FullscreenDeck';

const InteractiveProjectRunner = lazy(() => import('./components/InteractiveProjectRunner'));

import { personalInfo, projectsData } from './Data/projectsData';
import { sounds } from './utils/soundEngine';

export default function App() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    sounds.playClick();
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.setMuted(!next);
  };

  const handleSelectSection = useCallback((index) => {
    sounds.playClick();
    setMobileMenuOpen(false);
    setActiveSectionIndex(index);
  }, []);

  // Determine current active project or section theme
  const currentProject = activeSectionIndex >= 1 && activeSectionIndex <= projectsData.length
    ? projectsData[activeSectionIndex - 1]
    : null;

  return (
    <div className="relative w-full min-h-screen md:w-screen md:h-screen md:overflow-hidden bg-[#050508] text-[#ededef] selection:bg-white selection:text-black font-sans">
      
      {/* Tactile Custom Cursor */}
      <CustomCursor />

      {/* Floating Vertical Navigation Rail (Desktop) */}
      <NavigationRail 
        projects={projectsData} 
        activeSectionIndex={activeSectionIndex}
        onSelectSection={handleSelectSection}
      />

      {/* ========================================================================= */}
      {/* NAVBAR / HEADER */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-40 py-2.5 sm:py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-10 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleSelectSection(0)}
            className="flex items-center gap-2 group cursor-pointer text-left" 
            data-cursor="INICIO"
          >
            <span 
              className="w-2 h-2 rounded-full transition-all duration-500 bg-white group-hover:scale-125 shrink-0"
            />
            <span className="font-display font-extrabold text-sm sm:text-base md:text-lg tracking-tight text-white whitespace-nowrap">
              {personalInfo.studio}
            </span>
            <span className="text-[12px] font-mono text-zinc-400 hidden sm:inline">
              / {personalInfo.name}
            </span>
          </button>

          {/* Dynamic Active Section Pill in Navbar */}
          {currentProject && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span className="text-zinc-400">PROYECTO:</span>
              <span className="font-bold text-zinc-200">{currentProject.title}</span>
            </div>
          )}

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-zinc-400">
            <button
              onClick={() => handleSelectSection(1)}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeSectionIndex >= 1 && activeSectionIndex <= projectsData.length ? 'text-white font-bold' : ''
              }`}
              data-cursor="PROYECTOS"
            >
              Proyectos
            </button>
            <button
              onClick={() => handleSelectSection(projectsData.length + 1)}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeSectionIndex === projectsData.length + 1 ? 'text-white font-bold' : ''
              }`}
              data-cursor="MÁS"
            >
              Más Proyectos
            </button>
            <button
              onClick={() => handleSelectSection(projectsData.length + 2)}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeSectionIndex === projectsData.length + 2 ? 'text-white font-bold' : ''
              }`}
              data-cursor="STACK"
            >
              Stack & Servicios
            </button>
            <button
              onClick={() => handleSelectSection(projectsData.length + 3)}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeSectionIndex === projectsData.length + 3 ? 'text-white font-bold' : ''
              }`}
              data-cursor="CONTACTO"
            >
              Contacto
            </button>
          </nav>

          {/* Direct WhatsApp CTA */}
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs">
            <a
              href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20vi%20tu%20portafolio%20y%20quiero%20cotizar%20un%20proyecto`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all shadow-md active:scale-95 text-xs whitespace-nowrap"
              data-cursor="WHATSAPP"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-black shrink-0" />
              <span>Conversar</span>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => { sounds.playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
              className="md:hidden p-1.5 sm:p-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 cursor-pointer"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-6 bg-zinc-950/98 border-b border-white/10 backdrop-blur-2xl flex flex-col gap-4 font-mono text-sm animate-in slide-in-from-top-4 duration-200">
            <button
              onClick={() => handleSelectSection(0)}
              className="text-left text-zinc-300 hover:text-white py-1 flex items-center justify-between"
            >
              <span>00. Inicio</span>
            </button>
            <div className="space-y-1.5 pl-2 border-l border-white/10">
              {projectsData.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectSection(idx + 1)}
                  className="text-left text-xs text-zinc-400 hover:text-white block py-1"
                >
                  0{idx + 1}. {p.title}
                </button>
              ))}
            </div>
            <div className="pt-2 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => handleSelectSection(projectsData.length + 1)}
                className="text-left text-zinc-300 hover:text-white py-1"
              >
                Más Proyectos
              </button>
              <button
                onClick={() => handleSelectSection(projectsData.length + 2)}
                className="text-left text-zinc-300 hover:text-white py-1"
              >
                Stack & Servicios
              </button>
              <button
                onClick={() => handleSelectSection(projectsData.length + 3)}
                className="text-left text-zinc-300 hover:text-white py-1"
              >
                Contacto Directo
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* MASTER FULLSCREEN SECTION DECK */}
      {/* ========================================================================= */}
      <FullscreenDeck 
        projects={projectsData}
        activeSectionIndex={activeSectionIndex}
        setActiveSectionIndex={setActiveSectionIndex}
        onPlayDemo={(p) => setSelectedProject(p)}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        isModalOpen={!!selectedProject}
      />

      {/* ========================================================================= */}
      {/* PLAYABLE INTERACTIVE RUNNER MODAL */}
      {/* ========================================================================= */}
      {selectedProject && (
        <Suspense fallback={null}>
          <InteractiveProjectRunner
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </Suspense>
      )}

    </div>
  );
}