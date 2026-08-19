// src/components/ProjectTunnel3D.jsx
import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';
import { projectsData } from '../Data/projectsData';
import { ArrowLeft, ArrowRight, Play, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/soundEngine';

// Preload all project images for instant 3D rendering
projectsData.forEach((p) => {
  if (p.image) {
    useTexture.preload(p.image);
  }
});

function ProjectCard3D({ project, index, total, activeIndex, onSelect }) {
  const meshRef = useRef(null);
  const texture = useTexture(project.image);

  // Calculate position on curved 3D circular track / cylinder
  const angle = ((index - activeIndex) / total) * Math.PI * 2;
  const radius = 3.8;
  const targetX = Math.sin(angle) * radius;
  const targetZ = Math.cos(angle) * radius - radius + 1.2;
  const targetRotY = -angle;

  const isCurrent = Math.abs((index - activeIndex) % total) < 0.3;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.08);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.08);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.08);
      
      const targetScale = isCurrent ? 1.15 : 0.85;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.08));
    }
  });

  return (
    <group 
      ref={meshRef} 
      position={[targetX, 0, targetZ]} 
      rotation={[0, targetRotY, 0]}
      onClick={() => onSelect(project)}
    >
      {/* Artwork Canvas Plane with Rounded Border */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.8, 1.75]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Frame Border */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.86, 1.81]} />
        <meshBasicMaterial color={isCurrent ? project.accentColor || '#ffffff' : '#27272a'} />
      </mesh>

      {/* 3D Floating Project Title */}
      {isCurrent && (
        <group position={[0, -1.2, 0]}>
          <Text
            fontSize={0.16}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4Ko20yw.woff2"
          >
            {project.title.toUpperCase()}
          </Text>
          <Text
            position={[0, -0.22, 0]}
            fontSize={0.11}
            color="#a1a1aa"
            anchorX="center"
            anchorY="middle"
          >
            {project.category}
          </Text>
        </group>
      )}
    </group>
  );
}

function TunnelScene({ activeIndex, onSelect }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    const { x } = state.pointer || { x: 0 };
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.15, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {projectsData.map((project, idx) => (
        <ProjectCard3D
          key={project.id}
          project={project}
          index={idx}
          total={projectsData.length}
          activeIndex={activeIndex}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

export default function ProjectTunnel3D({ onOpenProject }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextProject = () => {
    sounds.playClick();
    setActiveIndex((prev) => (prev + 1) % projectsData.length);
  };

  const prevProject = () => {
    sounds.playClick();
    setActiveIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  const currentProj = projectsData[((activeIndex % projectsData.length) + projectsData.length) % projectsData.length];

  return (
    <section className="relative w-full py-20 overflow-hidden select-none">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
            3D Tunnel Exhibition • Rotación Orbital
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Túnel de Proyectos 3D
          </h2>
        </div>

        {/* Arrow Navigation Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevProject}
            className="p-3 rounded-full bg-zinc-900 border border-white/15 text-zinc-300 hover:text-white hover:border-white/40 transition-all cursor-pointer"
            aria-label="Proyecto Anterior"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <span className="text-xs font-mono text-zinc-400 px-2">
            0{activeIndex + 1} / 0{projectsData.length}
          </span>

          <button
            onClick={nextProject}
            className="p-3 rounded-full bg-zinc-900 border border-white/15 text-zinc-300 hover:text-white hover:border-white/40 transition-all cursor-pointer"
            aria-label="Siguiente Proyecto"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D WebGL Curved Canvas Tunnel */}
      <div className="w-full h-96 sm:h-120 md:h-130 relative cursor-grab active:cursor-grabbing">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center font-mono text-xs text-zinc-500">
            Cargando Túnel 3D...
          </div>
        }>
          <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }} dpr={[1, 2]}>
            <ambientLight intensity={1.5} />
            <pointLight position={[0, 4, 4]} intensity={2.5} color="#ffffff" />
            <TunnelScene activeIndex={activeIndex} onSelect={onOpenProject} />
          </Canvas>
        </Suspense>
      </div>

      {/* Active Project Action Banner */}
      <div className="max-w-xl mx-auto px-6 mt-4 text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onOpenProject(currentProj)}
            className="px-6 py-2.5 rounded-full bg-white text-black font-mono font-bold text-xs flex items-center gap-2 hover:bg-zinc-200 transition-all cursor-pointer shadow-lg"
          >
            <Play className="w-3.5 h-3.5 fill-black" /> Probar Demo / Ver Proyecto
          </button>

          {currentProj.githubUrl && (
            <a
              href={currentProj.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-zinc-900 border border-white/15 text-zinc-300 font-mono text-xs flex items-center gap-2 hover:text-white hover:border-white/30 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Ver Código GitHub
            </a>
          )}
        </div>
      </div>

    </section>
  );
}
