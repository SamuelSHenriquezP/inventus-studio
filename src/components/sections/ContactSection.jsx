import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, Copy, Check, Clock, Sparkles, Smartphone, Cloud, ShieldCheck, Zap } from 'lucide-react';
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
      const tl = gsap.timeline({ delay: 0.1 });

      // Badge & Status
      tl.from(
        el.querySelectorAll('.contact-badge-anim'),
        { opacity: 0, y: -12, duration: 0.4, ease: 'power2.out', clearProps: 'all' },
        0
      );

      // Character 3D Title cascade
      const line1Chars = el.querySelectorAll('.contact-line1-char');
      const line2Chars = el.querySelectorAll('.contact-line2-char');

      if (line1Chars.length) {
        tl.from(
          line1Chars,
          {
            opacity: 0,
            y: 24,
            duration: 0.85,
            stagger: 0.035,
            ease: 'power3.out',
            clearProps: 'all',
          },
          0.04
        );
      }

      if (line2Chars.length) {
        tl.from(
          line2Chars,
          {
            opacity: 0,
            y: 24,
            scale: 0.92,
            duration: 0.85,
            stagger: 0.035,
            ease: 'power3.out',
            clearProps: 'all',
          },
          0.12
        );
      }

      // Paragraph & Details
      tl.from(
        el.querySelectorAll('.contact-text-anim'),
        { opacity: 0, y: 16, duration: 0.45, ease: 'power2.out', clearProps: 'all' },
        0.15
      );

      // CTA Action Buttons
      tl.from(
        el.querySelectorAll('.contact-action-anim'),
        { opacity: 0, y: 18, scale: 0.95, duration: 0.45, stagger: 0.06, ease: 'power2.out', clearProps: 'all' },
        0.18
      );

      // Bottom Footer Bar
      tl.from(
        el.querySelectorAll('.contact-footer-bar'),
        { opacity: 0, y: 12, duration: 0.4, ease: 'power2.out', clearProps: 'all' },
        0.25
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

  const line1Text = "¿Tienes un proyecto en mente?";
  const line2Text = "Construyámoslo con precisión técnica.";

  return (
    <section 
      id="contacto"
      ref={footerRef}
      className="w-full min-h-full flex flex-col justify-start md:justify-center px-3 sm:px-8 md:px-12 lg:px-20 pt-12 sm:pt-20 pb-12 sm:pb-16 relative select-none overflow-y-auto custom-scroll"
      style={{
        background: 'radial-gradient(ellipse 100% 100% at 50% 85%, #05140d 0%, #030a07 55%, #020503 100%)'
      }}
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute bottom-10 left-1/3 w-96 sm:w-125 h-96 sm:h-125 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto flex flex-col my-auto space-y-3 sm:space-y-6 perspective-[1000px]">
        
        {/* ========================================================================= */}
        {/* 1. MOBILE PHONE DEDICATED LAYOUT (< sm) — Rich, Full & Tailored Hub */}
        {/* ========================================================================= */}
        <div className="sm:hidden flex flex-col justify-between space-y-3.5 py-1 text-zinc-100">
          
          {/* Availability & Location Top Bar */}
          <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-mono text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-bold">09 // DISPONIBLE 2026</span>
            </div>
            <div className="flex items-center gap-1 text-zinc-400">
              <Clock className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
              <span>{localTime || '12:00:00'} (GMT-5)</span>
            </div>
          </div>

          {/* Mobile Headline */}
          <div className="space-y-1">
            <h2 className="text-xl font-display font-extrabold tracking-tight leading-snug">
              <span className="text-white block">¿Tienes un proyecto en mente?</span>
              <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)] block">
                Construyámoslo con precisión técnica.
              </span>
            </h2>
            <p className="text-[11.5px] text-zinc-300 font-sans leading-relaxed">
              Disponible para desarrollo de aplicaciones móviles nativas en Flutter, backend reactivo con Firebase y plataformas de software a medida.
            </p>
          </div>

          {/* 4 Key Specialization Cards (2x2 Grid) */}
          <div className="grid grid-cols-2 gap-1.5 pt-0.5">
            <div className="p-2 rounded-xl bg-white/4 border border-white/10 space-y-0.5">
              <div className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                <Smartphone className="w-3 h-3 text-emerald-400" />
                <span>Apps Nativas</span>
              </div>
              <div className="text-[9px] text-zinc-400 leading-tight">
                Flutter & Dart a 60/120 FPS
              </div>
            </div>

            <div className="p-2 rounded-xl bg-white/4 border border-white/10 space-y-0.5">
              <div className="text-[10px] font-mono font-bold text-sky-400 flex items-center gap-1">
                <Cloud className="w-3 h-3 text-sky-400" />
                <span>Cloud Backend</span>
              </div>
              <div className="text-[9px] text-zinc-400 leading-tight">
                Firestore & Cloud Functions
              </div>
            </div>

            <div className="p-2 rounded-xl bg-white/4 border border-white/10 space-y-0.5">
              <div className="text-[10px] font-mono font-bold text-amber-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Monetización</span>
              </div>
              <div className="text-[9px] text-zinc-400 leading-tight">
                AdMob + IAP en Google Play
              </div>
            </div>

            <div className="p-2 rounded-xl bg-white/4 border border-white/10 space-y-0.5">
              <div className="text-[10px] font-mono font-bold text-teal-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-teal-400" />
                <span>Arquitectura</span>
              </div>
              <div className="text-[9px] text-zinc-400 leading-tight">
                Clean Architecture & Offline
              </div>
            </div>
          </div>

          {/* Mobile Action Hub Cards */}
          <div className="space-y-2 pt-0.5">
            
            {/* Primary Action Card: WhatsApp */}
            <a
              href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20conversar%20sobre%20un%20proyecto`}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              className="w-full p-3 rounded-2xl bg-linear-to-r from-emerald-500/25 via-emerald-500/20 to-teal-500/25 border border-emerald-500/40 text-white flex items-center justify-between gap-3 shadow-[0_10px_30px_rgba(16,185,129,0.25)] active:scale-98 transition-transform"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-400 flex items-center justify-center text-black shadow-md shrink-0">
                  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.71 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-[11.5px] font-bold text-white font-mono flex items-center gap-1">
                    <span>Conversar en WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[9.5px] text-emerald-300/90 font-sans">
                    Respuesta rápida y cotización sin compromiso
                  </div>
                </div>
              </div>
            </a>

            {/* Secondary Email Card */}
            <button
              onClick={copyEmail}
              className="w-full p-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-zinc-200 flex items-center justify-between gap-2.5 active:scale-98 transition-transform cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 shrink-0">
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                </div>
                <div className="text-left min-w-0">
                  <div className="text-[11px] font-mono font-bold text-zinc-100 truncate">
                    {personalInfo.email}
                  </div>
                  <div className="text-[9px] text-zinc-400 font-sans">
                    {copiedEmail ? '¡Copiado al portapapeles!' : 'Toca para copiar dirección de correo'}
                  </div>
                </div>
              </div>
              <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 shrink-0">
                {copiedEmail ? 'Copiado' : 'Copiar'}
              </span>
            </button>

          </div>

          {/* Quality & Production Badge */}
          <div className="p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/15 flex items-center gap-2 text-[9.5px] font-mono text-emerald-300/90">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Código escalable, testing y publicación en tiendas de apps</span>
          </div>

          {/* Mobile Footer */}
          <div className="pt-2 border-t border-white/10 text-center font-mono text-[9.5px] text-zinc-400">
            © {new Date().getFullYear()} {personalInfo.name} — {personalInfo.studio}. Todos los derechos reservados.
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. DESKTOP & TABLET LAYOUT (>= sm) — Full Cinematic Experience */}
        {/* ========================================================================= */}
        <div className="hidden sm:flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-10">
          
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            {/* Pulsing Availability Badge */}
            <div className="contact-badge-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>09 // DISPONIBILIDAD PARA PROYECTOS 2026</span>
            </div>

            {/* Kinetic 3D Split Title with Non-Breaking Words */}
            <h2 ref={titleRef} className="text-xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight leading-[1.12] perspective-[1000px]">
              <span className="flex flex-wrap items-baseline py-0.5">
                {line1Text.split(' ').map((word, wIdx) => (
                  <span key={`w1-${wIdx}`} className="inline-block whitespace-nowrap mr-1.5 sm:mr-3">
                    {word.split('').map((char, cIdx) => (
                      <span key={`l1-${wIdx}-${cIdx}`} className="contact-line1-char inline-block will-change-transform text-white">
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
              <span className="flex flex-wrap items-baseline py-0.5 mt-0.5">
                {line2Text.split(' ').map((word, wIdx) => (
                  <span key={`w2-${wIdx}`} className="inline-block whitespace-nowrap mr-1.5 sm:mr-3">
                    {word.split('').map((char, cIdx) => (
                      <span key={`l2-${wIdx}-${cIdx}`} className="contact-line2-char inline-block will-change-transform text-emerald-400 drop-shadow-[0_0_18px_rgba(52,211,153,0.55)]">
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </h2>

            <p className="contact-text-anim text-xs sm:text-sm md:text-base text-zinc-300 font-sans max-w-lg leading-relaxed">
              Disponible para desarrollo de aplicaciones móviles nativas en Flutter, arquitecturas cloud con Firebase y plataformas de software a medida de alto impacto.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 font-mono text-xs">
            <a
              href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20conversar%20sobre%20un%20proyecto`}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              className="contact-action-anim px-6 py-3 sm:px-7 sm:py-3.5 rounded-full bg-emerald-400 text-black font-bold flex items-center justify-center gap-2 hover:bg-emerald-300 transition-all cursor-pointer shadow-[0_0_25px_rgba(52,211,153,0.4)] active:scale-95 text-xs group hover:shadow-[0_0_35px_rgba(52,211,153,0.6)]"
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
              className="contact-action-anim px-5 py-3 sm:px-6 sm:py-3.5 rounded-full bg-white/5 border border-white/20 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer text-xs active:scale-95"
              data-cursor="COPY"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedEmail ? 'Email Copiado' : personalInfo.email}</span>
            </button>
          </div>

        </div>

        {/* Footer Metadata (Desktop & Tablet) */}
        <div className="hidden sm:flex contact-footer-bar pt-6 sm:pt-8 border-t border-white/10 flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-mono text-[11px] sm:text-xs text-zinc-400">
          <div>
            © {new Date().getFullYear()} {personalInfo.name} — {personalInfo.studio}. Todos los derechos reservados.
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4 text-zinc-300">
            <span className="flex items-center gap-1.5 text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              DISPONIBLE
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/3 border border-white/10">
              <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="font-mono text-emerald-300">CARTAGENA: {localTime || '12:00:00'} (GMT-5)</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
