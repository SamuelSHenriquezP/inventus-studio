// src/components/apps/SopaSeniorApp.jsx
import { useState, useEffect, useCallback } from 'react';
import { Star, Volume2, Trophy, RefreshCw } from 'lucide-react';

const GRID_SIZE = 8;
const WORDS = ['FLUTTER', 'DART', 'ISAR', 'FIREBASE', 'MVVM'];

function generateGrid(words) {
  const grid = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => '')
  );
  const placed = [];

  words.forEach(word => {
    // place horizontally
    const row = Math.floor(Math.random() * GRID_SIZE);
    const col = Math.floor(Math.random() * (GRID_SIZE - word.length));
    let ok = true;
    for (let i = 0; i < word.length; i++) {
      if (grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) { ok = false; break; }
    }
    if (ok) {
      for (let i = 0; i < word.length; i++) grid[row][col + i] = word[i];
      placed.push({ word, row, col, dir: 'h', cells: Array.from({ length: word.length }, (_, i) => `${row}-${col + i}`) });
    }
  });

  // fill blanks
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < GRID_SIZE; r++)
    for (let c = 0; c < GRID_SIZE; c++)
      if (!grid[r][c]) grid[r][c] = alpha[Math.floor(Math.random() * alpha.length)];

  return { grid, placed };
}

export default function SopaSeniorApp() {
  const [{ grid, placed }, setBoard] = useState(() => generateGrid(WORDS));
  const [selected, setSelected] = useState([]);
  const [found, setFound] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showAd, setShowAd] = useState(false);

  const foundCells = found.flatMap(f => f.cells);

  const handleCellClick = (key, letter) => {
    if (foundCells.includes(key)) return;
    const next = selected.includes(key) ? selected.filter(k => k !== key) : [...selected, key];
    setSelected(next);

    // Check if selection matches a word
    for (const p of placed) {
      if (p.cells.every(c => next.includes(c)) && !found.find(f => f.word === p.word)) {
        setFound(prev => [...prev, p]);
        setScore(s => s + p.word.length * 10);
        setSelected([]);
        return;
      }
    }
  };

  const nextLevel = () => {
    setLevel(l => l + 1);
    setFound([]);
    setSelected([]);
    setScore(s => s + 50);
    setBoard(generateGrid(WORDS));
    if (level % 3 === 0) { setShowAd(true); setTimeout(() => setShowAd(false), 2500); }
  };

  const allFound = found.length === placed.length;

  return (
    <div className="w-full h-full bg-[#1a1000] text-white font-sans flex flex-col select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-amber-500/20 shrink-0">
        <div className="text-[11px] font-bold text-amber-400 font-mono">SOPA SENIOR</div>
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="text-zinc-400">Nivel {level}</span>
          <span className="text-amber-400 font-bold">⭐ {score}</span>
        </div>
      </div>

      {/* Ad Banner Overlay */}
      {showAd && (
        <div className="absolute inset-0 z-50 bg-black/85 flex flex-col items-center justify-center p-4 space-y-3">
          <div className="w-full p-4 rounded-xl bg-zinc-800 border border-white/10 text-center space-y-1">
            <div className="text-[9px] font-mono text-zinc-400 uppercase">Publicidad · Google AdMob</div>
            <div className="text-xs font-bold text-white">¡Mejora tu memoria!</div>
            <div className="text-[9px] text-zinc-300">App Premium — Sin anuncios</div>
          </div>
          <div className="text-[10px] font-mono text-zinc-400">Cerrando en 2.5s...</div>
        </div>
      )}

      {/* Word List */}
      <div className="flex flex-wrap gap-1.5 px-3 py-1.5 shrink-0">
        {placed.map(p => (
          <span
            key={p.word}
            className={`text-[9px] font-mono px-2 py-0.5 rounded-full border transition-all ${
              found.find(f => f.word === p.word)
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 line-through'
                : 'bg-white/5 border-white/10 text-zinc-300'
            }`}
          >
            {p.word}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 flex items-center justify-center px-2 pb-1">
        {allFound ? (
          <div className="flex flex-col items-center gap-3 text-center">
            <Trophy className="w-8 h-8 text-amber-400" />
            <div className="text-sm font-bold text-white">¡Nivel {level} completado!</div>
            <div className="text-[10px] font-mono text-zinc-400">+50 puntos de nivel</div>
            <button
              onClick={nextLevel}
              className="px-4 py-2 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Nivel {level + 1}
              {(level + 1) % 3 === 0 && <span className="text-[8px] opacity-70">(anuncio)</span>}
            </button>
          </div>
        ) : (
          <div
            className="grid gap-[2px]"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
          >
            {grid.map((row, r) =>
              row.map((letter, c) => {
                const key = `${r}-${c}`;
                const isFound = foundCells.includes(key);
                const isSelected = selected.includes(key);
                return (
                  <button
                    key={key}
                    onClick={() => handleCellClick(key, letter)}
                    className={`w-7 h-7 rounded text-[10px] font-bold font-mono transition-all cursor-pointer flex items-center justify-center ${
                      isFound
                        ? 'bg-amber-500/30 text-amber-400 border border-amber-500/40'
                        : isSelected
                        ? 'bg-white/25 text-white border border-white/40'
                        : 'bg-white/5 text-zinc-300 border border-white/5 hover:bg-white/10'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Score bar */}
      <div className="px-3 pb-2 pt-1 font-mono text-[9px] text-zinc-500 flex justify-between shrink-0">
        <span>{found.length}/{placed.length} palabras encontradas</span>
        <span className="text-amber-400">Puntos: {score}</span>
      </div>
    </div>
  );
}
