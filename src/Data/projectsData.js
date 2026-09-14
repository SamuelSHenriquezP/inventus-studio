// src/Data/projectsData.js

export const personalInfo = {
  name: "Samuel Henríquez",
  studio: "Inventus Tech Studio",
  role: "Full-Stack Software Architect & Cloud Engineer",
  specialization: "Backend Empresarial (Java & Spring Boot, Python & FastAPI), Automatización n8n, APIs de IA, SQL & NoSQL, Flutter & Web",
  bio: "Diseño y construyo arquitecturas backend escalables (Java, Spring Boot, Python, FastAPI), orquestación con n8n y APIs de Inteligencia Artificial, bases de datos relacionales SQL y NoSQL, junto a aplicaciones móviles nativas en Flutter y consolas web.",
  location: "Cartagena, Colombia (GMT-5)",
  email: "contacto@inventustech.com",
  phone: "+57 305 220 5525",
  whatsapp: "573052205525",
  github: "https://github.com/SamuelSHenriquezP",
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
    githubUrl: null, // Proyecto corporativo confidencial
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
    id: "enterprise-powerapps",
    number: "02",
    total: "06",
    title: "Control Calidad Integrado",
    subtitle: "Suite Empresarial Power Apps, SharePoint & Power Automate",
    badge: "02 / CORPORATE PLATFORM SUITE",
    category: "Power Apps & Cloud Automation",
    year: "2025 – 2026",
    role: "Power Platform Engineer & Enterprise Consultant",
    headline: "Validación Matemática ASTM en Planta y Reducción del 65% en Tiempos de Inspección",
    description: "Digitalización industrial integral para planta de fabricación de alta precisión que sustituyó el 100% de planillas físicas por una plataforma táctil en Power Apps con autenticación corporativa SSO (Microsoft 365 Entra ID). Conectada a SharePoint Lists como base inmutable, evalúa desviaciones de espesor en tiempo real y dispara flujos en Power Automate que compilan y despachan reportes ejecutivos en HTML en menos de 2 segundos.",
    image: "/assets/projects/serviintel.png",
    tags: ["Power Apps Tablet", "Login M365 SSO", "SharePoint Lists DB", "Power Automate", "Power BI ETL", "Normas ASTM / ISO", "Seguridad RBAC", "Plataforma Corporativa de Calidad"],
    demoType: "powerapps",
    githubUrl: null, // Proyecto corporativo interno confidencial
    demoUrl: "#view-enterprise-powerapps",
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
    googlePlayUrl: "https://play.google.com/store/apps/details?id=com.sunliesstudio.sopadeletras",
    githubUrl: "https://github.com/SamuelSHenriquezP/Sopa-de-letras",
    demoUrl: "https://play.google.com/store/apps/details?id=com.sunliesstudio.sopadeletras",
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
    githubUrl: "https://github.com/SamuelSHenriquezP/lovecost",
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
    githubUrl: "https://github.com/SamuelSHenriquezP/days",
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
    githubUrl: "https://github.com/SamuelSHenriquezP/pazhoy-flutter-project",
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
    category: "Backend Empresarial, APIs & Automatización",
    summary: "Arquitectura de microservicios robustos, APIs asíncronas de alto rendimiento y flujos automatizados con n8n.",
    skills: ["Java & Spring Boot (Microservicios)", "Python & FastAPI (Async APIs)", "Automatización n8n & Webhooks", "Node.js & Express Serverless", "Arquitectura Limpia & Hexagonal"]
  },
  {
    category: "Inteligencia Artificial & Bases de Datos",
    summary: "Integración de modelos y APIs de IA, procesamiento inteligente y modelado relacional y NoSQL de alta integridad.",
    skills: ["APIs de IA (OpenAI, Gemini, Claude)", "Agentes & Automatizaciones Inteligentes", "SQL en General (PostgreSQL, MySQL, SQLite)", "MongoDB & Firebase Firestore", "Optimización de Consultas & Índices"]
  },
  {
    category: "Móvil, Web & Versionamiento CI/CD",
    summary: "Desarrollo integral de aplicaciones móviles nativas, consolas web y control de versiones profesional.",
    skills: ["Flutter 3.x & Dart (iOS & Android)", "Git & GitHub (GitFlow, CI/CD)", "React 19 & JavaScript Vanilla", "Tailwind CSS v4", "Docker & Despliegue Continuo"]
  }
];

