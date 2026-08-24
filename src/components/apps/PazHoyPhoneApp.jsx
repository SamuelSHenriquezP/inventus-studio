// src/components/apps/PazHoyPhoneApp.jsx
import { useState, useRef, useCallback } from 'react';
import { 
  Shuffle, Heart, Palette, Share2, Check, Sparkles, 
  Search, Smartphone, Home, Compass, Bookmark, Settings, X, RefreshCw,
  Plus, Flame, ChevronUp, ChevronDown, Moon, Sun, RotateCcw
} from 'lucide-react';
import { sounds } from '../../utils/soundEngine';

const DEFAULT_QUOTES = [
  {
    id: 1,
    text: "La paz comienza con una sonrisa.",
    author: "Madre Teresa",
    context: "Discurso de aceptación del Nobel",
    source: "Vida y obra",
    tag: "paz"
  },
  {
    id: 2,
    text: "No hay camino para la paz, la paz es el camino.",
    author: "Mahatma Gandhi",
    context: "Filosofía de la no violencia",
    source: "Escritos",
    tag: "paz"
  },
  {
    id: 3,
    text: "La tranquilidad perfecta consiste en el buen orden de la mente.",
    author: "Marco Aurelio",
    context: "Meditaciones",
    source: "Libro IV",
    tag: "serenidad"
  },
  {
    id: 4,
    text: "A veces la paz no es la ausencia de tormenta, sino la serenidad en medio de ella.",
    author: "Séneca",
    context: "Cartas a Lucilio",
    source: "Epístolas Morales",
    tag: "estoicismo"
  },
  {
    id: 5,
    text: "No cuentes los días; haz que los días cuenten.",
    author: "Muhammad Ali",
    context: "Sobre aprovechar el tiempo",
    source: "Entrevista",
    tag: "tiempo"
  },
  {
    id: 6,
    text: "La felicidad no es algo hecho. Proviene de tus propias acciones.",
    author: "Dalai Lama",
    context: "Enseñanzas sobre la vida",
    source: "El Arte de la Felicidad",
    tag: "felicidad"
  },
  {
    id: 7,
    text: "El silencio es una fuente de gran fuerza.",
    author: "Lao Tzu",
    context: "Tao Te King",
    source: "Filosofía Oriental",
    tag: "sabiduría"
  }
];

const GOOGLE_FONTS = [
  { id: 'playfair', name: 'Playfair Display', fontClass: "font-['Playfair_Display',Georgia,serif]" },
  { id: 'dancing', name: 'Dancing Script', fontClass: "font-['Dancing_Script',cursive]" },
  { id: 'merriweather', name: 'Merriweather', fontClass: "font-['Merriweather',serif]" },
  { id: 'montserrat', name: 'Montserrat', fontClass: "font-['Montserrat',sans-serif]" },
  { id: 'jakarta', name: 'Plus Jakarta', fontClass: "font-['Plus_Jakarta_Sans',sans-serif]" },
  { id: 'jetbrains', name: 'JetBrains Mono', fontClass: "font-['JetBrains_Mono',monospace]" }
];

const CARD_BACKGROUND_STYLES = [
  { id: 'bone', name: 'Lino Cálido', bg: '#FDFBF7', text: '#1E293B', sub: '#64748B', border: 'rgba(0,0,0,0.08)', shadow: 'rgba(0,0,0,0.06)', isDark: false },
  { id: 'indigo', name: 'Índigo Profundo', bg: '#1E1B4B', text: '#FAF5FF', sub: '#C084FC', border: 'rgba(255,255,255,0.12)', shadow: 'rgba(30,27,75,0.4)', isDark: true },
  { id: 'amethyst', name: 'Amatista Zen', bg: '#2E1065', text: '#FAF5FF', sub: '#D8B4FE', border: 'rgba(255,255,255,0.12)', shadow: 'rgba(46,16,101,0.4)', isDark: true },
  { id: 'sage', name: 'Bosque Sage', bg: '#142820', text: '#F0FDF4', sub: '#86EFAC', border: 'rgba(255,255,255,0.12)', shadow: 'rgba(20,40,32,0.4)', isDark: true },
  { id: 'slate', name: 'Pizarra Noche', bg: '#18181B', text: '#F4F4F5', sub: '#A1A1AA', border: 'rgba(255,255,255,0.12)', shadow: 'rgba(0,0,0,0.5)', isDark: true },
  { id: 'white', name: 'Lienzo Blanco', bg: '#FFFFFF', text: '#0F172A', sub: '#475569', border: 'rgba(0,0,0,0.08)', shadow: 'rgba(0,0,0,0.05)', isDark: false },
  { id: 'coral', name: 'Terracota Coral', bg: '#38151D', text: '#FFF1F2', sub: '#FDA4AF', border: 'rgba(255,255,255,0.12)', shadow: 'rgba(56,21,29,0.4)', isDark: true }
];

