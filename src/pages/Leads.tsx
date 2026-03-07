import { motion } from 'motion/react';
import { Sidebar } from '../components/Sidebar';
import { LeadList } from '../components/crm/LeadList';
import { useLeads } from '../hooks/useLeads';
import { Sparkles, Download, Filter, Plus } from 'lucide-react';

export const Leads = () => {
  const { leads, loading } = useLeads();

  return (
    <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white">
      <Sidebar />
      
      <main className="flex-grow ml-64 p-8 lg:p-12 relative overflow-y-auto">
        {/* Ambient background glows */}
        <div 
          className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[180px] opacity-20 pointer-events-none"
          style={{ background: 'var(--color-primary)' }}
        />
        
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[var(--color-primary)] mb-2">
                <Sparkles className="w-4 h-4 fill-current" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">CRM Database</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-3">
                Lead Management
              </h1>
              <p className="text-amaura-text-muted">Live AI-scored leads mapped directly from your pipeline.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
                <Download className="w-4 h-4" /> Export
              </button>
              <button 
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:brightness-110 transition-all"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <Plus className="w-4 h-4" /> Add Lead
              </button>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="shadow-2xl overflow-hidden"
          >
            <LeadList leads={leads} loading={loading} />
          </motion.div>
        </div>
      </main>
    </div>
  );
};
