import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { useDashboardStore } from '../store';
import { SparkLine } from '../ui/SparkLine';

export const AdvancedAnalyticsPanel: React.FC = () => {
  const throughput = useDashboardStore(s=>s.throughputHistory);
  const quality = useDashboardStore(s=>s.qualityHistory);
  const oee = useDashboardStore(s=>s.oeeHistory);
  const scrap = useDashboardStore(s=>s.scrapHistory);

  return (
    <GlassCard title="Advanced Analytics" className="analytics-card">
      <div className="analytics-grid">
        <div className="ana-block">
          <h4>Throughput vs OEE</h4>
          <div className="multi-line">
            <SparkLine data={throughput} gradientId="aa-thru" filled />
            <SparkLine data={oee} gradientId="aa-oee" />
          </div>
        </div>
        <div className="ana-block">
          <h4>Quality Stability</h4>
          <SparkLine data={quality} gradientId="aa-quality" />
        </div>
        <div className="ana-block">
          <h4>Scrap Trend</h4>
          <SparkLine data={scrap} gradientId="aa-scrap" filled />
        </div>
        <div className="ana-block ring-block">
          <h4>OEE Gauge</h4>
          <div className="oee-ring" data-val={oee[oee.length-1].toFixed(1)}>
            <svg viewBox="0 0 100 100" className="ring-svg">
              <circle cx="50" cy="50" r="42" className="ring-bg" />
              <circle cx="50" cy="50" r="42" className="ring-fg" data-p={(oee[oee.length-1]/100).toFixed(3)} />
              <text x="50" y="54" textAnchor="middle" className="ring-label">{oee[oee.length-1].toFixed(1)}%</text>
            </svg>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
