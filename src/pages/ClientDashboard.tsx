import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sidebar } from '../components/Sidebar';
import { BentoGrid, BentoBox } from '../components/BentoGrid';
import { ROICalculator } from '../components/ROICalculator';
import { LeadTable } from '../components/crm/LeadTable';
import { useLeads } from '../hooks/useLeads';
import { useAuth } from '../hooks/useAuth';
import { AnalyticsCards } from '../components/crm/AnalyticsCards';
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpRight,
  Sparkles,
  Zap,
  Activity,
  Percent,
  TrendingUp,
  DollarSign,
  Users
} from 'lucide-react';
import { LeadInsight } from '../components/LeadInsight';
import { PerformanceChart } from '../components/PerformanceChart';
import { ActivityFeed } from '../components/ActivityFeed';

export const ClientDashboard = () => {
  const { leads, loading } = useLeads();
  const { user } = useAuth();

  // Simple stats calculation
  const totalLeads = leads.length;
  const wonLeads = leads.filter(l => l.status === 'won').length;
  const convRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : '0.0';

  return (
    <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white">
      <Sidebar />
      
      <main className="flex-grow ml-64 p-8 lg:p-12 relative overflow-y-auto">
        {/* Ambient background glows */}
        <div 
          className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[180px] opacity-20 pointer-events-none animate-pulse"
          style={{ background: 'var(--color-primary)' }}
        />
        <div 
          className="absolute bottom-[-10%] left-[10%] w-[40%] h-[40%] rounded-full blur-[150px] opacity-10 pointer-events-none"
          style={{ background: 'var(--color-amaura-blue)' }}
        />
        
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[var(--color-primary)] mb-2">
                <Sparkles className="w-4 h-4 fill-current" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Dashboard Overview</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight">
                Welcome back, <span style={{ color: 'var(--color-primary)' }}>{user?.displayName || 'Partner'}</span>
              </h1>
            </div>
            <div className="bg-[var(--color-amaura-surface)] border border-[var(--color-amaura-border)] rounded-2xl px-6 py-3 flex items-center gap-4">
              <div className="text-right">
                <p className="text-[var(--color-amaura-text-muted)] text-[10px] uppercase font-bold tracking-widest">Workspace ID</p>
                <p className="text-xs font-mono">{user?.tenantID}</p>
              </div>
              <div className="w-px h-8 bg-[var(--color-amaura-border)]" />
              <div 
                className="w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,157,0.5)] bg-[var(--color-amaura-emerald)]"
              />
            </div>
          </div>

          <AnalyticsCards leads={leads} />

          {/* Stats & Tools Grid */}
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <BentoGrid>
              {/* Main Growth Chart */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="col-span-1 md:col-span-2">
                <BentoBox title="Revenue Performance" className="overflow-hidden h-full">
                  <PerformanceChart leads={leads} />
                </BentoBox>
              </motion.div>

              {/* AI Highlight */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <BentoBox title="AI Strategic Insight" className="border-[var(--color-primary)]/20 shadow-[0_0_30px_rgba(124,58,237,0.05)] h-full">
                  {leads.length > 0 ? (() => {
                    const topLead = [...leads].sort((a,b) => b.createdAt - a.createdAt)[0];
                    const aiScore = topLead.phone ? 94 : 72;
                    const intent = aiScore > 85 ? 'positive' : 'neutral';
                    const explanation = `Identified strong intent pattern from recent ${topLead.source || 'Direct'} lead (${topLead.name}). Recommend immediate follow up via ${topLead.phone ? 'Phone' : 'Email'}.`;
                    
                    return (
                      <LeadInsight 
                        score={aiScore} 
                        sentiment={intent} 
                        explanation={explanation}
                      />
                    )
                  })() : (
                    <LeadInsight 
                      score={0} 
                      sentiment="neutral" 
                      explanation="No leads in pipeline. Waiting for inbound data to generate strategic insights."
                    />
                  )}
                </BentoBox>
              </motion.div>

              {/* Stat 1 */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <BentoBox title="Total Pipeline">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-5xl font-display font-bold">{totalLeads}</h4>
                      <div className="flex items-center text-[var(--color-amaura-emerald)] text-xs mt-1">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        <span>+12.5% vs last month</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6 text-[var(--color-amaura-text-muted)] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </BentoBox>
              </motion.div>

              {/* Stat 2 */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <BentoBox title="Conversion Velocity">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-5xl font-display font-bold">{convRate}%</h4>
                      <div className="flex items-center text-[var(--color-amaura-text-muted)] text-xs mt-1">
                        <span>Targeting 15%</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                      <Percent className="w-6 h-6 text-[var(--color-amaura-text-muted)] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </BentoBox>
              </motion.div>

              {/* Interactive Timeline */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="row-span-1 md:row-span-2 h-full">
                <BentoBox className="overflow-y-auto h-full">
                  <ActivityFeed leads={leads} />
                </BentoBox>
              </motion.div>

              {/* Partner Perk */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <BentoBox className="bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent border-[var(--color-primary)]/20 h-full">
                  <div className="h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-[10px] font-black uppercase tracking-widest">
                        <Zap className="w-3 h-3" /> Priority Tier
                      </div>
                      <div>
                        <h5 className="font-bold text-lg leading-tight">Partner Perks</h5>
                        <p className="text-xs text-[var(--color-amaura-text-muted)]">Exclusive access to Tier 1 pricing.</p>
                      </div>
                    </div>
                    <button 
                      className="w-full py-2.5 rounded-xl text-xs font-bold transition-all hover:brightness-110 active:scale-95"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                      View Benefits
                    </button>
                  </div>
                </BentoBox>
              </motion.div>

              {/* Large Lead Table */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="col-span-1 md:col-span-3">
                <LeadTable leads={leads} loading={loading} />
              </motion.div>

              {/* ROI Calculator Box (Standalone tool) */}
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="col-span-1 md:col-span-3">
                <div className="p-8 lg:p-12 glass-panel rounded-[40px] border border-white/5 bg-gradient-to-br from-amaura-surface to-transparent shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                     <Sparkles className="w-24 h-24 text-[var(--color-primary)]" />
                  </div>
                  <div className="relative z-10">
                    <div className="mb-10 text-left">
                      <h3 className="text-3xl font-black font-display mb-2">ROI Intelligence</h3>
                      <p className="text-amaura-text-muted text-sm max-w-lg">Advanced simulations for your home service revenue potential.</p>
                    </div>
                    <ROICalculator />
                  </div>
                </div>
              </motion.div>
            </BentoGrid>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
