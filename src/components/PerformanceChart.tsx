import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { Lead } from '../types';

interface PerformanceChartProps {
  leads: Lead[];
}

export const PerformanceChart = ({ leads }: PerformanceChartProps) => {
  const { points, velocity, isPositive } = useMemo(() => {
    // If no leads, return flat line
    if (!leads.length) return { points: "0,100 100,100", velocity: 0, isPositive: true };

    const now = Date.now();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    
    // Calculate Velocity (Current 30 days vs Previous 30 days)
    const currentPeriod = leads.filter(l => (now - l.createdAt) <= thirtyDays).length;
    const previousPeriod = leads.filter(l => {
      const age = now - l.createdAt;
      return age > thirtyDays && age <= (thirtyDays * 2);
    }).length;

    let calcVelocity = 0;
    if (previousPeriod === 0 && currentPeriod > 0) calcVelocity = 100;
    else if (previousPeriod > 0) {
      calcVelocity = ((currentPeriod - previousPeriod) / previousPeriod) * 100;
    }

    // Generate SVG points based on 6 intervals of time
    const interval = thirtyDays; // 1 month per point
    const dataPoints = [];
    let maxCount = 1;

    // Collect data for 6 periods (months) looking backwards
    for (let i = 5; i >= 0; i--) {
      const periodEnd = now - (i * interval);
      const periodStart = periodEnd - interval;
      
      const count = leads.filter(l => l.createdAt >= periodStart && l.createdAt < periodEnd).length;
      dataPoints.push(count);
      if (count > maxCount) maxCount = count;
    }

    // Convert data to SVG coordinates (100x100 box, y is inverted)
    const pointStrings = dataPoints.map((val, index) => {
      const x = (index / (dataPoints.length - 1)) * 100;
      // Map value relative to maxCount, pad bottom so it doesn't hit 100
      const y = 90 - ((val / maxCount) * 80); 
      return `${x},${y}`;
    });

    // Add bezier curves for smoothness in SVG points (simple approximation)
    // For simplicity of standard polyline, we just use straight lines as "world class" sharp graphs are also popular
    return {
      points: pointStrings.join(' '),
      velocity: calcVelocity,
      isPositive: calcVelocity >= 0
    };
  }, [leads]);
  
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-amaura-text-muted mb-1">Lead Velocity</p>
          <h4 className="text-2xl font-black font-display">
            {isPositive ? '+' : ''}{velocity.toFixed(1)}%
          </h4>
        </div>
        <div className={`px-2 py-1 text-[10px] font-bold rounded-lg flex items-center gap-1 ${isPositive ? 'bg-amaura-emerald/10 text-amaura-emerald' : 'bg-red-500/10 text-red-500'}`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} 
          {isPositive ? 'Growth' : 'Decline'}
        </div>
      </div>

      <div className="relative h-24 mt-4 overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`M ${points} V 100 H 0 Z`}
            fill="url(#gradient)"
            className="animate-shimmer"
          />
          <polyline
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
            style={{ filter: 'drop-shadow(0 0 8px var(--color-primary))' }}
          />
        </svg>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
        <span className="text-[10px] text-amaura-text-muted font-bold tracking-widest uppercase text-left">Real-time Pulse</span>
        <button className="text-[var(--color-primary)] hover:text-white transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
