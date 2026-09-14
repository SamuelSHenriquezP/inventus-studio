// src/components/apps/InkWrightApp.jsx
import { useState, useEffect } from 'react';
import { 
  BookOpen, Feather, Moon, Sun, ArrowLeft, Play, 
  Pause, Clock, Check, FileText, ChevronRight, Edit3, 
  Sparkles, SlidersHorizontal, Share2, CornerDownLeft
} from 'lucide-react';

export default function InkWrightApp() {
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'editor'
  const [isDark, setIsDark] = useState(true);
  const [activeChapterIndex, setActiveChapterIndex] = useState(2);
  const [dailyGoal, setDailyGoal] = useState(1500);
  const [wordsWrittenToday, setWordsWrittenToday] = useState(1120);

  // Chapters data
  const [chapters, setChapters] = useState([
    { id: 1, title: 'Capítulo I: El Susurro de las Dunas', words: 2450, status: 'Finalizado' },
    { id: 2, title: 'Capítulo II: La Ciudad de Obsidiana', words: 3120, status: 'Revisión' },
    { id: 3, title: 'Capítulo III: El Juramento del Hereje', words: 1840, status: 'En redacción' }
  ]);

  // Editor content
  const [editorText, setEditorText] = useState(
    "El viento del desierto no traía arena, sino presagios. Samuel ajustó el broche de bronce de su capa y contempló las torres quebradas de la antigua biblioteca. Habían pasado trescientos años desde que el último escriba pronunciara la palabra prohibida, pero allí, grabada sobre el dintel carcomido, la tinta parecía haber secado apenas ayer...\n\n—No temas al silencio —susurró la voz detrás del velo—. Los libros olvidados son los únicos que recuerdan la verdad intacta."
  );

  const [sprintActive, setSprintActive] = useState(false);
  const [sprintSeconds, setSprintSeconds] = useState(900); // 15 min

  // Sprint timer
  useEffect(() => {
    let timer;
    if (sprintActive && sprintSeconds > 0) {
      timer = setInterval(() => setSprintSeconds(s => s - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [sprintActive, sprintSeconds]);

  const formatSprint = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const currentWords = editorText.trim().split(/\s+/).filter(Boolean).length;
  const readingTimeMin = Math.max(1, Math.ceil(currentWords / 200));

  // Style tokens
  const bg = isDark ? '#121212' : '#FAFAFA';
  const cardBg = isDark ? '#1C1C1E' : '#FFFFFF';
  const textPrimary = isDark ? '#F4F4F5' : '#111111';
  const textSecondary = isDark ? '#A1A1AA' : '#666666';
  const border = isDark ? '#27272A' : '#E4E4E7';

  // Add formatting tag
  const appendFormat = (symbol) => {
    setEditorText(prev => prev + ' ' + symbol);
  };

  return (
    <div 
      className="w-full h-full flex flex-col select-none overflow-hidden relative transition-colors duration-300"
      style={{ backgroundColor: bg, color: textPrimary }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. TOP BAR (Minimalist Monochrome)
      ───────────────────────────────────────────────────────────── */}
      <div 
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ borderColor: border, backgroundColor: cardBg }}
      >
        <div className="flex items-center gap-2">
          {view === 'editor' && (
            <button 
              onClick={() => setView('dashboard')}
              className="p-1 rounded-md hover:bg-white/10 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          )}
          <Feather className="w-3.5 h-3.5" />
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
            INK & WRIGHT
          </span>
        </div>

        <div className="flex items-center gap-2">
          {view === 'editor' && (
            <button
              onClick={() => setSprintActive(!sprintActive)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full border text-[8.5px] font-mono cursor-pointer"
              style={{ borderColor: border }}
            >
              <Clock className="w-2.5 h-2.5" />
              <span>{formatSprint(sprintSeconds)}</span>
            </button>
          )}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-1 rounded-full hover:bg-white/10 cursor-pointer"
          >
            {isDark ? <Sun className="w-3 h-3 text-zinc-300" /> : <Moon className="w-3 h-3 text-zinc-700" />}
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. DASHBOARD VIEW
      ───────────────────────────────────────────────────────────── */}
      {view === 'dashboard' && (
        <div className="flex-1 overflow-y-auto custom-scroll p-3 space-y-3 font-sans">
          {/* Active Manuscript Card */}
          <div 
            className="p-3.5 rounded-2xl border shadow-sm space-y-2 relative overflow-hidden"
            style={{ backgroundColor: cardBg, borderColor: border }}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-400 block">
                  MANUSCRITO ACTIVO
                </span>
                <h2 className="text-base font-serif font-bold text-white mt-0.5">
                  La Crónica del Viento
                </h2>
                <span className="text-[9px] text-zinc-400">Fantasía Épica • Primera Edición</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[8px] font-mono border font-bold" style={{ borderColor: border }}>
                7,410 Palabras
              </span>
            </div>

            {/* Daily Goal Sprint Bar */}
            <div className="space-y-1 pt-1 border-t" style={{ borderColor: border }}>
              <div className="flex justify-between text-[8px] font-mono text-zinc-400">
                <span>Meta Diaria de Escritura</span>
                <span>{wordsWrittenToday} / {dailyGoal} palabras</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-500 rounded-full"
                  style={{ width: `${(wordsWrittenToday / dailyGoal) * 100}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setView('editor')}
              className="w-full py-2 rounded-xl text-xs font-mono font-bold bg-white text-black flex items-center justify-center gap-1.5 cursor-pointer hover:bg-zinc-200 active:scale-98 transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Abrir Modo Máquina de Escribir</span>
            </button>
          </div>

          {/* Chapters Index */}
          <div className="space-y-1.5">
            <span className="text-[8.5px] font-mono uppercase tracking-wider text-zinc-500 block">
              ÍNDICE DE CAPÍTULOS
            </span>
            {chapters.map((ch, idx) => (
              <div
                key={ch.id}
                onClick={() => {
                  setActiveChapterIndex(idx);
                  setView('editor');
                }}
                className="p-2.5 rounded-xl border flex items-center justify-between cursor-pointer hover:border-white/40 transition-all shadow-xs"
                style={{ backgroundColor: cardBg, borderColor: border }}
              >
                <div>
                  <h4 className="text-[10px] font-serif font-bold leading-snug">{ch.title}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[8px] font-mono text-zinc-400">{ch.words} palabras</span>
                    <span className="text-[8px] font-mono text-zinc-500">• {ch.status}</span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. DISTRACTION-FREE ZEN TYPEWRITER EDITOR
      ───────────────────────────────────────────────────────────── */}
      {view === 'editor' && (
        <div className="flex-1 flex flex-col justify-between p-3 overflow-hidden">
          {/* Chapter Subtitle & Stats Bar */}
          <div className="flex items-center justify-between pb-1 text-[8.5px] font-mono text-zinc-400 border-b" style={{ borderColor: border }}>
            <span className="font-serif italic">{chapters[activeChapterIndex]?.title}</span>
            <span>{currentWords} palabras • ~{readingTimeMin} min lectura</span>
          </div>

          {/* Typewriter Textarea */}
          <textarea
            value={editorText}
            onChange={e => setEditorText(e.target.value)}
            className="flex-1 w-full bg-transparent resize-none focus:outline-none font-serif text-xs sm:text-sm leading-relaxed my-2 custom-scroll"
            style={{ color: textPrimary }}
            placeholder="Comienza a teclear tu relato..."
          />

          {/* Typewriter Keyboard Accessory Bar */}
          <div 
            className="flex items-center justify-between p-1.5 rounded-xl border"
            style={{ backgroundColor: cardBg, borderColor: border }}
          >
            <div className="flex items-center gap-1 font-serif text-xs">
              <button 
                onClick={() => appendFormat('**palabra**')}
                className="w-6 h-6 rounded border flex items-center justify-center font-bold hover:bg-white/10 cursor-pointer text-[10px]"
                style={{ borderColor: border }}
                title="Negrita"
              >
                B
              </button>
              <button 
                onClick={() => appendFormat('*palabra*')}
                className="w-6 h-6 rounded border flex items-center justify-center italic hover:bg-white/10 cursor-pointer text-[10px]"
                style={{ borderColor: border }}
                title="Cursiva"
              >
                I
              </button>
              <button 
                onClick={() => appendFormat('—')}
                className="w-6 h-6 rounded border flex items-center justify-center hover:bg-white/10 cursor-pointer text-[10px]"
                style={{ borderColor: border }}
                title="Guion de diálogo largo"
              >
                —
              </button>
              <button 
                onClick={() => appendFormat('«»')}
                className="w-6 h-6 rounded border flex items-center justify-center hover:bg-white/10 cursor-pointer text-[10px]"
                style={{ borderColor: border }}
                title="Comillas latinas"
              >
                «»
              </button>
            </div>

            <span className="text-[8px] font-mono text-zinc-500">
              MODO ZEN
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