export const servicesOffer = [
  {
    title: "Arquitectura Backend & APIs de Alto Rendimiento",
    subtitle: "Java Spring Boot & Python FastAPI",
    desc: "Diseño e implemento arquitecturas backend robustas y microservicios escalables utilizando Java con Spring Boot y Python con FastAPI, con seguridad integral, endpoints RESTful y baja latencia."
  },
  {
    title: "Automatización con n8n & Soluciones con IA",
    subtitle: "Flujos de Trabajo Autónomos & APIs de LLMs",
    desc: "Construyo pipelines de automatización con n8n orquestando webhooks y APIs de Inteligencia Artificial (OpenAI, Gemini, Claude) para clasificar datos, generar alertas y agilizar operaciones empresariales."
  },
  {
    title: "Bases de Datos SQL & NoSQL de Alta Fidelidad",
    subtitle: "PostgreSQL, MySQL, SQLite, MongoDB & Firestore",
    desc: "Diseño modelos de datos relacionales y documentales optimizados para transaccionalidad, integridad, consultas complejas y sincronización reactiva en tiempo real."
  },
  {
    title: "Apps Móviles Nativas & Ecosistemas Web",
    subtitle: "Flutter (iOS/Android), React 19 & Git/GitHub",
    desc: "Desarrollo aplicaciones móviles multiplataforma fluidas a 60–120 FPS en Flutter y plataformas web de control operacional en React y Vanilla JS, respaldado por flujos profesionales en Git y CI/CD."
  }
];

export const skillsList = [
  { 
    category: "Backend & APIs", 
    items: [
      "Java & Spring Boot", 
      "Python & FastAPI", 
      "APIs RESTful & Microservicios", 
      "Node.js & Express", 
      "Cloud Functions Serverless"
    ] 
  },
  { 
    category: "IA & Automatización", 
    items: [
      "Automatización n8n & Webhooks", 
      "APIs de IA (OpenAI, Gemini, Claude)", 
      "Orquestación de Pipelines", 
      "Procesamiento con Agentes IA", 
      "Extracción & Análisis Inteligente"
    ] 
  },
  { 
    category: "Bases de Datos & Versionamiento", 
    items: [
      "SQL en General (PostgreSQL, MySQL, SQLite)", 
      "MongoDB & Firebase Firestore", 
      "Git & GitHub (GitFlow, CI/CD)", 
      "Docker & Contenedores", 
      "Reglas de Seguridad & RBAC"
    ] 
  },
  { 
    category: "Móvil & Consolas Web", 
    items: [
      "Flutter Nativo (iOS & Android)", 
      "Dart 3.x Moderno", 
      "JavaScript Vanilla (0 KB Overhead)", 
      "React 19 & Vite", 
      "Tailwind CSS v4"
    ] 
  }
];

