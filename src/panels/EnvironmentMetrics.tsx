import React from 'react';
import { useDashboardStore } from '../store';
import { GlassCard } from '../ui/GlassCard';

export const EnvironmentMetrics: React.FC = () => {
  const env = useDashboardStore(state=>state.env);
  return (
    <GlassCard title="Environment">
      <div className="kv-grid">
        <div><label>Temp</label><strong>{env.temperature.toFixed(1)}°C</strong></div>
        <div><label>Humidity</label><strong>{env.humidity.toFixed(0)}%</strong></div>
        <div><label>Pressure</label><strong>{env.pressure.toFixed(1)} kPa</strong></div>
        <div><label>Air QI</label><strong>{env.airQuality.toFixed(0)}</strong></div>
        <div><label>Smoke</label><strong>{env.smoke? 'YES':'No'}</strong></div>
        <div><label>Fire</label><strong>{env.fire? 'ALERT':'--'}</strong></div>
      </div>
    </GlassCard>
  );
};