// src/components/apps/FinanceTodayApp.jsx
import { useState } from 'react';
import { 
  DollarSign, PieChart, Plus, Trash2, ArrowUpRight, 
  Send, CheckCircle2, TrendingDown, Layers, Calendar, X,
  Sparkles, Bot, RefreshCw, Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

const COLORS = {
  bg: '#0F172A',
  card: '#1E293B',
  accent: '#22D3EE',
  textSec: '#94A3B8',
  danger: '#FB7185',
  ai: '#A78BFA',
  palette: ['#22D3EE', '#818CF8', '#F472B6', '#34D399', '#FBBF24']
};

const INITIAL_EXPENSES = [
  { id: '1', title: 'Supermercado Carulla', amount: 84.50, category: 'Comida', date: 'Hoy, 11:30 AM' },
  { id: '2', title: 'Suscripción Netflix 4K', amount: 14.99, category: 'Entretenimiento', date: 'Ayer' },
  { id: '3', title: 'Recarga Gasolina / Uber', amount: 35.00, category: 'Transporte', date: '12 Sep' },
  { id: '4', title: 'Fibra Óptica 500 Mbps', amount: 42.00, category: 'Servicios', date: '10 Sep' }
];

const CATEGORIES = ['Comida', 'Transporte', 'Entretenimiento', 'Servicios', 'General'];

const INITIAL_AI_INSIGHTS = [
  {
    title: 'Detección de Patrón en Comida',
    desc: 'Tu gasto en Comida representa el 47.9% del total. La IA proyecta un ahorro de $45 fijando un tope semanal.',
    tag: 'API Gemini / LLM',
    type: 'warning'
  },
  {
    title: 'Suscripción Recurrente Identificada',
    desc: 'Netflix se cobra mensualmente. La IA calcula un costo anualizado de $179.88 USD.',
    tag: 'API OpenAI / Insights',
    type: 'info'
  },
  {
    title: 'Pipeline n8n Configurado',
    desc: 'Webhook activo hacia fluttersam.app.n8n.cloud. Tus gastos se consolidan y envían por correo automáticamente.',
    tag: 'n8n Webhook Cloud',
    type: 'success'
  }
];

export default function FinanceTodayApp() {
  const [tab, setTab] = useState('list'); // 'list' | 'stats' | 'ai'
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('Comida');
  const [n8nStatus, setN8nStatus] = useState(null);
  const [aiInsights, setAiInsights] = useState(INITIAL_AI_INSIGHTS);
  const [analyzingAi, setAnalyzingAi] = useState(false);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!titleInput.trim() || !amountInput) return;
    const num = parseFloat(amountInput);
    if (isNaN(num) || num <= 0) return;

    const newExp = {
      id: Date.now().toString(),
      title: titleInput.trim(),
      amount: num,
      category: categoryInput,
      date: 'Hace un momento'
    };

    setExpenses([newExp, ...expenses]);
    setTitleInput('');
    setAmountInput('');
    setIsModalOpen(false);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const syncN8n = () => {
    setN8nStatus('Enviando webhook a n8n...');
    setTimeout(() => {
      setN8nStatus('¡Webhook n8n procesado con éxito!');
      try {
        confetti({ particleCount: 25, spread: 45, origin: { y: 0.2 } });
      } catch (e) {}
      setTimeout(() => setN8nStatus(null), 3000);
    }, 1100);
  };

  const runAiAnalysis = () => {
    setAnalyzingAi(true);
    setTimeout(() => {
      setAnalyzingAi(false);
      setAiInsights([
        {
          title: 'Análisis Predictivo Actualizado',
          desc: `Basado en tus ${expenses.length} gastos recientes ($${totalSpent.toFixed(2)}), mantienes un ritmo saludable con margen de ahorro del 18%.`,
          tag: 'Generado con API IA',
          type: 'success'
        },
        ...INITIAL_AI_INSIGHTS
      ]);
    }, 1400);
  };

  return (
    <div 
      className="w-full h-full flex flex-col font-sans select-none overflow-hidden relative"
      style={{ backgroundColor: COLORS.bg, color: '#FFFFFF' }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. TOP APP BAR (n8n & AI Badges)
      ───────────────────────────────────────────────────────────── */}
      <div 
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ borderColor: 'rgba(255, 255, 255, 0.08)', backgroundColor: COLORS.card }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.accent }} />
          <span className="text-xs font-bold font-mono tracking-tight">FinanceToday</span>
          <span className="px-1.5 py-0.2 rounded text-[7.5px] font-mono font-bold bg-[#A78BFA]/20 text-[#A78BFA] border border-[#A78BFA]/30">
            IA + n8n
          </span>
        </div>

        <button
          onClick={syncN8n}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[8.5px] font-mono font-bold bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/30 cursor-pointer hover:bg-[#22D3EE]/25 active:scale-95 transition-all"
        >
          <Send className="w-2.5 h-2.5" />
          <span>Sync n8n</span>
        </button>
      </div>

      {/* n8n Status Toast */}
      {n8nStatus && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 bg-[#22D3EE] text-slate-950 px-3 py-1 rounded-full text-[8.5px] font-mono font-bold shadow-lg animate-bounce whitespace-nowrap">
          {n8nStatus}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CONTENT
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto custom-scroll p-3 space-y-2.5">
        {/* Total Spent Balance Card */}
        <div 
          className="p-3 rounded-2xl border shadow-lg relative overflow-hidden"
          style={{ backgroundColor: COLORS.card, borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#22D3EE]/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-mono uppercase tracking-wider text-slate-400">
              Gasto Total del Mes
            </span>
            <span className="text-[7.5px] font-mono text-emerald-400 font-bold flex items-center gap-0.5">
              <Zap className="w-2.5 h-2.5 fill-current" /> n8n Webhook Conectado
            </span>
          </div>

          <div className="text-xl sm:text-2xl font-black font-mono mt-0.5 tracking-tight" style={{ color: COLORS.accent }}>
            ${totalSpent.toFixed(2)} USD
          </div>

          <div className="flex items-center justify-between pt-1 text-[8.5px] font-mono text-slate-400 border-t border-white/5 mt-1.5">
            <span className="text-emerald-400 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              -14.2% vs mes anterior
            </span>
            <span className="text-[#A78BFA] font-bold">
              IA Activa • Hive DB
            </span>
          </div>
        </div>

        {/* TAB 1: LIST OF EXPENSES */}
        {tab === 'list' && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono uppercase tracking-wider text-slate-400">
                TRANSACCIONES ({expenses.length})
              </span>
              <span className="text-[7.5px] font-mono text-slate-500">Hive Local Cache</span>
            </div>

            <div className="space-y-1.5">
              {expenses.map(exp => (
                <div 
                  key={exp.id}
                  className="p-2.5 rounded-xl border flex items-center justify-between group shadow-xs"
                  style={{ backgroundColor: COLORS.card, borderColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <div>
                    <span className="text-[10px] font-bold text-white block leading-tight">
                      {exp.title}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[8px] font-mono text-slate-400">
                      <span className="px-1.5 py-0.2 rounded bg-white/5 text-[#22D3EE] font-medium">
                        {exp.category}
                      </span>
                      <span>• {exp.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold" style={{ color: COLORS.danger }}>
                      -${exp.amount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => deleteExpense(exp.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: GRÁFICOS */}
        {tab === 'stats' && (
          <div className="space-y-2">
            <div className="p-3 rounded-xl border space-y-2" style={{ backgroundColor: COLORS.card, borderColor: 'rgba(255, 255, 255, 0.08)' }}>
              <span className="text-[8.5px] font-mono uppercase text-[#22D3EE] font-bold block">
                DISTRIBUCIÓN POR CATEGORÍA
              </span>
              {CATEGORIES.map((cat, idx) => {
                const catTotal = expenses
                  .filter(e => e.category === cat)
                  .reduce((sum, e) => sum + e.amount, 0);
                const pct = totalSpent > 0 ? (catTotal / totalSpent) * 100 : 0;
                const col = COLORS.palette[idx % COLORS.palette.length];

                return (
                  <div key={cat} className="space-y-0.5">
                    <div className="flex justify-between text-[8.5px] font-mono">
                      <span>{cat}</span>
                      <span className="text-slate-300">${catTotal.toFixed(2)} ({pct.toFixed(0)}%)</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: col }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: IA & AUTOMATIZACIÓN n8n */}
        {tab === 'ai' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[8.5px] font-mono uppercase tracking-wider text-slate-400">
                INSIGHTS CON APIS DE IA & N8N
              </span>
              <button
                onClick={runAiAnalysis}
                disabled={analyzingAi}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#A78BFA]/20 text-[#A78BFA] border border-[#A78BFA]/40 text-[8px] font-mono font-bold cursor-pointer hover:bg-[#A78BFA]/30"
              >
                <RefreshCw className={`w-2.5 h-2.5 ${analyzingAi ? 'animate-spin' : ''}`} />
                <span>{analyzingAi ? 'Analizando...' : 'Reanalizar IA'}</span>
              </button>
            </div>

            <div className="space-y-2">
              {aiInsights.map((insight, idx) => (
                <div 
                  key={idx}
                  className="p-2.5 rounded-xl border space-y-1 shadow-xs"
                  style={{ 
                    backgroundColor: COLORS.card, 
                    borderColor: insight.type === 'warning' ? 'rgba(251, 113, 133, 0.3)' : 'rgba(167, 139, 250, 0.3)' 
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-white flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#A78BFA]" />
                      {insight.title}
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[7px] font-mono bg-white/5 text-[#A78BFA]">
                      {insight.tag}
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-300 leading-relaxed font-sans">
                    {insight.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Add Expense Button */}
      {tab === 'list' && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-12 right-4 w-9 h-9 rounded-full shadow-xl flex items-center justify-center cursor-pointer active:scale-95 transition-all text-slate-950 font-bold z-20"
          style={{ backgroundColor: COLORS.accent }}
        >
          <Plus className="w-4 h-4" />
        </button>
      )}

      {/* Add Expense Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 z-40 bg-black/75 backdrop-blur-xs flex items-end">
          <div 
            className="w-full p-4 rounded-t-2xl border-t border-white/10 space-y-3"
            style={{ backgroundColor: COLORS.card }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Nuevo Gasto</span>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-2">
              <input
                type="text"
                value={titleInput}
                onChange={e => setTitleInput(e.target.value)}
                placeholder="Concepto (ej. Almuerzo, Uber)"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE]"
              />
              <input
                type="number"
                step="0.01"
                value={amountInput}
                onChange={e => setAmountInput(e.target.value)}
                placeholder="Monto (ej. 15.50)"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE]"
              />

              <div className="flex gap-1 overflow-x-auto py-1">
                {CATEGORIES.map(cat => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setCategoryInput(cat)}
                    className={`px-2 py-1 rounded text-[8.5px] font-mono cursor-pointer shrink-0 ${
                      categoryInput === cat 
                        ? 'bg-[#22D3EE] text-slate-950 font-bold' 
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg text-xs font-bold text-slate-950 cursor-pointer shadow-md"
                style={{ backgroundColor: COLORS.accent }}
              >
                Guardar & Sincronizar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. BOTTOM TAB BAR (3 TABS: Gastos, Gráficos, IA & n8n)
      ───────────────────────────────────────────────────────────── */}
      <div 
        className="flex items-center justify-around py-2 border-t"
        style={{ backgroundColor: COLORS.card, borderColor: 'rgba(255, 255, 255, 0.08)' }}
      >
        <button
          onClick={() => setTab('list')}
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${tab === 'list' ? 'text-[#22D3EE]' : 'text-slate-400'}`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span className="text-[7.5px] font-mono">Gastos</span>
        </button>

        <button
          onClick={() => setTab('stats')}
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${tab === 'stats' ? 'text-[#22D3EE]' : 'text-slate-400'}`}
        >
          <PieChart className="w-3.5 h-3.5" />
          <span className="text-[7.5px] font-mono">Gráficos</span>
        </button>

        <button
          onClick={() => setTab('ai')}
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${tab === 'ai' ? 'text-[#A78BFA]' : 'text-slate-400'}`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span className="text-[7.5px] font-mono">IA & n8n</span>
        </button>
      </div>
    </div>
  );
}
