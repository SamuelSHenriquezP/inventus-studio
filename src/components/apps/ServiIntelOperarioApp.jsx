// src/components/apps/ServiIntelOperarioApp.jsx
// Interactive Field Terminal / Rugged Operario App simulator for ServiIntel
// EXACT REPLICA of Flutter 'servintel_operarios' App (operario_screen.dart & reporte_tecnico_screen.dart)
// Polished with refined Montserrat typography, balanced spacing & high-contrast mobile UI
import { useState, useEffect } from 'react';
import { 
  MapPin, CheckCircle2, Navigation, Power, Search, X, 
  ArrowLeft, Plus, Trash2, Printer, UserCheck, Clock, Check,
  AlertTriangle, Wrench, Shield, Award, ExternalLink, HardHat
} from 'lucide-react';
import { sounds } from '../../utils/soundEngine';

// Seed initial database matching production Firestore
const INITIAL_TICKETS = [
  { 
    id: 'TK-5201', 
    clienteNombre: 'Comercial Torres',
    clienteTelefono: '+57 300 456 7890',
    clienteEmail: 'admin@comercialtorres.co',
    direccionText: 'Cra 7 #32-14, Cartagena', 
    categoria: 'Mantenimiento HVAC', 
    prioridad: 'ALTA', 
    estado: 'asignado',
    descripcion: 'Mantenimiento preventivo anual de unidad central Lennox 5TR. Ruidos inusuales en condensador.',
    maquinaModelo: 'Lennox 5TR Condenser',
    maquinaIdPropio: 'AC-LEN-01',
    maquinaSerial: 'LX90283811',
    pinCode: '4392',
    lat: 10.4236,
    lng: -75.5378,
    operarioNombre: 'Samuel H.',
    operarioId: 'OP-01',
    creadoEn: '19/08/2026 08:24'
  },
  { 
    id: 'TK-5202', 
    clienteNombre: 'Bodega Logística S.A.', 
    clienteTelefono: '+57 315 889 2011',
    clienteEmail: 'soporte@bodegalogistica.com',
    direccionText: 'Zona Franca, Local 8, Cartagena', 
    categoria: 'Revisión Eléctrica', 
    prioridad: 'MEDIA', 
    estado: 'solicitado',
    descripcion: 'Caída de breakers en sección refrigeración comercial. Medición térmica y fuga de corriente.',
    maquinaModelo: 'Tablero Schneider 440V',
    maquinaIdPropio: 'TE-SCH-08',
    maquinaSerial: 'SE-892019-X',
    pinCode: '7821',
    lat: 10.3952,
    lng: -75.4812,
    operarioNombre: null,
    operarioId: null,
    creadoEn: '19/08/2026 09:15'
  },
  { 
    id: 'TK-5203', 
    clienteNombre: 'Hotel Caribe Real', 
    clienteTelefono: '+57 310 998 1234',
    clienteEmail: 'gerencia@hotelcaribereal.com',
    direccionText: 'Av. Santander #45, Bocagrande', 
    categoria: 'Soporte Impresora', 
    prioridad: 'URGENTE', 
    estado: 'revision_cliente',
    descripcion: 'Impresora Ricoh MP 501 presenta atascos duplex y toner en fusor.',
    maquinaModelo: 'Ricoh MP 501 Multifuncional',
    maquinaIdPropio: 'PR-RIC-05',
    maquinaSerial: 'RC-501-88910',
    pinCode: '1092',
    lat: 10.4085,
    lng: -75.5023,
    operarioNombre: 'Samuel H.',
    operarioId: 'OP-01',
    creadoEn: '19/08/2026 09:40',
    reporteTecnico: {
      encargadoNombre: 'Samuel H.',
      encargadoCedula: '10471928',
      costoEmpresa: 150000,
      costoTecnico: 45000,
      fechaEmision: '19/08/2026 10:15',
      trabajosReportados: [
        {
          tipo: 'Mantenimiento',
          marca: 'Ricoh',
          modelo: 'MP 501 SPF',
          idPropio: 'PR-RIC-05',
          serial: 'RC-501-88910',
          contador: '248,190',
          diagnostico: 'Rodillo fusor con residuos de toner. Piñón duplex con desgaste.',
          solucion: 'Limpieza térmica de fusor y sustitución de piñón duplex. Pruebas 100% OK.',
          insumos: '1x Piñón Duplex, 1x Solvente Fusor'
        }
      ]
    }
  }
];

