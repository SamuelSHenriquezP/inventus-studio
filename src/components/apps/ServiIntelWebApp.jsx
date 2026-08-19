import { useState } from 'react';
import { Bell } from 'lucide-react';
import { sounds } from '../../utils/soundEngine';

const TICKETS_DATA = [
  { id: 'TK-5201', client: 'Comercial Torres', type: 'HVAC', operario: 'Samuel H.', status: 'en_ruta', priority: 'ALTA', time: '08:24' },
  { id: 'TK-5202', client: 'Bodega Logística', type: 'Eléctrico', operario: 'Luis R.', status: 'en_trabajo', priority: 'MEDIA', time: '09:10' },
  { id: 'TK-5203', client: 'Hotel Caribe', type: 'Plomería', operario: 'Sin asignar', status: 'pendiente', priority: 'URGENTE', time: '09:45' },
  { id: 'TK-5204', client: 'Clínica Centro', type: 'Redes', operario: 'Ana M.', status: 'completado', priority: 'BAJA', time: '07:00' },
];

const STATUS_LABEL = { pendiente: 'Pendiente', en_ruta: 'En Ruta', en_trabajo: 'En Trabajo', completado: 'Completado' };
const STATUS_COLOR = {
  pendiente: 'text-amber-300 bg-amber-500/15 border border-amber-500/30',
  en_ruta: 'text-sky-300 bg-sky-500/15 border border-sky-500/30',
  en_trabajo: 'text-purple-300 bg-purple-500/15 border border-purple-500/30',
  completado: 'text-emerald-300 bg-emerald-500/15 border border-emerald-500/30'
};
const PRIORITY_COLOR = { 
  ALTA: 'text-red-400 font-bold', 
  MEDIA: 'text-amber-400 font-bold', 
  BAJA: 'text-zinc-400', 
  URGENTE: 'text-rose-400 font-bold animate-pulse' 
};

