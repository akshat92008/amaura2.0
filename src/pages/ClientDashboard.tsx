import { motion } from 'motion/react';
import { Sidebar } from '../components/Sidebar';
import { useLeads } from '../hooks/useLeads';
import { useAuth } from '../hooks/useAuth';
import { AnalyticsCards } from '../components/crm/AnalyticsCards';
import { Sparkles, MessageSquare, Box, Wallet, CheckCircle2 } from 'lucide-react';

export const ClientDashboard = () => {
  const { leads, loading } = useLeads();
  const { user } = useAuth();

  // Mock distribution calculation based on lead status
  const distribution = [
    { label: 'New', count: leads.filter(l => l.status === 'new').length },
    { label: 'Contacted', count: leads.filter(l => l.status === 'contacted').length },
    { label: 'Proposal', count: leads.filter(l => l.status === 'proposal').length },
    { label: 'Closed', count: leads.filter(l => l.status === 'won').length }
  ];
  const maxCount = Math.max(...distribution.map(d => d.count), 1);

  const activities = [
    { icon: MessageSquare, label: 'Lead moved to Proposal', time: '2 hours ago', color: '#8b5cf6' },
    { icon: Box, label: 'Alpha Build phase in progress', time: '1 day ago', color: '#4f46e5' },
    { icon: Wallet, label: 'Deposit payment confirmed on-chain', time: '3 days ago', color: '#10b981' },
    { icon: CheckCircle2, label: '6 new leads captured from website', time: '1 week ago', color: '#f59e0b' }
  ];

  return (
    <div className="flex min-h-screen bg-[#030303] text-white">
      <Sidebar />
      
      <main className="flex-grow ml-64 p-8 lg:p-12 relative overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-display font-bold tracking-tight">
              Welcome back, {user?.displayName || 'Partner'}
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted">
              Your revenue engine is performing optimally.
            </p>
          </div>

          <AnalyticsCards leads={leads} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Pipeline Distribution */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#0a0a0c] border border-white/5 rounded-3xl p-8"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted">Pipeline Distribution</h3>
                <span className="text-[10px] font-bold text-amaura-text-muted/40 uppercase tracking-widest">{leads.length} total leads</span>
              </div>
              
              <div className="space-y-6">
                {distribution.map((d) => (
                  <div key={d.label} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-amaura-text-muted">{d.label}</span>
                      <span className="text-sm font-display font-bold">{d.count}</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(d.count / maxCount) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-amaura-blue"
                        style={{ boxShadow: '0 0 10px rgba(79, 70, 229, 0.4)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#0a0a0c] border border-white/5 rounded-3xl p-8"
            >
              <div className="mb-10">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted">Recent Activity</h3>
              </div>

              <div className="space-y-8">
                {activities.map((a, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center transition-colors group-hover:bg-white/10">
                        <a.icon className="w-4 h-4" style={{ color: a.color }} />
                      </div>
                      <span className="text-xs font-bold text-amaura-text-muted group-hover:text-white transition-colors">{a.label}</span>
                    </div>
                    <span className="text-[10px] font-bold text-amaura-text-muted/40 uppercase tracking-widest">{a.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* AI Status Indicator - matches Screenshot 5 bottom-left of dashboard area */}
          <div className="pt-4">
             <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amaura-emerald/5 border border-amaura-emerald/20">
                <div className="w-2 h-2 rounded-full bg-amaura-emerald animate-pulse" />
                <span className="text-[10px] font-bold text-amaura-emerald uppercase tracking-[0.2em]">System Active</span>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
};
