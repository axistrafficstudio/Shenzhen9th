import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { useDashboardStore } from '../store';

interface CommandButton { id:string; label:string; command:string; variant?:'accent'|'danger'|'ghost'; }

const modeLabels: Record<string,string> = {
  'idle': 'Idle',
  'drone-pilot': 'Drone Pilot',
  'robot-arm-6': 'Arm 6 Axis',
  'robot-arm-8': 'Arm 8 Axis',
  'amr-manual': 'AMR Manual'
};

const droneCommands: CommandButton[][] = [
  [ { id:'arm', label:'ARM', command:'drone.arm', variant:'danger' }, { id:'takeoff', label:'TO', command:'drone.takeoff', variant:'accent' }, { id:'land', label:'LAND', command:'drone.land', variant:'danger' } ],
  [ { id:'up', label:'↑', command:'drone.up' }, { id:'forward', label:'FWD', command:'drone.forward' }, { id:'down', label:'↓', command:'drone.down' } ],
  [ { id:'left', label:'←', command:'drone.left' }, { id:'hover', label:'HOV', command:'drone.hover', variant:'accent' }, { id:'right', label:'→', command:'drone.right' } ],
  [ { id:'yawL', label:'⟲', command:'drone.yawLeft' }, { id:'back', label:'BACK', command:'drone.back' }, { id:'yawR', label:'⟳', command:'drone.yawRight' } ],
];

const arm6Commands: CommandButton[][] = [
  [ { id:'enable', label:'ENABLE', command:'arm6.enable', variant:'accent' }, { id:'home', label:'HOME', command:'arm6.home' }, { id:'stop', label:'STOP', command:'arm6.stop', variant:'danger' } ],
  [ { id:'j1-', label:'J1-', command:'arm6.j1.dec' }, { id:'j1+', label:'J1+', command:'arm6.j1.inc' }, { id:'grip', label:'GRIP', command:'arm6.grip.toggle' } ],
  [ { id:'j2-', label:'J2-', command:'arm6.j2.dec' }, { id:'j2+', label:'J2+', command:'arm6.j2.inc' }, { id:'lift', label:'LIFT', command:'arm6.lift' } ],
  [ { id:'j3-', label:'J3-', command:'arm6.j3.dec' }, { id:'j3+', label:'J3+', command:'arm6.j3.inc' }, { id:'cal', label:'CAL', command:'arm6.calibrate' } ],
];

const arm8Commands: CommandButton[][] = [
  [ { id:'enable', label:'ENABLE', command:'arm8.enable', variant:'accent' }, { id:'home', label:'HOME', command:'arm8.home' }, { id:'stop', label:'STOP', command:'arm8.stop', variant:'danger' } ],
  [ { id:'j1-', label:'J1-', command:'arm8.j1.dec' }, { id:'j1+', label:'J1+', command:'arm8.j1.inc' }, { id:'j7-', label:'J7-', command:'arm8.j7.dec' } ],
  [ { id:'j2-', label:'J2-', command:'arm8.j2.dec' }, { id:'j2+', label:'J2+', command:'arm8.j2.inc' }, { id:'j7+', label:'J7+', command:'arm8.j7.inc' } ],
  [ { id:'j3-', label:'J3-', command:'arm8.j3.dec' }, { id:'j3+', label:'J3+', command:'arm8.j3.inc' }, { id:'cal', label:'CAL', command:'arm8.calibrate' } ],
];

const amrCommands: CommandButton[][] = [
  [ { id:'enable', label:'ENABLE', command:'amr.enable', variant:'accent' }, { id:'dock', label:'DOCK', command:'amr.dock' }, { id:'stop', label:'STOP', command:'amr.stop', variant:'danger' } ],
  [ { id:'forward', label:'FWD', command:'amr.forward' }, { id:'rotateL', label:'⟲', command:'amr.turn.left' }, { id:'rotateR', label:'⟳', command:'amr.turn.right' } ],
  [ { id:'left', label:'←', command:'amr.left' }, { id:'slow', label:'SLOW', command:'amr.speed.slow' }, { id:'right', label:'→', command:'amr.right' } ],
  [ { id:'back', label:'BACK', command:'amr.back' }, { id:'fast', label:'FAST', command:'amr.speed.fast' }, { id:'task', label:'TASK', command:'amr.task.pick' } ],
];

function commandMatrix(mode: string): CommandButton[][] {
  switch(mode){
    case 'drone-pilot': return droneCommands;
    case 'robot-arm-6': return arm6Commands;
    case 'robot-arm-8': return arm8Commands;
    case 'amr-manual': return amrCommands;
    default: return [];
  }
}

export const RemoteControlPanel: React.FC = () => {
  const mode = useDashboardStore(s=>s.controlMode);
  const setMode = useDashboardStore(s=>s.setControlMode);
  const issue = useDashboardStore(s=>s.issueControlCommand);
  const log = useDashboardStore(s=>s.controlLog);

  const matrix = commandMatrix(mode);

  return (
    <div className="remote-dock bottom" aria-label="Factory Manual Control Module">
      <GlassCard title="Manual Control" className="remote-card" dense>
        <div className="remote-modes" role="tablist" aria-label="Control Modes">
          {(['idle','drone-pilot','robot-arm-6','robot-arm-8','amr-manual'] as const).map(m => (
            <button
              key={m}
              role="tab"
              aria-selected={mode===m ? 'true':'false'}
              className={"remote-mode" + (mode===m? ' active':'')}
              onClick={()=> setMode(m)}
            >{modeLabels[m]}</button>
          ))}
        </div>
        {matrix.length===0 && (
          <div className="remote-placeholder">Selecciona un modo para habilitar controles manuales.</div>
        )}
        {matrix.length>0 && (
          <div className="remote-grid">
            {matrix.map((row,i)=>(
              <div key={i} className="remote-row">
                {row.map(btn => (
                  <button
                    key={btn.id}
                    className={"remote-btn" + (btn.variant? ' '+btn.variant:'')}
                    onClick={()=>issue(btn.command)}
                    aria-label={btn.label + ' command'}
                  >{btn.label}</button>
                ))}
              </div>
            ))}
          </div>
        )}
        <div className="remote-log" aria-live="polite">
          {log.slice(-6).reverse().map(entry => (
            <div key={entry.id} className="remote-log-line"><span className="t">{new Date(entry.ts).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit',second:'2-digit'})}</span> <span className="m">[{modeLabels[entry.mode]||entry.mode}]</span> {entry.command}</div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};