import { useState } from 'react';
import { motion } from 'motion/react';
import { Sidebar } from '../components/Sidebar';
import { useLeads } from '../hooks/useLeads';
import { Columns, GripVertical, Phone, Target, Sparkles } from 'lucide-react';
import { Lead } from '../types';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, closestCorners } from '@dnd-kit/core';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const columns = [
  { id: 'new', title: 'New Lead', color: 'var(--color-amaura-blue)' },
  { id: 'contacted', title: 'Contacted', color: 'var(--color-primary)' },
  { id: 'proposal', title: 'Proposal Sent', color: 'var(--color-amaura-emerald)' },
  { id: 'won', title: 'Closed Won', color: '#10b981' },
];

const LeadCard = ({ lead, isOverlay = false }: { lead: Lead, isOverlay?: boolean }) => {
  return (
    <div className={`bento-inner p-5 hover:border-white/20 transition-all group shadow-xl bg-[#1a1a1c]/80 
      ${isOverlay 
        ? 'shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-[var(--color-primary)]/50 scale-105 rotate-2 cursor-grabbing' 
        : 'hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing hover:-translate-y-1'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-bold font-display text-lg text-white group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">{lead.name}</h4>
        <GripVertical className="w-4 h-4 text-white/20 group-hover:text-white/50" />
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-xs text-amaura-text-muted">
          <Phone className="w-3.5 h-3.5" />
          {lead.phone || 'No phone'}
        </div>
        <div className="flex items-center gap-2 text-xs text-amaura-text-muted">
          <Target className="w-3.5 h-3.5" />
          Est. Value: <span className="text-white font-mono">$150/mo</span>
        </div>
      </div>

      <div className="flex justify-between items-end border-t border-white/5 pt-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[10px] font-black uppercase tracking-widest border border-[var(--color-primary)]/20">
          <Sparkles className="w-3 h-3" />
          High Intent
        </div>
        <p className="text-[10px] text-amaura-text-muted font-medium">
          {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </p>
      </div>
    </div>
  );
};

const DraggableLead = ({ lead }: { lead: Lead }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
    data: { lead }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 999 : 1,
    position: 'relative' as const,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <LeadCard lead={lead} />
    </div>
  );
};

const DroppableColumn = ({ col, children, count, index }: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: col.id,
  });

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`w-[350px] shrink-0 snap-start flex flex-col rounded-3xl transition-colors duration-300 p-2 -m-2 
        ${isOver ? 'bg-white/5 border border-white/10 shadow-[inset_0_0_50px_rgba(255,255,255,0.05)]' : 'border border-transparent'}`}
      ref={setNodeRef}
    >
      <div 
        className="glass-panel px-5 py-3 rounded-2xl mb-4 border-l-4 shadow-lg flex justify-between items-center bg-[#121214]/80 backdrop-blur-md"
        style={{ borderLeftColor: col.color }}
      >
        <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
          <div className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: col.color, color: col.color }} />
          {col.title}
        </h3>
        <span className="text-xs font-bold text-amaura-text-muted bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
          {count}
        </span>
      </div>

      <div className="flex-grow space-y-4 overflow-y-auto pr-2 pb-20 custom-scrollbar min-h-[500px]">
        {children}
      </div>
    </motion.div>
  );
};

export const KanbanBoard = () => {
  const { leads, loading } = useLeads();
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  const getLeadsByStatus = (status: string) => {
    return leads.filter(l => l.status === status);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveLead(active.data.current?.lead || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveLead(null);
    const { active, over } = event;
    
    if (!over) return;

    const leadId = active.id as string;
    const newStatus = over.id as string;
    const lead = active.data.current?.lead as Lead;
    
    if (lead && lead.status !== newStatus) {
      try {
        await updateDoc(doc(db, 'leads', leadId), {
          status: newStatus
        });
      } catch (error) {
        console.error("Error updating lead status", error);
      }
    }
  };

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

          <DndContext 
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex-grow flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar pt-2 pl-2">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[var(--color-primary)] border-t-transparent animate-spin" />
                </div>
              ) : (
                columns.map((col, index) => {
                  const columnLeads = getLeadsByStatus(col.id);
                  return (
                    <DroppableColumn key={col.id} col={col} count={columnLeads.length} index={index}>
                      {columnLeads.map(lead => (
                        <DraggableLead key={lead.id} lead={lead} />
                      ))}
                    </DroppableColumn>
                  );
                })
              )}
            </div>

            <DragOverlay>
              {activeLead ? <LeadCard lead={activeLead} isOverlay /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </main>
    </div>
  );
};
