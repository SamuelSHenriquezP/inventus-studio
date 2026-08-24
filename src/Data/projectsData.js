// src/Data/projectsData.js

export const personalInfo = {
  name: "Samuel Henríquez",
  studio: "Inventus Tech Studio",
  role: "Full-Stack Software Architect & Cloud Engineer",
  specialization: "Arquitectura Backend, Sistemas Cloud & Ecosistemas Móviles/Web",
  bio: "Diseño y construyo sistemas backend escalables en la nube, plataformas en tiempo real y consolas web administrativas conectadas con aplicaciones móviles nativas. Creador de ecosistemas digitales de misión crítica como Servi Intel.",
  location: "Cartagena, Colombia (GMT-5)",
  email: "contacto@inventustech.com",
  whatsapp: "573000000000",
  github: "https://github.com",
  availability: "Disponible para Arquitectura Backend, Sistemas Cloud & Desarrollo de Ecosistemas"
};

export const projectsData = [
  {
    id: "serviintel-ops",
    number: "01",
    total: "06",
    title: "Servi Intel",
    subtitle: "Plataforma de Operaciones de Campo & Geo-Ticketing",
    badge: "01 / ENTERPRISE & FIREBASE CLOUD",
    category: "Ecosistema Web & Móvil",
    year: "2026",
    role: "Lead Systems Architect & Full-Stack Engineer",
    headline: "Sincronización Cloud Firestore Sub-38ms, Operación Offline Atómica y 0 KB de Overhead Web",
    description: "Ecosistema de misión crítica diseñado para eliminar la pérdida de datos operativos en campo y reducir costos de gestión. Conecta una consola web administrativa ultra-ligera en JavaScript Vanilla (0 KB de sobrecarga de frameworks) con una app móvil Flutter nativa para operarios en terreno. Garantiza disponibilidad del 99.99% mediante geocercas satelitales en vivo y una cola de reintentos atómicos sin dependencia de cobertura móvil.",
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
      { label: "Latencia de Sincronización", val: "< 38 ms" },
      { label: "Resiliencia Offline", val: "100% Atómico" },
      { label: "Overhead Consola Web", val: "0 KB Framework" },
      { label: "Gobernanza & Seguridad", val: "RBAC Criptográfico" }
    ],
    highlights: [
      "Consola web ultra-ligera en JavaScript Vanilla: carga instantánea en menos de 0.5s y cero dependencias pesadas.",
      "Canales reactivos bidireccionales con Cloud Firestore para actualización y despacho inmediato de tickets de campo.",
      "Auditoría rigurosa de reglas de seguridad Firestore (Admin, Cliente, Operario) previniendo filtraciones de datos.",
      "Rastreo GPS satelital de fondo con consumo ultra-eficiente de batería para cuadrillas operativas en campo."
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
    id: "otek-powerapps",
    number: "02",
    total: "06",
    title: "Control Calidad Integrado",
    subtitle: "Suite Empresarial Power Apps, SharePoint & Power Automate",
    badge: "02 / CORPORATE PLATFORM @ O-TEK",
    category: "Power Apps & Cloud Automation",
    year: "2025 – 2026",
    role: "Power Platform Engineer & Enterprise Consultant",
    headline: "Validación Matemática ASTM en Planta y Reducción del 65% en Tiempos de Inspección",
    description: "Digitalización industrial integral para la planta de O-tek que sustituyó el 100% de planillas físicas por una plataforma táctil en Power Apps con autenticación corporativa SSO (Microsoft 365 Entra ID). Conectada a SharePoint Lists como base inmutable, evalúa desviaciones de espesor en tiempo real y dispara flujos en Power Automate que compilan y despachan reportes ejecutivos en HTML en menos de 2 segundos.",
    image: "/assets/projects/serviintel.png",
    tags: ["Power Apps Tablet", "Login M365 SSO", "SharePoint Lists DB", "Power Automate", "Power BI ETL", "Normas ASTM / ISO", "Seguridad RBAC", "Proyecto Corporativo @ O-tek"],
    demoType: "powerapps",
    githubUrl: null, // Proyecto corporativo interno confidencial
    demoUrl: "#view-otek-powerapps",
    accent: "#0ea5e9",
    accentGlow: "rgba(14, 165, 233, 0.25)",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% -10%, rgba(14, 165, 233, 0.16), rgba(8, 24, 43, 0.95) 60%, #040c17 100%)",
    ambientColor: "#08182b",
    deviceType: "tablet",
    themeTag: "CORPORATE QUALITY BLUE",
    metrics: [
      { label: "Optimización de Muestreo", val: "-65% de Tiempo" },
      { label: "Precisión de Registro", val: "0% Error (ASTM)" },
      { label: "Despacho de Reportes", val: "< 2s vía Automate" },
      { label: "Gobernanza Enterprise", val: "SSO M365 & RBAC" }
    ],
    highlights: [
      "Autenticación corporativa SSO Microsoft 365 con control de acceso por roles estrictos (Operario / Administrador).",
      "Interfaz táctil ergonómica para tablets en entorno de planta con validación inmediata contra normas ASTM/ISO.",
      "Conexión bidireccional a SharePoint Lists que audita desviaciones de espesor y calidad sin intervención manual.",
      "Flujos automatizados en Power Automate que generan reportes en HTML y los despachan a gerencia de forma instantánea."
    ],
    architectureFlow: [
      {
        step: "01",
        title: "Captura en Planta (Power Apps Tablet)",
        desc: "El inspector ingresa muestras y variables en una interfaz táctil optimizada con validación inmediata contra especificaciones ASTM/ISO."
      },
      {
        step: "02",
        title: "Base de Datos & Reglas (SharePoint Lists)",
        desc: "SharePoint procesa los registros de forma inmutable, comparando los valores capturados contra tablas maestras de ingeniería."
      },
      {
        step: "03",
        title: "Orquestación & Reporte (Power Automate)",
        desc: "Al guardar el registro, se dispara un flujo en la nube que compila el reporte HTML con formato corporativo y lo envía a supervisores."
      },
      {
        step: "04",
        title: "Inteligencia de Negocio (Power BI ETL)",
        desc: "Conexión directa con dashboards de Power BI para el monitoreo de mermas, variabilidad de espesores y control estadístico de procesos (CEP)."
      },
      {
        step: "05",
        title: "Gobernanza & Seguridad RBAC",
        desc: "Permisos granulares que garantizan que solo personal auditado pueda crear, ver o exportar datos de calidad de planta."
      }
    ],
    codeSnippet: {
      language: "powerfx",
      filename: "ValidationAndSubmit.fx",
      code: `// Power Fx: Validación de Tolerancias y Envío a SharePoint
With(
    {
        currentSpec: LookUp(
            'Especificaciones Tuberias SharePoint',
            DN = ddDN.Selected.Value && PN = ddPN.Selected.Value && SN = ddSN.Selected.Value
        ),
        espesorVal: Value(txtEspesor.Text),
        diametroVal: Value(txtDiametroExt.Text)
    },
    If(
        espesorVal < currentSpec.EspesorMin || espesorVal > currentSpec.EspesorMax,
        Notify("Alerta: Espesor fuera de tolerancia ASTM", NotificationType.Warning),
        
        // Registro Atómico en SharePoint
        Patch(
            'Control Laminado Calidad SharePoint',
            Defaults('Control Laminado Calidad SharePoint'),
            {
                Title: Concatenate(txtLote.Text, "-", ddMuestra.Selected.Value),
                FechaMuestreo: dpFecha.SelectedDate,
                DN_mm: ddDN.Selected.Value,
                PN_Bar: ddPN.Selected.Value,
                SN_Nm2: ddSN.Selected.Value,
                EspesorMedido: espesorVal,
                DiametroExtMedido: diametroVal,
                EstadoNorma: "CONFORME",
                Inspector: User().FullName
            }
        );
        // Disparo de Power Automate Flow
        'ReporteCalidad-PowerAutomate'.Run(txtLote.Text, User().Email);
        Notify("✓ Guardado en SharePoint y Reporte HTML enviado", NotificationType.Success)
    )
)`
    }
  },
  {
    id: "sopa-senior",
    number: "03",
    total: "06",
    title: "Sopa Senior",
    subtitle: "Juego Móvil Educativo & Monetización en Producción",
    badge: "03 / GOOGLE PLAY STORE & ADMOB",
    category: "Juego Móvil & Monetización",
    year: "2025 – 2026",
    role: "Mobile Game Developer & Publisher",
    headline: "Motor Procedural 2D a 60 FPS con Monetización Matemáticamente Optimizada en Google Play",
    description: "Juego móvil publicado en Google Play Store con firmado Android Release de producción. Impulsado por un motor procedural 2D desarrollado a medida que genera más de 10,000 matrices de palabras únicas al vuelo a 60 FPS. Implementa una estrategia de monetización no invasiva con Google AdMob y compras in-app con persistencia local para remoción de anuncios.",
    image: "/assets/projects/serviintel.png",
    tags: ["Flutter Nativo", "Google Play Store", "Google AdMob", "In-App Purchases", "Procedural Engine", "Android SDK"],
    demoType: "store",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.inventus.sopasenior",
    githubUrl: "https://github.com",
    demoUrl: "https://play.google.com/store/apps/details?id=com.inventus.sopasenior",
    accent: "#f59e0b",
    accentGlow: "rgba(245, 158, 11, 0.25)",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% -10%, rgba(245, 158, 11, 0.16), rgba(38, 22, 5, 0.95) 60%, #0d0701 100%)",
    ambientColor: "#1c1003",
    deviceType: "phone-vertical",
    themeTag: "AMBER GOLDEN PLAY",
    metrics: [
      { label: "Disponibilidad Real", val: "Google Play Store" },
      { label: "Motor Algorítmico", val: "Procedural 60 FPS" },
      { label: "Retención de Usuarios", val: "Frecuencia 1:3 Ads" },
      { label: "Monetización", val: "AdMob + IAP Vitalicio" }
    ],
    highlights: [
      "Publicación y distribución real en Google Play Store cumpliendo normativas de seguridad Android.",
      "Motor algorítmico procedural que genera tableros 2D balanceados con resolución instantánea de cruces de palabras.",
      "Integración de Google AdMob optimizada con cadencia no intrusiva para maximizar retención y eCPM.",
      "Módulo de compras in-app para remoción permanente de publicidad con persistencia offline de transacciones."
    ],
    codeSnippet: {
      language: "dart",
      filename: "ad_frequency_controller.dart",
      code: `// lib/controllers/ad_frequency_controller.dart
import 'package:google_mobile_ads/google_mobile_ads.dart';

class AdFrequencyController {
  int _levelsSinceLastAd = 0;
  static const int _adInterval = 3;
  InterstitialAd? _interstitialAd;

  /// Muestra anuncio cada 3 niveles protegiendo la experiencia del usuario
  void onLevelCompleted(Function onContinue) {
    _levelsSinceLastAd++;
    if (_levelsSinceLastAd >= _adInterval && _interstitialAd != null) {
      _levelsSinceLastAd = 0;
      _interstitialAd!.show();
      _interstitialAd = null;
      _loadNextInterstitial();
    } else {
      onContinue();
    }
  }
}`
    }
  },
  {
    id: "lovecost-nido",
    number: "04",
    total: "06",
    title: "LoveCost / Nido",
    subtitle: "Gestión Financiera Inteligente & 'Disponible Real'",
    badge: "04 / FINTECH & FLUTTER",
    category: "Fintech & App Móvil",
    year: "2026",
    role: "Lead Mobile Architect & UI Engineer",
    headline: "Arquitectura 100% Offline-First con Consultas NoSQL Sub-1.2ms (Isar DB) y 'Disponible Real'",
    description: "Plataforma de finanzas personales diseñada bajo el principio de soberanía total de datos: opera sin servidores externos ejecutando consultas de flujo de caja en menos de 1.2 milisegundos sobre Isar DB en memoria. Su algoritmo dinámico deduce compromisos futuros para calcular el 'Disponible Real' al instante y evitar malas decisiones de gasto.",
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
      { label: "Latencia Consulta DB", val: "< 1.2 ms (Isar)" },
      { label: "Cálculo Financiero", val: "'Disponible Real'" },
      { label: "Soberanía de Datos", val: "100% Offline Local" },
      { label: "Rendimiento Visual", val: "60 FPS en OLED" }
    ],
    highlights: [
      "Cálculo matemático instantáneo de 'Disponible Real' descontando compromisos futuros sin latencia de red.",
      "Categorización cronológica adaptativa que prioriza la frecuencia de uso del usuario.",
      "Extensiones de tema Flutter con contraste óptico calibrado para reducir consumo en pantallas OLED."
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
    id: "days-focus-flow",
    number: "05",
    total: "06",
    title: "Days: focus.flow",
    subtitle: "Organización de Días & Gamificación Zen",
    badge: "05 / PRODUCTIVITY & UX",
    category: "App Móvil de Productividad",
    year: "2026",
    role: "Product Designer & Flutter Engineer",
    headline: "Productividad Físico-Inercial sin Formularios y Algoritmo Anti-Procrastinación",
    description: "Aplicación de gestión y enfoque diario que elimina la fricción de entrada de datos mediante interacciones de swipe físico calibradas al píxel. Estructura la jornada en tres espacios (Menú, Estantes y Radar), incorpora un selector estocástico (tómbola) diseñado psicológicamente contra la parálisis por decisión y sincroniza tareas clave con el widget nativo de Android.",
    image: "/assets/projects/days.png",
    tags: ["Flutter 3.x", "Swipe Gestures", "Android Home Widget", "Sage Palette #8B9A86", "Custom Animations", "Hive DB"],
    demoType: "days",
    githubUrl: "https://github.com",
    demoUrl: "#view-days",
    accent: "#8B9A86",
    accentGlow: "rgba(139, 154, 134, 0.25)",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% -10%, rgba(139, 154, 134, 0.16), rgba(20, 28, 22, 0.95) 60%, #080c09 100%)",
    ambientColor: "#141c16",
    deviceType: "phone-vertical",
    themeTag: "ZEN SAGE GREEN",
    metrics: [
      { label: "Entrada de Datos", val: "0 Formularios (Swipe)" },
      { label: "Espacios de Enfoque", val: "Menú / Estantes / Radar" },
      { label: "Psicología de Acción", val: "Tómbola Estocástica" },
      { label: "Integración Nivel SO", val: "Android Home Widget" }
    ],
    highlights: [
      "Sistema 'Radar' diario con anclaje de tareas prioritarias para evitar sobrecarga cognitiva.",
      "Microinteracciones gestuales con inercia física que incentivan la finalización de objetivos.",
      "Paleta cromática zen (#8B9A86) diseñada para mitigar la fatiga visual en uso intensivo."
    ],
    codeSnippet: {
      language: "dart",
      filename: "daily_radar_controller.dart",
      code: `// lib/controllers/daily_radar_controller.dart
import 'package:flutter/material.dart';

class DailyRadarController extends ChangeNotifier {
  final List<String> _dailyAnchors = [];
  int _energyLevel = 3; // 1 (bajo) a 5 (óptimo)

  List<String> get dailyAnchors => List.unmodifiable(_dailyAnchors);
  int get energyLevel => _energyLevel;

  void toggleAnchor(String taskId) {
    if (_dailyAnchors.contains(taskId)) {
      _dailyAnchors.remove(taskId);
    } else if (_dailyAnchors.length < 3) {
      _dailyAnchors.add(taskId);
    }
    notifyListeners();
  }

  void updateEnergy(int level) {
    _energyLevel = level.clamp(1, 5);
    notifyListeners();
  }
}`
    }
  },
  {
    id: "paz-hoy",
    number: "06",
    total: "06",
    title: "Paz Hoy",
    subtitle: "Mindfulness, Frases Diarias & Widgets Nativos de Pantalla de Inicio",
    badge: "06 / MINDFULNESS & HOME WIDGETS",
    category: "App Móvil Flutter & Home Widget",
    year: "2026",
    role: "Lead Mobile Engineer & UI/UX Designer",
    headline: "Sincronización Nativa con Home Widgets (Android/iOS) y Editor Tipográfico en Tiempo Real",
    description: "Aplicación móvil nativa en Flutter concebida para la serenidad mental y la personalización estética. Sincroniza estados y frases dinámicas directamente con los Widgets de Pantalla de Inicio (Android/iOS) usando App Groups y SharedPreferences, respaldada por un motor de estilizado con Google Fonts en tiempo real y exportación de imágenes en alta resolución.",
    image: "/assets/projects/paz_hoy.jpg",
    tags: ["Flutter 3.x", "Home Widget", "Google Fonts", "Provider", "Local Notifications", "Screenshot Engine", "Material 3"],
    demoType: "lifestyle",
    githubUrl: "https://github.com",
    demoUrl: "#view-pazhoy",
    accent: "#818cf8",
    accentGlow: "rgba(129, 140, 248, 0.22)",
    bgGradient: "radial-gradient(ellipse 80% 80% at 50% -10%, rgba(129, 140, 248, 0.16), rgba(20, 15, 38, 0.95) 60%, #0a0614 100%)",
    ambientColor: "#120a22",
    deviceType: "phone",
    themeTag: "SERENE INDIGO & MINDFULNESS",
    metrics: [
      { label: "Sincronización Widget", val: "Android / iOS App Group" },
      { label: "Motor Tipográfico", val: "Google Fonts Runtime" },
      { label: "Gestión de Estado", val: "Provider + Local Sync" },
      { label: "Exportación Gráfica", val: "Screenshot Hi-Res" }
    ],
    highlights: [
      "Sincronización nativa en segundo plano con widgets de pantalla de inicio en Android e iOS mediante el plugin home_widget.",
      "Editor de estilos visuales en vivo con tipografías Google Fonts, sombras, paletas de color e interlineado.",
      "Motor de renderizado y captura de imágenes en alta resolución para compartir en redes sociales y guardar offline."
    ],
    codeSnippet: {
      language: "dart",
      filename: "style_provider.dart",
      code: `// lib/src/providers/style_provider.dart
import 'package:flutter/material.dart';
import 'package:home_widget/home_widget.dart';
import 'package:shared_preferences/shared_preferences.dart';

class StyleProvider extends ChangeNotifier {
  QuoteStyle _style = const QuoteStyle();
  QuoteStyle get style => _style;

  Future<void> syncStyleToWidget() async {
    // Sincronización atómica con el Home Widget nativo
    await HomeWidget.saveWidgetData<int>('widget_bg_color', _style.backgroundColor.toARGB32());
    await HomeWidget.saveWidgetData<int>('widget_text_color', _style.textColor.toARGB32());
    await HomeWidget.saveWidgetData<double>('widget_font_size', _style.fontSize);

    await HomeWidget.updateWidget(
      name: 'QuoteWidgetProvider',
      androidName: 'com.example.pazhoy.QuoteWidgetProvider',
    );
  }

  void setFontFamily(String? font) {
    _style = _style.copyWith(fontFamily: font);
    notifyListeners();
    syncStyleToWidget();
  }
}`
    }
  }
];

