import { motion } from 'motion/react';
import { Sidebar } from '../components/Sidebar';
import { useLeads } from '../hooks/useLeads';
import { Columns, GripVertical, Phone, Target, Sparkles } from 'lucide-react';
import { Lead } from '../types';

const columns = [
  { id: 'new', title: 'New Lead', color: 'var(--color-amaura-blue)' },
  { id: 'contacted', title: 'Contacted', color: 'var(--color-primary)' },
  { id: 'proposal', title: 'Proposal Sent', color: 'var(--color-amaura-emerald)' },
  { id: 'won', title: 'Closed Won', color: '#10b981' },
];

export const KanbanBoard = () => {
  const { leads, loading } = useLeads();

  const getLeadsByStatus = (status: string) => {
    // Map existing status to pipeline columns
    const mappedLeads = leads.filter(l => {
      if (status === 'proposal') return l.status === 'won' && l.source === 'Facebook'; // Mocking logic for demo
      if (status === 'won') return l.status === 'won' && l.source !== 'Facebook';
      return l.status === status;
    });
    return mappedLeads;
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white overflow-hidden">
      <Sidebar />
      
      <main className="flex-grow ml-64 p-8 lg:p-12 relative h-screen overflow-y-auto">
        {/* Glow */}
        <div 
          className="absolute -top-[10%] left-[20%] w-[60%] h-[50%] rounded-full blur-[150px] opacity-10 pointer-events-none"
          style={{ background: 'var(--color-primary)' }}
        />
        
        <div className="max-w-[1600px] mx-auto space-y-8 relative z-10 w-full h-full flex flex-col">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
            <div>
              <div className="flex items-center gap-2 text-[var(--color-primary)] mb-2">
                <Columns className="w-4 h-4 fill-current" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Live Pipeline</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-3">
                Kanban Board
              </h1>
              <p className="text-amaura-text-muted">Drag cards to move leads through the sales pipeline.</p>
            </div>
          </div>

          {/* Board */}
          <div className="flex-grow flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            {loading ? (
               <div className="w-full h-full flex items-center justify-center">
                 <div className="w-8 h-8 rounded-full border-2 border-[var(--color-primary)] border-t-transparent animate-spin" />
               </div>
            ) : (
              columns.map((col, index) => (
                <motion.div 
                  key={col.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-[350px] shrink-0 snap-start flex flex-col"
                >
                  {/* Column Header */}
                  <div 
                    className="glass-panel px-5 py-3 rounded-2xl mb-4 border-l-4 shadow-lg flex justify-between items-center"
                    style={{ borderLeftColor: col.color }}
                  >
                    <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                      {col.title}
                    </h3>
                    <span className="text-xs font-bold text-amaura-text-muted bg-white/5 px-2 py-0.5 rounded-full">
                      {getLeadsByStatus(col.id).length}
                    </span>
                  </div>

                  {/* Cards Area */}
                  <div className="flex-grow space-y-4 overflow-y-auto pr-2 pb-20 custom-scrollbar">
                    {getLeadsByStatus(col.id).map(lead => (
                      <div 
                        key={lead.id}
                        className="bento-inner p-5 hover:border-white/20 transition-all cursor-grab active:cursor-grabbing group hover:-translate-y-1 shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-[#1a1a1c]/80"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold font-display text-lg text-white group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">{lead.name}</h4>
                          <GripVertical className="w-4 h-4 text-white/20 group-hover:text-white/50" />
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-xs text-amaura-text-muted">
                            <Phone className="w-3.5 h-3.5" />
                            {lead.phone || 'No phone'}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-amaura-text-muted">
                            <Target className="w-3.5 h-3.5" />
                            Est. Value: <span className="text-white font-mono">$150/mo</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-end border-t border-white/5 pt-4">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[10px] font-black uppercase tracking-widest border border-[var(--color-primary)]/20">
                            <Sparkles className="w-3 h-3" />
                            High Intent
                          </div>
                          <p className="text-[10px] text-amaura-text-muted font-medium">
                            {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
