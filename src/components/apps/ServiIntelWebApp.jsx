// src/components/apps/ServiIntelWebApp.jsx
// Interactive Web Admin Console simulator for ServiIntel
// EXACT REPLICA of 'web-admin' (index.html, styles.css & admin.js)
// Polished with refined typography, balanced whitespace & ultra-crisp responsive cards
import { useState, useEffect } from 'react';
import { 
  Users, Building, ClipboardList, Eye, Plus, RefreshCw, 
  CheckCircle, Star, AlertCircle, X, Search, Check, 
  MapPin, Shield, Wrench, ChevronDown, Award, Send,
  UserPlus, HardHat, FileText, CheckCheck, Lock, Radio,
  Activity, Phone, Mail, Clock
} from 'lucide-react';
import { sounds } from '../../utils/soundEngine';

// Initial Database matching Firestore
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

const INITIAL_CLIENTS = [
  { id: 'CLI-01', nombre: 'Comercial Torres', contacto: 'carlos@torres.co', totalServicios: 12, activo: true },
  { id: 'CLI-02', nombre: 'Bodega Logística S.A.', contacto: 'gerencia@bodega.co', totalServicios: 5, activo: true },
  { id: 'CLI-03', nombre: 'Hotel Caribe Real', contacto: 'mant@caribereal.com', totalServicios: 18, activo: true },
  { id: 'CLI-04', nombre: 'Clínica Centro', contacto: 'biomedica@centro.co', totalServicios: 8, activo: true }
];

const INITIAL_EQUIPO = [
  { id: 'OP-01', nombre: 'Samuel H.', rol: 'Senior Field Lead', calificacion: 5, activo: true },
  { id: 'OP-02', nombre: 'Luis Rodríguez', rol: 'Técnico Electromecánico', calificacion: 4.8, activo: true },
  { id: 'OP-03', nombre: 'Ana Morales', rol: 'Especialista HVAC', calificacion: 4.5, activo: true }
];

