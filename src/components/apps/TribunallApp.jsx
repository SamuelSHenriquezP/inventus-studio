// src/components/apps/TribunallApp.jsx
import { useState, useEffect } from 'react';
import { 
  Gavel, Scale, AlertTriangle, Clock, 
  RotateCcw, Sparkles, CheckCircle2, XCircle, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

const THEME = {
  fondo: '#0F0E1A',
  superficie: '#1B1930',
  borde: '#2D2A4A',
  accent: '#FFBD2E',
  accent2: '#FF9A00',
  rojoBright: '#FF4D6D',
  textoPrim: '#F2EEFF',
  textoSec: '#9B91C4'
};

const CASES = [
  {
    acusado: 'Samuel Henríquez',
    cargo: 'Compilar directo a producción un viernes a las 6:00 PM sin avisar al equipo.',
    sentencia: 'Castigo: Redactar la documentación de toda la API en Markdown durante el fin de semana.'
  },
  {
    acusado: 'Mateo (Frontend Lead)',
    cargo: 'Decir "en mi máquina sí funciona" tras romper todo el build de CI/CD.',
    sentencia: 'Castigo: Configurar Docker desde cero con ojos vendados.'
  },
  {
    acusado: 'Camila (Diseñadora UI)',
    cargo: 'Cambiar la paleta de colores y el padding a 7 píxeles a 10 minutos de la entrega.',
    sentencia: 'Castigo: Pagar las pizzas de la noche de lanzamiento.'
  }
];

export default function TribunallApp() {
  const [screen, setScreen] = useState('menu'); // 'menu' | 'trial'
  const [caseIndex, setCaseIndex] = useState(0);
  const [defenseTime, setDefenseTime] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);
  const [verdict, setVerdict] = useState(null); // 'guilty' | 'innocent'

  const currentCase = CASES[caseIndex % CASES.length];

  // 30s defense countdown
  useEffect(() => {
    let timer;
    if (timerRunning && defenseTime > 0 && !verdict) {
      timer = setInterval(() => setDefenseTime(t => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [timerRunning, defenseTime, verdict]);

  const startTrial = () => {
    setScreen('trial');
    setDefenseTime(30);
    setTimerRunning(true);
    setVerdict(null);
  };

  const handleVerdict = (type) => {
    setVerdict(type);
    setTimerRunning(false);
    if (type === 'guilty') {
      try {
        confetti({ particleCount: 35, spread: 50, colors: ['#FF4D6D', '#FFBD2E'] });
      } catch (e) {}
    }
  };

  const nextCase = () => {
    setCaseIndex(prev => prev + 1);
    setDefenseTime(30);
    setTimerRunning(true);
    setVerdict(null);
  };

  return (
    <div 
      className="w-full h-full flex flex-col font-sans select-none overflow-hidden relative p-3 justify-between"
      style={{ backgroundColor: THEME.fondo, color: THEME.textoPrim }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. MAIN MENU
      ───────────────────────────────────────────────────────────── */}
      {screen === 'menu' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1B1930] border border-[#2D2A4A] flex items-center justify-center shadow-2xl">
            <span className="text-4xl">⚖️</span>
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-widest uppercase font-mono" style={{ color: THEME.accent }}>
              TRIBUNALL
            </h1>
            <p className="text-[10px] mt-1 text-[#9B91C4]">
              Nadie es inocente aquí. El juego de juicios sociales para amigos.
            </p>
          </div>

          <div className="w-full space-y-2 pt-2">
            <button
              onClick={startTrial}
              className="w-full py-3 rounded-xl font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-xl cursor-pointer active:scale-95 transition-all text-slate-950"
              style={{ backgroundColor: THEME.accent }}
            >
              <Gavel className="w-4 h-4" />
              <span>INICIAR JUICIO LOCAL</span>
            </button>
            <span className="text-[8px] font-mono text-[#9B91C4] block">
              Pásense el teléfono entre acusados y juez
            </span>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. TRIAL SCREEN (Pantalla de Juicio)
      ───────────────────────────────────────────────────────────── */}
      {screen === 'trial' && (
        <div className="flex-1 flex flex-col justify-between overflow-y-auto custom-scroll">
          {/* Header */}
          <div className="flex items-center justify-between pb-1.5 border-b" style={{ borderColor: THEME.borde }}>
            <span className="text-[9px] font-mono uppercase text-[#FFBD2E] font-bold">
              CASO #{caseIndex + 1}
            </span>
            <div className="flex items-center gap-1 font-mono text-[9px]">
              <Clock className="w-3 h-3 text-[#FF4D6D]" />
              <span className={defenseTime < 10 ? 'text-[#FF4D6D] font-bold animate-pulse' : 'text-[#9B91C4]'}>
                {defenseTime}s para defensa
              </span>
            </div>
          </div>

          {/* Accused & Charge Card */}
          <div 
            className="p-3.5 rounded-2xl border space-y-2.5 my-2 relative overflow-hidden shadow-lg"
            style={{ backgroundColor: THEME.superficie, borderColor: THEME.borde }}
          >
            <div>
              <span className="text-[8px] font-mono uppercase text-[#FF4D6D] font-bold block">
                EL ACUSADO EN EL ESTRADO
              </span>
              <h3 className="text-base font-black text-white mt-0.5">
                {currentCase.acusado}
              </h3>
            </div>

            <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
              <span className="text-[8px] font-mono uppercase text-[#FFBD2E] font-bold block mb-0.5">
                CARGO DELICTIVO FORMAL:
              </span>
              <p className="text-[10px] leading-relaxed text-[#F2EEFF]">
                "{currentCase.cargo}"
              </p>
            </div>
          </div>

          {/* Verdict Banner if decided */}
          {verdict && (
            <div 
              className={`p-3 rounded-xl border text-center my-1 animate-bounce ${
                verdict === 'guilty' 
                  ? 'bg-rose-950/60 border-[#FF4D6D] text-rose-200' 
                  : 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 font-black text-sm">
                {verdict === 'guilty' ? <Gavel className="w-4 h-4 text-[#FF4D6D]" /> : <Sparkles className="w-4 h-4 text-emerald-400" />}
                <span>{verdict === 'guilty' ? '¡DECLARADO CULPABLE!' : '¡DECLARADO ABSUELTO!'}</span>
              </div>
              {verdict === 'guilty' && (
                <p className="text-[9px] mt-1 font-mono">{currentCase.sentencia}</p>
              )}
            </div>
          )}

          {/* Verdict Action Buttons */}
          {!verdict ? (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => handleVerdict('guilty')}
                className="py-2.5 rounded-xl font-mono text-xs font-bold bg-[#FF4D6D] text-white flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <Gavel className="w-4 h-4" />
                <span>¡CULPABLE!</span>
              </button>
              <button
                onClick={() => handleVerdict('innocent')}
                className="py-2.5 rounded-xl font-mono text-xs font-bold bg-[#2D2A4A] text-white border border-white/20 flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ABSUELTO</span>
              </button>
            </div>
          ) : (
            <div className="pt-2">
              <button
                onClick={nextCase}
                className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-slate-950 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
                style={{ backgroundColor: THEME.accent }}
              >
                <span>SIGUIENTE CASO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

