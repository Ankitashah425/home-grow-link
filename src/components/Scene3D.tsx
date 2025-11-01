import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Tomato - Red sphere
function Tomato({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} position={position} args={[0.4, 32, 32]}>
      <meshStandardMaterial color="#ef4444" metalness={0.2} roughness={0.3} />
    </Sphere>
  );
}

// Carrot - Orange elongated shape
function Carrot({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.015;
      groupRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime + position[0]) * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh rotation={[0, 0, Math.PI / 6]}>
        <coneGeometry args={[0.2, 0.8, 16]} />
        <meshStandardMaterial color="#f97316" metalness={0.1} roughness={0.5} />
      </mesh>
    </group>
  );
}

// Apple - Red/Green sphere with slight indent
function Apple({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008;
      meshRef.current.rotation.y += 0.012;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.9 + position[0]) * 0.28;
    }
  });

  return (
    <Sphere ref={meshRef} position={position} args={[0.45, 32, 32]}>
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
    </Sphere>
  );
}

// Lettuce - Green layered sphere
function Lettuce({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 1.2 + position[0]) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Sphere args={[0.4, 16, 16]}>
        <meshStandardMaterial color="#22c55e" metalness={0.1} roughness={0.7} />
      </Sphere>
    </group>
  );
}

// Pumpkin - Orange squashed sphere
function Pumpkin({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.25;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[1, 0.7, 1]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#fb923c" metalness={0.2} roughness={0.5} />
    </mesh>
  );
}

export function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.6} color="#4ade80" />
      <pointLight position={[10, -5, -3]} intensity={0.4} color="#fbbf24" />
      
      {/* Floating fruits and vegetables */}
      <Tomato position={[-3, 2, 0]} />
      <Apple position={[3, -1, -2]} color="#ef4444" />
      <Carrot position={[-2, -2, 1]} />
      <Lettuce position={[4, 1, -1]} />
      <Pumpkin position={[0, 0, 0]} />
      <Apple position={[-4, 0, -3]} color="#22c55e" />
      <Tomato position={[2, 2, -2]} />
      <Carrot position={[-1, 1, 2]} />
      <Lettuce position={[3, -2, 1]} />
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