export default function ServiIntelWebApp() {
  // Sync state globally with mobile app via window object & CustomEvent
  const [tickets, setTicketsState] = useState(() => {
    if (!window.__serviIntelTickets) {
      window.__serviIntelTickets = INITIAL_TICKETS;
    }
    return window.__serviIntelTickets;
  });

  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [equipo, setEquipo] = useState(INITIAL_EQUIPO);

  // Active Tab: 'trabajos' | 'clientes' | 'equipo'
  const [activeTab, setActiveTab] = useState('trabajos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [searchTrabajos, setSearchTrabajos] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  // Modals
  const [selectedJobDetail, setSelectedJobDetail] = useState(null);
  const [assigningJobId, setAssigningJobId] = useState(null);
  const [showNewClientModal, setShowNewClientModal] = useState(false);

  // Sync listener for real-time updates from Flutter Mobile App
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

  const handleSyncData = () => {
    sounds.playClick();
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      sounds.playSuccess();
    }, 500);
  };

  const asignarTecnico = (jobId, techName, techId) => {
    sounds.playClick();
    const nextTickets = tickets.map(t => {
      if (t.id === jobId) {
        return {
          ...t,
          estado: 'asignado',
          operarioNombre: techName,
          operarioId: techId
        };
      }
      return t;
    });
    updateTicketsGlobal(nextTickets);
    setAssigningJobId(null);
    sounds.playSuccess();
  };

  const aprobarReporte = (jobId) => {
    sounds.playClick();
    const nextTickets = tickets.map(t => {
      if (t.id === jobId) {
        return { ...t, estado: 'trabajo_aprobado' };
      }
      return t;
    });
    updateTicketsGlobal(nextTickets);
    if (selectedJobDetail) {
      setSelectedJobDetail({ ...selectedJobDetail, estado: 'trabajo_aprobado' });
    }
    sounds.playSuccess();
  };

  const rechazarReporte = (jobId) => {
    sounds.playClick();
    const nextTickets = tickets.map(t => {
      if (t.id === jobId) {
        return { ...t, estado: 'en_sitio', reporteTecnico: null };
      }
      return t;
    });
    updateTicketsGlobal(nextTickets);
    if (selectedJobDetail) {
      setSelectedJobDetail({ ...selectedJobDetail, estado: 'en_sitio', reporteTecnico: null });
    }
    sounds.playError();
  };

  const marcarCompletado = (jobId) => {
    sounds.playClick();
    const nextTickets = tickets.map(t => {
      if (t.id === jobId) {
        return { ...t, estado: 'completado', calificado: true, puntosAdmin: 5 };
      }
      return t;
    });
    updateTicketsGlobal(nextTickets);
    if (selectedJobDetail) {
      setSelectedJobDetail({ ...selectedJobDetail, estado: 'completado', calificado: true, puntosAdmin: 5 });
    }
    sounds.playSuccess();
  };

  // Filter Jobs
  const filteredTrabajos = tickets.filter(t => {
    const matchesFilter = filtroEstado === 'todos' || t.estado === filtroEstado;
    const matchesSearch = t.clienteNombre.toLowerCase().includes(searchTrabajos.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchTrabajos.toLowerCase()) ||
                          t.categoria.toLowerCase().includes(searchTrabajos.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full h-full bg-[#F4F7F9] text-[#1E293B] font-['Plus_Jakarta_Sans',sans-serif] flex overflow-hidden select-none text-[9.5px] antialiased">
      
      {/* ========================================================================= */}
      {/* 1. SIDEBAR (web-admin index.html exact sidebar)                           */}
      {/* ========================================================================= */}
      <aside className="w-22 sm:w-26 bg-white border-r border-[#E2E8F0] flex flex-col shrink-0 z-10 shadow-2xs font-['Plus_Jakarta_Sans',sans-serif]">
        
        {/* Sidebar Header: Admin */}
        <div className="p-1.5 px-2 flex items-center justify-between border-b border-[#E2E8F0]">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-4 h-4 rounded-md bg-[#14AEE1] flex items-center justify-center text-white shadow-2xs shrink-0">
              <Activity className="w-2.5 h-2.5" />
            </div>
            <span className="text-[12px] font-extrabold tracking-wide text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] shrink-0">
              Admin
            </span>
          </div>
          <span className="bg-[#F3E72E]/20 text-[#854D0E] text-[7.5px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 tracking-wider font-['Plus_Jakarta_Sans',sans-serif]">
            WEB
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="p-1 space-y-0.5 flex-1 font-['Plus_Jakarta_Sans',sans-serif]">
          <button
            onClick={() => setActiveTab('trabajos')}
            className={`w-full flex items-center gap-1.5 px-1.5 py-1.5 rounded-md text-[9px] font-extrabold transition-all text-left cursor-pointer ${
              activeTab === 'trabajos'
                ? 'bg-[#14AEE1]/10 text-[#0284C7] shadow-2xs border-l-2 border-[#14AEE1]'
                : 'text-[#64748B] hover:bg-[#F4F7F9] hover:text-[#1E293B]'
            }`}
          >
            <ClipboardList className="w-3 h-3 text-[#14AEE1] shrink-0" />
            <span className="truncate">Tablero</span>
          </button>

          <button
            onClick={() => setActiveTab('clientes')}
            className={`w-full flex items-center gap-1.5 px-1.5 py-1.5 rounded-md text-[9px] font-extrabold transition-all text-left cursor-pointer ${
              activeTab === 'clientes'
                ? 'bg-[#E71E65]/10 text-[#BE185D] shadow-2xs border-l-2 border-[#E71E65]'
                : 'text-[#64748B] hover:bg-[#F4F7F9] hover:text-[#1E293B]'
            }`}
          >
            <Building className="w-3 h-3 text-[#E71E65] shrink-0" />
            <span className="truncate">Clientes</span>
          </button>

          <button
            onClick={() => setActiveTab('equipo')}
            className={`w-full flex items-center gap-1.5 px-1.5 py-1.5 rounded-md text-[9px] font-extrabold transition-all text-left cursor-pointer ${
              activeTab === 'equipo'
                ? 'bg-[#F3E72E]/20 text-[#854D0E] shadow-2xs border-l-2 border-[#F3E72E]'
                : 'text-[#64748B] hover:bg-[#F4F7F9] hover:text-[#1E293B]'
            }`}
          >
            <Users className="w-3 h-3 text-[#EAB308] shrink-0" />
            <span className="truncate">Equipo</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-1 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between text-[7.5px] text-slate-500 font-bold px-1">
            <span className="flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Online</span>
            </span>
            <span className="font-['JetBrains_Mono',monospace] font-bold">v2.4</span>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA (Topbar + Dynamic Views)                            */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F4F7F9]">
        
        {/* Topbar */}
        <header className="bg-white px-2 py-1 border-b border-[#E2E8F0] flex items-center justify-between shadow-2xs shrink-0">
          <div className="flex items-center gap-1.5 truncate">
            <h2 className="font-extrabold text-[11px] text-[#0F172A] tracking-tight truncate font-['Plus_Jakarta_Sans',sans-serif]">
              Centro de Control
            </h2>
            <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-sky-100/80 text-sky-800 text-[7px] font-extrabold uppercase font-['JetBrains_Mono',monospace] tracking-wider">
              Live Dispatch
            </span>
          </div>

          <button
            onClick={handleSyncData}
            disabled={isSyncing}
            className="bg-[#F3E72E] hover:brightness-95 active:scale-95 text-[#1E293B] px-2 py-0.5 rounded font-extrabold text-[8px] flex items-center gap-1 transition-all shadow-2xs cursor-pointer shrink-0 font-['Plus_Jakarta_Sans',sans-serif]"
          >
            <RefreshCw className={`w-2.5 h-2.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Sync...' : 'Sincronizar'}</span>
          </button>
        </header>

        {/* Page Content View */}
        <div className="flex-1 overflow-y-auto p-1.5 space-y-1.5">
          
          {/* ===================================================================== */}
          {/* TAB 1: TABLERO GENERAL (TRABAJOS)                                     */}
          {/* ===================================================================== */}
          {activeTab === 'trabajos' && (
            <div className="space-y-1.5">
              
              {/* Mini Stats Banner */}
              <div className="grid grid-cols-3 gap-1">
                <div className="bg-white p-1 rounded-md border border-[#E2E8F0] shadow-2xs text-center">
                  <div className="text-[6.5px] font-bold text-slate-400 uppercase">Órdenes</div>
                  <div className="text-[9px] font-black text-[#14AEE1]">{tickets.length} Activas</div>
                </div>
                <div className="bg-white p-1 rounded-md border border-[#E2E8F0] shadow-2xs text-center">
                  <div className="text-[6.5px] font-bold text-slate-400 uppercase">Revisión</div>
                  <div className="text-[9px] font-black text-orange-500">
                    {tickets.filter(t => t.estado === 'revision_cliente').length} Pendientes
                  </div>
                </div>
                <div className="bg-white p-1 rounded-md border border-[#E2E8F0] shadow-2xs text-center">
                  <div className="text-[6.5px] font-bold text-slate-400 uppercase">SLA Global</div>
                  <div className="text-[9px] font-black text-emerald-600">99.8%</div>
                </div>
              </div>

              {/* Main Card with Cyan top border */}
              <div className="bg-white rounded-lg p-1.5 shadow-2xs border border-[#E2E8F0] space-y-1" style={{ borderTop: '2.5px solid #14AEE1' }}>
                
                {/* Header & Filter Controls */}
                <div className="flex items-center justify-between gap-1 border-b border-[#F1F5F9] pb-1">
                  <div className="flex items-center gap-1 font-black text-[9px] text-[#1E293B]">
                    <ClipboardList className="w-2.5 h-2.5 text-[#14AEE1]" />
                    <span>Operaciones en Curso</span>
                  </div>

                  <select
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                    className="bg-[#F4F7F9] border border-[#E2E8F0] text-[#1E293B] font-extrabold text-[7px] rounded px-1 py-0.2 focus:outline-none focus:border-[#14AEE1]"
                  >
                    <option value="todos">Todos ({tickets.length})</option>
                    <option value="solicitado">🔴 Solicitadas</option>
                    <option value="asignado">🟡 Asignadas</option>
                    <option value="revision_cliente">🟠 En Revisión</option>
                    <option value="trabajo_aprobado">🟢 Aprobadas</option>
                    <option value="completado">✅ Terminadas</option>
                  </select>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-2.5 h-2.5 text-[#64748B] absolute left-1.5 top-1" />
                  <input
                    type="text"
                    placeholder="Buscar cliente o servicio..."
                    value={searchTrabajos}
                    onChange={(e) => setSearchTrabajos(e.target.value)}
                    className="w-full bg-[#F4F7F9] border border-[#E2E8F0] rounded py-0.5 pl-5 pr-2 text-[7.5px] text-[#1E293B] focus:bg-white focus:outline-none focus:border-[#14AEE1] font-medium"
                  />
                </div>

                {/* HIGH-DENSITY BALANCED JOB ROWS (Clear spacing & instant actions) */}
                <div className="space-y-1 pt-0.5">
                  {filteredTrabajos.map(t => {
                    const isSolicitado = t.estado === 'solicitado';
                    const isRevision = t.estado === 'revision_cliente';
                    const isAprobado = t.estado === 'trabajo_aprobado';
                    const isCierre = t.estado === 'esperando_cierre';
                    const isCompletado = t.estado === 'completado';

                    return (
                      <div 
                        key={t.id}
                        className="p-1.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-slate-50 transition-colors space-y-1"
                      >
                        {/* Row 1: Status badge + ID + Category */}
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1 truncate">
                            <span 
                              className="px-1 py-0.2 rounded-xs font-black text-[6.5px] uppercase tracking-wide"
                              style={{
                                backgroundColor: isSolicitado ? '#64748B1A' : 
                                                 isRevision ? '#F973161A' : 
                                                 isCierre ? '#0D94881A' : 
                                                 isCompletado ? '#22C55E1A' : '#14AEE11A',
                                color: isSolicitado ? '#64748B' : 
                                       isRevision ? '#EA580C' : 
                                       isCierre ? '#0D9488' : 
                                       isCompletado ? '#16A34A' : '#0284C7'
                              }}
                            >
                              {t.estado.replace('_', ' ')}
                            </span>
                            <span className="font-mono text-[7px] text-slate-400 font-bold">{t.id}</span>
                          </div>

                          <span className="font-extrabold text-[7.5px] text-[#14AEE1] truncate max-w-20">
                            {t.categoria}
                          </span>
                        </div>

                        {/* Row 2: Client name + Technician Info */}
                        <div className="flex items-center justify-between gap-1 text-[8px]">
                          <div className="font-extrabold text-[#1E293B] truncate max-w-25">
                            {t.clienteNombre}
                          </div>

                          <div className="flex items-center gap-1 text-slate-500 font-medium shrink-0">
                            <HardHat className={`w-2.5 h-2.5 ${t.operarioNombre ? 'text-amber-500' : 'text-slate-300'}`} />
                            <span className={t.operarioNombre ? 'font-bold text-slate-800' : 'text-slate-400'}>
                              {t.operarioNombre ? t.operarioNombre.split(' ')[0] : 'Sin asignar'}
                            </span>
                          </div>
                        </div>

                        {/* Row 3: Action Buttons & Detail Eye */}
                        <div className="flex items-center justify-between pt-0.5 border-t border-[#E2E8F0]/70">
                          <button
                            onClick={() => setSelectedJobDetail(t)}
                            className="text-[7px] font-bold text-slate-500 hover:text-[#14AEE1] flex items-center gap-0.5 cursor-pointer"
                          >
                            <Eye className="w-2.5 h-2.5" />
                            <span>Ver Expediente</span>
                          </button>

                          <div className="flex items-center gap-1">
                            {isSolicitado && (
                              <button
                                onClick={() => setAssigningJobId(t.id)}
                                className="bg-[#14AEE1] hover:brightness-105 active:scale-95 text-white font-black text-[7px] px-2 py-0.5 rounded cursor-pointer shadow-2xs"
                              >
                                Asignar Técnico
                              </button>
                            )}

                            {isRevision && (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => rechazarReporte(t.id)}
                                  className="bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-black text-[6.5px] px-1.5 py-0.5 rounded cursor-pointer"
                                >
                                  Rechazar
                                </button>
                                <button
                                  onClick={() => aprobarReporte(t.id)}
                                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-[6.5px] px-1.5 py-0.5 rounded cursor-pointer shadow-2xs"
                                >
                                  Aprobar Reporte
                                </button>
                              </div>
                            )}

                            {isCierre && (
                              <button
                                onClick={() => marcarCompletado(t.id)}
                                className="bg-[#0D9488] hover:bg-teal-700 active:scale-95 text-white font-black text-[7px] px-1.5 py-0.5 rounded flex items-center gap-0.5 cursor-pointer shadow-2xs"
                              >
                                <CheckCheck className="w-2.5 h-2.5" />
                                <span>Cerrar & Facturar</span>
                              </button>
                            )}

                            {isCompletado && (
                              <span className="text-amber-500 font-bold text-[7.5px]">
                                ⭐⭐⭐⭐⭐ 5.0
                              </span>
                            )}

                            {!isSolicitado && !isRevision && !isCierre && !isCompletado && (
                              <span className="text-slate-400 font-bold text-[7px] flex items-center gap-0.5">
                                <Lock className="w-2 h-2" />
                                <span>En curso</span>
                              </span>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 2: DIRECTORIO CLIENTES                                            */}
          {/* ===================================================================== */}
          {activeTab === 'clientes' && (
            <div className="bg-white rounded-lg p-1.5 shadow-2xs border border-[#E2E8F0] space-y-1" style={{ borderTop: '2.5px solid #E71E65' }}>
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-1">
                <div className="flex items-center gap-1 font-black text-[9px] text-[#1E293B]">
                  <Building className="w-2.5 h-2.5 text-[#E71E65]" />
                  <span>Base de Datos Clientes</span>
                </div>
                <span className="text-[7px] text-slate-400 font-bold">{clients.length} Registrados</span>
              </div>

              <div className="space-y-1">
                {clients.map(c => (
                  <div key={c.id} className="p-1.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-[7.5px]">
                    <div>
                      <div className="font-extrabold text-[#1E293B] text-[8px]">{c.nombre}</div>
                      <div className="text-slate-400 font-medium">{c.contacto}</div>
                    </div>
                    <div className="text-right">
                      <span className="bg-[#E71E65]/10 text-[#E71E65] font-black px-1 py-0.2 rounded text-[7px]">
                        {c.totalServicios} tickets
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 3: FUERZA OPERATIVA                                               */}
          {/* ===================================================================== */}
          {activeTab === 'equipo' && (
            <div className="bg-white rounded-lg p-1.5 shadow-2xs border border-[#E2E8F0] space-y-1" style={{ borderTop: '2.5px solid #F3E72E' }}>
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-1">
                <div className="flex items-center gap-1 font-black text-[9px] text-[#1E293B]">
                  <Users className="w-2.5 h-2.5 text-[#EAB308]" />
                  <span>Plantilla Operativa</span>
                </div>
                <span className="text-[7px] text-emerald-600 font-bold">● 100% Activo</span>
              </div>

              <div className="space-y-1">
                {equipo.map(o => (
                  <div key={o.id} className="p-1.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-[7.5px]">
                    <div>
                      <div className="font-extrabold text-[#1E293B] text-[8px]">{o.nombre}</div>
                      <div className="text-slate-400 font-medium">{o.rol}</div>
                    </div>
                    <div className="text-right space-y-0.5">
                      <div className="text-amber-500 font-bold text-[7px]">⭐⭐⭐⭐⭐ {o.calificacion}</div>
                      <span className="bg-emerald-50 text-emerald-600 font-black px-1 py-0.2 rounded text-[6.5px]">
                        CERTIFICADO
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. MODAL: DETALLES DEL REQUERIMIENTO (modal-detalle-trabajo in web-admin) */}
      {/* ========================================================================= */}
      {selectedJobDetail && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-2 animate-in fade-in duration-150">
          <div className="bg-white rounded-xl max-w-xs w-full max-h-[92%] overflow-y-auto p-2.5 shadow-2xl border border-[#E2E8F0] space-y-1.5 text-[8px]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-1">
              <div className="space-y-0.5 truncate">
                <span className="text-[6.5px] font-black text-[#14AEE1] tracking-wider uppercase font-mono block">
                  {selectedJobDetail.id} // EXPEDIENTE TÉCNICO
                </span>
                <h3 className="font-black text-[9.5px] text-[#1E293B] truncate">
                  {selectedJobDetail.clienteNombre}
                </h3>
              </div>
              <button
                onClick={() => setSelectedJobDetail(null)}
                className="p-0.5 text-slate-400 hover:text-slate-800 rounded shrink-0 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Info Grid */}
            <div className="space-y-1 text-[7.5px]">
              <div className="p-1 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-[6px] font-bold text-[#64748B] block">Categoría & Técnico</span>
                <span className="font-extrabold text-[#14AEE1]">{selectedJobDetail.categoria}</span> · <span className="font-bold text-slate-700">{selectedJobDetail.operarioNombre || 'Sin asignar'}</span>
              </div>
              <div className="p-1 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-[6px] font-bold text-[#64748B] block">Descripción</span>
                <p className="text-slate-600 leading-tight font-medium mt-0.5">{selectedJobDetail.descripcion}</p>
              </div>
            </div>

            {/* Technical Report if Available */}
            {selectedJobDetail.reporteTecnico && (
              <div className="p-1.5 rounded-lg bg-indigo-50/70 border border-indigo-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-[8px] text-indigo-900 flex items-center gap-1">
                    <FileText className="w-2.5 h-2.5 text-indigo-600" />
                    <span>Reporte Técnico Emitido</span>
                  </span>
                  <span className="text-[6.5px] text-indigo-600 font-bold font-mono">
                    Céd: {selectedJobDetail.reporteTecnico.encargadoCedula}
                  </span>
                </div>

                {selectedJobDetail.reporteTecnico.trabajosReportados.map((rep, i) => (
                  <div key={i} className="text-[7px] space-y-0.5 bg-white p-1 rounded border border-indigo-100">
                    <div><strong>Diagnóstico:</strong> <span className="text-slate-600">{rep.diagnostico}</span></div>
                    <div><strong>Solución:</strong> <span className="text-slate-600">{rep.solucion}</span></div>
                  </div>
                ))}

                <div className="flex items-center justify-between text-[7px] font-bold text-indigo-950 pt-0.5 border-t border-indigo-100">
                  <span>Empresa: ${selectedJobDetail.reporteTecnico.costoEmpresa}</span>
                  <span>Técnico: ${selectedJobDetail.reporteTecnico.costoTecnico}</span>
                </div>

                {selectedJobDetail.estado === 'revision_cliente' && (
                  <div className="flex gap-1 pt-0.5">
                    <button
                      onClick={() => rechazarReporte(selectedJobDetail.id)}
                      className="flex-1 py-1 bg-rose-500 hover:bg-rose-600 text-white font-black text-[7px] rounded cursor-pointer"
                    >
                      Rechazar
                    </button>
                    <button
                      onClick={() => aprobarReporte(selectedJobDetail.id)}
                      className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[7px] rounded cursor-pointer"
                    >
                      Aprobar
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Waiting for administrative close */}
            {selectedJobDetail.estado === 'esperando_cierre' && (
              <button
                onClick={() => marcarCompletado(selectedJobDetail.id)}
                className="w-full py-1 bg-[#0D9488] hover:bg-teal-700 text-white font-black text-[7.5px] rounded-md flex items-center justify-center gap-1 shadow-md cursor-pointer"
              >
                <CheckCheck className="w-2.5 h-2.5" />
                <span>CERRAR Y FACTURAR</span>
              </button>
            )}

            <button
              onClick={() => setSelectedJobDetail(null)}
              className="w-full py-1 bg-slate-100 text-slate-700 font-extrabold text-[7px] rounded hover:bg-slate-200 cursor-pointer"
            >
              Cerrar Expediente
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MODAL: ASIGNAR TÉCNICO (modal-asignar in web-admin)                    */}
      {/* ========================================================================= */}
      {assigningJobId && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-2 animate-in fade-in duration-150">
          <div className="bg-white rounded-xl max-w-47.5 w-full p-2.5 shadow-2xl border border-[#E2E8F0] space-y-1.5 text-center text-[8px]">
            <div className="w-5 h-5 rounded-full bg-[#14AEE1]/10 text-[#14AEE1] flex items-center justify-center mx-auto">
              <UserPlus className="w-2.5 h-2.5" />
            </div>

            <div>
              <h3 className="font-black text-[9px] text-[#1E293B]">Asignar Técnico</h3>
              <p className="text-[7px] text-slate-500 font-medium">Seleccione el responsable de la orden</p>
            </div>

            <div className="space-y-1 text-left">
              {equipo.map(tech => (
                <button
                  key={tech.id}
                  onClick={() => asignarTecnico(assigningJobId, tech.nombre, tech.id)}
                  className="w-full p-1 rounded-md border border-[#E2E8F0] hover:border-[#14AEE1] hover:bg-[#14AEE1]/5 flex items-center justify-between transition-all cursor-pointer text-[7.5px]"
                >
                  <div className="font-bold text-[#1E293B]">{tech.nombre}</div>
                  <span className="text-[6px] bg-emerald-50 text-emerald-600 font-black px-1 py-0.2 rounded">
                    Disponible
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setAssigningJobId(null)}
              className="w-full py-0.5 text-[7px] font-bold text-slate-500 hover:text-slate-800"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
