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

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 40,
          rotateX: -60,
          rotateY: 8,
          transformOrigin: '50% 100% -20px',
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          filter: 'blur(0px)',
          duration: 0.95,
          stagger: 0.035,
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
      className={`${className} perspective-[1000px] select-none`}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-3 sm:mr-4 overflow-visible">
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
