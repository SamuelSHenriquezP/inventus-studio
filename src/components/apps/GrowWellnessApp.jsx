// src/components/apps/GrowWellnessApp.jsx
import { useState } from 'react';
import { 
  Sparkles, ShoppingBag, Heart, ArrowRight, 
  CheckCircle2, X, Plus, Minus, Star
} from 'lucide-react';
import confetti from 'canvas-confetti';

const PRODUCTS = [
  {
    id: 'p1',
    name: 'Botanical Radiance Serum',
    subtitle: 'Elixir Celular con Rosa Mosqueta (30ml)',
    price: 88,
    rating: 4.9,
    tag: 'Bestseller'
  },
  {
    id: 'p2',
    name: 'Silk Skin Fluid Foundation',
    subtitle: 'Base Seda con Filtro Botánico (35ml)',
    price: 115,
    rating: 4.8,
    tag: 'Alta Costura'
  },
  {
    id: 'p3',
    name: 'Nectar Radiance Balm Pot',
    subtitle: 'Bálsamo Regenerador Karité (15g)',
    price: 46,
    rating: 5.0,
    tag: 'Tratamiento'
  }
];

export default function GrowWellnessApp() {
  const [cart, setCart] = useState([]);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [isCartDrawer, setIsCartDrawer] = useState(false);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    try {
      confetti({ particleCount: 20, spread: 40, origin: { y: 0.8 } });
    } catch (e) {}
  };

  const totalCart = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="w-full h-full flex flex-col font-serif select-none overflow-hidden relative bg-[#F9F7F2] text-[#5D3A24]">
      {/* ─────────────────────────────────────────────────────────────
          1. EDITORIAL HEADER
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[#5D3A24]/10 bg-[#F9F7F2]">
        <div className="flex items-center gap-1.5">
          <span className="text-base font-bold tracking-widest uppercase font-serif text-[#5D3A24]">
            GROW
          </span>
          <span className="text-[8px] font-sans tracking-widest text-[#D9AE94] uppercase">• BOTANICALS</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsQuizOpen(true)}
            className="px-2 py-0.5 rounded-full text-[8.5px] font-sans font-bold bg-[#5D3A24]/10 text-[#5D3A24] cursor-pointer hover:bg-[#5D3A24]/15"
          >
            Skin Quiz
          </button>
          <button 
            onClick={() => setIsCartDrawer(true)}
            className="relative p-1 text-[#5D3A24] cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#5D3A24] text-white font-mono text-[7px] flex items-center justify-center font-bold">
                {cart.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CATALOG
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto custom-scroll p-3 space-y-3 font-sans">
        {/* Editorial Banner */}
        <div className="p-3.5 rounded-2xl bg-[#5D3A24] text-[#F9F7F2] shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[8px] font-mono tracking-widest uppercase text-[#D9AE94] block mb-1">
              ALTA COSMÉTICA BOTÁNICA
            </span>
            <h2 className="text-sm sm:text-base font-serif italic leading-tight">
              Despierta el resplandor biológico de tu piel
            </h2>
            <p className="text-[9.5px] text-[#F9F7F2]/80 mt-1">
              Fórmulas limpias infusionadas con extractos orgánicos certificados.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-2">
          <span className="text-[8.5px] font-mono uppercase tracking-wider text-[#5D3A24]/70 block">
            RUTINA DIARIA ESENCIAL
          </span>

          {PRODUCTS.map(p => (
            <div 
              key={p.id}
              className="p-3 rounded-xl border border-[#5D3A24]/10 bg-white shadow-xs flex items-center justify-between gap-2"
            >
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-mono uppercase text-[#D9AE94] font-bold">
                    {p.tag}
                  </span>
                  <div className="flex items-center text-amber-500 text-[8px]">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <span className="ml-0.5">{p.rating}</span>
                  </div>
                </div>
                <h3 className="text-xs font-serif font-bold text-[#5D3A24] leading-tight mt-0.5">
                  {p.name}
                </h3>
                <span className="text-[8.5px] text-stone-500 font-sans block">
                  {p.subtitle}
                </span>
                <span className="text-xs font-mono font-bold text-[#5D3A24] mt-1 block">
                  ${p.price}.00 USD
                </span>
              </div>

              <button
                onClick={() => addToCart(p)}
                className="p-2 rounded-lg bg-[#5D3A24] text-white hover:bg-[#432A1A] active:scale-95 transition-all cursor-pointer shadow-xs shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. SKIN QUIZ MODAL
      ───────────────────────────────────────────────────────────── */}
      {isQuizOpen && (
        <div className="absolute inset-0 z-40 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F9F7F2] p-4 rounded-2xl border border-[#5D3A24]/20 w-full text-center space-y-3 shadow-2xl font-sans">
            <div className="flex justify-between items-center pb-1 border-b border-[#5D3A24]/10">
              <span className="text-[9px] font-mono uppercase font-bold text-[#D9AE94]">
                DIAGNÓSTICO BOTÁNICO
              </span>
              <button onClick={() => setIsQuizOpen(false)} className="p-1 text-stone-500">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {quizStep === 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-serif font-bold text-[#5D3A24]">
                  ¿Cuál es el objetivo primordial para tu piel?
                </h4>
                <div className="space-y-1.5">
                  {['Luminosidad & Tono Uniforme', 'Hidratación Profunda', 'Calma & Cuidado Sensible'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => {
                        setQuizAnswer(opt);
                        setQuizStep(1);
                      }}
                      className="w-full py-2 px-3 rounded-lg border border-[#5D3A24]/15 bg-white text-[10px] text-[#5D3A24] font-medium hover:bg-[#5D3A24] hover:text-white transition-all cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 1 && (
              <div className="space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#5D3A24] mx-auto animate-bounce" />
                <h4 className="text-xs font-serif font-bold text-[#5D3A24]">
                  Fórmula Recomendada para ti
                </h4>
                <p className="text-[10px] text-stone-600">
                  Para tu objetivo de <strong>{quizAnswer}</strong>, te recomendamos el <strong>Botanical Radiance Serum</strong> con extracto de rosa mosqueta.
                </p>
                <button
                  onClick={() => {
                    addToCart(PRODUCTS[0]);
                    setIsQuizOpen(false);
                    setQuizStep(0);
                  }}
                  className="w-full py-2 rounded-lg bg-[#5D3A24] text-white text-xs font-bold cursor-pointer"
                >
                  Agregar a la bolsa ($88)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. CART DRAWER
      ───────────────────────────────────────────────────────────── */}
      {isCartDrawer && (
        <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-end">
          <div className="w-full bg-[#F9F7F2] p-4 rounded-t-2xl border-t border-[#5D3A24]/10 space-y-3 font-sans max-h-[80%] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-[#5D3A24]/10">
              <span className="text-xs font-bold font-serif text-[#5D3A24]">Bolsa Botánica ({cart.length})</span>
              <button onClick={() => setIsCartDrawer(false)} className="p-1 text-stone-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-[10px] text-center text-stone-500 py-4">Tu bolsa está vacía.</p>
            ) : (
              <div className="space-y-2">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-[10px] p-2 rounded-lg bg-white border border-[#5D3A24]/10">
                    <div>
                      <span className="font-bold text-[#5D3A24] block">{item.name}</span>
                      <span className="text-stone-500 font-mono">${item.price} x {item.qty}</span>
                    </div>
                    <span className="font-mono font-bold text-[#5D3A24]">${item.price * item.qty}.00</span>
                  </div>
                ))}

                <div className="pt-2 border-t border-[#5D3A24]/10 flex justify-between items-baseline">
                  <span className="text-xs font-bold">Total:</span>
                  <span className="text-sm font-mono font-black text-[#5D3A24]">${totalCart}.00 USD</span>
                </div>

                <button
                  onClick={() => setIsCartDrawer(false)}
                  className="w-full py-2 rounded-lg bg-[#5D3A24] text-white text-xs font-bold cursor-pointer hover:bg-[#432A1A]"
                >
                  Continuar al Pago
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

