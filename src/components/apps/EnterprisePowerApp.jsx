// src/components/apps/EnterprisePowerApp.jsx
import { useState } from 'react';
import { 
  RotateCcw, Save, CheckCircle2, 
  Layers, Shield, Gauge, Settings, Send, 
  Database, Mail, BarChart3, Lock
} from 'lucide-react';
import { sounds } from '../../utils/soundEngine';

export default function EnterprisePowerApp() {
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
  const [, setIsSubmitted] = useState(false);
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
      {/* 1. TOP POWER APPS CORPORATE HEADER */}
      {/* ========================================================================= */}
      <div className="px-2.5 py-1.5 bg-gradient-to-r from-[#0c1e3d] via-[#10274e] to-[#0c1e3d] border-b border-sky-500/30 flex items-center justify-between shrink-0 shadow-md">
        
        {/* Left: Department Badge & Title */}
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-5 h-5 rounded bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 font-bold font-['JetBrains_Mono',monospace] text-[8.5px] shrink-0">
            QA
          </div>
          <div className="min-w-0">
            <div className="text-[9px] font-['JetBrains_Mono',monospace] font-extrabold text-sky-400 leading-none truncate">
              ENTERPRISE // CONTROL CALIDAD INTEGRADO
            </div>
            <div className="text-[7.5px] text-slate-400 font-['Plus_Jakarta_Sans',sans-serif] leading-none mt-0.5 truncate">
              Módulo Tubería & Laminado
            </div>
          </div>
        </div>

        {/* Right: Actions & User Login Badge */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[8px]">
            <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
            <span className="whitespace-nowrap">M365 SSO • Operario</span>
          </div>

          <button 
            onClick={handleReset}
            title="Restablecer Formulario"
            className="w-5.5 h-5.5 rounded bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 transition-all active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-2.5 h-2.5" />
          </button>
          <button 
            onClick={handleSaveAndAutomate}
            title="Guardar en SharePoint & Enviar Power Automate"
            className="px-2 py-0.5 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold flex items-center gap-1 transition-all shadow-sm active:scale-95 cursor-pointer text-[9px] whitespace-nowrap"
          >
            <Save className="w-2.5 h-2.5" />
            <span>Guardar</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SUB-NAVIGATION TABS (Explore Capabilities) */}
      {/* ========================================================================= */}
      <div className="px-2 py-1 bg-[#090f1d] border-b border-white/10 flex items-center justify-between text-[8.5px] font-mono shrink-0">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => { sounds.playClick(); setActiveTab('form'); }}
            className={`px-1.5 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
              activeTab === 'form' 
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-2.5 h-2.5" />
            <span>Formulario</span>
          </button>

          <button 
            onClick={() => { sounds.playClick(); setActiveTab('flow'); }}
            className={`px-1.5 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
              activeTab === 'flow' 
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-2.5 h-2.5 text-amber-400" />
            <span>Power Automate</span>
          </button>

          <button 
            onClick={() => { sounds.playClick(); setActiveTab('powerbi'); }}
            className={`px-1.5 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
              activeTab === 'powerbi' 
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-2.5 h-2.5 text-emerald-400" />
            <span>Power BI</span>
          </button>

          <button 
            onClick={() => { sounds.playClick(); setActiveTab('rbac'); }}
            className={`px-1.5 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
              activeTab === 'rbac' 
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-2.5 h-2.5 text-violet-400" />
            <span>Login & RBAC</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[8px] text-emerald-400 shrink-0 ml-1 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SharePoint DB</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN BODY TAB VIEWS */}
      {/* ========================================================================= */}
      <div className="flex-1 p-2 overflow-y-auto space-y-2 custom-scroll overscroll-contain" data-prevent-slide="true">
        
        {/* --- VIEW 1: THE RECREATED CORPORATE FORM --- */}
        {activeTab === 'form' && (
          <div className="space-y-2">
            
            {/* Top Parameters Container */}
            <div className="p-2 rounded-xl bg-slate-900/80 border border-sky-500/20 space-y-1.5">
              
              {/* Row 1: Lote, Muestra & Manual Badge (Flex layout, no overlap) */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 font-mono text-[8.5px]">
                <div className="flex items-center gap-1 min-w-0">
                  <span className="font-bold text-sky-400 shrink-0">LOTE#:</span>
                  <input 
                    type="text" 
                    value={lote}
                    onChange={(e) => setLote(e.target.value)}
                    className="w-16 px-1 py-0.5 rounded bg-black/60 border border-sky-500/30 text-white font-mono text-[9px] focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="flex items-center gap-1 min-w-0">
                  <span className="font-bold text-sky-400 shrink-0">MUESTRA#:</span>
                  <input 
                    type="text" 
                    value={muestra}
                    onChange={(e) => setMuestra(e.target.value)}
                    className="w-16 px-1 py-0.5 rounded bg-black/60 border border-sky-500/30 text-white font-mono text-[9px] focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="flex justify-end shrink-0">
                  <button 
                    onClick={() => setIsManual(!isManual)}
                    className={`px-2 py-0.5 rounded font-mono text-[8.5px] font-bold transition-all whitespace-nowrap ${
                      isManual ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isManual ? 'Modo Manual' : 'Modo Automático'}
                  </button>
                </div>
              </div>

              {/* Row 2: Visual Icon Parameter Selector Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1 border-t border-white/5">
                
                {/* DN (mm) Card */}
                <div className="p-1.5 rounded-lg bg-black/40 border border-white/10 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono text-slate-400">DN (mm)</span>
                    <Layers className="w-2.5 h-2.5 text-sky-400 shrink-0" />
                  </div>
                  <select 
                    value={dn}
                    onChange={(e) => { sounds.playClick(); setDn(e.target.value); }}
                    className="w-full bg-slate-900 border border-sky-500/30 rounded px-1 py-0.5 text-[9px] font-bold text-sky-300 focus:outline-none truncate"
                  >
                    <option value="1000">1000 mm</option>
                    <option value="1200">1200 mm</option>
                    <option value="1400">1400 mm</option>
                    <option value="1600">1600 mm</option>
                    <option value="2000">2000 mm</option>
                  </select>
                </div>

                {/* PN (Bar) Card */}
                <div className="p-1.5 rounded-lg bg-black/40 border border-white/10 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono text-slate-400">PN (Bar)</span>
                    <Gauge className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                  </div>
                  <select 
                    value={pn}
                    onChange={(e) => { sounds.playClick(); setPn(e.target.value); }}
                    className="w-full bg-slate-900 border border-sky-500/30 rounded px-1 py-0.5 text-[9px] font-bold text-amber-300 focus:outline-none truncate"
                  >
                    <option value="6">6 Bar</option>
                    <option value="10">10 Bar</option>
                    <option value="16">16 Bar</option>
                    <option value="20">20 Bar</option>
                  </select>
                </div>

                {/* SN (N/m2) Card */}
                <div className="p-1.5 rounded-lg bg-black/40 border border-white/10 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono text-slate-400">SN (N/m²)</span>
                    <Shield className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                  </div>
                  <select 
                    value={sn}
                    onChange={(e) => { sounds.playClick(); setSn(e.target.value); }}
                    className="w-full bg-slate-900 border border-sky-500/30 rounded px-1 py-0.5 text-[9px] font-bold text-emerald-300 focus:outline-none truncate"
                  >
                    <option value="2500">2500 N/m²</option>
                    <option value="5000">5000 N/m²</option>
                    <option value="10000">10000 N/m²</option>
                  </select>
                </div>

                {/* Tecnologia Card */}
                <div className="p-1.5 rounded-lg bg-black/40 border border-white/10 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono text-slate-400">Tecnología</span>
                    <Settings className="w-2.5 h-2.5 text-purple-400 shrink-0" />
                  </div>
                  <select 
                    value={tecnologia}
                    onChange={(e) => { sounds.playClick(); setTecnologia(e.target.value); }}
                    className="w-full bg-slate-900 border border-sky-500/30 rounded px-1 py-0.5 text-[9px] font-bold text-purple-300 focus:outline-none truncate"
                  >
                    <option value="Filament Winding">Filament Winding</option>
                    <option value="Centrifugal Casting">Centrifugal Casting</option>
                  </select>
                </div>

              </div>

              {/* Row 3: Concatenated Specs & Secondary Inputs (Flex layout, no overlap) */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1 border-t border-white/5 font-mono text-[8.5px]">
                <div className="flex items-center gap-1 min-w-0">
                  <span className="text-slate-400 shrink-0">Peso(Kg):</span>
                  <input 
                    type="text" 
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    className="w-12 px-1 py-0.5 rounded bg-black/50 border border-white/10 text-white text-[8.5px] text-center"
                  />
                </div>
                <div className="flex items-center gap-1 min-w-0">
                  <span className="text-slate-400 shrink-0">Ancho(mm):</span>
                  <input 
                    type="text" 
                    value={ancho}
                    onChange={(e) => setAncho(e.target.value)}
                    className="w-12 px-1 py-0.5 rounded bg-black/50 border border-white/10 text-white text-[8.5px] text-center"
                  />
                </div>
                <div className="flex items-center gap-1 text-sky-300 font-bold shrink-0">
                  <span className="text-slate-500 font-normal shrink-0">Espec:</span>
                  <span className="px-1 py-0.5 rounded bg-sky-950/80 border border-sky-500/30 whitespace-nowrap text-[8.5px]">
                    DN{dn}-PN{pn}-SN{sn}-{tecnologia === 'Filament Winding' ? 'FW' : 'CC'}
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom 2-Table Grid: Dimensional & Mechanical Norms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              
              {/* Table 1: ANÁLISIS DIMENSIONAL */}
              <div className="rounded-xl bg-slate-900/80 border border-sky-500/20 overflow-hidden">
                <div className="px-2 py-1 bg-[#0f244a] border-b border-sky-500/30 flex items-center justify-between">
                  <span className="font-bold text-[9px] text-sky-200 uppercase tracking-wider truncate">
                    ANÁLISIS DIMENSIONAL
                  </span>
                  <span className="font-mono text-[8px] text-sky-400 shrink-0 whitespace-nowrap">ASTM D3517</span>
                </div>

                <div className="p-1.5 text-[8.5px]">
                  <table className="w-full text-left font-mono">
                    <thead>
                      <tr className="text-slate-400 text-[8px] border-b border-white/10">
                        <th className="pb-1 font-normal">Parámetro</th>
                        <th className="pb-1 font-normal text-center">Valor</th>
                        <th className="pb-1 font-normal text-center">Mín/Máx</th>
                        <th className="pb-1 font-normal text-right">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr>
                        <td className="py-1 text-slate-200 text-[8.5px] truncate">Diám. Ext O.D.</td>
                        <td className="py-1 text-center">
                          <input 
                            type="text" 
                            value={od}
                            onChange={(e) => setOd(e.target.value)}
                            className="w-11 px-0.5 py-0.5 rounded bg-black/60 border border-sky-500/40 text-center text-white font-bold text-[8.5px]"
                          />
                        </td>
                        <td className="py-1 text-center text-slate-400 text-[8px]">{specMinOD}-{specMaxOD}</td>
                        <td className="py-1 text-right">
                          <span className={`px-1 py-0.5 rounded text-[7.5px] font-bold whitespace-nowrap ${
                            isOdValid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {isOdValid ? '✓ OK' : '⚠ ALERTA'}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td className="py-1 text-slate-200 text-[8.5px] truncate">Espesor (mm)</td>
                        <td className="py-1 text-center">
                          <input 
                            type="text" 
                            value={espesor}
                            onChange={(e) => setEspesor(e.target.value)}
                            className="w-11 px-0.5 py-0.5 rounded bg-black/60 border border-sky-500/40 text-center text-white font-bold text-[8.5px]"
                          />
                        </td>
                        <td className="py-1 text-center text-slate-400 text-[8px]">{specMinEspesor}-{specMaxEspesor}</td>
                        <td className="py-1 text-right">
                          <span className={`px-1 py-0.5 rounded text-[7.5px] font-bold whitespace-nowrap ${
                            isEspesorValid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {isEspesorValid ? '✓ OK' : '⚠ ALERTA'}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td className="py-1 text-slate-200 text-[8.5px] truncate">Diám. Int I.D.</td>
                        <td className="py-1 text-center">
                          <input 
                            type="text" 
                            value={idDiam}
                            onChange={(e) => setIdDiam(e.target.value)}
                            className="w-11 px-0.5 py-0.5 rounded bg-black/60 border border-white/20 text-center text-white text-[8.5px]"
                          />
                        </td>
                        <td className="py-1 text-center text-slate-400 text-[8px]">1184-1190</td>
                        <td className="py-1 text-right">
                          <span className="px-1 py-0.5 rounded text-[7.5px] font-bold bg-emerald-500/20 text-emerald-300 whitespace-nowrap">
                            ✓ OK
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table 2: RIGIDEZ & NORMAS ASTM / ISO */}
              <div className="rounded-xl bg-slate-900/80 border border-sky-500/20 overflow-hidden">
                <div className="px-2 py-1 bg-[#0f244a] border-b border-sky-500/30 flex items-center justify-between">
                  <span className="font-bold text-[9px] text-sky-200 uppercase tracking-wider truncate">
                    ASTM D2412 & ISO 7685
                  </span>
                  <span className="font-mono text-[8px] text-emerald-400 shrink-0 whitespace-nowrap">STISS 5%</span>
                </div>

                <div className="p-1.5 space-y-1 text-[8.5px] font-mono">
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="p-1 rounded bg-black/40 border border-white/5 space-y-0.5">
                      <div className="text-[8px] text-slate-400 truncate">Rigidez ASTM 5%</div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-slate-300 text-[8px] shrink-0">Fuerza(N):</span>
                        <input 
                          type="text" 
                          value={fuerza}
                          onChange={(e) => setFuerza(e.target.value)}
                          className="w-11 px-0.5 py-0.5 rounded bg-black border border-white/20 text-right text-sky-300 font-bold text-[8.5px]"
                        />
                      </div>
                      <div className="flex items-center justify-between pt-0.5 border-t border-white/10 text-emerald-300 font-bold text-[8px]">
                        <span className="shrink-0">Stiss:</span>
                        <span className="whitespace-nowrap">{calculatedStiss.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="p-1 rounded bg-black/40 border border-white/5 space-y-0.5">
                      <div className="text-[8px] text-slate-400 truncate">Veredicto Calidad</div>
                      <div className="flex items-center gap-1 text-emerald-400 font-bold text-[9px] pt-0.5">
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        <span className="whitespace-nowrap">Aprobado</span>
                      </div>
                      <div className="text-[7.5px] text-slate-400 leading-tight truncate">
                        Conforme despacho.
                      </div>
                    </div>
                  </div>

                  {/* Submission Action Bar */}
                  <div className="pt-0.5 flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1 text-[8px] text-slate-400 min-w-0">
                      <Database className="w-2.5 h-2.5 text-sky-400 shrink-0" />
                      <span className="truncate">SharePoint DB</span>
                    </div>
                    <button
                      onClick={handleSaveAndAutomate}
                      className="px-2 py-0.5 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold flex items-center gap-1 transition-all shadow-md active:scale-95 cursor-pointer text-[8.5px] whitespace-nowrap shrink-0"
                    >
                      <Send className="w-2.5 h-2.5" />
                      <span>Guardar</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* --- SHAREPOINT RECENT LOGS & DIGITAL CERTIFICATION --- */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 pt-0.5">
              
              {/* Left 7 cols: Historial de Registro de Muestras del Lote en SharePoint DB */}
              <div className="md:col-span-7 rounded-xl bg-slate-900/80 border border-sky-500/20 overflow-hidden">
                <div className="px-2 py-1 bg-[#0f244a] border-b border-sky-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[8.5px] font-bold text-sky-300 font-mono">
                    <Database className="w-3 h-3 text-sky-400 shrink-0" />
                    <span className="truncate">REGISTROS EN VIVO DE LOTE ({lote})</span>
                  </div>
                  <span className="text-[7.5px] text-emerald-400 font-mono shrink-0 whitespace-nowrap">SharePoint DB</span>
                </div>
                
                <div className="p-1.5 text-[8px] font-mono">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-slate-400 border-b border-white/10 text-[7.5px]">
                        <th className="pb-1 font-normal">Muestra</th>
                        <th className="pb-1 font-normal text-center">Hora</th>
                        <th className="pb-1 font-normal text-center">O.D (mm)</th>
                        <th className="pb-1 font-normal text-center">Espesor</th>
                        <th className="pb-1 font-normal text-center">Stiss</th>
                        <th className="pb-1 font-normal text-right">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      <tr className="hover:bg-white/5">
                        <td className="py-1 font-bold text-sky-300">M-01</td>
                        <td className="py-1 text-center text-slate-400">08:15:20</td>
                        <td className="py-1 text-center">1224.2</td>
                        <td className="py-1 text-center">18.5</td>
                        <td className="py-1 text-center text-emerald-400">17,040</td>
                        <td className="py-1 text-right">
                          <span className="px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[7px] font-bold whitespace-nowrap">✓ CONFORME</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="py-1 font-bold text-sky-300">M-02</td>
                        <td className="py-1 text-center text-slate-400">08:42:10</td>
                        <td className="py-1 text-center">1225.0</td>
                        <td className="py-1 text-center">18.8</td>
                        <td className="py-1 text-center text-emerald-400">17,110</td>
                        <td className="py-1 text-right">
                          <span className="px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[7px] font-bold whitespace-nowrap">✓ CONFORME</span>
                        </td>
                      </tr>
                      <tr className="bg-sky-500/10 border-l-2 border-sky-400">
                        <td className="py-1 font-bold text-sky-300 flex items-center gap-1">
                          <span>M-03</span>
                          <span className="w-1 h-1 rounded-full bg-sky-400 animate-pulse shrink-0"/>
                        </td>
                        <td className="py-1 text-center text-slate-400">09:10:45</td>
                        <td className="py-1 text-center font-bold text-white">{od}</td>
                        <td className="py-1 text-center font-bold text-white">{espesor}</td>
                        <td className="py-1 text-center text-emerald-400 font-bold">{calculatedStiss.toLocaleString()}</td>
                        <td className="py-1 text-right">
                          <span className="px-1 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[7px] font-bold whitespace-nowrap">EN EDICIÓN</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right 5 cols: Certificado Digital & Gobernanza M365 */}
              <div className="md:col-span-5 rounded-xl bg-slate-900/80 border border-sky-500/20 p-2 space-y-1 font-mono text-[8.5px]">
                <div className="flex items-center justify-between border-b border-white/10 pb-1">
                  <span className="font-bold text-slate-200 text-[8.5px] truncate">TRAZABILIDAD Y M365 SSO</span>
                  <span className="px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[7.5px] shrink-0">Audit Log</span>
                </div>
                
                <div className="space-y-0.5 text-slate-300 text-[8px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Inspector QA:</span>
                    <span className="text-sky-300 font-bold">Samuel Henríquez</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Planta / Sección:</span>
                    <span className="text-slate-200">Planta Industrial</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Turno Operativo:</span>
                    <span className="text-amber-300">Turno A (Mañana)</span>
                  </div>
                </div>

                <div className="p-1 rounded bg-black/50 border border-sky-500/30 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-slate-400 text-[7.5px]">Firma SSO Microsoft 365</div>
                    <div className="text-emerald-400 font-bold text-[8px] flex items-center gap-1">
                      <Shield className="w-2.5 h-2.5 shrink-0" />
                      <span>HASH #8A9F-2026</span>
                    </div>
                  </div>
                  <div className="px-1.5 py-1 bg-sky-500/20 rounded border border-sky-400/40 text-[7.5px] font-bold text-sky-300 text-center leading-none">
                    M365<br/>VALID
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
                <span>Para: <span className="text-slate-200">supervisores_planta@enterprise.com; calidad@enterprise.com</span></span>
                <span>Asunto: <span className="text-amber-300 font-bold">[CALIDAD APROBADA] Lote {lote} - {muestra}</span></span>
              </div>

              {/* Styled HTML Body Render */}
              <div className="p-3 rounded bg-[#0a1220] border border-sky-500/30 space-y-2">
                <div className="flex items-center justify-between border-b border-sky-500/20 pb-1.5">
                  <span className="font-bold text-white text-xs">ENTERPRISE QUALITY ASSURANCE REPORT</span>
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
              <span className="text-[9px] text-slate-400">Digitalización Total • Reducción de Errores</span>
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
                <div className="text-[8.5px] text-slate-400">Tuberías, acoples y materias primas</div>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW 4: RBAC SECURITY & LOGIN M365 --- */}
        {activeTab === 'rbac' && (
          <div className="p-3 rounded-xl bg-slate-900/90 border border-sky-500/20 space-y-3 font-mono text-[10px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-purple-300 font-bold">
                <Lock className="w-4 h-4" />
                <span>AUTENTICACIÓN LOGIN SSO (M365) & PERMISOS RBAC</span>
              </div>
              <span className="text-[9px] text-emerald-400">Microsoft Entra ID Active</span>
            </div>

            <div className="space-y-2 text-slate-300 text-[9.5px]">
              <div className="p-2 rounded bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>Rol: Operario / Laboratorista</span>
                    <span className="text-[8px] text-sky-400 font-mono"> (samuel.h@enterprise-qa.com)</span>
                  </div>
                  <div className="text-[8.5px] text-slate-400">Autenticado vía SSO Microsoft 365. Permiso exclusivo de creación de muestras; sin acceso de modificación a tolerancias ASTM maestras.</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[8.5px] font-bold shrink-0 ml-2">Operario (Create)</span>
              </div>

              <div className="p-2 rounded bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>Rol: Administrador / Jefe de Calidad</span>
                    <span className="text-[8px] text-amber-400 font-mono"> (admin.calidad@enterprise-qa.com)</span>
                  </div>
                  <div className="text-[8.5px] text-slate-400">Acceso total a configuración de tolerancias mínimas/máximas, aprobación de reportes en Power Automate y dashboards de Power BI.</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[8.5px] font-bold shrink-0 ml-2">Admin (Full Control)</span>
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
          <span>Samuel Henríquez — Proyecto Corporativo Enterprise</span>
        </div>
      </div>

    </div>
  );
}