export const technologiesStudy = [
  {
    category: "Arquitectura Cloud & Backend",
    summary: "Sistemas serverless en tiempo real, bases de datos no relacionales, autenticación segura y gobernanza de datos estricta.",
    skills: ["Firebase Firestore (Realtime DB)", "Cloud Functions (Node.js/TS)", "APIs REST & WebSockets", "Firestore Security Rules (RBAC)", "Orquestación & Microservicios Cloud"]
  },
  {
    category: "Consolas Web & Ecosistemas Digitales",
    summary: "Desarrollo de paneles administrativos de ultra-alta velocidad (0 KB overhead), consolas operativas y dashboards ejecutivos.",
    skills: ["JavaScript Vanilla & React 19", "Consolas Web de Misión Crítica", "Tailwind CSS v4", "Power Apps & Power Automate", "Inteligencia de Negocio & ETL"]
  },
  {
    category: "Desarrollo Móvil Nativo",
    summary: "Aplicaciones integradas para iOS y Android con Flutter a 60–120 FPS conectadas sincrónicamente con el backend.",
    skills: ["Flutter 3.x & Dart 3.x", "State Management (Riverpod / Bloc)", "Resiliencia & Persistencia Local", "Integración GPS & Telemetría", "Clean Architecture & TDD"]
  }
];

