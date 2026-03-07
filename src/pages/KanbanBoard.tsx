import { Sidebar } from '../components/Sidebar';
import { KanbanBoard as KanbanComponent } from '../components/crm/KanbanBoard';
import { useLeads } from '../hooks/useLeads';
import { Columns } from 'lucide-react';

export const KanbanBoard = () => {
  const { leads, loading } = useLeads();

  return (
    <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white overflow-hidden">
      <Sidebar />
      
      <main className="flex-grow ml-64 p-8 lg:p-12 relative h-screen overflow-y-auto">
        <div 
          className="absolute -top-[10%] left-[20%] w-[60%] h-[50%] rounded-full blur-[150px] opacity-10 pointer-events-none"
          style={{ background: 'var(--color-primary)' }}
        />
        
        <div className="max-w-[1600px] mx-auto space-y-8 relative z-10 w-full h-full flex flex-col">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
            <div>
              <div className="flex items-center gap-2 text-[var(--color-primary)] mb-2">
                <Columns className="w-4 h-4 fill-current" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Live Pipeline</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-3">
                Kanban Board
              </h1>
              <p className="text-amaura-text-muted">Drag cards to move leads through the sales pipeline. Syncs instantly to the database.</p>
            </div>
          </div>

          <div className="flex-grow overflow-hidden">
            <KanbanComponent leads={leads} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
};
