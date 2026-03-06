import React, { useMemo } from 'react';
import { Clock, CheckCircle2, AlertCircle, MessageSquare, Target } from 'lucide-react';
import { Lead } from '../types';

interface ActivityFeedProps {
  leads: Lead[];
}

export const ActivityFeed = ({ leads }: ActivityFeedProps) => {
  const activities = useMemo(() => {
    if (!leads.length) return [];
    
    // Sort leads by created date, newest first
    const sortedLeads = [...leads].sort((a, b) => b.createdAt - a.createdAt);
    
    // Get top 4 recent active leads to generate feed items
    return sortedLeads.slice(0, 4).map((lead, index) => {
      // Calculate human readable time ago
      const diffMs = Date.now() - lead.createdAt;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);
      
      let timeStr = 'Just now';
      if (diffDays > 0) timeStr = `${diffDays}d ago`;
      else if (diffHours > 0) timeStr = `${diffHours}h ago`;
      else if (diffMins > 0) timeStr = `${diffMins}m ago`;

      // Generate a variety of activities based on the lead for demo purposes
      if (index === 0) {
        return { 
          id: lead.id + '-new', 
          title: 'New Lead Added', 
          time: timeStr, 
          desc: `${lead.name} from ${lead.source || 'Direct'}`, 
          icon: Target, 
          color: 'text-[var(--color-primary)]' 
        };
      } else if (lead.status === 'won') {
         return { 
          id: lead.id + '-won', 
          title: 'Deal Closed', 
          time: timeStr, 
          desc: `${lead.name} marked as Closed Won`, 
          icon: CheckCircle2, 
          color: 'text-amaura-emerald' 
        };
      } else {
         return { 
          id: lead.id + '-activity', 
          title: 'Activity Logged', 
          time: timeStr, 
          desc: `Status updated to ${lead.status} for ${lead.name}`, 
          icon: Clock, 
          color: 'text-amaura-blue' 
        };
      }
    });
  }, [leads]);

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
              <p className="text-[11px] text-amaura-text-muted leading-relaxed line-clamp-1">{item.desc}</p>
            </div>
          </div>
        ))}
        {activities.length === 0 && (
          <div className="text-center py-4 text-xs text-amaura-text-muted">No recent activity detected.</div>
        )}
      </div>

      {activities.length > 0 && (
        <button className="w-full py-2 text-[9px] font-bold uppercase tracking-widest text-amaura-text-muted hover:text-[var(--color-primary)] transition-colors border-t border-white/5 mt-2">
          View Full Audit Log
        </button>
      )}
    </div>
  );
};
