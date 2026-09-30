# Inventus Studio 🌐✨ — Interactive 3D Web Experience & Creative Suite

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://react.dev)
[![Three.js](https://img.shields.io/badge/3D-Three.js%20%7C%20R3F-black?logo=threedotjs)](https://threejs.org)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite)](https://vitejs.dev)
[![Author](https://img.shields.io/badge/Studio-Inventus%20Tech-orange)]()

> **Inventus Studio** es una plataforma web creativa de renderizado tridimensional interactivo en tiempo real (+17,800 líneas de código). Construida con **React**, **Three.js** y **React Three Fiber (R3F)**, combina la potencia del cómputo gráfico con WebGL, iluminación PBR avanzada, cámaras orbitales dinámicas y micro-interacciones fluidas.

---

## 🌟 Características Principales

* **Renderizado Tridimensional en el Navegador con WebGL:**
  * Uso de `@react-three/fiber` y `@react-three/drei` para construir escenas 3D reactivas y desacopladas.
  * Carga y manipulación de mallas, materiales PBR, sombras dinámicas y shaders personalizados.
* **Sistemas de Cámara & Controles Cinemáticos:**
  * Controles orbitales (`OrbitControls`) suaves con limitación de ángulos y transiciones fluidas de perspectiva.
* **Animaciones de Grado Creativo:**
  * Integración con **Framer Motion** y efectos de partículas (*Canvas Confetti*) para celebrar interacciones clave del usuario.
* **Arquitectura de Alto Rendimiento:**
  * Empaquetado ultrarrápido con **Vite**, optimización de mallas y texturas para garantizar 60 FPS estables en navegadores de escritorio y móviles.

---

## 🏗️ Estructura del Código

```
inventus-studio/
├── src/
│   ├── components/
│   │   ├── canvas/                  # Escenarios 3D, luces, niebla y cámaras R3F
│   │   ├── models/                  # Componentes de mallas 3D tridimensionales
│   │   └── ui/                      # Controles de interfaz flotantes y menús
│   ├── hooks/                       # Custom hooks para control de mouse y eventos 3D
│   ├── styles/                      # Estilos CSS modernos y variables cromáticas
│   ├── App.jsx                      # Orquestador visual y montaje de la escena
│   └── main.jsx                     # Punto de entrada de React
├── package.json                     # Dependencias (R3F, Drei, Three, Framer Motion)
└── vite.config.js                   # Configuración de compilación optimizada
```

---

## 🚀 Puesta en Marcha

```bash
cd Inventus/inventus-studio
npm install
npm run dev
```

---

**Desarrollado por Inventus Tech Studio** • *Liderado por Samuel Henríquez*
