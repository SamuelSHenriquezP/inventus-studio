// src/components/sections/ContactSection.jsx
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, MessageSquare, Copy, Check, Clock, Sparkles } from 'lucide-react';
import { personalInfo } from '../../Data/projectsData';
import { sounds } from '../../utils/soundEngine';

export default function ContactSection({ isActive = true }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const footerRef = useRef(null);
  const titleRef = useRef(null);

  // Live Local Time in GMT-5 (Bogotá)
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

  useEffect(() => {
    const el = footerRef.current;
    if (!el || !isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.05 });

      // Badge & Status
      tl.fromTo(
        el.querySelectorAll('.contact-badge-anim'),
        { opacity: 0, y: -18, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' },
        0
      );

      // Character 3D Title cascade
      const line1Chars = el.querySelectorAll('.contact-line1-char');
      const line2Chars = el.querySelectorAll('.contact-line2-char');

      if (line1Chars.length) {
        tl.fromTo(
          line1Chars,
          {
            opacity: 0,
            y: 40,
            rotateX: -75,
            rotateY: 10,
            transformOrigin: '50% 100% -25px',
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            filter: 'blur(0px)',
            duration: 0.55,
            stagger: 0.015,
            ease: 'back.out(1.5)',
          },
          0.05
        );
      }

      if (line2Chars.length) {
        tl.fromTo(
          line2Chars,
          {
            opacity: 0,
            y: 45,
            rotateX: -85,
            scale: 0.85,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.55,
            stagger: 0.015,
            ease: 'back.out(1.7)',
          },
          0.15
        );
      }

      // Paragraph & Details
      tl.fromTo(
        el.querySelectorAll('.contact-text-anim'),
        { opacity: 0, y: 20, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' },
        0.2
      );

      // CTA Action Buttons
      tl.fromTo(
        el.querySelectorAll('.contact-action-anim'),
        { opacity: 0, y: 25, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08, ease: 'back.out(1.8)' },
        0.22
      );

      // Bottom Footer Bar
      tl.fromTo(
        el.querySelectorAll('.contact-footer-bar'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
        0.35
      );
    }, el);

    return () => ctx.revert();
  }, [isActive]);

  const copyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    sounds.playSuccess();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const line1 = "¿Tienes un proyecto en mente?".split("");
  const line2 = "Construyámoslo con precisión técnica.".split("");

  return (
    <footer 
      id="contacto"
      ref={footerRef}
      className="w-full h-full min-h-screen flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 pt-24 sm:pt-28 pb-16 relative select-none overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 100% 100% at 50% 20%, #061c14 0%, #030e0a 55%, #010403 100%)'
      }}
    >
      {/* Background Ambient Glow */}
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto flex flex-col my-auto space-y-10 [perspective:1000px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 sm:gap-12">
          
          <div className="space-y-4 max-w-2xl">
            {/* Pulsing Availability Badge */}
            <div className="contact-badge-anim inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>07 // DISPONIBILIDAD PARA PROYECTOS 2026</span>
            </div>

            {/* Kinetic 3D Split Title */}
            <h2 ref={titleRef} className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.08] [perspective:1000px]">
              <span className="block overflow-hidden py-0.5">
                {line1.map((ch, i) => (
                  <span key={`l1-${i}`} className="contact-line1-char inline-block will-change-transform text-white">
                    {ch === ' ' ? '\u00A0' : ch}
                  </span>
                ))}
              </span>
              <span className="block overflow-hidden py-0.5 mt-1">
                {line2.map((ch, i) => (
                  <span key={`l2-${i}`} className="contact-line2-char inline-block will-change-transform text-emerald-400 drop-shadow-[0_0_18px_rgba(52,211,153,0.55)]">
                    {ch === ' ' ? '\u00A0' : ch}
                  </span>
                ))}
              </span>
            </h2>

            <p className="contact-text-anim text-sm sm:text-base text-zinc-300 font-sans max-w-lg leading-relaxed">
              Disponible para desarrollo de aplicaciones móviles nativas en Flutter, arquitecturas cloud con Firebase y plataformas de software a medida de alto impacto.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-mono text-xs">
            <a
              href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20conversar%20sobre%20un%20proyecto`}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              className="contact-action-anim px-8 py-4 rounded-full bg-emerald-400 text-black font-bold flex items-center justify-center gap-2.5 hover:bg-emerald-300 transition-all cursor-pointer shadow-[0_0_25px_rgba(52,211,153,0.4)] active:scale-95 text-xs group hover:shadow-[0_0_35px_rgba(52,211,153,0.6)]"
              data-cursor="WHATSAPP"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-black fill-black transition-transform group-hover:scale-110" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.71 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Iniciar en WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={copyEmail}
              className="contact-action-anim px-7 py-4 rounded-full bg-white/5 border border-white/20 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer text-xs active:scale-95"
              data-cursor="COPY"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedEmail ? 'Email Copiado' : personalInfo.email}</span>
            </button>
          </div>

        </div>

        {/* Footer Metadata */}
        <div className="contact-footer-bar pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <div>
            © {new Date().getFullYear()} {personalInfo.name} — {personalInfo.studio}. Todos los derechos reservados.
          </div>
          
          <div className="flex items-center gap-4 text-zinc-300">
            <span className="flex items-center gap-1.5 text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              DISPONIBLE
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.03] border border-white/10">
              <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="font-mono text-emerald-300">CARTAGENA: {localTime || '12:00:00'} (GMT-5)</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
