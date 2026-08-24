// src/components/CinematicTitle.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CinematicTitle({ 
  text, 
  className = '', 
  isActive = true,
  delay = 0.05
}) {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el || !isActive) return;

    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll('.cinematic-char');
      if (!chars.length) return;

      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: isMobile ? 20 : 40,
          rotateX: isMobile ? 0 : -60,
          rotateY: isMobile ? 0 : 8,
          transformOrigin: '50% 100% -20px',
          ...(isMobile ? {} : { filter: 'blur(8px)' }),
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          ...(isMobile ? {} : { filter: 'blur(0px)' }),
          duration: isMobile ? 0.6 : 0.95,
          stagger: isMobile ? 0.02 : 0.035,
          ease: 'power3.out',
          delay: delay,
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text, isActive, delay]);

  const words = (text || '').split(' ');

  return (
    <h2 
      ref={titleRef} 
      className={`${className} perspective-[1000px] select-none flex flex-wrap items-baseline gap-y-1`}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-1.5 sm:mr-3 overflow-visible">
          {word.split('').map((char, cIdx) => (
            <span
              key={cIdx}
              className="cinematic-char inline-block will-change-transform"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}
