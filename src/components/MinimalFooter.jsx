// src/components/MinimalFooter.jsx
import { useState } from 'react';
import { MessageSquare, Copy, Check, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MinimalFooter({ localTime }) {
  const [copied, setCopied] = useState(false);

  const handleWhatsApp = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ffffff', '#a1a1aa', '#52525b']
    });
    const msg = "¡Hola Inventus Studio! Me gustaría conversar sobre el desarrollo de un proyecto de software para mi empresa.";
    window.open(`https://wa.me/573000000000?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('contacto@inventustech.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contacto" className="py-28 px-6 max-w-7xl mx-auto border-t border-white/10 select-none">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
        <div className="space-y-4 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
            Start a Commission
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05]">
            ¿Tienes una visión ambiciosa? <br />
            <span className="text-zinc-500 font-normal">Construyámosla.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed pt-2">
            Aceptamos un número limitado de proyectos por trimestre para garantizar dedicación técnica absoluta y calidad de nivel internacional.
          </p>
        </div>

        {/* Big Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 font-mono text-xs">
          <button
            onClick={handleWhatsApp}
            className="px-8 py-4 rounded-full bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all cursor-pointer shadow-xl"
            data-cursor="WHATSAPP"
          >
            <MessageSquare className="w-4 h-4 fill-black" />
            <span>Iniciar en WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={copyEmail}
            className="px-6 py-4 rounded-full bg-zinc-900 border border-white/15 text-white font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all cursor-pointer"
            data-cursor="COPY"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado al Portapapeles' : 'contacto@inventustech.com'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Metadata Bar */}
      <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
        <div>
          © {new Date().getFullYear()} Inventus Tech Studio. Todos los derechos reservados.
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          <span className="flex items-center gap-1.5 text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            STATUS: 100% OPERATIONAL
          </span>
          <span>•</span>
          <span>LOCAL TIME: {localTime || '18:25:00'} (GMT-5)</span>
        </div>
      </div>

    </footer>
  );
}
