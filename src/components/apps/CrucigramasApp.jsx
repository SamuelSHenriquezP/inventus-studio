// src/components/apps/CrucigramasApp.jsx
import { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Lightbulb, Sparkles, Award, Flame, Coins, 
  BookOpen, Compass, ChevronLeft, ChevronRight, CheckCircle2, RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

// =========================================================================
// 1. EDITORIAL THEME CONSTANTS (From Flutter lib/theme/editorial_theme.dart)
// =========================================================================
const THEME = {
  background: '#F7F5EF',    // Marfil cálido
  surface: '#FFFDF8',       // Blanco crema
  textPrimary: '#202124',   // Negro carbón
  textSecondary: '#5F6368', // Gris medio
  primary: '#174A5B',       // Azul petróleo profundo
  secondary: '#2D6A4F',     // Verde editorial de honor
  accent: '#D9A63A',        // Mostaza elegante
  borderLine: '#D8D3C9',    // Gris cálido
  cellFocused: '#F7E8BA',   // Tint mostaza cálido
  wordFocused: '#E3EDF0',   // Tint petróleo suave
  inkDark: '#2C302E',       // Tinta sepia oscura
  blackCell: '#202124'
};

// =========================================================================
// 2. CURATED REAL PUZZLES
// =========================================================================
const PUZZLES = [
  {
    id: 'ciencia',
    category: 'Ciencia & Cosmos',
    title: 'Edición Astrofísica',
    gridSize: 5,
    // 5x5 board definition:
    // Row 0: A S T R O
    // Row 1: T # E # R
    // Row 2: O R B I T
    // Row 3: M # E # A
    // Row 4: O N D A S
    // Intersecting words:
    // Horizontals: 
    // 1H: ASTRO (0,0) -> (0,4)
    // 3H: ORBIT (2,0) -> (2,4)
    // 5H: ONDAS (4,0) -> (4,4)
    // Verticals:
    // 1V: ATOMO (0,0) -> (4,0)
    // 2V: TELES (0,2) -> (4,2)
    // 4V: ORTAS -> ORBIT
    clues: [
      { id: '1H', num: 1, dir: 'H', word: 'ASTRO', clue: 'Cuerpo celeste dotado de luz propia o reflejada.', row: 0, col: 0 },
      { id: '3H', num: 3, dir: 'H', word: 'ORBIT', clue: 'Trayectoria curva que describe un planeta.', row: 2, col: 0 },
      { id: '5H', num: 5, dir: 'H', word: 'ONDAS', clue: 'Propagaciones de energía a través del vacío o la materia.', row: 4, col: 0 },
      { id: '1V', num: 1, dir: 'V', word: 'ATOMO', clue: 'Unidad fundamental de la materia química.', row: 0, col: 0 },
      { id: '2V', num: 2, dir: 'V', word: 'TELES', clue: 'Abreviatura familiar para instrumento de observación estelar.', row: 0, col: 2 },
      { id: '4V', num: 4, dir: 'V', word: 'ORTAS', clue: 'Salidas del sol en el horizonte matutino.', row: 0, col: 4 }
    ],
    cells: [
      [{ l: 'A', num: 1 }, { l: 'S' }, { l: 'T', num: 2 }, { l: 'R' }, { l: 'O', num: 4 }],
      [{ l: 'T' }, null, { l: 'E' }, null, { l: 'R' }],
      [{ l: 'O', num: 3 }, { l: 'R' }, { l: 'B' }, { l: 'I' }, { l: 'T' }],
      [{ l: 'M' }, null, { l: 'E' }, null, { l: 'A' }],
      [{ l: 'O', num: 5 }, { l: 'N' }, { l: 'D' }, { l: 'A' }, { l: 'S' }]
    ]
  },
  {
    id: 'historia',
    category: 'Historia Antigua',
    title: 'Edición Clásica',
    gridSize: 5,
    clues: [
      { id: '1H', num: 1, dir: 'H', word: 'ROMA', clue: 'Cuna del derecho occidental e imperio legendario.', row: 0, col: 0 },
      { id: '2H', num: 2, dir: 'H', word: 'MITO', clue: 'Narración fabulosa que explica el origen del mundo.', row: 2, col: 0 },
      { id: '3H', num: 3, dir: 'H', word: 'POLIS', clue: 'Ciudad-estado de la antigua Grecia.', row: 4, col: 0 },
      { id: '1V', num: 1, dir: 'V', word: 'RAMPA', clue: 'Plano inclinado para elevar sillares piramidales.', row: 0, col: 0 },
      { id: '4V', num: 4, dir: 'V', word: 'OTIS', clue: 'Faraón o deidad menor de las arenas.', row: 0, col: 3 }
    ],
    cells: [
      [{ l: 'R', num: 1 }, { l: 'O' }, { l: 'M' }, { l: 'A', num: 4 }, null],
      [{ l: 'A' }, null, null, { l: 'T' }, null],
      [{ l: 'M', num: 2 }, { l: 'I' }, { l: 'T' }, { l: 'O' }, null],
      [{ l: 'P' }, null, null, { l: 'S' }, null],
      [{ l: 'A', num: 3 }, { l: 'T' }, { l: 'E' }, { l: 'N' }, { l: 'A' }]
    ]
  }
];

export default function CrucigramasApp() {
  const [screen, setScreen] = useState('home'); // 'home' | 'game'
  const [activePuzzle, setActivePuzzle] = useState(PUZZLES[0]);
  const [userGrid, setUserGrid] = useState(() => 
    Array(5).fill(null).map(() => Array(5).fill(''))
  );
  const [selectedCell, setSelectedCell] = useState({ r: 0, c: 0 });
  const [activeClueIndex, setActiveClueIndex] = useState(0);
  const [coins, setCoins] = useState(240);
  const [streak, setStreak] = useState(7);
  const [solvedWords, setSolvedWords] = useState([]);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [celebrationToast, setCelebrationToast] = useState(null);

  const containerRef = useRef(null);

  // Initialize or reset puzzle grid
  const startPuzzle = (puzzle) => {
    setActivePuzzle(puzzle);
    setUserGrid(Array(puzzle.gridSize).fill(null).map(() => Array(puzzle.gridSize).fill('')));
    setSelectedCell({ r: 0, c: 0 });
    setActiveClueIndex(0);
    setSolvedWords([]);
    setIsLevelComplete(false);
    setCelebrationToast(null);
    setScreen('game');
  };

  const currentClue = activePuzzle.clues[activeClueIndex] || activePuzzle.clues[0];

  // Check if cell is in active clue
  const isCellInActiveClue = (r, c) => {
    if (!currentClue) return false;
    if (currentClue.dir === 'H') {
      return r === currentClue.row && c >= currentClue.col && c < currentClue.col + currentClue.word.length;
    } else {
      return c === currentClue.col && r >= currentClue.row && r < currentClue.row + currentClue.word.length;
    }
  };

  // Check words completion
  const checkWords = (grid) => {
    const newlySolved = [];
    activePuzzle.clues.forEach((clue) => {
      let formed = '';
      for (let i = 0; i < clue.word.length; i++) {
        const r = clue.dir === 'H' ? clue.row : clue.row + i;
        const c = clue.dir === 'H' ? clue.col + i : clue.col;
        formed += grid[r]?.[c] || '';
      }
      if (formed === clue.word) {
        newlySolved.push(clue.id);
      }
    });

    if (newlySolved.length > solvedWords.length) {
      const added = newlySolved.find(id => !solvedWords.includes(id));
      const clueObj = activePuzzle.clues.find(c => c.id === added);
      if (clueObj) {
        setCelebrationToast(`¡"${clueObj.word}" descubierta! +15 🪙`);
        setCoins(prev => prev + 15);
        setTimeout(() => setCelebrationToast(null), 2400);
      }
    }
    setSolvedWords(newlySolved);

    if (newlySolved.length === activePuzzle.clues.length && !isLevelComplete) {
      setIsLevelComplete(true);
      setCoins(prev => prev + 100);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  // Keyboard typing
  const handleKeyInput = (char) => {
    const { r, c } = selectedCell;
    if (activePuzzle.cells[r]?.[c] === null) return;

    if (char === 'BACKSPACE') {
      const updated = userGrid.map((rowArr, rowIdx) =>
        rowArr.map((val, colIdx) => (rowIdx === r && colIdx === c ? '' : val))
      );
      setUserGrid(updated);
      checkWords(updated);
      return;
    }

    const updated = userGrid.map((rowArr, rowIdx) =>
      rowArr.map((val, colIdx) => (rowIdx === r && colIdx === c ? char.toUpperCase() : val))
    );
    setUserGrid(updated);
    checkWords(updated);

    // Advance to next cell in current clue direction
    if (currentClue.dir === 'H') {
      if (c + 1 < activePuzzle.gridSize && activePuzzle.cells[r][c + 1] !== null) {
        setSelectedCell({ r, c: c + 1 });
      }
    } else {
      if (r + 1 < activePuzzle.gridSize && activePuzzle.cells[r + 1][c] !== null) {
        setSelectedCell({ r: r + 1, c });
      }
    }
  };

  // Hint button: reveals current selected cell
  const handleHint = () => {
    if (coins < 20) return;
    const { r, c } = selectedCell;
    const expected = activePuzzle.cells[r]?.[c]?.l;
    if (!expected) return;

    setCoins(prev => prev - 20);
    const updated = userGrid.map((rowArr, rowIdx) =>
      rowArr.map((val, colIdx) => (rowIdx === r && colIdx === c ? expected : val))
    );
    setUserGrid(updated);
    checkWords(updated);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex flex-col font-sans select-none overflow-hidden relative"
      style={{ backgroundColor: THEME.background, color: THEME.textPrimary }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. HOME SCREEN (EDITORIAL MASTHEAD & CATALOG)
      ───────────────────────────────────────────────────────────── */}
      {screen === 'home' && (
        <div className="flex-1 flex flex-col p-3.5 sm:p-4 overflow-y-auto custom-scroll">
          {/* Newspaper Masthead */}
          <div className="text-center border-b-2 pb-2 mb-2" style={{ borderColor: THEME.inkDark }}>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-mono block text-[#5F6368]">
              REVISTA EDITORIAL DE INTELECTO • AÑO 2026
            </span>
            <h1 className="text-xl sm:text-2xl font-serif font-black tracking-tight uppercase mt-0.5" style={{ color: THEME.inkDark }}>
              EL CRUCIGRAMA
            </h1>
            <div className="flex items-center justify-between text-[8px] sm:text-[9px] border-t border-b py-0.5 mt-1 font-mono uppercase" style={{ borderColor: THEME.borderLine }}>
              <span>EDICIÓN NACIONAL</span>
              <span>14 DE SEPTIEMBRE</span>
              <span>VOL. XII</span>
            </div>
          </div>

          {/* Player Rank Badge */}
          <div className="flex items-center justify-between p-2 rounded-xl mb-3 border shadow-xs" style={{ backgroundColor: THEME.surface, borderColor: THEME.borderLine }}>
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs text-white" style={{ backgroundColor: THEME.primary }}>
                <Award className="w-4 h-4 text-[#D9A63A]" />
              </div>
              <div>
                <span className="text-[10px] font-bold block leading-tight">Samuel Henríquez</span>
                <span className="text-[8px] uppercase font-mono text-[#D9A63A] font-bold">REDACTOR JEFE</span>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <div className="flex items-center gap-0.5 text-[#B45309] font-bold">
                <Coins className="w-3.5 h-3.5" />
                <span>{coins}</span>
              </div>
              <div className="flex items-center gap-0.5 text-[#C56D5A] font-bold">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>{streak}d</span>
              </div>
            </div>
          </div>

          {/* Hero: Daily Edition Card */}
          <div 
            onClick={() => startPuzzle(PUZZLES[0])}
            className="rounded-2xl p-3 sm:p-3.5 text-white mb-3 cursor-pointer shadow-md transition-transform hover:scale-[1.01] active:scale-[0.99] relative overflow-hidden"
            style={{ backgroundColor: THEME.primary }}
          >
            <div className="relative z-10">
              <span className="inline-block px-2 py-0.5 rounded-full text-[8px] font-bold tracking-wider uppercase mb-1 bg-[#D9A63A] text-black">
                EDICIÓN PRINCIPAL DE HOY
              </span>
              <h2 className="text-base sm:text-lg font-serif font-bold leading-tight">
                {PUZZLES[0].title}
              </h2>
              <p className="text-[10px] text-zinc-300 mt-1 mb-2 font-light">
                5 palabras cruzadas astrofísicas. Pon a prueba tu léxico científico.
              </p>
              <div className="flex items-center justify-between pt-1.5 border-t border-white/15 text-[10px]">
                <span className="font-mono text-[9px] text-[#D9A63A]">Recompensa: +100 🪙</span>
                <span className="font-bold underline flex items-center gap-1">
                  Resolver Ahora <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="space-y-1.5 flex-1">
            <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 block">
              SECCIONES TEMÁTICAS
            </span>
            <div className="grid grid-cols-2 gap-2">
              {PUZZLES.map(p => (
                <div 
                  key={p.id}
                  onClick={() => startPuzzle(p)}
                  className="p-2.5 rounded-xl border cursor-pointer transition-all hover:border-[#174A5B] shadow-xs"
                  style={{ backgroundColor: THEME.surface, borderColor: THEME.borderLine }}
                >
                  <span className="text-[8px] font-mono uppercase text-[#174A5B] font-bold block truncate">
                    {p.category}
                  </span>
                  <h3 className="text-xs font-serif font-bold text-zinc-900 mt-0.5 truncate">
                    {p.title}
                  </h3>
                  <span className="text-[9px] text-zinc-500 font-mono mt-1 block">
                    {p.clues.length} Definiciones
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. GAMEPLAY SCREEN (BOARD + CLUES + KEYBOARD)
      ───────────────────────────────────────────────────────────── */}
      {screen === 'game' && (
        <div className="flex-1 flex flex-col justify-between p-2.5 sm:p-3 overflow-hidden">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: THEME.borderLine }}>
            <button 
              onClick={() => setScreen('home')}
              className="p-1 rounded-md hover:bg-black/5 flex items-center gap-1 text-[10px] font-bold text-[#174A5B] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver</span>
            </button>
            <div className="text-center">
              <span className="text-[8px] font-mono uppercase tracking-widest text-[#5F6368] block">
                {activePuzzle.category}
              </span>
              <span className="text-[11px] font-serif font-bold text-[#202124]">
                {activePuzzle.title}
              </span>
            </div>
            <button 
              onClick={handleHint}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-bold bg-[#D9A63A]/20 text-[#854d0e] border border-[#D9A63A]/50 cursor-pointer active:scale-95 transition-all"
            >
              <Lightbulb className="w-3 h-3" />
              <span>Pista -20</span>
            </button>
          </div>

          {/* Celebration Toast */}
          {celebrationToast && (
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 bg-[#2D6A4F] text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg flex items-center gap-1.5 animate-bounce">
              <CheckCircle2 className="w-3 h-3 text-[#A7F3D0]" />
              <span>{celebrationToast}</span>
            </div>
          )}

          {/* Level Complete Card */}
          {isLevelComplete && (
            <div className="absolute inset-x-4 top-16 z-40 bg-[#FFFDF8] border-2 border-[#174A5B] rounded-2xl p-4 shadow-2xl text-center">
              <Sparkles className="w-8 h-8 text-[#D9A63A] mx-auto mb-1 animate-pulse" />
              <h3 className="text-base font-serif font-black text-[#174A5B]">¡EDICIÓN COMPLETADA!</h3>
              <p className="text-[10px] text-zinc-600 mt-1">Has descifrado todas las palabras de esta edición con honores.</p>
              <div className="text-xs font-mono font-bold text-[#B45309] my-2">+100 Monedas Editoriales</div>
              <button 
                onClick={() => setScreen('home')}
                className="w-full py-1.5 rounded-lg text-xs font-bold text-white bg-[#174A5B] cursor-pointer"
              >
                Volver al Quiosco
              </button>
            </div>
          )}

          {/* Crossword Grid Container */}
          <div className="flex-1 flex items-center justify-center my-1.5">
            <div 
              className="grid gap-1 p-1.5 rounded-xl border shadow-inner"
              style={{
                backgroundColor: '#EDE8DF',
                borderColor: THEME.borderLine,
                gridTemplateColumns: `repeat(${activePuzzle.gridSize}, minmax(0, 1fr))`
              }}
            >
              {activePuzzle.cells.map((rowArr, r) =>
                rowArr.map((cell, c) => {
                  if (cell === null) {
                    return (
                      <div 
                        key={`${r}-${c}`} 
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-sm"
                        style={{ backgroundColor: THEME.blackCell }}
                      />
                    );
                  }

                  const isSelected = selectedCell.r === r && selectedCell.c === c;
                  const inWord = isCellInActiveClue(r, c);
                  const char = userGrid[r][c];

                  return (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => setSelectedCell({ r, c })}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-sm border flex flex-col items-center justify-center relative cursor-pointer font-serif font-bold text-sm sm:text-base transition-all"
                      style={{
                        backgroundColor: isSelected 
                          ? THEME.cellFocused 
                          : inWord 
                            ? THEME.wordFocused 
                            : THEME.surface,
                        borderColor: isSelected ? '#B45309' : THEME.borderLine,
                        color: THEME.inkDark
                      }}
                    >
                      {cell.num && (
                        <span className="absolute top-0.5 left-1 text-[7px] font-mono leading-none text-zinc-500">
                          {cell.num}
                        </span>
                      )}
                      <span className="mt-1">{char}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Active Clue Dock */}
          <div 
            className="p-2 sm:p-2.5 rounded-xl border mb-2 flex items-center justify-between gap-2 shadow-xs"
            style={{ backgroundColor: THEME.surface, borderColor: THEME.borderLine }}
          >
            <button 
              onClick={() => setActiveClueIndex(prev => (prev > 0 ? prev - 1 : activePuzzle.clues.length - 1))}
              className="p-1 rounded hover:bg-black/5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-[#174A5B]" />
            </button>
            <div className="flex-1 text-center">
              <span className="text-[8px] font-mono uppercase font-bold text-[#174A5B] block">
                {currentClue.num}. {currentClue.dir === 'H' ? 'HORIZONTAL' : 'VERTICAL'} ({currentClue.word.length} LETRAS)
              </span>
              <p className="text-[10px] sm:text-[11px] font-serif text-zinc-800 leading-snug line-clamp-2">
                {currentClue.clue}
              </p>
            </div>
            <button 
              onClick={() => setActiveClueIndex(prev => (prev < activePuzzle.clues.length - 1 ? prev + 1 : 0))}
              className="p-1 rounded hover:bg-black/5 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-[#174A5B]" />
            </button>
          </div>

          {/* Editorial Virtual Keyboard */}
          <div className="space-y-1">
            {[
              ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
              ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
              ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
            ].map((row, rowIdx) => (
              <div key={rowIdx} className="flex justify-center gap-1">
                {row.map(k => (
                  <button
                    key={k}
                    onClick={() => handleKeyInput(k === '⌫' ? 'BACKSPACE' : k)}
                    className="h-6.5 sm:h-7 px-1.5 sm:px-2 rounded border font-mono text-[9px] sm:text-[10px] font-bold shadow-xs active:translate-y-0.5 cursor-pointer transition-all"
                    style={{
                      backgroundColor: k === '⌫' ? '#FEE2E2' : THEME.surface,
                      color: k === '⌫' ? '#DC2626' : THEME.textPrimary,
                      borderColor: THEME.borderLine,
                      minWidth: k === '⌫' ? '28px' : '20px'
                    }}
                  >
                    {k}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
