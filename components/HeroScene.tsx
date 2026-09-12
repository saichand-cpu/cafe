"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Cup(){
  const ref=useRef<THREE.Group>(null);
  useFrame((state,delta)=>{if(ref.current){ref.current.rotation.y+=delta*.18;ref.current.position.y=Math.sin(state.clock.elapsedTime*.8)*.08}});
  return <group ref={ref}>
    <mesh castShadow position={[0,-.15,0]}>
      <cylinderGeometry args={[1.25,1.05,1.1,64]} />
      <meshStandardMaterial color="#d7c3a3" metalness={.15} roughness={.2}/>
    </mesh>
    <mesh position={[0,.43,0]} rotation={[Math.PI,0,0]}>
      <torusGeometry args={[1.02,.11,24,64]} />
      <meshStandardMaterial color="#b9965a" metalness={.8} roughness={.2}/>
    </mesh>
    <mesh position={[0,.42,0]}>
      <cylinderGeometry args={[.92,.92,.08,64]} />
      <meshStandardMaterial color="#160d08" roughness={.25}/>
    </mesh>
    <mesh position={[1.2,.08,0]} rotation={[0,0,Math.PI/2]}>
      <torusGeometry args={[.42,.1,20,48,Math.PI*1.5]} />
      <meshStandardMaterial color="#b9965a" metalness={.8} roughness={.2}/>
    </mesh>
  </group>
}

export default function HeroScene(){
 return <Canvas className="heroCanvas" dpr={[1,1.5]} camera={{position:[0,.4,5.2],fov:38}} gl={{antialias:true,alpha:true}}>
   <ambientLight intensity={1.2}/><spotLight position={[4,6,4]} intensity={90} angle={.35} penumbra={1} color="#ffd6a0"/><pointLight position={[-4,1,2]} intensity={25} color="#d46a35"/>
   <Float speed={1.2} rotationIntensity={.1} floatIntensity={.25}><Cup/></Float>
   <Sparkles count={80} scale={[8,5,8]} size={1.3} speed={.35} color="#b9965a"/>
   <Environment preset="warehouse"/>
 </Canvas>
}
