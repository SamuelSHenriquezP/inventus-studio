// src/components/apps/AlumaCandlesApp.jsx
import { useState } from 'react';
import { 
  Sparkles, Flame, Leaf, Wind, Clock, 
  ChevronRight, Heart, ShoppingBag, Send
} from 'lucide-react';

const CANDLES = [
  {
    id: 'c1',
    name: 'Ámbar Cálido & Vainilla Bourbon',
    subtitle: 'Cera 100% Soja Botánica (220g)',
    price: '$45.000 COP',
    notes: 'Vainilla especiada, madera de cedro, resina de ámbar.',
    hours: '45 horas',
    color: '#D4A373'
  },
  {
    id: 'c2',
    name: 'Eucalipto Andino & Romero',
    subtitle: 'Esencias Botánicas Puras (220g)',
    price: '$48.000 COP',
    notes: 'Hojas de eucalipto fresco, alcanfor, romero silvestre.',
    hours: '48 horas',
    color: '#3E6B61'
  },
  {
    id: 'c3',
    name: 'Lavanda Silvestre & Miel',
    subtitle: 'Relajación & Calma Nocturna (200g)',
    price: '$42.000 COP',
    notes: 'Flores de lavanda francesa, cera de abejas, flor de azahar.',
    hours: '40 horas',
    color: '#9C8EB9'
  }
];

export default function AlumaCandlesApp() {
  const [selectedCandle, setSelectedCandle] = useState(CANDLES[0]);
  const [likes, setLikes] = useState({});
  const [quoteSent, setQuoteSent] = useState(false);

  const toggleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleQuote = () => {
    setQuoteSent(true);
    setTimeout(() => setQuoteSent(false), 3000);
  };

  return (
    <div className="w-full h-full flex flex-col font-serif select-none overflow-hidden relative bg-[#FAF7F2] text-[#2A2B2A]">
      {/* Top Editorial Nav */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[#3E6B61]/15 bg-[#FAF7F2]">
        <div className="flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-[#3E6B61] fill-current" />
          <span className="text-sm font-bold tracking-widest uppercase text-[#3E6B61]">
            ALUMA
          </span>
        </div>
        <span className="text-[8px] font-sans tracking-widest uppercase text-stone-500">
          VELAS ARTESANALES
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto custom-scroll p-3 space-y-3 font-sans">
        {/* Editorial Hero */}
        <div className="p-3.5 rounded-2xl bg-[#3E6B61] text-white shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[8px] tracking-widest uppercase font-mono text-emerald-200 block mb-1">
              EDICIÓN BOTÁNICA 2026
            </span>
            <h2 className="text-base sm:text-lg font-serif italic leading-tight">
              Detalles que iluminan tus momentos más especiales
            </h2>
            <p className="text-[9.5px] text-emerald-100/80 mt-1 leading-relaxed">
              Velas artesanales de cera vegetal vertidas a mano para armonizar tus espacios.
            </p>
          </div>
        </div>

        {/* Benefits Strip */}
        <div className="flex justify-between items-center px-1 text-[8px] font-mono text-[#3E6B61]">
          <div className="flex items-center gap-1">
            <Leaf className="w-3 h-3" />
            <span>100% Cera Vegetal</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-3 h-3" />
            <span>Sin Toxinas</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>+45h Llama Limpia</span>
          </div>
        </div>

        {/* Candle Collection Cards */}
        <div className="space-y-2">
          <span className="text-[8.5px] font-mono uppercase tracking-wider text-stone-500 block">
            COLECCIÓN BOTÁNICA
          </span>

          {CANDLES.map(c => {
            const isSelected = selectedCandle.id === c.id;
            return (
              <div 
                key={c.id}
                onClick={() => setSelectedCandle(c)}
                className={`p-3 rounded-xl border transition-all cursor-pointer shadow-xs ${
                  isSelected ? 'border-[#3E6B61] bg-white ring-1 ring-[#3E6B61]/30' : 'border-stone-200 bg-white/70 hover:bg-white'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-serif font-bold text-stone-900 leading-tight">
                      {c.name}
                    </h3>
                    <span className="text-[8.5px] text-stone-500 font-sans block mt-0.5">
                      {c.subtitle}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(c.id);
                    }}
                    className="p-1 cursor-pointer"
                  >
                    <Heart className={`w-3.5 h-3.5 ${likes[c.id] ? 'text-rose-500 fill-current' : 'text-stone-400'}`} />
                  </button>
                </div>

                <p className="text-[9px] text-stone-600 font-serif italic mt-1.5 leading-snug">
                  Notas: {c.notes}
                </p>

                <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-stone-100 font-mono text-[9px]">
                  <span className="text-stone-500">{c.hours}</span>
                  <span className="font-bold text-[#3E6B61] text-xs">{c.price}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote Action */}
        <div className="pt-1">
          <button
            onClick={handleQuote}
            className="w-full py-2.5 rounded-xl bg-[#3E6B61] text-white font-sans text-xs font-bold flex items-center justify-center gap-1.5 shadow-md hover:bg-[#2D4E47] active:scale-98 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{quoteSent ? '¡Solicitud enviada a WhatsApp!' : 'Cotizar esta vela por WhatsApp'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
