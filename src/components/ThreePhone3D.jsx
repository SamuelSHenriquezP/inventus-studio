// src/components/ThreePhone3D.jsx
import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function PhoneModel({ 
  texturePath, 
  accentColor = '#f43f5e', 
  isInteractive = true,
  isHorizontal = false 
}) {
  const groupRef = useRef(null);

  const texture = useTexture(texturePath || '/assets/projects/cyber_rush.jpg');

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Slow elegant continuous rotation
    groupRef.current.rotation.y += delta * 0.12;

    // Responsive pointer tilt
    if (isInteractive) {
      const { x, y } = state.pointer || { x: 0, y: 0 };
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.45 + Math.PI * 0.04, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.3, 0.05);
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x * 0.15, 0.05);
    }
  });

  const titaniumMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a20',
    metalness: 0.94,
    roughness: 0.15,
  }), []);

  const bezelMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#060608',
    roughness: 0.8,
  }), []);

  return (
    <Float speed={2.2} rotationIntensity={0.35} floatIntensity={0.7}>
      <group 
        ref={groupRef} 
        scale={isHorizontal ? 1.05 : 1.22} 
        rotation={isHorizontal ? [0, 0, Math.PI / 2] : [0, 0, 0]}
        position={[0, 0, 0]}
      >
        
        {/* Main Titanium Chassis */}
        <RoundedBox args={[1.56, 3.22, 0.16]} radius={0.18} smoothness={4} material={titaniumMaterial} />

        {/* Screen Bezel Background */}
        <mesh position={[0, 0, 0.079]}>
          <planeGeometry args={[1.48, 3.12]} />
          <primitive object={bezelMaterial} attach="material" />
        </mesh>

        {/* High-Res Screen Texture */}
        <mesh position={[0, 0, 0.081]}>
          <planeGeometry args={[1.42, 3.04]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>

        {/* Dynamic Island Pill */}
        <mesh position={[0, 1.34, 0.083]}>
          <planeGeometry args={[0.38, 0.09]} />
          <meshBasicMaterial color="#050507" />
        </mesh>

        {/* Glass Screen Reflection Overlay */}
        <mesh position={[0, 0, 0.084]}>
          <planeGeometry args={[1.42, 3.04]} />
          <meshPhysicalMaterial 
            transparent 
            opacity={0.07} 
            roughness={0.05} 
            metalness={0.1} 
            color="#ffffff" 
          />
        </mesh>

        {/* Back Chassis */}
        <mesh position={[0, 0, -0.081]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.46, 3.1]} />
          <meshStandardMaterial color="#121216" roughness={0.3} metalness={0.88} />
        </mesh>

        {/* Rear Camera Island */}
        <group position={[-0.38, 1.05, -0.095]}>
          <RoundedBox args={[0.65, 0.65, 0.05]} radius={0.08} smoothness={4} material={titaniumMaterial} />
          
          {/* Triple Lenses */}
          <mesh position={[-0.14, 0.14, -0.03]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.03, 16]} />
            <meshStandardMaterial color="#08080a" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0.14, 0.14, -0.03]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.03, 16]} />
            <meshStandardMaterial color="#08080a" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[-0.14, -0.14, -0.03]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.03, 16]} />
            <meshStandardMaterial color="#08080a" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>

        {/* Ambient Subtle Accent Light */}
        <pointLight 
          position={[0, 0, 1.2]} 
          color={accentColor} 
          intensity={1.2} 
          distance={3.5} 
        />

      </group>
    </Float>
  );
}

function FallbackPhone({ texturePath }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-60 h-105 rounded-[36px] bg-zinc-900 border border-white/15 p-2.5 shadow-2xl overflow-hidden relative">
        <img 
          src={texturePath || '/assets/projects/cyber_rush.jpg'} 
          alt="3D Mockup Fallback" 
          className="w-full h-full object-cover rounded-[28px]"
        />
      </div>
    </div>
  );
}

export default function ThreePhone3D({ 
  texturePath, 
  accentColor = '#f43f5e',
  isHorizontal = false 
}) {
  return (
    <div className="w-full h-[420px] sm:h-[480px] lg:h-[530px] relative cursor-grab active:cursor-grabbing select-none">
      <Suspense fallback={<FallbackPhone texturePath={texturePath} />}>
        <Canvas camera={{ position: [0, 0, 4.3], fov: 42 }} dpr={[1, 1.5]}>
          <ambientLight intensity={1.1} />
          <directionalLight position={[4, 6, 5]} intensity={2.5} color="#ffffff" />
          <directionalLight position={[-4, -3, -3]} intensity={1.2} color="#71717a" />
          <pointLight position={[0, -2, 2]} intensity={0.8} color={accentColor} />
          <PhoneModel 
            texturePath={texturePath} 
            accentColor={accentColor} 
            isHorizontal={isHorizontal}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
