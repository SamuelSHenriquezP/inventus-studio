import { useState } from 'react';
import { RefreshCw, Users } from 'lucide-react';

export default function ServiIntelLaptopApp() {
  const [tickets, setTickets] = useState([
    { id: 'TK-4829', title: 'Mantenimiento Preventivo Fibra Nodo 4', client: 'Telecom Corp', status: 'En Ruta', operario: 'Carlos M.', priority: 'Alta' },
    { id: 'TK-4830', title: 'Revisión Servidor Enclave Rack B', client: 'Banco Regional', status: 'En Progreso', operario: 'Laura G.', priority: 'Crítica' },
    { id: 'TK-4831', title: 'Certificación Cableado Cat6A', client: 'Edificio Torre 93', status: 'Asignada', operario: 'Andrés S.', priority: 'Media' }
  ]);
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);
  const [isUpdating, setIsUpdating] = useState(false);

  const cycleStatus = (id) => {
    setIsUpdating(true);
    setTimeout(() => {
      setTickets(prev => prev.map(t => {
        if (t.id === id) {
          const nextStatus = t.status === 'Asignada' ? 'En Ruta' : t.status === 'En Ruta' ? 'En Progreso' : 'Completada';
          const updated = { ...t, status: nextStatus };
          setSelectedTicket(updated);
          return updated;
        }
        return t;
      }));
      setIsUpdating(false);
    }, 350);
  };

  return (
    <div className="w-full h-full bg-[#080b0f] text-zinc-100 font-sans flex flex-col justify-between p-3 select-none overflow-hidden text-[11px]">
      
      {/* Top Console Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 px-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>SERVIINTEL // OPS CONSOLE</span>
          </div>
          <span className="text-zinc-500 hidden sm:inline">|</span>
          <span className="text-zinc-400 font-mono text-[10px] hidden sm:inline">GPS BOGOTÁ (4.6097° N, 74.0817° W)</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            RBAC: ADMIN
          </span>
          <span className="text-zinc-400">SLA 99.98%</span>
        </div>
      </div>

      {/* Main Console Content: 2-Column Split inside Laptop */}
      <div className="grid grid-cols-12 gap-2.5 my-2 flex-1 overflow-hidden">
        
        {/* Left Column: Tickets Queue */}
        <div className="col-span-7 flex flex-col justify-between bg-zinc-950/80 rounded-xl border border-white/10 p-2.5">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pb-1 border-b border-white/5">
              <span>COLA DE ÓRDENES ACTIVAS</span>
              <span>{tickets.length} en despacho</span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {tickets.map(t => (
                <div 
                  key={t.id}
                  onClick={() => setSelectedTicket(t)}
                  className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    selectedTicket.id === t.id 
                      ? 'bg-sky-500/10 border-sky-500/40 text-white' 
                      : 'bg-white/2 border-white/5 text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-sky-400 text-[10px]">{t.id}</span>
                      <span className="text-zinc-400 font-mono text-[9px]">• {t.client}</span>
                    </div>
                    <div className="font-medium text-[10px] truncate max-w-42.5">{t.title}</div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                    t.status === 'Completada' ? 'bg-emerald-500/20 text-emerald-300' :
                    t.status === 'En Progreso' ? 'bg-amber-500/20 text-amber-300' :
                    'bg-sky-500/20 text-sky-300'
                  }`}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[9px] font-mono text-zinc-500 text-center pt-1 border-t border-white/5">
            Sincronización en tiempo real vía Firestore Listeners
          </div>
        </div>

        {/* Right Column: Selected Ticket Dispatch & Action */}
        <div className="col-span-5 bg-zinc-950/80 rounded-xl border border-white/10 p-2.5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-zinc-400 pb-1 border-b border-white/5 flex items-center justify-between">
              <span>DETALLES DEL TICKET</span>
              <span className="text-sky-400 font-bold">{selectedTicket.id}</span>
            </div>

            <div className="space-y-1 text-[10px] font-mono">
              <div className="text-zinc-400">Operario Asignado:</div>
              <div className="text-white font-bold flex items-center gap-1">
                <Users className="w-3 h-3 text-sky-400" /> {selectedTicket.operario}
              </div>

              <div className="text-zinc-400 pt-1">Prioridad:</div>
              <div className="text-amber-400 font-bold">{selectedTicket.priority}</div>

              <div className="text-zinc-400 pt-1">Estado de Ejecución:</div>
              <div className="text-white font-bold bg-white/5 p-1 rounded border border-white/5">
                {selectedTicket.status}
              </div>
            </div>
          </div>

          <button
            onClick={() => cycleStatus(selectedTicket.id)}
            disabled={isUpdating}
            className="w-full py-2 rounded-lg bg-sky-500 hover:bg-sky-400 active:scale-95 text-black font-mono font-bold text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-2"
          >
            <RefreshCw className={`w-3 h-3 ${isUpdating ? 'animate-spin' : ''}`} />
            <span>{isUpdating ? 'Actualizando...' : 'Avanzar Estado'}</span>
          </button>
        </div>

      </div>

      {/* Bottom Status Ticker */}
      <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 border-t border-white/10 pt-1.5 px-1">
        <span>3 Nodos Operarios Conectados</span>
        <span className="text-emerald-400 font-bold">● Telemetría OK</span>
      </div>

    </div>
  );
}
