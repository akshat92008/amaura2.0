import { motion } from 'motion/react';
import { Sidebar } from '../components/Sidebar';
import { AnalyticsCards } from '../components/crm/AnalyticsCards';
import { LeadList } from '../components/crm/LeadList';
import { useLeads } from '../hooks/useLeads';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  Zap, 
  ZapOff,
  User,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Target,
  BarChart3
} from 'lucide-react';

export const ClientDashboard = () => {
  const { leads } = useLeads();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white selection:bg-amaura-blue">
      <Sidebar />
      <main className="flex-grow ml-64 p-8 lg:p-12 relative">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-amaura-blue/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-10 relative z-10"
        >
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-3">
                 <div className="px-3 py-1 rounded-full bg-amaura-emerald/10 border border-amaura-emerald/20 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amaura-emerald animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-amaura-emerald">Operational Matrix Sync</span>
                 </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight">Executive Dashboard</h1>
              <p className="text-amaura-text-muted mt-2 font-medium">Real-time revenue infrastructure for Apex Solar.</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-center gap-4">
               <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Download Node Audit
               </button>
               <button className="px-6 py-3 rounded-2xl bg-amaura-blue text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-amaura-blue/20">
                  Execute Manual Sync
               </button>
            </motion.div>
          </header>

          {/* Top Row: Core Analytics */}
          <motion.div variants={itemVariants}>
             <AnalyticsCards />
          </motion.div>

          {/* Main Content Area - Bento Grid Structure */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Lead Management (Bento Large) */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
               <div className="bg-[#0a0a0c] border border-white/5 rounded-[40px] shadow-2xl overflow-hidden h-full flex flex-col group hover:border-white/10 transition-all duration-500">
                  <div className="p-8 border-b border-white/5 flex items-center justify-between">
                     <h3 className="text-xl font-display font-bold flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-amaura-blue" />
                        Inbound Revenue Stream
                     </h3>
                     <span className="text-[10px] font-black text-amaura-text-muted uppercase tracking-widest">Active Pipeline</span>
                  </div>
                  <div className="flex-grow p-4">
                     <LeadList leads={leads} loading={false} />
                  </div>
               </div>
            </motion.div>

            {/* Right Column: Mini Widgets (Bento Small) */}
            <div className="space-y-8 flex flex-col justify-between h-full">
               <motion.div variants={itemVariants} className="flex-1">
                  <div className="bg-gradient-to-br from-amaura-blue/10 to-purple-600/5 border border-white/5 rounded-[40px] p-10 h-full relative overflow-hidden group hover:border-amaura-blue/30 transition-all duration-500">
                     <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-amaura-blue flex items-center justify-center mb-8 shadow-2xl shadow-amaura-blue/20">
                           <Target className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-display font-bold mb-2">Revenue Scaling</h3>
                        <p className="text-amaura-text-muted text-xs leading-relaxed font-medium mb-10">AI-powered ROI projection for next quarter.</p>
                        
                        <div className="space-y-6">
                           {[
                             { label: 'Growth Target', val: '+24.5%', color: 'text-amaura-emerald' },
                             { label: 'Efficiency Pool', val: '92.4%', color: 'text-purple-400' }
                           ].map((item, i) => (
                             <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0">
                                <span className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">{item.label}</span>
                                <span className={`text-lg font-black ${item.color}`}>{item.val}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                     <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amaura-blue/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                  </div>
               </motion.div>

               <motion.div variants={itemVariants} className="flex-1">
                  <div className="bg-[#0a0a0c] border border-white/5 rounded-[40px] p-10 h-full flex flex-col justify-between group hover:border-white/10 transition-all duration-500">
                     <div>
                        <div className="flex justify-between items-start mb-10">
                           <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                              <BarChart3 className="w-5 h-5 text-orange-500" />
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Conversion Latency</span>
                        </div>
                        <h4 className="text-4xl font-display font-bold tracking-tighter mb-2">4.2 <span className="text-lg opacity-40">days</span></h4>
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-amaura-emerald" />
                           <span className="text-[10px] font-black text-amaura-emerald uppercase tracking-widest">-12.8% vs last month</span>
                        </div>
                     </div>
                     
                     <button className="w-full py-4 mt-10 rounded-2xl border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                        View Full Metrics <ChevronRight className="w-3 h-3" />
                     </button>
                  </div>
               </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
