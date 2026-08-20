// src/components/NidoCoupleStage.jsx
import { useState } from 'react';
import { 
  Users, Heart, Sparkles, ShieldCheck, Code2, Play, Image as ImageIcon,
  RefreshCw, CheckCircle2, Zap, DollarSign, Activity, Smartphone, Database, Layers, Flame, FileCode2, GitBranch
} from 'lucide-react';
import NidoPhoneApp from './apps/NidoPhoneApp';
import FlutterCodeViewer from './FlutterCodeViewer';
import { personalInfo } from '../Data/projectsData';

function WhatsAppIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.71 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

const p2pSyncCodeSnippet = {
  language: 'dart',
  filename: 'couple_sync_service.dart',
  code: `// lib/services/couple_sync_service.dart
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/ping_model.dart';

class CoupleSyncService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final String coupleId;

  CoupleSyncService({required this.coupleId});

  /// Transmite un guiño o señal de afecto en tiempo real P2P
  Future<void> sendPing({
    required String sender,
    required String message,
    required PingType type,
  }) async {
    final pingDoc = _firestore
        .collection('couples')
        .doc(coupleId)
        .collection('pings')
        .doc();

    final payload = {
      'id': pingDoc.id,
      'sender': sender,
      'message': message,
      'type': type.name,
      'timestamp': FieldValue.serverTimestamp(),
      'delivered': false,
    };

    await pingDoc.set(payload, SetOptions(merge: true));
  }

  /// Escucha notificaciones entrantes con canal reactivo de baja latencia
  Stream<PingModel> subscribeToIncomingPings(String currentUser) {
    return _firestore
        .collection('couples')
        .doc(coupleId)
        .collection('pings')
        .where('sender', isNotEqualTo: currentUser)
        .orderBy('timestamp', descending: true)
        .limit(1)
        .snapshots()
        .map((snapshot) => PingModel.fromFirestore(snapshot.docs.first));
  }
}`
};

