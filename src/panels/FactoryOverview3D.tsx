import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GlassCard } from '../ui/GlassCard';

export const FactoryOverview3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(!mountRef.current) return;
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf2f6fa);
    const camera = new THREE.OrthographicCamera(-10,10,6,-6,0.1,100);
    camera.position.set(10,12,10);
    camera.lookAt(0,0,0);
    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    const light = new THREE.DirectionalLight(0xffffff, 1.1);
    light.position.set(4,8,6); scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff,0.55));
    const platform = new THREE.Mesh(new THREE.BoxGeometry(12,0.4,8), new THREE.MeshStandardMaterial({ color:0xd5dde8, metalness:0.2, roughness:0.7 }));
    platform.position.y=-0.2; scene.add(platform);
    function addMachine(x:number,z:number,color:number){
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.2,1,1.2), new THREE.MeshStandardMaterial({ color, metalness:0.3, roughness:0.4 }));
      body.position.set(x,0.5,z); scene.add(body);
    }
    [ [-4,-2,0x7aa9ff],[-2,-2,0x9bc9ff],[0,-2,0x89b7ff],[2,-2,0x7aa9ff],[4,-2,0x9bc9ff] ].forEach(m=>addMachine(m[0],m[1],m[2] as number));
    const armBase = new THREE.Mesh(new THREE.CylinderGeometry(0.6,0.6,0.3,32), new THREE.MeshStandardMaterial({ color:0x8fa8c6 }));
    armBase.position.set(-3,0,-0.5); scene.add(armBase);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.3,1.6,0.3), new THREE.MeshStandardMaterial({ color:0xffc569 }));
    arm.position.set(-3,1.1,-0.5); scene.add(arm);
    const conveyor = new THREE.Mesh(new THREE.BoxGeometry(6,0.2,1), new THREE.MeshStandardMaterial({ color:0x6fdc9d }));
    conveyor.position.set(1,0.1,1.5); scene.add(conveyor);
    let frame=0;
    const animate=()=>{ frame++; arm.rotation.z = Math.sin(frame*0.01)*0.4; renderer.render(scene,camera); requestAnimationFrame(animate); };
    animate();
    const handleResize=()=>{ renderer.setSize(mount.clientWidth, mount.clientHeight); };
    window.addEventListener('resize', handleResize);
    return ()=>{ window.removeEventListener('resize', handleResize); mount.removeChild(renderer.domElement); renderer.dispose(); };
  },[]);
  return (
    <GlassCard title="Factory Overview 3D" className="factory3d">
      <div ref={mountRef} className="three-mount" />
    </GlassCard>
  );
};