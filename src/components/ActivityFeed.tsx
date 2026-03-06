import React from 'react';
import { Clock, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';

const activities = [
  { id: 1, type: 'lead', title: 'New High-Intent Lead', time: '12m ago', desc: 'Roofing inquiry from Beverly Hills', icon: AlertCircle, color: 'text-amaura-blue' },
  { id: 2, type: 'update', title: 'System Strategy Optimized', time: '1h ago', desc: 'AI retrained on local conversion patterns', icon: CheckCircle2, color: 'text-amaura-emerald' },
  { id: 3, type: 'message', title: 'Client Message', time: '3h ago', desc: 'Status request regarding Apex Solar project', icon: MessageSquare, color: 'text-[var(--color-primary)]' },
];

export const ActivityFeed = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted px-1">Interactive Timeline</h4>
        <div className="w-2 h-2 rounded-full bg-amaura-emerald animate-pulse" />
      </div>
      
      <div className="space-y-4">
        {activities.map((item) => (
          <div key={item.id} className="flex gap-4 group cursor-pointer">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="w-px h-full bg-white/5 my-2" />
            </div>
            <div className="pb-4">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-bold text-white group-hover:text-[var(--color-primary)] transition-colors">{item.title}</p>
                <span className="text-[9px] text-amaura-text-muted flex items-center gap-1">
                  <Clock className="w-2 h-2" /> {item.time}
                </span>
              </div>
              <p className="text-xs text-amaura-text-muted leading-relaxed line-clamp-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-2 text-[9px] font-bold uppercase tracking-widest text-amaura-text-muted hover:text-white transition-colors border-t border-white/5 mt-2">
        View Full Audit Log
      </button>
    </div>
  );
};
