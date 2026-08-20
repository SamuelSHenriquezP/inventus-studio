// src/components/CustomCursor.jsx
import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  const cursorRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      // Hide custom cursor inside mockups, code viewers, and interactive screens to prevent white circle overlay artifact
      const isInsideMockup = e.target.closest(
        '.mockup-interactive, .interactive-screen, .code-viewer-container, [data-prevent-slide], pre, code'
      );

      if (isInsideMockup) {
        setVisible(false);
        return;
      }

      setVisible(true);

      const targetEl = e.target.closest('[data-cursor]');
      if (targetEl) {
        setCursorText(targetEl.getAttribute('data-cursor') || '');
        setExpanded(true);
      } else {
        const isInteractive = e.target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer');
        setCursorText('');
        setExpanded(!!isInteractive);
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animationId;
    const render = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      animationId = requestAnimationFrame(render);
    };
    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center transition-[width,height,background-color] duration-200 ease-out will-change-transform rounded-full ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${
        expanded
          ? 'w-14 h-14 bg-white text-black shadow-lg'
          : 'w-2.5 h-2.5 bg-white shadow-sm'
      }`}
    >
      {cursorText === 'WHATSAPP' ? (
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-emerald-500 fill-emerald-500" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.71 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ) : cursorText && expanded ? (
        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-black text-center select-none px-1">
          {cursorText}
        </span>
      ) : null}
    </div>
  );
}
