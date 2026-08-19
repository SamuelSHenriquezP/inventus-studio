import { useState } from 'react';
import { ShoppingBag, Coffee, ArrowUpRight, Zap } from 'lucide-react';

export default function NidoPhoneApp() {
  const [balance, setBalance] = useState(2450.00);
  const [transactions, setTransactions] = useState([
    { id: 1, title: 'Mercado Semanal', category: 'Hogar', amount: -64.50, icon: ShoppingBag, time: 'Hoy, 10:24 AM' },
    { id: 2, title: 'Café de Especialidad', category: 'Personal', amount: -4.80, icon: Coffee, time: 'Hoy, 8:15 AM' },
    { id: 3, title: 'Transferencia Nómina', category: 'Ingreso', amount: 1800.00, icon: ArrowUpRight, time: 'Ayer' },
    { id: 4, title: 'Servicios de Nube', category: 'Trabajo', amount: -28.00, icon: Zap, time: '14 Feb' }
  ]);
  const [lastAction, setLastAction] = useState(null);

  const addExpense = (title, category, amount, Icon) => {
    const newTx = {
      id: Date.now(),
      title,
      category,
      amount: -amount,
      icon: Icon,
      time: 'Justo ahora'
    };
    setBalance(prev => parseFloat((prev - amount).toFixed(2)));
    setTransactions(prev => [newTx, ...prev.slice(0, 5)]);
    setLastAction(`-${amount.toFixed(2)} registrado en ${title}`);
    setTimeout(() => setLastAction(null), 2500);
  };

  return (
    <div className="w-full h-full bg-[#0a0c0e] text-[#f2f4f6] font-sans flex flex-col justify-between p-3.5 select-none overflow-y-auto">
      
      {/* Top App Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[10px] font-bold text-emerald-400 font-mono">
            S&P
          </div>
          <div>
            <div className="text-[11px] font-bold tracking-tight text-white flex items-center gap-1">
              <span>Nido // Finanzas</span>
            </div>
            <div className="text-[9px] text-zinc-400 font-mono">Isar Offline Engine</div>
          </div>
        </div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          ● OLED v2.4
        </span>
      </div>

      {/* Main Cashflow Card ("Disponible Real") */}
      <div className="my-2.5 p-3.5 rounded-2xl bg-linear-to-b from-[#14181c] to-[#0d1013] border border-white/10 shadow-lg space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
          <span>DISPONIBLE REAL</span>
          <span className="text-emerald-400 font-medium">Actualizado</span>
        </div>
        <div className="text-2xl font-bold tracking-tight text-white font-mono">
          ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="flex items-center justify-between text-[9px] font-mono pt-1 text-zinc-400 border-t border-white/5">
          <span>Ingresos: +$3,800.00</span>
          <span>Fijos: -$1,350.00</span>
        </div>
      </div>

      {/* Quick Action Category Taps */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 px-1">
          <span>REGISTRO RÁPIDO</span>
          {lastAction && <span className="text-emerald-400 text-[9px] truncate max-w-35">{lastAction}</span>}
        </div>
        <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
          <button
            onClick={() => addExpense('Almuerzo', 'Comida', 14.50, Coffee)}
            className="p-2 rounded-xl bg-white/4 hover:bg-white/8 active:scale-95 border border-white/5 text-zinc-200 transition-all flex flex-col items-center gap-1 cursor-pointer"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span>+ Café $14.5</span>
          </button>
          <button
            onClick={() => addExpense('Supermercado', 'Hogar', 42.00, ShoppingBag)}
            className="p-2 rounded-xl bg-white/4 hover:bg-white/8 active:scale-95 border border-white/5 text-zinc-200 transition-all flex flex-col items-center gap-1 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
            <span>+ Súper $42</span>
          </button>
          <button
            onClick={() => addExpense('Servicios', 'Fijos', 25.00, Zap)}
            className="p-2 rounded-xl bg-white/4 hover:bg-white/8 active:scale-95 border border-white/5 text-zinc-200 transition-all flex flex-col items-center gap-1 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-sky-400" />
            <span>+ Luz $25</span>
          </button>
        </div>
      </div>

      {/* Recent Transactions List */}
      <div className="space-y-1.5 mt-2">
        <div className="text-[10px] font-mono text-zinc-400 px-1">HISTORIAL CRONOLÓGICO</div>
        <div className="space-y-1 max-h-32 overflow-y-auto pr-0.5">
          {transactions.map(tx => {
            const Icon = tx.icon;
            return (
              <div key={tx.id} className="p-2 rounded-xl bg-white/2 border border-white/5 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-lg bg-white/5 text-zinc-300">
                    <Icon className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="font-medium text-white text-[10px]">{tx.title}</div>
                    <div className="text-[8px] text-zinc-400 font-mono">{tx.time}</div>
                  </div>
                </div>
                <div className={`font-mono font-bold text-[10px] ${tx.amount < 0 ? 'text-zinc-200' : 'text-emerald-400'}`}>
                  {tx.amount < 0 ? `-$${Math.abs(tx.amount).toFixed(2)}` : `+$${tx.amount.toFixed(2)}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Bar indicator */}
      <div className="pt-2 text-center text-[8px] font-mono text-zinc-500">
        Prueba interactiva real • Toca los botones para registrar
      </div>

    </div>
  );
}