// Secondary / Additional Projects — displayed in the "Más Proyectos" grid
export const secondaryProjectsData = [
  {
    id: "crucigramas",
    title: "Crucigramas Pro",
    subtitle: "Juego móvil de palabras cruzadas y vocabulario en Flutter",
    category: "Juego Móvil & Algoritmos 2D",
    year: "2026",
    accent: "#f59e0b",
    deviceType: "phone-vertical",
    githubUrl: "https://github.com/SamuelSHenriquezP/Crucigramas",
    description: "Aplicación de crucigramas inteligentes para Android desarrollada con Flutter. Integra un motor algorítmico de generación de cuadrículas, pistas contextuales, teclado virtual optimizado y persistencia local de partidas resueltas con SharedPreferences.",
    tags: ["Flutter Nativo", "Dart 3.x", "Generación Procedural", "SharedPreferences", "Provider", "Android Release"],
    highlights: [
      "Cuadrícula matricial interactiva 5x5 a 15x15 con navegación por celdas asistida.",
      "Algoritmo de validación inmediata de palabras horizontales y verticales.",
      "Persistencia de puntajes históricos y sistema de pistas progresivas."
    ],
    metrics: [
      { label: "Plataforma", val: "Android Nativo" },
      { label: "Rendimiento", val: "60 FPS Fluidos" },
      { label: "Release", val: "APK Firmado" },
      { label: "Estado", val: "Listo para Despliegue" }
    ],
    codeSnippet: {
      language: "dart",
      filename: "crossword_game_screen.dart",
      code: `// lib/views/game/crossword_game_screen.dart
class CrosswordGameScreen extends StatefulWidget {
  final CrosswordPuzzle puzzle;
  const CrosswordGameScreen({Key? key, required this.puzzle}) : super(key: key);

  @override
  State<CrosswordGameScreen> createState() => _CrosswordGameState();
}`
    },
    appSimulator: "crucigramas"
  },
  {
    id: "lev-sanctuary",
    title: "Lev — Santuario & Bienestar",
    subtitle: "App de mindfulness, hábitos conscientes y paisajes sonoros",
    category: "Bienestar & Audio Reactivo",
    year: "2026",
    accent: "#10b981",
    deviceType: "phone-vertical",
    githubUrl: "https://github.com/SamuelSHenriquezP/Lev",
    description: "Santuario digital para el equilibrio mental y la introspección personal desarrollado en Flutter. Cuenta con ejercicios somáticos guiados, paisajes sonoros espaciales 3D en frecuencias curativas (432Hz/528Hz), registro de emociones diarias y seguimiento de hábitos con estadísticas.",
    tags: ["Flutter", "Audioplayers", "Audio 3D 432Hz", "Hábitos Conscientes", "Shared Preferences", "Clean Architecture"],
    highlights: [
      "Reproducción multicanal de paisajes sonoros de fondo con Audioplayers.",
      "Temporizador somático de respiración sincronizada con pulsos orgánicos.",
      "Reframing cognitivo diario y diario íntimo cifrado localmente."
    ],
    metrics: [
      { label: "Audio", val: "Frecuencias 432Hz" },
      { label: "Persistencia", val: "Cifrado Local" },
      { label: "Release", val: "APK Producción" },
      { label: "Estado", val: "Completo" }
    ],
    codeSnippet: {
      language: "dart",
      filename: "companion_chat_screen.dart",
      code: `// lib/features/companion/presentation/companion_chat_screen.dart
class CompanionChatScreen extends StatelessWidget {
  const CompanionChatScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBgPrimary,
      body: SanctuaryWeatherSheet(),
    );
  }
}`
    },
    appSimulator: "lev"
  },
  {
    id: "office-clicker",
    title: "Corp Empire — Office Clicker",
    subtitle: "Juego tycoon corporativo incremental con física económica",
    category: "Juego Móvil & Economía 2D",
    year: "2025 – 2026",
    accent: "#f59e0b",
    deviceType: "phone-vertical",
    githubUrl: "https://github.com/Ssrx890/office_clicker",
    description: "Videojuego incremental y de estrategia económica en Flutter donde el jugador construye un imperio corporativo de tecnología. Incluye cálculo de ingresos pasivos por segundo, compras de edificios e infraestructura cloud, mecánicas de prestigio y monetización con AdMob e In-App Purchases.",
    tags: ["Flutter Game", "AdMob", "In-App Purchases", "Economía Incremental", "Fl Chart", "Audioplayers"],
    highlights: [
      "Motor de simulación matemática para flujos de caja exponenciales sin overflow.",
      "Animación de partículas y monedas flotantes en Canvas nativo.",
      "Métricas en vivo de ingresos/segundo con gráficos de crecimiento interactivos."
    ],
    metrics: [
      { label: "Motor", val: "Flutter 60 FPS" },
      { label: "Monetización", val: "AdMob & IAP" },
      { label: "Release", val: "APK Firmado" },
      { label: "Estado", val: "Producción" }
    ],
    codeSnippet: {
      language: "dart",
      filename: "game_screen.dart",
      code: `// lib/screens/game_screen.dart
class GameScreen extends StatefulWidget {
  const GameScreen({Key? key}) : super(key: key);

  @override
  State<GameScreen> createState() => _GameScreenState();
}`
    },
    appSimulator: "office-clicker"
  },
  {
    id: "sudoku-zen",
    title: "Sudoku Zen",
    subtitle: "Juego matemático clásico con estética zen japonesa",
    category: "Juego Móvil & Lógica Mental",
    year: "2026",
    accent: "#f59e0b",
    deviceType: "phone-vertical",
    githubUrl: "https://github.com/SamuelSHenriquezP/sudoku",
    description: "Juego mental de Sudoku 9x9 con validación algorítmica matemática instantánea, 4 modos de dificultad (Fácil, Medio, Difícil, Zen), modo borrador/notas para candidatos numéricos y un diseño estético sereno inspirado en texturas de madera y piedra japonesa.",
    tags: ["Flutter", "Algoritmo Backtracking", "9x9 Matrix", "Modo Notas", "Game Storage", "Minimalista"],
    highlights: [
      "Generador de tableros con algoritmo de backtracking y solución garantizada única.",
      "Modo lápiz dinámico para pre-anotación de posibles candidatos numéricos.",
      "Detección inteligente de conflictos por fila, columna y cuadrante 3x3."
    ],
    metrics: [
      { label: "Algoritmo", val: "Backtracking 9x9" },
      { label: "Dificultad", val: "4 Niveles" },
      { label: "Release", val: "APK Firmado" },
      { label: "Estado", val: "Producción" }
    ],
    codeSnippet: {
      language: "dart",
      filename: "sudoku_engine.dart",
      code: `// lib/managers/game_storage.dart
class GameStorage {
  static const String _boardKey = 'active_zen_sudoku';
  Future<void> saveCurrentGame(List<List<int>> board) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_boardKey, jsonEncode(board));
  }
}`
    },
    appSimulator: "sudoku-zen"
  },
  {
    id: "ink-wright",
    title: "Ink Wright — Studio Editorial",
    subtitle: "Estudio editorial móvil para escritores con compilación a PDF",
    category: "Productividad & Motores de Impresión",
    year: "2026",
    accent: "#e4e4e7",
    deviceType: "phone-vertical",
    githubUrl: "https://github.com/SamuelSHenriquezP/ink_wright",
    description: "Entorno editorial minimalista para novelistas y autores profesionales desarrollado en Flutter. Permite la estructuración por capítulos, mapas de personajes y tramas, contador dinámico de métricas de lectura y exportación directa a archivos PDF de imprenta a 300 DPI con sangrado editorial.",
    tags: ["Flutter", "PDF Engine (300 DPI)", "Printing", "Estructuración Literaria", "Zen Editor", "Monochrome"],
    highlights: [
      "Motor de compilación vectorial en Dart para renderizado de libros en formato PDF/X.",
      "Editor de texto libre de distracciones con modo máquina de escribir y conteo WPM.",
      "Mapa mental de líneas temporales de tramas y fichas de personajes vinculadas."
    ],
    metrics: [
      { label: "Salida", val: "PDF 300 DPI Imprenta" },
      { label: "Tipografía", val: "Baskerville Pro" },
      { label: "Release", val: "APK Release (81 MB)" },
      { label: "Estado", val: "Completo" }
    ],
    codeSnippet: {
      language: "dart",
      filename: "zen_editor_screen.dart",
      code: `// lib/screens/zen_editor_screen.dart
class ZenEditorScreen extends StatefulWidget {
  final ChapterModel chapter;
  const ZenEditorScreen({super.key, required this.chapter});

  @override
  State<ZenEditorScreen> createState() => _ZenEditorScreenState();
}`
    },
    appSimulator: "ink-wright"
  },
  {
    id: "finance-today",
    title: "FinanceToday",
    subtitle: "Control de gastos con automatización n8n y análisis predictivo con IA",
    category: "Fintech, IA & Automatización n8n",
    year: "2025 – 2026",
    accent: "#22d3ee",
    deviceType: "phone-vertical",
    githubUrl: "https://github.com/Ssrx890/financetoday",
    description: "Aplicación móvil para el control financiero personal y corporativo construida en Flutter. Integra almacenamiento local ultra-rápido en Hive NoSQL, orquestación de reportes y webhooks hacia flujos automatizados en n8n, y análisis predictivo de gastos mediante APIs de Inteligencia Artificial.",
    tags: ["Flutter", "Automatización n8n", "APIs de IA", "Hive NoSQL", "FlChart", "Fintech"],
    highlights: [
      "Sincronización reactiva por webhooks con n8n para orquestar alertas y reportes automáticos.",
      "Análisis predictivo de patrones financieros e insights de ahorro con APIs de IA.",
      "Base de datos NoSQL binaria en Hive con gráficos interactivos en FlChart."
    ],
    metrics: [
      { label: "Automatización", val: "n8n Cloud Webhooks" },
      { label: "Inteligencia", val: "APIs de IA (LLMs)" },
      { label: "Base de Datos", val: "Hive NoSQL Local" },
      { label: "Release", val: "APK Firmado (47 MB)" }
    ],
    codeSnippet: {
      language: "dart",
      filename: "main.dart",
      code: `// lib/main.dart
Future<bool> sendReportToN8n(String email, List expenses) async {
  const webhookUrl = "https://fluttersam.app.n8n.cloud/webhook/finance-report";
  final response = await http.post(
    Uri.parse(webhookUrl),
    headers: {"Content-Type": "application/json"},
    body: jsonEncode({"email": email, "expenses": expenses, "timestamp": DateTime.now().toIso8601String()}),
  );
  return response.statusCode == 200;
}`
    },
    appSimulator: "finance-today"
  },
  {
    id: "tribunall",
    title: "Tribunall",
    subtitle: "Juego social móvil de juicios, acusados y sentencias cómicas",
    category: "Juego Móvil Social & Multijugador",
    year: "2025",
    accent: "#ffbd2e",
    deviceType: "phone-vertical",
    githubUrl: "https://github.com/Ssrx890/Tribunall",
    description: "Juego party y social desarrollado en Flutter donde los jugadores asumen roles de juez, acusados y jurado. Incluye generación procedural de cargos absurdos, cuenta regresiva de defensa de 30 segundos, deliberación con golpe de mazo y sentencias hilarantes.",
    tags: ["Flutter", "Juego Social", "Multijugador", "Audioplayers", "Oswald Font", "Party Game"],
    highlights: [
      "Motor de asignación aleatoria de juez, acusados y cargos delictivos humorísticos.",
      "Temporizador de defensa contrarreloj con efectos sonoros de mazo judicial.",
      "Veredictos dinámicos de culpabilidad y sentencias de castigo entre amigos."
    ],
    metrics: [
      { label: "Género", val: "Party Game Social" },
      { label: "Modos", val: "Local & Multijugador" },
      { label: "Arquitectura", val: "Clean / Provider" },
      { label: "Estado", val: "Producción" }
    ],
    codeSnippet: {
      language: "dart",
      filename: "pantalla_juicio.dart",
      code: `// lib/screens/pantalla_juicio.dart
class PantallaJuicio extends StatefulWidget {
  const PantallaJuicio({super.key});

  @override
  State<PantallaJuicio> createState() => _PantallaJuicioState();
}`
    },
    appSimulator: "tribunall"
  },
  {
    id: "den-electricos",
    title: "DEN Eléctricos",
    subtitle: "Catálogo e ingeniería de instalaciones eléctricas y domótica Loxone",
    category: "Web Industrial & Domótica",
    year: "2026",
    accent: "#eab308",
    deviceType: "laptop",
    githubUrl: "https://github.com/SamuelSHenriquezP/DEN",
    description: "Plataforma web de ingeniería eléctrica y domótica inteligente desarrollada en React 19 y Tailwind CSS. Cuenta con visor interactivo de servicios industriales, simulador de control de cargas eléctricas, cálculo de presupuestos unifilares y presentación de certificaciones RETIE.",
    tags: ["React 19", "Vite", "Tailwind CSS", "Domótica Loxone", "RETIE", "Cotizador Web"],
    highlights: [
      "Cotizador paramétrico para proyectos de automatización de iluminación y potencia.",
      "Arquitectura SPA ultraligera optimizada con tiempos de carga menores a 0.4s.",
      "Integración directa con canal prioritario de WhatsApp para consultas técnicas."
    ],
    metrics: [
      { label: "Framework", val: "React 19 + Vite" },
      { label: "Estilo", val: "Tailwind CSS v4" },
      { label: "Especialidad", val: "Domótica Loxone" },
      { label: "Estado", val: "Completada" }
    ],
    codeSnippet: {
      language: "javascript",
      filename: "App.jsx",
      code: `// src/App.jsx
export default function App() {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  return (
    <div className="bg-[#0B0D14] text-white">
      <SystemActivationHero onQuote={() => setIsQuoteOpen(true)} />
      <LoxoneDomoticaSection />
    </div>
  );
}`
    },
    appSimulator: "den-electricos"
  },
  {
    id: "grow-wellness",
    title: "Grow — Skincare & Wellness",
    subtitle: "E-commerce editorial y quiz de diagnóstico cosmético interactivo",
    category: "E-Commerce & Experiencia Web",
    year: "2025",
    accent: "#f472b6",
    deviceType: "laptop",
    githubUrl: "https://github.com/SamuelSHenriquezP/Grow",
    description: "Tienda online y portal interactivo de cosmética botánica creado con React y Tailwind. Cuenta con un quiz dinámico de diagnóstico de piel en tiempo real, carrito de compras deslizante sin recarga de página y diseño editorial moderno.",
    tags: ["React 19", "E-Commerce", "Skin Quiz", "Shopping Cart", "Tailwind CSS"],
    highlights: [
      "Quiz interactivo de 5 pasos con recomendación algorítmica de rutina cosmética.",
      "Drawer de carrito de compras reactivo con actualización instantánea de totales.",
      "Micro-interacciones fluidas y fotografía editorial de producto."
    ],
    metrics: [
      { label: "Frontend", val: "React 19 SPA" },
      { label: "Checkout", val: "WhatsApp Cart Sync" },
      { label: "Diseño", val: "Editorial Warm" },
      { label: "Estado", val: "Completada" }
    ],
    codeSnippet: {
      language: "javascript",
      filename: "App.jsx",
      code: `// src/App.jsx
export function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <div className="bg-amber-50/20 text-zinc-900">
      <ProductShowcase onAddToCart={handleAddToCart} />
      <GlowQuizModal isOpen={isQuizOpen} />
    </div>
  );
}`
    },
    appSimulator: "grow-wellness"
  },
  {
    id: "aluma-candles",
    title: "Aluma — Velas Aromáticas",
    subtitle: "Portal web de velas botánicas artesanales con tipografía editorial",
    category: "Boutique Web & Diseño Editorial",
    year: "2025",
    accent: "#3e6b61",
    deviceType: "laptop",
    githubUrl: "https://github.com/SamuelSHenriquezP/Aluma",
    liveUrl: "https://aluma.inventustech.workers.dev/",
    demoUrl: "https://aluma.inventustech.workers.dev/",
    description: "Experiencia web editorial para una marca de velas aromáticas vertidas a mano con ceras vegetales de soja y coco. Destaca por su cuidada dirección de arte con tipografías Playfair Display e Inter, catálogo de notas olfativas y diseño minimalista cálido.",
    tags: ["Vanilla JS", "CSS3 Custom Properties", "Playfair Display", "Diseño Editorial", "Boutique"],
    highlights: [
      "Desglose de pirámides olfativas (Notas de salida, corazón y fondo) por vela.",
      "0 KB de sobrecarga de frameworks, velocidad de carga instantánea.",
      "Paleta cromática inspirada en arcilla, lino y salvia blanca."
    ],
    metrics: [
      { label: "Overhead", val: "0 KB Framework" },
      { label: "Tipografía", val: "Playfair Display" },
      { label: "Paleta", val: "Warm Sand & Sage" },
      { label: "Estado", val: "Completada" }
    ],
    codeSnippet: {
      language: "html",
      filename: "index.html",
      code: `<!-- index.html -->
<section class="hero-section">
  <div class="hero-content">
    <h1 class="font-serif">Velas Botánicas Hechas a Mano</h1>
    <p>Ceras naturales de soja y esencias puras para transformar tus espacios.</p>
  </div>
</section>`
    },
    appSimulator: "aluma-candles"
  },
  {
    id: "inventus-web",
    title: "Inventus Tech Studio",
    subtitle: "Este mismo portafolio — React + Vite",
    category: "Web Interactiva & Animaciones",
    year: "2026",
    accent: "#a78bfa",
    deviceType: "laptop",
    githubUrl: "https://github.com/SamuelSHenriquezP/inventus-studio",
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