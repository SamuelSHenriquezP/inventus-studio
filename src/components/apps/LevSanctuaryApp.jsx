// src/components/apps/LevSanctuaryApp.jsx
import { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Heart, Moon, Sun, CloudRain, Wind, 
  Volume2, VolumeX, CheckCircle2, Circle, MessageSquare, 
  BookOpen, Compass, Feather, RefreshCw, Send, ArrowRight
} from 'lucide-react';

// =========================================================================
// 1. LEV BOTANICAL THEME CONSTANTS (From Flutter lib/core/theme/lev_theme.dart)
// =========================================================================
const LEV_THEME = {
  matcha: '#7A9A60',
  matchaDark: '#587B4C',
  matchaLight: '#EAF2E8',
  cream: '#FAF8F5',
  peach: '#F4A28C',
  peachDark: '#E76F51',
  sky: '#D0E8F2',
  lavanda: '#E2D9F3',
  textDark: '#2D3748',
  textMuted: '#718096',
  cardWhite: 'rgba(255, 255, 255, 0.88)',
  border: 'rgba(45, 55, 72, 0.08)',
  // Dark mode
  darkBg: '#0E1714',
  darkSurface: '#162420',
  darkText: '#F0F4F2',
  darkTextMuted: '#A0B5AC',
  matchaNight: '#80E2BF'
};

const AMBIENT_SOUNDS = [
  { id: 'rain', name: 'Lluvia en el Jardín', icon: CloudRain, hz: '432Hz' },
  { id: 'wind', name: 'Brisa de Montaña', icon: Wind, hz: '528Hz' },
  { id: 'bell', name: 'Cuenco Tibetano', icon: Sparkles, hz: '432Hz' }
];

const INITIAL_HABITS = [
  { id: 'h1', title: 'Respiración diafragmática (3 min)', tag: 'Calma Somática', done: true },
  { id: 'h2', title: 'Anotar 3 micro-agradecimientos', tag: 'Enfoque Cognitivo', done: false },
  { id: 'h3', title: 'Caminar 10 minutos sin teléfono', tag: 'Detox Digital', done: false },
  { id: 'h4', title: 'Infusión tibia de manzanilla', tag: 'Cuidado Vital', done: true }
];

