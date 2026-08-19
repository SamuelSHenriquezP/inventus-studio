// src/components/apps/OtekPowerApp.jsx
import { useState, useId } from 'react';
import { 
  RotateCcw, Save, ChevronLeft, CheckCircle2, 
  Layers, Shield, Gauge, Settings, Send, 
  Database, Mail, BarChart3, Lock, AlertTriangle, Sparkles
} from 'lucide-react';
import { sounds } from '../../utils/soundEngine';

export default function OtekPowerApp() {
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'flow' | 'powerbi' | 'rbac'
  
  // Form State
  const [lote, setLote] = useState('LT-2026-084');
  const [muestra, setMuestra] = useState('M-03');
  const [isManual, setIsManual] = useState(true);
  const [dn, setDn] = useState('1200');
  const [pn, setPn] = useState('10');
  const [sn, setSn] = useState('5000');
  const [tecnologia, setTecnologia] = useState('Filament Winding');
  const [peso, setPeso] = useState('142.50');
  const [ancho, setAncho] = useState('300.00');

  // Dimensional Measurements
  const [od, setOd] = useState('1224.8');
  const [espesor, setEspesor] = useState('18.6');
  const [idDiam, setIdDiam] = useState('1187.6');

  // Mechanical Test
  const [fuerza, setFuerza] = useState('4850');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Specifications based on DN/PN/SN
  const specMinOD = (Number(dn) * 1.016).toFixed(1);
  const specMaxOD = (Number(dn) * 1.024).toFixed(1);
  const specMinEspesor = (Number(pn) * 1.8).toFixed(1);
  const specMaxEspesor = (Number(pn) * 2.1).toFixed(1);

  const isOdValid = Number(od) >= Number(specMinOD) && Number(od) <= Number(specMaxOD);
  const isEspesorValid = Number(espesor) >= Number(specMinEspesor) && Number(espesor) <= Number(specMaxEspesor);

  const calculatedStiss = Math.round((Number(fuerza) * 1.056) / (Number(ancho) / 1000));

  const handleSaveAndAutomate = () => {
    sounds.playClick();
    setIsSubmitted(true);
    setShowToast(true);
    sounds.playSuccess();
    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  const handleReset = () => {
    sounds.playClick();
    setLote('LT-2026-084');
    setMuestra('M-03');
    setDn('1200');
    setPn('10');
    setSn('5000');
    setTecnologia('Filament Winding');
    setOd('1224.8');
    setEspesor('18.6');
    setIdDiam('1187.6');
    setFuerza('4850');
    setIsSubmitted(false);
  };

  return (
    <div className="w-full h-full bg-[#0d1424] text-slate-100 font-sans flex flex-col justify-between overflow-hidden select-none text-[11px]">
      
      {/* ========================================================================= */}
      {/* 1. TOP POWER APPS INDUSTRIAL HEADER */}
      {/* ========================================================================= */}
      <div className="px-3 sm:px-4 py-2 bg-gradient-to-r from-[#0c1e3d] via-[#10274e] to-[#0c1e3d] border-b border-sky-500/30 flex items-center justify-between shrink-0 shadow-md">
        
        {/* Left: Industrial Dept Badge (No Logo, strictly as instructed) */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 font-bold font-mono text-[10px]">
            Q&A
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold tracking-wider text-sky-400 leading-none">
              O-TEK // CALIDAD & LAMINADO
            </div>
            <div className="text-[9px] text-slate-400 font-sans leading-none mt-0.5">
              Power Apps Industrial Edition
            </div>
          </div>
        </div>

        {/* Center: Title */}
        <div className="text-xs sm:text-sm font-display font-extrabold text-white tracking-wide uppercase flex items-center gap-1.5">
          <span>Control Laminado Tubería</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          <button 
            onClick={handleReset}
            title="Restablecer Formulario"
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 transition-all active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={handleSaveAndAutomate}
            title="Guardar en SharePoint & Enviar Power Automate"
            className="px-2.5 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer text-[10.5px]"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Guardar</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SUB-NAVIGATION TABS (Explore Capabilities) */}
      {/* ========================================================================= */}
      <div className="px-3 py-1 bg-[#090f1d] border-b border-white/10 flex items-center justify-between text-[10px] font-mono shrink-0">
        <div className="flex items-center gap-1">
          <button 
            onClick={() => { sounds.playClick(); setActiveTab('form'); }}
            className={`px-2.5 py-0.5 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'form' 
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Formulario Tablet</span>
          </button>

          <button 
            onClick={() => { sounds.playClick(); setActiveTab('flow'); }}
            className={`px-2.5 py-0.5 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'flow' 
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-3 h-3 text-amber-400" />
            <span>Power Automate HTML</span>
          </button>

          <button 
            onClick={() => { sounds.playClick(); setActiveTab('powerbi'); }}
            className={`px-2.5 py-0.5 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'powerbi' 
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-3 h-3 text-emerald-400" />
            <span>Power BI KPIs</span>
          </button>

          <button 
            onClick={() => { sounds.playClick(); setActiveTab('rbac'); }}
            className={`px-2.5 py-0.5 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'rbac' 
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3 h-3 text-violet-400" />
            <span>Seguridad RBAC</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-[9.5px] text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SharePoint DB Conectado</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN BODY TAB VIEWS */}
      {/* ========================================================================= */}
      <div className="flex-1 p-2.5 sm:p-3.5 overflow-y-auto space-y-2.5">
        
        {/* --- VIEW 1: THE RECREATED INDUSTRIAL FORM --- */}
        {activeTab === 'form' && (
          <div className="space-y-2.5">
            
            {/* Top Parameters Container */}
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-sky-500/20 space-y-2">
              
              {/* Row 1: Lote, Muestra & Manual Badge */}
              <div className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-4 sm:col-span-3 flex items-center gap-1.5">
                  <span className="font-mono text-[9px] font-bold text-sky-400">LOTE#:</span>
                  <input 
                    type="text" 
                    value={lote}
                    onChange={(e) => setLote(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-black/50 border border-sky-500/30 text-white font-mono text-[10px] focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="col-span-4 sm:col-span-3 flex items-center gap-1.5">
                  <span className="font-mono text-[9px] font-bold text-sky-400">MUESTRA#:</span>
                  <input 
                    type="text" 
                    value={muestra}
                    onChange={(e) => setMuestra(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-black/50 border border-sky-500/30 text-white font-mono text-[10px] focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="col-span-4 sm:col-span-6 flex justify-end">
                  <button 
                    onClick={() => setIsManual(!isManual)}
                    className={`px-3 py-0.5 rounded-md font-mono text-[9.5px] font-bold transition-all ${
                      isManual ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isManual ? 'Modo Manual' : 'Modo Automático'}
                  </button>
                </div>
              </div>

              {/* Row 2: Visual Icon Parameter Selector Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-white/5">
                
                {/* DN (mm) Card */}
                <div className="p-2 rounded-lg bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-400">DN (mm)</span>
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <select 
                    value={dn}
                    onChange={(e) => { sounds.playClick(); setDn(e.target.value); }}
                    className="w-full bg-slate-900 border border-sky-500/30 rounded px-1.5 py-0.5 text-[10px] font-bold text-sky-300 focus:outline-none"
                  >
                    <option value="1000">1000 mm</option>
                    <option value="1200">1200 mm</option>
                    <option value="1400">1400 mm</option>
                    <option value="1600">1600 mm</option>
                    <option value="2000">2000 mm</option>
                  </select>
                </div>

                {/* PN (Bar) Card */}
                <div className="p-2 rounded-lg bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-400">PN (Bar)</span>
                    <Gauge className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <select 
                    value={pn}
                    onChange={(e) => { sounds.playClick(); setPn(e.target.value); }}
                    className="w-full bg-slate-900 border border-sky-500/30 rounded px-1.5 py-0.5 text-[10px] font-bold text-amber-300 focus:outline-none"
                  >
                    <option value="6">6 Bar</option>
                    <option value="10">10 Bar</option>
                    <option value="16">16 Bar</option>
                    <option value="20">20 Bar</option>
                  </select>
                </div>

                {/* SN (N/m2) Card */}
                <div className="p-2 rounded-lg bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-400">SN (N/m²)</span>
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <select 
                    value={sn}
                    onChange={(e) => { sounds.playClick(); setSn(e.target.value); }}
                    className="w-full bg-slate-900 border border-sky-500/30 rounded px-1.5 py-0.5 text-[10px] font-bold text-emerald-300 focus:outline-none"
                  >
                    <option value="2500">2500 N/m²</option>
                    <option value="5000">5000 N/m²</option>
                    <option value="10000">10000 N/m²</option>
                  </select>
                </div>

                {/* Tecnologia Card */}
                <div className="p-2 rounded-lg bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-400">Tecnología</span>
                    <Settings className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <select 
                    value={tecnologia}
                    onChange={(e) => { sounds.playClick(); setTecnologia(e.target.value); }}
                    className="w-full bg-slate-900 border border-sky-500/30 rounded px-1.5 py-0.5 text-[10px] font-bold text-purple-300 focus:outline-none truncate"
                  >
                    <option value="Filament Winding">Filament Winding</option>
                    <option value="Centrifugal Casting">Centrifugal Casting</option>
                  </select>
                </div>

              </div>

              {/* Row 3: Concatenated Specs & Secondary Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-1 border-t border-white/5 font-mono text-[9.5px]">
                <div className="sm:col-span-3 flex items-center gap-1.5">
                  <span className="text-slate-400">Peso (Kg):</span>
                  <input 
                    type="text" 
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    className="w-20 px-1.5 py-0.5 rounded bg-black/50 border border-white/10 text-white text-[10px]"
                  />
                </div>
                <div className="sm:col-span-3 flex items-center gap-1.5">
                  <span className="text-slate-400">Ancho (mm):</span>
                  <input 
                    type="text" 
                    value={ancho}
                    onChange={(e) => setAncho(e.target.value)}
                    className="w-20 px-1.5 py-0.5 rounded bg-black/50 border border-white/10 text-white text-[10px]"
                  />
                </div>
                <div className="sm:col-span-6 flex items-center justify-end gap-1.5 text-sky-300 font-bold">
                  <span className="text-slate-500 font-normal">Cadena Concatenada:</span>
                  <span className="px-2 py-0.5 rounded bg-sky-950/80 border border-sky-500/30">
                    DN{dn}-PN{pn}-SN{sn}-{tecnologia === 'Filament Winding' ? 'FW' : 'CC'}
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom 2-Table Grid: Dimensional & Mechanical Norms */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
              
              {/* Table 1: ANÁLISIS DIMENSIONAL */}
              <div className="lg:col-span-6 rounded-xl bg-slate-900/80 border border-sky-500/20 overflow-hidden">
                <div className="px-3 py-1.5 bg-[#0f244a] border-b border-sky-500/30 flex items-center justify-between">
                  <span className="font-bold text-[10px] text-sky-200 uppercase tracking-wider">
                    ANÁLISIS DIMENSIONAL
                  </span>
                  <span className="font-mono text-[9px] text-sky-400">TOLERANCIAS ASTM D3517</span>
                </div>

                <div className="p-2 space-y-1.5 text-[10px]">
                  <table className="w-full text-left font-mono">
                    <thead>
                      <tr className="text-slate-400 text-[9px] border-b border-white/10">
                        <th className="pb-1 font-normal">Parámetro</th>
                        <th className="pb-1 font-normal text-center">Resultado</th>
                        <th className="pb-1 font-normal text-center">Mín (Diseño)</th>
                        <th className="pb-1 font-normal text-center">Máx (Nom)</th>
                        <th className="pb-1 font-normal text-right">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr>
                        <td className="py-1 text-slate-200">Diám. Ext O.D. (mm)</td>
                        <td className="py-1 text-center">
                          <input 
                            type="text" 
                            value={od}
                            onChange={(e) => setOd(e.target.value)}
                            className="w-14 px-1 py-0.5 rounded bg-black/60 border border-sky-500/40 text-center text-white font-bold"
                          />
                        </td>
                        <td className="py-1 text-center text-slate-400">{specMinOD}</td>
                        <td className="py-1 text-center text-slate-400">{specMaxOD}</td>
                        <td className="py-1 text-right">
                          <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold ${
                            isOdValid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {isOdValid ? '✓ CONFORME' : '⚠ ALERTA'}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td className="py-1 text-slate-200">Espesor (mm)</td>
                        <td className="py-1 text-center">
                          <input 
                            type="text" 
                            value={espesor}
                            onChange={(e) => setEspesor(e.target.value)}
                            className="w-14 px-1 py-0.5 rounded bg-black/60 border border-sky-500/40 text-center text-white font-bold"
                          />
                        </td>
                        <td className="py-1 text-center text-slate-400">{specMinEspesor}</td>
                        <td className="py-1 text-center text-slate-400">{specMaxEspesor}</td>
                        <td className="py-1 text-right">
                          <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold ${
                            isEspesorValid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {isEspesorValid ? '✓ CONFORME' : '⚠ ALERTA'}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td className="py-1 text-slate-200">Diám. Interno I.D. (mm)</td>
                        <td className="py-1 text-center">
                          <input 
                            type="text" 
                            value={idDiam}
                            onChange={(e) => setIdDiam(e.target.value)}
                            className="w-14 px-1 py-0.5 rounded bg-black/60 border border-white/20 text-center text-white"
                          />
                        </td>
                        <td className="py-1 text-center text-slate-400">1184.0</td>
                        <td className="py-1 text-center text-slate-400">1190.0</td>
                        <td className="py-1 text-right">
                          <span className="px-1.5 py-0.5 rounded text-[8.5px] font-bold bg-emerald-500/20 text-emerald-300">
                            ✓ CONFORME
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table 2: RIGIDEZ & NORMAS ASTM / ISO */}
              <div className="lg:col-span-6 rounded-xl bg-slate-900/80 border border-sky-500/20 overflow-hidden">
                <div className="px-3 py-1.5 bg-[#0f244a] border-b border-sky-500/30 flex items-center justify-between">
                  <span className="font-bold text-[10px] text-sky-200 uppercase tracking-wider">
                    NORMAS ASTM D2412 & ISO 7685
                  </span>
                  <span className="font-mono text-[9px] text-emerald-400">RIGIDEZ STISS 5%</span>
                </div>

                <div className="p-2 space-y-1.5 text-[10px] font-mono">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-black/40 border border-white/5 space-y-1">
                      <div className="text-[9px] text-slate-400">Cálculo Rigidez ASTM 5%</div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Fuerza (N):</span>
                        <input 
                          type="text" 
                          value={fuerza}
                          onChange={(e) => setFuerza(e.target.value)}
                          className="w-16 px-1 py-0.5 rounded bg-black border border-white/20 text-right text-sky-300 font-bold"
                        />
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-white/10 text-emerald-300 font-bold">
                        <span>Stiss Calculada:</span>
                        <span>{calculatedStiss.toLocaleString()} N/m²</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-black/40 border border-white/5 space-y-1">
                      <div className="text-[9px] text-slate-400">Veredicto Calidad</div>
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs pt-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Lote Aprobado</span>
                      </div>
                      <div className="text-[8.5px] text-slate-400 leading-tight">
                        Cumple tolerancia nominal para despacho de ingeniería.
                      </div>
                    </div>
                  </div>

                  {/* Submission Action Bar */}
                  <div className="pt-1 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                      <Database className="w-3 h-3 text-sky-400" />
                      <span>Destino: Lista SharePoint "Calidad_Laminado"</span>
                    </div>
                    <button
                      onClick={handleSaveAndAutomate}
                      className="px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer text-[10px]"
                    >
                      <Send className="w-3 h-3" />
                      <span>Guardar & Disparar Power Automate</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* --- VIEW 2: POWER AUTOMATE HTML EMAIL WORKFLOW --- */}
        {activeTab === 'flow' && (
          <div className="p-3 rounded-xl bg-slate-900/90 border border-sky-500/20 space-y-3 font-mono text-[10px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <Mail className="w-4 h-4" />
                <span>PLANTILLA HTML POWER AUTOMATE // REPORTE EJECUTIVO</span>
              </div>
              <span className="text-[9px] text-slate-400">Trigger: When_an_item_is_created (SharePoint)</span>
            </div>

            {/* Mock Corporate Email Preview */}
            <div className="p-3 rounded-lg bg-slate-950 border border-white/10 space-y-2 text-slate-200">
              <div className="flex items-center justify-between text-[9px] text-slate-400 border-b border-white/5 pb-1">
                <span>Para: <span className="text-slate-200">supervisores_planta@o-tek.com; calidad@o-tek.com</span></span>
                <span>Asunto: <span className="text-amber-300 font-bold">[CALIDAD APROBADA] Lote {lote} - {muestra}</span></span>
              </div>

              {/* Styled HTML Body Render */}
              <div className="p-3 rounded bg-[#0a1220] border border-sky-500/30 space-y-2">
                <div className="flex items-center justify-between border-b border-sky-500/20 pb-1.5">
                  <span className="font-bold text-white text-xs">O-TEK QUALITY ASSURANCE REPORT</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">ESTADO: CONFORME</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[9.5px]">
                  <div><span className="text-slate-400">Lote:</span> <span className="text-white font-bold">{lote}</span></div>
                  <div><span className="text-slate-400">Muestra:</span> <span className="text-white font-bold">{muestra}</span></div>
                  <div><span className="text-slate-400">Diámetro Nominal:</span> <span className="text-white font-bold">{dn} mm</span></div>
                  <div><span className="text-slate-400">Presión Nominal:</span> <span className="text-white font-bold">{pn} Bar</span></div>
                  <div><span className="text-slate-400">Espesor Medido:</span> <span className="text-emerald-400 font-bold">{espesor} mm (Norma {specMinEspesor}-{specMaxEspesor})</span></div>
                  <div><span className="text-slate-400">Rigidez Stiss:</span> <span className="text-emerald-400 font-bold">{calculatedStiss.toLocaleString()} N/m²</span></div>
                </div>
                <div className="pt-1.5 border-t border-sky-500/20 text-[8.5px] text-slate-400 flex items-center justify-between">
                  <span>Inspector: Samuel Henríquez (Q&A Dept)</span>
                  <span>Generado automáticamente vía Power Automate Flow</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW 3: POWER BI KPIS & ANALYTICS --- */}
        {activeTab === 'powerbi' && (
          <div className="p-3 rounded-xl bg-slate-900/90 border border-sky-500/20 space-y-3 font-mono text-[10px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                <BarChart3 className="w-4 h-4" />
                <span>EXTRACCIÓN DIRECTA SHAREPOINT → POWER BI DASHBOARD</span>
              </div>
              <span className="text-[9px] text-slate-400">0% Papel • Cero Retrasos de Transcripción</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-lg bg-black/50 border border-emerald-500/20 space-y-1">
                <div className="text-[9px] text-slate-400">Tasa de Conformidad</div>
                <div className="text-lg font-bold text-emerald-400 font-display">99.4%</div>
                <div className="text-[8.5px] text-slate-400">Ensayos ASTM en norma</div>
              </div>

              <div className="p-2.5 rounded-lg bg-black/50 border border-sky-500/20 space-y-1">
                <div className="text-[9px] text-slate-400">Ahorro Tiempo Muestreo</div>
                <div className="text-lg font-bold text-sky-400 font-display">-65%</div>
                <div className="text-[8.5px] text-slate-400">vs. Registro en papel y Excel</div>
              </div>

              <div className="p-2.5 rounded-lg bg-black/50 border border-purple-500/20 space-y-1">
                <div className="text-[9px] text-slate-400">Muestras Procesadas</div>
                <div className="text-lg font-bold text-purple-400 font-display">1,420+</div>
                <div className="text-[8.5px] text-slate-400">Tuberías laminadas inspeccionadas</div>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW 4: RBAC SECURITY & GOVERNANCE --- */}
        {activeTab === 'rbac' && (
          <div className="p-3 rounded-xl bg-slate-900/90 border border-sky-500/20 space-y-3 font-mono text-[10px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-purple-300 font-bold">
                <Lock className="w-4 h-4" />
                <span>GOBERNANZA DE ACCESO & SEGURIDAD SHAREPOINT (RBAC)</span>
              </div>
              <span className="text-[9px] text-emerald-400">Protección de Datos Sensibles</span>
            </div>

            <div className="space-y-2 text-slate-300 text-[9.5px]">
              <div className="p-2 rounded bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Operarios & Laboratoristas</div>
                  <div className="text-[8.5px] text-slate-400">Permisos de creación de registros en Power Apps. Sin acceso de edición a tablas maestras.</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[8.5px] font-bold">Create Only</span>
              </div>

              <div className="p-2 rounded bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Supervisores & Jefes de Calidad</div>
                  <div className="text-[8.5px] text-slate-400">Recepción de reportes HTML en tiempo real, aprobación de lotes y visualización en Power BI.</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[8.5px] font-bold">Audit & Approve</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 4. SUCCESS TOAST ON SUBMIT */}
      {/* ========================================================================= */}
      {showToast && (
        <div className="mx-3 mb-2 p-2 rounded-lg bg-emerald-950/90 border border-emerald-400/50 flex items-center justify-between text-emerald-200 text-[10px] animate-bounce shadow-xl font-mono">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>✓ Guardado en SharePoint y correo HTML despachado vía Power Automate.</span>
          </div>
          <span className="text-[8.5px] text-emerald-400 font-bold">EXITOSO</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. FOOTER TELEMETRY STATUS */}
      {/* ========================================================================= */}
      <div className="px-3 py-1.5 bg-[#080d18] border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-slate-400 shrink-0">
        <div className="flex items-center gap-2">
          <span>MICROSOFT POWER PLATFORM</span>
          <span>•</span>
          <span className="text-sky-400">SHAREPOINT LISTS DB</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <span>Samuel Henríquez — Proyecto Corporativo O-tek</span>
        </div>
      </div>

    </div>
  );
}
