import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const FloatingShapes: React.FC = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const { pointer } = state;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.35,
      0.03,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * 0.2,
      0.03,
    );
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={1.2} floatIntensity={1.4}>
        <mesh position={[-1.6, 1.2, 0]}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#6366f1"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.4}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={1} floatIntensity={1.8}>
        <mesh position={[1.7, -1, -1]}>
          <torusKnotGeometry args={[0.6, 0.2, 128, 16]} />
          <MeshDistortMaterial
            color="#a78bfa"
            distort={0.3}
            speed={1.5}
            roughness={0.2}
            metalness={0.4}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[0.2, -1.9, -1.2]}>
          <octahedronGeometry args={[0.55, 0]} />
          <MeshDistortMaterial
            color="#38bdf8"
            distort={0.5}
            speed={2.5}
            roughness={0.15}
            metalness={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>

      <Float speed={1.3} rotationIntensity={1} floatIntensity={1.6}>
        <mesh position={[0.6, 2, -0.8]}>
          <icosahedronGeometry args={[0.45, 0]} />
          <MeshDistortMaterial
            color="#22d3ee"
            distort={0.4}
            speed={2.2}
            roughness={0.2}
            metalness={0.4}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
};

const HeroScene: React.FC = () => {
  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-900 to-indigo-950">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[4, 4, 4]} intensity={1.3} color="#c7d2fe" />
        <pointLight position={[-3, -2, -2]} intensity={0.5} color="#a78bfa" />
        <Suspense fallback={null}>
          <FloatingShapes />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
