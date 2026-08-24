// src/components/NidoCoupleStage.jsx
import { useState } from 'react';
import { 
  Users, Heart, Sparkles, ShieldCheck, Code2, Play, Image as ImageIcon,
  RefreshCw, CheckCircle2, Zap, DollarSign, Activity, Smartphone, Database, Layers, Flame, FileCode2, GitBranch, Maximize2
} from 'lucide-react';
import NidoPhoneApp from './apps/NidoPhoneApp';
import FlutterCodeViewer from './FlutterCodeViewer';
import { personalInfo } from '../Data/projectsData';
import { sounds } from '../utils/soundEngine';

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

export default function NidoCoupleStage({ project, isActive, onPlayDemo }) {
  // Shared state between both phones
  const [balance, setBalance] = useState(2450.00);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [screenMode, setScreenMode] = useState('live-app');
  const [activeCoupleUser, setActiveCoupleUser] = useState('samuel'); // 'samuel' | 'rochy' for mobile/tablet
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
    <div 
      id="nido-couple-stage" 
      className="w-full min-h-full flex flex-col justify-start md:justify-center px-3 sm:px-8 lg:px-12 pt-12 sm:pt-20 pb-12 sm:pb-16 relative select-none custom-scroll text-zinc-100 font-sans"
      style={{
        background: 'radial-gradient(ellipse 100% 100% at 50% 15%, #071a14 0%, #04100c 55%, #020806 100%)'
      }}
    >
      
      {/* VIBRANT AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-1/4 left-1/12 w-96 sm:w-125 h-96 sm:h-125 bg-linear-to-tr from-[#0D9488]/25 via-emerald-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/12 w-96 sm:w-125 h-96 sm:h-125 bg-linear-to-bl from-rose-500/20 via-indigo-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-175 h-87.5 bg-[#0D9488]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto flex flex-col my-auto space-y-2 sm:space-y-4 relative z-10">

        {/* Section Header */}
        <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-2 sm:pb-2.5 border-b border-white/15 shrink-0 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="font-bold tracking-widest text-[#0D9488]">04 // LOVECOST / NIDO</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-300 hidden sm:inline text-[11px] sm:text-xs">Aplicación Móvil Financiera en Pareja</span>
          </div>

          {/* Minimalist Segmented Controls Bar (App Interactiva | Captura Real | Código Dart) */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-md shadow-xl z-30 text-[10px] sm:text-[11px]">
            <button
              type="button"
              data-prevent-slide="true"
              onClick={() => setScreenMode('live-app')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer ${
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
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer ${
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
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer ${
                screenMode === 'code' 
                  ? 'bg-white text-black font-semibold shadow-sm' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>Código Dart</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="px-2.5 sm:px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-zinc-200 text-[10.5px] sm:text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <span>{isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP VIEW (lg:grid): BALANCED 3-COLUMN DUAL PHONE LAYOUT */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-3 xl:gap-5 items-center pt-0.5">

          {/* LEFT COLUMN: Phone A - Samuel OR Code Window A */}
          <div className="col-span-3 flex flex-col items-center justify-center space-y-1.5">
            <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/5 border border-white/15 text-zinc-300 text-xs font-mono font-bold shadow-lg backdrop-blur-md">
              {screenMode === 'code' ? <FileCode2 className="w-3.5 h-3.5 text-[#0D9488]" /> : <Smartphone className="w-3.5 h-3.5 text-[#0D9488]" />}
              <span>{screenMode === 'code' ? '📄 Isar DB & Cashflow (Dart)' : '🦊 Samuel (Él)'}</span>
            </div>

            {screenMode === 'code' ? (
              <div 
                data-prevent-slide="true"
                className="w-full max-w-52 sm:max-w-64 lg:max-w-62.5 xl:max-w-72.5 2xl:max-w-82.5 h-84 lg:h-97.5 xl:h-112.5 2xl:h-125 rounded-[28px] bg-zinc-950/95 border border-white/15 p-1 shadow-2xl overflow-hidden relative flex flex-col"
              >
                <FlutterCodeViewer codeSnippet={cashflowCodeSnippet} accentColor="#0D9488" />
              </div>
            ) : (
              /* REALISTIC PHONE CHASSIS A */
              <div 
                data-prevent-slide="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="mockup-interactive relative w-full max-w-52 sm:max-w-64 lg:max-w-62.5 xl:max-w-72.5 2xl:max-w-82.5 h-84 lg:h-97.5 xl:h-112.5 2xl:h-125 rounded-[30px] xl:rounded-[36px] bg-[#14151a] p-1.5 xl:p-2.5 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between select-none overflow-hidden"
              >
                {/* Centered Camera Lens Dot */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black border border-white/10 flex items-center justify-center z-30 pointer-events-none shadow-sm">
                  <div className="w-1 h-1 rounded-full bg-zinc-800" />
                </div>

                {/* Inner Screen */}
                <div className="w-full h-full rounded-[22px] xl:rounded-[26px] overflow-hidden bg-black shadow-inner relative interactive-screen">
                  {screenMode === 'screenshot' ? (
                    <div className="w-full h-full flex flex-col justify-between p-4 bg-linear-to-b from-[#0f172a] via-[#090d16] to-[#04060a] text-white">
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
          <div className="col-span-6 space-y-3 xl:space-y-4 text-left flex flex-col justify-center px-1">
            
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-[#0D9488]/25 to-rose-500/25 border border-white/15 text-[11px] xl:text-xs font-mono font-bold text-zinc-200">
                <Users className="w-3.5 h-3.5 text-[#0D9488]" />
                <span>Aplicación Móvil para Parejas (Android)</span>
              </div>

              <h2 className="text-xl sm:text-3xl xl:text-4xl font-display font-extrabold text-white tracking-tight leading-tight flex flex-wrap items-baseline gap-1.5">
                <span>LoveCost /</span> <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0D9488] via-emerald-400 to-teal-200">Nido</span>
              </h2>

              <p className="text-[11px] xl:text-xs text-zinc-300 font-sans leading-relaxed">
                Aplicación móvil desarrollada en <strong>Flutter & Dart</strong> enfocada en la gestión de finanzas compartidas para parejas. Elimina las discusiones por dinero coordinando ingresos, compras del hogar y presupuestos con sincronización local y en la nube.
              </p>
            </div>

            {/* KEY FEATURES SHOWCASE */}
            <div className="grid grid-cols-2 gap-2 text-xs font-sans text-left">
              <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/10 space-y-0.5 hover:border-[#0D9488]/50 transition-colors">
                <div className="font-mono font-bold text-[#0D9488] text-[10.5px] xl:text-[11px] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> Disponible Real
                </div>
                <p className="text-[10px] xl:text-[11px] text-zinc-300 leading-snug">
                  Cálculo de liquidez libre proyectada en tiempo real.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/10 space-y-0.5 hover:border-[#0D9488]/50 transition-colors">
                <div className="font-mono font-bold text-amber-400 text-[10.5px] xl:text-[11px] flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" /> Guiños de Amor (Pings)
                </div>
                <p className="text-[10px] xl:text-[11px] text-zinc-300 leading-snug">
                  Envío instantáneo de señales contextuales y cariño.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/10 space-y-0.5 hover:border-[#0D9488]/50 transition-colors">
                <div className="font-mono font-bold text-sky-400 text-[10.5px] xl:text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Lista del Nido
                </div>
                <p className="text-[10px] xl:text-[11px] text-zinc-300 leading-snug">
                  Compras del hogar con marcas reactivas en vivo.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/10 space-y-0.5 hover:border-[#0D9488]/50 transition-colors">
                <div className="font-mono font-bold text-emerald-400 text-[10.5px] xl:text-[11px] flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5" /> Archivado de Ciclos
                </div>
                <p className="text-[10px] xl:text-[11px] text-zinc-300 leading-snug">
                  Cierre de periodos guardando histórico de superávit.
                </p>
              </div>
            </div>

            {/* TECH STACK PANEL */}
            <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-white/10 space-y-1.5 text-left font-mono">
              <div className="flex items-center justify-between text-[10.5px] text-zinc-400">
                <span className="font-bold flex items-center gap-1.5 text-[#0D9488]">
                  <Code2 className="w-3.5 h-3.5" /> STACK TECNOLÓGICO MÓVIL
                </span>
                <span className="text-[9.5px] px-2 py-0.5 rounded bg-[#0D9488]/20 text-[#0D9488] font-bold border border-[#0D9488]/40">
                  DISPONIBLE EN ANDROID
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 text-[9.5px] xl:text-[10px]">
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 space-y-0.5 text-center">
                  <div className="text-emerald-400 font-extrabold">Flutter</div>
                  <div className="text-zinc-400 text-[8.5px]">UI Android</div>
                </div>

                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 space-y-0.5 text-center">
                  <div className="text-cyan-400 font-extrabold">Dart</div>
                  <div className="text-zinc-400 text-[8.5px]">Lenguaje Core</div>
                </div>

                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 space-y-0.5 text-center">
                  <div className="text-[#0D9488] font-extrabold">Isar DB</div>
                  <div className="text-zinc-400 text-[8.5px]">Offline DB</div>
                </div>

                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 space-y-0.5 text-center">
                  <div className="text-[#10B981] font-extrabold">Firestore</div>
                  <div className="text-zinc-400 text-[8.5px]">Sync P2P</div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS: GitHub, WhatsApp Quote */}
            <div className="flex flex-wrap items-center justify-start gap-2.5 pt-0.5 font-mono text-xs">
              <a
                href={project?.githubUrl || "https://github.com"}
                target="_blank"
                rel="noreferrer"
                data-cursor="GITHUB"
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold flex items-center gap-2 transition-all cursor-pointer text-xs shadow-md active:scale-95"
              >
                <GitBranch className="w-3.5 h-3.5 text-[#0D9488]" />
                <span>GitHub</span>
              </a>

              <a
                href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20cotizar%20una%20app%20móvil%20similar%20a%20Nido`}
                target="_blank"
                rel="noreferrer"
                data-cursor="WHATSAPP"
                className="px-3.5 py-1.5 rounded-full border border-white/15 text-zinc-300 hover:text-white transition-all flex items-center gap-2 hover:border-[#0D9488]/50 text-xs shadow-md active:scale-95"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                <span>Cotizar App</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Phone B - Rochy OR Code Window B */}
          <div className="col-span-3 flex flex-col items-center justify-center space-y-1.5">
            <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/5 border border-white/15 text-zinc-300 text-xs font-mono font-bold shadow-lg backdrop-blur-md">
              {screenMode === 'code' ? <FileCode2 className="w-3.5 h-3.5 text-[#00897B]" /> : <Smartphone className="w-3.5 h-3.5 text-[#00897B]" />}
              <span>{screenMode === 'code' ? '📄 P2P Sync & Signals (Dart)' : '🌸 Rochy (Ella)'}</span>
            </div>

            {screenMode === 'code' ? (
              <div 
                data-prevent-slide="true"
                className="w-full max-w-52 sm:max-w-64 lg:max-w-62.5 xl:max-w-72.5 2xl:max-w-82.5 h-84 lg:h-97.5 xl:h-112.5 2xl:h-125 rounded-[28px] bg-zinc-950/95 border border-white/15 p-1 shadow-2xl overflow-hidden relative flex flex-col"
              >
                <FlutterCodeViewer codeSnippet={p2pSyncCodeSnippet} accentColor="#00897B" />
              </div>
            ) : (
              /* REALISTIC PHONE CHASSIS B */
              <div 
                data-prevent-slide="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="mockup-interactive relative w-full max-w-52 sm:max-w-64 lg:max-w-62.5 xl:max-w-72.5 2xl:max-w-82.5 h-84 lg:h-97.5 xl:h-112.5 2xl:h-125 rounded-[30px] xl:rounded-[36px] bg-[#14151a] p-1.5 xl:p-2.5 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between select-none overflow-hidden"
              >
                {/* Centered Camera Lens Dot */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black border border-white/10 flex items-center justify-center z-30 pointer-events-none shadow-sm">
                  <div className="w-1 h-1 rounded-full bg-zinc-800" />
                </div>

                {/* Inner Screen */}
                <div className="w-full h-full rounded-[22px] xl:rounded-[26px] overflow-hidden bg-black shadow-inner relative interactive-screen">
                  {screenMode === 'screenshot' ? (
                    <div className="w-full h-full flex flex-col justify-between p-4 bg-linear-to-b from-[#1e1b4b] via-[#0f0e26] to-[#070614] text-white">
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

        {/* ========================================================================= */}
        {/* MOBILE / TABLET VIEW (lg:hidden): INTERACTIVE COUPLE SWITCHER */}
        {/* ========================================================================= */}
        <div className="flex lg:hidden flex-col space-y-4 pb-12">
          
          {/* Info Block */}
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-[#0D9488]/25 to-rose-500/25 border border-white/15 text-xs font-mono font-bold text-zinc-200">
              <Users className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>Finanzas Móviles para Parejas</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-display font-extrabold text-white tracking-tight leading-tight flex flex-wrap items-baseline gap-1.5">
              <span>LoveCost /</span> <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0D9488] via-emerald-400 to-teal-200">Nido</span>
            </h2>

            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Gestión de finanzas compartidas en <strong>Flutter & Dart</strong> con sincronización reactiva local y en la nube.
            </p>
          </div>

          {/* Interactive Couple Profile Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10 font-mono text-xs w-full max-w-sm mx-auto">
            <button
              onClick={() => setActiveCoupleUser('samuel')}
              className={`flex-1 py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold ${
                activeCoupleUser === 'samuel'
                  ? 'bg-[#0D9488] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>🦊 Samuel (Él)</span>
            </button>
            <button
              onClick={() => setActiveCoupleUser('rochy')}
              className={`flex-1 py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold ${
                activeCoupleUser === 'rochy'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>🌸 Rochy (Ella)</span>
            </button>
          </div>

          {/* Mobile Phone Mockup Displaying Selected User Profile */}
          <div className="flex justify-center py-1">
            {screenMode === 'code' ? (
              <div 
                data-prevent-slide="true"
                className="w-full max-w-67.5 sm:max-w-72.5 h-100 sm:h-110 rounded-[28px] bg-zinc-950/95 border border-white/15 p-1 shadow-2xl overflow-hidden relative flex flex-col"
              >
                <FlutterCodeViewer 
                  codeSnippet={activeCoupleUser === 'samuel' ? cashflowCodeSnippet : p2pSyncCodeSnippet} 
                  accentColor={activeCoupleUser === 'samuel' ? '#0D9488' : '#00897B'} 
                />
              </div>
            ) : (
              <div 
                data-prevent-slide="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="relative w-full max-w-[210px] xs:max-w-[230px] aspect-9/18 rounded-xl bg-[#0c0d12] border border-white/15 overflow-hidden flex flex-col justify-between shadow-md"
              >
                {/* Flat Top Bar */}
                <div className="w-full bg-[#14151c] px-2.5 py-1 border-b border-white/10 flex items-center justify-between text-[8.5px] font-mono text-zinc-400 shrink-0 select-none">
                  <div className="flex items-center gap-1 font-bold text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span>{activeCoupleUser === 'samuel' ? '🦊 Samuel (Él)' : '🌸 Rochy (Ella)'}</span>
                  </div>
                  <span className="text-[7.5px] text-teal-400 font-semibold">Live P2P</span>
                </div>

                <div className="w-full flex-1 min-h-0 bg-black relative overflow-hidden interactive-screen">
                  {screenMode === 'screenshot' ? (
                    <div className="w-full h-full flex flex-col justify-between p-4 bg-linear-to-b from-[#0f172a] via-[#090d16] to-[#04060a] text-white">
                      <div className="pt-6 space-y-3">
                        <div className="text-xs font-mono text-[#0D9488] font-bold">Nido Financial Mobile</div>
                        <div className="text-2xl font-extrabold">$2,450.00</div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                          <div className="text-zinc-400">Perfil: {activeCoupleUser === 'samuel' ? 'Samuel' : 'Rochy'}</div>
                          <div className="text-emerald-400 font-bold mt-1">Sincronizado vía Isar DB & Firestore</div>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0D9488]/20 border border-[#0D9488]/40 text-center text-xs font-mono text-[#0D9488] font-bold">
                        Captura Real UI Móvil
                      </div>
                    </div>
                  ) : (
                    <NidoPhoneApp 
                      user={activeCoupleUser} 
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

          {/* 4 Feature Badges on Mobile */}
          <div className="grid grid-cols-2 gap-2 text-xs font-sans text-left">
            <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/10 space-y-0.5">
              <div className="font-mono font-bold text-[#0D9488] text-[10.5px] flex items-center gap-1">
                <Activity className="w-3 h-3" /> Disponible Real
              </div>
              <p className="text-[10px] text-zinc-300 leading-snug">
                Liquidez libre proyectada en tiempo real.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/10 space-y-0.5">
              <div className="font-mono font-bold text-amber-400 text-[10.5px] flex items-center gap-1">
                <Heart className="w-3 h-3" /> Guiños de Amor
              </div>
              <p className="text-[10px] text-zinc-300 leading-snug">
                Notificaciones afectivas instantáneas P2P.
              </p>
            </div>
          </div>

          {/* Action buttons on Mobile */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 font-mono text-xs">
            <a
              href={project?.githubUrl || "https://github.com"}
              target="_blank"
              rel="noreferrer"
              data-cursor="GITHUB"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold flex items-center gap-1.5 transition-all text-xs"
            >
              <GitBranch className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>GitHub</span>
            </a>

            <a
              href={`https://wa.me/${personalInfo.whatsapp}?text=Hola%20${encodeURIComponent(personalInfo.name)},%20quiero%20cotizar%20una%20app%20móvil%20similar%20a%20Nido`}
              target="_blank"
              rel="noreferrer"
              data-cursor="WHATSAPP"
              className="px-4 py-2 rounded-full border border-white/15 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 text-xs"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400 fill-current" />
              <span>Cotizar App</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}

