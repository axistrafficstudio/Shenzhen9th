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
        // background gradient flicker
        const g = ctx.createLinearGradient(0,0,w,h);
        g.addColorStop(0,'#1c2f4a'); g.addColorStop(1,'#0f1822');
        ctx.fillStyle = g; ctx.fillRect(0,0,w,h);
        // moving noise stripes
        ctx.globalAlpha = 0.25;
        for(let i=0;i<20;i++){
          const y = (t*40 + i*18) % (h/ devicePixelRatio);
          ctx.fillStyle = i%2? '#2a415e':'#22364e';
          ctx.fillRect(0,y,w,4);
        }
        ctx.globalAlpha=1;
        // fake detected objects (rectangles)
        const seed = (idx+1)*3;
        for(let j=0;j<3;j++){
          const x = (Math.sin(t*0.7 + seed + j)*0.5+0.5)*(w/devicePixelRatio-60)+20;
          const y = (Math.cos(t*0.9 + seed + j)*0.5+0.5)*(h/devicePixelRatio-50)+15;
          ctx.strokeStyle = '#7aa9ff'; ctx.lineWidth=2; ctx.strokeRect(x,y,40,28);
        }
        // overlay text
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.font = '11px system-ui';
        ctx.fillText('Stream '+ (idx+1), 8, 14);
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