// src/components/apps/SopaSeniorApp.jsx
import { useState, useEffect, useRef } from 'react';
import { 
  Brain, Trophy, Settings as SettingsIcon, Lightbulb, 
  RotateCcw, ArrowLeft, Lock, LockOpen, Sparkles, Star, 
  Clock, Zap, BookOpen, Palette, CheckCircle2, ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/soundEngine';

// =========================================================================
// 1. APP THEMES & COLOR PALETTES
// =========================================================================
const MY_THEMES = [
  {
    id: 'clasico',
    name: 'Clásico',
    background: '#FDFBF7',
    primary: '#6D4C41',
    surface: '#FFF8E1',
    text: '#4E342E',
    accent: '#FFA726',
    border: 'rgba(109, 76, 65, 0.2)',
    cardBg: '#FFFDF7',
    isDark: false
  },
  {
    id: 'noche',
    name: 'Noche',
    background: '#121212',
    primary: '#90CAF9',
    surface: '#1E1E1E',
    text: '#EEEEEE',
    accent: '#64B5F6',
    border: 'rgba(144, 202, 249, 0.2)',
    cardBg: '#181818',
    isDark: true
  },
  {
    id: 'lavanda',
    name: 'Lavanda',
    background: '#F3E5F5',
    primary: '#6A1B9A',
    surface: '#FFFFFF',
    text: '#4A148C',
    accent: '#AB47BC',
    border: 'rgba(106, 27, 154, 0.2)',
    cardBg: '#FAFAF9',
    isDark: false
  }
];

// =========================================================================
// 2. 5 CURATED COLOMBIAN LEVELS & DICTIONARY UNLOCKS
// =========================================================================
const CURATED_LEVELS = [
  {
    level: 1,
    title: "COMIDA COLOMBIANA",
    words: ["AREPA", "EMPANADA", "AJIACO", "BANDEJA"],
    rows: 8,
    cols: 8,
    dictionaryUnlock: {
      word: "PARCERO",
      meaning: "Amigo muy cercano, compinche o compañero de vida (Col)."
    }
  },
  {
    level: 2,
    title: "BEBIDAS TRADICIONALES",
    words: ["TINTICO", "GUARAPO", "CHICHA", "AVENA"],
    rows: 8,
    cols: 8,
    dictionaryUnlock: {
      word: "BERRACO",
      meaning: "Persona extremadamente valiente, trabajadora y echada pa' lante (Col)."
    }
  },
  {
    level: 3,
    title: "FRUTAS COLOMBIANAS",
    words: ["LULO", "CURUBA", "UCHUVA", "MANGO"],
    rows: 8,
    cols: 8,
    dictionaryUnlock: {
      word: "CAMELLO",
      meaning: "Trabajo duro, esfuerzo físico constante o empleo formal (Col)."
    }
  },
  {
    level: 4,
    title: "JERGA COLOMBIANA",
    words: ["CHEVERE", "BACANO", "FARRA", "GUARO"],
    rows: 9,
    cols: 9,
    dictionaryUnlock: {
      word: "TUSA",
      meaning: "Tristeza o despecho profundo provocado por una ruptura amorosa (Col)."
    }
  },
  {
    level: 5,
    title: "REGIONES DE COLOMBIA",
    words: ["ANTIOQUIA", "CARIBE", "PACIFICA", "SANTANDER"],
    rows: 9,
    cols: 9,
    dictionaryUnlock: {
      word: "GOMELO",
      meaning: "Persona joven de clase social alta, consentida o de gustos refinados (Col)."
    }
  }
];

// Motivaciones al ganar
const MOTIVATIONAL_MESSAGES = [
  "¡La estás rompiendo, parce! 🔥",
  "¡Muy teso! 💪",
  "¡Eso quedó una chimba! 😎",
  "¡Pilas que vas excelente! 👀✨",
  "¡Nivel Dios, parce! 👑"
];

// Directional deltas: [dr, dc]
const DELTAS = [
  [0, 1],   // Horizontal
  [1, 0],   // Vertical
  [1, 1],   // Diagonal Down-Right
  [-1, 1]   // Diagonal Up-Right
];

// Build deterministic level grid
function buildDeterministicGrid(levelConfig) {
  const { rows, cols, words } = levelConfig;
  const total = rows * cols;
  const grid = Array.from({ length: total }, () => '');
  const wordStartIndices = {};
  const placedWordCells = {};

  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  words.forEach((word) => {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 200) {
      attempts++;
      const dirIndex = Math.floor(Math.random() * DELTAS.length);
      const [dr, dc] = DELTAS[dirIndex];

      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);

      let fit = true;
      const cells = [];

      for (let i = 0; i < word.length; i++) {
        const nr = r + dr * i;
        const nc = c + dc * i;

        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
          fit = false;
          break;
        }

        const idx = nr * cols + nc;
        if (grid[idx] !== '' && grid[idx] !== word[i]) {
          fit = false;
          break;
        }
        cells.push(idx);
      }

      if (fit) {
        for (let i = 0; i < word.length; i++) {
          grid[cells[i]] = word[i];
        }
        wordStartIndices[word] = cells[0];
        placedWordCells[word] = cells;
        placed = true;
      }
    }
  });

  for (let i = 0; i < total; i++) {
    if (grid[i] === '') {
      grid[i] = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    }
  }

  return { grid, wordStartIndices, placedWordCells };
}

