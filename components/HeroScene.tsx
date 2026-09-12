"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Sparkles, ContactShadows } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function Cup(){
  const group=useRef<THREE.Group>(null);
  const { pointer }=useThree();
  useFrame((state,delta)=>{
    if(!group.current)return;
    group.current.rotation.y += delta*.12;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x,pointer.y*.08,.035);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z,-pointer.x*.08,.035);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x,pointer.x*.22,.025);
    group.current.position.y = Math.sin(state.clock.elapsedTime*.65)*.08;
  });
  return <group ref={group}>
    <mesh castShadow position={[0,-.15,0]}>
      <cylinderGeometry args={[1.25,1.05,1.1,64]} />
      <meshPhysicalMaterial color="#d7c3a3" metalness={.18} roughness={.18} clearcoat={.7}/>
    </mesh>
    <mesh position={[0,.43,0]} rotation={[Math.PI,0,0]}>
      <torusGeometry args={[1.02,.11,24,64]} />
      <meshStandardMaterial color="#b9965a" metalness={.9} roughness={.16}/>
    </mesh>
    <mesh position={[0,.42,0]}>
      <cylinderGeometry args={[.92,.92,.08,64]} />
      <meshPhysicalMaterial color="#100805" roughness={.12} clearcoat={1}/>
    </mesh>
    <mesh position={[1.2,.08,0]} rotation={[0,0,Math.PI/2]}>
      <torusGeometry args={[.42,.1,20,48,Math.PI*1.5]} />
      <meshStandardMaterial color="#b9965a" metalness={.9} roughness={.18}/>
    </mesh>
    <mesh position={[0,.48,0]}>
      <torusGeometry args={[.48,.015,8,64]} />
      <meshBasicMaterial color="#6f3d20" transparent opacity={.8}/>
    </mesh>
  </group>
}

function ForgeRing(){
  const ref=useRef<THREE.Group>(null);
  useFrame((_,delta)=>{if(ref.current)ref.current.rotation.z+=delta*.08});
  return <group ref={ref} position={[0,-1.2,-1.8]}>
    <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[2.1,.035,16,128]}/><meshBasicMaterial color="#b9965a" transparent opacity={.45}/></mesh>
    <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[2.55,.012,12,128]}/><meshBasicMaterial color="#d46a35" transparent opacity={.3}/></mesh>
  </group>
}

function CameraRig(){
  const {camera}=useThree();
  useEffect(()=>{
    const onScroll=()=>{
      const p=Math.min(window.scrollY/window.innerHeight,3);
      camera.position.z=THREE.MathUtils.lerp(5.2,7.2,p*.55);
      camera.position.y=THREE.MathUtils.lerp(.4,-.3,p*.5);
      camera.rotation.z=THREE.MathUtils.lerp(0,p*.035,.4);
    };
    window.addEventListener("scroll",onScroll,{passive:true});
    return()=>window.removeEventListener("scroll",onScroll);
  },[camera]);
  return null;
}

export default function HeroScene(){
 return <Canvas className="heroCanvas" dpr={[1,1.6]} camera={{position:[0,.4,5.2],fov:38}} gl={{antialias:true,alpha:true,powerPreference:"high-performance"}}>
   <color attach="background" args={["#080706"]}/>
   <fog attach="fog" args={["#080706",5,14]}/>
   <ambientLight intensity={1.15}/>
   <spotLight position={[4,6,4]} intensity={110} angle={.35} penumbra={1} color="#ffd6a0"/>
   <pointLight position={[-4,1,2]} intensity={35} color="#d46a35"/>
   <pointLight position={[2,-2,-2]} intensity={18} color="#b9965a"/>
   <Float speed={1.15} rotationIntensity={.08} floatIntensity={.2}><Cup/></Float>
   <ForgeRing/>
   <Sparkles count={110} scale={[9,6,9]} size={1.25} speed={.3} color="#b9965a"/>
   <ContactShadows position={[0,-1.45,0]} opacity={.45} scale={8} blur={2.5} far={5}/>
   <Environment preset="warehouse"/>
   <CameraRig/>
 </Canvas>
}
