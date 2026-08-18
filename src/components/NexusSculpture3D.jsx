// src/components/NexusSculpture3D.jsx
import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, TorusKnot, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Eye, Activity } from 'lucide-react';
import { sounds } from '../utils/soundEngine';

function Sculpture({ wireframe, distortSpeed }) {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.35 * distortSpeed;
    meshRef.current.rotation.y += delta * 0.55 * distortSpeed;

    const { x, y } = state.pointer || { x: 0, y: 0 };
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 0.35, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 0.35, 0.05);
  });

  return (
    <Float speed={2.0} rotationIntensity={0.6} floatIntensity={0.9}>
      <TorusKnot ref={meshRef} args={[1.15, 0.38, 140, 36]} scale={1.25}>
        <MeshDistortMaterial
          color="#34d399"
          roughness={0.12}
          metalness={0.88}
          distort={0.32}
          speed={1.8 * distortSpeed}
          wireframe={wireframe}
        />
      </TorusKnot>
    </Float>
  );
}

export default function NexusSculpture3D({ accentColor = '#34d399' }) {
  const [wireframe, setWireframe] = useState(false);
  const [speedBoost, setSpeedBoost] = useState(1);

  const toggleWireframe = () => {
    sounds.playClick();
    setWireframe(!wireframe);
  };

  const toggleSpeed = () => {
    sounds.playClick();
    setSpeedBoost(prev => (prev === 1 ? 2.2 : 1));
  };

  return (
    <div className="w-full h-[420px] sm:h-[500px] lg:h-[560px] relative rounded-3xl bg-zinc-950/60 border border-white/10 overflow-hidden select-none group shadow-2xl flex flex-col justify-between p-4 sm:p-6">
      
      {/* Top 3D Viewport Controls */}
      <div className="flex items-center justify-between text-xs font-mono text-zinc-400 z-10">
        <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-[11px] text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          WebGL 2.0 PBR Shader
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleWireframe}
            className={`px-3 py-1.5 rounded-xl border text-[11px] transition-all cursor-pointer flex items-center gap-1.5 ${
              wireframe 
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' 
                : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
            }`}
            title="Alternar Malla Wireframe"
            data-cursor="SHADERS"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{wireframe ? 'Wireframe ON' : 'Malla Sólida'}</span>
          </button>

          <button
            onClick={toggleSpeed}
            className={`px-3 py-1.5 rounded-xl border text-[11px] transition-all cursor-pointer flex items-center gap-1.5 ${
              speedBoost > 1 
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' 
                : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
            }`}
            title="Modificar frecuencia de distorsión"
            data-cursor="TURBO"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{speedBoost > 1 ? 'Distorsión 2.2x' : 'Velocidad 1.0x'}</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 1.5]}>
            <ambientLight intensity={1.0} />
            <directionalLight position={[5, 8, 5]} intensity={2.5} color="#ffffff" />
            <directionalLight position={[-5, -4, -3]} intensity={1.5} color="#059669" />
            <pointLight position={[0, 0, 3]} intensity={1.2} color={accentColor} />
            
            <Sculpture wireframe={wireframe} distortSpeed={speedBoost} />
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
          </Canvas>
        </Suspense>
      </div>

      {/* Bottom Hint */}
      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 z-10 pointer-events-none">
        <span>Orbita con arrastre 360°</span>
        <span>GLSL Vertex Shader • 60 FPS</span>
      </div>

    </div>
  );
}
