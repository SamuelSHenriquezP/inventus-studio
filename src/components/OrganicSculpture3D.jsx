// src/components/OrganicSculpture3D.jsx
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, TorusKnot, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Sculpture() {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    const { x, y } = state.pointer || { x: 0, y: 0 };
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.35;
      meshRef.current.rotation.y += delta * 0.55;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 0.3, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 0.3, 0.05);
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.8}>
      <TorusKnot ref={meshRef} args={[1.1, 0.35, 128, 32]} scale={1.2}>
        <MeshDistortMaterial
          color="#f4f4f5"
          roughness={0.15}
          metalness={0.85}
          distort={0.25}
          speed={1.5}
        />
      </TorusKnot>
    </Float>
  );
}

export default function OrganicSculpture3D() {
  return (
    <div className="w-full h-72 sm:h-96 relative cursor-grab active:cursor-grabbing select-none">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 8, 5]} intensity={2.2} color="#ffffff" />
          <directionalLight position={[-5, -4, -3]} intensity={1.2} color="#71717a" />
          <Sculpture />
        </Canvas>
      </Suspense>
    </div>
  );
}
