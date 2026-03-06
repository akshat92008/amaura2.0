import { Lead } from '../types';
import { 
  MoreHorizontal, 
  Search, 
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface LeadTableProps {
  leads: Lead[];
  loading: boolean;
}

const statusMap = {
  new: { icon: Clock, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  contacted: { icon: AlertCircle, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  won: { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  lost: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10' },
};

export const LeadTable = ({ leads, loading }: LeadTableProps) => {
  return (
    <div className="glass-panel rounded-3xl overflow-hidden flex flex-col h-full border border-[var(--color-amaura-border)]">
      <div className="p-6 border-b border-[var(--color-amaura-border)] flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-white">Recent Leads</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-amaura-text-muted)]" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-[var(--color-amaura-surface)] border border-[var(--color-amaura-border)] rounded-full py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
            />
          </div>
          <button className="p-2 rounded-full hover:bg-[var(--color-amaura-surface-hover)] transition-all border border-[var(--color-amaura-border)]">
            <Filter className="w-4 h-4 text-[var(--color-amaura-text-muted)]" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--color-amaura-surface)] text-[var(--color-amaura-text-muted)] text-[10px] uppercase tracking-widest leading-6">
              <th className="px-6 py-4 font-semibold">Contact Info</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Source</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-amaura-border)]">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={4} className="px-6 py-8">
                    <div className="h-4 bg-white/5 rounded w-full"></div>
                  </td>
                </tr>
              ))
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-[var(--color-amaura-text-muted)] italic">
                  No leads found for your account.
                </td>
              </tr>
            ) : (
              leads.map((lead) => {
                const StatusIcon = statusMap[lead.status].icon;
                return (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-sm group-hover:text-[var(--color-primary)] transition-colors">{lead.name}</span>
                        <span className="text-[var(--color-amaura-text-muted)] text-xs">{lead.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${statusMap[lead.status].bg} ${statusMap[lead.status].color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {lead.status}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[var(--color-amaura-text-muted)] text-xs">{lead.source}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-[var(--color-amaura-text-muted)] hover:text-white transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
