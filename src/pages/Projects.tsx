import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from '../components/Sidebar';
import { useLeads } from '../hooks/useLeads';
import { 
  FolderKanban, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Plus, 
  ChevronRight,
  MoreVertical,
  Activity,
  Zap
} from 'lucide-react';

const STAGES = [
  'Initial Survey',
  'Engineering Review',
  'Permitting',
  'Installation',
  'Final Inspection'
];

export const Projects = () => {
  const { leads, loading } = useLeads();
  const [projectStages, setProjectStages] = useState<Record<string, number>>({});

  // Convert 'won' leads to active projects
  const activeProjects = leads
    .filter(l => l.status === 'won')
    .map((lead, index) => {
      const currentStage = projectStages[lead.id] ?? (index % STAGES.length);
      return {
        ...lead,
        projectId: `AMA-${1000 + index}`,
        currentStage,
        isCompleted: currentStage === STAGES.length - 1
      };
    });

  const advanceStage = (id: string) => {
    setProjectStages(prev => ({
      ...prev,
      [id]: Math.min((prev[id] ?? 0) + 1, STAGES.length - 1)
    }));
  };

  return (
    <div className="flex min-h-screen bg-[#030303] text-white">
      <Sidebar />
      
      <main className="flex-grow ml-64 p-8 lg:p-12 relative overflow-y-auto">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-amaura-blue/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 text-amaura-blue mb-2">
                <FolderKanban className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Fulfillment Engine</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight">Active Projects</h1>
              <p className="text-amaura-text-muted mt-3">Monitoring end-to-end delivery of high-ticket contracts.</p>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amaura-emerald" />
                  <span className="text-xs font-bold">{activeProjects.length} Projects Live</span>
               </div>
               <button className="bg-amaura-blue px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-amaura-blue/20">
                  <Plus className="w-4 h-4" /> Initialize Deployment
               </button>
            </div>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {activeProjects.map((project, i) => (
                <motion.div 
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#0a0a0c] border border-white/5 rounded-[40px] p-8 lg:p-12 group hover:border-amaura-blue/20 transition-all relative overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-12 relative z-10">
                    <div className="space-y-6 lg:w-1/3">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                           <span className="px-3 py-1 rounded-full bg-amaura-blue/10 border border-amaura-blue/20 text-[10px] font-black uppercase tracking-widest text-amaura-blue">
                              {project.projectId}
                           </span>
                           {project.isCompleted && (
                             <span className="px-3 py-1 rounded-full bg-amaura-emerald/10 border border-amaura-emerald/20 text-[10px] font-black uppercase tracking-widest text-amaura-emerald flex items-center gap-2">
                                <Zap className="w-3 h-3 fill-current" /> Fully Delivered
                             </span>
                           )}
                        </div>
                        <h3 className="text-3xl font-display font-bold mb-2">{project.name}</h3>
                        <div className="flex items-center gap-2 text-amaura-text-muted">
                           <MapPin className="w-4 h-4" />
                           <span className="text-sm font-medium">{project.phone || 'Site ID Traceable'}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-4">
                         <button 
                           onClick={() => advanceStage(project.id)}
                           disabled={project.isCompleted}
                           className={`flex-grow py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                             project.isCompleted 
                               ? 'bg-white/5 text-amaura-text-muted cursor-not-allowed' 
                               : 'bg-white text-black hover:scale-[1.02] active:scale-95'
                           }`}
                         >
                           {project.isCompleted ? 'Finalized' : 'Advance Stage'}
                         </button>
                         <button className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                            <MoreVertical className="w-4 h-4" />
                         </button>
                      </div>
                    </div>

                    <div className="lg:w-2/3 flex flex-col justify-center">
                       <div className="relative">
                          {/* Progress Line */}
                          <div className="absolute top-[18px] left-0 right-0 h-0.5 bg-white/5 rounded-full" />
                          <motion.div 
                            className="absolute top-[18px] left-0 h-0.5 bg-amaura-blue rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(project.currentStage / (STAGES.length - 1)) * 100}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                          />

                          <div className="flex justify-between items-start relative z-10">
                             {STAGES.map((stage, idx) => {
                               const isActive = idx <= project.currentStage;
                               const isCurrent = idx === project.currentStage;
                               return (
                                 <div key={idx} className="flex flex-col items-center gap-4 w-20">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                                      isActive 
                                        ? 'bg-amaura-blue border-amaura-blue text-white shadow-xl shadow-amaura-blue/40 scale-110' 
                                        : 'bg-[#0a0a0c] border-white/5 text-amaura-text-muted'
                                    }`}>
                                       {isActive ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-1 h-1 rounded-full bg-current" />}
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest text-center leading-tight transition-colors ${isActive ? 'text-white' : 'text-amaura-text-muted/40'}`}>
                                       {stage}
                                    </span>
                                 </div>
                               );
                             })}
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {activeProjects.length === 0 && (
              <div className="h-64 flex flex-col items-center justify-center bg-[#0a0a0c] border border-white/5 rounded-[40px] opacity-40">
                 <FolderKanban className="w-16 h-16 mb-4" />
                 <p className="text-sm font-medium uppercase tracking-[0.2em]">No active projects in fulfillment pipeline.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
