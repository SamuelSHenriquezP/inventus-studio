import { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { ChevronUp, ChevronDown } from 'lucide-react';

import HeroSection from './sections/HeroSection';
import ProjectScreenStage from './ProjectScreenStage';
import MoreProjectsSection from './sections/MoreProjectsSection';
import AboutStackSection from './sections/AboutStackSection';
import ContactSection from './sections/ContactSection';

export default function FullscreenDeck({ 
  projects, 
  onPlayDemo, 
  onSectionChange, 
  activeSectionIndex, 
  setActiveSectionIndex,
  isModalOpen = false
}) {
  const deckRef = useRef(null);
  const slidesRef = useRef([]);
  const touchStartY = useRef(0);
  const lastWheelTime = useRef(0);
  const currentIndexRef = useRef(activeSectionIndex);
  const activeTimelineRef = useRef(null);
  const isTransitioningRef = useRef(false);

  // Build the list of sections (Hero + Dynamic Projects + More + Stack + Contact)
  const sections = useMemo(() => {
    const list = [
      {
        id: 'hero',
        type: 'hero',
        label: 'Inicio',
        title: 'Inventus Tech Studio',
        number: '00',
        accent: '#f4f4f5',
        transitionType: 'fade-scale'
      }
    ];

    projects.forEach((proj, idx) => {
      list.push({
        id: `project-${proj.id}`,
        type: 'project',
        project: proj,
        index: idx,
        label: proj.title,
        title: proj.title,
        number: `0${idx + 1}`,
        accent: proj.accent || '#38bdf8',
        transitionType: idx % 2 === 0 ? 'lateral-slide' : 'parallax-vertical'
      });
    });

    list.push(
      {
        id: 'mas-proyectos',
        type: 'more',
        label: 'Más Proyectos',
        title: 'Trabajo Adicional',
        number: `0${projects.length + 1}`,
        accent: '#a78bfa',
        transitionType: 'parallax-vertical'
      },
      {
        id: 'sobre-mi',
        type: 'stack',
        label: 'Stack & Servicios',
        title: 'Stack & Tecnologías',
        number: `0${projects.length + 2}`,
        accent: '#d4d4d8',
        transitionType: 'parallax-vertical'
      },
      {
        id: 'contacto',
        type: 'contact',
        label: 'Contacto Directo',
        title: 'Contacto & Cotizaciones',
        number: `0${projects.length + 3}`,
        accent: '#10b981',
        transitionType: 'parallax-vertical'
      }
    );

    return list;
  }, [projects]);

  const totalSections = sections.length;
  const currentSection = sections[activeSectionIndex] || sections[0];

  // Core Slide Animator
  const animateTransition = useCallback((fromIndex, toIndex, direction) => {
    if (fromIndex === toIndex) return;

    const currentSlide = slidesRef.current[fromIndex];
    const targetSlide = slidesRef.current[toIndex];
    const transitionType = sections[toIndex]?.transitionType || 'parallax-vertical';

    if (!targetSlide) return;

    isTransitioningRef.current = true;

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }
    gsap.killTweensOf(slidesRef.current);

    if (currentSlide) {
      gsap.set(currentSlide, { display: 'flex', zIndex: 10 });
    }
    gsap.set(targetSlide, { display: 'flex', zIndex: 20 });

    const tl = gsap.timeline({
      onComplete: () => {
        slidesRef.current.forEach((slide, i) => {
          if (slide && i !== toIndex) {
            gsap.set(slide, { display: 'none', transform: 'none', opacity: 0 });
          }
        });
        if (targetSlide) {
          gsap.set(targetSlide, { opacity: 1, xPercent: 0, yPercent: 0, scale: 1 });
        }
        isTransitioningRef.current = false;
      }
    });

    activeTimelineRef.current = tl;

    if (transitionType === 'lateral-slide') {
      gsap.set(targetSlide, {
        xPercent: direction > 0 ? 30 : -30,
        yPercent: 0,
        opacity: 0,
        scale: 0.98,
      });

      if (currentSlide) {
        tl.to(currentSlide, {
          xPercent: direction > 0 ? -18 : 18,
          opacity: 0,
          scale: 0.97,
          duration: 0.65,
          ease: 'power3.inOut'
        }, 0);
      }

      tl.to(targetSlide, {
        xPercent: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out'
      }, 0.04);

    } else if (transitionType === 'fade-scale') {
      gsap.set(targetSlide, {
        xPercent: 0,
        yPercent: 0,
        opacity: 0,
        scale: 0.96,
      });

      if (currentSlide) {
        tl.to(currentSlide, {
          opacity: 0,
          scale: 1.02,
          duration: 0.65,
          ease: 'power2.inOut'
        }, 0);
      }

      tl.to(targetSlide, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out'
      }, 0.04);

    } else {
      // Parallax vertical
      gsap.set(targetSlide, {
        yPercent: direction > 0 ? 35 : -35,
        xPercent: 0,
        opacity: 0,
        scale: 0.98,
      });

      if (currentSlide) {
        tl.to(currentSlide, {
          yPercent: direction > 0 ? -18 : 18,
          opacity: 0,
          scale: 0.97,
          duration: 0.65,
          ease: 'power3.inOut'
        }, 0);
      }

      tl.to(targetSlide, {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out'
      }, 0.04);
    }
  }, [sections]);

  // Navigate to target section index
  const goToSection = useCallback((targetIndex, directionOverride = null) => {
    const currentIdx = currentIndexRef.current;
    if (targetIndex < 0 || targetIndex >= totalSections || targetIndex === currentIdx) {
      return;
    }

    const direction = directionOverride !== null 
      ? directionOverride 
      : targetIndex > currentIdx ? 1 : -1;

    currentIndexRef.current = targetIndex;
    setActiveSectionIndex(targetIndex);

    if (onSectionChange) {
      onSectionChange(sections[targetIndex]);
    }

    animateTransition(currentIdx, targetIndex, direction);
  }, [totalSections, onSectionChange, setActiveSectionIndex, sections, animateTransition]);

  // Listen to external activeSectionIndex changes (e.g. from NavigationRail or Navbar)
  useEffect(() => {
    if (activeSectionIndex !== currentIndexRef.current) {
      const fromIdx = currentIndexRef.current;
      const toIdx = activeSectionIndex;
      currentIndexRef.current = activeSectionIndex;
      animateTransition(fromIdx, toIdx, toIdx > fromIdx ? 1 : -1);
    }
  }, [activeSectionIndex, animateTransition]);

  const handleNext = useCallback(() => {
    const currentIdx = currentIndexRef.current;
    if (currentIdx < totalSections - 1) {
      goToSection(currentIdx + 1, 1);
    }
  }, [totalSections, goToSection]);

  const handlePrev = useCallback(() => {
    const currentIdx = currentIndexRef.current;
    if (currentIdx > 0) {
      goToSection(currentIdx - 1, -1);
    }
  }, [goToSection]);

  // Wheel Listener
  useEffect(() => {
    const handleWheel = (e) => {
      // 1. If any modal is active or body scroll is locked, prevent slide transition
      if (
        isModalOpen ||
        document.body.style.overflow === 'hidden' ||
        document.querySelector('[data-modal="true"], [role="dialog"], .modal-backdrop, .modal-container')
      ) {
        return;
      }

      // 2. Prevent changing page if mouse is inside any modal, 3D canvas, app screen, or interactive area
      if (
        e.target.closest(
          '[data-modal], [data-prevent-slide], [role="dialog"], .fixed.z-50, .modal-container, .modal-backdrop, .mockup-interactive, .scrollable-content, .code-viewer-container, canvas, .interactive-screen, [data-interactive]'
        )
      ) {
        return;
      }

      // 3. If current slide has internal scrollable overflow, allow scrolling inside before changing slide
      const currentSlideWrapper = slidesRef.current[currentIndexRef.current];
      const scrollableChild = currentSlideWrapper?.querySelector('.overflow-y-auto, [data-scrollable="true"]') || currentSlideWrapper;
      if (scrollableChild && scrollableChild.scrollHeight > scrollableChild.clientHeight + 15) {
        const atBottom = scrollableChild.scrollTop + scrollableChild.clientHeight >= scrollableChild.scrollHeight - 20;
        const atTop = scrollableChild.scrollTop <= 20;

        if (e.deltaY > 0 && !atBottom) {
          return; // Allow native scroll down inside slide
        }
        if (e.deltaY < 0 && !atTop) {
          return; // Allow native scroll up inside slide
        }
      }

      const now = Date.now();
      if (now - lastWheelTime.current < 400) {
        return;
      }

      if (Math.abs(e.deltaY) > 15) {
        lastWheelTime.current = now;
        if (e.deltaY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleNext, handlePrev, isModalOpen]);

  // Touch Gesture Listeners
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (
        isModalOpen ||
        document.body.style.overflow === 'hidden' ||
        document.querySelector('[data-modal="true"], [role="dialog"], .modal-backdrop, .modal-container') ||
        e.target.closest(
          '[data-modal], [data-prevent-slide], [role="dialog"], .fixed.z-50, .modal-container, .modal-backdrop, .mockup-interactive, .scrollable-content, .code-viewer-container, canvas, .interactive-screen, [data-interactive]'
        )
      ) {
        touchStartY.current = null;
        return;
      }
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (touchStartY.current === null) return;
      if (
        isModalOpen ||
        document.body.style.overflow === 'hidden' ||
        document.querySelector('[data-modal="true"], [role="dialog"], .modal-backdrop, .modal-container')
      ) {
        return;
      }
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;

      // Check if current slide has internal scrollable child
      const currentSlideWrapper = slidesRef.current[currentIndexRef.current];
      const scrollableChild = currentSlideWrapper?.querySelector('.overflow-y-auto, [data-scrollable="true"]') || currentSlideWrapper;
      if (scrollableChild && scrollableChild.scrollHeight > scrollableChild.clientHeight + 15) {
        const atBottom = scrollableChild.scrollTop + scrollableChild.clientHeight >= scrollableChild.scrollHeight - 25;
        const atTop = scrollableChild.scrollTop <= 25;

        if (diffY > 0 && !atBottom) {
          return; // Allow native touch scroll down inside slide
        }
        if (diffY < 0 && !atTop) {
          return; // Allow native touch scroll up inside slide
        }
      }

      if (Math.abs(diffY) > 50) {
        if (diffY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleNext, handlePrev, isModalOpen]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        isModalOpen ||
        document.body.style.overflow === 'hidden' ||
        document.querySelector('[data-modal="true"], [role="dialog"], .modal-backdrop, .modal-container')
      ) {
        return;
      }

      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        handleNext();
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSection(totalSections - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, goToSection, totalSections, isModalOpen]);

  return (
    <div 
      ref={deckRef}
      className="relative w-screen h-screen overflow-hidden select-none bg-black"
    >
      {/* Full-Screen Slides Stack */}
      {sections.map((sec, idx) => {
        const isActive = idx === activeSectionIndex;
        return (
          <div
            key={sec.id}
            id={sec.id}
            ref={(el) => (slidesRef.current[idx] = el)}
            className={`absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center custom-scroll ${
              isActive ? 'z-10 flex' : 'hidden'
            }`}
            style={{
              willChange: 'transform, opacity'
            }}
          >
            {sec.type === 'hero' && (
              <HeroSection 
                isActive={isActive}
                onExploreWorks={() => goToSection(1)} 
                onExploreStack={() => goToSection(projects.length + 2)}
              />
            )}

            {sec.type === 'project' && (
              <ProjectScreenStage 
                project={sec.project}
                index={sec.index}
                total={projects.length}
                onPlayDemo={onPlayDemo}
                isActive={isActive}
              />
            )}

            {sec.type === 'more' && (
              <MoreProjectsSection isActive={isActive} />
            )}

            {sec.type === 'stack' && (
              <AboutStackSection isActive={isActive} />
            )}

            {sec.type === 'contact' && (
              <ContactSection isActive={isActive} />
            )}
          </div>
        );
      })}

      {/* ========================================================================= */}
      {/* BOTTOM CONTROL DOCK */}
      {/* ========================================================================= */}
      <div className="fixed bottom-2.5 sm:bottom-3.5 left-3 sm:left-6 right-3 sm:right-6 z-30 flex items-center justify-between pointer-events-none">
        
        {/* Active Section Indicator */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-zinc-950/85 border border-white/10 backdrop-blur-xl shadow-2xl font-mono text-[11px] sm:text-xs text-zinc-300">
          <span 
            className="w-2 h-2 rounded-full transition-colors duration-500 shrink-0" 
            style={{ backgroundColor: currentSection.accent }}
          />
          <span className="font-semibold text-white">
            0{activeSectionIndex + 1} / 0{totalSections}
          </span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="text-zinc-400 hidden sm:inline uppercase tracking-wider text-[11px] truncate max-w-35 md:max-w-none">
            {currentSection.title}
          </span>
        </div>

        {/* Center Progress Markers (Dots) */}
        <div className="pointer-events-auto hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full bg-zinc-950/80 border border-white/10 backdrop-blur-xl shadow-2xl">
          {sections.map((sec, i) => {
            const isSelected = i === activeSectionIndex;
            return (
              <button
                key={sec.id}
                onClick={() => goToSection(i)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isSelected 
                    ? 'w-5 h-1.5 bg-white shadow-sm' 
                    : 'w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-400'
                }`}
                style={isSelected ? { backgroundColor: sec.accent } : {}}
                title={`0${i + 1} - ${sec.label}`}
                data-cursor={`0${i + 1}`}
              />
            );
          })}
        </div>

        {/* Up / Down Navigation Buttons */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 font-mono text-xs">
          <button
            onClick={handlePrev}
            disabled={activeSectionIndex === 0}
            className="p-1.5 sm:p-2.5 rounded-full bg-zinc-950/85 border border-white/10 text-zinc-400 hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer backdrop-blur-xl shadow-xl active:scale-95"
            title="Pantalla Anterior [↑]"
            data-cursor="PREV"
          >
            <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={handleNext}
            disabled={activeSectionIndex === totalSections - 1}
            className="p-1.5 sm:p-2.5 rounded-full bg-zinc-950/85 border border-white/10 text-zinc-400 hover:text-white disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer backdrop-blur-xl shadow-xl active:scale-95"
            title="Siguiente Pantalla [↓]"
            data-cursor="NEXT"
          >
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
