// src/components/TechCore3D.jsx
import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Zap, Eye, Sparkles as SparkleIcon, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/soundEngine';

function CoreMesh({ overdrive, wireframeOnly }) {
  const meshRef = useRef(null);
  const wireframeRef = useRef(null);
  const ringRef1 = useRef(null);
  const ringRef2 = useRef(null);

  useFrame((state) => {
    const { x, y } = state.pointer || { x: 0, y: 0 };
    const speedMultiplier = overdrive ? 2.4 : 1.0;

    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * speedMultiplier;
      meshRef.current.rotation.y += 0.008 * speedMultiplier;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 1.5, 0.05);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -y * 1.5, 0.05);
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x -= 0.003 * speedMultiplier;
      wireframeRef.current.rotation.y -= 0.005 * speedMultiplier;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x += 0.008 * speedMultiplier;
      ringRef1.current.rotation.z += 0.006 * speedMultiplier;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y -= 0.01 * speedMultiplier;
      ringRef2.current.rotation.z -= 0.005 * speedMultiplier;
    }
  });

  return (
    <Float speed={overdrive ? 4.5 : 2.2} rotationIntensity={1.2} floatIntensity={1.6}>
      <group>
        {/* Core Distorted Fluid Hologram */}
        {!wireframeOnly && (
          <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.75}>
            <MeshDistortMaterial
              color={overdrive ? "#FF0077" : "#00F0FF"}
              emissive={overdrive ? "#7000FF" : "#0055FF"}
              emissiveIntensity={overdrive ? 1.3 : 0.75}
              roughness={0.12}
              metalness={0.95}
              distort={overdrive ? 0.65 : 0.38}
              speed={overdrive ? 5.2 : 2.6}
            />
          </Sphere>
        )}

        {/* Outer 3D Geometric Matrix */}
        <mesh ref={wireframeRef} scale={wireframeOnly ? 2.5 : 2.3}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial
            color={overdrive ? "#FF0077" : "#00F0FF"}
            wireframe
            transparent
            opacity={wireframeOnly ? 0.8 : 0.35}
            emissive={overdrive ? "#FF0077" : "#00F0FF"}
            emissiveIntensity={wireframeOnly ? 0.9 : 0.6}
          />
        </mesh>

        {/* Quantum Orbital Rings */}
        <mesh ref={ringRef1} scale={2.8}>
          <torusGeometry args={[1, 0.012, 16, 100]} />
          <meshStandardMaterial
            color="#A855F7"
            emissive="#A855F7"
            emissiveIntensity={0.9}
            transparent
            opacity={0.6}
          />
        </mesh>

        <mesh ref={ringRef2} scale={3.2} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1, 0.01, 16, 100]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={0.8}
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Dynamic Multi-Color Particles */}
        <Sparkles 
          count={overdrive ? 140 : 80} 
          scale={overdrive ? 8 : 6} 
          size={overdrive ? 5 : 3.5} 
          speed={overdrive ? 1.2 : 0.4} 
          color={overdrive ? "#FF0077" : "#00F0FF"} 
        />
        <Sparkles 
          count={overdrive ? 90 : 50} 
          scale={overdrive ? 9 : 7} 
          size={4.5} 
          speed={overdrive ? 1.5 : 0.6} 
          color="#A855F7" 
        />
      </group>
    </Float>
  );
}

function FallbackCore() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-44 h-44 rounded-full bg-linear-to-tr from-cyan-400 via-purple-500 to-pink-500 blur-2xl opacity-60 animate-pulse" />
    </div>
  );
}

export default function TechCore3D() {
  const [overdrive, setOverdrive] = useState(false);
  const [wireframeOnly, setWireframeOnly] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleOverdrive = () => {
    sounds.playClick();
    setOverdrive(prev => !prev);
  };

  const toggleWireframe = () => {
    sounds.playClick();
    setWireframeOnly(prev => !prev);
  };

  const toggleSound = () => {
    sounds.muted = soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) sounds.playSuccess();
  };

  return (
    <div className="w-full h-96 md:h-120 relative pointer-events-auto flex flex-col items-center justify-center select-none">
      
      {/* Background ambient radial glow */}
      <div className={`absolute w-80 h-80 rounded-full blur-[120px] pointer-events-none transition-all duration-700 ${
        overdrive ? 'bg-pink-600/35 scale-130' : 'bg-cyan-500/20'
      }`} />
      
      {/* 3D WebGL Canvas */}
      <div className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing" data-cursor="3D ORBIT">
        <Suspense fallback={<FallbackCore />}>
          <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={overdrive ? 1.4 : 0.9} />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={overdrive ? 3.5 : 2.5} 
              color={overdrive ? "#FF0077" : "#00F0FF"} 
            />
            <pointLight 
              position={[-10, -10, -5]} 
              intensity={overdrive ? 4.5 : 3.5} 
              color="#7000FF" 
            />
            <CoreMesh overdrive={overdrive} wireframeOnly={wireframeOnly} />
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
          </Canvas>
        </Suspense>
      </div>

      {/* Floating 3D HUD Interactive Controls */}
      <div className="absolute bottom-2 z-20 flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-950/85 border border-white/10 backdrop-blur-xl shadow-2xl font-mono text-xs">
        <button
          onClick={toggleOverdrive}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
            overdrive 
              ? 'bg-linear-to-r from-pink-500 to-purple-600 text-white font-bold shadow-[0_0_20px_rgba(236,72,153,0.5)]' 
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
          data-cursor="WARP"
        >
          <Zap className={`w-3.5 h-3.5 ${overdrive ? 'text-yellow-300 animate-bounce' : ''}`} />
          <span>{overdrive ? 'Overdrive 120 FPS' : 'Modo Overdrive'}</span>
        </button>

        <button
          onClick={toggleWireframe}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
            wireframeOnly 
              ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]' 
              : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
          }`}
          data-cursor="MATRIX"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{wireframeOnly ? 'Malla Activa' : 'Wireframe'}</span>
        </button>

        <button
          onClick={toggleSound}
          className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all cursor-pointer"
          title={soundEnabled ? 'Silenciar Efectos de Audio' : 'Activar Audio Háptico'}
          data-cursor="AUDIO"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-zinc-600" />}
        </button>

        <div className="hidden sm:flex items-center gap-1 px-2 text-[10px] text-zinc-500 border-l border-white/10">
          <SparkleIcon className="w-3 h-3 text-cyan-400" />
          <span>Gira en 3D</span>
        </div>
      </div>

    </div>
  );
}