export default function NidoCoupleStage({ project, isActive }) {
  // Shared state between both phones
  const [balance, setBalance] = useState(2450.00);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [screenMode, setScreenMode] = useState('live-app'); // 'live-app' | 'screenshot' | 'code'
  const [transactions, setTransactions] = useState([
    { id: 1, title: 'Mercado Semanal', category: 'Hogar', amount: -64.50, author: 'Samuel', time: '10:24 AM' },
    { id: 2, title: 'Café de Especialidad', category: 'Personal', amount: -4.80, author: 'Rochy', time: '8:15 AM' },
    { id: 3, title: 'Nómina Quincena', category: 'Ingreso', amount: 1800.00, author: 'Samuel', time: 'Ayer' }
  ]);
  const [syncNotice, setSyncNotice] = useState('👩‍❤️‍👨 Dispositivos sincronizados en tiempo real');
  const [lastPing, setLastPing] = useState(null);

  const cashflowCodeSnippet = project?.codeSnippet || {
    language: 'dart',
    filename: 'financial_cashflow_service.dart',
    code: `// lib/services/financial_cashflow_service.dart
import 'package:flutter/foundation.dart';
import 'package:isar/isar.dart';
import '../models/transaction_model.dart';

class FinancialCashflowService extends ChangeNotifier {
  final Isar _isar;
  double _disponibleReal = 0.0;

  FinancialCashflowService(this._isar);

  double get disponibleReal => _disponibleReal;

  /// Recalcula el flujo de caja 'Disponible Real' en sub-milisegundos
  Future<void> computeDisponibleReal() async {
    final now = DateTime.now();
    final startOfMonth = DateTime(now.year, now.month, 1);
    
    // Consulta Isar DB en memoria local (< 1.2ms)
    final incomes = await _isar.transactions
        .filter()
        .typeEqualTo(TransactionType.income)
        .dateGreaterThan(startOfMonth)
        .amountProperty()
        .sum();

    final expenses = await _isar.transactions
        .filter()
        .typeEqualTo(TransactionType.expense)
        .dateGreaterThan(startOfMonth)
        .amountProperty()
        .sum();

    _disponibleReal = incomes - expenses;
    notifyListeners();
  }
}`
  };

  // Triggered when either phone adds a transaction
  const handleAddTransaction = (title, category, amount, author) => {
    const newTx = {
      id: Date.now(),
      title,
      category,
      amount: -amount,
      author,
      time: 'Justo ahora'
    };

    const newBal = parseFloat((balance - amount).toFixed(2));
    setBalance(newBal);
    setTransactions(prev => [newTx, ...prev.slice(0, 5)]);

    const notice = `⚡ ${author} registró -$${amount.toFixed(2)} en ${title}`;
    setSyncNotice(notice);
  };

  const handleSendPing = (message, author) => {
    setLastPing({
      sender: author,
      message,
      timestamp: Date.now()
    });
    setSyncNotice(`💌 ${author} envió guiño: "${message}"`);
  };

  const sharedState = {
    balance,
    transactions,
    syncNotice,
    lastPing
  };

  return (
    <div id="nido-couple-stage" className="w-full h-full min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-12 pt-20 pb-12 relative select-none overflow-hidden text-zinc-100 font-sans">
      
      {/* VIBRANT AMBIENT BACKGROUND GLOWS RESTORED */}
      <div className="absolute top-1/4 left-1/12 w-[500px] h-[500px] bg-gradient-to-tr from-[#0D9488]/25 via-emerald-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/12 w-[500px] h-[500px] bg-gradient-to-bl from-rose-500/20 via-indigo-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#0D9488]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto flex flex-col my-auto space-y-5 relative z-10">

        {/* Section Header */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/15 shrink-0 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-widest text-[#0D9488]">04 // LOVECOST / NIDO</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-300 hidden sm:inline">Aplicación Móvil Financiera en Pareja</span>
          </div>

          {/* Minimalist Segmented Controls Bar (App Interactiva | Captura Real | Código Dart) */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-md shadow-xl z-30 text-[11px]">
            <button
              type="button"
              data-prevent-slide="true"
              onClick={() => setScreenMode('live-app')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                screenMode === 'live-app' 
                  ? 'bg-white text-black font-semibold shadow-sm' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>App Interactiva</span>
            </button>

            <button
              type="button"
              data-prevent-slide="true"
              onClick={() => setScreenMode('screenshot')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                screenMode === 'screenshot' 
                  ? 'bg-white text-black font-semibold shadow-sm' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3 h-3" />
              <span>Captura Real</span>
            </button>

            <button
              type="button"
              data-prevent-slide="true"
              onClick={() => setScreenMode('code')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                screenMode === 'code' 
                  ? 'bg-white text-black font-semibold shadow-sm' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>Código Dart</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-zinc-200 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <span>{isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}</span>
            </button>
          </div>
        </div>

        {/* 3-COLUMN DUAL PHONE LAYOUT: Phone A (LEFT) | Center Tech & Narrative | Phone B (RIGHT) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">

          {/* LEFT COLUMN: Phone A - Samuel OR Code Window A */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center space-y-2.5">
            <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-zinc-300 text-xs font-mono font-bold shadow-lg backdrop-blur-md">
              {screenMode === 'code' ? <FileCode2 className="w-3.5 h-3.5 text-[#0D9488]" /> : <Smartphone className="w-3.5 h-3.5 text-[#0D9488]" />}
              <span>{screenMode === 'code' ? '📄 Isar DB & Cashflow (Dart)' : '🦊 Samuel (Él)'}</span>
            </div>

            {screenMode === 'code' ? (
              <div 
                data-prevent-slide="true"
                className="w-full max-w-[295px] sm:max-w-[315px] h-[510px] rounded-[28px] bg-zinc-950/95 border border-white/15 p-1 shadow-2xl overflow-hidden relative flex flex-col"
              >
                <FlutterCodeViewer codeSnippet={cashflowCodeSnippet} accentColor="#0D9488" />
              </div>
            ) : (
              /* REALISTIC PHONE CHASSIS A */
              <div 
                data-prevent-slide="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="mockup-interactive relative w-full max-w-[295px] sm:max-w-[315px] h-[510px] rounded-[38px] bg-[#14151a] p-2.5 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between select-none"
              >
                {/* Centered Camera Lens Dot */}
                <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black border border-white/10 flex items-center justify-center z-30 pointer-events-none shadow-sm">
                  <div className="w-1 h-1 rounded-full bg-zinc-800" />
                </div>

                {/* Inner Screen */}
                <div className="w-full h-full rounded-[28px] overflow-hidden bg-black border border-white/10 shadow-inner relative interactive-screen">
                  {screenMode === 'screenshot' ? (
                    <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-b from-[#0f172a] via-[#090d16] to-[#04060a] text-white">
                      <div className="pt-6 space-y-3">
                        <div className="text-xs font-mono text-[#0D9488] font-bold">Nido Financial Mobile</div>
                        <div className="text-2xl font-extrabold">$2,450.00</div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                          <div className="text-zinc-400">Disponible Real Samuel</div>
                          <div className="text-emerald-400 font-bold mt-1">Sincronizado vía Isar DB</div>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0D9488]/20 border border-[#0D9488]/40 text-center text-xs font-mono text-[#0D9488] font-bold">
                        Captura Real UI Móvil
                      </div>
                    </div>
                  ) : (
                    <NidoPhoneApp 
                      user="samuel" 
                      sharedState={sharedState} 
                      onAddTransaction={handleAddTransaction} 
                      onSendPing={handleSendPing}
                      isDarkMode={isDarkMode}
                      onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* MIDDLE COLUMN: App Info, Features & Tech Stack */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left flex flex-col justify-center px-1">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#0D9488]/25 to-rose-500/25 border border-white/15 text-xs font-mono font-bold text-zinc-200">
                <Users className="w-3.5 h-3.5 text-[#0D9488]" />
                <span>Aplicación Móvil para Parejas (Android)</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
                LoveCost / <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D9488] via-emerald-400 to-teal-200">Nido</span>
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                Aplicación móvil desarrollada en <strong>Flutter & Dart</strong> enfocada en la gestión de finanzas compartidas para parejas. Elimina las discusiones por dinero coordinando ingresos, compras del hogar y presupuestos con sincronización local y en la nube.
              </p>
            </div>

            {/* KEY FEATURES SHOWCASE */}
            <div className="grid grid-cols-2 gap-2 text-xs font-sans text-left">
              <div className="stage-card p-3 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-1 hover:border-[#0D9488]/50 transition-colors">
                <div className="font-mono font-bold text-[#0D9488] text-[11px] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> Disponible Real
                </div>
                <p className="text-[11px] text-zinc-300 leading-snug">
                  Cálculo de liquidez libre (Ingresos - Gastos fijos/variables proyectados) actualizado dinámicamente.
                </p>
              </div>

              <div className="stage-card p-3 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-1 hover:border-[#0D9488]/50 transition-colors">
                <div className="font-mono font-bold text-amber-400 text-[11px] flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" /> Guiños de Amor (Pings)
                </div>
                <p className="text-[11px] text-zinc-300 leading-snug">
                  Envío instantáneo de notificaciones contextuales y avisos cariñosos entre ambos teléfonos.
                </p>
              </div>

              <div className="stage-card p-3 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-1 hover:border-[#0D9488]/50 transition-colors">
                <div className="font-mono font-bold text-sky-400 text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Lista del Nido
                </div>
                <p className="text-[11px] text-zinc-300 leading-snug">
                  Gestión colaborativa de compras del hogar con marcas de ítems completados en tiempo real.
                </p>
              </div>

              <div className="stage-card p-3 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-1 hover:border-[#0D9488]/50 transition-colors">
                <div className="font-mono font-bold text-emerald-400 text-[11px] flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5" /> Archivado de Ciclos
                </div>
                <p className="text-[11px] text-zinc-300 leading-snug">
                  Cierre de periodos mensuales guardando el histórico de superávit o déficit presupuestario.
                </p>
              </div>
            </div>

            {/* TECH STACK PANEL */}
            <div className="stage-card p-3 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2 text-left font-mono">
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span className="font-bold flex items-center gap-1.5 text-[#0D9488]">
                  <Code2 className="w-3.5 h-3.5" /> STACK TECNOLÓGICO MÓVIL
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#0D9488]/20 text-[#0D9488] font-bold border border-[#0D9488]/40">
                  DISPONIBLE EN ANDROID
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-[10px]">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-0.5 text-center">
                  <div className="text-emerald-400 font-extrabold text-[11px]">Flutter</div>
                  <div className="text-zinc-400 text-[9px]">UI Android</div>
                </div>

                <div className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-0.5 text-center">
                  <div className="text-cyan-400 font-extrabold text-[11px]">Dart</div>
                  <div className="text-zinc-400 text-[9px]">Lenguaje Core</div>
                </div>

                <div className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-0.5 text-center">
                  <div className="text-[#0D9488] font-extrabold text-[11px]">Isar DB</div>
                  <div className="text-zinc-400 text-[9px]">Offline DB</div>
                </div>

                <div className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-0.5 text-center">
                  <div className="text-[#10B981] font-extrabold text-[11px]">Firestore</div>
                  <div className="text-zinc-400 text-[9px]">Sync P2P</div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS: GitHub, WhatsApp Quote */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 font-mono text-xs">
              <a
                href={project?.githubUrl || "https://github.com"}
                target="_blank"
                rel="noreferrer"
                data-cursor="GITHUB"
                className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold flex items-center gap-2 transition-all cursor-pointer text-xs shadow-md active:scale-95"
              >
                <GitBranch className="w-3.5 h-3.5 text-[#0D9488]" />
                <span>GitHub</span>
              </a>

              <a
                href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20cotizar%20una%20app%20móvil%20similar%20a%20Nido`}
                target="_blank"
                rel="noreferrer"
                data-cursor="WHATSAPP"
                className="px-3.5 py-2 rounded-full border border-white/15 text-zinc-300 hover:text-white transition-all flex items-center gap-2 hover:border-[#0D9488]/50 text-xs shadow-md active:scale-95"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                <span>Cotizar App</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Phone B - Rochy OR Code Window B */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center space-y-2.5">
            <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-zinc-300 text-xs font-mono font-bold shadow-lg backdrop-blur-md">
              {screenMode === 'code' ? <FileCode2 className="w-3.5 h-3.5 text-[#00897B]" /> : <Smartphone className="w-3.5 h-3.5 text-[#00897B]" />}
              <span>{screenMode === 'code' ? '📄 P2P Sync & Signals (Dart)' : '🌸 Rochy (Ella)'}</span>
            </div>

            {screenMode === 'code' ? (
              <div 
                data-prevent-slide="true"
                className="w-full max-w-[295px] sm:max-w-[315px] h-[510px] rounded-[28px] bg-zinc-950/95 border border-white/15 p-1 shadow-2xl overflow-hidden relative flex flex-col"
              >
                <FlutterCodeViewer codeSnippet={p2pSyncCodeSnippet} accentColor="#00897B" />
              </div>
            ) : (
              /* REALISTIC PHONE CHASSIS B */
              <div 
                data-prevent-slide="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="mockup-interactive relative w-full max-w-[295px] sm:max-w-[315px] h-[510px] rounded-[38px] bg-[#14151a] p-2.5 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between select-none"
              >
                {/* Centered Camera Lens Dot */}
                <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black border border-white/10 flex items-center justify-center z-30 pointer-events-none shadow-sm">
                  <div className="w-1 h-1 rounded-full bg-zinc-800" />
                </div>

                {/* Inner Screen */}
                <div className="w-full h-full rounded-[28px] overflow-hidden bg-black border border-white/10 shadow-inner relative interactive-screen">
                  {screenMode === 'screenshot' ? (
                    <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-b from-[#1e1b4b] via-[#0f0e26] to-[#070614] text-white">
                      <div className="pt-6 space-y-3">
                        <div className="text-xs font-mono text-emerald-400 font-bold">Nido Couple Sync</div>
                        <div className="text-2xl font-extrabold">$2,450.00</div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                          <div className="text-zinc-400">Disponible Real Rochy</div>
                          <div className="text-rose-400 font-bold mt-1">Guiños en tiempo real</div>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-center text-xs font-mono text-emerald-400 font-bold">
                        Captura Real UI Móvil
                      </div>
                    </div>
                  ) : (
                    <NidoPhoneApp 
                      user="rochy" 
                      sharedState={sharedState} 
                      onAddTransaction={handleAddTransaction} 
                      onSendPing={handleSendPing}
                      isDarkMode={isDarkMode}
                      onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

