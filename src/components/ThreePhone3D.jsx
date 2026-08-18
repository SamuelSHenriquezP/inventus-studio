// src/components/ThreePhone3D.jsx
import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Sparkles, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function PhoneModel({ texturePath, isGlowing }) {
  const groupRef = useRef(null);
  const glowLightRef = useRef(null);

  const texture = useTexture(texturePath || '/assets/projects/cyber_rush.jpg');

  useFrame((state) => {
    const { x, y } = state.pointer || { x: 0, y: 0 };
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.75, 0.06);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.5, 0.06);
    }
    if (glowLightRef.current) {
      glowLightRef.current.intensity = 2.0 + Math.sin(state.clock.elapsedTime * 4) * 0.5;
    }
  });

  const titaniumMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#26262b',
    metalness: 0.95,
    roughness: 0.15,
  }), []);

  const glassBackMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#0d0d12',
    roughness: 0.1,
    metalness: 0.2,
    transmission: 0.3,
    transparent: true,
  }), []);

  return (
    <Float speed={3.0} rotationIntensity={0.8} floatIntensity={1.5}>
      <group ref={groupRef} scale={1.25} position={[0, 0, 0]}>
        
        {/* Main Titanium Chassis */}
        <RoundedBox args={[1.55, 3.2, 0.15]} radius={0.16} smoothness={4} material={titaniumMaterial} />

        {/* Glass Screen Front */}
        <mesh position={[0, 0, 0.078]}>
          <planeGeometry args={[1.45, 3.08]} />
          <meshBasicMaterial map={texture} />
        </mesh>

        {/* Dynamic Island Pill */}
        <mesh position={[0, 1.35, 0.082]}>
          <planeGeometry args={[0.42, 0.1]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Back Matte Glass */}
        <mesh position={[0, 0, -0.078]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.48, 3.12]} />
          <primitive object={glassBackMaterial} attach="material" />
        </mesh>

        {/* Rear Camera Island */}
        <group position={[-0.38, 1.05, -0.09]}>
          <RoundedBox args={[0.65, 0.65, 0.06]} radius={0.08} smoothness={4} material={titaniumMaterial} />
          
          {/* Lenses */}
          <mesh position={[-0.14, 0.14, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.03, 16]} />
            <meshStandardMaterial color="#050508" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.14, 0.14, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.03, 16]} />
            <meshStandardMaterial color="#050508" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[-0.14, -0.14, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.03, 16]} />
            <meshStandardMaterial color="#050508" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        {/* Screen Light Emitter */}
        <pointLight 
          ref={glowLightRef}
          position={[0, 0, 0.8]} 
          color={isGlowing ? '#ff0077' : '#00f0ff'} 
          intensity={2.2} 
          distance={3.5} 
        />

        {/* Floating Quantum Particles */}
        <Sparkles count={40} scale={3.5} size={3.5} speed={0.5} color="#ff0077" />
        <Sparkles count={35} scale={4.2} size={4} speed={0.7} color="#00f0ff" />

      </group>
    </Float>
  );
}

function FallbackPhone() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-40 h-72 rounded-3xl bg-zinc-900 border border-white/10 animate-pulse flex items-center justify-center font-mono text-xs text-zinc-500">
        Cargando 3D Phone...
      </div>
    </div>
  );
}

export default function ThreePhone3D({ texturePath, isGlowing }) {
  return (
    <div className="w-full h-80 sm:h-96 md:h-110 relative cursor-grab active:cursor-grabbing select-none">
      <Suspense fallback={<FallbackPhone />}>
        <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={1.4} />
          <directionalLight position={[5, 6, 5]} intensity={2.8} color="#ffffff" />
          <directionalLight position={[-5, -4, -3]} intensity={1.8} color="#ff0077" />
          <pointLight position={[0, 0, 3]} intensity={2} color="#00f0ff" />
          
          <PhoneModel texturePath={texturePath} isGlowing={isGlowing} />
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
        </Canvas>
      </Suspense>
    </div>
  );
}
