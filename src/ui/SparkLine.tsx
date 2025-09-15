import React, { useMemo } from 'react';
import { useDashboardStore } from '../store';

interface SparkLineProps {
  data: number[];
  height?: number;
  strokeWidth?: number;
  gradientId: string;
  min?: number;
  max?: number;
  filled?: boolean;
}

export const SparkLine: React.FC<SparkLineProps> = ({ data, height=38, strokeWidth=2, gradientId, min, max, filled }) => {
  const dims = { w: 120, h: height };
  const domainMin = min ?? Math.min(...data);
  const domainMax = max ?? Math.max(...data);
  const range = domainMax - domainMin || 1;
  const points = data.map((v,i)=> {
    const x = (i / (data.length - 1)) * (dims.w);
    const y = dims.h - ((v - domainMin)/range) * (dims.h - 4) - 2; // padding
    return [x,y];
  });
  const d = points.map((p,i)=> (i===0? 'M':'L') + p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
  const areaD = filled ? `${d} L ${points[points.length-1][0].toFixed(1)},${dims.h} L 0,${dims.h} Z` : undefined;
  return (
    <svg className="sparkline" width={dims.w} height={dims.h} viewBox={`0 0 ${dims.w} ${dims.h}`}> 
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-alt)" />
        </linearGradient>
        {filled && (
          <linearGradient id={gradientId+'Fill'} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.55} />
            <stop offset="100%" stopColor="var(--accent-alt)" stopOpacity={0} />
          </linearGradient>
        )}
      </defs>
      {filled && areaD && <path d={areaD} fill={`url(#${gradientId}Fill)`} opacity={0.6} />}
      <path d={d} fill="none" stroke={`url(#${gradientId})`} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};
