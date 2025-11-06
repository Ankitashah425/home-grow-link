import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Realistic Tomato
function Tomato({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Sphere args={[0.5, 32, 32]} scale={[1, 0.9, 1]}>
        <MeshDistortMaterial 
          color="#dc2626" 
          metalness={0.3}
          roughness={0.4}
          distort={0.1}
          speed={2}
        />
      </Sphere>
      {/* Stem */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.15, 8]} />
        <meshStandardMaterial color="#15803d" />
      </mesh>
    </group>
  );
}

// Realistic Carrot
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
        <coneGeometry args={[0.25, 1, 8]} />
        <MeshDistortMaterial 
          color="#f97316" 
          metalness={0.2}
          roughness={0.6}
          distort={0.15}
          speed={1.5}
        />
      </mesh>
      {/* Green top */}
      <mesh position={[0.3, 0.5, 0]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial color="#16a34a" />
      </mesh>
    </group>
  );
}

// Realistic Apple
function Apple({ position, color }: { position: [number, number, number], color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.008;
      groupRef.current.rotation.y += 0.012;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.9 + position[0]) * 0.28;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Sphere args={[0.45, 32, 32]} scale={[1, 0.95, 1]}>
        <MeshDistortMaterial 
          color={color}
          metalness={0.4}
          roughness={0.3}
          distort={0.08}
          speed={2}
        />
      </Sphere>
      {/* Stem */}
      <mesh position={[0, 0.43, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
    </group>
  );
}

// Realistic Lettuce
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
      {/* Multiple layers for lettuce effect */}
      <Sphere args={[0.4, 16, 16]} scale={[1, 0.7, 1]}>
        <MeshDistortMaterial 
          color="#22c55e" 
          metalness={0.1}
          roughness={0.8}
          distort={0.3}
          speed={1}
        />
      </Sphere>
      <Sphere args={[0.35, 16, 16]} scale={[1.1, 0.6, 1.1]} position={[0, 0.1, 0]}>
        <MeshDistortMaterial 
          color="#16a34a" 
          metalness={0.1}
          roughness={0.9}
          distort={0.4}
          speed={1.2}
        />
      </Sphere>
    </group>
  );
}

// Realistic Pumpkin
function Pumpkin({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.008;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh scale={[1, 0.7, 1]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <MeshDistortMaterial 
          color="#ea580c" 
          metalness={0.2}
          roughness={0.5}
          distort={0.2}
          speed={1}
        />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.25, 8]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
    </group>
  );
}

// Realistic Bell Pepper
function BellPepper({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.1 + position[0]) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh scale={[1, 1.2, 1]}>
        <boxGeometry args={[0.5, 0.6, 0.5]} />
        <MeshDistortMaterial 
          color="#eab308" 
          metalness={0.4}
          roughness={0.3}
          distort={0.15}
          speed={1.5}
        />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.15, 8]} />
        <meshStandardMaterial color="#16a34a" />
      </mesh>
    </group>
  );
}

export function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Floating fruits and vegetables */}
      <Tomato position={[-3, 2, 0]} />
      <Apple position={[3, -1, -2]} color="#dc2626" />
      <Carrot position={[-2, -2, 1]} />
      <Lettuce position={[4, 1, -1]} />
      <Pumpkin position={[0, 0, 0]} />
      <Lettuce position={[-4, 0, -3]} />
      <BellPepper position={[2, 2, -2]} />
      <Tomato position={[-1, 1, 2]} />
      <Carrot position={[3, -2, 1]} />
      <Apple position={[1, -1, -1]} color="#22c55e" />
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
