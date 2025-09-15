import React from 'react';
import { useDashboardStore } from '../store';
import { GlassCard } from '../ui/GlassCard';

export const DroneRobotPanel: React.FC = () => {
  const drones = useDashboardStore(state=>state.drones);
  const arms = useDashboardStore(state=>state.arms);
  const amrs = useDashboardStore(state=>state.amrs);
  return (
    <GlassCard title="Drones & Robots">
      <div className="subsection">
        <h4>Drones</h4>
        <ul className="list">
          {drones.map(d=> <li key={d.id}><strong>{d.id}</strong> {d.state} • {d.battery}%</li>)}
        </ul>
      </div>
      <div className="subsection">
        <h4>Arms</h4>
        <ul className="list">
          {arms.map(a=> <li key={a.id}><strong>{a.id}</strong> load {a.load.toFixed(0)}% temp {a.temperature.toFixed(1)}°C</li>)}
        </ul>
      </div>
      <div className="subsection">
        <h4>AMRs</h4>
        <ul className="list">
          {amrs.map(r=> <li key={r.id}><strong>{r.id}</strong> {r.task} • {r.battery.toFixed(0)}%</li>)}
        </ul>
      </div>
    </GlassCard>
  );
};