export const servicesOffer = [
  {
    title: "Arquitectura Cloud & Backend Serverless",
    subtitle: "Firebase Firestore & Cloud Functions",
    desc: "Diseño e implemento sistemas backend en la nube reactivos y en tiempo real, funciones serverless en Node.js/TypeScript, reglas de seguridad RBAC estrictas y sincronización bidireccional de baja latencia (<38ms)."
  },
  {
    title: "Ecosistemas Web & Consolas Operativas",
    subtitle: "Plataformas de Gestión & Dashboards",
    desc: "Construcción de consolas administrativas y plataformas web de alta velocidad para el control de operaciones en vivo, despacho de tickets, gestión de cuadrillas y visualización estratégica de métricas."
  },
  {
    title: "Desarrollo de Apps Móviles Nativas",
    subtitle: "iOS & Android con Flutter",
    desc: "Desarrollo completo de aplicaciones móviles integradas a la infraestructura backend, con navegación a 60–120 FPS, firmado Android/iOS y despliegue real en Apple App Store y Google Play."
  },
  {
    title: "Sistemas Empresariales & Automatización",
    subtitle: "Power Platform, SharePoint & Power Automate",
    desc: "Digitalización de procesos industriales y corporativos con validación de reglas de calidad, inicio de sesión seguro Microsoft 365 (SSO) y flujos automáticos de generación de reportes."
  }
];

