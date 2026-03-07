import { useState } from 'react';
import { Lead } from '../../types';
import { 
  MoreHorizontal, 
  Search, 
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Sparkles,
  DollarSign,
  Send
} from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { scoreLead, formatCurrency } from '../../lib/crmUtils';
import { motion, AnimatePresence } from 'motion/react';

interface LeadTableProps {
  leads: Lead[];
  loading: boolean;
}

const statusMap = {
  new: { icon: Clock, color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'New' },
  contacted: { icon: AlertCircle, color: 'text-yellow-400', bg: 'bg-yellow-400/10', label: 'Contacted' },
  proposal: { icon: Send, color: 'text-purple-400', bg: 'bg-purple-400/10', label: 'Proposal' },
  won: { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'Won' },
  lost: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10', label: 'Lost' },
};

export const LeadTable = ({ leads, loading }: LeadTableProps) => {
  const [scoringId, setScoringId] = useState<string | null>(null);

  const handleScoreLead = async (lead: Lead) => {
    setScoringId(lead.id);
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const score = scoreLead(lead);
    
    try {
      await updateDoc(doc(db, 'leads', lead.id), {
        score: score
      });
    } catch (error) {
      console.error("Error scoring lead:", error);
    } finally {
      setScoringId(null);
    }
  };

  return (
    <div className="glass-panel rounded-3xl overflow-hidden flex flex-col h-full border border-[var(--color-amaura-border)] bg-[#121214]/40">
      <div className="p-6 border-b border-[var(--color-amaura-border)] flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-xl font-display font-bold text-white">Lead Database</h2>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-amaura-text-muted)]" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="w-full bg-[var(--color-amaura-surface)] border border-[var(--color-amaura-border)] rounded-full py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all text-white"
            />
          </div>
          <button className="p-2.5 rounded-full hover:bg-[var(--color-amaura-surface-hover)] transition-all border border-[var(--color-amaura-border)] text-amaura-text-muted">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--color-amaura-surface)] text-[var(--color-amaura-text-muted)] text-[10px] uppercase tracking-widest leading-6">
              <th className="px-6 py-4 font-semibold">Contact Details</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">AI Score</th>
              <th className="px-6 py-4 font-semibold">Value</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-amaura-border)]">
            <AnimatePresence mode='popLayout'>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-6 py-8">
                      <div className="h-4 bg-white/5 rounded w-full"></div>
                    </td>
                  </tr>
                ))
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[var(--color-amaura-text-muted)] italic">
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => {
                  const status = statusMap[lead.status] || statusMap.new;
                  const StatusIcon = status.icon;
                  
                  return (
                    <motion.tr 
                      layout
                      key={lead.id} 
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-white font-medium text-sm group-hover:text-[var(--color-primary)] transition-colors">{lead.name}</span>
                          <span className="text-[var(--color-amaura-text-muted)] text-xs">{lead.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${status.bg} ${status.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        {lead.score ? (
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border 
                            ${lead.score === 'Hot' ? 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 
                              lead.score === 'Warm' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                              'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                            <Sparkles className="w-3 h-3" />
                            {lead.score}
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleScoreLead(lead)}
                            disabled={scoringId === lead.id}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all
                              ${scoringId === lead.id 
                                ? 'bg-white/5 text-amaura-text-muted cursor-not-allowed' 
                                : 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)] hover:text-white'}`}
                          >
                            {scoringId === lead.id ? (
                              <>
                                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Scoring...
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3 h-3" />
                                Score with AI
                              </>
                            )}
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1.5 text-white font-mono text-sm">
                          <DollarSign className="w-3.5 h-3.5 text-amaura-text-muted" />
                          {formatCurrency(lead.value || 0)}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="text-[var(--color-amaura-text-muted)] hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};
