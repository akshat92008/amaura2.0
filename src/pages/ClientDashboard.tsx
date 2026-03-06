import { Sidebar } from '../components/Sidebar';
import { BentoGrid, BentoBox } from '../components/BentoGrid';
import { ROICalculator } from '../components/ROICalculator';
import { LeadTable } from '../components/LeadTable';
import { useLeads } from '../hooks/useLeads';
import { useAuth } from '../hooks/useAuth';
import { 
  Users, 
  DollarSign, 
  Percent, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

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
      
      <main className="flex-grow ml-64 p-8 lg:p-12 relative overflow-hidden">
        {/* Ambient background glows */}
        <div 
          className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-10 pointer-events-none"
          style={{ background: 'var(--color-primary)' }}
        />
        
        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
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

          {/* Stats & Tools Grid */}
          <BentoGrid>
            {/* Stat 1 */}
            <BentoBox title="Total Pipeline" className="justify-center">
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

            {/* Stat 2 */}
            <BentoBox title="Conversion Velocity" className="justify-center">
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

            {/* ROI Calculator Box (Standalone tool) */}
            <BentoBox title="ROI Intelligence" span="row-2" className="justify-between">
              <ROICalculator />
            </BentoBox>

            {/* Large Lead Table */}
            <div className="col-span-1 md:col-span-2 row-span-2">
              <LeadTable leads={leads} loading={loading} />
            </div>

            {/* Secondary CTA/Status */}
            <BentoBox className="bg-gradient-to-br from-[var(--color-amaura-surface)] to-[var(--color-amaura-bg)] border-[var(--color-amaura-border)]">
              <div className="h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <DollarSign className="w-5 h-5 text-white" />
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
          </BentoGrid>
        </div>
      </main>
    </div>
  );
};
