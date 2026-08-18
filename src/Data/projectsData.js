// src/Data/projectsData.js

export const personalInfo = {
  name: "Samuel Henríquez",
  studio: "Inventus Tech Studio",
  role: "Desarrollador de Software",
  specialization: "Desarrollo de Apps Móviles & Firebase Cloud",
  bio: "Desarrollador de software especializado en la creación de aplicaciones móviles nativas de alto rendimiento con Flutter, bases de datos offline-first y arquitecturas en la nube reactivas con Firebase Firestore y Cloud Functions.",
  location: "Cartagena, Colombia (GMT-5)",
  email: "contacto@inventustech.com",
  whatsapp: "573000000000",
  github: "https://github.com",
  availability: "Disponible para desarrollo de apps móviles, arquitectura de software & consultoría"
};

export const projectsData = [
  {
    id: "lovecost-nido",
    number: "01",
    total: "04",
    title: "LoveCost / Nido",
    subtitle: "Gestión Financiera Inteligente & 'Disponible Real'",
    badge: "01 / FINTECH & FLUTTER",
    category: "Fintech & App Móvil",
    year: "2026",
    role: "Lead Mobile Architect & UI Engineer",
    headline: "Control de flujo de caja 'Disponible Real' con categorización cronológica y tema adaptativo",
    description: "Aplicación financiera offline-first desarrollada en Flutter. Desacopla el disponible real de presupuestos estáticos para representar el cashflow verdadero, incorpora categorización por recencia cronológica y un sistema de tema oscuro de precisión óptica.",
    image: "/assets/projects/lovecost.png",
    tags: ["Flutter Nativo", "Dart 3.x", "Isar DB", "NidoTheme Extension", "Offline-First", "State Management"],
    demoType: "app",
    githubUrl: "https://github.com",
    demoUrl: "#view-lovecost",
    accent: "#10b981",
    accentGlow: "rgba(16, 185, 129, 0.22)",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% -10%, rgba(16, 185, 129, 0.15), rgba(5, 28, 20, 0.95) 60%, #050d0a 100%)",
    ambientColor: "#051c14",
    deviceType: "phone-vertical",
    themeTag: "FINTECH EMERALD",
    metrics: [
      { label: "Tiempo de Respuesta DB", val: "< 1.2 ms" },
      { label: "Presupuesto de Cuadro", val: "60 FPS Constante" },
      { label: "Modo Operativo", val: "100% Offline-First" },
      { label: "Paleta Adaptativa", val: "NidoTheme Dynamic" }
    ],
    highlights: [
      "Cálculo matemático instantáneo de 'Disponible Real' sin dependencias de red.",
      "Categorización cronológica adaptativa que prioriza la frecuencia de uso del usuario.",
      "Extensiones de tema Flutter con contraste óptico calibrado para OLED."
    ],
    codeSnippet: {
      language: "dart",
      filename: "financial_cashflow_service.dart",
      code: `// lib/services/financial_cashflow_service.dart
import 'package:flutter/foundation.dart';
import 'package:isar/isar.dart';
import '../models/transaction_model.dart';

class FinancialCashflowService extends ChangeNotifier {
  final Isar _isar;
  double _disponibleReal = 0.0;
  List<Transaction> _recentTransactions = [];

  FinancialCashflowService(this._isar);

  double get disponibleReal => _disponibleReal;
  List<Transaction> get recentTransactions => _recentTransactions;

  /// Recalcula el flujo de caja disponible en tiempo real
  Future<void> computeDisponibleReal() async {
    final now = DateTime.now();
    final startOfMonth = DateTime(now.year, now.month, 1);
    
    // Consulta Isar indexada en memoria de sub-milisegundo
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
    }
  },
  {
    id: "serviintel-ops",
    number: "02",
    total: "04",
    title: "ServiIntel",
    subtitle: "Plataforma de Operaciones de Campo & Geo-Ticketing",
    badge: "02 / ENTERPRISE & FIREBASE CLOUD",
    category: "Ecosistema Web & Móvil",
    year: "2026",
    role: "Full-Stack System Architect",
    headline: "Geolocalización en tiempo real, tickets dinámicos y sincronización Cloud Firestore",
    description: "Ecosistema integral que conecta una suite administrativa web para monitoreo en vivo de flotas con una aplicación móvil para operarios en terreno. Implementa arquitectura Zero-Downtime, mapas interactivos y Cloud Functions para orquestación de estados.",
    image: "/assets/projects/serviintel.png",
    tags: ["Flutter Mobile", "Vanilla JS Web", "Firebase Firestore", "Cloud Functions", "Google Play Signed", "GPS Tracking"],
    demoType: "enterprise",
    githubUrl: "https://github.com",
    demoUrl: "#view-serviintel",
    accent: "#38bdf8",
    accentGlow: "rgba(56, 189, 248, 0.22)",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% -10%, rgba(56, 189, 248, 0.15), rgba(7, 20, 38, 0.95) 60%, #050b14 100%)",
    ambientColor: "#071426",
    deviceType: "laptop",
    themeTag: "ENTERPRISE SAPPHIRE",
    metrics: [
      { label: "Latencia Sync Sockets", val: "< 38 ms" },
      { label: "SLA Disponibilidad", val: "99.98%" },
      { label: "Despliegue Móvil", val: "Google Play Store" },
      { label: "Reglas de Seguridad", val: "Role-Based RBAC" }
    ],
    highlights: [
      "Consola web ultra-ligera en JavaScript Vanilla: carga instantánea, 0 KB de sobrecarga de frameworks y sincronización en tiempo real.",
      "Canales reactivos bidireccionales para asignación y cierre de órdenes en caliente con Cloud Firestore.",
      "Auditoría rigurosa de reglas de seguridad Firestore (Admin, Cliente, Operario) con RBAC.",
      "Rastreo GPS optimizado con bajo consumo de batería en background para operarios en terreno."
    ],
    codeSnippet: {
      language: "dart",
      filename: "ticket_dispatch_repository.dart",
      code: `// lib/repositories/ticket_dispatch_repository.dart
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:geolocator/geolocator.dart';

class TicketDispatchRepository {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  /// Stream reactivo de tickets asignados al operario con telemetría GPS
  Stream<List<FieldTicket>> watchAssignedTickets(String operatorId) {
    return _firestore
        .collection('tickets')
        .where('assignedTo', isEqualTo: operatorId)
        .where('status', whereIn: ['pending', 'in_progress'])
        .orderBy('priority', descending: true)
        .snapshots()
        .map((snapshot) => snapshot.docs.map((doc) => FieldTicket.fromDoc(doc)).toList());
  }

  Future<void> submitResolution({
    required String ticketId,
    required Position currentPos,
    required Map<String, dynamic> evidence,
  }) async {
    final batch = _firestore.batch();
    final docRef = _firestore.collection('tickets').doc(ticketId);
    batch.update(docRef, {
      'status': 'completed',
      'resolvedAt': FieldValue.serverTimestamp(),
      'geoCoordinates': GeoPoint(currentPos.latitude, currentPos.longitude),
      'evidencePayload': evidence,
    });
    await batch.commit();
  }
}`
    }
  },
  {
    id: "days-focus-flow",
    number: "03",
    total: "04",
    title: "Days: focus.flow",
    subtitle: "Organización de Días & Gamificación Zen",
    badge: "03 / PRODUCTIVITY & UX",
    category: "App Móvil de Productividad",
    year: "2026",
    role: "Product Designer & Flutter Engineer",
    headline: "Gestión de tareas sin fricción con swipe interactivo, 3 pestañas y widgets de Home Screen",
    description: "Aplicación de productividad que reemplaza formularios estáticos por un flujo interactivo tipo swipe para categorizar tareas. Diseñada con una paleta verde salvia (#8B9A86) sobre marfil (#FAF8F5), arquitectura de 3 espacios (El Menú, Los Estantes, Mi Radar) y widgets nativos de Android.",
    image: "/assets/projects/days.png",
    tags: ["Flutter 3.x", "Swipe Gestures", "Android Home Widget", "Sage Palette #8B9A86", "Custom Animations", "Hive DB"],
    demoType: "days",
    githubUrl: "https://github.com",
    demoUrl: "#view-days",
    accent: "#8B9A86",
    accentGlow: "rgba(139, 154, 134, 0.25)",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% -10%, rgba(139, 154, 134, 0.16), rgba(15, 23, 18, 0.95) 60%, #090e0b 100%)",
    ambientColor: "#0f1712",
    deviceType: "phone-vertical",
    themeTag: "ZEN SAGE GREEN",
    metrics: [
      { label: "Latencia de Gesto", val: "0 ms Fling" },
      { label: "Espacios de Trabajo", val: "Menú / Estantes / Radar" },
      { label: "Widgets Nativos", val: "Android AppWidget" },
      { label: "Paleta Calibrada", val: "Sage & Ivory" }
    ],
    highlights: [
      "Mecánica de swipe táctil de alta inercia para clasificación ultrarrápida de tareas.",
      "Radar diario con filtros dinámicos de energía y disponibilidad de tiempo.",
      "Widget nativo para pantalla de inicio de Android con sincronización instantánea."
    ],
    codeSnippet: {
      language: "dart",
      filename: "task_swipe_controller.dart",
      code: `// lib/controllers/task_swipe_controller.dart
import 'package:flutter/material.dart';

enum TaskDestination { menu, estantes, radar }

class TaskSwipeController extends ChangeNotifier {
  double _dragOffset = 0.0;
  
  double get dragOffset => _dragOffset;

  void onHorizontalDragUpdate(DragUpdateDetails details) {
    _dragOffset += details.primaryDelta ?? 0;
    notifyListeners();
  }

  void onHorizontalDragEnd(DragEndDetails details, Function(TaskDestination) onClassified) {
    if (_dragOffset > 120) {
      onClassified(TaskDestination.menu);
    } else if (_dragOffset < -120) {
      onClassified(TaskDestination.radar);
    }
    _dragOffset = 0.0;
    notifyListeners();
  }
}`
    }
  },
  {
    id: "cyber-rush",
    number: "04",
    total: "04",
    title: "Cyber Rush",
    subtitle: "Videojuego Arcade Vectorial a 60–120 FPS",
    badge: "04 / GAMING & WASM",
    category: "Videojuego & WASM Engine",
    year: "2026",
    role: "Lead Gameplay & Engine Engineer",
    headline: "Físicas vectoriales en tiempo real con renderizado acelerado por GPU y shaders GLSL",
    description: "Motor de videojuego arcade desarrollado en Flutter y compilado nativamente a WebAssembly mediante CanvasKit e Impeller. Incorpora cálculo analítico de colisiones poligonales, shaders de estela y pipeline de audio de latencia ultra baja.",
    image: "/assets/projects/cyber_rush.jpg",
    tags: ["Flutter 3.x", "Flame Engine", "WebAssembly", "CanvasKit", "GLSL Shaders", "60-120 FPS"],
    demoType: "game",
    githubUrl: "https://github.com",
    demoUrl: "#play-game",
    accent: "#f43f5e",
    accentGlow: "rgba(244, 63, 94, 0.22)",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% -10%, rgba(244, 63, 94, 0.16), rgba(24, 6, 13, 0.95) 60%, #0d0307 100%)",
    ambientColor: "#18060d",
    deviceType: "arcade",
    themeTag: "CYBER NEON ROSE",
    metrics: [
      { label: "Tasa de Refresco", val: "60–120 FPS" },
      { label: "Latencia de Entrada", val: "< 4 ms" },
      { label: "Peso Binario WASM", val: "2.1 MB" },
      { label: "Físicas Vectoriales", val: "GPU Native" }
    ],
    highlights: [
      "Pipeline de renderizado CanvasKit con aceleración directa Skia / Impeller.",
      "Algoritmo de partículas desacoplado del hilo principal para cero caídas de frames.",
      "Compatibilidad multiplataforma instantánea (Web, iOS y Android con un solo codebase)."
    ],
    codeSnippet: {
      language: "dart",
      filename: "cyber_rush_engine.dart",
      code: `// lib/game/cyber_rush_engine.dart
import 'package:flame/game.dart';
import 'package:flame/collisions.dart';
import 'dart:ui' as ui;

class CyberRushEngine extends FlameGame with HasCollisionDetection {
  late PlayerShip player;
  late final ParticleField particleField;
  late final ui.FragmentProgram neonShader;

  @override
  Future<void> onLoad() async {
    // Shaders GLSL compilados a SPIR-V para Impeller / WASM
    neonShader = await ui.FragmentProgram.fromAsset('shaders/neon_trail.frag');
    player = PlayerShip(position: Vector2(size.x / 2, size.y * 0.85));
    add(player);
    add(particleField = ParticleField(capacity: 800));
  }

  @override
  void update(double dt) {
    super.update(dt);
    particleField.updateVectors(dt, player.velocity);
  }
}`
    }
  }
];

export const technologiesStudy = [
  {
    category: "Desarrollo Móvil",
    summary: "Especialización en desarrollo nativo y multiplataforma con interfaces de alto rendimiento a 60/120 FPS.",
    skills: ["Flutter 3.x", "Dart 3.x", "State Management (Riverpod / Bloc)", "Isar Database", "Hive", "Widgets Nativos Android / iOS"]
  },
  {
    category: "Backend & Cloud con Firebase",
    summary: "Arquitecturas serverless escalables, sincronización reactiva y seguridad estricta para apps en producción.",
    skills: ["Firebase Firestore (NoSQL)", "Cloud Functions (Node.js/TS)", "Firebase Authentication", "Cloud Storage", "Firestore Security Rules (RBAC)", "REST APIs & WebSockets"]
  },
  {
    category: "Web & Herramientas",
    summary: "Desarrollo de paneles administrativos, consolas operativas y metodologías de ingeniería de software.",
    skills: ["React 19 & JavaScript", "Tailwind CSS", "Git & GitHub Workflow", "CI/CD & Google Play Deployment", "Clean Architecture", "TDD & Unit Testing"]
  }
];

export const servicesOffer = [
  {
    title: "Desarrollo de Aplicaciones Móviles",
    subtitle: "iOS & Android con Flutter",
    desc: "Construcción completa de apps móviles nativas desde el diseño de interfaz hasta la publicación en tiendas, con navegación fluida, alto rendimiento y consumo eficiente de batería."
  },
  {
    title: "Arquitectura Cloud & Firebase",
    subtitle: "Bases de Datos & Backend Serverless",
    desc: "Modelado e implementación de bases de datos Firestore, funciones en la nube (Cloud Functions), autenticación multi-proveedor y reglas de seguridad de nivel de producción."
  },
  {
    title: "Sistemas Offline-First",
    subtitle: "Persistencia Local & Sync Bidireccional",
    desc: "Desarrollo de aplicaciones preparadas para operar sin conexión mediante Isar DB y sincronización inteligente de datos al restablecerse la conectividad."
  },
  {
    title: "Paneles de Control & Web-Admin",
    subtitle: "Consolas Operativas de Gestión",
    desc: "Creación de plataformas web para administración de usuarios, monitoreo de flotas en tiempo real, gestión de tickets y visualización de métricas clave del negocio."
  }
];

export const skillsList = [
  { 
    category: "Móvil & Arquitectura", 
    items: [
      "Flutter Nativo (iOS & Android)", 
      "Dart 3.x Moderno", 
      "Isar Database (Offline-First)", 
      "Gestión de Estado (Riverpod/Bloc)", 
      "Clean Architecture & TDD"
    ] 
  },
  { 
    category: "Cloud & Firebase", 
    items: [
      "Firebase Firestore en Tiempo Real", 
      "Cloud Functions Serverless", 
      "Reglas de Seguridad RBAC", 
      "Firebase Auth & Storage", 
      "WebSockets & REST APIs"
    ] 
  },
  { 
    category: "Web & Herramientas", 
    items: [
      "React & JavaScript Moderno", 
      "Tailwind CSS", 
      "Git & Control de Versiones", 
      "Publicación en Google Play Store", 
      "Optimización de Rendimiento"
    ] 
  }
];

// Secondary / Additional Projects — displayed in the "Más Proyectos" grid
export const secondaryProjectsData = [
  {
    id: "sopa-senior",
    title: "Sopa Senior",
    subtitle: "Juego educativo de sopa de letras",
    category: "Juego Móvil & Monetización",
    year: "2025",
    accent: "#f59e0b",
    deviceType: "phone-vertical",
    description: "Aplicación de sopa de letras con niveles de dificultad progresiva, anuncios integrados y compra in-app para eliminar publicidad. Optimización del ciclo de ads para mostrarlos cada 3 niveles y preservar la experiencia de usuario.",
    tags: ["Flutter", "Google AdMob", "In-App Purchases", "Flame Engine"],
    highlights: [
      "Motor de generación procedural de sopas de letras con validación de cruces.",
      "Integración de Google AdMob con frecuencia controlada (cada 3 niveles).",
      "Compra in-app funcional para desactivar anuncios con RevenueCat."
    ],
    metrics: [
      { label: "Plataforma", val: "Android" },
      { label: "Monetización", val: "AdMob + IAP" },
      { label: "Frecuencia Ads", val: "Cada 3 niveles" },
      { label: "Estado", val: "Producción" }
    ],
    codeSnippet: {
      language: "dart",
      filename: "ad_frequency_controller.dart",
      code: `// lib/controllers/ad_frequency_controller.dart
class AdFrequencyController {
  int _levelsSinceLastAd = 0;
  static const int _adInterval = 3;

  bool shouldShowAd() {
    _levelsSinceLastAd++;
    if (_levelsSinceLastAd >= _adInterval) {
      _levelsSinceLastAd = 0;
      return true;
    }
    return false;
  }
}`
    },
    appSimulator: "sopa-senior"
  },
  {
    id: "inventus-web",
    title: "Inventus Tech Studio",
    subtitle: "Este mismo portafolio — React + Vite",
    category: "Web Interactiva & Animaciones",
    year: "2026",
    accent: "#a78bfa",
    deviceType: "laptop",
    description: "Portafolio profesional de alta fidelidad construido con React 19, GSAP para transiciones cinematográficas y mockups 3D interactivos que ejecutan demos reales de aplicaciones dentro de hardware fotorrealista.",
    tags: ["React 19", "Vite", "GSAP", "Tailwind CSS v4", "Three.js"],
    highlights: [
      "Transiciones fullscreen con timeline GSAP orquestado.",
      "Mockups de hardware fotorrealistas con apps interactivas embebidas.",
      "Tipografía editorial de alta fidelidad con Plus Jakarta Sans y Newsreader."
    ],
    metrics: [
      { label: "Bundle (gzip)", val: "360 kB" },
      { label: "Animaciones", val: "GSAP 3.x" },
      { label: "Despliegue", val: "Cloudflare Pages" },
      { label: "Build", val: "Vite 8 (759ms)" }
    ],
    codeSnippet: {
      language: "javascript",
      filename: "FullscreenDeck.jsx",
      code: `// Transición cinematográfica con GSAP
const animateTransition = (from, to, dir) => {
  const tl = gsap.timeline();
  gsap.set(targetSlide, {
    yPercent: dir > 0 ? 35 : -35,
    opacity: 0, scale: 0.98,
  });
  tl.to(currentSlide, {
    yPercent: dir > 0 ? -18 : 18,
    opacity: 0, scale: 0.97,
    duration: 0.65, ease: 'power3.inOut'
  });
  tl.to(targetSlide, {
    yPercent: 0, opacity: 1, scale: 1,
    duration: 0.7, ease: 'power3.out'
  }, 0.04);
};`
    },
    appSimulator: "inventus-web"
  }
];