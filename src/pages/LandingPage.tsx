import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Zap, 
  Bot, 
  ArrowRight, 
  Cpu,
  BarChart3,
  Box,
  Sparkles,
  Command,
  Activity,
  Globe,
  Trash2
} from 'lucide-react';
import { SplineScene } from '../components/ui/SplineScene';
import { BentoCard } from '../components/ui/BentoCard';
import { SystemFlow } from '../components/ui/SystemFlow';
import { MagneticButton } from '../components/ui/MagneticButton';
import { LogoMarquee } from '../components/ui/LogoMarquee';
import { CountUp } from '../components/ui/CountUp';
import { DeploymentShowcase } from '../components/ui/DeploymentShowcase';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-white overflow-x-hidden selection:bg-amaura-purple selection:text-white relative">
      <div className="cinematic-grain" />
      
      {/* Refined Navigation Pill */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 glass-navbar rounded-full border border-white/5 flex items-center gap-12">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-amaura-purple rounded-md flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-black text-sm tracking-tighter">AMAURA</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.2em] text-white/40">
          <a href="#pipeline" className="hover:text-white transition-colors">Infrastructure</a>
          <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
          <a href="#engine" className="hover:text-white transition-colors">Engine</a>
          <Link to="/login" className="px-5 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-white">Login</Link>
        </div>
      </nav>

      <div className="relative z-10">
        {/* HERO SECTION - True Black Minimalism */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <SplineScene 
              scene="https://prod.spline.design/9eu0NWT9iZha2dA6/scene.splinecode"
              className="opacity-100"
            />
            {/* Darker Gradient Overlay for focus */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#000000]" />
          </div>

          <div className="relative z-10 w-full text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="text-huge-architectural tracking-tighter text-white mix-blend-difference"
            >
              FLUID. FAST. <br />
              <span className="opacity-40 italic">FUTURE.</span>
            </motion.h1>
          </div>

          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
             <MagneticButton>
               <Link to="/login" className="px-12 py-6 bg-amaura-purple text-white rounded-full font-black text-xs uppercase tracking-[0.4em] hover:scale-105 transition-all duration-700 shadow-[0_0_50px_rgba(94,23,235,0.3)]">
                  Start Building
               </Link>
             </MagneticButton>
          </div>
        </section>

        {/* LOGO MARQUEE */}
        <LogoMarquee />

        {/* INFRASTRUCTURE: populated bento grid */}
        <section id="pipeline" className="max-w-7xl mx-auto px-6 py-60">
          <div className="mb-32">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] font-black uppercase tracking-[1em] text-amaura-purple mb-8"
            >
              System Reliability
            </motion.p>
            <h2 className="text-huge-architectural text-left leading-[0.8]">
              Engineered <br /> <span className="opacity-20 italic">Precision.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <BentoCard 
              title="Intelligence Node" 
              description="High-fidelity autonomous decision systems with real-time feedback loops."
              className="md:col-span-8"
            >
               {/* Internal High-Fidelity Widget: Glowing Node Graph */}
               <div className="w-full h-48 bg-white/[0.02] border border-white/5 rounded-3xl p-8 relative overflow-hidden group/widget">
                  <div className="absolute inset-0 bg-gradient-to-br from-amaura-purple/10 to-transparent" />
                  <div className="relative z-10 h-full flex items-center justify-center overflow-hidden">
                     {/* Abstract Graph Pulse */}
                     <div className="flex items-end gap-2 h-20">
                        {[1,2,3,4,5,6,7,2,5,8,4,9].map((h, i) => (
                          <motion.div 
                            key={i} 
                            animate={{ height: [`${h*10}%`, `${(h+1)*8}%`, `${h*10}%`] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i*0.1 }}
                            className="w-1.5 bg-amaura-purple/40 rounded-full"
                          />
                        ))}
                     </div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <Activity className="w-40 h-40 animate-pulse" />
                     </div>
                  </div>
               </div>
            </BentoCard>

            <BentoCard 
              title="Workflows" 
              description="Ops at light speed."
              className="md:col-span-4"
            >
               <div className="h-48 flex items-center justify-center relative">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/10 animate-spin-slow" />
                  <Zap className="w-10 h-10 text-amaura-purple absolute" />
               </div>
            </BentoCard>

            <BentoCard 
              title="Sync Hub" 
              description="Architectural data isolation with multi-tenant node routing."
              className="md:col-span-4"
            >
               <div className="h-48 flex flex-col justify-center gap-4 px-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-2 bg-white/5 rounded-full overflow-hidden relative">
                       <motion.div 
                        animate={{ x: ['-100%', '100%'] }} 
                        transition={{ duration: 3, repeat: Infinity, delay: i*1 }} 
                        className="absolute inset-y-0 w-20 bg-amaura-purple" 
                       />
                    </div>
                  ))}
               </div>
            </BentoCard>

            <BentoCard 
              title="Control Panel" 
              description="Unified dashboard widgets for extreme operational visibility."
              className="md:col-span-8"
            >
               <div className="h-48 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
                     <div className="w-8 h-8 rounded-lg bg-amaura-purple/20 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-amaura-purple" /></div>
                     <div className="h-2 w-full bg-white/10 rounded-full" />
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-amaura-purple/20" />
                        <div className="w-3 h-3 rounded-full bg-amaura-purple/20" />
                     </div>
                     <div className="h-10 w-full bg-amaura-purple/20 rounded-lg" />
                  </div>
               </div>
            </BentoCard>
          </div>
        </section>

        {/* PERFORMANCE SHOWCASE */}
        <section id="showcase">
           <DeploymentShowcase />
        </section>

        {/* STATISTICS */}
        <section id="engine" className="max-w-7xl mx-auto px-6 py-60 border-t border-white/5">
           <div className="grid md:grid-cols-3 gap-32">
              {[
                { label: 'Platform Revenue', val: 12.4, suffix: 'M+' },
                { label: 'System Uptime', val: 99.9, suffix: '%' },
                { label: 'Total Automations', val: 800, suffix: 'K+' }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i*0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`${i % 2 !== 0 ? 'md:mt-40' : ''}`}
                >
                   <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-8">{stat.label}</p>
                   <h3 className="text-stat-massive font-display font-black">
                     <CountUp end={stat.val} decimals={stat.val % 1 !== 0 ? 1 : 0} suffix={stat.suffix} />
                   </h3>
                </motion.div>
              ))}
           </div>
        </section>

        {/* CINEMATIC FOOTER */}
        <footer className="relative min-h-[80vh] w-full flex flex-col items-center justify-center bg-[#000000] px-6 overflow-hidden">
           {/* Purple Radial Glow at bottom */}
           <div className="absolute inset-x-0 bottom-0 h-2/3 purple-glow-bottom opacity-50" />
           
           <div className="relative z-10 text-center max-w-5xl">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-huge-architectural mb-20 leading-[0.8] tracking-tighter"
              >
                 Build your <br /> <span className="text-amaura-purple italic">Legacy.</span>
              </h2>
              
              <div className="flex flex-col items-center gap-12">
                 <MagneticButton>
                    <Link to="/login" className="btn-purple-outline px-16 py-8 rounded-full font-black text-lg uppercase tracking-[0.4em]">
                       Deploy Now
                    </Link>
                 </MagneticButton>
                 
                 <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                 </div>
              </div>
           </div>
           
           <div className="absolute bottom-12 left-12 opacity-10">
              <span className="text-[10px] font-black tracking-[1em] uppercase">© 2026 AMAURA OPS</span>
           </div>
        </footer>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
