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
      if (!visible) setVisible(true);

      const targetEl = e.target.closest('[data-cursor]');
      if (targetEl) {
        setCursorText(targetEl.getAttribute('data-cursor') || '');
        setExpanded(true);
      } else {
        const isClickable = e.target.closest('button, a, input, [role="button"]');
        setCursorText('');
        setExpanded(Boolean(isClickable));
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
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-9999 flex items-center justify-center transition-all duration-200 ease-out will-change-transform rounded-full ${
        expanded
          ? 'w-12 h-12 bg-white text-black mix-blend-difference'
          : 'w-2 h-2 bg-white'
      }`}
    >
      {cursorText && (
        <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-black text-center">
          {cursorText}
        </span>
      )}
    </div>
  );
}
