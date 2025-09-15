import React from 'react';
import { useDashboardStore } from '../store';
import { GlassCard } from '../ui/GlassCard';

export const SecurityPanel: React.FC = () => {
  const security = useDashboardStore(state=>state.security);
  return (
    <GlassCard title="Security & Alarm">
      <div className="kv-grid">
        <div><label>Intrusion</label><strong>{security.intrusion? 'ALERT':'Normal'}</strong></div>
        <div><label>Doors</label><strong>{security.doorsLocked? 'Locked':'Open'}</strong></div>
        <div><label>Windows</label><strong>{security.windowsLocked? 'Locked':'Open'}</strong></div>
        <div><label>Siren</label><strong>{security.siren? 'ON':'Off'}</strong></div>
      </div>
      <button className="primary" style={{ marginTop: 12 }}>Emergency Stop</button>
    </GlassCard>
  );
};