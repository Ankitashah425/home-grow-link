import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import tomatoImg from "@/assets/tomato.png";
import carrotImg from "@/assets/carrot.png";
import appleImg from "@/assets/apple.png";
import lettuceImg from "@/assets/lettuce.png";
import pumpkinImg from "@/assets/pumpkin.png";
import broccoliImg from "@/assets/broccoli.png";
import pepperImg from "@/assets/pepper.png";

// Floating Image Component
function FloatingImage({ 
  position, 
  imageSrc, 
  scale = 1 
}: { 
  position: [number, number, number]; 
  imageSrc: string; 
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, imageSrc);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[scale, scale]} />
      <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
    </mesh>
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
      <FloatingImage position={[-3, 2, 0]} imageSrc={tomatoImg} scale={1.2} />
      <FloatingImage position={[3, -1, -2]} imageSrc={appleImg} scale={1.3} />
      <FloatingImage position={[-2, -2, 1]} imageSrc={carrotImg} scale={1.4} />
      <FloatingImage position={[4, 1, -1]} imageSrc={lettuceImg} scale={1.5} />
      <FloatingImage position={[0, 0, 0]} imageSrc={pumpkinImg} scale={1.6} />
      <FloatingImage position={[-4, 0, -3]} imageSrc={broccoliImg} scale={1.2} />
      <FloatingImage position={[2, 2, -2]} imageSrc={pepperImg} scale={1.1} />
      <FloatingImage position={[-1, 1, 2]} imageSrc={tomatoImg} scale={1} />
      <FloatingImage position={[3, -2, 1]} imageSrc={carrotImg} scale={1.3} />
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
