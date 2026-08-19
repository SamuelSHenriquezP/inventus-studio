// src/components/apps/ServiIntelOperarioApp.jsx
// Interactive Field Terminal / Rugged Operario App simulator for ServiIntel
import { useState, useEffect } from 'react';
import { 
  MapPin, CheckCircle2, Navigation, 
  Radio, Battery, Wifi, RefreshCw
} from 'lucide-react';
import { sounds } from '../../utils/soundEngine';

const INITIAL_TICKETS = [
  { 
    id: 'TK-5201', 
    client: 'Comercial Torres', 
    address: 'Cra 7 #32-14, Cartagena', 
    type: 'Mantenimiento HVAC', 
    priority: 'ALTA', 
    status: 'en_ruta',
    time: '08:24' 
  },
  { 
    id: 'TK-5202', 
    client: 'Bodega Logística S.A.', 
    address: 'Zona Franca, Local 8', 
    type: 'Revisión Eléctrica', 
    priority: 'MEDIA', 
    status: 'pendiente',
    time: '09:15' 
  },
  { 
    id: 'TK-5203', 
    client: 'Hotel Caribe Real', 
    address: 'Av. Santander #45', 
    type: 'Plomería Urgente', 
    priority: 'URGENTE', 
    status: 'pendiente',
    time: '09:40' 
  },
];

const STATUS_CYCLE = { 
  pendiente: 'en_ruta', 
  en_ruta: 'en_trabajo', 
  en_trabajo: 'completado', 
  completado: 'completado' 
};

const STATUS_LABEL = { 
  pendiente: 'Pendiente', 
  en_ruta: 'En Ruta', 
  en_trabajo: 'En Trabajo', 
  completado: 'Completado' 
};

const STATUS_BADGE_STYLE = { 
  pendiente: 'text-amber-300 bg-amber-500/20 border-amber-500/40', 
  en_ruta: 'text-sky-300 bg-sky-500/20 border-sky-500/40 shadow-[0_0_10px_rgba(56,189,248,0.25)]', 
  en_trabajo: 'text-purple-300 bg-purple-500/20 border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.25)]', 
  completado: 'text-emerald-300 bg-emerald-500/20 border-emerald-500/40' 
};

const PRIORITY_STYLE = { 
  ALTA: 'text-red-400 bg-red-500/15 border-red-500/30 font-bold', 
  MEDIA: 'text-amber-400 bg-amber-500/15 border-amber-500/30 font-bold', 
  URGENTE: 'text-rose-300 bg-rose-500/30 border-rose-500/50 font-bold animate-pulse' 
};