// Production Flutter Colors (constants.dart)
const cAzul = '#14AEE1';
const cFucsia = '#E71E65';
const cAmarillo = '#F3E72E';
const cVerde = '#22C55E';
const cTeal = '#0D9488';
const cTextoOscuro = '#1E293B';
const cTextoGris = '#64748B';
const cFondo = '#F4F7F9';

// Flutter getColorEstado mapping from constants.dart
const getColorEstado = (estado) => {
  switch (estado) {
    case 'asignado': return cAzul;
    case 'en_camino': return cFucsia;
    case 'en_sitio': return cAzul;
    case 'retrasado': return cAmarillo;
    case 'revision_cliente': return '#F97316'; // orange
    case 'trabajo_aprobado': return cFucsia;
    case 'en_progreso': return cVerde;
    case 'esperando_cierre': return cTeal;
    case 'completado': return cVerde;
    default: return cTextoGris;
  }
};

export default function ServiIntelOperarioApp() {
  // Sync state globally with web admin via window object & CustomEvent
  const [tickets, setTicketsState] = useState(() => {
    if (!window.__serviIntelTickets) {
      window.__serviIntelTickets = INITIAL_TICKETS;
    }
    return window.__serviIntelTickets;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Modals & Navigation
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activePinJobId, setActivePinJobId] = useState(null);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [showReportScreen, setShowReportScreen] = useState(false);
  const [reportJob, setReportJob] = useState(null);

  // Form state for ReporteTecnicoScreen
  const [cedulaEncargado, setCedulaEncargado] = useState('10471928');
  const [costoServicio, setCostoServicio] = useState('120000');
  const [costoTecnico, setCostoTecnico] = useState('40000');
  const [subTrabajos, setSubTrabajos] = useState([
    {
      tipo: 'Mantenimiento',
      idPropio: '',
      marca: '',
      modelo: '',
      serial: '',
      contador: '4,850',
      diagnostico: '',
      solucion: '',
      insumos: ''
    }
  ]);

  // Sync listener for real-time updates from Web Admin
  useEffect(() => {
    const handleSync = (e) => {
      setTicketsState(e.detail);
    };
    window.addEventListener('serviintel-tickets-sync', handleSync);
    return () => {
      window.removeEventListener('serviintel-tickets-sync', handleSync);
    };
  }, []);

  const updateTicketsGlobal = (newTickets) => {
    window.__serviIntelTickets = newTickets;
    setTicketsState(newTickets);
    window.dispatchEvent(new CustomEvent('serviintel-tickets-sync', { detail: newTickets }));
  };

  const actualizarEstado = (jobId, nuevoEstado, extraData = {}) => {
    sounds.playClick();
    setIsUpdating(true);

    setTimeout(() => {
      const nextTickets = tickets.map(t => {
        if (t.id === jobId) {
          return { ...t, estado: nuevoEstado, ...extraData };
        }
        return t;
      });

      updateTicketsGlobal(nextTickets);
      setIsUpdating(false);
      sounds.playSuccess();
    }, 300);
  };

  const solicitarPinLlegada = (jobId) => {
    sounds.playClick();
    setActivePinJobId(jobId);
    setPinInput('');
    setPinError(false);
    setShowPinModal(true);
  };

  const verificarPin = () => {
    const targetJob = tickets.find(t => t.id === activePinJobId);
    if (targetJob && pinInput.trim() === targetJob.pinCode.toString().trim()) {
      setShowPinModal(false);
      actualizarEstado(activePinJobId, 'en_sitio', {
        tiempoEnSitio: new Date().toLocaleTimeString('es-CO')
      });
    } else {
      sounds.playError();
      setPinError(true);
      setPinInput('');
    }
  };

  const abrirReporteTecnico = (job) => {
    sounds.playClick();
    setReportJob(job);
    setSubTrabajos([
      {
        tipo: 'Mantenimiento',
        idPropio: job.maquinaIdPropio || 'AC-LEN-01',
        marca: job.maquinaModelo ? job.maquinaModelo.split(' ')[0] : 'Lennox',
        modelo: job.maquinaModelo || 'Lennox 5TR Condenser',
        serial: job.maquinaSerial || 'LX90283811',
        contador: '4,850',
        diagnostico: 'Desgaste en rodamiento del ventilador y filtro saturado.',
        solucion: 'Lubricación de chumaceras, lavado de serpentín y calibración.',
        insumos: '1x Filtro 24x24x2, Solvente Dieléctrico'
      }
    ]);
    setShowReportScreen(true);
  };

  const enviarReporteTecnico = (e) => {
    e.preventDefault();
    if (!cedulaEncargado.trim()) return alert('Debe ingresar la cédula del encargado.');

    sounds.playClick();
    setIsUpdating(true);

    setTimeout(() => {
      const nuevoReporte = {
        encargadoNombre: 'Samuel H.',
        encargadoCedula: cedulaEncargado,
        costoEmpresa: parseFloat(costoServicio) || 0,
        costoTecnico: parseFloat(costoTecnico) || 0,
        fechaEmision: new Date().toLocaleTimeString('es-CO'),
        trabajosReportados: subTrabajos
      };

      const nextTickets = tickets.map(t => {
        if (t.id === reportJob.id) {
          return {
            ...t,
            estado: 'revision_cliente',
            reporteTecnico: nuevoReporte
          };
        }
        return t;
      });

      updateTicketsGlobal(nextTickets);
      setShowReportScreen(false);
      setIsUpdating(false);
      sounds.playSuccess();
    }, 400);
  };

  const filteredTickets = tickets.filter(t => {
    const q = searchQuery.toLowerCase();
    return t.clienteNombre.toLowerCase().includes(q) || 
           t.id.toLowerCase().includes(q) || 
           (t.categoria && t.categoria.toLowerCase().includes(q));
  });

  const activeTickets = filteredTickets.filter(t => t.estado !== 'completado');
  const completedTickets = filteredTickets.filter(t => t.estado === 'completado');

  return (
    <div className="w-full h-full bg-[#F4F7F9] text-[#1E293B] font-sans flex flex-col select-none overflow-hidden relative text-[9px] leading-tight antialiased">
      
      {/* 1. BRANDED APP BAR (Flutter BrandedAppBar exact styling) */}
      <header className="bg-white px-2 py-1.5 flex items-center justify-between border-b border-[#E2E8F0] shadow-2xs shrink-0 z-10">
        <div className="flex items-center gap-1.5">
          {/* Logo Brand Mark */}
          <div className="w-4 h-4 rounded-xs bg-[#14AEE1] flex items-center justify-center text-white font-black text-[8.5px] shadow-2xs">
            S
          </div>
          <div className="text-[11px] font-black tracking-tight text-[#1E293B] flex items-center">
            <span>SERVI</span>
            <span className="text-[#F3E72E] ml-0.5" style={{ textShadow: '0 0.5px 0 #1E293B' }}>INTEL</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 bg-[#14AEE1]/10 text-[#0284C7] px-1.5 py-0.2 rounded-full text-[7px] font-black">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14AEE1] animate-pulse" />
            <span>OPERARIO</span>
          </div>
          <button 
            title="Desconectar" 
            className="p-0.5 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
          >
            <Power className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* 2. SEARCH CLIENT CONTAINER */}
      <div className="bg-white px-2 py-1 border-b border-[#E2E8F0] shrink-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar órdenes o clientes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg py-1 pl-6 pr-5 text-[8px] text-[#1E293B] placeholder-slate-400 focus:outline-none focus:border-[#14AEE1] focus:bg-white transition-all font-medium"
          />
          <Search className="w-2.5 h-2.5 text-[#14AEE1] absolute left-2 top-1.5" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-1.5 top-1.5 p-0.5 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. MAIN WORKSPACE / SCROLLABLE TASKS LIST */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        
        {/* SECTION HEADER: TAREAS PENDIENTES */}
        <div>
          <div className="flex items-center justify-between pb-1">
            <span className="text-[8px] font-black text-[#64748B] tracking-[1px] uppercase">
              ÓRDENES ACTIVAS ({activeTickets.length})
            </span>
            <span className="text-[7px] font-bold text-sky-600 bg-sky-50 px-1 py-0.2 rounded">
              GPS LIVE
            </span>
          </div>

          {activeTickets.length === 0 ? (
            <div className="bg-white rounded-xl p-3 text-center text-slate-400 border border-[#E2E8F0] text-[8.5px]">
              No hay tareas activas en este momento.
            </div>
          ) : (
            <div className="space-y-2">
              {activeTickets.map(job => {
                const estadoColor = getColorEstado(job.estado);
                return (
                  /* Flutter PremiumCard: 3.5px Top Border, White Background, Rounded 14px, Shadow */
                  <div
                    key={job.id}
                    className="bg-white rounded-xl p-2.5 shadow-2xs border border-[#E2E8F0] relative overflow-hidden transition-all space-y-1.5"
                    style={{ borderTop: `3.5px solid ${estadoColor}` }}
                  >
                    {/* Header Row: Category & Status Badge */}
                    <div className="flex items-center justify-between pb-1 border-b border-[#F1F5F9]">
                      <span className="font-black text-[9px] text-[#14AEE1] tracking-wide uppercase truncate max-w-[110px]">
                        {job.categoria || 'SERVICIO'}
                      </span>
                      <span 
                        className="px-1.5 py-0.2 rounded font-black text-[7px] uppercase tracking-wider"
                        style={{ 
                          backgroundColor: `${estadoColor}1A`, 
                          color: estadoColor 
                        }}
                      >
                        {job.estado.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Client Name with person icon */}
                    <div 
                      onClick={() => {
                        setSelectedJob(job);
                        setShowDetailsModal(true);
                      }}
                      className="flex items-center gap-1 cursor-pointer group"
                    >
                      <UserCheck className="w-3 h-3 text-[#1E293B] shrink-0" />
                      <h4 className="font-black text-[10.5px] text-[#1E293B] group-hover:text-[#14AEE1] transition-colors leading-tight truncate">
                        {job.clienteNombre}
                      </h4>
                    </div>

                    {/* Address Banner with Fucsia accent */}
                    {job.direccionText && (
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#E71E65]/10 text-[#E71E65] font-bold text-[8px]">
                        <MapPin className="w-2.5 h-2.5 shrink-0" />
                        <span className="truncate">{job.direccionText}</span>
                      </div>
                    )}

                    {/* Service Description Box */}
                    <div className="p-1.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[7.5px] text-slate-600 leading-snug font-medium">
                      {job.descripcion}
                    </div>

                    {/* Associated Machine Box */}
                    {job.maquinaModelo && (
                      <div className="p-1.5 rounded-md bg-[#14AEE1]/8 border border-[#14AEE1]/20 flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1 text-[7.5px] font-black text-[#14AEE1] truncate">
                          <Printer className="w-2.5 h-2.5 shrink-0" />
                          <span className="truncate">{job.maquinaModelo}</span>
                        </div>
                        {job.maquinaIdPropio && (
                          <span className="font-mono text-[7px] font-bold bg-white px-1 py-0.2 rounded text-slate-700 shrink-0">
                            {job.maquinaIdPropio}
                          </span>
                        )}
                      </div>
                    )}

                    {/* OpenStreetMap FlutterMap Mini Widget */}
                    {job.lat && (
                      <div className="rounded-lg overflow-hidden border border-[#E2E8F0] relative h-13 bg-slate-100 flex flex-col justify-end">
                        {/* Map Grid background */}
                        <div className="absolute inset-0 bg-[#e5e9f0] opacity-90 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:7px_7px]" />
                        
                        {/* Route Line Simulator */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          <path d="M 20 40 Q 65 15, 135 22" fill="none" stroke="#14AEE1" strokeWidth="2" strokeDasharray="3 3" />
                        </svg>

                        {/* Operario Marker */}
                        <div className="absolute left-[20px] top-[38px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#14AEE1] border-2 border-white shadow-xs animate-ping" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#14AEE1] border-2 border-white shadow-xs absolute" />
                        </div>

                        {/* Destination Marker */}
                        <div className="absolute left-[135px] top-[20px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                          <MapPin className="w-3.5 h-3.5 text-[#E71E65] fill-[#E71E65] drop-shadow-xs" />
                        </div>

                        {/* Bottom Action bar */}
                        <div className="relative z-10 bg-black/65 backdrop-blur-xs py-0.5 px-1.5 flex items-center justify-between text-[7px] font-bold text-white">
                          <span className="flex items-center gap-0.5">
                            <Navigation className="w-2 h-2 text-sky-400" />
                            <span>1.8 km / 6 min</span>
                          </span>
                          <span className="text-sky-300">OpenMaps</span>
                        </div>
                      </div>
                    )}

                    {/* ========================================================= */}
                    {/* FLUTTER OPERARIO ACTION BUTTONS (_BotonAccionOperario)    */}
                    {/* ========================================================= */}
                    <div className="pt-1 border-t border-[#F1F5F9]">
                      
                      {/* Estado: ASIGNADO -> INICIAR RUTA */}
                      {job.estado === 'asignado' && (
                        <button
                          onClick={() => actualizarEstado(job.id, 'en_camino')}
                          disabled={isUpdating}
                          className="w-full h-7 rounded-lg bg-[#14AEE1] hover:brightness-105 active:scale-98 text-white font-black text-[8.5px] flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                        >
                          <Navigation className="w-3 h-3 fill-white" />
                          <span>INICIAR RUTA</span>
                        </button>
                      )}

                      {/* Estado: EN_CAMINO -> LLEGADA & RETRASO */}
                      {job.estado === 'en_camino' && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => solicitarPinLlegada(job.id)}
                            disabled={isUpdating}
                            className="flex-1 h-7 rounded-lg bg-[#E71E65] hover:brightness-105 active:scale-98 text-white font-black text-[8.5px] flex items-center justify-center gap-1 transition-all shadow-2xs cursor-pointer"
                          >
                            <MapPin className="w-3 h-3" />
                            <span>LLEGADA</span>
                          </button>
                          <button
                            onClick={() => actualizarEstado(job.id, 'retrasado')}
                            disabled={isUpdating}
                            className="flex-1 h-7 rounded-lg bg-[#F3E72E] hover:brightness-95 active:scale-98 text-[#1E293B] font-black text-[8.5px] flex items-center justify-center gap-1 transition-all shadow-2xs cursor-pointer"
                          >
                            <Clock className="w-3 h-3" />
                            <span>RETRASO</span>
                          </button>
                        </div>
                      )}

                      {/* Estado: EN_SITIO o RETRASADO -> GENERAR DIAGNÓSTICO */}
                      {(job.estado === 'en_sitio' || job.estado === 'retrasado') && (
                        <button
                          onClick={() => abrirReporteTecnico(job)}
                          disabled={isUpdating}
                          className="w-full h-7 rounded-lg bg-[#14AEE1] hover:brightness-105 active:scale-98 text-white font-black text-[8.5px] flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                        >
                          <Wrench className="w-3 h-3" />
                          <span>GENERAR DIAGNÓSTICO</span>
                        </button>
                      )}

                      {/* Estado: REVISIÓN CLIENTE -> ESPERANDO APROBACIÓN */}
                      {job.estado === 'revision_cliente' && (
                        <div className="py-1 px-2 rounded-lg bg-orange-50 border border-orange-200 text-center">
                          <span className="font-black text-[8px] text-orange-600 tracking-wide block">
                            ⏳ ESPERANDO APROBACIÓN CENTRAL
                          </span>
                        </div>
                      )}

                      {/* Estado: TRABAJO APROBADO -> EMPEZAR TRABAJO */}
                      {job.estado === 'trabajo_aprobado' && (
                        <button
                          onClick={() => actualizarEstado(job.id, 'en_progreso')}
                          disabled={isUpdating}
                          className="w-full h-7 rounded-lg bg-[#E71E65] hover:brightness-105 active:scale-98 text-white font-black text-[8.5px] flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                        >
                          <Wrench className="w-3 h-3" />
                          <span>EMPEZAR TRABAJO</span>
                        </button>
                      )}

                      {/* Estado: EN PROGRESO -> FINALIZAR TRABAJO */}
                      {job.estado === 'en_progreso' && (
                        <button
                          onClick={() => actualizarEstado(job.id, 'esperando_cierre')}
                          disabled={isUpdating}
                          className="w-full h-7 rounded-lg bg-[#22C55E] hover:brightness-105 active:scale-98 text-white font-black text-[8.5px] flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>FINALIZAR TRABAJO</span>
                        </button>
                      )}

                      {/* Estado: ESPERANDO CIERRE ADMIN */}
                      {job.estado === 'esperando_cierre' && (
                        <div className="py-1 px-2 rounded-lg bg-teal-50 border border-teal-200 text-center">
                          <span className="font-black text-[7.5px] text-[#0D9488] tracking-wide block">
                            📋 ESPERANDO CIERRE ADMIN
                          </span>
                        </div>
                      )}

                      {/* Fallback Solicitar si está en solicitado */}
                      {job.estado === 'solicitado' && (
                        <button
                          onClick={() => actualizarEstado(job.id, 'asignado', { operarioNombre: 'Samuel H.', operarioId: 'OP-01' })}
                          className="w-full h-7 rounded-lg bg-[#14AEE1] hover:brightness-105 text-white font-black text-[8.5px] flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                        >
                          <Check className="w-3 h-3" />
                          <span>TOMAR ORDEN</span>
                        </button>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION HEADER: RECIÉN COMPLETADAS */}
        {completedTickets.length > 0 && (
          <div className="pt-1">
            <div className="text-[8px] font-black text-[#64748B] tracking-[1px] uppercase pb-1">
              COMPLETADAS ({completedTickets.length})
            </div>

            <div className="space-y-1">
              {completedTickets.map(job => (
                <div 
                  key={job.id} 
                  className="bg-white rounded-xl p-2 border border-[#E2E8F0] opacity-80"
                  style={{ borderTop: '2.5px solid #22C55E' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-[9px] truncate max-w-[100px]">{job.clienteNombre}</span>
                    <span className="px-1 py-0.2 rounded bg-emerald-50 text-[#22C55E] text-[7px] font-black">
                      FINALIZADO
                    </span>
                  </div>
                  <div className="mt-1 text-center text-[#22C55E] font-black text-[8.5px]">
                    ⭐ SERVICIO CERRADO Y FACTURADO
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 4. DIALOG MODAL: PIN VERIFICATION (_solicitarPin in Flutter)              */}
      {/* ========================================================================= */}
      {showPinModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-xl p-3 w-full max-w-[185px] shadow-2xl border border-slate-200 space-y-2 text-center text-[8px]">
            <div className="w-6 h-6 rounded-full bg-[#14AEE1]/10 text-[#14AEE1] flex items-center justify-center mx-auto">
              <Shield className="w-3.5 h-3.5" />
            </div>
            
            <div>
              <h3 className="text-[10px] font-black text-[#1E293B]">Verificar PIN</h3>
              <p className="text-[7px] text-slate-500 font-medium">
                Código de 4 dígitos del cliente
              </p>
            </div>

            <input
              type="text"
              maxLength={4}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="••••"
              className="w-full text-center text-base font-black tracking-[5px] py-1 bg-slate-50 border border-slate-300 rounded-lg focus:border-[#14AEE1] focus:bg-white focus:outline-none"
            />

            {pinError && (
              <div className="text-[7px] text-rose-500 font-bold">
                PIN Incorrecto (Pruebe 4392)
              </div>
            )}

            <div className="flex gap-1 pt-0.5">
              <button
                onClick={() => setShowPinModal(false)}
                className="flex-1 py-1 text-[7.5px] font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={verificarPin}
                className="flex-1 py-1 bg-[#14AEE1] text-white text-[7.5px] font-black rounded-lg hover:brightness-105 cursor-pointer shadow-xs"
              >
                VERIFICAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. FULLSCREEN REPORT: REPORTE TÉCNICO SCREEN (ReporteTecnicoScreen)       */}
      {/* ========================================================================= */}
      {showReportScreen && reportJob && (
        <div className="absolute inset-0 bg-[#F4F7F9] z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-150">
          
          {/* Topbar */}
          <div className="bg-white px-2 py-1.5 border-b border-[#E2E8F0] flex items-center gap-1.5 shrink-0 shadow-2xs">
            <button 
              onClick={() => setShowReportScreen(false)}
              className="p-0.5 text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
            </button>
            <h3 className="font-black text-[10px] text-[#1E293B]">Reporte Técnico</h3>
          </div>

          {/* Form Content */}
          <form onSubmit={enviarReporteTecnico} className="flex-1 overflow-y-auto p-2 space-y-1.5 text-[8px]">
            
            {/* Cédula Encargado */}
            <div className="bg-white p-2 rounded-xl border border-[#E2E8F0] space-y-1 shadow-2xs">
              <label className="text-[7px] font-bold text-[#64748B] uppercase tracking-wider block">
                Cédula del Encargado
              </label>
              <input
                type="text"
                required
                value={cedulaEncargado}
                onChange={(e) => setCedulaEncargado(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded p-1 text-[8px] text-[#1E293B] font-bold focus:border-[#14AEE1] focus:bg-white focus:outline-none"
              />
            </div>

            {/* Sub-trabajo Card */}
            {subTrabajos.map((st, idx) => (
              <div key={idx} className="bg-white p-2 rounded-xl border border-[#E2E8F0] space-y-1 shadow-2xs">
                <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-0.5">
                  <span className="font-black text-[8px] text-[#14AEE1] uppercase">
                    INTERVENCIÓN #{idx + 1}
                  </span>
                  <span className="px-1 py-0.2 rounded bg-[#14AEE1]/10 text-[#14AEE1] text-[7px] font-bold">
                    {st.tipo}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1">
                  <div>
                    <label className="text-[6.5px] font-bold text-[#64748B]">Marca</label>
                    <input
                      type="text"
                      value={st.marca}
                      onChange={(e) => {
                        const next = [...subTrabajos];
                        next[idx].marca = e.target.value;
                        setSubTrabajos(next);
                      }}
                      className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded p-0.5 text-[7.5px] text-[#1E293B]"
                    />
                  </div>
                  <div>
                    <label className="text-[6.5px] font-bold text-[#64748B]">Modelo</label>
                    <input
                      type="text"
                      value={st.modelo}
                      onChange={(e) => {
                        const next = [...subTrabajos];
                        next[idx].modelo = e.target.value;
                        setSubTrabajos(next);
                      }}
                      className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded p-0.5 text-[7.5px] text-[#1E293B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[6.5px] font-bold text-[#64748B]">Diagnóstico</label>
                  <textarea
                    rows={2}
                    required
                    value={st.diagnostico}
                    onChange={(e) => {
                      const next = [...subTrabajos];
                      next[idx].diagnostico = e.target.value;
                      setSubTrabajos(next);
                    }}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded p-0.5 text-[7.5px] text-[#1E293B] resize-none"
                  />
                </div>

                <div>
                  <label className="text-[6.5px] font-bold text-[#64748B]">Solución</label>
                  <textarea
                    rows={2}
                    required
                    value={st.solucion}
                    onChange={(e) => {
                      const next = [...subTrabajos];
                      next[idx].solucion = e.target.value;
                      setSubTrabajos(next);
                    }}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded p-0.5 text-[7.5px] text-[#1E293B] resize-none"
                  />
                </div>
              </div>
            ))}

            {/* Financial Summary */}
            <div className="bg-white p-2 rounded-xl border border-[#E2E8F0] grid grid-cols-2 gap-1.5 shadow-2xs">
              <div>
                <label className="text-[6.5px] font-bold text-[#64748B]">Costo Empresa ($)</label>
                <input
                  type="number"
                  value={costoServicio}
                  onChange={(e) => setCostoServicio(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded p-0.5 text-[7.5px] font-bold text-[#1E293B]"
                />
              </div>
              <div>
                <label className="text-[6.5px] font-bold text-[#64748B]">Costo Técnico ($)</label>
                <input
                  type="number"
                  value={costoTecnico}
                  onChange={(e) => setCostoTecnico(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded p-0.5 text-[7.5px] font-bold text-[#1E293B]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full h-7 rounded-lg bg-[#14AEE1] hover:brightness-105 active:scale-98 text-white font-black text-[9px] flex items-center justify-center gap-1 shadow-md cursor-pointer"
            >
              <Check className="w-3 h-3" />
              <span>ENVIAR REPORTE</span>
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. BOTTOM DRAWER: JOB DETAILS SHEET (_mostrarDetalles in Flutter)         */}
      {/* ========================================================================= */}
      {showDetailsModal && selectedJob && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex flex-col justify-end animate-in fade-in duration-150">
          <div className="bg-white rounded-t-2xl p-2.5 max-h-[85%] overflow-y-auto space-y-1.5 shadow-2xl border-t border-slate-200 animate-in slide-in-from-bottom duration-150 text-[8px]">
            
            {/* Drag Handle */}
            <div className="w-8 h-1 rounded-full bg-slate-300 mx-auto" />

            <div className="flex items-center justify-between border-b border-slate-100 pb-0.5">
              <span className="font-black text-[9.5px] text-[#14AEE1] uppercase tracking-wide truncate max-w-[130px]">
                {selectedJob.categoria}
              </span>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="p-0.5 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-1 text-[7.5px]">
              <div>
                <span className="text-[6px] font-bold text-slate-400 block">Cliente</span>
                <span className="font-black text-[#1E293B] text-[9.5px]">{selectedJob.clienteNombre}</span>
              </div>

              <div>
                <span className="text-[6px] font-bold text-slate-400 block">Dirección</span>
                <span className="text-slate-700 font-medium">{selectedJob.direccionText}</span>
              </div>

              <div>
                <span className="text-[6px] font-bold text-slate-400 block">Descripción</span>
                <span className="text-slate-700 leading-tight block">{selectedJob.descripcion}</span>
              </div>

              {selectedJob.pinCode && (
                <div>
                  <span className="text-[6px] font-bold text-slate-400 block">PIN de Llegada</span>
                  <span className="font-mono font-bold text-[#14AEE1]">{selectedJob.pinCode}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowDetailsModal(false)}
              className="w-full py-1 rounded bg-slate-100 text-slate-700 font-black text-[7.5px] hover:bg-slate-200 cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