export const skillsList = [
  { 
    category: "Backend & Cloud", 
    items: [
      "Firebase Firestore en Tiempo Real", 
      "Cloud Functions Serverless", 
      "Reglas de Seguridad RBAC", 
      "APIs REST & WebSockets", 
      "Cloud Storage & Security"
    ] 
  },
  { 
    category: "Web & Consolas Operativas", 
    items: [
      "JavaScript Vanilla (0 KB Overhead)", 
      "React 19 & Vite", 
      "Tailwind CSS v4", 
      "Power Apps & Power Automate", 
      "Dashboards & ETL Analytics"
    ] 
  },
  { 
    category: "Móvil & Arquitectura", 
    items: [
      "Flutter Nativo (iOS & Android)", 
      "Dart 3.x Moderno", 
      "Gestión de Estado (Riverpod/Bloc)", 
      "Publicación en Google Play Store", 
      "Clean Architecture & TDD"
    ] 
  }
];

// Secondary / Additional Projects — displayed in the "Más Proyectos" grid
export const secondaryProjectsData = [
  {
    id: "serviintel-operario",
    title: "Servi Intel Operarios",
    subtitle: "App móvil para operarios de campo",
    category: "App Móvil de Campo & Geolocalización",
    year: "2026",
    accent: "#0284c7",
    deviceType: "phone-vertical",
    description: "Aplicación móvil en Flutter para operarios en campo con recepción de tickets reactivos, navegación GPS y firmado de órdenes con evidencia fotográfica.",
    tags: ["Flutter", "Google Maps", "Firestore Sync", "Background GPS"],
    highlights: [
      "Recepción y actualización de estado de tickets en tiempo real.",
      "Captura de evidencia fotográfica con almacenamiento en Cloud Storage.",
      "Modo bajo consumo de batería durante seguimiento satelital."
    ],
    metrics: [
      { label: "Plataforma", val: "Android / iOS" },
      { label: "Sincronización", val: "Firestore Realtime" },
      { label: "Firmado Release", val: "Google Play Signed" },
      { label: "Estado", val: "Producción" }
    ],
    codeSnippet: {
      language: "dart",
      filename: "operator_ticket_view.dart",
      code: `// lib/views/operator_ticket_view.dart
class OperatorTicketView extends StatelessWidget {
  final String ticketId;
  const OperatorTicketView({required this.ticketId});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<DocumentSnapshot>(
      stream: FirebaseFirestore.instance.collection('tickets').doc(ticketId).snapshots(),
      builder: (context, snapshot) {
        if (!snapshot.hasData) return const CircularProgressIndicator();
        final data = snapshot.data!.data() as Map<String, dynamic>;
        return TicketStatusCard(data: data);
      },
    );
  }
}`
    },
    appSimulator: "serviintel-operario"
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