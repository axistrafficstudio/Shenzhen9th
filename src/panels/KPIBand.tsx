import React from 'react';
import { useDashboardStore } from '../store';
import { SparkLine } from '../ui/SparkLine';

const Stat: React.FC<{ label:string; value:string; unit?:string; series:number[]; gid:string; min?:number; max?:number; filled?:boolean }> = ({ label, value, unit, series, gid, min, max, filled }) => {
  return (
    <div className="kpi-item">
      <div className="kpi-head">{label}</div>
      <div className="kpi-value"><strong>{value}</strong>{unit && <span className="unit">{unit}</span>}</div>
      <SparkLine data={series} gradientId={gid} min={min} max={max} filled={filled} />
    </div>
  );
};

export const KPIBand: React.FC = () => {
  const throughput = useDashboardStore(s=>s.throughputHistory);
  const quality = useDashboardStore(s=>s.qualityHistory);
  const oee = useDashboardStore(s=>s.oeeHistory);
  const scrap = useDashboardStore(s=>s.scrapHistory);
  const prod = useDashboardStore(s=>s.production);
  const energy = useDashboardStore(s=>s.env.energyKwh);

  const latest = <T extends number[]>(arr:T) => arr[arr.length-1];

  return (
    <div className="kpi-band glass" aria-label="Key Performance Indicators">
      <Stat label="Throughput" value={latest(throughput).toFixed(0)} unit="/h" series={throughput} gid="thru" min={120} max={320} filled />
      <Stat label="Calidad" value={latest(quality).toFixed(1)} unit="%" series={quality} gid="qual" min={80} max={100} />
      <Stat label="OEE" value={latest(oee).toFixed(1)} unit="%" series={oee} gid="oee" min={60} max={100} />
      <Stat label="Scrap" value={latest(scrap).toFixed(1)} unit="pcs" series={scrap} gid="scrap" min={0} max={20} filled />
      <Stat label="Job" value={(prod.jobProgress*100).toFixed(1)} unit="%" series={oee} gid="job" min={0} max={100} />
      <Stat label="Energy" value={latest(energy).toFixed(0)} unit="kWh" series={energy.slice(-40)} gid="energy" min={20} max={140} />
    </div>
  );
};
