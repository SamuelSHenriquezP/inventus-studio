import { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import { MessageSquare, Menu, X } from 'lucide-react';

import CustomCursor from './components/CustomCursor';
import NavigationRail from './components/NavigationRail';
import FullscreenDeck from './components/FullscreenDeck';

import InteractiveProjectRunner from './components/InteractiveProjectRunner';

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

  const handlePlayDemo = useCallback((p) => {
    setSelectedProject(p);
  }, []);

  // Dynamic accent color according to current active tab/section
  const activeAccentColor = useMemo(() => {
    if (activeSectionIndex === 0) return '#ffffff'; // Inicio (Clean Silver/White)
    if (activeSectionIndex >= 1 && activeSectionIndex <= projectsData.length) {
      return projectsData[activeSectionIndex - 1]?.accent || '#38bdf8';
    }
    if (activeSectionIndex === projectsData.length + 1) return '#a78bfa'; // Más Proyectos (Violet)
    if (activeSectionIndex === projectsData.length + 2) return '#34d399'; // Stack & Servicios (Emerald/Mint)
    if (activeSectionIndex === projectsData.length + 3) return '#10b981'; // Contacto (Green)
    return '#ffffff';
  }, [activeSectionIndex]);

  return (
    <div className="relative w-full max-w-full overflow-x-hidden bg-[#050508] text-[#ededef] selection:bg-white selection:text-black font-sans md:w-screen md:h-screen md:overflow-hidden min-h-screen">
      
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
              className="w-2 h-2 rounded-full transition-all duration-500 shrink-0 group-hover:scale-125"
              style={{
                backgroundColor: activeAccentColor,
                boxShadow: `0 0 10px ${activeAccentColor}90`
              }}
            />
            <span className="font-display font-extrabold text-sm sm:text-base md:text-lg tracking-tight text-white whitespace-nowrap">
              {personalInfo.studio}
            </span>
            <span className="text-[12px] sm:text-[13px] font-mono transition-all duration-500 whitespace-nowrap flex items-center gap-1.5">
              <span className="text-zinc-500">/</span>
              <span 
                className="font-bold transition-colors duration-500 tracking-wide"
                style={{
                  color: activeAccentColor,
                  textShadow: `0 0 14px ${activeAccentColor}70`
                }}
              >
                {personalInfo.name}
              </span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-zinc-400">
            <button
              onClick={() => handleSelectSection(1)}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeSectionIndex >= 1 && activeSectionIndex <= projectsData.length ? 'font-bold' : ''
              }`}
              style={
                activeSectionIndex >= 1 && activeSectionIndex <= projectsData.length 
                  ? { color: activeAccentColor } 
                  : undefined
              }
              data-cursor="PROYECTOS"
            >
              Proyectos
            </button>
            <button
              onClick={() => handleSelectSection(projectsData.length + 1)}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeSectionIndex === projectsData.length + 1 ? 'font-bold' : ''
              }`}
              style={
                activeSectionIndex === projectsData.length + 1 
                  ? { color: activeAccentColor } 
                  : undefined
              }
              data-cursor="MÁS"
            >
              Más Proyectos
            </button>
            <button
              onClick={() => handleSelectSection(projectsData.length + 2)}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeSectionIndex === projectsData.length + 2 ? 'font-bold' : ''
              }`}
              style={
                activeSectionIndex === projectsData.length + 2 
                  ? { color: activeAccentColor } 
                  : undefined
              }
              data-cursor="STACK"
            >
              Stack & Servicios
            </button>
            <button
              onClick={() => handleSelectSection(projectsData.length + 3)}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeSectionIndex === projectsData.length + 3 ? 'font-bold' : ''
              }`}
              style={
                activeSectionIndex === projectsData.length + 3 
                  ? { color: activeAccentColor } 
                  : undefined
              }
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
              className={`text-left py-1 flex items-center justify-between ${
                activeSectionIndex === 0 ? 'font-bold' : 'text-zinc-300 hover:text-white'
              }`}
              style={activeSectionIndex === 0 ? { color: activeAccentColor } : undefined}
            >
              <span>00. Inicio</span>
            </button>
            <div className="space-y-1.5 pl-2 border-l border-white/10">
              {projectsData.map((p, idx) => {
                const isActive = activeSectionIndex === idx + 1;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectSection(idx + 1)}
                    className={`text-left text-xs block py-1 transition-colors ${
                      isActive ? 'font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                    style={isActive ? { color: p.accent || activeAccentColor } : undefined}
                  >
                    0{idx + 1}. {p.title}
                  </button>
                );
              })}
            </div>
            <div className="pt-2 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => handleSelectSection(projectsData.length + 1)}
                className={`text-left py-1 transition-colors ${
                  activeSectionIndex === projectsData.length + 1 ? 'font-bold' : 'text-zinc-300 hover:text-white'
                }`}
                style={activeSectionIndex === projectsData.length + 1 ? { color: activeAccentColor } : undefined}
              >
                Más Proyectos
              </button>
              <button
                onClick={() => handleSelectSection(projectsData.length + 2)}
                className={`text-left py-1 transition-colors ${
                  activeSectionIndex === projectsData.length + 2 ? 'font-bold' : 'text-zinc-300 hover:text-white'
                }`}
                style={activeSectionIndex === projectsData.length + 2 ? { color: activeAccentColor } : undefined}
              >
                Stack & Servicios
              </button>
              <button
                onClick={() => handleSelectSection(projectsData.length + 3)}
                className={`text-left py-1 transition-colors ${
                  activeSectionIndex === projectsData.length + 3 ? 'font-bold' : 'text-zinc-300 hover:text-white'
                }`}
                style={activeSectionIndex === projectsData.length + 3 ? { color: activeAccentColor } : undefined}
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
        onPlayDemo={handlePlayDemo}
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