import React from 'react';
import { useDashboardStore } from '../store';
import { GlassCard } from '../ui/GlassCard';

export const ProductionMetrics: React.FC = () => {
  const prod = useDashboardStore(state=>state.production);
  return (
    <GlassCard title="Production">
      <div className="progress-block">
        <label>Current Job</label>
        <div className="progress"><div className="bar" style={{ width: (prod.jobProgress*100).toFixed(1)+'%' }} /></div>
        <small>{(prod.jobProgress*100).toFixed(1)}% • Forecast {prod.forecastHours}h</small>
      </div>
      <div className="kv-grid">
        <div><label>Total Units</label><strong>{prod.count}</strong></div>
        <div><label>Filament</label><strong>{prod.material.filament}%</strong></div>
        <div><label>Resin</label><strong>{prod.material.resin}%</strong></div>
        <div><label>Metal</label><strong>{prod.material.metal}%</strong></div>
      </div>
      {prod.maintenanceAlerts.map(a=> <div key={a} className="alert warn">{a}</div>)}
    </GlassCard>
  );
};