export default function PazHoyPhoneApp({ isActive = true }) {
  const [quotes, setQuotes] = useState(DEFAULT_QUOTES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([1, 3]);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'explore' | 'favorites' | 'settings'
  
  // App-Wide Theme (Light vs Dark mode for the app interface)
  const [isAppDarkMode, setIsAppDarkMode] = useState(false);

  // Quote Card Style Customization (Card-level background & font)
  const [selectedFont, setSelectedFont] = useState(GOOGLE_FONTS[0]);
  const [selectedCardStyle, setSelectedCardStyle] = useState(CARD_BACKGROUND_STYLES[0]);
  const [textAlign, setTextAlign] = useState('center'); // 'left' | 'center' | 'right'
  const [fontSizeOffset, setFontSizeOffset] = useState(0); // -2, 0, +2, +4
  const [hasShadow, setHasShadow] = useState(false);
  const [hasOutline, setHasOutline] = useState(false);
  
  // Style Editor Overlay State
  const [isEditingStyle, setIsEditingStyle] = useState(false);
  const [editorSubTab, setEditorSubTab] = useState('texto'); // 'texto' | 'fondo' | 'espacio' | 'efectos'

  // Creation modal
  const [isCreatingQuote, setIsCreatingQuote] = useState(false);
  const [newQuoteText, setNewQuoteText] = useState('');
  const [newQuoteAuthor, setNewQuoteAuthor] = useState('Yo');
  const [newQuoteSource, setNewQuoteSource] = useState('');

  // Search in explore
  const [searchQuery, setSearchQuery] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  // TikTok style continuous vertical drag / swipe state
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartYRef = useRef(null);

  const currentQuote = quotes[currentIndex] || quotes[0];
  const isFav = favorites.includes(currentQuote.id);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const goToNextQuote = useCallback(() => {
    sounds.playClick();
    setCurrentIndex(prev => (prev + 1) % quotes.length);
  }, [quotes.length]);

  const goToPrevQuote = useCallback(() => {
    sounds.playClick();
    setCurrentIndex(prev => (prev - 1 + quotes.length) % quotes.length);
  }, [quotes.length]);

  const goToRandomQuote = () => {
    sounds.playClick();
    let nextIdx = Math.floor(Math.random() * quotes.length);
    if (nextIdx === currentIndex && quotes.length > 1) {
      nextIdx = (nextIdx + 1) % quotes.length;
    }
    setCurrentIndex(nextIdx);
  };

  // Vertical Touch / Mouse Drag handlers for smooth TikTok snap
  const handleTouchStart = (e) => {
    if (isEditingStyle || activeTab !== 'home') return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    touchStartYRef.current = clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || touchStartYRef.current === null) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const diff = clientY - touchStartYRef.current;
    // Fluid responsive drag offset
    setDragOffset(diff * 0.65);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -35) {
      goToNextQuote();
    } else if (dragOffset > 35) {
      goToPrevQuote();
    }
    setDragOffset(0);
    touchStartYRef.current = null;
  };

  const handleWheel = (e) => {
    if (isEditingStyle || activeTab !== 'home') return;
    if (Math.abs(e.deltaY) > 20) {
      if (e.deltaY > 0) goToNextQuote();
      else goToPrevQuote();
    }
  };

  const toggleFavorite = (id) => {
    sounds.playClick();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
      showToast('Eliminado de favoritos');
    } else {
      setFavorites([...favorites, id]);
      showToast('Guardado en favoritos ❤️');
    }
  };

  const handleSaveQuote = () => {
    sounds.playSuccess();
    showToast('📱 Sincronizado con Home Widget');
  };

  const handleShareQuote = () => {
    sounds.playClick();
    showToast('✨ Imagen exportada a galería');
  };

  const handleCreateQuoteSubmit = (e) => {
    e.preventDefault();
    if (!newQuoteText.trim()) return;

    const newQuote = {
      id: Date.now(),
      text: newQuoteText.trim(),
      author: newQuoteAuthor.trim() || 'Yo',
      source: newQuoteSource.trim() || 'Personal',
      context: 'Frase propia',
      tag: 'personal',
      isCustom: true
    };

    setQuotes(prev => [...prev, newQuote]);
    setCurrentIndex(quotes.length);
    setNewQuoteText('');
    setNewQuoteAuthor('Yo');
    setNewQuoteSource('');
    setIsCreatingQuote(false);
    sounds.playSuccess();
    showToast('¡Frase creada con éxito!');
  };

  const filteredQuotes = quotes.filter(q => 
    q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper renderer for Quote Card (Styled specifically by selectedCardStyle)
  const renderCardContent = (quoteItem, isTargetFav) => (
    <div 
      className="w-full max-w-72 sm:max-w-76 p-4.5 rounded-3xl relative flex flex-col justify-between min-h-56 select-none transition-colors duration-300"
      style={{
        backgroundColor: selectedCardStyle.bg,
        color: selectedCardStyle.text,
        borderColor: selectedCardStyle.border,
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: `0 10px 25px ${selectedCardStyle.shadow}`
      }}
    >
      {/* Card Top: Tag + Favorite Icon */}
      <div className="flex items-center justify-between z-10">
        <span 
          className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md"
          style={{
            backgroundColor: selectedCardStyle.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
            color: selectedCardStyle.sub
          }}
        >
          #{quoteItem.tag}
        </span>

        <button 
          onClick={(e) => { e.stopPropagation(); toggleFavorite(quoteItem.id); }}
          className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Heart 
            className="w-4 h-4 transition-transform active:scale-125"
            style={{
              color: isTargetFav ? '#ef4444' : selectedCardStyle.sub,
              fill: isTargetFav ? '#ef4444' : 'none'
            }}
          />
        </button>
      </div>

      {/* Card Body: Quote Text + Author & Context */}
      <div className="my-auto py-3 space-y-2.5">
        <p 
          className={`${selectedFont.fontClass} leading-relaxed transition-all duration-200`}
          style={{
            textAlign: textAlign,
            fontSize: `${14 + fontSizeOffset}px`,
            textShadow: hasShadow ? (selectedCardStyle.isDark ? '0 3px 12px rgba(0,0,0,0.7)' : '0 2px 8px rgba(0,0,0,0.15)') : 'none',
            WebkitTextStroke: hasOutline ? (selectedCardStyle.isDark ? '0.5px rgba(255,255,255,0.4)' : '0.5px rgba(0,0,0,0.3)') : 'none'
          }}
        >
          “{quoteItem.text}”
        </p>

        <div 
          className="space-y-0.5"
          style={{ textAlign: textAlign }}
        >
          <div className="font-display font-bold text-xs">
            — {quoteItem.author}
          </div>
          {quoteItem.context && (
            <div 
              className="text-[9.5px] italic"
              style={{ color: selectedCardStyle.sub }}
            >
              {quoteItem.context}
            </div>
          )}
          {quoteItem.source && (
            <div 
              className="text-[8.5px] font-mono"
              style={{ color: selectedCardStyle.sub }}
            >
              {quoteItem.source}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Custom Badge + Index indicator */}
      <div 
        className="flex items-center justify-between text-[8px] font-mono pt-2 border-t"
        style={{ borderColor: selectedCardStyle.border, color: selectedCardStyle.sub }}
      >
        <span>{quoteItem.isCustom ? '★ Mi frase' : 'Desliza para siguiente frase'}</span>
        <span>{quotes.indexOf(quoteItem) + 1} / {quotes.length}</span>
      </div>
    </div>
  );

  return (
    <div 
      className={`w-full h-full font-sans select-none flex flex-col justify-between overflow-hidden relative text-[11px] transition-colors duration-300 ${
        isAppDarkMode ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#FFFFFEFA] text-slate-800'
      }`}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
    >

      {/* ========================================================================= */}
      {/* 1. TOP APP BAR (Material 3 Header) */}
      {/* ========================================================================= */}
      <div 
        className={`px-3 pt-6 pb-2 flex items-center justify-between z-30 shrink-0 border-b transition-colors duration-200 ${
          isAppDarkMode ? 'border-white/10' : 'border-slate-200/80'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span className="font-display font-extrabold tracking-tight text-xs">
            PazHoy
          </span>
          <span 
            className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full font-medium ${
              isAppDarkMode ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Frase de hoy
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Flame streak */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-orange-500/10 text-orange-500">
            <Flame className="w-3 h-3 fill-current" />
            <span>5 días</span>
          </div>

          {/* Quick Light/Dark Toggle in Header */}
          <button
            onClick={() => { sounds.playClick(); setIsAppDarkMode(!isAppDarkMode); }}
            title={isAppDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
              isAppDarkMode ? 'bg-white/10 text-yellow-300 hover:bg-white/20' : 'bg-black/5 text-slate-700 hover:bg-black/10'
            }`}
          >
            {isAppDarkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
          </button>

          {/* Quick Done Button when editing style */}
          {isEditingStyle && (
            <button
              onClick={() => setIsEditingStyle(false)}
              className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md cursor-pointer active:scale-90 transition-transform"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BODY CONTENT AREA (Snap PageView / Explore / Favorites / Settings) */}
      {/* ========================================================================= */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-3 overflow-hidden min-h-0">
        
        {/* VIEW A: HOME - CONTINUOUS VERTICAL CONVEYOR REEL (TIKTOK STYLE, NO SUPERPOSITION) */}
        {activeTab === 'home' && (
          <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
            
            {/* Viewport Frame for Active Single Card */}
            <div className="relative w-full max-w-72 sm:max-w-76 h-60 sm:h-64 overflow-hidden flex items-center justify-center">
              
              {/* Continuous Vertical Sliding Track */}
              <div 
                className="w-full h-full flex flex-col gap-4 will-change-transform"
                style={{
                  transform: `translateY(calc(-${currentIndex} * (100% + 16px) + ${dragOffset}px))`,
                  transition: isDragging 
                    ? 'none' 
                    : 'transform 0.42s cubic-bezier(0.2, 0.95, 0.3, 1)'
                }}
              >
                {quotes.map((q, idx) => (
                  <div 
                    key={q.id} 
                    className="w-full shrink-0 h-full flex items-center justify-center"
                    style={{
                      opacity: Math.abs(idx - currentIndex) <= 1 ? 1 : 0.2,
                      transform: Math.abs(idx - currentIndex) === 0 
                        ? 'scale(1)' 
                        : 'scale(0.96)',
                      transition: isDragging 
                        ? 'none' 
                        : 'transform 0.42s cubic-bezier(0.2, 0.95, 0.3, 1), opacity 0.42s ease'
                    }}
                  >
                    {renderCardContent(q, favorites.includes(q.id))}
                  </div>
                ))}
              </div>

            </div>

            {/* Vertical Quick Navigation Arrows (Subtle) */}
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-20">
              <button 
                onClick={goToPrevQuote}
                title="Frase anterior"
                className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-transform active:scale-90 ${
                  isAppDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-slate-700'
                }`}
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={goToNextQuote}
                title="Siguiente frase"
                className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-transform active:scale-90 ${
                  isAppDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-slate-700'
                }`}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

        {/* VIEW B: EXPLORE / SEARCH */}
        {activeTab === 'explore' && (
          <div className="w-full h-full flex flex-col space-y-2 overflow-y-auto custom-scroll p-1">
            <div 
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border ${
                isAppDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por autor, palabra o tema..."
                className="bg-transparent border-none outline-none w-full text-xs placeholder-slate-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-3 h-3 text-slate-400" />
                </button>
              )}
            </div>

            <div className="space-y-1.5 flex-1 overflow-y-auto custom-scroll">
              {filteredQuotes.map((q, idx) => (
                <div 
                  key={q.id}
                  onClick={() => { setCurrentIndex(idx); setActiveTab('home'); }}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer space-y-1 hover:scale-[1.01] ${
                    isAppDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <p className="text-xs line-clamp-2">“{q.text}”</p>
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>{q.author}</span>
                    <span>#{q.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW C: FAVORITES */}
        {activeTab === 'favorites' && (
          <div className="w-full h-full flex flex-col space-y-2 overflow-y-auto custom-scroll p-1">
            <div className="text-xs font-mono font-bold flex items-center justify-between px-1">
              <span>Frases Guardadas</span>
              <span className="text-rose-500 font-bold">{favorites.length}</span>
            </div>

            <div className="space-y-1.5 flex-1 overflow-y-auto custom-scroll">
              {quotes.filter(q => favorites.includes(q.id)).length === 0 ? (
                <div className="text-center py-10 space-y-1 text-slate-400">
                  <Heart className="w-6 h-6 mx-auto opacity-40" />
                  <p className="text-xs">No tienes frases guardadas</p>
                </div>
              ) : (
                quotes.filter(q => favorites.includes(q.id)).map((q) => (
                  <div 
                    key={q.id}
                    className={`p-2.5 rounded-xl border space-y-1 relative ${
                      isAppDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <button 
                      onClick={() => toggleFavorite(q.id)}
                      className="absolute top-2 right-2 p-1 text-rose-500 hover:opacity-75"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <p className="text-xs pr-6">“{q.text}”</p>
                    <div className="text-[9px] font-mono text-slate-400">
                      — {q.author}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* VIEW D: SETTINGS & THEME TOGGLE */}
        {activeTab === 'settings' && (
          <div className="w-full h-full flex flex-col space-y-2 overflow-y-auto custom-scroll p-1">
            
            {/* Dark Mode Switcher Card */}
            <div 
              className={`p-3 rounded-2xl border space-y-2 ${
                isAppDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">Apariencia de la App</span>
                <span className="text-[9px] font-mono text-slate-400">
                  {isAppDarkMode ? 'Modo Oscuro' : 'Modo Claro'}
                </span>
              </div>
              
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400">Tema Oscuro / Claro:</span>
                <button
                  onClick={() => { sounds.playClick(); setIsAppDarkMode(!isAppDarkMode); }}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                    isAppDarkMode 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-slate-200 text-slate-800'
                  }`}
                >
                  {isAppDarkMode ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                  <span>{isAppDarkMode ? 'Oscuro' : 'Claro'}</span>
                </button>
              </div>
            </div>

            {/* Home Widget Sync Card */}
            <div 
              className={`p-3 rounded-2xl border space-y-2 ${
                isAppDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">Home Widget Sync</span>
                <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-emerald-500/20 text-emerald-500 font-bold">ACTIVO</span>
              </div>
              <p className="text-[9.5px] text-slate-400 leading-relaxed">
                El plugin <code className="font-mono text-indigo-500 font-bold">home_widget</code> actualiza el estilo de la tarjeta en la pantalla de inicio.
              </p>
              <button 
                onClick={handleSaveQuote}
                className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-sm"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Sincronizar Widget Ahora</span>
              </button>
            </div>

            {/* Tech Specs */}
            <div 
              className={`p-2.5 rounded-2xl border space-y-1.5 text-[9.5px] font-mono ${
                isAppDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="font-bold text-[10px] mb-1">Arquitectura Flutter</div>
              <div className="flex justify-between py-0.5 border-b border-black/5 dark:border-white/5">
                <span className="text-slate-400">Framework:</span>
                <span>Flutter 3.x / Dart</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-black/5 dark:border-white/5">
                <span className="text-slate-400">Gestor de Estado:</span>
                <span>Provider + LocalStorage</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Fondo Tarjeta Activo:</span>
                <span className="font-bold text-indigo-500">{selectedCardStyle.name}</span>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 3. FLOATING ACTION BUTTONS ROW (EXACT FROM FLUTTER HOME_PAGE) */}
      {/* ========================================================================= */}
      {activeTab === 'home' && !isEditingStyle && (
        <div className="px-3 pb-1 flex items-center justify-center gap-3 z-30 shrink-0">
          <button 
            onClick={goToRandomQuote}
            title="Aleatorio"
            className={`w-8 h-8 rounded-full shadow-md border flex items-center justify-center cursor-pointer active:scale-90 transition-transform ${
              isAppDarkMode ? 'bg-slate-800 text-white border-white/10' : 'bg-white text-slate-800 border-slate-200'
            }`}
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>

          <button 
            onClick={handleSaveQuote}
            title="Guardar / Sync Widget"
            className={`w-8 h-8 rounded-full shadow-md border flex items-center justify-center cursor-pointer active:scale-90 transition-transform ${
              isAppDarkMode ? 'bg-slate-800 text-indigo-400 border-white/10' : 'bg-white text-indigo-600 border-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>

          <button 
            onClick={handleShareQuote}
            title="Compartir"
            className={`w-8 h-8 rounded-full shadow-md border flex items-center justify-center cursor-pointer active:scale-90 transition-transform ${
              isAppDarkMode ? 'bg-slate-800 text-white border-white/10' : 'bg-white text-slate-800 border-slate-200'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          <button 
            onClick={() => { sounds.playClick(); setIsEditingStyle(true); }}
            title="Personalizar estilo de tarjeta"
            className={`w-8 h-8 rounded-full shadow-md border flex items-center justify-center cursor-pointer active:scale-90 transition-transform ${
              isAppDarkMode ? 'bg-slate-800 text-purple-400 border-white/10' : 'bg-white text-purple-600 border-slate-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MODERN STYLE EDITOR OVERLAY (CHANGES QUOTE CARD BACKGROUND ONLY) */}
      {/* ========================================================================= */}
      {isEditingStyle && (
        <div className="px-3 pb-2 z-40 shrink-0">
          <div 
            className={`w-full p-2.5 rounded-2xl border shadow-2xl space-y-2 ${
              isAppDarkMode ? 'bg-slate-900 border-white/15 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            
            {/* Tabs Row */}
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-1 text-[9.5px] font-mono font-bold">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditorSubTab('texto')}
                  className={`px-2 py-0.5 rounded-md cursor-pointer ${editorSubTab === 'texto' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                  Texto
                </button>
                <button
                  onClick={() => setEditorSubTab('fondo')}
                  className={`px-2 py-0.5 rounded-md cursor-pointer ${editorSubTab === 'fondo' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                  Fondo Tarjeta
                </button>
                <button
                  onClick={() => setEditorSubTab('espacio')}
                  className={`px-2 py-0.5 rounded-md cursor-pointer ${editorSubTab === 'espacio' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                  Espacio
                </button>
                <button
                  onClick={() => setEditorSubTab('efectos')}
                  className={`px-2 py-0.5 rounded-md cursor-pointer ${editorSubTab === 'efectos' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                  Efectos
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedFont(GOOGLE_FONTS[0]);
                  setSelectedCardStyle(CARD_BACKGROUND_STYLES[0]);
                  setTextAlign('center');
                  setFontSizeOffset(0);
                  setHasShadow(false);
                  setHasOutline(false);
                  sounds.playClick();
                }}
                title="Reset estilo"
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Tab A: Texto (Google Fonts) */}
            {editorSubTab === 'texto' && (
              <div className="grid grid-cols-2 gap-1 max-h-24 overflow-y-auto custom-scroll">
                {GOOGLE_FONTS.map(f => (
                  <button
                    key={f.id}
                    onClick={() => { setSelectedFont(f); sounds.playClick(); }}
                    className={`p-1.5 rounded-lg border text-left text-[10px] cursor-pointer transition-all ${
                      selectedFont.id === f.id ? 'bg-indigo-50 dark:bg-indigo-900/40 border-indigo-500 font-bold' : 'border-black/5 dark:border-white/10'
                    }`}
                  >
                    <span className={f.fontClass}>{f.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Tab B: Fondo (Card Background Styles ONLY) */}
            {editorSubTab === 'fondo' && (
              <div className="grid grid-cols-3 gap-1 max-h-24 overflow-y-auto custom-scroll">
                {CARD_BACKGROUND_STYLES.map(style => (
                  <button
                    key={style.id}
                    onClick={() => { setSelectedCardStyle(style); sounds.playClick(); }}
                    className={`p-1.5 rounded-lg border text-center text-[9px] cursor-pointer transition-all ${
                      selectedCardStyle.id === style.id ? 'border-indigo-500 font-bold ring-2 ring-indigo-500' : 'border-black/10 dark:border-white/10'
                    }`}
                    style={{
                      backgroundColor: style.bg,
                      color: style.text
                    }}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            )}

            {/* Tab C: Espacio (Alignment & Font Size) */}
            {editorSubTab === 'espacio' && (
              <div className="space-y-1.5 py-0.5">
                <div className="flex items-center justify-around">
                  <button
                    onClick={() => { setTextAlign('left'); sounds.playClick(); }}
                    className={`px-2.5 py-0.5 rounded border text-[9.5px] cursor-pointer ${textAlign === 'left' ? 'bg-indigo-600 text-white font-bold' : 'border-black/10 dark:border-white/10'}`}
                  >
                    Izquierda
                  </button>
                  <button
                    onClick={() => { setTextAlign('center'); sounds.playClick(); }}
                    className={`px-2.5 py-0.5 rounded border text-[9.5px] cursor-pointer ${textAlign === 'center' ? 'bg-indigo-600 text-white font-bold' : 'border-black/10 dark:border-white/10'}`}
                  >
                    Centro
                  </button>
                  <button
                    onClick={() => { setTextAlign('right'); sounds.playClick(); }}
                    className={`px-2.5 py-0.5 rounded border text-[9.5px] cursor-pointer ${textAlign === 'right' ? 'bg-indigo-600 text-white font-bold' : 'border-black/10 dark:border-white/10'}`}
                  >
                    Derecha
                  </button>
                </div>

                <div className="flex items-center justify-between text-[9px] px-1 font-mono">
                  <span>Tamaño de fuente:</span>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setFontSizeOffset(prev => Math.max(-2, prev - 2))}
                      className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 font-bold"
                    >
                      A-
                    </button>
                    <button 
                      onClick={() => setFontSizeOffset(prev => Math.min(4, prev + 2))}
                      className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 font-bold"
                    >
                      A+
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab D: Efectos (Shadow & Outline) */}
            {editorSubTab === 'efectos' && (
              <div className="grid grid-cols-2 gap-1.5 py-0.5 text-[9.5px] font-mono">
                <button
                  onClick={() => { setHasShadow(!hasShadow); sounds.playClick(); }}
                  className={`p-1.5 rounded-lg border text-center cursor-pointer transition-all ${
                    hasShadow ? 'bg-indigo-600 text-white font-bold border-indigo-600' : 'border-black/10 dark:border-white/10'
                  }`}
                >
                  Sombra de Texto
                </button>
                <button
                  onClick={() => { setHasOutline(!hasOutline); sounds.playClick(); }}
                  className={`p-1.5 rounded-lg border text-center cursor-pointer transition-all ${
                    hasOutline ? 'bg-indigo-600 text-white font-bold border-indigo-600' : 'border-black/10 dark:border-white/10'
                  }`}
                >
                  Contorno Suave
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. BOTTOM GLASSMORPHIC DOCK (FLUTTER DOCK COMPONENT) */}
      {/* ========================================================================= */}
      {!isEditingStyle && (
        <div className="px-4 pb-2 z-30 shrink-0">
          <div 
            className={`h-10 rounded-full border shadow-md flex items-center justify-around px-2 backdrop-blur-md transition-colors ${
              isAppDarkMode ? 'bg-slate-900/85 border-white/10' : 'bg-white/85 border-slate-200/80'
            }`}
          >
            <button 
              onClick={() => { sounds.playClick(); setActiveTab('home'); }}
              title="Inicio"
              className={`p-1.5 rounded-full cursor-pointer transition-colors ${activeTab === 'home' ? 'text-indigo-600 dark:text-indigo-400 scale-110' : 'opacity-60 hover:opacity-100'}`}
            >
              <Home className="w-3.5 h-3.5" />
            </button>

            <button 
              onClick={() => { sounds.playClick(); setActiveTab('explore'); }}
              title="Explorar"
              className={`p-1.5 rounded-full cursor-pointer transition-colors ${activeTab === 'explore' ? 'text-indigo-600 dark:text-indigo-400 scale-110' : 'opacity-60 hover:opacity-100'}`}
            >
              <Compass className="w-3.5 h-3.5" />
            </button>

            <button 
              onClick={() => { sounds.playClick(); setIsCreatingQuote(true); }}
              title="Crear mi propia frase"
              className={`p-1.5 rounded-full shadow-sm cursor-pointer active:scale-90 transition-transform ${
                isAppDarkMode ? 'bg-white text-black' : 'bg-black text-white'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            <button 
              onClick={() => { sounds.playClick(); setActiveTab('favorites'); }}
              title="Favoritos"
              className={`p-1.5 rounded-full cursor-pointer transition-colors ${activeTab === 'favorites' ? 'text-indigo-600 dark:text-indigo-400 scale-110' : 'opacity-60 hover:opacity-100'}`}
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>

            <button 
              onClick={() => { sounds.playClick(); setActiveTab('settings'); }}
              title="Ajustes y Modo Oscuro"
              className={`p-1.5 rounded-full cursor-pointer transition-colors ${activeTab === 'settings' ? 'text-indigo-600 dark:text-indigo-400 scale-110' : 'opacity-60 hover:opacity-100'}`}
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. CREATE CUSTOM QUOTE BOTTOM SHEET MODAL */}
      {/* ========================================================================= */}
      {isCreatingQuote && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-end p-2 animate-in fade-in duration-150">
          <form 
            onSubmit={handleCreateQuoteSubmit}
            className={`w-full rounded-3xl p-3.5 border space-y-2.5 shadow-2xl ${
              isAppDarkMode ? 'bg-zinc-900 border-white/15 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-1 border-b border-black/5 dark:border-white/10">
              <span className="font-bold text-xs">Crear mi propia frase</span>
              <button 
                type="button"
                onClick={() => setIsCreatingQuote(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-mono text-slate-400">Frase o reflexión</label>
              <textarea 
                value={newQuoteText}
                onChange={(e) => setNewQuoteText(e.target.value)}
                placeholder="Escribe tu frase aquí..."
                rows={2}
                required
                className="w-full p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-0.5">
                <label className="text-[8.5px] font-mono text-slate-400">Autor</label>
                <input 
                  type="text" 
                  value={newQuoteAuthor}
                  onChange={(e) => setNewQuoteAuthor(e.target.value)}
                  placeholder="Yo"
                  className="w-full p-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] outline-none"
                />
              </div>

              <div className="space-y-0.5">
                <label className="text-[8.5px] font-mono text-slate-400">Origen / Libro</label>
                <input 
                  type="text" 
                  value={newQuoteSource}
                  onChange={(e) => setNewQuoteSource(e.target.value)}
                  placeholder="Diario 2026..."
                  className="w-full p-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] outline-none"
                />
              </div>
            </div>

            <button 
              type="submit"
              className={`w-full py-2 rounded-xl font-bold text-xs cursor-pointer active:scale-95 transition-transform ${
                isAppDarkMode ? 'bg-white text-black' : 'bg-black text-white'
              }`}
            >
              Guardar Frase
            </button>
          </form>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/90 dark:bg-white text-white dark:text-black text-[9.5px] font-mono font-bold shadow-xl flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-150 z-50">
          <Check className="w-3 h-3 text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
