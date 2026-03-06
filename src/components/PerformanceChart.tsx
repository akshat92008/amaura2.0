import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

export const PerformanceChart = () => {
  // Mock data for a "world-class" SVG chart
  const points = "0,80 20,60 40,75 60,30 80,45 100,10";
  
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-amaura-text-muted mb-1">Lead Velocity</p>
          <h4 className="text-2xl font-black font-display">+240%</h4>
        </div>
        <div className="px-2 py-1 bg-amaura-emerald/10 text-amaura-emerald text-[10px] font-bold rounded-lg flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> Growth
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
