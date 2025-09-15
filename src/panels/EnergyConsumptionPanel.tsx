import React, { useMemo } from 'react';
import { useDashboardStore } from '../store';
import { GlassCard } from '../ui/GlassCard';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const EnergyConsumptionPanel: React.FC = () => {
  const energy = useDashboardStore(s=>s.env.energyKwh);
  const data = useMemo(()=> energy.map((v,i)=>({ t: i-(energy.length-24), kwh: Number(v.toFixed(1)) })), [energy]);
  const current = energy[energy.length-1];
  const avg = energy.reduce((a,b)=>a+b,0)/energy.length;
  return (
    <GlassCard title="Energy Consumption (kWh)">
      <div className="energy-stats"><strong>{current.toFixed(1)}</strong><span>current</span><strong>{avg.toFixed(1)}</strong><span>avg</span></div>
  <div className="energy-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, left: 0, right: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7aa9ff" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#7aa9ff" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="t" hide />
            <YAxis hide domain={[0,'dataMax + 10']} />
            <Tooltip contentStyle={{ background:'rgba(255,255,255,0.7)', border:'1px solid rgba(255,255,255,0.4)', fontSize:12 }} labelFormatter={()=>''} formatter={(value)=>[value+' kWh','']} />
            <Area type="monotone" dataKey="kwh" stroke="#5c8fe6" strokeWidth={2} fill="url(#energyGrad)" animationDuration={600} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};