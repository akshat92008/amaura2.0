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
  Activity
} from 'lucide-react';
import { SplineScene } from '../components/ui/SplineScene';
import { BentoCard } from '../components/ui/BentoCard';
import { SystemFlow } from '../components/ui/SystemFlow';
import { MagneticButton } from '../components/ui/MagneticButton';
import { LogoMarquee } from '../components/ui/LogoMarquee';
import { CountUp } from '../components/ui/CountUp';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[var(--black-pure)] text-white overflow-x-hidden selection:bg-white selection:text-black relative">
      <div className="cinematic-grain" />
      
      {/* Global Cinematic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[160px]" />
      </div>

      {/* Hero Section: Cinematic 3D Backdrop */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SplineScene 
            scene="https://prod.spline.design/9eu0NWT9iZha2dA6/scene.splinecode"
            className="opacity-100"
          />
        </div>

        <div className="relative z-10 w-full text-center mix-blend-difference">
          <h1 className="text-huge-architectural tracking-tight">
            <motion.span 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              FLUID. FAST.
            </motion.span>
            <motion.span 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="block opacity-40 italic"
            >
              FUTURE.
            </motion.span>
          </h1>
        </div>

        <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center gap-8">
           <MagneticButton>
             <Link to="/login" className="px-10 py-5 premium-glass rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-700">
                Ascend Now
             </Link>
           </MagneticButton>
           <MagneticButton>
             <Link to="/contact" className="px-10 py-5 bg-white/5 border border-white/5 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-all duration-700">
                The Architecture
             </Link>
           </MagneticButton>
        </div>
      </section>

      {/* Social Proof: Seamless Marquee */}
      <LogoMarquee />

      {/* Feature Grid: Asymmetrical Bento Box */}
      <section id="pipeline" className="max-w-7xl mx-auto px-6 py-60">
        <div className="mb-32">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[1em] text-white/30 mb-8"
          >
            System Architecture
          </motion.p>
          <h2 className="text-huge-architectural text-left lowercase leading-[0.8]">
            orchestrated <br /> <span className="opacity-30">complexity.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <BentoCard 
            title="AI Intelligence" 
            description="Autonomous multi-agent systems engineered for high-fidelity decision making."
            className="md:col-span-8"
          >
             <div className="w-full h-40 bg-white/5 rounded-3xl overflow-hidden relative border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent" />
                <div className="p-8 flex items-center justify-between">
                   <div className="space-y-4 flex-1">
                      <div className="h-2 w-3/4 bg-white/20 rounded-full overflow-hidden">
                        <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-white/40 w-20" />
                      </div>
                      <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                   </div>
                   <Bot className="w-12 h-12 text-white/20" />
                </div>
             </div>
          </BentoCard>

          <BentoCard 
            title="Nodes" 
            description="Atomic operational units."
            className="md:col-span-4"
          >
             <div className="flex justify-center py-10">
                <Cpu className="w-20 h-20 text-white/10 animate-pulse" />
             </div>
          </BentoCard>

          <BentoCard 
            title="Flow State" 
            description="Real-time data synchronization across the entire multi-tenant pipeline."
            className="md:col-span-4"
          >
             <div className="h-40 flex items-center justify-center gap-4">
                {[1,2,3].map(i => <div key={i} className="w-1 h-20 bg-white/10 rounded-full overflow-hidden relative">
                   <motion.div animate={{ y: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity, delay: i*0.5 }} className="absolute inset-0 bg-white/40" />
                </div>)}
             </div>
          </BentoCard>

          <BentoCard 
            title="The Engine" 
            description="High-performance business infrastructure that scales with architectural precision."
            className="md:col-span-8"
          >
             <div className="h-40 flex items-end gap-2 px-10">
                {[60, 40, 90, 70, 45, 100, 80, 50].map((h, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ height: 0 }} 
                    whileInView={{ height: `${h}%` }} 
                    transition={{ delay: i*0.05, duration: 1 }}
                    className="flex-1 bg-white/5 border-t border-white/20" 
                  />
                ))}
             </div>
          </BentoCard>
        </div>
      </section>

      {/* Statistics: Massive, Staggered Type */}
      <section className="max-w-7xl mx-auto px-6 py-60 border-t border-white/5">
         <div className="grid md:grid-cols-3 gap-32">
            {[
              { label: 'Revenue Generated', val: 12.4, suffix: 'M+' },
              { label: 'Uptime Verified', val: 99.9, suffix: '%' },
              { label: 'Tasks Automated', val: 800, suffix: 'K+' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i*0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className={`${i % 2 !== 0 ? 'md:mt-40' : ''}`}
              >
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-8">{stat.label}</p>
                 <h3 className="text-stat-massive">
                   <CountUp end={stat.val} decimals={stat.val % 1 !== 0 ? 1 : 0} suffix={stat.suffix} />
                 </h3>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Final CTA: Extreme Negative Space */}
      <section className="h-screen w-full flex items-center justify-center bg-white text-black px-6">
         <div className="max-w-4xl text-center">
            <h2 className="text-huge-architectural mb-20 leading-[0.8] tracking-tighter">
               Build your <br /> legacy.
            </h2>
            <MagneticButton>
               <Link to="/login" className="px-20 py-10 bg-black text-white rounded-full font-black text-xl uppercase tracking-[0.4em] hover:scale-105 transition-all duration-700">
                  Deploy amaura
               </Link>
            </MagneticButton>
         </div>
      </section>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
          color: transparent;
        }
      `}</style>
    </div>
  );
};
