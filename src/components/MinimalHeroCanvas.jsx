// src/components/MinimalHeroCanvas.jsx
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Pre-computed deterministic positions and scales outside component render
const COUNT = 600;
const positionsArray = new Float32Array(COUNT * 3);
const scalesArray = new Float32Array(COUNT);

for (let i = 0; i < COUNT; i++) {
  // Deterministic spherical distribution
  const theta = (i * 1.61803398875) * Math.PI * 2;
  const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
  const r = 3.0 + ((i % 17) / 17) * 4.5;

  positionsArray[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  positionsArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  positionsArray[i * 3 + 2] = r * Math.cos(phi);

  scalesArray[i] = 0.3 + ((i % 7) / 7) * 0.7;
}

function ParticleField() {
  const pointsRef = useRef(null);

  useFrame((state) => {
    const { x, y } = state.pointer || { x: 0, y: 0 };
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0008;
      pointsRef.current.rotation.x += 0.0004;
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, x * 0.3, 0.02);
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -y * 0.3, 0.02);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positionsArray.length / 3}
          array={positionsArray}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={scalesArray.length}
          array={scalesArray}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

export default function MinimalHeroCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40 -z-10">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}>
          <ParticleField />
        </Canvas>
      </Suspense>
    </div>
  );
}