export default function ServiIntelWebApp() {
  const [tickets, setTickets] = useState(TICKETS_DATA);
  const [selected, setSelected] = useState('TK-5201');

  const dispatch = (id) => {
    sounds.playClick();
    setTickets(prev => prev.map(t =>
      t.id === id && t.status === 'pendiente'
        ? { ...t, status: 'en_ruta', operario: 'Samuel H.' }
        : t
    ));
    sounds.playSuccess();
  };

  const complete = (id) => {
    sounds.playClick();
    setTickets(prev => prev.map(t =>
      t.id === id && t.status === 'en_trabajo'
        ? { ...t, status: 'completado' }
        : t
    ));
    sounds.playSuccess();
  };

  const counts = {
    pendiente: tickets.filter(t => t.status === 'pendiente').length,
    en_ruta: tickets.filter(t => t.status === 'en_ruta').length,
    en_trabajo: tickets.filter(t => t.status === 'en_trabajo').length,
    completado: tickets.filter(t => t.status === 'completado').length,
  };

  const selectedTicket = tickets.find(t => t.id === selected);

  return (
    <div className="w-full h-full bg-[#0a0d14] text-white font-mono text-xs flex flex-col overflow-hidden select-none">
      {/* Top Nav */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#0d1020] border-b border-sky-500/30 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-400" />
          <span className="font-bold text-white text-xs">ServiIntel Admin</span>
          <span className="text-zinc-400 text-[10px]">Console</span>
        </div>
        <div className="flex items-center gap-3 text-zinc-300">
          <Bell className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-emerald-400 font-bold text-[10.5px]">● LIVE</span>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-4 border-b border-white/10 shrink-0 bg-black/20">
        {[
          { label: 'Pendiente', val: counts.pendiente, color: 'text-amber-400' },
          { label: 'En Ruta', val: counts.en_ruta, color: 'text-sky-400' },
          { label: 'En Trabajo', val: counts.en_trabajo, color: 'text-purple-400' },
          { label: 'Completos', val: counts.completado, color: 'text-emerald-400' },
        ].map(k => (
          <div key={k.label} className="flex flex-col items-center py-1 border-r border-white/5 last:border-r-0">
            <span className={`text-sm sm:text-base font-bold ${k.color}`}>{k.val}</span>
            <span className="text-[9px] text-zinc-400 uppercase font-semibold">{k.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left: Ticket List */}
        <div className="w-[52%] border-r border-white/10 flex flex-col min-h-0 bg-[#080b12]">
          <div className="px-2.5 py-1 text-[10px] text-zinc-300 font-bold uppercase border-b border-white/5 shrink-0 bg-white/2">
            Tickets Activos
          </div>
          <div className="flex-1 overflow-y-auto">
            {tickets.map(t => (
              <button
                key={t.id}
                onClick={() => {
                  sounds.playClick();
                  setSelected(t.id);
                }}
                className={`w-full text-left px-2.5 py-1.5 border-b border-white/4 transition-all cursor-pointer ${
                  selected === t.id ? 'bg-sky-500/15' : 'hover:bg-white/4'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] font-bold text-zinc-200">{t.id}</span>
                  <span className={`text-[8.5px] font-bold px-1.5 py-0.2 rounded-full ${STATUS_COLOR[t.status]}`}>
                    {STATUS_LABEL[t.status]}
                  </span>
                </div>
                <div className="text-[11px] font-bold text-white leading-tight">{t.client}</div>
                <div className="flex items-center justify-between mt-0.5 text-[9.5px]">
                  <span className="text-zinc-400">{t.type}</span>
                  <span className={PRIORITY_COLOR[t.priority]}>{t.priority}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Ticket Detail */}
        <div className="w-[48%] flex flex-col p-2.5 space-y-1.5 overflow-y-auto bg-[#070a10]">
          {selectedTicket ? (
            <>
              <div className="space-y-0.5">
                <div className="text-[9px] text-sky-400 font-bold uppercase tracking-wider">TICKET ACTIVO</div>
                <div className="text-xs sm:text-sm font-bold text-white leading-tight">{selectedTicket.client}</div>
                <div className={`text-[10px] ${PRIORITY_COLOR[selectedTicket.priority]}`}>
                  ⚑ Prioridad: {selectedTicket.priority}
                </div>
              </div>

              <div className="space-y-0.5 text-[10px] text-zinc-300 font-mono">
                <div>Tipo: <span className="text-white font-bold">{selectedTicket.type}</span></div>
                <div>Operario: <span className="text-sky-300">{selectedTicket.operario}</span></div>
                <div>Hora: <span className="text-zinc-200">{selectedTicket.time}</span></div>
                <div>Estado: <span className={`font-bold ${STATUS_COLOR[selectedTicket.status].split(' ')[0]}`}>{STATUS_LABEL[selectedTicket.status]}</span></div>
              </div>

              {/* Firestore log */}
              <div className="p-1.5 rounded-lg bg-black/50 border border-white/5 text-[9px] text-zinc-400 space-y-0.5">
                <div className="text-emerald-400 font-semibold">● Sync {new Date().toLocaleTimeString('es-CO')}</div>
                <div className="truncate">doc: tickets/{selectedTicket.id}</div>
              </div>

              {selectedTicket.status === 'pendiente' && (
                <button
                  onClick={() => dispatch(selectedTicket.id)}
                  className="w-full py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-black text-[10.5px] font-bold cursor-pointer transition-all shadow-md active:scale-95"
                >
                  Despachar Operario
                </button>
              )}
              {selectedTicket.status === 'en_trabajo' && (
                <button
                  onClick={() => complete(selectedTicket.id)}
                  className="w-full py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-[10.5px] font-bold cursor-pointer transition-all shadow-md active:scale-95"
                >
                  Marcar Completado
                </button>
              )}
            </>
          ) : (
            <div className="text-zinc-500 text-[10px] text-center pt-4">Selecciona un ticket</div>
          )}
        </div>
      </div>
    </div>
  );
}
