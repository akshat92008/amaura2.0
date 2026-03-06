import { motion } from 'motion/react';
import { Sidebar } from '../components/Sidebar';
import { ROICalculator } from '../components/ROICalculator';
import { Calculator, Sparkles } from 'lucide-react';

export const ROI = () => {
  return (
    <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white">
      <Sidebar />
      
      <main className="flex-grow ml-64 p-8 lg:p-12 relative overflow-y-auto">
        <div 
          className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[180px] opacity-20 pointer-events-none"
          style={{ background: 'var(--color-amaura-emerald)' }}
        />
        
        <div className="max-w-5xl mx-auto space-y-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[var(--color-amaura-emerald)] mb-2">
                <Calculator className="w-4 h-4 fill-current" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Estimations</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-3">
                ROI Intelligence
              </h1>
              <p className="text-amaura-text-muted">Simulate revenue potential and optimize your marketing budget.</p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 lg:p-12 glass-panel rounded-[40px] border border-white/5 bg-gradient-to-br from-amaura-surface to-transparent shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
               <Sparkles className="w-24 h-24 text-[var(--color-amaura-emerald)]" />
            </div>
            <div className="relative z-10">
              <ROICalculator />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
