// src/Data/projectsData.js

export const personalInfo = {
  name: "Samuel",
  studio: "Inventus",
  role: "Creative Developer & Game Creator",
  bio: "Diseño y desarrollo videojuegos independientes, aplicaciones móviles nativas y experiencias web con un enfoque minimalista y alta atención al detalle.",
  location: "Bogotá, Colombia (GMT-5)",
  email: "contacto@inventustech.com",
  whatsapp: "573000000000",
  github: "https://github.com",
  availability: "Disponible para proyectos & colaboraciones"
};

export const projectsData = [
  {
    id: "cyber-rush",
    number: "01",
    title: "Cyber Rush",
    subtitle: "Videojuego Arcade de Reflejos a 60 FPS",
    category: "Videojuego",
    year: "2026",
    description: "Juego arcade desarrollado en Flutter y compilado a WebAssembly con físicas vectoriales fluidas, control de colisiones y efectos visuales generativos.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    tags: ["Flutter", "Flame Engine", "WebAssembly", "CanvasKit", "Game Design"],
    demoType: "game",
    githubUrl: "https://github.com",
    demoUrl: "#play-game",
    accent: "#f43f5e"
  },
  {
    id: "cloudstream-sync",
    number: "02",
    title: "CloudStream",
    subtitle: "Plataforma de Sincronización en Tiempo Real",
    category: "Web & Backend",
    year: "2026",
    description: "Aplicación web distribuida con WebSockets de baja latencia (<85ms), panel de métricas en vivo y persistencia de datos segura.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    tags: ["React 19", "WebSockets", "PostgreSQL", "Tailwind CSS", "Redis"],
    demoType: "web",
    githubUrl: "https://github.com",
    demoUrl: "#view-web",
    accent: "#38bdf8"
  },
  {
    id: "fortress-vault",
    number: "03",
    title: "Fortress Vault",
    subtitle: "Billetera Digital con Seguridad Biométrica",
    category: "App Móvil",
    year: "2026",
    description: "Aplicación móvil para iOS y Android con cifrado AES-256, autenticación biométrica y arquitectura reactiva offline-first.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["Flutter 3.x", "Rust FFI", "Biometría", "Isar DB", "Mobile UI"],
    demoType: "app",
    githubUrl: "https://github.com",
    demoUrl: "#view-app",
    accent: "#c084fc"
  },
  {
    id: "nexus-experience",
    number: "04",
    title: "Nexus 3D",
    subtitle: "Sitio Web Interactivo con Esculturas 3D",
    category: "Experiencia 3D",
    year: "2026",
    description: "Experiencia web inmersiva desarrollada con Three.js, partículas interactivas y scroll suave inercial optimizado para cualquier dispositivo.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    tags: ["Three.js", "WebGL", "GSAP", "React", "Lenis Scroll"],
    demoType: "web",
    githubUrl: "https://github.com",
    demoUrl: "#view-3d",
    accent: "#34d399"
  }
];

export const skillsList = [
  { category: "Videojuegos", items: ["Flutter & Flame", "WebAssembly (WASM)", "Físicas 2D & Colisiones", "Shaders GLSL", "CanvasKit Engine"] },
  { category: "Frontend & 3D", items: ["React 19 & Vite", "Three.js / WebGL", "GSAP ScrollTrigger", "Tailwind CSS", "Lenis Smooth Scroll"] },
  { category: "Mobile & Cloud", items: ["Flutter (iOS & Android)", "Rust FFI", "WebSockets Realtime", "PostgreSQL & Isar DB", "Cloudflare Pages"] }
];