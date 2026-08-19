// src/components/OtekArchitectureModal.jsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  X, Workflow, Database, Mail, BarChart3, 
  ShieldCheck, CheckCircle2, Lock, FileCode,
  Layers, ArrowRight, Sparkles, Terminal
} from 'lucide-react';

export default function OtekArchitectureModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' | 'powerfx' | 'email' | 'impact'
  const backdropRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
      );
    });

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      ctx.revert();
    };
  }, [isOpen]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { opacity: 0, y: 20, scale: 0.96, duration: 0.25, ease: 'power2.in' }, 0);
    tl.to(backdropRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' }, 0);
  };

  if (!isOpen) return null;

  const PIPELINE_STEPS = [
    {
      num: "01",
      icon: Layers,
      title: "Captura Táctil en Tablet (Power Apps)",
      subtitle: "UI Ergonómica para Operarios de Planta",
      desc: "Formulario responsive adaptado a tablet industrial. Los laboratoristas ingresan número de lote, muestra, DN, PN, SN y lecturas de espesores con teclado numérico optimizado.",
      techBadge: "Power Apps Canvas / Tablet",
      color: "border-sky-500/40 text-sky-400 bg-sky-500/10"
    },
    {
      num: "02",
      icon: Database,
      title: "Validación & Almacenamiento (SharePoint Lists)",
      subtitle: "Base de Datos Relacional de Calidad",
      desc: "Consulta en vivo contra listas maestras de diseño de tuberías. Compara instantáneamente si los espesores cumplen con las tolerancias mínimas y nominales (ASTM / ISO).",
      techBadge: "SharePoint Lists Online",
      color: "border-teal-500/40 text-teal-400 bg-teal-500/10"
    },
    {
      num: "03",
      icon: Mail,
      title: "Orquestación Cloud & Email (Power Automate)",
      subtitle: "Despacho Automático de Reportes",
      desc: "Al pulsar 'Registrar & Enviar', se activa un Cloud Flow que compila la información en una plantilla HTML corporativa con tablas de conformidad y la envía a supervisores.",
      techBadge: "Power Automate Cloud Flow",
      color: "border-blue-500/40 text-blue-400 bg-blue-500/10"
    },
    {
      num: "04",
      icon: BarChart3,
      title: "Telemetría & Business Intelligence (Power BI)",
      subtitle: "Extracción ETL Sin Fricción de Excel",
      desc: "Sustitución de planillas manuales por datasets unificados en la nube. Permite a gerencia visualizar mermas, variabilidad de laminado y KPIs estadísticos en tiempo real.",
      techBadge: "Power BI Pro Dashboard",
      color: "border-amber-500/40 text-amber-400 bg-amber-500/10"
    },
    {
      num: "05",
      icon: ShieldCheck,
      title: "Gobernanza & Seguridad por Roles (RBAC)",
      subtitle: "Protección de Fórmulas Confidenciales",
      desc: "Estructura de permisos de SharePoint que restringe la modificación de tolerancias críticas únicamente a ingenieros de calidad senior, evitando accesos o alteraciones no autorizadas.",
      techBadge: "SharePoint Role-Based Access Control",
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
    }
  ];

  return (
    <div 
      data-modal="true"
      data-prevent-slide="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:py-12 overflow-y-auto modal-container"
    >
      {/* Backdrop */}
      <div 
        ref={backdropRef}
        onClick={handleClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer modal-backdrop" 
      />

      {/* Modal Card */}
      <div 
        ref={modalRef}
        data-prevent-slide="true"
        onWheel={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl lg:max-w-3xl max-h-[78vh] flex flex-col rounded-2xl bg-[#090e17] border border-sky-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden font-sans text-zinc-100 my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 sm:px-5 sm:py-3 border-b border-white/10 bg-[#0c1422]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <Workflow className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-sky-400 tracking-wider uppercase">
                  ARQUITECTURA & WORKFLOW INDUSTRIAL
                </span>
                <span className="px-1.5 py-0.2 rounded-full bg-sky-500/20 text-sky-300 text-[9.5px] font-mono border border-sky-500/30">
                  O-tek Calidad
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white truncate max-w-[280px] sm:max-w-md">
                Flujo Integral Power Platform (Apps + SharePoint + Automate + Power BI)
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[#070b13] border-b border-white/10 overflow-x-auto font-mono text-[11px]">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-2.5 py-1.2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'pipeline'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Workflow className="w-3 h-3" />
            <span>01. Pipeline E2E</span>
          </button>

          <button
            onClick={() => setActiveTab('powerfx')}
            className={`px-2.5 py-1.2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'powerfx'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileCode className="w-3 h-3" />
            <span>02. Lógica Power Fx</span>
          </button>

          <button
            onClick={() => setActiveTab('email')}
            className={`px-2.5 py-1.2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'email'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mail className="w-3 h-3" />
            <span>03. Plantilla HTML</span>
          </button>

          <button
            onClick={() => setActiveTab('impact')}
            className={`px-2.5 py-1.2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'impact'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>04. Impacto & ROI</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          
          {/* TAB 1: PIPELINE E2E */}
          {activeTab === 'pipeline' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-sky-500/5 border border-sky-500/20 text-[11.5px] text-zinc-300 leading-relaxed font-sans">
                <span className="font-semibold text-white">Transición Digital Completa:</span> Este flujo reemplazó cuadernos físicos de campo y planillas dispersas de Excel por un pipeline automatizado, garantizando trazabilidad total de tolerancias ASTM / ISO para la producción de tuberías en <span className="text-sky-400 font-medium">O-tek</span>.
              </div>

              <div className="grid grid-cols-1 gap-2.5 font-sans">
                {PIPELINE_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div 
                      key={step.num}
                      className="p-3 sm:p-3.5 rounded-xl bg-white/2 border border-white/10 hover:border-sky-500/30 transition-all flex flex-col sm:flex-row items-start gap-3 relative group"
                    >
                      <div className={`p-2 sm:p-2.5 rounded-lg border flex items-center justify-center shrink-0 ${step.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 space-y-0.5">
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-xs font-bold text-sky-400">{step.num} //</span>
                            <h4 className="text-xs sm:text-sm font-bold text-white">{step.title}</h4>
                          </div>
                          <span className="font-mono text-[9.5px] px-2 py-0.2 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                            {step.techBadge}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: POWER FX CODE */}
          {activeTab === 'powerfx' && (
            <div className="space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs text-zinc-400 pb-1 border-b border-white/10">
                <span className="flex items-center gap-2 text-sky-400 font-semibold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>ValidationAndSubmit.fx (Power Fx)</span>
                </span>
                <span className="text-[11px] text-zinc-500">Ejecución en Botón 'Enviar a SharePoint'</span>
              </div>

              <div className="p-4 rounded-xl bg-black/70 border border-white/10 text-[11px] sm:text-xs text-zinc-200 leading-relaxed overflow-x-auto">
                <pre className="font-mono text-sky-200">
{`// 1. Consulta atómica a especificaciones nominales en SharePoint
With(
    {
        currentSpec: LookUp(
            'Especificaciones Tuberias SharePoint',
            DN = Value(ddDN.Selected.Value) && 
            PN = Value(ddPN.Selected.Value) && 
            SN = Value(ddSN.Selected.Value)
        ),
        espesorVal: Value(txtEspesor.Text),
        diametroVal: Value(txtDiametroExt.Text),
        stiffVal: Value(txtStiffness.Text)
    },
    
    // 2. Validación de Tolerancias según Norma ASTM D3517 / ISO 7685
    If(
        espesorVal < currentSpec.EspesorMin || espesorVal > currentSpec.EspesorMax,
        Notify("⚠️ Alerta: Espesor fuera de tolerancia técnica", NotificationType.Warning),
        
        // 3. Patch a Base de Datos SharePoint (Registro Inmutable)
        Patch(
            'Control Calidad Laminado SharePoint',
            Defaults('Control Calidad Laminado SharePoint'),
            {
                Title: Concatenate(txtLote.Text, "-", ddMuestra.Selected.Value),
                FechaMuestreo: dpFecha.SelectedDate,
                DN_mm: Value(ddDN.Selected.Value),
                PN_Bar: Value(ddPN.Selected.Value),
                SN_Nm2: Value(ddSN.Selected.Value),
                EspesorMedido_mm: espesorVal,
                DiametroExtMedido_mm: diametroVal,
                RigidezStiffness_Nm2: stiffVal,
                EstadoNorma: "CONFORME",
                InspectorResponsable: User().FullName,
                CorreoInspector: User().Email,
                HoraRegistro: Now()
            }
        );
        
        // 4. Disparo de Flow en Power Automate para notificación ejecutiva en HTML
        'ReporteCalidad-Laminado-Flow'.Run(
            txtLote.Text, 
            ddMuestra.Selected.Value, 
            User().Email,
            Text(dpFecha.SelectedDate, "dd/mm/yyyy")
        );
        
        // 5. Feedback visual al operario
        Notify("✓ Ensayo registrado con éxito. Reporte HTML despachado a supervisión.", NotificationType.Success);
        ResetForm(frmControlCalidad)
    )
)`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: AUTOMATED HTML EMAIL */}
          {activeTab === 'email' && (
            <div className="space-y-3 font-sans">
              <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs text-zinc-300">
                <span className="font-semibold text-white">Plantilla HTML Generada por Power Automate:</span> Formato automático despachado a los supervisores de producción de O-tek inmediatamente después de cada prueba.
              </div>

              {/* Simulated Email Client */}
              <div className="rounded-xl bg-[#0e1626] border border-white/15 p-4 space-y-3 font-sans text-xs">
                <div className="border-b border-white/10 pb-2 space-y-1 font-mono text-[11px]">
                  <div className="text-zinc-400"><span className="text-zinc-500">De:</span> Power Automate Cloud Flow &lt;no-reply@o-tek.com&gt;</div>
                  <div className="text-zinc-400"><span className="text-zinc-500">Para:</span> Supervisor de Planta; Jefe de Aseguramiento Calidad</div>
                  <div className="text-zinc-400"><span className="text-zinc-500">Asunto:</span> <span className="text-sky-300 font-semibold">[REPORTE CALIDAD] Muestra Lote #2026-L402 — Ensayo de Laminado Conforme</span></div>
                </div>

                {/* Email Body Card */}
                <div className="p-4 rounded-lg bg-[#080d17] border border-sky-500/30 space-y-3">
                  <div className="flex items-center justify-between border-b border-sky-500/20 pb-2">
                    <span className="font-bold text-sky-400 text-sm">REPORTE TÉCNICO DE ENSAYO — CONTROL DE CALIDAD</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold">
                      ✓ APROBADO 100%
                    </span>
                  </div>

                  <p className="text-zinc-300">
                    Se ha completado satisfactoriamente el ensayo dimensional y de espesores para la muestra de tubería:
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                    <div className="p-2 rounded bg-white/3 border border-white/10">
                      <span className="text-zinc-500 block text-[9px]">LOTE & MUESTRA</span>
                      <span className="text-white font-bold">2026-L402 // M-01</span>
                    </div>
                    <div className="p-2 rounded bg-white/3 border border-white/10">
                      <span className="text-zinc-500 block text-[9px]">DN / PN / SN</span>
                      <span className="text-sky-300 font-bold">DN800 / PN10 / SN5000</span>
                    </div>
                    <div className="p-2 rounded bg-white/3 border border-white/10">
                      <span className="text-zinc-500 block text-[9px]">ESPESOR MEDIDO</span>
                      <span className="text-emerald-400 font-bold">14.65 mm (Tolerancia ✓)</span>
                    </div>
                    <div className="p-2 rounded bg-white/3 border border-white/10">
                      <span className="text-zinc-500 block text-[9px]">RIGIDEZ STIFFNESS</span>
                      <span className="text-white font-bold">5,120 N/m² (ASTM D3517)</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-zinc-400 font-mono pt-1">
                    Registrado por: Samuel Henríquez (Inspector de Calidad) • Almacenado en SharePoint Lists • Sincronizado con Power BI.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: IMPACT & ROI */}
          {activeTab === 'impact' && (
            <div className="space-y-4 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-sky-500/5 border border-sky-500/20 space-y-1">
                  <div className="text-2xl font-bold font-mono text-sky-400">-65% de Tiempo</div>
                  <div className="text-xs font-bold text-white">Reducción en Tiempo de Toma de Muestras</div>
                  <p className="text-[11px] text-zinc-300">
                    Al sustituir el registro manual en cuadernos de laboratorio por la UI en Tablet con prellenado automático de especificaciones nominales.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                  <div className="text-2xl font-bold font-mono text-emerald-400">0% Errores de Transcripción</div>
                  <div className="text-xs font-bold text-white">Validación Matemática en Vivo</div>
                  <p className="text-[11px] text-zinc-300">
                    Comparación inmediata de tolerancias de espesor y diámetro que previene el ingreso de valores fuera de los límites de diseño.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                  <div className="text-2xl font-bold font-mono text-amber-400">100% Sin Papel ni Excel</div>
                  <div className="text-xs font-bold text-white">Descarbonización & Cero Desfase</div>
                  <p className="text-[11px] text-zinc-300">
                    Eliminación completa de planillas impresas y archivos de Excel desincronizados, facilitando la extracción directa para Power BI.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 space-y-1">
                  <div className="text-2xl font-bold font-mono text-purple-400">Seguridad RBAC</div>
                  <div className="text-xs font-bold text-white">Protección de Datos Confidenciales</div>
                  <p className="text-[11px] text-zinc-300">
                    Gobernanza mediante listas de SharePoint con permisos granulares para salvaguardar fórmulas de resina y parámetros industriales.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 bg-[#0a0f19] flex items-center justify-between font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Power Platform Enterprise Architecture • O-tek Quality Assurance</span>
          </div>
          <button
            onClick={handleClose}
            className="px-4 py-1.5 rounded-full bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 font-semibold cursor-pointer transition-all active:scale-95"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
}
