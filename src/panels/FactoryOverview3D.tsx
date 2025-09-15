import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GlassCard } from '../ui/GlassCard';

export const FactoryOverview3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(!mountRef.current) return;
    const mount = mountRef.current;
    const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf3f5f7);
    const camera = new THREE.OrthographicCamera(-10,10,6,-6,0.1,100);
    camera.position.set(10,12,10);
    camera.lookAt(0,0,0);
    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(6,10,6); keyLight.castShadow = false; scene.add(keyLight);
  const rim = new THREE.DirectionalLight(0x9bdcff, 0.6); rim.position.set(-8,6,-4); scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xbcd9ff,0x202830,0.7));
  const platformMat = new THREE.MeshStandardMaterial({ color:0xd5dde8, metalness:0.25, roughness:0.6 });
  const platform = new THREE.Mesh(new THREE.BoxGeometry(12,0.4,8), platformMat);
    platform.position.y=-0.2; scene.add(platform);
  // grid floor overlay
  const grid = new THREE.GridHelper(12, 24, 0x6fb8d2, 0x6fb8d2);
  (grid.material as THREE.Material).opacity = 0.25; (grid.material as THREE.Material).transparent = true;
  grid.position.y = 0.01; scene.add(grid);
    function addMachine(x:number,z:number,color:number){
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.2,1,1.2), new THREE.MeshStandardMaterial({ color, metalness:0.3, roughness:0.4 }));
      body.position.set(x,0.5,z); scene.add(body);
    }
    [ [-4,-2,0x7aa9ff],[-2,-2,0x9bc9ff],[0,-2,0x89b7ff],[2,-2,0x7aa9ff],[4,-2,0x9bc9ff] ].forEach(m=>addMachine(m[0],m[1],m[2] as number));
  const armBase = new THREE.Mesh(new THREE.CylinderGeometry(0.6,0.6,0.3,32), new THREE.MeshStandardMaterial({ color:0x8fa8c6, metalness:0.5, roughness:0.4 }));
    armBase.position.set(-3,0,-0.5); scene.add(armBase);
  const jointGroup = new THREE.Group(); jointGroup.position.set(-3,0.35,-0.5); scene.add(jointGroup);
  const armLower = new THREE.Mesh(new THREE.BoxGeometry(0.32,1.2,0.32), new THREE.MeshStandardMaterial({ color:0xffc569, metalness:0.3, roughness:0.45 }));
  armLower.position.y = 0.6; jointGroup.add(armLower);
  const armUpper = new THREE.Mesh(new THREE.BoxGeometry(0.28,1,0.28), new THREE.MeshStandardMaterial({ color:0xffd891, emissive:0x553300, emissiveIntensity:0.25, metalness:0.35, roughness:0.4 }));
  armUpper.position.y = 1.55; jointGroup.add(armUpper);
  const effector = new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.18,0.28,24), new THREE.MeshStandardMaterial({ color:0x6fdc9d, emissive:0x206040, emissiveIntensity:0.8 }));
  effector.position.y = 2.15; jointGroup.add(effector);
    const conveyor = new THREE.Mesh(new THREE.BoxGeometry(6,0.2,1), new THREE.MeshStandardMaterial({ color:0x6fdc9d, metalness:0.25, roughness:0.5 }));
    conveyor.position.set(1,0.1,1.5); scene.add(conveyor);
    // glowing indicator blocks on conveyor
    for(let i=0;i<4;i++){
      const block = new THREE.Mesh(new THREE.BoxGeometry(0.4,0.25,0.4), new THREE.MeshStandardMaterial({ color:0x3ab6c9, emissive:0x0b4a55, emissiveIntensity:0.9, metalness:0.4, roughness:0.3 }));
      block.position.set(-1.5 + i*1.2,0.35,1.5); scene.add(block);
    }
  let frame=0;
  const animate=()=>{ frame++; const t = frame*0.01; armLower.rotation.z = Math.sin(t)*0.4; armUpper.rotation.z = Math.sin(t*1.2+0.6)*0.5; effector.rotation.y += 0.05; renderer.render(scene,camera); requestAnimationFrame(animate); };
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