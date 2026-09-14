// src/components/apps/SudokuZenApp.jsx
import { useState, useEffect } from 'react';
import { 
  Sparkles, RotateCcw, Eraser, Edit3, Lightbulb, 
  Moon, Sun, CheckCircle2, Trophy, ArrowLeft, Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

// =========================================================================
// 1. ZEN SUMI-E THEME (From Flutter lib/theme/app_theme.dart)
// =========================================================================
const THEMES = {
  light: {
    name: 'Tinta Zen',
    bg: '#F9F7F2',       // Papel washi japonés
    surface: '#FFFFFF',
    primary: '#212121',  // Tinta sumi-e
    accent: '#B71C1C',   // Sello Hanko carmesí
    highlight: '#E3F2FD', // Selección suave celeste
    sameNum: '#EDE7F6',  // Mismo número seleccionado
    borderGrid: '#8D6E63',
    borderBlock: '#3E2723',
    isDark: false
  },
  dark: {
    name: 'Noche Kyoto',
    bg: '#181818',
    surface: '#262626',
    primary: '#E0E0E0',
    accent: '#81C784',   // Bambú nocturno
    highlight: '#37474F',
    sameNum: '#263238',
    borderGrid: '#424242',
    borderBlock: '#757575',
    isDark: true
  }
};

const ZEN_QUOTES = [
  "La paciencia es el arte de la serenidad interior.",
  "En la calma de la mente, cada número encuentra su lugar.",
  "El vacío no es ausencia, es el espacio para la armonía.",
  "No apresures el paso; contempla el equilibrio de la cuadrícula."
];

// Curated 9x9 authentic Sudoku puzzle (Medium)
// 0 represents empty cell
const INITIAL_BOARD = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const SOLUTION_BOARD = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

export default function SudokuZenApp() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [board, setBoard] = useState(() => INITIAL_BOARD.map(row => [...row]));
  const [notes, setNotes] = useState(() => Array(9).fill(null).map(() => Array(9).fill([])));
  const [selectedCell, setSelectedCell] = useState([0, 2]); // [row, col]
  const [isPencilMode, setIsPencilMode] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(142);
  const [isWon, setIsWon] = useState(false);

  const t = isDarkMode ? THEMES.dark : THEMES.light;

  // Timer tick
  useEffect(() => {
    if (isWon) return;
    const interval = setInterval(() => {
      setTimerSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isWon]);

  // Format seconds to mm:ss
  const formatTime = (totalSecs) => {
    const m = Math.floor(totalSecs / 60).toString().padStart(2, '0');
    const s = (totalSecs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const [selectedR, selectedC] = selectedCell;
  const selectedVal = board[selectedR]?.[selectedC];

  // Handle number input
  const handleNumberInput = (num) => {
    if (isWon) return;
    const isGiven = INITIAL_BOARD[selectedR][selectedC] !== 0;
    if (isGiven) return;

    if (isPencilMode) {
      // Toggle note
      setNotes(prev => {
        const next = prev.map(r => r.map(c => [...c]));
        const currentNotes = next[selectedR][selectedC];
        if (currentNotes.includes(num)) {
          next[selectedR][selectedC] = currentNotes.filter(n => n !== num);
        } else {
          next[selectedR][selectedC] = [...currentNotes, num].sort();
        }
        return next;
      });
      return;
    }

    // Direct value entry
    const correctVal = SOLUTION_BOARD[selectedR][selectedC];
    if (num !== correctVal) {
      setMistakes(m => Math.min(3, m + 1));
    }

    const nextBoard = board.map(r => [...r]);
    nextBoard[selectedR][selectedC] = num;
    setBoard(nextBoard);

    // Clear notes in cell
    setNotes(prev => {
      const next = prev.map(r => r.map(c => [...c]));
      next[selectedR][selectedC] = [];
      return next;
    });

    // Check completion
    let complete = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (nextBoard[r][c] !== SOLUTION_BOARD[r][c]) {
          complete = false;
          break;
        }
      }
    }
    if (complete) {
      setIsWon(true);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
      } catch (e) {}
    }
  };

  // Erase
  const handleErase = () => {
    const isGiven = INITIAL_BOARD[selectedR][selectedC] !== 0;
    if (isGiven) return;
    setBoard(prev => {
      const next = prev.map(r => [...r]);
      next[selectedR][selectedC] = 0;
      return next;
    });
    setNotes(prev => {
      const next = prev.map(r => r.map(c => [...c]));
      next[selectedR][selectedC] = [];
      return next;
    });
  };

  // Hint
  const handleHint = () => {
    if (hintsLeft <= 0 || isWon) return;
    const isGiven = INITIAL_BOARD[selectedR][selectedC] !== 0;
    if (isGiven) return;

    setHintsLeft(h => h - 1);
    const correctVal = SOLUTION_BOARD[selectedR][selectedC];
    setBoard(prev => {
      const next = prev.map(r => [...r]);
      next[selectedR][selectedC] = correctVal;
      return next;
    });
  };

  return (
    <div 
      className="w-full h-full flex flex-col font-serif select-none overflow-hidden relative transition-colors duration-300 p-2.5 sm:p-3 justify-between"
      style={{ backgroundColor: t.bg, color: t.primary }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. TOP ZEN HEADER & QUOTE
      ───────────────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between pb-1.5 border-b" style={{ borderColor: t.borderGrid }}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-sans tracking-wide">SUDOKU ZEN</span>
            <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-[#B71C1C] text-white">
              RETO
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[9px]">
            <span className="text-zinc-500">Fallos: <strong className={mistakes > 0 ? 'text-rose-600' : ''}>{mistakes}/3</strong></span>
            <span className="text-zinc-500">{formatTime(timerSeconds)}</span>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1 rounded-full hover:bg-black/5 cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-3 h-3 text-amber-300" /> : <Moon className="w-3 h-3 text-slate-700" />}
            </button>
          </div>
        </div>

        {/* Japanese Zen Quote */}
        <p className="text-[8.5px] italic text-center py-1 text-zinc-500 line-clamp-1 border-b" style={{ borderColor: `${t.borderGrid}30` }}>
          "{ZEN_QUOTES[quoteIndex]}"
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. THE 9x9 SUDOKU BOARD (Washi Paper Grid)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-center my-auto">
        <div 
          className="grid grid-cols-9 border-2 shadow-md rounded-xs overflow-hidden"
          style={{ 
            backgroundColor: t.surface,
            borderColor: t.borderBlock
          }}
        >
          {board.map((row, r) =>
            row.map((val, c) => {
              const isSelected = selectedR === r && selectedC === c;
              const isSameRowOrCol = selectedR === r || selectedC === c;
              const isSameBlock = Math.floor(selectedR / 3) === Math.floor(r / 3) && Math.floor(selectedC / 3) === Math.floor(c / 3);
              const isSameVal = selectedVal !== 0 && val === selectedVal;
              const isGiven = INITIAL_BOARD[r][c] !== 0;
              const cellNotes = notes[r][c];

              // Block border helpers
              const borderRight = (c === 2 || c === 5) ? `2px solid ${t.borderBlock}` : `1px solid ${t.borderGrid}40`;
              const borderBottom = (r === 2 || r === 5) ? `2px solid ${t.borderBlock}` : `1px solid ${t.borderGrid}40`;

              let cellBg = t.surface;
              if (isSelected) cellBg = t.highlight;
              else if (isSameVal) cellBg = t.sameNum;
              else if (isSameRowOrCol || isSameBlock) cellBg = `${t.highlight}60`;

              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => setSelectedCell([r, c])}
                  className="w-5 h-5 sm:w-6.5 sm:h-6.5 flex items-center justify-center relative cursor-pointer text-xs sm:text-sm transition-colors"
                  style={{
                    backgroundColor: cellBg,
                    borderRight,
                    borderBottom,
                    fontWeight: isGiven ? '900' : '500',
                    color: isGiven ? t.primary : (isDarkMode ? '#81C784' : '#1565C0')
                  }}
                >
                  {val !== 0 ? (
                    <span>{val}</span>
                  ) : cellNotes.length > 0 ? (
                    <div className="grid grid-cols-3 w-full h-full p-0.5 pointer-events-none">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                        <span 
                          key={n} 
                          className="text-[5px] font-mono leading-none text-center text-zinc-400"
                        >
                          {cellNotes.includes(n) ? n : ''}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. CONTROLS BAR (Undo, Erase, Pencil, Hint)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-around py-1 border-t border-b" style={{ borderColor: `${t.borderGrid}30` }}>
        <button 
          onClick={handleErase}
          className="flex flex-col items-center gap-0.5 p-1 rounded hover:bg-black/5 cursor-pointer text-zinc-500 active:scale-95"
        >
          <Eraser className="w-3.5 h-3.5" />
          <span className="text-[7.5px] font-sans">Borrar</span>
        </button>

        <button 
          onClick={() => setIsPencilMode(!isPencilMode)}
          className={`flex flex-col items-center gap-0.5 p-1 rounded cursor-pointer transition-all active:scale-95 ${
            isPencilMode ? 'bg-[#B71C1C]/15 text-[#B71C1C] font-bold' : 'text-zinc-500 hover:bg-black/5'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span className="text-[7.5px] font-sans">Notas ({isPencilMode ? 'ON' : 'OFF'})</span>
        </button>

        <button 
          onClick={handleHint}
          disabled={hintsLeft <= 0}
          className="flex flex-col items-center gap-0.5 p-1 rounded hover:bg-black/5 cursor-pointer text-amber-600 disabled:opacity-30 active:scale-95"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span className="text-[7.5px] font-sans">Pistas ({hintsLeft})</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. NUMPAD (Circular Zen Stone Tiles 1 to 9)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-9 gap-1 pt-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            onClick={() => handleNumberInput(num)}
            className="h-8 rounded-lg border font-serif font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center cursor-pointer active:scale-90 transition-all hover:border-[#B71C1C]"
            style={{
              backgroundColor: t.surface,
              borderColor: t.borderGrid,
              color: t.primary
            }}
          >
            {num}
          </button>
        ))}
      </div>

      {/* VICTORY OVERLAY */}
      {isWon && (
        <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center p-4">
          <div className="bg-[#FAF7F2] p-5 rounded-2xl border-2 border-[#B71C1C] text-center shadow-2xl space-y-2">
            <Trophy className="w-10 h-10 text-[#B71C1C] mx-auto animate-bounce" />
            <h3 className="text-base font-bold text-[#212121]">¡ARMONÍA ALCANZADA!</h3>
            <p className="text-[10px] text-zinc-600 font-sans">Completaste el reto en {formatTime(timerSeconds)} con {mistakes} fallos.</p>
            <div className="w-12 h-12 mx-auto rounded-full border-2 border-[#B71C1C] flex items-center justify-center font-serif text-[9px] font-black text-[#B71C1C] rotate-12">
              印鑑
            </div>
            <button 
              onClick={() => {
                setBoard(INITIAL_BOARD.map(row => [...row]));
                setIsWon(false);
              }}
              className="w-full py-1.5 rounded-lg bg-[#212121] text-white text-xs font-sans font-bold cursor-pointer"
            >
              Nueva Partida Zen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
