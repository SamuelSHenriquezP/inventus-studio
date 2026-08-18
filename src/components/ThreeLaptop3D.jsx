// src/components/ThreeLaptop3D.jsx
import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function LaptopModel({ texturePath, accentColor = '#38bdf8', isInteractive = true }) {
  const groupRef = useRef(null);

  const texture = useTexture(texturePath || '/assets/projects/enterprise.jpg');

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Gentle continuous oscillation
    groupRef.current.rotation.y += delta * 0.12;

    // Responsive pointer tilt
    if (isInteractive) {
      const { x, y } = state.pointer || { x: 0, y: 0 };
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.45 - Math.PI * 0.04, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.25 + 0.18, 0.05);
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x * 0.2, 0.05);
    }
  });

  const aluminumMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1e1e24',
    metalness: 0.9,
    roughness: 0.22,
  }), []);

  const bezelMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#08080a',
    roughness: 0.6,
  }), []);

  const keyboardDeckMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0c0c0f',
    roughness: 0.7,
  }), []);

  return (
    <Float speed={2.0} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={groupRef} position={[0, -0.3, 0]} scale={1.12}>
        
        {/* ================= BASE / KEYBOARD CHASSIS ================= */}
        <group position={[0, 0, 0]}>
          {/* Main Body */}
          <RoundedBox args={[3.2, 0.1, 2.2]} radius={0.06} smoothness={4} material={aluminumMaterial} />

          {/* Keyboard Recess */}
          <mesh position={[0, 0.051, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.75, 1.05]} />
            <primitive object={keyboardDeckMaterial} attach="material" />
          </mesh>

          {/* Trackpad */}
          <mesh position={[0, 0.052, 0.62]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.05, 0.65]} />
            <meshStandardMaterial color="#141418" roughness={0.3} metalness={0.7} />
          </mesh>

          {/* Front Notch Lip */}
          <mesh position={[0, 0.02, 1.1]}>
            <boxGeometry args={[0.5, 0.035, 0.02]} />
            <meshStandardMaterial color="#2d2d35" metalness={0.8} />
          </mesh>
        </group>

        {/* ================= SCREEN LID (ANGLED BACK) ================= */}
        <group position={[0, 0.05, -1.1]} rotation={[0.3, 0, 0]}>
          
          {/* Outer Screen Chassis */}
          <RoundedBox position={[0, 1.1, 0]} args={[3.2, 2.2, 0.06]} radius={0.06} smoothness={4} material={aluminumMaterial} />

          {/* Screen Bezel Frame */}
          <mesh position={[0, 1.1, 0.032]}>
            <planeGeometry args={[3.12, 2.12]} />
            <primitive object={bezelMaterial} attach="material" />
          </mesh>

          {/* Live High-Res Screen Texture */}
          <mesh position={[0, 1.1, 0.034]}>
            <planeGeometry args={[2.98, 1.96]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
          </mesh>

          {/* Screen Glass Specular Reflection */}
          <mesh position={[0, 1.1, 0.035]}>
            <planeGeometry args={[2.98, 1.96]} />
            <meshPhysicalMaterial 
              transparent 
              opacity={0.06} 
              roughness={0.05} 
              metalness={0.1} 
              color="#ffffff" 
            />
          </mesh>

          {/* Camera Dot */}
          <mesh position={[0, 2.12, 0.036]}>
            <circleGeometry args={[0.015, 16]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>

        {/* Subtle Accent Glow */}
        <pointLight 
          position={[0, 1.2, 0.8]} 
          color={accentColor} 
          intensity={1.0} 
          distance={4} 
        />

      </group>
    </Float>
  );
}

function FallbackLaptop({ texturePath }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-md aspect-16/10 rounded-2xl bg-zinc-900 border border-white/15 p-3 shadow-2xl overflow-hidden relative">
        <img 
          src={texturePath || '/assets/projects/enterprise.jpg'} 
          alt="3D Mockup Fallback" 
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
}

export default function ThreeLaptop3D({ texturePath, accentColor = '#38bdf8' }) {
  return (
    <div className="w-full h-[420px] sm:h-[500px] lg:h-[560px] relative cursor-grab active:cursor-grabbing select-none">
      <Suspense fallback={<FallbackLaptop texturePath={texturePath} />}>
        <Canvas camera={{ position: [0, 0.6, 4.4], fov: 42 }} dpr={[1, 1.5]}>
          <ambientLight intensity={1.1} />
          <directionalLight position={[5, 8, 5]} intensity={2.5} color="#ffffff" />
          <directionalLight position={[-5, -2, -3]} intensity={1.2} color="#71717a" />
          <pointLight position={[0, 2, 2.5]} intensity={0.9} color={accentColor} />
          <LaptopModel texturePath={texturePath} accentColor={accentColor} />
        </Canvas>
      </Suspense>
    </div>
  );
}
