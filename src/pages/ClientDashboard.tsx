import { motion } from 'motion/react';
import { Sidebar } from '../components/Sidebar';
import { AnalyticsCards } from '../components/crm/AnalyticsCards';
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
  ChevronRight
} from 'lucide-react';

export const ClientDashboard = () => {
  const { leads } = useLeads();

  const mockActivities = [
    { type: 'LEAD_INBOUND', user: 'Sarah Miller', time: '2m ago', color: 'text-amaura-blue' },
    { type: 'SCORE_COMPLETE', user: 'AI Agent V4', time: '14m ago', color: 'text-amaura-emerald' },
    { type: 'PHASE_ADVANCE', user: 'Mark Thompson', time: '1h ago', color: 'text-purple-400' },
  ];

  // Custom SVG Growth Chart Component
  const GrowthChart = ({ color = 'var(--color-amaura-blue)' }) => (
    <svg viewBox="0 0 100 30" className="w-full h-12">
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        d="M0,25 C10,22 20,28 30,15 C40,2 50,18 60,12 C70,6 80,10 100,2"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <motion.path
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        d="M0,25 C10,22 20,28 30,15 C40,2 50,18 60,12 C70,6 80,10 100,2 V30 H0 Z"
        fill={color}
      />
    </svg>
  );

  return (
    <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white">
      <Sidebar />
      <main className="flex-grow ml-64 p-8 lg:p-12 relative overflow-y-auto">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-amaura-blue/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <div className="px-3 py-1 rounded-full bg-amaura-blue/10 border border-amaura-blue/20 text-[10px] font-black uppercase tracking-[0.2em] text-amaura-blue flex items-center gap-2">
                    <Zap className="w-3 h-3 fill-current" /> System Synchronized
                 </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight">Revenue Node Overview</h1>
              <p className="text-amaura-text-muted mt-2 font-medium">Monitoring real-time performance of Apex Solar infrastructure.</p>
            </div>
            
            <div className="flex items-center gap-4">
               <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Export Report
               </button>
               <button className="px-6 py-3 rounded-2xl bg-amaura-blue text-white text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-amaura-blue/20">
                  Manage Node
               </button>
            </div>
          </header>

          <AnalyticsCards />

          {/* Core Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Visual Analytics */}
            <div className="lg:col-span-2 space-y-8">
               <div className="bg-[#0a0a0c] border border-white/5 rounded-[40px] p-10 group hover:border-amaura-blue/30 transition-all duration-500">
                  <div className="flex justify-between items-start mb-12">
                     <div>
                        <h3 className="text-2xl font-display font-bold mb-1">Growth Index</h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-amaura-text-muted">Inbound lead acceleration</p>
                     </div>
                     <div className="text-right">
                        <span className="text-amaura-emerald text-sm font-bold flex items-center gap-1">
                           <ArrowUpRight className="w-4 h-4" /> +24.8%
                        </span>
                        <p className="text-[10px] font-bold text-amaura-text-muted uppercase tracking-widest">vs last 30d</p>
                     </div>
                  </div>
                  <div className="h-[200px] flex items-center justify-center relative">
                     <GrowthChart color="var(--color-amaura-blue)" />
                     <div className="absolute inset-x-0 bottom-0 flex justify-between text-[10px] font-bold text-amaura-text-muted uppercase tracking-widest px-2">
                        <span>mon</span>
                        <span>tue</span>
                        <span>wed</span>
                        <span>thu</span>
                        <span>fri</span>
                        <span>sat</span>
                        <span>sun</span>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#0a0a0c] border border-white/5 rounded-[30px] p-8 flex flex-col justify-between aspect-video group hover:border-amaura-blue/20 transition-all">
                     <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                           <Activity className="w-5 h-5 text-orange-500" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Conversion Node</span>
                     </div>
                     <div>
                        <h4 className="text-4xl font-display font-bold tracking-tighter">18.4 <span className="text-lg opacity-40">%</span></h4>
                        <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                           <motion.div initial={{ width: 0 }} animate={{ width: '18.4%' }} className="h-full bg-orange-500" />
                        </div>
                     </div>
                  </div>

                  <div className="bg-[#0a0a0c] border border-white/5 rounded-[30px] p-8 flex flex-col justify-between aspect-video group hover:border-amaura-blue/20 transition-all">
                     <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                           <Clock className="w-5 h-5 text-purple-500" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Closing Latency</span>
                     </div>
                     <div>
                        <h4 className="text-4xl font-display font-bold tracking-tighter">4.2 <span className="text-lg opacity-40">days</span></h4>
                        <p className="text-[10px] font-bold text-amaura-emerald uppercase tracking-widest mt-2">-12% Optimization</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Side Activity Panel */}
            <div className="space-y-8">
               <div className="bg-[#0a0a0c] border border-white/5 rounded-[40px] p-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-10">
                     <h3 className="text-xl font-display font-bold">Node Logs</h3>
                     <span className="text-[10px] font-black text-amaura-blue uppercase tracking-widest">Real-Time Sync</span>
                  </div>
                  
                  <div className="flex-grow space-y-8">
                     {mockActivities.map((act, i) => (
                       <div key={i} className="flex gap-4 group">
                          <div className={`w-1 rounded-full ${act.color.replace('text-', 'bg-')} h-10`} />
                          <div className="flex-grow">
                             <div className="flex justify-between items-start mb-1">
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${act.color}`}>{act.type}</span>
                                <span className="text-[9px] font-bold text-amaura-text-muted uppercase">{act.time}</span>
                             </div>
                             <p className="text-xs font-bold text-white mb-1">{act.user}</p>
                             <p className="text-[10px] font-medium text-amaura-text-muted leading-relaxed uppercase tracking-widest">Operation committed successfully.</p>
                          </div>
                       </div>
                     ))}
                  </div>

                  <button className="w-full py-4 mt-10 rounded-2xl border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                     Full Audit Trail <ChevronRight className="w-3 h-3" />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
