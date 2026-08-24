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
    id: "serviintel-ops",
    number: "01",
    total: "06",
    title: "Servi Intel",
    subtitle: "Plataforma de Operaciones de Campo & Geo-Ticketing",
    badge: "01 / ENTERPRISE & FIREBASE CLOUD",
    category: "Ecosistema Web & Móvil",
    year: "2026",
    role: "Full-Stack System Architect",
    headline: "Sincronización Cloud Firestore sub-38ms, telemetría GPS continua y persistencia offline atómica",
    description: "Ecosistema de misión crítica que conecta una consola web administrativa en Vanilla JS puro (0 KB overhead) con una app móvil Flutter para técnicos en terreno. Implementa arquitectura Zero-Downtime, geocercas en vivo y cola de reintentos atómicos que garantiza 0% pérdida de datos sin cobertura móvil.",
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
      { label: "Tolerancia de Red", val: "Offline Atómico" },
      { label: "Despliegue Móvil", val: "Google Play Store" },
      { label: "Seguridad & Roles", val: "RBAC Criptográfico" }
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
    id: "otek-powerapps",
    number: "02",
    total: "06",
    title: "Control Calidad Integrado",
    subtitle: "Suite Empresarial Power Apps, SharePoint & Power Automate",
    badge: "02 / CORPORATE PLATFORM @ O-TEK",
    category: "Power Apps & Cloud Automation",
    year: "2025 – 2026",
    role: "Power Platform Developer (Proyecto Interno O-tek)",
    headline: "Validación matemática de tolerancias ASTM en planta con despacho de informes HTML en < 2 segundos",
    description: "Digitalización empresarial integral para O-tek que sustituyó el 100% de planillas en papel por formularios táctiles en Power Apps con autenticación de inicio de sesión SSO (Microsoft 365 Entra ID) y permisos RBAC por roles (Operario / Admin). Conectada a SharePoint Lists como base inmutable, evalúa desviaciones de espesor y dispara flujos en Power Automate que compilan y despachan reportes ejecutivos en HTML.",
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
      { label: "Ahorro de Tiempo", val: "-65% de Muestreo" },
      { label: "Errores de Registro", val: "Reducción de errores (Validación ASTM)" },
      { label: "Despacho Reportes", val: "< 2s vía Automate" },
      { label: "Gobernanza de Datos", val: "Login M365 & RBAC" }
    ],
    highlights: [
      "Autenticación segura de usuario mediante inicio de sesión Microsoft 365 (SSO) con control de acceso por roles (Operario / Administrador).",
      "Diseño de interfaz empresarial para Tablet en Power Apps optimizado para toma de muestras en planta y laboratorio.",
      "Conexión bidireccional a SharePoint Lists como base de datos con verificación instantánea de tolerancias mínimas y nominales.",
      "Flujos de Power Automate que generan y despachan reportes con diseño HTML a supervisores al finalizar cada formulario.",
      "Eliminación total del papel y planillas desincronizadas, facilitando la extracción directa para análisis y KPIs en Power BI."
    ],
    architectureFlow: [
      {
        step: "01",
        title: "Captura en Planta (Power Apps Tablet)",
        desc: "El laboratorista/operario ingresa lote, muestra y variables dimensionales en una interfaz táctil ergonómica con validación inmediata contra normas ASTM/ISO."
      },
      {
        step: "02",
        title: "Base de Datos & Reglas (SharePoint Lists)",
        desc: "SharePoint actúa como repositorio seguro. Compara automáticamente los valores ingresados contra las tablas maestras de diseño y especificación nominal."
      },
      {
        step: "03",
        title: "Orquestación & Reporte (Power Automate)",
        desc: "Al guardar el registro, se dispara un flujo en la nube que compila el reporte en HTML con formato corporativo y lo envía por correo electrónico a supervisores."
      },
      {
        step: "04",
        title: "Inteligencia de Negocio (Power BI ETL)",
        desc: "Conexión en tiempo real con dashboards de Power BI para el monitoreo de mermas, variabilidad de espesores y control estadístico de procesos (CEP)."
      },
      {
        step: "05",
        title: "Gobernanza & Seguridad RBAC",
        desc: "Permisos granulares que garantizan que solo el personal autorizado pueda visualizar, crear o modificar datos críticos de calidad."
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
    headline: "Motor procedural 2D con +10,000 matrices únicas y monetización matemática en Google Play",
    description: "Juego móvil publicado en Google Play con firmado Android Release, impulsado por un motor algorítmico procedural 2D que genera matrices de palabras al vuelo a 60 FPS sin patrones repetitivos. Optimiza la retención mediante monetización no invasiva: intercala anuncios de Google AdMob (1 cada 3 niveles exactos) y compras in-app con persistencia local para remoción permanente de publicidad.",
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
      { label: "Plataforma Real", val: "Google Play Store" },
      { label: "Generación 2D", val: "Procedural al Vuelo" },
      { label: "Frecuencia Ads", val: "1 cada 3 niveles" },
      { label: "Monetización", val: "AdMob + IAP Vitalicio" }
    ],
    highlights: [
      "Publicación y distribución real en Google Play Store cumpliendo normativas y firmado de release Android.",
      "Motor algorítmico procedural que genera tableros 2D balanceados con resolución instantánea de cruces.",
      "Integración de Google AdMob optimizada con cadencia no intrusiva de anuncios para maximizar eCPM y retención.",
      "Módulo de compras in-app para remoción permanente de publicidad con persistencia offline de compras."
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
    headline: "Arquitectura móvil 100% offline-first con motor NoSQL Isar DB (sub-1.2ms) y 'Disponible Real'",
    description: "Fintech de finanzas personales diseñada para soberanía absoluta de datos: opera sin servidores externos ejecutando consultas de flujo de caja en menos de 1.2 milisegundos sobre Isar DB local. Su algoritmo dinámico descuenta compromisos futuros para calcular el 'Disponible Real' al instante, adaptándose a pantallas OLED con microconsumo de batería.",
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
      { label: "Cálculo de Flujo", val: "'Disponible Real'" },
      { label: "Privacidad de Datos", val: "100% Offline (Zero Cloud)" },
      { label: "Optimización OLED", val: "60 FPS Constante" }
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
    id: "days-focus-flow",
    number: "05",
    total: "06",
    title: "Days: focus.flow",
    subtitle: "Organización de Días & Gamificación Zen",
    badge: "05 / PRODUCTIVITY & UX",
    category: "App Móvil de Productividad",
    year: "2026",
    role: "Product Designer & Flutter Engineer",
    headline: "Productividad física con gestos de inercia, selector estocástico y widget nativo de Android",
    description: "Aplicación de gestión y enfoque diario que erradica la fricción de formularios mediante interacciones de swipe físico calibradas al píxel. Estructura la jornada en tres espacios (Menú, Estantes y Radar), incorpora un selector estocástico (tómbola) contra la parálisis por decisión y sincroniza tareas críticas con el widget de inicio de Android.",
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
      { label: "Entrada de Datos", val: "0 Formularios (Físico)" },
      { label: "Espacios de Enfoque", val: "Menú / Estantes / Radar" },
      { label: "Anti-Procrastinación", val: "Tómbola Estocástica" },
      { label: "Integración SO", val: "Android Widget Nativo" }
    ],
    highlights: [
      "Sistema 'Radar' diario con anclaje de tareas clave para evitar la saturación mental.",
      "Microinteracciones táctiles y físicas que recompensan la finalización de objetivos.",
      "Paleta visual relajante #8B9A86 que reduce la fatiga visual en sesiones prolongadas."
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
    headline: "Sincronización nativa con Home Widgets en Android/iOS, editor tipográfico dinámico con Google Fonts y almacenamiento offline-first",
    description: "Aplicación móvil nativa en Flutter concebida para la serenidad mental, reflexión diaria y personalización estética profunda. Integra sincronización en tiempo real con Widgets de Pantalla de Inicio (Home Widgets de Android/iOS) usando SharedPreferences y App Groups, un motor de estilizado visual dinámico (Google Fonts, paletas de color, efectos de sombra/stroke) y exportación gráfica de alta resolución.",
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
      { label: "Home Widget Sync", val: "Android / iOS App Group" },
      { label: "Motor Tipográfico", val: "Google Fonts Runtime" },
      { label: "Gestor de Estado", val: "Provider + SharedPreferences" },
      { label: "Exportación Gráfica", val: "Screenshot Hi-Res" }
    ],
    highlights: [
      "Sincronización nativa con widgets de pantalla de inicio en Android e iOS mediante el plugin home_widget.",
      "Editor de estilos dinámico con tipografías Google Fonts, ajustes de interlineado, fondos y efectos de texto.",
      "Generación de capturas de pantalla en alta resolución para compartir y sistema de frases favoritas offline."
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