export default function ServiIntelOperarioApp() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [selectedId, setSelectedId] = useState('TK-5201');
  const [gpsCoords, setGpsCoords] = useState('10.4236° N, 75.5378° W');
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentTime, setCurrentTime] = useState('09:42');

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const advanceStatus = (id) => {
    sounds.playClick();
    setIsUpdating(true);

    setTimeout(() => {
      setTickets(prev => prev.map(t => {
        if (t.id === id) {
          const next = STATUS_CYCLE[t.status];
          return { ...t, status: next };
        }
        return t;
      }));

      // Simulate slight GPS position shift
      const lat = (10.41 + Math.random() * 0.03).toFixed(4);
      const lng = (75.52 + Math.random() * 0.03).toFixed(4);
      setGpsCoords(`${lat}° N, ${lng}° W`);
      
      setIsUpdating(false);
      sounds.playSuccess();
    }, 300);
  };

  const selectedTicket = tickets.find(t => t.id === selectedId) || tickets[0];
  const activeCount = tickets.filter(t => t.status !== 'completado').length;

  return (
    <div className="w-full h-full bg-[#080b12] text-zinc-100 font-sans flex flex-col select-none overflow-hidden text-xs">
      
      {/* ========================================================================= */}
      {/* TOP SMARTPHONE STATUS BAR */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between px-2.5 pt-3 pb-1 bg-[#0e1320] border-b border-sky-500/30 shrink-0">
        <div className="flex items-center gap-1.5 font-mono font-bold text-white text-[9.5px]">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>SERVIINTEL</span>
          <span className="text-sky-400 text-[8.5px] font-semibold">OPS</span>
        </div>

        <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-300">
          <div className="flex items-center gap-0.5 text-emerald-400 font-bold text-[8.5px]">
            <Wifi className="w-2.5 h-2.5" />
            <span>4G</span>
          </div>
          <div className="flex items-center gap-0.5 text-zinc-200 text-[8.5px]">
            <Battery className="w-2.5 h-2.5 text-emerald-400" />
            <span>94%</span>
          </div>
          <span className="text-white font-bold text-[9.5px]">{currentTime}</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VERTICAL PHONE WORKSPACE: ACTIVE TICKET HERO CARD + QUEUE LIST */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto p-2 space-y-1.5 bg-linear-to-b from-[#080b12] to-[#04060a]">
        
        {/* Active Ticket Hero Card */}
        {selectedTicket && (
          <div className="p-2 rounded-lg bg-linear-to-br from-sky-950/40 via-[#0e1424] to-[#0a0f1c] border border-sky-500/30 shadow-md space-y-1.5 shrink-0">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8.5px] text-sky-400 font-bold tracking-wider">
                ORDEN ACTIVA // {selectedTicket.id}
              </span>
              <span className={`text-[8px] font-mono font-bold px-1.5 py-0.2 rounded-full border ${STATUS_BADGE_STYLE[selectedTicket.status]}`}>
                {STATUS_LABEL[selectedTicket.status]}
              </span>
            </div>

            <div>
              <h4 className="text-[11.5px] font-bold text-white leading-tight truncate">
                {selectedTicket.client}
              </h4>
              <div className="flex items-center gap-1 text-[9.5px] text-zinc-300 mt-0.5">
                <MapPin className="w-2.5 h-2.5 text-sky-400 shrink-0" />
                <span className="truncate">{selectedTicket.address}</span>
              </div>
            </div>

            {/* Quick Metadata Row */}
            <div className="flex items-center justify-between text-[8.5px] font-mono pt-1 border-t border-white/10 text-zinc-300">
              <div className="flex items-center gap-1">
                <span className="text-zinc-400">Servicio:</span>
                <span className="text-white font-semibold truncate max-w-22.5">{selectedTicket.type}</span>
              </div>
              <span className={`px-1 py-0.2 rounded border text-[8px] ${PRIORITY_STYLE[selectedTicket.priority]}`}>
                {selectedTicket.priority}
              </span>
            </div>

            {/* Action Button */}
            <div className="pt-0.5">
              {selectedTicket.status !== 'completado' ? (
                <button
                  onClick={() => advanceStatus(selectedTicket.id)}
                  disabled={isUpdating}
                  className="w-full py-1 px-2 rounded-md bg-sky-400 hover:bg-sky-300 active:scale-95 text-black font-bold text-[10.5px] flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isUpdating ? (
                    <>
                      <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                      <span>Sincronizando...</span>
                    </>
                  ) : (
                    <>
                      <Navigation className="w-2.5 h-2.5 fill-current" />
                      <span>
                        {selectedTicket.status === 'pendiente' 
                          ? 'Ir en Ruta' 
                          : selectedTicket.status === 'en_ruta' 
                          ? 'Iniciar Trabajo' 
                          : 'Completar Orden'}
                      </span>
                    </>
                  )}
                </button>
              ) : (
                <div className="w-full py-1 px-2 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[9px] font-bold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>Orden Completada</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Ticket Queue List */}
        <div className="space-y-1 flex-1 min-h-0">
          <div className="flex items-center justify-between px-0.5 font-mono text-[8.5px] text-zinc-400">
            <span className="uppercase font-bold">Cola ({activeCount})</span>
            <span className="text-sky-400 font-semibold flex items-center gap-1">
              <Radio className="w-2 h-2 animate-pulse" />
              Sync
            </span>
          </div>

          <div className="space-y-1 overflow-y-auto max-h-21.25 pr-0.5">
            {tickets.map(t => {
              const isSelected = t.id === selectedId;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedId(t.id);
                  }}
                  className={`w-full text-left p-1.5 rounded-md border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-sky-500/15 border-sky-500/40 shadow-sm' 
                      : 'bg-white/3 border-white/5 hover:bg-white/6'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-mono font-bold text-white text-[9px]">{t.id}</span>
                    <span className={`text-[7.5px] font-mono font-bold px-1.5 py-0.2 rounded-full border ${STATUS_BADGE_STYLE[t.status]}`}>
                      {STATUS_LABEL[t.status]}
                    </span>
                  </div>
                  <div className="font-bold text-white text-[10px] truncate">{t.client}</div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* BOTTOM REALTIME GPS FOOTER */}
      {/* ========================================================================= */}
      <div className="px-2 py-0.5 bg-[#0a0e18] border-t border-white/10 font-mono text-[8px] text-zinc-300 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1">
          <Navigation className="w-2 h-2 text-sky-400" />
          <span className="text-zinc-300 truncate max-w-30">{gpsCoords}</span>
        </div>
        <span className="text-emerald-400 font-bold">&lt;34ms Sync</span>
      </div>

    </div>
  );
}
