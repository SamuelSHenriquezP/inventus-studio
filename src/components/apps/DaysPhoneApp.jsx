import { useState } from 'react';
import { CheckCircle2, Circle, Shuffle } from 'lucide-react';

export default function DaysPhoneApp() {
  const [activeSpace, setActiveSpace] = useState('menu'); // 'menu' | 'estantes' | 'radar'
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Diseñar arquitectura Isar DB offline', category: 'Plato Fuerte', completed: false },
    { id: 2, title: 'Optimizar Shaders GLSL a SPIR-V', category: 'Plato Fuerte', completed: false },
    { id: 3, title: 'Revisar métricas de presupuesto', category: 'Entrada', completed: true },
    { id: 4, title: 'Caminata de 20 minutos', category: 'Postre', completed: false }
  ]);
  const [radarTask, setRadarTask] = useState('Enfocarse en optimizar Shaders');

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const spinRadar = () => {
    const activeOnes = tasks.filter(t => !t.completed);
    if (activeOnes.length > 0) {
      const random = activeOnes[Math.floor(Math.random() * activeOnes.length)];
      setRadarTask(random.title);
    }
  };

  return (
    <div className="w-full h-full min-h-0 bg-[#111613] text-[#FAF8F5] font-sans flex flex-col justify-between p-2.5 sm:p-3 select-none overflow-hidden">
      
      {/* Top App Bar */}
      <div className="flex items-center justify-between border-b border-[#8B9A86]/20 pb-1.5 pt-3.5 shrink-0">
        <div>
          <div className="text-[11.5px] font-['Newsreader',serif] font-bold italic tracking-wide text-[#FAF8F5]">
            Days: focus.flow
          </div>
          <div className="text-[8.5px] text-[#8B9A86] font-['JetBrains_Mono',monospace] font-semibold tracking-wider">Organización Zen</div>
        </div>
        <span className="text-[8.5px] font-['JetBrains_Mono',monospace] font-bold px-1.5 py-0.5 rounded-full bg-[#8B9A86]/20 text-[#FAF8F5] border border-[#8B9A86]/30">
          🌱 Salvia & Marfil
        </span>
      </div>

      {/* 3 Space Tabs */}
      <div className="grid grid-cols-3 gap-1 my-1.5 bg-black/40 p-0.5 rounded-xl border border-white/5 font-['Plus_Jakarta_Sans',sans-serif] text-[9px] shrink-0">
        <button
          onClick={() => setActiveSpace('menu')}
          className={`py-1 rounded-lg transition-all cursor-pointer font-extrabold tracking-wide ${
            activeSpace === 'menu' ? 'bg-[#8B9A86] text-black shadow-xs' : 'text-zinc-400 hover:text-white'
          }`}
        >
          El Menú
        </button>
        <button
          onClick={() => setActiveSpace('estantes')}
          className={`py-1 rounded-lg transition-all cursor-pointer font-extrabold tracking-wide ${
            activeSpace === 'estantes' ? 'bg-[#8B9A86] text-black shadow-xs' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Los Estantes
        </button>
        <button
          onClick={() => setActiveSpace('radar')}
          className={`py-1 rounded-lg transition-all cursor-pointer font-extrabold tracking-wide ${
            activeSpace === 'radar' ? 'bg-[#8B9A86] text-black shadow-xs' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Mi Radar
        </button>
      </div>

      {/* Space Content */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scroll space-y-1.5 py-1">
        {activeSpace === 'menu' && (
          <div className="space-y-1">
            <div className="text-[8.5px] font-mono text-[#8B9A86] px-1 flex items-center justify-between">
              <span>EL MENÚ DEL DÍA</span>
              <span>{tasks.filter(t => !t.completed).length} pendientes</span>
            </div>
            
            <div className="space-y-1">
              {tasks.map(t => (
                <div
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  className={`p-1.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-[9px] ${
                    t.completed 
                      ? 'bg-black/20 border-white/5 opacity-50 line-through text-zinc-400' 
                      : 'bg-white/4 border-[#8B9A86]/20 text-[#FAF8F5] hover:bg-white/8'
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0 pr-1">
                    {t.completed ? (
                      <CheckCircle2 className="w-3 h-3 text-[#8B9A86] shrink-0" />
                    ) : (
                      <Circle className="w-3 h-3 text-zinc-500 shrink-0" />
                    )}
                    <span className="font-medium text-[9px] truncate">{t.title}</span>
                  </div>
                  <span className="text-[7.5px] font-mono px-1 py-0.5 rounded bg-black/40 text-[#8B9A86] shrink-0">
                    {t.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSpace === 'estantes' && (
          <div className="space-y-1.5">
            <div className="text-[8.5px] font-mono text-[#8B9A86] px-1">LOS ESTANTES TEMÁTICOS</div>
            <div className="grid grid-cols-2 gap-1 font-mono text-[8.5px]">
              <div className="p-2 rounded-xl bg-white/3 border border-[#8B9A86]/20 space-y-0.5">
                <div className="text-emerald-400 font-bold">🚀 Inventus Studio</div>
                <div className="text-zinc-400 text-[7.5px]">4 proyectos</div>
              </div>
              <div className="p-2 rounded-xl bg-white/3 border border-[#8B9A86]/20 space-y-0.5">
                <div className="text-[#8B9A86] font-bold">🌿 Bienestar</div>
                <div className="text-zinc-400 text-[7.5px]">100% al día</div>
              </div>
              <div className="p-2 rounded-xl bg-white/3 border border-[#8B9A86]/20 space-y-0.5">
                <div className="text-amber-300 font-bold">📚 Lectura</div>
                <div className="text-zinc-400 text-[7.5px]">2 libros</div>
              </div>
              <div className="p-2 rounded-xl bg-white/3 border border-[#8B9A86]/20 space-y-0.5">
                <div className="text-sky-300 font-bold">💡 Ideas Apps</div>
                <div className="text-zinc-400 text-[7.5px]">8 notas</div>
              </div>
            </div>
          </div>
        )}

        {activeSpace === 'radar' && (
          <div className="p-2.5 rounded-2xl bg-black/40 border border-[#8B9A86]/30 space-y-2 text-center">
            <div className="text-[8.5px] font-mono text-[#8B9A86]">FOCO DIARIO // TÓMBOLA ZEN</div>
            <div className="text-[11px] font-serif-italic font-bold text-white py-0.5 leading-snug">
              "{radarTask}"
            </div>
            <button
              onClick={spinRadar}
              className="px-3 py-1 rounded-xl bg-[#8B9A86] hover:bg-[#9db097] text-black font-mono font-bold text-[8.5px] flex items-center justify-center gap-1.5 mx-auto transition-all cursor-pointer active:scale-95"
            >
              <Shuffle className="w-3 h-3" />
              <span>Girar Tómbola</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom hint */}
      <div className="pt-0.5 pb-1 text-center text-[7.5px] font-mono text-zinc-500 shrink-0">
        Toca las tareas para completarlas • Cambia de espacio arriba
      </div>

    </div>
  );
}