export default function LevSanctuaryApp() {
  const [activeTab, setActiveTab] = useState('sanctuary'); // 'sanctuary' | 'habits' | 'journal' | 'companion'
  const [isDark, setIsDark] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const [selectedSound, setSelectedSound] = useState(AMBIENT_SOUNDS[0]);
  const [habits, setHabits] = useState(INITIAL_HABITS);
  const [petCount, setPetCount] = useState(0);
  const [isPetting, setIsPetting] = useState(false);
  const [levMoodText, setLevMoodText] = useState('Lev siente tu presencia tranquila');
  
  // Breathing exercise modal state
  const [isBreathingModal, setIsBreathingModal] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhala'); // Inhala (4s), Mantén (7s), Exhala (8s)
  const [breathTimer, setBreathTimer] = useState(4);

  // Companion Chat state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'lev', text: 'Bienvenido de vuelta a tu santuario. ¿Cómo se siente tu cuerpo en este instante?' },
    { sender: 'user', text: 'Un poco cansado tras una larga jornada de programación.' },
    { sender: 'lev', text: 'Es comprensible. Descansa los ojos un segundo. Tu valor no depende de cuántas líneas escribiste hoy, sino de la serenidad con la que habitas el presente.' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Breathing loop timer
  useEffect(() => {
    if (!isBreathingModal) return;
    const interval = setInterval(() => {
      setBreathPhase(prev => {
        if (prev === 'Inhala (4s)') return 'Mantén el aire (7s)';
        if (prev === 'Mantén el aire (7s)') return 'Exhala suavemente (8s)';
        return 'Inhala (4s)';
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isBreathingModal]);

  const handlePetLev = () => {
    setIsPetting(true);
    setPetCount(prev => prev + 1);
    const msgs = [
      'Lev emite un leve destello cálido ✨',
      'Lev vibra en sintonía con tu calma 🌿',
      'Lev sonríe y exhala tranquilidad 🌸',
      'Tu santuario florece un poco más 🍃'
    ];
    setLevMoodText(msgs[Math.floor(Math.random() * msgs.length)]);
    setTimeout(() => setIsPetting(false), 800);
  };

  const toggleHabit = (id) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, done: !h.done } : h));
  };

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    const userMsg = inputMsg.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputMsg('');
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'lev', text: 'Te escucho con atención. Respira profundo; aquí no hay prisa ni juicio.' }
      ]);
    }, 900);
  };

  const bg = isDark ? LEV_THEME.darkBg : LEV_THEME.cream;
  const cardBg = isDark ? LEV_THEME.darkSurface : LEV_THEME.cardWhite;
  const textColor = isDark ? LEV_THEME.darkText : LEV_THEME.textDark;
  const textMuted = isDark ? LEV_THEME.darkTextMuted : LEV_THEME.textMuted;
  const matchaColor = isDark ? LEV_THEME.matchaNight : LEV_THEME.matcha;

  return (
    <div 
      className="w-full h-full flex flex-col font-sans select-none overflow-hidden relative transition-colors duration-300"
      style={{ backgroundColor: bg, color: textColor }}
    >
      {/* ─────────────────────────────────────────────────────────────
          TOP SANCTUARY STATUS BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: isDark ? '#1F312B' : LEV_THEME.border }}>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: matchaColor }} />
          <div>
            <span className="text-[10px] font-bold block leading-tight font-serif">Santuario Serena</span>
            <span className="text-[8px] font-mono" style={{ color: textMuted }}>NIVEL 3 • 85% VITAL</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setSoundActive(!soundActive)}
            className="p-1 rounded-full border cursor-pointer transition-all"
            style={{ 
              borderColor: isDark ? '#263D36' : LEV_THEME.border,
              backgroundColor: soundActive ? (isDark ? '#1E332D' : LEV_THEME.matchaLight) : 'transparent',
              color: soundActive ? matchaColor : textMuted
            }}
            title="Paisaje sonoro 432Hz"
          >
            {soundActive ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
          </button>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-1 rounded-full border cursor-pointer transition-all"
            style={{ borderColor: isDark ? '#263D36' : LEV_THEME.border, color: textMuted }}
          >
            {isDark ? <Sun className="w-3 h-3 text-amber-300" /> : <Moon className="w-3 h-3 text-indigo-500" />}
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB CONTENT
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto custom-scroll p-3 flex flex-col justify-between">
        {/* TAB 1: SANCTUARY (Main Screen with Lev Companion) */}
        {activeTab === 'sanctuary' && (
          <div className="flex-1 flex flex-col items-center justify-between">
            {/* Audio Ambience Pill */}
            {soundActive && (
              <div 
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-mono shadow-xs animate-pulse"
                style={{ backgroundColor: cardBg, borderColor: isDark ? '#263D36' : LEV_THEME.border }}
              >
                <selectedSound.icon className="w-3 h-3" style={{ color: matchaColor }} />
                <span>{selectedSound.name} ({selectedSound.hz})</span>
              </div>
            )}

            {/* Central Protagonist: LEV Living Seed Spirit */}
            <div className="flex flex-col items-center my-3 relative">
              {/* Botanical Glow Halo */}
              <div 
                className="absolute inset-0 w-32 h-32 -top-2 -left-2 rounded-full blur-2xl pointer-events-none opacity-40 transition-all"
                style={{ backgroundColor: matchaColor }}
              />

              {/* The Spirit Creature */}
              <div 
                onClick={handlePetLev}
                className={`relative w-28 h-28 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all duration-300 shadow-xl ${
                  isPetting ? 'scale-110 rotate-3' : 'animate-bounce'
                }`}
                style={{ 
                  animationDuration: '3.5s',
                  backgroundColor: isDark ? '#1A2C26' : '#FFFFFF',
                  borderColor: matchaColor,
                  boxShadow: `0 10px 25px ${isDark ? 'rgba(0,0,0,0.5)' : 'rgba(122, 154, 96, 0.25)'}`
                }}
              >
                {/* Seed sprout leaf on head */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center">
                  <div 
                    className="w-3 h-5 rounded-full rotate-25 origin-bottom"
                    style={{ backgroundColor: matchaColor }}
                  />
                  <div 
                    className="w-2.5 h-4 rounded-full -rotate-30 -ml-1 origin-bottom"
                    style={{ backgroundColor: LEV_THEME.peach }}
                  />
                </div>

                {/* Face */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-3">
                    {/* Eyes */}
                    <div 
                      className={`w-2 h-2 rounded-full transition-all ${isPetting ? 'scale-y-20 h-1' : ''}`}
                      style={{ backgroundColor: textColor }}
                    />
                    <div 
                      className={`w-2 h-2 rounded-full transition-all ${isPetting ? 'scale-y-20 h-1' : ''}`}
                      style={{ backgroundColor: textColor }}
                    />
                  </div>
                  {/* Cheeks */}
                  <div className="flex items-center gap-5 -mt-0.5">
                    <div className="w-1.5 h-1 rounded-full opacity-60" style={{ backgroundColor: LEV_THEME.peach }} />
                    <div className="w-1.5 h-1 rounded-full opacity-60" style={{ backgroundColor: LEV_THEME.peach }} />
                  </div>
                  {/* Mouth */}
                  <div 
                    className="w-1.5 h-1 border-b-2 rounded-full -mt-0.5"
                    style={{ borderColor: textColor }}
                  />
                </div>
              </div>

              {/* Status Message */}
              <p className="text-[10px] text-center mt-3 max-w-[200px] leading-tight font-serif italic" style={{ color: textMuted }}>
                "{levMoodText}"
              </p>
              <span className="text-[8px] font-mono mt-1" style={{ color: matchaColor }}>
                Toca a Lev para acariciar ({petCount})
              </span>
            </div>

            {/* Somatic Quick Actions */}
            <div className="w-full space-y-1.5">
              <button 
                onClick={() => setIsBreathingModal(true)}
                className="w-full p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xs"
                style={{ backgroundColor: cardBg, borderColor: isDark ? '#263D36' : LEV_THEME.border }}
              >
                <div className="flex items-center gap-2 text-left">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: LEV_THEME.matchaLight, color: LEV_THEME.matchaDark }}>
                    <Wind className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold block leading-tight font-serif">Respiración 4-7-8</span>
                    <span className="text-[8px] font-mono" style={{ color: textMuted }}>Ritmo somático de calma</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5" style={{ color: matchaColor }} />
              </button>

              <div 
                className="p-2.5 rounded-xl border"
                style={{ backgroundColor: cardBg, borderColor: isDark ? '#263D36' : LEV_THEME.border }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-bold font-serif">Check-in de Hábitos de Hoy</span>
                  <span className="text-[8px] font-mono" style={{ color: matchaColor }}>
                    {habits.filter(h => h.done).length} / {habits.length}
                  </span>
                </div>
                <div className="space-y-1">
                  {habits.slice(0, 2).map(h => (
                    <div 
                      key={h.id}
                      onClick={() => toggleHabit(h.id)}
                      className="flex items-center justify-between p-1.5 rounded-lg border text-[9px] cursor-pointer"
                      style={{ 
                        backgroundColor: h.done ? (isDark ? '#142721' : LEV_THEME.matchaLight) : 'transparent',
                        borderColor: isDark ? '#263D36' : LEV_THEME.border
                      }}
                    >
                      <span className={h.done ? 'line-through opacity-70' : ''}>{h.title}</span>
                      {h.done ? (
                        <CheckCircle2 className="w-3.5 h-3.5" style={{ color: matchaColor }} />
                      ) : (
                        <Circle className="w-3.5 h-3.5" style={{ color: textMuted }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HÁBITOS */}
        {activeTab === 'habits' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1 border-b" style={{ borderColor: isDark ? '#1F312B' : LEV_THEME.border }}>
              <h3 className="text-xs font-serif font-bold">Catálogo de Micro-Hábitos</h3>
              <span className="text-[8px] font-mono" style={{ color: textMuted }}>4 ACTIVOS</span>
            </div>
            {habits.map(h => (
              <div 
                key={h.id}
                onClick={() => toggleHabit(h.id)}
                className="p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all shadow-xs"
                style={{ 
                  backgroundColor: h.done ? (isDark ? '#162C24' : LEV_THEME.matchaLight) : cardBg,
                  borderColor: isDark ? '#263D36' : LEV_THEME.border
                }}
              >
                <div>
                  <span className="text-[8px] font-mono uppercase font-bold block" style={{ color: matchaColor }}>
                    {h.tag}
                  </span>
                  <span className={`text-[10px] font-serif font-medium ${h.done ? 'line-through opacity-70' : ''}`}>
                    {h.title}
                  </span>
                </div>
                {h.done ? (
                  <CheckCircle2 className="w-4 h-4" style={{ color: matchaColor }} />
                ) : (
                  <Circle className="w-4 h-4" style={{ color: textMuted }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: DIARIO TCC */}
        {activeTab === 'journal' && (
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl border text-center" style={{ backgroundColor: cardBg, borderColor: isDark ? '#263D36' : LEV_THEME.border }}>
              <span className="text-[8px] font-mono uppercase text-[#7A9A60] font-bold block">REESTRUCTURACIÓN COGNITIVA</span>
              <h4 className="text-xs font-serif font-bold mt-0.5">Onda Emocional Semanal</h4>
              <div className="flex justify-between items-end h-16 pt-3 px-2 gap-1.5">
                {[65, 80, 45, 90, 75, 85, 95].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full rounded-t-sm transition-all"
                      style={{ height: `${val}%`, backgroundColor: matchaColor }}
                    />
                    <span className="text-[7px] font-mono" style={{ color: textMuted }}>
                      {['L', 'M', 'X', 'J', 'V', 'S', 'D'][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-2.5 rounded-xl border" style={{ backgroundColor: cardBg, borderColor: isDark ? '#263D36' : LEV_THEME.border }}>
              <span className="text-[8px] font-mono uppercase text-amber-500 font-bold block">REFLEXIÓN GUIADA</span>
              <p className="text-[10px] font-serif italic mt-1" style={{ color: textColor }}>
                "El agua no lucha contra la roca; fluye a su alrededor hasta darle forma."
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: COMPAÑERO CHAT */}
        {activeTab === 'companion' && (
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-2 overflow-y-auto max-h-56 pr-1 custom-scroll">
              {chatMessages.map((m, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className="max-w-[82%] p-2 rounded-xl text-[9px] sm:text-[10px] font-serif leading-relaxed shadow-xs"
                    style={{
                      backgroundColor: m.sender === 'user' 
                        ? (isDark ? '#263D36' : LEV_THEME.matcha) 
                        : (isDark ? '#1A2A25' : '#FFFFFF'),
                      color: m.sender === 'user' ? '#FFFFFF' : textColor,
                      border: m.sender === 'lev' ? `1px solid ${isDark ? '#263D36' : LEV_THEME.border}` : 'none'
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1.5 mt-2 pt-2 border-t" style={{ borderColor: isDark ? '#1F312B' : LEV_THEME.border }}>
              <input 
                type="text" 
                value={inputMsg}
                onChange={e => setInputMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe a Lev..."
                className="flex-1 bg-transparent border rounded-lg px-2 py-1 text-[10px] focus:outline-none"
                style={{ borderColor: isDark ? '#263D36' : LEV_THEME.border }}
              />
              <button 
                onClick={handleSendMessage}
                className="p-1.5 rounded-lg text-white cursor-pointer"
                style={{ backgroundColor: matchaColor }}
              >
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          BREATHING MODAL OVERLAY (4-7-8)
      ───────────────────────────────────────────────────────────── */}
      {isBreathingModal && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center p-4">
          <div className="text-center space-y-4 text-white">
            <span className="text-[9px] font-mono tracking-widest uppercase text-emerald-400">
              RESPIRACIÓN SOMÁTICA
            </span>
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <div 
                className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-ping"
                style={{ animationDuration: '4.5s' }}
              />
              <div 
                className="w-24 h-24 rounded-full border-2 border-emerald-300 flex items-center justify-center bg-emerald-950/50 shadow-2xl transition-all duration-1000"
              >
                <span className="text-xs font-serif font-bold text-center px-2">
                  {breathPhase}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsBreathingModal(false)}
              className="px-4 py-1.5 rounded-full border border-white/20 text-[10px] font-mono uppercase hover:bg-white/10 cursor-pointer"
            >
              Cerrar Ejercicio
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM NAVIGATION BAR
      ───────────────────────────────────────────────────────────── */}
      <div 
        className="flex items-center justify-around py-2 border-t shadow-xs"
        style={{ backgroundColor: cardBg, borderColor: isDark ? '#1F312B' : LEV_THEME.border }}
      >
        {[
          { id: 'sanctuary', label: 'Santuario', icon: Sparkles },
          { id: 'habits', label: 'Hábitos', icon: CheckCircle2 },
          { id: 'journal', label: 'Diario', icon: BookOpen },
          { id: 'companion', label: 'Compañero', icon: MessageSquare }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-0.5 cursor-pointer transition-all"
              style={{ color: isActive ? matchaColor : textMuted }}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="text-[8px] font-mono font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
