import { useState, useEffect, useRef } from 'react';
import { 
  Plus, Settings, Check, FolderOpen, Timer, Sparkles, 
  Trash2, Copy, Download, Play, Pause, Moon, Sun, 
  ChevronDown, ChevronRight, SlidersHorizontal, AlertCircle, 
  RefreshCw, X, Folder, HelpCircle, User, Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';

// =========================================================================
// 1. DEFAULT DATA & CONSTANTS
// =========================================================================
const DEFAULT_SHELVES = ['General', 'Hogar', 'Proyectos', 'Creatividad', 'Ocio', 'Estudios'];

// Get dates relative to today for mock data
const today = new Date();
const yesterday = new Date(today.getTime() - 24 * 3600 * 1000);
const twoDaysAgo = new Date(today.getTime() - 2 * 24 * 3600 * 1000);
const threeDaysAgo = new Date(today.getTime() - 3 * 24 * 3600 * 1000);

const INITIAL_PLANES = [
  {
    id: 'plan-1',
    titulo: 'Diseñar arquitectura Isar DB offline-first',
    energia: 'high',
    duracionMinutos: 45,
    estante: 'Proyectos',
    completado: false,
    isCategorized: true,
    fechaCreacion: threeDaysAgo.toISOString()
  },
  {
    id: 'plan-2',
    titulo: 'Optimizar Shaders GLSL a SPIR-V para Impeller',
    energia: 'high',
    duracionMinutos: 90,
    estante: 'Proyectos',
    completado: false,
    isCategorized: true,
    fechaCreacion: twoDaysAgo.toISOString()
  },
  {
    id: 'plan-3',
    titulo: 'Configurar canal WebSocket bidireccional',
    energia: 'medium',
    duracionMinutos: 30,
    estante: 'Proyectos',
    completado: false,
    isCategorized: false,
    fechaCreacion: yesterday.toISOString()
  },
  {
    id: 'plan-4',
    titulo: 'Validar reglas de seguridad RBAC Firestore',
    energia: 'high',
    duracionMinutos: 50,
    estante: 'Proyectos',
    completado: false,
    isCategorized: false,
    fechaCreacion: today.toISOString()
  },
  {
    id: 'plan-5',
    titulo: 'Crear widget de Android Home Screen con Glance',
    energia: 'low',
    duracionMinutos: 40,
    estante: 'General',
    completado: false,
    isCategorized: true,
    fechaCreacion: yesterday.toISOString()
  },
  {
    id: 'plan-6',
    titulo: 'Caminata de 20 minutos al aire libre',
    energia: 'low',
    duracionMinutos: 20,
    estante: 'Hogar',
    completado: true,
    isCategorized: true,
    fechaCompletada: today.toISOString(),
    fechaCreacion: twoDaysAgo.toISOString()
  },
  {
    id: 'plan-7',
    titulo: 'Revisar métricas de presupuesto de Inventus',
    energia: 'medium',
    duracionMinutos: 20,
    estante: 'General',
    completado: true,
    isCategorized: true,
    fechaCompletada: yesterday.toISOString(),
    fechaCreacion: threeDaysAgo.toISOString()
  },
  {
    id: 'plan-8',
    titulo: 'Comprar verduras orgánicas',
    energia: 'low',
    duracionMinutos: 15,
    estante: 'Hogar',
    completado: false,
    isCategorized: false,
    fechaCreacion: today.toISOString()
  },
  {
    id: 'plan-9',
    titulo: 'Anotar ideas para el devlog en Notion',
    energia: 'medium',
    duracionMinutos: 10,
    estante: 'Creatividad',
    completado: false,
    isCategorized: false,
    fechaCreacion: today.toISOString()
  }
];

export default function DaysPhoneApp() {
  // App states
  const [booting, setBooting] = useState(true);
  const [activeTab, setActiveTab] = useState(0); // 0: Capture, 1: Organize, 2: Focus, 3: Vibes
  const [planes, setPlanes] = useState(INITIAL_PLANES);
  const [customShelves, setCustomShelves] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Input capture state
  const [newTitle, setNewTitle] = useState('');
  const [showCaptureSuccess, setShowCaptureSuccess] = useState(false);

  // Filters state
  const [filterEstante, setFilterEstante] = useState('Todos');
  const [filterEnergia, setFilterEnergia] = useState('Todas');
  const [showFilterEstanteSheet, setShowFilterEstanteSheet] = useState(false);
  const [showFilterEnergiaSheet, setShowFilterEnergiaSheet] = useState(false);

  // Settings & Edit sheets
  const [showSettings, setShowSettings] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null); // plan object being edited

  // Zen mode overlay
  const [activeZenPlan, setActiveZenPlan] = useState(null); // plan in focus
  const [zenTimeLeft, setZenTimeLeft] = useState(0);
  const [zenIsRunning, setZenIsRunning] = useState(false);
  const zenTimerRef = useRef(null);

  // Particle bursts state for task check completion
  const [burstingTaskId, setBurstingTaskId] = useState(null);

  // Swipe Gestures State (for Organize screen)
  const [dragState, setDragState] = useState({
    active: false,
    taskId: null,
    startX: 0,
    startY: 0,
    dx: 0,
    dy: 0
  });

  // Vibes completed task history accordion
  const [showHistory, setShowHistory] = useState(false);

  // Load default shelves + custom
  const allShelves = [...DEFAULT_SHELVES, ...customShelves];

  // 1. Boot transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // 2. Zen Timer Logic
  useEffect(() => {
    if (zenIsRunning && zenTimeLeft > 0) {
      zenTimerRef.current = setInterval(() => {
        setZenTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(zenTimerRef.current);
            setZenIsRunning(false);
            handleCompleteZenPlan();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(zenTimerRef.current);
    }
    return () => clearInterval(zenTimerRef.current);
  }, [zenIsRunning, zenTimeLeft]);

  // Start Zen Mode
  const startZenMode = (plan) => {
    setActiveZenPlan(plan);
    setZenTimeLeft(plan.duracionMinutos * 60);
    setZenIsRunning(true);
  };

  const handleCompleteZenPlan = () => {
    if (!activeZenPlan) return;
    completeTask(activeZenPlan.id);
    setActiveZenPlan(null);
    setZenIsRunning(false);
  };

  // Complete a task with particle celebration
  const completeTask = (id) => {
    // Play particle burst locally
    setBurstingTaskId(id);
    setTimeout(() => setBurstingTaskId(null), 600);

    // Trigger global confetti inside mockup
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#8B9A86', '#FAF8F5', '#C46A5E', '#FAF8F5']
    });

    // Update state
    setPlanes(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          completado: true,
          fechaCompletada: new Date().toISOString()
        };
      }
      return p;
    }));
  };

  // Un-complete task from history
  const uncompleteTask = (id) => {
    setPlanes(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          completado: false,
          fechaCompletada: null
        };
      }
      return p;
    }));
  };

  // Add captured task to tray (un-categorized)
  const handleCaptureTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPlan = {
      id: 'plan-' + Date.now(),
      titulo: newTitle.trim(),
      energia: 'medium', // default
      duracionMinutos: 15,
      estante: 'General',
      completado: false,
      isCategorized: false,
      fechaCreacion: new Date().toISOString()
    };

    setPlanes(prev => [newPlan, ...prev]);
    setNewTitle('');
    setShowCaptureSuccess(true);
    setTimeout(() => {
      setShowCaptureSuccess(false);
    }, 2000);
  };

  // Categorize a task (from Organize swipe screen)
  const categorizeTask = (id, energy) => {
    setPlanes(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          energia: energy,
          isCategorized: true
        };
      }
      return p;
    }));

    confetti({
      particleCount: 15,
      spread: 35,
      origin: { y: 0.65 },
      colors: [
        energy === 'low' ? '#6E7D6B' : energy === 'medium' ? '#917F72' : '#C46A5E',
        '#8B9A86',
        '#ffffff'
      ]
    });
  };

  // Save manual configurations (create or edit)
  const handleSaveManualConfig = (updatedPlan) => {
    setPlanes(prev => prev.map(p => p.id === updatedPlan.id ? updatedPlan : p));
    setEditingPlan(null);
  };

  // Delete task
  const handleDeleteTask = (id) => {
    setPlanes(prev => prev.filter(p => p.id !== id));
    setEditingPlan(null);
  };

  // Settings actions
  const handleAddShelf = (shelfName) => {
    const trimmed = shelfName.trim();
    if (trimmed && !allShelves.includes(trimmed)) {
      setCustomShelves(prev => [...prev, trimmed]);
    }
  };

  const handleDeleteShelf = (shelfName) => {
    setCustomShelves(prev => prev.filter(s => s !== shelfName));
    // Reset filtered estante if active
    if (filterEstante === shelfName) {
      setFilterEstante('Todos');
    }
    // Re-assign tasks on deleted shelf to 'General'
    setPlanes(prev => prev.map(p => p.estante === shelfName ? { ...p, estante: 'General' } : p));
  };

  const handleExportBackup = () => {
    const dataStr = JSON.stringify({ planes, customShelves, isDarkMode });
    navigator.clipboard.writeText(dataStr);
    alert('¡Copia de seguridad copiada al portapapeles! 📂');
  };

  const handleImportBackup = (jsonStr) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.planes) setPlanes(data.planes);
      if (data.customShelves) setCustomShelves(data.customShelves);
      if (data.isDarkMode !== undefined) setIsDarkMode(data.isDarkMode);
      alert('¡Datos restaurados con éxito! ⚡');
    } catch (e) {
      alert('Error: Código JSON inválido.');
    }
  };

  // Dynamic Greeting Generator
  const getDynamicGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Buenos días';
    if (hours < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  // Helper date text
  const getFechaFamiliar = (isoStr) => {
    if (!isoStr) return '';
    const date = new Date(isoStr);
    const diffTime = Math.abs(today - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays === 2) return 'Anteayer';
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Drag Gesture Handlers for Tinder Swipe (Organize Screen)
  const handlePointerDown = (e, taskId) => {
    e.preventDefault();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    setDragState({
      active: true,
      taskId,
      startX: clientX,
      startY: clientY,
      dx: 0,
      dy: 0
    });
  };

  const handlePointerMove = (e) => {
    if (!dragState.active) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const dx = clientX - dragState.startX;
    const dy = clientY - dragState.startY;

    const thresholdX = 115; // Balanced threshold that feels like flinging/throwing the card off screen
    const thresholdY = 90;  // Balanced vertical threshold

    if (dx > thresholdX) {
      categorizeTask(dragState.taskId, 'high');
      setDragState({ active: false, taskId: null, startX: 0, startY: 0, dx: 0, dy: 0 });
      return;
    } else if (dx < -thresholdX) {
      categorizeTask(dragState.taskId, 'low');
      setDragState({ active: false, taskId: null, startX: 0, startY: 0, dx: 0, dy: 0 });
      return;
    } else if (dy < -thresholdY && Math.abs(dx) < 55) {
      categorizeTask(dragState.taskId, 'medium');
      setDragState({ active: false, taskId: null, startX: 0, startY: 0, dx: 0, dy: 0 });
      return;
    }

    setDragState(prev => ({ ...prev, dx, dy }));
  };

  const handlePointerUp = () => {
    // If they let go before crossing the threshold, reset/snap back
    setDragState({
      active: false,
      taskId: null,
      startX: 0,
      startY: 0,
      dx: 0,
      dy: 0
    });
  };

  // Filter lists
  const uncategorizedTasks = planes.filter(p => !p.isCategorized && !p.completado);
  const pendingCategorizedTasks = planes.filter(p => {
    if (!p.isCategorized || p.completado) return false;
    if (filterEstante !== 'Todos' && p.estante !== filterEstante) return false;
    if (filterEnergia !== 'Todas') {
      const eMap = { 'Baja 🌿': 'low', 'Media 🪵': 'medium', 'Alta 🔥': 'high' };
      if (p.energia !== eMap[filterEnergia]) return false;
    }
    return true;
  });

  const completedTasks = planes.filter(p => p.completado);

  // Vibes analytics stats
  const completedLow = completedTasks.filter(p => p.energia === 'low').length;
  const completedMed = completedTasks.filter(p => p.energia === 'medium').length;
  const completedHigh = completedTasks.filter(p => p.energia === 'high').length;

  const getVibeInsight = () => {
    if (completedTasks.length === 0) return 'Empieza a completar tareas para medir tu ritmo de energía.';
    const maxVal = Math.max(completedLow, completedMed, completedHigh);
    if (maxVal === completedHigh) {
      return 'Ritmo Imparable 🔥 Te estás enfocando en resolver tareas pesadas de alta energía. ¡Excelente empuje!';
    } else if (maxVal === completedLow) {
      return 'Ritmo Fluido 🌱 Estás logrando victorias rápidas y continuas de baja fricción, manteniendo el impulso.';
    } else {
      return 'Equilibrio Armónico ☯️ Mantienes un balance saludable entre esfuerzo sostenido y velocidad.';
    }
  };

  // Heatmap completed data (mocked days helper)
  const getHeatmapData = () => {
    // Match each weekday: Mon=1, Tue=2... Sun=0
    const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return weekdays.map((dayName, idx) => {
      // Filter tasks completed on this day of current week (mock mapping for representation)
      // We look at our planes and count completed items
      // For this demo, let's distribute task completions:
      let count = 0;
      if (dayName === 'Lun') count = 2; // plan-7 (yesterday)
      if (dayName === 'Mar') count = 1; // plan-6 (today)
      if (dayName === 'Mié') count = 0;
      if (dayName === 'Jue') count = 3;
      if (dayName === 'Vie') count = 1;
      if (dayName === 'Sáb') count = 0;
      if (dayName === 'Dom') count = 0;
      
      // Update actual completions based on runtime additions
      // If today is Sunday (0), and we completed tasks today, update Dom count
      const todayDayIdx = today.getDay();
      if (idx === todayDayIdx) {
        count = planes.filter(p => p.completado && p.fechaCompletada && new Date(p.fechaCompletada).getDay() === todayDayIdx).length;
      }
      // If yesterday is the day, update it
      const yesterdayDayIdx = yesterday.getDay();
      if (idx === yesterdayDayIdx) {
        count = planes.filter(p => p.completado && p.fechaCompletada && new Date(p.fechaCompletada).getDay() === yesterdayDayIdx).length;
      }

      return { day: dayName, count };
    });
  };

  // Color theme definitions
  const theme = {
    bg: isDarkMode ? '#181A19' : '#FAF8F5',
    card: isDarkMode ? '#222624' : '#FFFFFF',
    text: isDarkMode ? '#EAE8E3' : '#2C302E',
    border: isDarkMode ? '#333835' : '#E2E9E1',
    accent: '#8B9A86',
    grayText: '#8A8E8C',
    inputBg: isDarkMode ? '#191C1A' : '#FAF8F5',
  };

  // Render Boot screen
  if (booting) {
    return (
      <div 
        className="w-full h-full flex flex-col items-center justify-center transition-colors duration-500 font-sans"
        style={{ backgroundColor: '#FAF8F5' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400;1,6..72,600&display=swap');
          
          .font-outfit {
            font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
          .font-newsreader {
            font-family: 'Newsreader', Georgia, serif;
          }
          
          @keyframes floatLogo {
            0%, 100% { transform: scale(1) translateY(0); }
            50% { transform: scale(1.04) translateY(-4px); }
          }
          .animate-boot-logo {
            animation: floatLogo 2s ease-in-out infinite;
          }
          
          /* Custom styled scrollbars inside the phone mockup */
          .phone-scroll::-webkit-scrollbar {
            width: 3px;
          }
          .phone-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .phone-scroll::-webkit-scrollbar-thumb {
            background: rgba(139, 154, 134, 0.3);
            border-radius: 10px;
          }
          
          /* Slider progress styling */
          .custom-slider {
            -webkit-appearance: none;
            width: 100%;
            height: 6px;
            border-radius: 10px;
            outline: none;
          }
          .custom-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #8B9A86;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 1px 4px rgba(0,0,0,0.15);
          }
          
          @keyframes particle-burst {
            0% {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(var(--dx), var(--dy)) scale(0.2);
              opacity: 0;
            }
          }
          .particle-dot {
            animation: particle-burst 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
          }
          
          @keyframes zen-pulse {
            0%, 100% { transform: scale(1); opacity: 0.85; filter: drop-shadow(0 0 4px rgba(139, 154, 134, 0.3)); }
            50% { transform: scale(1.02); opacity: 1; filter: drop-shadow(0 0 12px rgba(139, 154, 134, 0.6)); }
          }
          .zen-pulsing-container {
            animation: zen-pulse 4s ease-in-out infinite;
          }
        `}} />
        <div className="flex flex-col items-center gap-3.5 animate-boot-logo">
          <div className="w-17 h-17 rounded-full bg-[#ECEEE9] border border-[#8B9A86]/30 flex items-center justify-center shadow-xs">
            <span className="text-[#8B9A86]">
              <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            </span>
          </div>
          <div className="text-center">
            <h1 className="font-outfit text-[22px] font-black tracking-tight text-[#2C302E]">Days</h1>
            <p className="font-outfit text-[10px] text-[#8A8E8C] tracking-widest font-semibold uppercase mt-0.5">Focus.Flow</p>
          </div>
        </div>
      </div>
    );
  }

  // Formatting minutes helper (e.g. 05:00)
  const formatTimeMinutes = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="w-full h-full flex flex-col justify-between font-outfit select-none overflow-hidden relative transition-colors duration-300"
      style={{ backgroundColor: theme.bg, color: theme.text }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Import Styles directly inside mockup viewport */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400;1,6..72,600&display=swap');
        .font-outfit {
          font-family: 'Outfit', sans-serif;
        }
        .font-newsreader {
          font-family: 'Newsreader', serif;
        }
        
        @keyframes zenTabIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-zen-tab {
          animation: zenTabIn 350ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards;
        }
      `}} />

      {/* ========================================================================= */}
      {/* ZEN MODE SCREEN OVERLAY (Inside smartphone viewport) */}
      {/* ========================================================================= */}
      {activeZenPlan && (
        <div className="absolute inset-0 z-50 bg-[#121413] text-[#FAF8F5] flex flex-col justify-between p-5 font-outfit animate-in fade-in duration-200">
          
          {/* Zen Header */}
          <div className="flex items-center justify-between pt-2">
            <button 
              onClick={() => {
                setActiveZenPlan(null);
                setZenIsRunning(false);
              }}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-[#8A8E8C] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono tracking-widest text-[#8B9A86] font-bold">ENFOQUE ZEN</span>
            <div className="w-7 h-7" /> {/* Spacer */}
          </div>

          {/* Pulsing Timer Circle */}
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            <div className="relative w-44 h-44 flex items-center justify-center zen-pulsing-container">
              
              {/* SVG Circular Ring */}
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  cx="88" 
                  cy="88" 
                  r="74" 
                  className="stroke-[#1D201E]" 
                  strokeWidth="4.5" 
                  fill="transparent" 
                />
                <circle 
                  cx="88" 
                  cy="88" 
                  r="74" 
                  className="stroke-[#8B9A86] transition-all duration-1000" 
                  strokeWidth="5" 
                  fill="transparent" 
                  strokeDasharray="465"
                  strokeDashoffset={465 - (465 * (zenTimeLeft / (activeZenPlan.duracionMinutos * 60)))}
                  strokeLinecap="round"
                />
              </svg>

              {/* Time Display */}
              <div className="absolute text-center">
                <span className="text-3xl font-extrabold tracking-tighter text-[#FAF8F5] block font-mono">
                  {formatTimeMinutes(zenTimeLeft)}
                </span>
                <span className="text-[8px] text-[#8B9A86] font-mono tracking-widest uppercase">
                  restantes
                </span>
              </div>
            </div>

            {/* Task Info */}
            <div className="text-center max-w-[80%] space-y-1">
              <span className="text-[9px] font-mono text-[#8B9A86] uppercase tracking-wider">
                {activeZenPlan.estante} • {activeZenPlan.energia === 'low' ? 'Baja 🌿' : activeZenPlan.energia === 'medium' ? 'Media 🪵' : 'Alta 🔥'}
              </span>
              <h2 className="text-[13px] font-newsreader italic text-[#FAF8F5] leading-snug">
                "{activeZenPlan.titulo}"
              </h2>
            </div>
          </div>

          {/* Control Bar */}
          <div className="pb-4 space-y-3 shrink-0">
            <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
              <button
                onClick={() => setZenIsRunning(!zenIsRunning)}
                className={`py-2 rounded-xl border flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all ${
                  zenIsRunning 
                    ? 'border-white/10 bg-white/5 text-[#EAE8E3]' 
                    : 'border-[#8B9A86]/40 bg-[#8B9A86]/10 text-[#8B9A86]'
                }`}
              >
                {zenIsRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Reanudar</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleCompleteZenPlan}
                className="py-2 rounded-xl bg-[#8B9A86] text-black hover:bg-[#9db097] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-md"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Completar</span>
              </button>
            </div>
            
            <p className="text-center text-[7.5px] text-[#8A8E8C] font-mono">
              Mantente en la pantalla para conservar tu racha
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* APP TOP BAR */}
      {/* ========================================================================= */}
      <div 
        className="flex items-center justify-between border-b px-4.5 pb-2.5 pt-4 shrink-0"
        style={{ borderColor: theme.border }}
      >
        <div>
          <div className="text-[14px] font-newsreader font-bold italic tracking-wide" style={{ color: theme.text }}>
            Days: focus.flow
          </div>
          <div className="text-[9px] text-[#8B9A86] font-semibold tracking-wider uppercase">
            {activeTab === 0 ? 'Captura consciente' : activeTab === 1 ? 'Organización física' : activeTab === 2 ? 'Foco profundo' : 'Tus vibras'}
          </div>
        </div>
        
        <div className="flex items-center gap-1.5">
          {/* Settings Trigger */}
          <button 
            onClick={() => setShowSettings(true)}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[#8A8E8C] hover:text-[#8B9A86] transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SCROLLABLE VIEWPORT CONTENT */}
      {/* ========================================================================= */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden px-4.5 py-3">
        
        {/* ==================== SCREEN 0: CAPTURE ==================== */}
        {activeTab === 0 && (
          <div className="flex-1 flex flex-col justify-between py-1.5 space-y-3 animate-zen-tab overflow-hidden">
            {/* Header Greeting */}
            <div className="space-y-1 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-6.5 h-6.5 rounded-full bg-[#8B9A86]/10 border border-[#8B9A86]/20 flex items-center justify-center">
                  <span className="text-[#8B9A86] text-[10px]">✦</span>
                </div>
                <span className="text-[11px] font-semibold text-[#8B9A86] font-mono">
                  {getDynamicGreeting()}
                </span>
              </div>
              <h2 className="text-[15px] font-black tracking-tight" style={{ color: theme.text }}>
                ¿Qué quieres lograr hoy?
              </h2>
              <p className="text-[9px] text-[#8A8E8C] font-medium leading-normal">
                Escríbelo libremente. Se guardará en tu bandeja de entrada para organizarlo en el momento correcto.
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleCaptureTask} className="flex-1 flex flex-col justify-center space-y-3">
              <div 
                className="p-3 rounded-xl border transition-all duration-300 shadow-xs relative"
                style={{ 
                  backgroundColor: theme.card, 
                  borderColor: theme.border 
                }}
              >
                <textarea
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej. Escribir reporte mensual de Inventus..."
                  className="w-full h-16 bg-transparent resize-none outline-none border-none text-[11.5px] font-medium placeholder-[#8A8E8C] phone-scroll"
                  style={{ color: theme.text }}
                  maxLength={120}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleCaptureTask(e);
                    }
                  }}
                />
                
                {/* Character count */}
                <span className="absolute bottom-1.5 right-2.5 text-[7px] font-mono text-[#8A8E8C]">
                  {newTitle.length}/120
                </span>
              </div>

              <button
                type="submit"
                disabled={!newTitle.trim()}
                className={`w-full py-2.5 rounded-xl text-[11px] font-extrabold tracking-wide flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 transition-all ${
                  newTitle.trim()
                    ? 'bg-[#8B9A86] text-[#FAF8F5] shadow-md hover:bg-[#9db097]'
                    : 'bg-black/5 dark:bg-white/5 text-[#8A8E8C] cursor-not-allowed border border-white/5'
                }`}
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Guardar en la Bandeja</span>
              </button>
            </form>

            {/* Success Bubble Animation (Fixed space height to avoid jump) */}
            <div className="h-6 relative shrink-0">
              {showCaptureSuccess && (
                <div className="absolute inset-x-0 top-0 py-1.5 px-3 rounded-lg bg-[#8B9A86]/10 border border-[#8B9A86]/30 text-center animate-in fade-in zoom-in-95 duration-200">
                  <span className="text-[9.5px] font-bold text-[#8B9A86] flex items-center justify-center gap-1">
                    ✨ Añadido a tu mente consciente
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== SCREEN 1: ORGANIZE (Tinder Swipe) ==================== */}
        {activeTab === 1 && (
          <div className="flex-1 flex flex-col justify-between py-1.5 space-y-2.5 animate-zen-tab overflow-hidden">
            
            {/* Header info */}
            <div className="space-y-0.5 text-center shrink-0">
              <h2 className="text-[14px] font-black tracking-tight" style={{ color: theme.text }}>
                Organizador Inteligente
              </h2>
              <p className="text-[9px] text-[#8A8E8C] leading-snug">
                Clasifica arrastrando o pulsando los botones según la energía requerida.
              </p>
            </div>

            {/* Swipe Directions HUD */}
            <div className="grid grid-cols-3 gap-1 font-mono text-[7px] font-bold text-center shrink-0">
              <div className="p-0.5 rounded bg-[#6E7D6B]/15 text-[#6E7D6B] border border-[#6E7D6B]/25">
                ← Baja Energía
              </div>
              <div className="p-0.5 rounded bg-[#917F72]/15 text-[#917F72] border border-[#917F72]/25">
                ↑ Media Energía
              </div>
              <div className="p-0.5 rounded bg-[#C46A5E]/15 text-[#C46A5E] border border-[#C46A5E]/25">
                Alta Energía →
              </div>
            </div>

            {/* Tinder Card Deck Container */}
            <div className="flex-1 flex items-center justify-center relative min-h-35 my-1.5 overflow-hidden">
              {uncategorizedTasks.length > 0 ? (
                // Draw stack
                uncategorizedTasks.map((task, idx) => {
                  if (idx > 1) return null;
                  
                  const isTop = idx === 0;
                  const dx = isTop ? dragState.dx : 0;
                  const dy = isTop ? dragState.dy : 0;
                  const rotate = isTop ? dx * 0.08 : 0;

                  let stampText = '';
                  let stampColor = '';
                  if (isTop && dragState.active) {
                    if (dx > 50) {
                      stampText = 'ALTA 🔥';
                      stampColor = '#C46A5E';
                    } else if (dx < -50) {
                      stampText = 'BAJA 🌿';
                      stampColor = '#6E7D6B';
                    } else if (dy < -45 && Math.abs(dx) < 45) {
                      stampText = 'MEDIA 🪵';
                      stampColor = '#917F72';
                    }
                  }

                  return (
                    <div
                      key={task.id}
                      onPointerDown={(e) => isTop && handlePointerDown(e, task.id)}
                      className="absolute w-full max-w-52.5 h-32.5 rounded-xl border p-3 flex flex-col justify-between cursor-grab active:cursor-grabbing select-none"
                      style={{
                        backgroundColor: theme.card,
                        borderColor: isTop ? '#8B9A86' : theme.border,
                        transform: isTop 
                          ? `translate(${dx}px, ${dy}px) rotate(${rotate}deg)` 
                          : 'translate(0, 6px) scale(0.96)',
                        transition: dragState.active && isTop ? 'none' : 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        zIndex: 10 - idx,
                        opacity: isTop ? 1 : 0.7,
                        boxShadow: isTop ? '0 6px 16px rgba(0,0,0,0.05)' : 'none',
                        touchAction: 'none'
                      }}
                    >
                      {/* Card Stamp overlay covering the whole card */}
                      {stampText && (
                        <div 
                          className="absolute inset-0 rounded-xl flex flex-col items-center justify-center z-20 animate-in fade-in duration-150 select-none pointer-events-none"
                          style={{ 
                            backgroundColor: `${stampColor}D5`, // ~83% opacity matching the categorization theme
                            color: '#FFFFFF'
                          }}
                        >
                          <span className="text-[16px] font-black tracking-wider uppercase font-outfit drop-shadow-sm">
                            {stampText}
                          </span>
                        </div>
                      )}

                      {/* Header */}
                      <div className="flex justify-between items-center font-mono text-[7px] text-[#8A8E8C] font-semibold">
                        <span>BANDEJA ENTRADA</span>
                        <span>{getFechaFamiliar(task.fechaCreacion)}</span>
                      </div>

                      {/* Body Title */}
                      <h4 className="text-[10.5px] font-bold text-center leading-snug my-1.5 line-clamp-3">
                        "{task.titulo}"
                      </h4>

                      {/* Card Footer controls */}
                      <div className="flex justify-between items-center text-[7px] font-mono text-[#8A8E8C]">
                        <span>Arrastra para clasificar</span>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingPlan(task);
                          }}
                          className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-white/5 text-[#8B9A86] font-bold cursor-pointer hover:bg-[#8B9A86]/10"
                        >
                          Ajustes
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                // Empty Deck View
                <div className="text-center p-4 space-y-1.5">
                  <div className="w-10 h-10 rounded-full bg-[#8B9A86]/10 border border-[#8B9A86]/20 flex items-center justify-center mx-auto">
                    <Sparkles className="w-5 h-5 text-[#8B9A86]" />
                  </div>
                  <h4 className="text-[11px] font-bold">¡Bandeja Despejada!</h4>
                  <p className="text-[8.5px] text-[#8A8E8C] max-w-[80%] mx-auto leading-normal">
                    No tienes tareas pendientes por categorizar. Tu mente consciente está libre.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Action buttons */}
            {uncategorizedTasks.length > 0 ? (
              <div className="grid grid-cols-3 gap-1.5 font-mono text-[8.5px] font-bold text-center shrink-0 pt-1">
                <button
                  onClick={() => categorizeTask(uncategorizedTasks[0].id, 'low')}
                  className="py-2 rounded-lg bg-[#6E7D6B] text-white hover:opacity-95 cursor-pointer active:scale-95 transition-all shadow-xs"
                >
                  Baja 🌿
                </button>
                <button
                  onClick={() => categorizeTask(uncategorizedTasks[0].id, 'medium')}
                  className="py-2 rounded-lg bg-[#917F72] text-white hover:opacity-95 cursor-pointer active:scale-95 transition-all shadow-xs"
                >
                  Media 🪵
                </button>
                <button
                  onClick={() => categorizeTask(uncategorizedTasks[0].id, 'high')}
                  className="py-2 rounded-lg bg-[#C46A5E] text-white hover:opacity-95 cursor-pointer active:scale-95 transition-all shadow-xs"
                >
                  Alta 🔥
                </button>
              </div>
            ) : (
              <div className="h-8 shrink-0" />
            )}
          </div>
        )}

        {/* ==================== SCREEN 2: FOCUS ==================== */}
        {activeTab === 2 && (
          <div className="flex-1 flex flex-col space-y-3 animate-zen-tab overflow-hidden">
            {/* Header info */}
            <div className="flex items-center justify-between pb-0.5 shrink-0">
              <div>
                <h2 className="text-[14px] font-black tracking-tight" style={{ color: theme.text }}>
                  Mi Foco Activo
                </h2>
                <p className="text-[8.5px] text-[#8A8E8C]">
                  {pendingCategorizedTasks.length} tareas pendientes en tu mente
                </p>
              </div>
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-2 gap-1.5 font-mono text-[8px] font-bold shrink-0">
              {/* Estante Filter */}
              <button 
                onClick={() => setShowFilterEstanteSheet(true)}
                className="py-1.5 px-2 rounded-lg border flex items-center justify-between bg-black/5 dark:bg-white/5 cursor-pointer hover:bg-[#8B9A86]/10"
                style={{ borderColor: theme.border, color: theme.text }}
              >
                <span className="truncate">📂 Estante: {filterEstante}</span>
                <ChevronDown className="w-3 h-3 text-[#8B9A86] shrink-0" />
              </button>

              {/* Energía Filter */}
              <button 
                onClick={() => setShowFilterEnergiaSheet(true)}
                className="py-1.5 px-2 rounded-lg border flex items-center justify-between bg-black/5 dark:bg-white/5 cursor-pointer hover:bg-[#8B9A86]/10"
                style={{ borderColor: theme.border, color: theme.text }}
              >
                <span className="truncate">⚡ Energía: {filterEnergia.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-[#8B9A86] shrink-0" />
              </button>
            </div>

            {/* Task list - SCROLLABLE COMPONENT */}
            <div className="flex-1 min-h-0 overflow-y-auto phone-scroll pr-0.5 space-y-2 pb-2">
              {pendingCategorizedTasks.length > 0 ? (
                pendingCategorizedTasks.map((plan) => {
                  const energyColors = {
                    low: { bg: '#6E7D6B/12', text: '#6E7D6B', label: 'Baja' },
                    medium: { bg: '#917F72/12', text: '#917F72', label: 'Media' },
                    high: { bg: '#C46A5E/12', text: '#C46A5E', label: 'Alta' }
                  };
                  const colors = energyColors[plan.energia];

                  return (
                    <div
                      key={plan.id}
                      onClick={() => startZenMode(plan)}
                      className="w-full p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer hover:border-[#8B9A86] hover:bg-black/5 shadow-xs relative overflow-hidden"
                      style={{ backgroundColor: theme.card, borderColor: theme.border }}
                    >
                      {/* Checkbox wrapper */}
                      <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-1">
                        
                        <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
                          {/* 8 Dot Burst Animation Overlay */}
                          {burstingTaskId === plan.id && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 pointer-events-none flex items-center justify-center">
                              {Array.from({ length: 8 }).map((_, i) => {
                                const angle = (i * 2 * Math.PI) / 8;
                                const tx = Math.cos(angle) * 18;
                                const ty = Math.sin(angle) * 18;
                                return (
                                  <span 
                                    key={i}
                                    className="absolute w-1.5 h-1.5 rounded-full bg-[#8B9A86] particle-dot"
                                    style={{
                                      '--dx': `${tx}px`,
                                      '--dy': `${ty}px`,
                                      animationDelay: `${i * 15}ms`
                                    }}
                                  />
                                );
                              })}
                            </div>
                          )}

                          <button
                            onClick={() => completeTask(plan.id)}
                            className="w-4.5 h-4.5 rounded-full border-[1.5px] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                            style={{ 
                              borderColor: '#8B9A86',
                              backgroundColor: 'transparent'
                            }}
                          >
                            <span className="w-1 h-1 rounded-full bg-[#8B9A86] opacity-0 hover:opacity-40 transition-opacity" />
                          </button>
                        </div>

                        {/* Title & info column */}
                        <div className="space-y-0.5 min-w-0">
                          <h4 className="text-[11px] font-semibold truncate leading-tight" style={{ color: theme.text }}>
                            {plan.titulo}
                          </h4>
                          
                          {/* Chips Row */}
                          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[7px] font-bold">
                            <span className="px-1.5 py-0.1 rounded bg-[#8B9A86]/10 text-[#8B9A86]">
                              {plan.estante}
                            </span>
                            <span className="text-[#8A8E8C] flex items-center gap-0.5">
                              <Timer className="w-2 h-2" />
                              {plan.duracionMinutos} min
                            </span>
                            <span style={{ color: colors.text }}>
                              • {colors.label}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Edit button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingPlan(plan);
                        }}
                        className="p-1 rounded-full border text-[#8A8E8C] hover:text-[#8B9A86] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer shrink-0"
                        style={{ borderColor: theme.border }}
                      >
                        <SlidersHorizontal className="w-2.5 h-2.5" />
                      </button>

                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#8B9A86]/10 border border-[#8B9A86]/20 flex items-center justify-center mx-auto">
                    <Check className="w-4 h-4 text-[#8B9A86] stroke-[2.5]" />
                  </div>
                  <h4 className="text-[11px] font-bold">Sin tareas en este filtro</h4>
                  <p className="text-[8.5px] text-[#8A8E8C] max-w-[80%] mx-auto leading-normal">
                    Tu mente está completamente enfocada en esta categoría.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== SCREEN 3: VIBES (Analytics) ==================== */}
        {activeTab === 3 && (
          <div className="flex-1 min-h-0 overflow-y-auto phone-scroll pr-0.5 space-y-4 pb-2 animate-zen-tab">
            {/* Header */}
            <div>
              <h2 className="text-[14px] font-black tracking-tight" style={{ color: theme.text }}>
                Mis Vibras y Logros
              </h2>
              <p className="text-[9px] text-[#8A8E8C]">
                Monitoreo analítico de tu energía diaria
              </p>
            </div>

            {/* Vibe Insight Box */}
            <div 
              className="p-3.5 rounded-2xl border space-y-1.5"
              style={{ backgroundColor: theme.card, borderColor: theme.border }}
            >
              <div className="flex items-center gap-1 text-[8.5px] font-bold text-[#8B9A86] font-mono">
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span>RITMO DE ENFOQUE</span>
              </div>
              <p className="text-[11px] font-semibold leading-relaxed" style={{ color: theme.text }}>
                {getVibeInsight()}
              </p>
            </div>

            {/* Heatmap Section */}
            <div 
              className="p-3 rounded-xl border space-y-2.5"
              style={{ backgroundColor: theme.card, borderColor: theme.border }}
            >
              <h4 className="text-[9.5px] font-bold text-[#8A8E8C] font-mono tracking-wider">
                COMPLETADAS ESTA SEMANA
              </h4>
              <div className="grid grid-cols-7 gap-1 text-center font-mono">
                {getHeatmapData().map((item, idx) => {
                  let cellBg = isDarkMode ? '#2C322F' : '#E2E9E1';
                  let cellText = theme.text;
                  let borderStyle = 'none';

                  if (item.count === 1) {
                    cellBg = 'rgba(139, 154, 134, 0.35)';
                  } else if (item.count === 2) {
                    cellBg = 'rgba(139, 154, 134, 0.65)';
                    cellText = '#ffffff';
                  } else if (item.count >= 3) {
                    cellBg = '#8B9A86';
                    cellText = '#ffffff';
                  }

                  const isToday = idx === today.getDay();
                  if (isToday) {
                    borderStyle = '1px solid #8B9A86';
                  }

                  return (
                    <div key={item.day} className="space-y-1">
                      <div 
                        className="aspect-square rounded-lg flex items-center justify-center text-[9.5px] font-bold transition-colors"
                        style={{ 
                          backgroundColor: cellBg, 
                          color: cellText,
                          border: borderStyle
                        }}
                      >
                        {item.count > 0 ? item.count : ''}
                      </div>
                      <span className="text-[8px] text-[#8A8E8C] block font-bold">
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Energy Bar Chart */}
            <div 
              className="p-3 rounded-xl border space-y-2.5"
              style={{ backgroundColor: theme.card, borderColor: theme.border }}
            >
              <h4 className="text-[9.5px] font-bold text-[#8A8E8C] font-mono tracking-wider">
                DISTRIBUCIÓN DE ENERGÍA
              </h4>
              
              <div className="flex justify-around items-end h-20 pt-2 pb-0.5">
                {/* Low Bar */}
                <div className="flex flex-col items-center gap-1 w-10">
                  <span className="text-[8.5px] font-extrabold text-[#6E7D6B] font-mono">
                    {completedLow}
                  </span>
                  <div 
                    className="w-7 rounded-lg bg-[#6E7D6B] transition-all duration-700 ease-out" 
                    style={{ 
                      height: `${Math.max(6, (completedLow / Math.max(1, completedLow + completedMed + completedHigh)) * 50)}px` 
                    }}
                  />
                  <span className="text-[7.5px] font-bold text-[#8A8E8C] font-mono">Baja</span>
                </div>

                {/* Medium Bar */}
                <div className="flex flex-col items-center gap-1 w-10">
                  <span className="text-[8.5px] font-extrabold text-[#917F72] font-mono">
                    {completedMed}
                  </span>
                  <div 
                    className="w-7 rounded-lg bg-[#917F72] transition-all duration-700 ease-out" 
                    style={{ 
                      height: `${Math.max(6, (completedMed / Math.max(1, completedLow + completedMed + completedHigh)) * 50)}px` 
                    }}
                  />
                  <span className="text-[7.5px] font-bold text-[#8A8E8C] font-mono">Media</span>
                </div>

                {/* High Bar */}
                <div className="flex flex-col items-center gap-1 w-10">
                  <span className="text-[8.5px] font-extrabold text-[#C46A5E] font-mono">
                    {completedHigh}
                  </span>
                  <div 
                    className="w-7 rounded-lg bg-[#C46A5E] transition-all duration-700 ease-out" 
                    style={{ 
                      height: `${Math.max(6, (completedHigh / Math.max(1, completedLow + completedMed + completedHigh)) * 50)}px` 
                    }}
                  />
                  <span className="text-[7.5px] font-bold text-[#8A8E8C] font-mono">Alta</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div 
                className="p-2.5 rounded-xl border text-center space-y-0.5"
                style={{ backgroundColor: theme.card, borderColor: theme.border }}
              >
                <span className="text-[13px] font-black text-[#8B9A86] block">
                  {completedTasks.length}
                </span>
                <span className="text-[8px] font-bold text-[#8A8E8C] font-mono uppercase">
                  COMPLETADAS
                </span>
              </div>
              <div 
                className="p-2.5 rounded-xl border text-center space-y-0.5"
                style={{ backgroundColor: theme.card, borderColor: theme.border }}
              >
                <span className="text-[13px] font-black text-[#8B9A86] block">
                  {planes.filter(p => !p.completado).length}
                </span>
                <span className="text-[8px] font-bold text-[#8A8E8C] font-mono uppercase">
                  EN PROGRESO
                </span>
              </div>
            </div>

            {/* Completed Task History (Accordion) */}
            <div className="space-y-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full py-2 px-2.5 rounded-lg border flex items-center justify-between text-[9px] font-bold bg-black/5 dark:bg-white/5 cursor-pointer hover:bg-[#8B9A86]/10"
                style={{ borderColor: theme.border, color: theme.text }}
              >
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#8B9A86]" />
                  Historial de Logros ({completedTasks.length})
                </span>
                <span className="text-[#8B9A86]">
                  {showHistory ? 'Ocultar' : 'Ver'}
                </span>
              </button>

              {showHistory && (
                <div className="space-y-1.5 max-h-30 overflow-y-auto phone-scroll pr-1 animate-in fade-in duration-200">
                  {completedTasks.length > 0 ? (
                    completedTasks.map(plan => (
                      <div 
                        key={plan.id}
                        className="p-2 rounded-lg border flex items-center justify-between text-[9px]"
                        style={{ backgroundColor: theme.card, borderColor: theme.border }}
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <button
                            onClick={() => uncompleteTask(plan.id)}
                            className="w-3.5 h-3.5 rounded-full bg-[#8B9A86] border border-[#8B9A86] flex items-center justify-center shrink-0 cursor-pointer"
                          >
                            <Check className="w-2.5 h-2.5 text-white" />
                          </button>
                          <span className="truncate line-through text-[#8A8E8C]">
                            {plan.titulo}
                          </span>
                        </div>
                        
                        <span className="text-[7.5px] font-mono text-[#8A8E8C] shrink-0 font-medium">
                          {getFechaFamiliar(plan.fechaCompletada)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-[8.5px] text-[#8A8E8C] italic py-1.5">
                      No has completado tareas hoy.
                    </p>
                  )}
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* SETTINGS DRAWER OVERLAY (Inside smartphone viewport) */}
      {/* ========================================================================= */}
      {showSettings && (
        <div className="absolute inset-0 z-45 bg-black/60 flex flex-col justify-end animate-in fade-in duration-250">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowSettings(false)} />
          
          <div 
            className="w-full rounded-t-3xl p-5 space-y-4 max-h-[85%] overflow-y-auto phone-scroll z-10 border-t"
            style={{ backgroundColor: theme.bg, borderColor: theme.border }}
          >
            {/* Grab handle */}
            <div className="w-10 h-1 rounded-full bg-[#8B9A86]/20 mx-auto" />

            {/* Settings Header */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[13px] font-bold flex items-center gap-1.5">
                <Settings className="w-4 h-4 text-[#8B9A86]" /> Configuración
              </span>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[#8A8E8C]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Night mode toggle */}
            <div 
              className="p-3 rounded-2xl border flex items-center justify-between"
              style={{ backgroundColor: theme.card, borderColor: theme.border }}
            >
              <div className="flex items-center gap-2">
                {isDarkMode ? <Moon className="w-4 h-4 text-[#8B9A86]" /> : <Sun className="w-4 h-4 text-[#8B9A86]" />}
                <div>
                  <div className="text-[11.5px] font-bold">Noche Tranquila</div>
                  <div className="text-[8.5px] text-[#8A8E8C] font-medium">Fondo oscuro relajante</div>
                </div>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-10 h-5.5 rounded-full p-0.5 transition-all duration-300 ease-in-out cursor-pointer relative"
                style={{ backgroundColor: isDarkMode ? '#8B9A86' : '#E2E9E1' }}
              >
                <span 
                  className="w-4.5 h-4.5 rounded-full bg-white block shadow-xs transition-transform duration-300"
                  style={{ transform: isDarkMode ? 'translateX(18px)' : 'translateX(0px)' }}
                />
              </button>
            </div>

            {/* Add Custom Shelf */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#8A8E8C] font-mono block">
                CREAR ESTANTE PERSONALIZADO
              </label>
              
              <div className="flex gap-1.5">
                <input 
                  type="text"
                  placeholder="Ej. Gimnasio, Finanzas..."
                  maxLength={18}
                  id="days-new-shelf-input"
                  className="flex-1 px-3 py-2 text-[11px] rounded-xl outline-none border transition-all"
                  style={{ 
                    backgroundColor: theme.card, 
                    borderColor: theme.border,
                    color: theme.text
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddShelf(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const el = document.getElementById('days-new-shelf-input');
                    if (el) {
                      handleAddShelf(el.value);
                      el.value = '';
                    }
                  }}
                  className="px-3 rounded-xl bg-[#8B9A86] text-black font-extrabold text-[10px] flex items-center justify-center cursor-pointer shadow-xs active:scale-95 transition-all"
                >
                  Añadir
                </button>
              </div>
            </div>

            {/* Shelf Chips List */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#8A8E8C] font-mono block">
                ESTANTES ACTIVOS
              </label>
              
              <div className="flex flex-wrap gap-1.5">
                {DEFAULT_SHELVES.map(s => (
                  <span 
                    key={s} 
                    className="px-2.5 py-1 text-[9px] font-bold rounded-lg bg-black/5 dark:bg-white/5 border text-[#8A8E8C]"
                    style={{ borderColor: theme.border }}
                  >
                    {s} (por defecto)
                  </span>
                ))}
                {customShelves.map(s => (
                  <span 
                    key={s} 
                    className="px-2.5 py-1 text-[9px] font-extrabold rounded-lg bg-[#8B9A86]/10 border border-[#8B9A86]/30 text-[#8B9A86] flex items-center gap-1"
                  >
                    {s}
                    <button 
                      onClick={() => handleDeleteShelf(s)}
                      className="text-red-500 hover:text-red-600 font-extrabold font-mono text-[10px]"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Backup copies */}
            <div className="space-y-2 pt-2 border-t" style={{ borderColor: theme.border }}>
              <div className="text-[10px] font-bold text-[#8A8E8C] font-mono uppercase">
                COPIAS DE SEGURIDAD
              </div>
              <p className="text-[8.5px] text-[#8A8E8C] leading-snug">
                Exporta tus datos en JSON para guardarlos, o importa una copia previa.
              </p>

              <div className="grid grid-cols-2 gap-2 text-[9px] font-bold">
                <button
                  onClick={handleExportBackup}
                  className="py-2.5 rounded-xl border flex items-center justify-center gap-1 cursor-pointer bg-black/5 dark:bg-white/5"
                  style={{ borderColor: theme.border, color: theme.text }}
                >
                  <Copy className="w-3 h-3 text-[#8B9A86]" />
                  <span>Exportar Copia</span>
                </button>
                
                <button
                  onClick={() => {
                    const backup = prompt('Pega aquí el código JSON de tu copia de seguridad:');
                    if (backup) handleImportBackup(backup);
                  }}
                  className="py-2.5 rounded-xl border flex items-center justify-center gap-1 cursor-pointer bg-black/5 dark:bg-white/5"
                  style={{ borderColor: theme.border, color: theme.text }}
                >
                  <Download className="w-3 h-3 text-[#8B9A86]" />
                  <span>Importar Copia</span>
                </button>
              </div>
            </div>

            {/* Footer details */}
            <div className="pt-2 text-center text-[8px] font-mono text-[#8A8E8C]">
              Days v9.5 • Enfoque & Serenidad
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TASK DETAIL EDIT / MANUAL CONFIG DRAWER OVERLAY */}
      {/* ========================================================================= */}
      {editingPlan && (
        <div className="absolute inset-0 z-45 bg-black/60 flex flex-col justify-end animate-in fade-in duration-250">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setEditingPlan(null)} />
          
          <div 
            className="w-full rounded-t-3xl p-5 space-y-4 max-h-[85%] overflow-y-auto phone-scroll z-10 border-t"
            style={{ backgroundColor: theme.bg, borderColor: theme.border }}
          >
            {/* Grab handle */}
            <div className="w-10 h-1 rounded-full bg-[#8B9A86]/20 mx-auto" />

            {/* Edit Header */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[13px] font-bold flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-[#8B9A86]" /> Configurar Tarea
              </span>
              <button 
                onClick={() => setEditingPlan(null)}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[#8A8E8C]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Title field */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-[#8A8E8C] font-mono uppercase">
                TÍTULO DE TAREA
              </label>
              <input 
                type="text"
                value={editingPlan.titulo}
                onChange={(e) => setEditingPlan({ ...editingPlan, titulo: e.target.value })}
                className="w-full px-3 py-2 text-[11px] font-bold rounded-xl outline-none border"
                style={{ 
                  backgroundColor: theme.card, 
                  borderColor: theme.border,
                  color: theme.text
                }}
              />
            </div>

            {/* Energy selector */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-[#8A8E8C] font-mono uppercase">
                ENERGÍA REQUERIDA
              </label>
              
              <div className="grid grid-cols-3 gap-1.5 font-mono text-[9px] font-bold text-center">
                <button
                  onClick={() => setEditingPlan({ ...editingPlan, energia: 'low' })}
                  className={`py-2 rounded-xl border transition-all cursor-pointer ${
                    editingPlan.energia === 'low'
                      ? 'bg-[#6E7D6B] text-white border-[#6E7D6B]'
                      : 'bg-transparent text-[#6E7D6B]'
                  }`}
                  style={{ borderColor: editingPlan.energia === 'low' ? undefined : theme.border }}
                >
                  Baja 🌿
                </button>
                
                <button
                  onClick={() => setEditingPlan({ ...editingPlan, energia: 'medium' })}
                  className={`py-2 rounded-xl border transition-all cursor-pointer ${
                    editingPlan.energia === 'medium'
                      ? 'bg-[#917F72] text-white border-[#917F72]'
                      : 'bg-transparent text-[#917F72]'
                  }`}
                  style={{ borderColor: editingPlan.energia === 'medium' ? undefined : theme.border }}
                >
                  Media 🪵
                </button>

                <button
                  onClick={() => setEditingPlan({ ...editingPlan, energia: 'high' })}
                  className={`py-2 rounded-xl border transition-all cursor-pointer ${
                    editingPlan.energia === 'high'
                      ? 'bg-[#C46A5E] text-white border-[#C46A5E]'
                      : 'bg-transparent text-[#C46A5E]'
                  }`}
                  style={{ borderColor: editingPlan.energia === 'high' ? undefined : theme.border }}
                >
                  Alta 🔥
                </button>
              </div>
            </div>

            {/* Duration slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[9px] font-bold text-[#8A8E8C] font-mono">
                <span>DURACIÓN ENFOQUE</span>
                <span className="text-[#8B9A86]">{editingPlan.duracionMinutos} minutos</span>
              </div>
              
              <input 
                type="range"
                min={5}
                max={120}
                step={5}
                value={editingPlan.duracionMinutos}
                onChange={(e) => setEditingPlan({ ...editingPlan, duracionMinutos: parseInt(e.target.value) })}
                className="custom-slider"
                style={{ backgroundColor: theme.border }}
              />
            </div>

            {/* Shelf selector */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-[#8A8E8C] font-mono uppercase">
                ESTANTE CATEGORÍA
              </label>
              
              <div className="flex flex-wrap gap-1.5">
                {allShelves.map((shelf) => {
                  const isActive = editingPlan.estante === shelf;
                  return (
                    <button
                      key={shelf}
                      onClick={() => setEditingPlan({ ...editingPlan, estante: shelf })}
                      className={`px-2.5 py-1 text-[9px] font-bold rounded-lg border transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-[#8B9A86] text-black border-[#8B9A86]' 
                          : 'bg-black/5 dark:bg-white/5 text-[#8A8E8C]'
                      }`}
                      style={{ borderColor: isActive ? undefined : theme.border }}
                    >
                      {shelf}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 grid grid-cols-2 gap-2 text-[10px] font-bold">
              <button
                onClick={() => handleDeleteTask(editingPlan.id)}
                className="py-2.5 rounded-xl border border-red-500/20 text-red-500 bg-red-500/5 hover:bg-red-500/10 flex items-center justify-center gap-1 cursor-pointer active:scale-95"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar</span>
              </button>
              
              <button
                onClick={() => handleSaveManualConfig({ ...editingPlan, isCategorized: true })}
                className="py-2.5 rounded-xl bg-[#8B9A86] text-black hover:bg-[#9db097] flex items-center justify-center gap-1 cursor-pointer active:scale-95"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FILTER SHEETS */}
      {/* ========================================================================= */}
      {showFilterEstanteSheet && (
        <div className="absolute inset-0 z-45 bg-black/60 flex flex-col justify-end animate-in fade-in duration-200">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowFilterEstanteSheet(false)} />
          <div 
            className="w-full rounded-t-3xl p-5 space-y-3 z-10 border-t max-h-[60%] overflow-y-auto phone-scroll"
            style={{ backgroundColor: theme.bg, borderColor: theme.border }}
          >
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span>Selecciona Estante</span>
              <button onClick={() => setShowFilterEstanteSheet(false)} className="text-[#8A8E8C]">✕</button>
            </div>
            
            <div className="flex flex-col gap-1.5 font-mono text-[9px] font-bold">
              <button
                onClick={() => { setFilterEstante('Todos'); setShowFilterEstanteSheet(false); }}
                className={`py-2 px-3 text-left rounded-xl border transition-all ${
                  filterEstante === 'Todos' ? 'bg-[#8B9A86]/20 border-[#8B9A86] text-[#8B9A86]' : 'bg-transparent text-[#8A8E8C]'
                }`}
                style={{ borderColor: filterEstante === 'Todos' ? undefined : theme.border }}
              >
                📂 Todos los Estantes
              </button>
              {allShelves.map((shelf) => (
                <button
                  key={shelf}
                  onClick={() => { setFilterEstante(shelf); setShowFilterEstanteSheet(false); }}
                  className={`py-2 px-3 text-left rounded-xl border transition-all ${
                    filterEstante === shelf ? 'bg-[#8B9A86]/20 border-[#8B9A86] text-[#8B9A86]' : 'bg-transparent text-zinc-400'
                  }`}
                  style={{ borderColor: filterEstante === shelf ? undefined : theme.border }}
                >
                  📁 {shelf}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showFilterEnergiaSheet && (
        <div className="absolute inset-0 z-45 bg-black/60 flex flex-col justify-end animate-in fade-in duration-200">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowFilterEnergiaSheet(false)} />
          <div 
            className="w-full rounded-t-3xl p-5 space-y-3 z-10 border-t"
            style={{ backgroundColor: theme.bg, borderColor: theme.border }}
          >
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span>Selecciona Nivel de Energía</span>
              <button onClick={() => setShowFilterEnergiaSheet(false)} className="text-[#8A8E8C]">✕</button>
            </div>
            
            <div className="flex flex-col gap-1.5 font-mono text-[9px] font-bold">
              {['Todas', 'Baja 🌿', 'Media 🪵', 'Alta 🔥'].map((energy) => (
                <button
                  key={energy}
                  onClick={() => { setFilterEnergia(energy); setShowFilterEnergiaSheet(false); }}
                  className={`py-2 px-3 text-left rounded-xl border transition-all ${
                    filterEnergia === energy ? 'bg-[#8B9A86]/20 border-[#8B9A86] text-[#8B9A86]' : 'bg-transparent text-zinc-400'
                  }`}
                  style={{ borderColor: filterEnergia === energy ? undefined : theme.border }}
                >
                  ⚡ {energy}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BOTTOM TAB NAVIGATION (Zen Style Capsule) */}
      {/* ========================================================================= */}
      <div 
        className="border-t px-3.5 py-3 shrink-0 flex items-center justify-around select-none"
        style={{ 
          backgroundColor: theme.card, 
          borderColor: theme.border 
        }}
      >
        {/* Tab 0: Capture */}
        <button
          onClick={() => setActiveTab(0)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl transition-all duration-300 ease-out cursor-pointer active:scale-95 ${
            activeTab === 0 
              ? 'bg-[#8B9A86]/18 text-[#8B9A86]' 
              : 'bg-transparent text-[#8A8E8C] hover:text-[#8B9A86]'
          }`}
        >
          <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
          {activeTab === 0 && (
            <span className="text-[11px] font-bold tracking-tight font-outfit">
              Capturar
            </span>
          )}
        </button>

        {/* Tab 1: Organize */}
        <button
          onClick={() => setActiveTab(1)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl transition-all duration-300 ease-out cursor-pointer active:scale-95 relative ${
            activeTab === 1 
              ? 'bg-[#8B9A86]/18 text-[#8B9A86]' 
              : 'bg-transparent text-[#8A8E8C] hover:text-[#8B9A86]'
          }`}
        >
          <RefreshCw className="w-4 h-4 stroke-[2.5]" />
          {activeTab === 1 && (
            <span className="text-[11px] font-bold tracking-tight font-outfit">
              Organizar
            </span>
          )}
          {uncategorizedTasks.length > 0 && activeTab !== 1 && (
            <span className="absolute top-1 right-2.5 w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          )}
        </button>

        {/* Tab 2: Focus */}
        <button
          onClick={() => setActiveTab(2)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl transition-all duration-300 ease-out cursor-pointer active:scale-95 ${
            activeTab === 2 
              ? 'bg-[#8B9A86]/18 text-[#8B9A86]' 
              : 'bg-transparent text-[#8A8E8C] hover:text-[#8B9A86]'
          }`}
        >
          <Timer className="w-4.5 h-4.5 stroke-2" />
          {activeTab === 2 && (
            <span className="text-[11px] font-bold tracking-tight font-outfit">
              Foco
            </span>
          )}
        </button>

        {/* Tab 3: Vibes */}
        <button
          onClick={() => setActiveTab(3)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl transition-all duration-300 ease-out cursor-pointer active:scale-95 ${
            activeTab === 3 
              ? 'bg-[#8B9A86]/18 text-[#8B9A86]' 
              : 'bg-transparent text-[#8A8E8C] hover:text-[#8B9A86]'
          }`}
        >
          <Sparkles className="w-4.5 h-4.5 stroke-2" />
          {activeTab === 3 && (
            <span className="text-[11px] font-bold tracking-tight font-outfit">
              Vibras
            </span>
          )}
        </button>
      </div>

    </div>
  );
}
