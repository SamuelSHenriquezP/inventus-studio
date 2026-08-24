// src/components/apps/NidoPhoneApp.jsx
import { useState } from 'react';
import { 
  ShoppingBag, Coffee, Zap, Heart, Sparkles, Home,
  FileText, Target, Smile, Settings, ArrowDownRight, ArrowUpRight, Sun, Moon, Send, Inbox
} from 'lucide-react';

export default function NidoPhoneApp({ 
  user = 'samuel', // 'samuel' | 'rochy'
  sharedState, 
  onAddTransaction,
  onSendPing,
  isDarkMode = true,
  onToggleTheme
}) {
  const isSamuel = user === 'samuel';
  const userName = isSamuel ? 'Samuel' : 'Rochy';
  const partnerName = isSamuel ? 'Rochy' : 'Samuel';
  const userColor = isSamuel ? '#0D9488' : '#00897B'; // Teal vs Emerald from theme.dart
  const userEmoji = isSamuel ? '🦊' : '🌸';
  const partnerEmoji = isSamuel ? '🌸' : '🦊';

  const [activeTab, setActiveTab] = useState('inicio'); // 'inicio', 'historial', 'compras', 'metas'
  const [showPingMenu, setShowPingMenu] = useState(false);

  // Fallback local state if rendered standalone
  const [localBalance, setLocalBalance] = useState(2450.00);
  const [localTransactions, setLocalTransactions] = useState([
    { id: 1, title: 'Mercado Semanal', category: 'Hogar', amount: -64.50, author: 'Samuel', time: '10:24 AM' },
    { id: 2, title: 'Café de Especialidad', category: 'Personal', amount: -4.80, author: 'Rochy', time: '8:15 AM' },
    { id: 3, title: 'Nómina Quincena', category: 'Ingreso', amount: 1800.00, author: 'Samuel', time: 'Ayer' }
  ]);
  const [localSyncNotice, setLocalSyncNotice] = useState(null);

  const balance = sharedState ? sharedState.balance : localBalance;
  const transactions = sharedState ? sharedState.transactions : localTransactions;
  const syncNotice = sharedState ? sharedState.syncNotice : localSyncNotice;
  const lastPing = sharedState ? sharedState.lastPing : null;
  const shoppingItems = sharedState ? sharedState.shoppingItems : [
    { id: 1, title: 'Leche de Almendras', checked: true },
    { id: 2, title: 'Café de Origen', checked: false },
    { id: 3, title: 'Frutas Frescas', checked: false },
  ];

  const handleAdd = (title, category, amount, author) => {
    if (onAddTransaction) {
      onAddTransaction(title, category, amount, author);
    } else {
      const newTx = {
        id: Date.now(),
        title,
        category,
        amount: -amount,
        author,
        time: 'Ahora'
      };
      setLocalBalance(prev => parseFloat((prev - amount).toFixed(2)));
      setLocalTransactions(prev => [newTx, ...prev.slice(0, 4)]);
      setLocalSyncNotice(`${author} registró $${amount.toFixed(2)} en ${title}`);
      setTimeout(() => setLocalSyncNotice(null), 3000);
    }
  };

  const handlePingSelect = (msg) => {
    setShowPingMenu(false);
    if (onSendPing) {
      onSendPing(msg, userName);
    }
  };

  // Color tokens copied exactly from Flutter theme.dart
  const bgStyle = isDarkMode ? 'bg-[#0F172A] text-[#F1F5F9]' : 'bg-[#F6F4F0] text-[#1E1917]';
  const surfaceStyle = isDarkMode ? 'bg-[#1E293B] border-[#334155]' : 'bg-[#FFFFFF] border-[#E2DDD7]';
  const borderStyle = isDarkMode ? 'border-[#334155]' : 'border-[#E2DDD7]';
  const textMuted = isDarkMode ? 'text-[#94A3B8]' : 'text-[#6B6361]';
  const textDark = isDarkMode ? 'text-[#F1F5F9]' : 'text-[#1E1917]';

  const isPingSender = lastPing && lastPing.sender === userName;
  const isPingReceiver = lastPing && lastPing.sender === partnerName;

  return (
    <div className={`w-full h-full font-sans flex flex-col justify-between select-none overflow-hidden ${bgStyle} transition-colors duration-300`}>
      
      {/* Flutter AppBar: Nido · Agosto & Theme Toggle */}
      <div className={`flex items-center justify-between border-b px-3.5 pt-3 pb-2 shrink-0 ${borderStyle}`}>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-[#0D9488]/20 flex items-center justify-center border border-[#0D9488]/40">
            <Heart className="w-3 h-3 text-[#0D9488] fill-[#0D9488]" />
          </div>
          <span className={`text-[11px] font-extrabold tracking-wide ${textDark}`}>
            Nido · Agosto
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Theme Switcher Button (Modo Claro vs Modo Oscuro) */}
          <button
            onClick={onToggleTheme}
            className={`p-1 rounded-md border flex items-center gap-1 text-[8px] font-mono font-bold cursor-pointer transition-all ${surfaceStyle}`}
            title="Cambiar Modo Claro / Oscuro"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3 h-3 text-amber-400" />
                <span className="text-amber-300 hidden sm:inline">Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-3 h-3 text-indigo-600" />
                <span className="text-indigo-600 hidden sm:inline">Oscuro</span>
              </>
            )}
          </button>

          <span 
            className="text-[8.5px] font-mono font-bold px-1.5 py-0.5 rounded-full border"
            style={{ backgroundColor: `${userColor}20`, borderColor: `${userColor}50`, color: userColor }}
          >
            {userName} ({userEmoji})
          </span>
        </div>
      </div>

      {/* App Body Container */}
      <div className="flex-1 overflow-hidden flex flex-col px-2 sm:px-3 py-1 sm:py-1.5 gap-1 sm:gap-1.5 min-h-0">

      {/* Partner Header Card (Profile Banner) */}
      <div className={`my-0.5 sm:my-1 p-1.5 sm:p-2 rounded-xl border shadow-xs flex items-center justify-between gap-1.5 shrink-0 ${surfaceStyle}`}>
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
          {/* Overlapping Avatars */}
          <div className="flex items-center -space-x-1.5 shrink-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0D9488]/20 border border-[#0D9488] flex items-center justify-center text-[9px] sm:text-[10px]">
              {userEmoji}
            </div>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#00897B]/20 border border-[#00897B] flex items-center justify-center text-[9px] sm:text-[10px]">
              {partnerEmoji}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className={`text-[9px] sm:text-[10px] font-bold flex items-center gap-1 font-mono truncate ${textDark}`}>
              <span className="truncate">{userName}</span>
              <Heart className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-rose-500 fill-rose-500 shrink-0" />
              <span className="truncate">{partnerName}</span>
            </div>
            <div className={`text-[7.5px] sm:text-[8px] flex items-center gap-1 truncate ${textMuted}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0" />
              <span className="truncate">Sincronizado en Vivo</span>
            </div>
          </div>
        </div>

        {/* Send Love Ping Button */}
        <button
          onClick={() => setShowPingMenu(!showPingMenu)}
          className="shrink-0 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-500 text-[8px] sm:text-[8.5px] font-mono font-bold flex items-center gap-1 hover:bg-rose-500/25 cursor-pointer active:scale-95 transition-all"
        >
          <Smile className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-500 shrink-0" />
          <span>Guiño 💕</span>
        </button>
      </div>

      {/* Love Ping Quick Popup Menu */}
      {showPingMenu && (
        <div className={`p-1.5 rounded-xl border text-[9px] font-mono space-y-1 animate-in zoom-in-95 duration-150 shrink-0 z-20 ${surfaceStyle}`}>
          <div className={`text-[8px] text-center font-bold ${textMuted}`}>Enviar Guiño a {partnerName}:</div>
          <div className="grid grid-cols-2 gap-1 text-[8px]">
            <button onClick={() => handlePingSelect('❤️ Te quiero mucho')} className={`p-1 rounded border text-left hover:bg-rose-500/20 truncate cursor-pointer ${surfaceStyle}`}>❤️ Te quiero</button>
            <button onClick={() => handlePingSelect('☕ ¿Un cafecito?')} className={`p-1 rounded border text-left hover:bg-amber-500/20 truncate cursor-pointer ${surfaceStyle}`}>☕ ¿Un cafecito?</button>
            <button onClick={() => handlePingSelect('🤗 Un abrazo')} className={`p-1 rounded border text-left hover:bg-indigo-500/20 truncate cursor-pointer ${surfaceStyle}`}>🤗 Un abrazo</button>
            <button onClick={() => handlePingSelect('🥰 Te extraño')} className={`p-1 rounded border text-left hover:bg-rose-500/20 truncate cursor-pointer ${surfaceStyle}`}>🥰 Te extraño</button>
          </div>
        </div>
      )}

      {/* DISTINCT PING BANNER: SENDER VS RECEIVER */}
      {lastPing && !showPingMenu && (
        isPingSender ? (
          <div className="my-0.5 px-2 py-1 rounded-lg bg-[#0D9488] text-white text-[8px] font-mono flex items-center justify-between animate-in slide-in-from-top duration-200 shrink-0 shadow-sm overflow-hidden">
            <div className="flex items-center gap-1 min-w-0 truncate">
              <Send className="w-2.5 h-2.5 text-teal-100 shrink-0" />
              <span className="truncate">Enviado: <strong className="font-bold text-white">"{lastPing.message}"</strong></span>
            </div>
            <span className="text-[7px] bg-black/20 px-1 py-0.5 rounded font-bold shrink-0 text-teal-100">Enviado 📤</span>
          </div>
        ) : isPingReceiver ? (
          <div className="my-0.5 px-2 py-1 rounded-lg bg-rose-600 text-white text-[8px] font-mono flex items-center justify-between animate-in zoom-in-95 duration-200 shrink-0 shadow-md overflow-hidden">
            <div className="flex items-center gap-1 min-w-0 truncate">
              <Heart className="w-2.5 h-2.5 text-rose-200 fill-white shrink-0" />
              <span className="truncate">¡De {partnerName}! <strong className="font-bold text-white">"{lastPing.message}"</strong></span>
            </div>
            <span className="text-[7px] bg-white/20 text-white px-1 py-0.5 rounded font-bold shrink-0">¡Recibido! 💕</span>
          </div>
        ) : (
          <div className="my-0.5 px-2 py-1 rounded-lg bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] dark:text-emerald-300 text-[8px] font-mono flex items-center gap-1.5 animate-in slide-in-from-top duration-200 shrink-0 overflow-hidden">
            <Sparkles className="w-2.5 h-2.5 text-amber-500 shrink-0" />
            <span className="truncate">{syncNotice}</span>
          </div>
        )
      )}

      {/* TAB CONTENT: INICIO (Dashboard) */}
      {activeTab === 'inicio' && (
        <>
          {/* Shared Cashflow Card ("Disponible Real de Pareja") - Slate Header */}
          <div className="my-1 p-2.5 rounded-2xl bg-linear-to-br from-[#334155] to-[#1E293B] border border-slate-600/50 shadow-lg space-y-1 shrink-0 text-white">
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-300">
              <span className="font-bold tracking-wider text-white flex items-center gap-1">
                Disponible Real
              </span>
              <span className="text-[8.5px] px-1.5 py-0.5 rounded bg-white/10 text-slate-200 font-semibold">
                Meta: $3,500
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-[8.5px] font-mono text-[#10B981] font-bold px-1 py-0.5 bg-[#10B981]/20 rounded border border-[#10B981]/40">
                Isar DB
              </span>
            </div>

            {/* Income & Expense Metrics Sub-strip */}
            <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-white/10 font-mono text-[8.5px]">
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
                <ArrowUpRight className="w-3 h-3 text-[#10B981]" />
                <div>
                  <span className="text-slate-300 text-[7.5px] block">Ingresos (+)</span>
                  <span className="font-bold text-white">$3,800.00</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
                <ArrowDownRight className="w-3 h-3 text-[#E53935]" />
                <div>
                  <span className="text-slate-300 text-[7.5px] block">Gastos (-)</span>
                  <span className="font-bold text-white">$1,350.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Transaction Action Buttons */}
          <div className="space-y-0.5 shrink-0">
            <div className={`flex items-center justify-between text-[9px] font-mono px-1 ${textMuted}`}>
              <span>REGISTRAR GASTO ({userName})</span>
              <span className="text-[8px] text-[#0D9488] font-bold">Touch Sync</span>
            </div>
            <div className="grid grid-cols-3 gap-1 font-mono text-[8.5px]">
              <button
                onClick={() => handleAdd('Café', 'Personal', 14.50, userName)}
                className={`p-1 rounded-xl border transition-all flex flex-col items-center gap-0.5 cursor-pointer truncate hover:border-[#0D9488] active:scale-95 ${surfaceStyle}`}
              >
                <Coffee className="w-3.5 h-3.5 text-amber-500" />
                <span className={`truncate font-medium ${textDark}`}>Café $14.5</span>
              </button>
              <button
                onClick={() => handleAdd('Supermercado', 'Hogar', 42.00, userName)}
                className={`p-1 rounded-xl border transition-all flex flex-col items-center gap-0.5 cursor-pointer truncate hover:border-[#0D9488] active:scale-95 ${surfaceStyle}`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#0D9488]" />
                <span className={`truncate font-medium ${textDark}`}>Súper $42</span>
              </button>
              <button
                onClick={() => handleAdd('Servicios', 'Fijos', 25.00, userName)}
                className={`p-1 rounded-xl border transition-all flex flex-col items-center gap-0.5 cursor-pointer truncate hover:border-[#0D9488] active:scale-95 ${surfaceStyle}`}
              >
                <Zap className="w-3.5 h-3.5 text-sky-500" />
                <span className={`truncate font-medium ${textDark}`}>Luz $25</span>
              </button>
            </div>
          </div>

          {/* Shared Feed Chronological Transactions */}
          <div className="space-y-1 mt-1 flex-1 min-h-0 flex flex-col overflow-hidden">
            <div className={`text-[9px] font-mono px-1 shrink-0 flex items-center justify-between ${textMuted}`}>
              <span>MOVIMIENTOS DE PAREJA</span>
              <span className="text-[8px]">{transactions.length} registros</span>
            </div>

            <div className="space-y-1 flex-1 min-h-0 overflow-y-auto pr-0.5 custom-scroll">
              {transactions.map((tx) => {
                const isBySamuel = tx.author === 'Samuel';
                return (
                  <div 
                    key={tx.id} 
                    className={`p-1 rounded-xl border flex items-center justify-between text-[9px] font-mono transition-all ${surfaceStyle}`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <div className={`w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center ${isBySamuel ? 'bg-[#0D9488]/20 text-[#0D9488]' : 'bg-[#00897B]/20 text-[#00897B]'}`}>
                        {isBySamuel ? '🦊' : '🌸'}
                      </div>
                      <div className="truncate">
                        <div className={`font-semibold truncate text-[9px] ${textDark}`}>{tx.title}</div>
                        <div className={`text-[7.5px] ${textMuted}`}>por {tx.author} • {tx.time}</div>
                      </div>
                    </div>
                    <div className={`font-bold text-[9px] shrink-0 ${tx.amount < 0 ? 'text-[#E53935]' : 'text-[#10B981]'}`}>
                      {tx.amount < 0 ? `-$${Math.abs(tx.amount).toFixed(2)}` : `+$${tx.amount.toFixed(2)}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* TAB CONTENT: HISTORIAL */}
      {activeTab === 'historial' && (
        <div className={`flex-1 my-1 p-2 rounded-xl border space-y-1.5 overflow-hidden flex flex-col font-mono text-[9px] ${surfaceStyle}`}>
          <div className={`flex items-center justify-between font-bold border-b pb-1 ${borderStyle} ${textDark}`}>
            <span className="flex items-center gap-1 text-[#0D9488]">
              <FileText className="w-3.5 h-3.5" /> Histórico de Periodos
            </span>
            <span className={`text-[8px] ${textMuted}`}>Ciclos Archivados</span>
          </div>

          <div className="space-y-1 flex-1 overflow-y-auto pr-0.5 custom-scroll">
            {(transactions || []).map((tx) => {
              const isBySamuel = tx.author === 'Samuel';
              return (
                <div 
                  key={tx.id} 
                  className={`p-1.5 rounded-lg border flex items-center justify-between text-[9px] font-mono ${surfaceStyle}`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <div className={`w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center ${isBySamuel ? 'bg-[#0D9488]/20 text-[#0D9488]' : 'bg-[#00897B]/20 text-[#00897B]'}`}>
                      {isBySamuel ? '🦊' : '🌸'}
                    </div>
                    <div className="truncate">
                      <div className={`font-semibold truncate text-[9px] ${textDark}`}>{tx.title}</div>
                      <div className={`text-[7.5px] ${textMuted}`}>{tx.category} • por {tx.author}</div>
                    </div>
                  </div>
                  <div className={`font-bold text-[9px] shrink-0 ${tx.amount < 0 ? 'text-[#E53935]' : 'text-[#10B981]'}`}>
                    {tx.amount < 0 ? `-$${Math.abs(tx.amount).toFixed(2)}` : `+$${tx.amount.toFixed(2)}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT: COMPRAS (Lista de Nido) */}
      {activeTab === 'compras' && (
        <div className={`flex-1 my-1 p-2 rounded-xl border space-y-1.5 overflow-hidden flex flex-col font-mono text-[9px] ${surfaceStyle}`}>
          <div className={`flex items-center justify-between font-bold border-b pb-1 ${borderStyle} ${textDark}`}>
            <span className="flex items-center gap-1 text-[#0D9488]">
              <ShoppingBag className="w-3.5 h-3.5" /> Lista del Nido
            </span>
            <span className={`text-[8px] ${textMuted}`}>Sincronizada</span>
          </div>

          <div className="space-y-1 flex-1 overflow-y-auto custom-scroll">
            {(shoppingItems || []).map(item => (
              <div key={item.id} className={`p-1.5 rounded-lg border flex items-center justify-between ${surfaceStyle}`}>
                <span className={item.checked ? `line-through ${textMuted}` : `font-medium ${textDark}`}>
                  {item.title}
                </span>
                <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[8px] ${item.checked ? 'bg-[#0D9488] border-[#0D9488] text-white' : borderStyle}`}>
                  {item.checked ? '✓' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: METAS (Ahorro del Nido) */}
      {activeTab === 'metas' && (
        <div className={`flex-1 my-1 p-2 rounded-xl border space-y-2 overflow-hidden flex flex-col font-mono text-[9px] ${surfaceStyle}`}>
          <div className={`flex items-center justify-between font-bold border-b pb-1 ${borderStyle} ${textDark}`}>
            <span className="flex items-center gap-1 text-amber-500">
              <Target className="w-3.5 h-3.5" /> Metas de Ahorro
            </span>
            <span className="text-[8px] bg-amber-500/10 text-amber-600 px-1 py-0.5 rounded font-bold">En pareja</span>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto custom-scroll">
            <div className={`p-2 rounded-lg border space-y-1 ${surfaceStyle}`}>
              <div className={`flex justify-between font-bold ${textDark}`}>
                <span>🌴 Vacaciones Playa</span>
                <span className="text-[#0D9488]">$1,200 / $2,000</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full bg-[#0D9488] rounded-full w-[60%]" />
              </div>
            </div>

            <div className={`p-2 rounded-lg border space-y-1 ${surfaceStyle}`}>
              <div className={`flex justify-between font-bold ${textDark}`}>
                <span>🛡️ Fondo de Emergencia</span>
                <span className="text-[#10B981]">$3,500 / $5,000</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full bg-[#10B981] rounded-full w-[70%]" />
              </div>
            </div>
          </div>
        </div>
      )}

      </div> {/* End App Body Container */}

      {/* Flutter Bottom Navigation Bar (4 Tabs: Dashboard, Historial, Compras, Metas) */}
      <div className={`px-3 pt-1.5 pb-2.5 border-t grid grid-cols-4 gap-1 font-mono text-[8px] shrink-0 ${borderStyle} ${textMuted}`}>
        <button 
          onClick={() => setActiveTab('inicio')}
          className={`flex flex-col items-center gap-0.5 py-0.5 rounded-lg transition-all cursor-pointer ${activeTab === 'inicio' ? 'text-[#0D9488] font-bold bg-[#0D9488]/10' : 'hover:text-[#0D9488]'}`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Inicio</span>
        </button>

        <button 
          onClick={() => setActiveTab('historial')}
          className={`flex flex-col items-center gap-0.5 py-0.5 rounded-lg transition-all cursor-pointer ${activeTab === 'historial' ? 'text-[#0D9488] font-bold bg-[#0D9488]/10' : 'hover:text-[#0D9488]'}`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Historial</span>
        </button>

        <button 
          onClick={() => setActiveTab('compras')}
          className={`flex flex-col items-center gap-0.5 py-0.5 rounded-lg transition-all cursor-pointer ${activeTab === 'compras' ? 'text-[#0D9488] font-bold bg-[#0D9488]/10' : 'hover:text-[#0D9488]'}`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Compras</span>
        </button>

        <button 
          onClick={() => setActiveTab('metas')}
          className={`flex flex-col items-center gap-0.5 py-0.5 rounded-lg transition-all cursor-pointer ${activeTab === 'metas' ? 'text-[#0D9488] font-bold bg-[#0D9488]/10' : 'hover:text-[#0D9488]'}`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>Metas</span>
        </button>
      </div>

    </div>
  );
}