// Calculate straight line of indices between startCell and endCell
function getLineIndices(startIdx, endIdx, cols) {
  if (startIdx === null || endIdx === null) return [];
  if (startIdx === endIdx) return [startIdx];

  const r1 = Math.floor(startIdx / cols);
  const c1 = startIdx % cols;
  const r2 = Math.floor(endIdx / cols);
  const c2 = endIdx % cols;

  const dr = r2 - r1;
  const dc = c2 - c1;

  // Check if horizontal, vertical, or 45-deg diagonal
  const absR = Math.abs(dr);
  const absC = Math.abs(dc);

  if (dr !== 0 && dc !== 0 && absR !== absC) {
    // Not a straight line -> just return startIdx
    return [startIdx];
  }

  const stepR = dr === 0 ? 0 : dr / absR;
  const stepC = dc === 0 ? 0 : dc / absC;
  const steps = Math.max(absR, absC);

  const line = [];
  for (let i = 0; i <= steps; i++) {
    const currR = r1 + stepR * i;
    const currC = c1 + stepC * i;
    line.push(currR * cols + currC);
  }

  return line;
}

export default function SopaSeniorApp() {
  const [activeLevelIdx, setActiveLevelIdx] = useState(0); // 0 to 4 (Level 1 to 5)
  const [maxUnlocked, setMaxUnlocked] = useState(1);
  const [themeIdx, setThemeIdx] = useState(0);
  const [hints, setHints] = useState(5);
  
  const [boardData, setBoardData] = useState(null);
  const [foundWords, setFoundWords] = useState([]);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isLevelComplete, setIsLevelComplete] = useState(false);

  // Drag selection state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartIdx, setDragStartIdx] = useState(null);
  const [dragCurrentIdx, setDragCurrentIdx] = useState(null);
  const [hintedIdx, setHintedIdx] = useState(null);

  // Modals
  const [showWinModal, setShowWinModal] = useState(false);
  const [showDictModal, setShowDictModal] = useState(false);

  const currentLevelConfig = CURATED_LEVELS[activeLevelIdx];
  const theme = MY_THEMES[themeIdx];

  // Initialize active level
  const initLevel = (levelIdx) => {
    setActiveLevelIdx(levelIdx);
    const lvl = CURATED_LEVELS[levelIdx];
    const data = buildDeterministicGrid(lvl);
    setBoardData(data);
    setFoundWords([]);
    setSecondsElapsed(0);
    setIsLevelComplete(false);
    setShowWinModal(false);
    setDragStartIdx(null);
    setDragCurrentIdx(null);
    setIsDragging(false);
    setHintedIdx(null);
  };

  useEffect(() => {
    initLevel(0);
  }, []);

  // Level timer
  useEffect(() => {
    let interval;
    if (!isLevelComplete && boardData) {
      interval = setInterval(() => {
        setSecondsElapsed(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLevelComplete, boardData]);

  // Active selection line
  const activeSelectionLine = isDragging 
    ? getLineIndices(dragStartIdx, dragCurrentIdx, currentLevelConfig.cols) 
    : [];

  // Drag Start
  const handlePointerDown = (idx) => {
    if (isLevelComplete) return;
    sounds.playClick();
    setIsDragging(true);
    setDragStartIdx(idx);
    setDragCurrentIdx(idx);
  };

  // Drag Move
  const handlePointerEnter = (idx) => {
    if (isDragging) {
      setDragCurrentIdx(idx);
    }
  };

  // Drag End & Check Match
  const handlePointerUp = () => {
    if (!isDragging || !boardData) return;
    setIsDragging(false);

    const lineIndices = getLineIndices(dragStartIdx, dragCurrentIdx, currentLevelConfig.cols);
    if (lineIndices.length > 0) {
      const selectedStr = lineIndices.map(i => boardData.grid[i]).join('');
      const reversedStr = selectedStr.split('').reverse().join('');

      let matchedWord = null;
      for (const w of currentLevelConfig.words) {
        if (!foundWords.includes(w) && (selectedStr === w || reversedStr === w)) {
          matchedWord = w;
          break;
        }
      }

      if (matchedWord) {
        sounds.playSuccess();
        const updatedFound = [...foundWords, matchedWord];
        setFoundWords(updatedFound);

        // Confetti burst
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.6 },
          colors: [theme.accent, theme.primary, '#ffffff']
        });

        // Level Completed!
        if (updatedFound.length === currentLevelConfig.words.length) {
          setIsLevelComplete(true);
          const nextMax = Math.max(maxUnlocked, activeLevelIdx + 2);
          setMaxUnlocked(nextMax);

          setTimeout(() => {
            setShowWinModal(true);
            confetti({
              particleCount: 75,
              spread: 80,
              origin: { y: 0.5 },
              colors: ['#FFA726', '#66BB6A', '#42A5F5', '#FFD700']
            });
          }, 350);
        }
      }
    }

    setDragStartIdx(null);
    setDragCurrentIdx(null);
  };

  // Use Hint
  const handleUseHint = () => {
    if (hints <= 0 || !boardData) return;
    const missing = currentLevelConfig.words.filter(w => !foundWords.includes(w));
    if (missing.length === 0) return;

    const targetWord = missing[0];
    const startCell = boardData.wordStartIndices[targetWord];

    if (startCell !== undefined) {
      sounds.playSuccess();
      setHints(h => h - 1);
      setHintedIdx(startCell);
      setTimeout(() => setHintedIdx(null), 3000);
    }
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <div 
      className="w-full h-full min-h-0 font-sans select-none flex flex-col justify-between overflow-hidden relative transition-colors duration-300 p-3"
      style={{
        backgroundColor: theme.background,
        color: theme.text
      }}
      onPointerUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
    >
      {/* Top Header Controls: Levels & Theme Palette */}
      <div className="flex items-center justify-between border-b pb-2 font-mono text-xs shrink-0" style={{ borderColor: theme.border }}>
        {/* Level Switcher (1 to 5) */}
        <div className="flex items-center gap-1">
          {CURATED_LEVELS.map((lvl, idx) => {
            const isUnlocked = idx + 1 <= maxUnlocked;
            const isActive = idx === activeLevelIdx;
            return (
              <button
                key={lvl.level}
                disabled={!isUnlocked}
                onClick={() => { sounds.playClick(); initLevel(idx); }}
                className={`w-6 h-6 rounded-lg font-extrabold text-[11px] flex items-center justify-center transition-all cursor-pointer ${
                  isActive 
                    ? 'scale-110 shadow-md border-2'
                    : isUnlocked
                    ? 'hover:scale-105 opacity-80'
                    : 'opacity-30 cursor-not-allowed'
                }`}
                style={{
                  backgroundColor: isActive ? theme.accent : isUnlocked ? theme.surface : 'rgba(0,0,0,0.05)',
                  color: isActive ? '#000000' : theme.text,
                  borderColor: isActive ? theme.accent : theme.border
                }}
              >
                {lvl.level}
              </button>
            );
          })}
        </div>

        {/* Theme Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-full border bg-black/5" style={{ borderColor: theme.border }}>
          {MY_THEMES.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => { sounds.playClick(); setThemeIdx(idx); }}
              title={`Tema ${t.name}`}
              className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                idx === themeIdx ? 'scale-110 shadow-md ring-2 ring-amber-400' : 'opacity-60 hover:opacity-100'
              }`}
              style={{ backgroundColor: t.background, borderColor: t.primary }}
            />
          ))}
        </div>
      </div>

      {/* Level Info Bar */}
      <div className="flex items-center justify-between py-1 font-mono text-xs shrink-0">
        <div>
          <div className="text-[10px] font-bold opacity-70" style={{ color: theme.primary }}>
            NIVEL {currentLevelConfig.level} DE 5
          </div>
          <div className="text-xs font-black truncate max-w-[150px]" style={{ color: theme.text }}>
            {currentLevelConfig.title}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[11px] font-bold opacity-85">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>{formatTime(secondsElapsed)}</span>
          </div>

          <button
            onClick={handleUseHint}
            className="px-2 py-1 rounded-lg border font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer"
            style={{ backgroundColor: `${theme.accent}20`, borderColor: theme.accent, color: theme.text }}
          >
            <Lightbulb className="w-3.5 h-3.5" style={{ color: theme.accent }} />
            <span>{hints}</span>
          </button>
        </div>
      </div>

      {/* Target Words Bar */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 py-1 text-xs font-mono shrink-0">
        {currentLevelConfig.words.map((w) => {
          const isFound = foundWords.includes(w);
          return (
            <span
              key={w}
              className={`px-2 py-0.5 rounded-full border text-[10px] font-bold transition-all ${
                isFound 
                  ? 'opacity-60 line-through bg-emerald-500/20 text-emerald-600 border-emerald-500/40 scale-95'
                  : 'bg-black/5 border-black/10'
              }`}
              style={{
                color: isFound ? undefined : theme.text
              }}
            >
              {isFound ? `✓ ${w}` : w}
            </span>
          );
        })}
      </div>

      {/* 2D Interactive Drag & Select Letter Grid */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center my-auto overflow-hidden">
        {boardData && (
          <div 
            className="grid gap-1 p-2 rounded-2xl border shadow-xl touch-none select-none"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
              gridTemplateColumns: `repeat(${currentLevelConfig.cols}, minmax(0, 1fr))`
            }}
          >
            {boardData.grid.map((letter, idx) => {
              const isSelectedLine = activeSelectionLine.includes(idx);
              const isHinted = hintedIdx === idx;

              // Check if cell is part of any found word
              let isWordFound = false;
              foundWords.forEach(fw => {
                if (boardData.placedWordCells[fw]?.includes(idx)) isWordFound = true;
              });

              return (
                <div
                  key={idx}
                  onPointerDown={() => handlePointerDown(idx)}
                  onPointerEnter={() => handlePointerEnter(idx)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border font-mono text-xs sm:text-sm font-bold flex items-center justify-center transition-all cursor-pointer ${
                    isWordFound
                      ? 'bg-emerald-500 text-white border-emerald-400 font-extrabold shadow-md scale-102'
                      : isSelectedLine
                      ? 'bg-amber-400 text-black border-amber-300 font-black shadow-lg scale-105'
                      : isHinted
                      ? 'bg-cyan-400 text-black border-cyan-300 font-black animate-ping shadow-lg'
                      : 'bg-black/5 hover:bg-black/10 border-black/5'
                  }`}
                  style={{
                    color: (isWordFound || isSelectedLine || isHinted) ? undefined : theme.text
                  }}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Quick Action: Colombian Slang Dictionary */}
      <div className="pt-1 border-t shrink-0 flex items-center justify-between text-[11px] font-mono" style={{ borderColor: theme.border }}>
        <button
          onClick={() => { sounds.playClick(); setShowDictModal(true); }}
          className="flex items-center gap-1.5 font-bold hover:underline cursor-pointer"
          style={{ color: theme.primary }}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Diccionario Desbloqueado ({Math.min(activeLevelIdx + 1, maxUnlocked)}/5)</span>
        </button>

        <span className="text-[10px] opacity-60">Arrastra para conectar</span>
      </div>

      {/* WIN MODAL WITH DICTIONARY UNLOCK & NEXT LEVEL */}
      {showWinModal && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="w-full max-w-xs p-4 rounded-2xl border shadow-2xl text-center space-y-3 font-mono"
            style={{ backgroundColor: theme.surface, borderColor: theme.border, color: theme.text }}
          >
            <div className="w-12 h-12 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center mx-auto shadow-md">
              <Trophy className="w-7 h-7 text-amber-500 animate-bounce" />
            </div>

            <div className="space-y-0.5">
              <div className="text-base font-extrabold text-amber-500 uppercase tracking-wide">¡NIVEL COMPLETADO!</div>
              <div className="text-[11px] opacity-70">Tiempo: {formatTime(secondsElapsed)}</div>
            </div>

            <p className="text-xs font-bold text-emerald-600 italic px-2">
              "{MOTIVATIONAL_MESSAGES[activeLevelIdx % MOTIVATIONAL_MESSAGES.length]}"
            </p>

            {/* Dictionary Term Unlocked */}
            <div 
              className="p-2.5 rounded-xl border text-left space-y-1 shadow-inner"
              style={{ backgroundColor: 'rgba(0,0,0,0.03)', borderColor: theme.border }}
            >
              <div className="text-[9px] font-bold text-amber-600 flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> DICCIONARIO DESBLOQUEADO
              </div>
              <div className="text-xs font-extrabold" style={{ color: theme.primary }}>
                {currentLevelConfig.dictionaryUnlock.word}
              </div>
              <div className="text-[9.5px] leading-tight opacity-80">
                {currentLevelConfig.dictionaryUnlock.meaning}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-bold">
              <button
                onClick={() => setShowWinModal(false)}
                className="py-2 rounded-xl border cursor-pointer"
                style={{ borderColor: theme.border, color: theme.text }}
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  if (activeLevelIdx < CURATED_LEVELS.length - 1) {
                    initLevel(activeLevelIdx + 1);
                  } else {
                    setShowWinModal(false);
                  }
                }}
                className="py-2 rounded-xl bg-emerald-500 text-white font-extrabold cursor-pointer shadow-md active:scale-95"
              >
                {activeLevelIdx < CURATED_LEVELS.length - 1 ? 'Siguiente →' : '¡Completado!'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DICTIONARY VIEW MODAL */}
      {showDictModal && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200">
          <div 
            className="w-full h-full max-h-[460px] p-3 rounded-2xl border shadow-2xl flex flex-col justify-between font-mono"
            style={{ backgroundColor: theme.surface, borderColor: theme.border, color: theme.text }}
          >
            <div className="flex items-center justify-between border-b pb-2 text-xs shrink-0" style={{ borderColor: theme.border }}>
              <span className="font-extrabold">Diccionario Colombiano</span>
              <button 
                onClick={() => setShowDictModal(false)}
                className="px-2 py-0.5 rounded-lg border text-[10px] font-bold cursor-pointer"
                style={{ borderColor: theme.border }}
              >
                Cerrar
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto my-2 space-y-2 pr-1 text-xs">
              {CURATED_LEVELS.map((lvl, idx) => {
                const isUnlocked = idx < maxUnlocked;
                return (
                  <div
                    key={lvl.dictionaryUnlock.word}
                    className={`p-2.5 rounded-xl border transition-all ${isUnlocked ? 'shadow-sm' : 'opacity-40'}`}
                    style={{ backgroundColor: isUnlocked ? theme.cardBg : 'rgba(0,0,0,0.03)', borderColor: theme.border }}
                  >
                    <div className="flex items-center gap-2">
                      {isUnlocked ? (
                        <LockOpen className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      )}
                      <span className="font-bold text-xs" style={{ color: isUnlocked ? theme.primary : '#9e9e9e' }}>
                        {isUnlocked ? lvl.dictionaryUnlock.word : `Nivel ${idx + 1}`}
                      </span>
                    </div>

                    <p className="mt-1 text-[10.5px] leading-relaxed opacity-85">
                      {isUnlocked ? lvl.dictionaryUnlock.meaning : "Completa el nivel para desbloquear este término."}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
