import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Box, Torus } from "@react-three/drei";
import * as THREE from "three";

function FloatingVegetable({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} position={position} args={[0.5, 32, 32]}>
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
    </Sphere>
  );
}

function FloatingBox({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008;
      meshRef.current.rotation.z += 0.008;
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <Box ref={meshRef} position={position} args={[0.6, 0.6, 0.6]}>
      <meshStandardMaterial color={color} metalness={0.2} roughness={0.5} />
    </Box>
  );
}

function FloatingTorus({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.012;
      meshRef.current.rotation.y += 0.012;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.25;
    }
  });

  return (
    <Torus ref={meshRef} position={position} args={[0.4, 0.15, 16, 32]}>
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.3} />
    </Torus>
  );
}

export function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4ade80" />
      
      {/* Farm-themed floating objects */}
      <FloatingVegetable position={[-3, 2, 0]} color="#10b981" />
      <FloatingVegetable position={[3, -1, -2]} color="#f97316" />
      <FloatingBox position={[-2, -2, 1]} color="#22c55e" />
      <FloatingBox position={[4, 1, -1]} color="#84cc16" />
      <FloatingTorus position={[0, 0, 0]} color="#16a34a" />
      <FloatingTorus position={[-4, 0, -3]} color="#65a30d" />
      <FloatingVegetable position={[2, 2, -2]} color="#eab308" />
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
