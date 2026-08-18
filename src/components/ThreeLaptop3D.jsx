// src/components/ThreeLaptop3D.jsx
import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Sparkles, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function LaptopModel({ isSyncing }) {
  const groupRef = useRef(null);
  const screenLightRef = useRef(null);

  // Load screen texture cleanly
  const texture = useTexture('/assets/projects/enterprise.jpg');

  // Mouse tilt tracking
  useFrame((state) => {
    const { x, y } = state.pointer || { x: 0, y: 0 };
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.6, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.4 + 0.15, 0.05);
    }
    if (screenLightRef.current) {
      screenLightRef.current.intensity = isSyncing ? 3.5 : 1.8 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
    }
  });

  const aluminumMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a1e',
    metalness: 0.9,
    roughness: 0.2,
  }), []);

  const darkBezelMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#08080a',
    roughness: 0.4,
  }), []);

  const keyboardMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0d0d10',
    roughness: 0.7,
  }), []);

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <group ref={groupRef} position={[0, -0.4, 0]} scale={1.15}>
        
        {/* ================= BASE / KEYBOARD CHASSIS ================= */}
        <group position={[0, 0, 0]}>
          {/* Main Aluminum Body */}
          <RoundedBox args={[3.2, 0.1, 2.2]} radius={0.05} smoothness={4} material={aluminumMaterial} />

          {/* Keyboard Recess */}
          <mesh position={[0, 0.051, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.8, 1.1]} />
            <primitive object={keyboardMaterial} attach="material" />
          </mesh>

          {/* Trackpad */}
          <mesh position={[0, 0.052, 0.62]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.1, 0.7]} />
            <meshStandardMaterial color="#141418" roughness={0.3} metalness={0.8} />
          </mesh>

          {/* Front Notch Lip */}
          <mesh position={[0, 0.02, 1.1]}>
            <boxGeometry args={[0.6, 0.04, 0.02]} />
            <meshStandardMaterial color="#2d2d35" metalness={0.9} />
          </mesh>
        </group>

        {/* ================= SCREEN LID (ANGLED BACK) ================= */}
        <group position={[0, 0.05, -1.1]} rotation={[0.32, 0, 0]}>
          
          {/* Outer Screen Chassis */}
          <RoundedBox position={[0, 1.1, 0]} args={[3.2, 2.2, 0.06]} radius={0.05} smoothness={4} material={aluminumMaterial} />

          {/* Screen Bezel Frame */}
          <mesh position={[0, 1.1, 0.032]}>
            <planeGeometry args={[3.12, 2.12]} />
            <primitive object={darkBezelMaterial} attach="material" />
          </mesh>

          {/* Live High-Res Screen Display Surface */}
          <mesh position={[0, 1.1, 0.034]}>
            <planeGeometry args={[3.0, 1.98]} />
            <meshBasicMaterial map={texture} />
          </mesh>

          {/* Screen Light Glow Emitter */}
          <pointLight 
            ref={screenLightRef}
            position={[0, 1.1, 0.5]} 
            color={isSyncing ? '#00f0ff' : '#00a6ff'} 
            intensity={2} 
            distance={4} 
          />

          {/* Web Camera Dot */}
          <mesh position={[0, 2.12, 0.035]}>
            <circleGeometry args={[0.015, 16]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>

        {/* Floating Particles Nebula around Laptop */}
        <Sparkles count={45} scale={4.5} size={3} speed={0.4} color="#00f0ff" />
        <Sparkles count={30} scale={5} size={4} speed={0.6} color="#a855f7" />

      </group>
    </Float>
  );
}

function FallbackLaptop() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-60 h-40 rounded-2xl bg-zinc-900 border border-white/10 animate-pulse flex items-center justify-center font-mono text-xs text-zinc-500">
        Cargando Modelo 3D...
      </div>
    </div>
  );
}

export default function ThreeLaptop3D({ isSyncing }) {
  return (
    <div className="w-full h-80 sm:h-96 md:h-110 relative cursor-grab active:cursor-grabbing select-none">
      <Suspense fallback={<FallbackLaptop />}>
        <Canvas camera={{ position: [0, 0.5, 4.5], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 8, 5]} intensity={2.5} color="#ffffff" />
          <directionalLight position={[-5, -2, -3]} intensity={1.5} color="#7000ff" />
          <pointLight position={[0, 2, 3]} intensity={2} color="#00f0ff" />
          
          <LaptopModel isSyncing={isSyncing} />
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.6} minPolarAngle={Math.PI / 3} />
        </Canvas>
      </Suspense>
    </div>
  );
}
