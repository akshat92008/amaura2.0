import { motion } from 'motion/react';
import { Sidebar } from '../components/Sidebar';
import { useLeads } from '../hooks/useLeads';
import { FolderKanban, CheckCircle2, Clock, MapPin, Plus } from 'lucide-react';

const stages = ['Site Survey', 'Permit Pending', 'Installation', 'Inspection'];

export const Projects = () => {
  const { leads, loading } = useLeads();

  // Mock converting 'won' leads to active projects
  const activeProjects = leads
    .filter(l => l.status === 'won' || l.status === 'contacted')
    .map((lead, index) => ({
      ...lead,
      projectId: `PRJ-${Math.floor(Math.random() * 9000) + 1000}`,
      currentStage: Math.min(Math.floor(index / 2) + 1, stages.length),
      status: index % 3 === 0 ? 'completed' : 'on-track'
    }));

  return (
    <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white">
      <Sidebar />
      
      <main className="flex-grow ml-64 p-8 lg:p-12 relative overflow-y-auto">
        <div 
          className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full blur-[150px] opacity-10 pointer-events-none"
          style={{ background: 'var(--color-amaura-blue)' }}
        />
        
        <div className="max-w-6xl mx-auto space-y-10 relative z-10 block">
          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 text-[var(--color-amaura-blue)] mb-2">
                <FolderKanban className="w-4 h-4 fill-current" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Fulfillment</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-3">
                Project Tracker
              </h1>
              <p className="text-amaura-text-muted">Visual pipeline of active installations.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 bg-amaura-surface text-sm font-bold shadow-lg hover:border-white/40 transition-all">
              <Plus className="w-4 h-4" /> New Project
            </button>
          </div>

          {/* Project List */}
          <div className="space-y-6">
            {loading ? (
               <div className="w-full h-32 glass-panel rounded-3xl flex items-center justify-center">
                 <div className="w-8 h-8 rounded-full border-2 border-[var(--color-amaura-blue)] border-t-transparent animate-spin" />
               </div>
            ) : (
              activeProjects.map((project, i) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel border-white/5 rounded-[32px] p-8 relative overflow-hidden group hover:border-[var(--color-amaura-blue)]/30 transition-colors"
                >
                  {/* Subtle completed glow */}
                  {project.status === 'completed' && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amaura-emerald/10 blur-[50px] rounded-full pointer-events-none" />
                  )}

                  <div className="flex justify-between items-start mb-12">
                    <div>
                      <h3 className="text-xl font-display font-bold group-hover:text-[var(--color-amaura-blue)] transition-colors">{project.name}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm font-mono text-amaura-text-muted">{project.projectId}</span>
                        <div className="flex items-center gap-1 text-xs text-amaura-text-muted">
                          <MapPin className="w-3.5 h-3.5" /> Client Location
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {project.status === 'completed' ? (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-amaura-emerald bg-amaura-emerald/10">
                          <Clock className="w-3.5 h-3.5" /> On Track
                        </span>
                      )}
                      
                      {project.status !== 'completed' && (
                        <button className="text-xs font-bold text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10 transition-colors">
                          Advance Stage
                        </button>
                      )}
                      <button className="text-xs font-medium text-amaura-text-muted hover:text-white transition-colors">
                        Details
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Timeline */}
                  <div className="relative">
                    {/* Background Progress Bar */}
                    <div className="absolute top-4 left-4 right-4 h-1 bg-white/5 rounded-full" />
                    
                    {/* Active Progress Bar */}
                    <div 
                      className="absolute top-4 left-4 h-1 bg-[var(--color-amaura-blue)] rounded-full transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                      style={{ width: `calc(${(project.currentStage / stages.length) * 100}% - 32px)` }}
                    />

                    <div className="flex justify-between relative z-10 w-full">
                      {stages.map((stage, index) => {
                        const stepNumber = index + 1;
                        const isCompleted = stepNumber <= project.currentStage;
                        const isCurrent = stepNumber === project.currentStage + 1;

                        return (
                          <div key={stage} className="flex flex-col items-center gap-3 w-32 relative">
                            <div 
                              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500
                                ${isCompleted 
                                  ? 'bg-[var(--color-amaura-blue)] text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]' 
                                  : isCurrent
                                    ? 'bg-white/10 text-white border-2 border-[var(--color-amaura-blue)]'
                                    : 'bg-white/5 text-amaura-text-muted border border-white/10'
                                }
                              `}
                            >
                              {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : stepNumber}
                            </div>
                            <span 
                              className={`text-[11px] font-bold tracking-wide text-center
                                ${isCompleted ? 'text-white' : isCurrent ? 'text-[var(--color-amaura-blue)]' : 'text-amaura-text-muted'}
                              `}
                            >
                              {stage}
                            </span>
                          </div>
                        );
                      })}
                    </div>
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
