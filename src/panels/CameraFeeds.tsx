import React from 'react';
import { useDashboardStore } from '../store';
import { GlassCard } from '../ui/GlassCard';
import { useEffect, useRef } from 'react';

export const CameraFeeds: React.FC = () => {
  const cameras = useDashboardStore(state=>state.cameras);

  const canvases = useRef<HTMLCanvasElement[]>([]);
  useEffect(()=>{
    let raf: number;
    const start = performance.now();
    function draw(){
      raf = requestAnimationFrame(draw);
      const t = (performance.now()-start)/1000;
      canvases.current.forEach((cv, idx)=>{
        if(!cv) return; const ctx = cv.getContext('2d'); if(!ctx) return;
        const w = cv.width = cv.clientWidth * devicePixelRatio; const h = cv.height = cv.clientHeight * devicePixelRatio;
        ctx.scale(devicePixelRatio, devicePixelRatio);
        ctx.clearRect(0,0,w,h);
  // background gradient flicker enhanced
  const g = ctx.createLinearGradient(0,0,w,h);
  g.addColorStop(0,'#12202b'); g.addColorStop(1,'#0a141c');
  ctx.fillStyle = g; ctx.fillRect(0,0,w,h);
  // subtle vignette
  const vg = ctx.createRadialGradient(w/2,h/2,10, w/2,h/2, Math.max(w,h)/1.2);
  vg.addColorStop(0,'rgba(0,0,0,0)');
  vg.addColorStop(1,'rgba(0,0,0,0.55)');
  ctx.fillStyle = vg; ctx.fillRect(0,0,w,h);
        // moving noise stripes
        ctx.globalAlpha = 0.25;
        for(let i=0;i<20;i++){
          const y = (t*40 + i*18) % (h/ devicePixelRatio);
          ctx.fillStyle = i%2? '#2a415e':'#22364e';
          ctx.fillRect(0,y,w,4);
        }
        ctx.globalAlpha=1;
        // fake detected objects (rectangles) with pulsing alpha
        const seed = (idx+1)*3;
        for(let j=0;j<3;j++){
          const x = (Math.sin(t*0.7 + seed + j)*0.5+0.5)*(w/devicePixelRatio-60)+20;
          const y = (Math.cos(t*0.9 + seed + j)*0.5+0.5)*(h/devicePixelRatio-50)+15;
          ctx.strokeStyle = 'rgba(90,180,230,'+(0.55+0.45*Math.sin(t*2 + j)+')');
          ctx.lineWidth=2; ctx.strokeRect(x,y,40,28);
          ctx.strokeStyle = 'rgba(90,180,230,0.15)'; ctx.setLineDash([4,4]); ctx.strokeRect(x-4,y-4,48,36); ctx.setLineDash([]);
        }
        // reticle crosshair center
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.beginPath();
        ctx.moveTo(w/2/devicePixelRatio - 14, h/2/devicePixelRatio);
        ctx.lineTo(w/2/devicePixelRatio + 14, h/2/devicePixelRatio);
        ctx.moveTo(w/2/devicePixelRatio, h/2/devicePixelRatio - 14);
        ctx.lineTo(w/2/devicePixelRatio, h/2/devicePixelRatio + 14);
        ctx.stroke();
        // overlay text
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.font = '11px system-ui';
        ctx.fillText('Stream '+ (idx+1), 8, 14);
        ctx.fillStyle = 'rgba(120,200,235,0.8)';
        ctx.fillRect(w/devicePixelRatio - 54, 6, 8, 8);
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = '10px system-ui';
        ctx.fillText('REC', w/devicePixelRatio - 42, 13);
      });
    }
    draw();
    return ()=> cancelAnimationFrame(raf);
  },[]);
  return (
    <GlassCard title="Camera Feeds">
      <div className="cam-grid">
        {cameras.map((c,i) => (
          <div key={c.id} className="cam-box">
            <canvas ref={el=>{ if(el) canvases.current[i]=el; }} className="cam-canvas" />
            <div className="cam-overlay">Objs {c.objects} • Anom {c.anomalies}</div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};