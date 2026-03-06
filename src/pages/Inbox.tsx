import { motion } from 'motion/react';
import { Sidebar } from '../components/Sidebar';
import { Inbox as InboxIcon, MessageSquare } from 'lucide-react';

export const Inbox = () => {
  return (
    <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white">
      <Sidebar />
      
      <main className="flex-grow ml-64 p-8 lg:p-12 relative overflow-y-auto">
        <div 
          className="absolute -top-[10%] right-[10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-10 pointer-events-none"
          style={{ background: 'var(--color-primary)' }}
        />
        
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[var(--color-primary)] mb-2">
                <InboxIcon className="w-4 h-4 fill-current" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Communications</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-3">
                Lead Inbox
              </h1>
              <p className="text-amaura-text-muted">Centralized messaging and email sync coming soon.</p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel border-white/5 rounded-[32px] p-16 flex flex-col items-center justify-center text-center shadow-2xl min-h-[500px]"
          >
             <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
               <MessageSquare className="w-10 h-10 text-amaura-text-muted" />
             </div>
             <h3 className="text-2xl font-bold font-display mb-2">Unified Inbox Launching Soon</h3>
             <p className="text-amaura-text-muted max-w-md">
               We are currently integrating SMS, Email, and native chat into a single stream. Stay tuned for updates to the World-Class portal.
             </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
