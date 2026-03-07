import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Zap, 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp,
  Cpu,
  BarChart3,
  Box,
  Wallet,
  Globe,
  Activity,
  Code,
  Sparkles,
  Command,
  Shield
} from 'lucide-react';
import { SplineScene } from '../components/ui/SplineScene';
import { BentoCard } from '../components/ui/BentoCard';
import { SystemFlow } from '../components/ui/SystemFlow';
import { MagneticButton } from '../components/ui/MagneticButton';
import { LogoMarquee } from '../components/ui/LogoMarquee';
import { CountUp } from '../components/ui/CountUp';

export const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="min-h-screen bg-[var(--color-amaura-bg)] text-white overflow-x-hidden selection:bg-amaura-blue selection:text-white relative">
      <div className="grain-overlay" />
      
      {/* Premium Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] glass-navbar px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amaura-blue rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-black text-xl tracking-tighter">AMAURA</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            <a href="#pipeline" className="hover:text-white transition-colors">Pipeline</a>
            <a href="#modules" className="hover:text-white transition-colors">Modules</a>
            <a href="#engine" className="hover:text-white transition-colors">Engine</a>
            <MagneticButton>
              <Link to="/login" className="px-6 py-2 bg-white text-black rounded-full hover:scale-105 transition-all">Get Access</Link>
            </MagneticButton>
          </div>
        </div>
      </nav>

      {/* Immersive Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-amaura-blue/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[160px]" />
        <div className="grid-background absolute inset-0 opacity-[0.1]" />
      </div>

      <div className="relative z-10">
        {/* HERO SECTION - Cinematic 3D Focus */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <SplineScene 
              scene="https://prod.spline.design/9eu0NWT9iZha2dA6/scene.splinecode"
              className="opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-amaura-bg)]/20 to-[var(--color-amaura-bg)]" />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-7xl mx-auto px-6 text-center"
          >
             <motion.div variants={itemVariants} className="mb-20">
                <h1 className="text-fluid-hero font-display font-black tracking-tighter text-white whitespace-nowrap overflow-hidden">
                   <motion.span 
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                   >
                    FLUID. FAST.
                   </motion.span>
                   <motion.span 
                    initial={{ x: '100%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="block text-transparent stroke-text" // Note: adding a custom class for outline look below
                   >
                    FUTURE.
                   </motion.span>
                </h1>
             </motion.div>
             
             <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-12 mt-12">
                <MagneticButton className="group">
                   <Link to="/login" className="px-12 py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl relative overflow-hidden flex items-center gap-2">
                     Get Access <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </Link>
                </MagneticButton>
                <MagneticButton>
                   <Link to="/roi" className="px-12 py-6 bg-black/40 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] backdrop-blur-xl hover:bg-white/10 transition-all flex items-center gap-2 group">
                      Talk To Sales <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
                   </Link>
                </MagneticButton>
             </motion.div>
          </motion.div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
            <div className="w-1 h-12 bg-gradient-to-b from-white to-transparent rounded-full" />
          </div>
        </section>

        {/* SOCIAL PROOF MARQUEE */}
        <LogoMarquee />

        {/* INTERACTIVE SYSTEM VISUALIZATION */}
        <section id="pipeline" className="max-w-7xl mx-auto px-6 py-60">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-32"
          >
            <h2 className="text-5xl md:text-8xl font-display font-bold mb-8 tracking-tighter uppercase italic">The Amaura Pipeline</h2>
            <p className="text-amaura-text-muted text-xl max-w-2xl mx-auto font-medium">Orchestrated complexity simplified into a high-performance growth engine.</p>
          </motion.div>
          <SystemFlow />
        </section>

        {/* PRODUCT MODULES GRID (BENTO) */}
        <section id="modules" className="max-w-7xl mx-auto px-6 py-40">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <BentoCard 
              title="AI Lead Engine" 
              description="Real-time multi-agent validation and scoring."
              icon={<Bot />}
              className="md:col-span-3 lg:col-span-4"
            >
              <div className="w-full aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/5 relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-amaura-blue/20 to-transparent opacity-50" />
                 <div className="p-8">
                    <div className="space-y-4">
                       {[1,2,3].map(i => (
                         <div key={i} className="flex gap-4 items-center">
                            <div className="w-2 h-2 rounded-full bg-amaura-blue" />
                            <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                               <motion.div className="h-full bg-amaura-blue/50" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity, delay: i*0.8 }} />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </BentoCard>

            <BentoCard 
              title="Workflows" 
              description="Automated operations at scale."
              icon={<Zap />}
              className="md:col-span-3 lg:col-span-2"
            >
              <div className="flex h-full items-center justify-center opacity-20">
                 <Activity className="w-20 h-20 animate-pulse text-amaura-blue" />
              </div>
            </BentoCard>

            <BentoCard 
              title="Analytics" 
              description="Deep actionable data insights."
              icon={<BarChart3 />}
              className="md:col-span-3 lg:col-span-2"
            >
              <div className="flex items-end gap-1 h-32 mt-4">
                 {[40, 70, 45, 90, 65, 80, 55, 100].map((h, i) => (
                    <motion.div 
                       key={i}
                       className="flex-1 bg-gradient-to-t from-amaura-blue/40 to-amaura-blue/5 border-t border-amaura-blue/40 rounded-t-sm"
                       initial={{ height: 0 }}
                       whileInView={{ height: `${h}%` }}
                       transition={{ delay: i*0.1, duration: 1 }}
                    />
                 ))}
              </div>
            </BentoCard>

            <BentoCard 
              title="Hub Control" 
              description="Unified command center for multi-tenant service brands."
              icon={<Box />}
              className="md:col-span-3 lg:col-span-4"
            >
               <div className="relative h-40 w-full glass-card border-none rounded-2xl overflow-hidden p-6 mt-4">
                  <div className="flex gap-6">
                     <div className="w-16 h-16 rounded-2xl bg-amaura-blue/20 animate-pixel-glow" />
                     <div className="space-y-3 flex-1">
                        <div className="h-2 w-full bg-white/10 rounded" />
                        <div className="h-2 w-3/4 bg-white/5 rounded" />
                        <div className="h-10 w-1/4 bg-white/5 border border-white/10 rounded-lg mt-4" />
                     </div>
                  </div>
               </div>
            </BentoCard>
          </div>
        </section>

        {/* PRODUCT ENGINE SECTION */}
        <section id="engine" className="bg-black/40 py-60 border-y border-white/5 relative overflow-hidden px-6">
           <div className="absolute inset-0 grid-background opacity-20" />
           <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                 <h2 className="text-6xl md:text-9xl font-display font-black mb-12 tracking-tighter text-white">
                    NODE <br /><span className="text-amaura-blue italic">ENGINE</span>
                 </h2>
                 <div className="mb-16">
                    <span className="text-[120px] font-display font-black tracking-tighter leading-none block">
                      <CountUp end={12.4} decimals={1} suffix="M+" />
                    </span>
                    <p className="text-xs font-black tracking-[0.5em] text-amaura-blue uppercase mt-2">Revenue Generated via Amaura Pipelines</p>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    {['Core Logic Isolation', 'Multi-Tenant Auth', 'Real-time Sync', 'On-Chain Billing'].map((t, i) => (
                       <div key={i} className="flex items-center gap-4 group">
                          <div className="w-1 h-8 bg-white/10 group-hover:bg-amaura-blue transition-colors duration-500" />
                          <span className="font-bold text-xs tracking-widest uppercase text-white/50 group-hover:text-white transition-opacity">{t}</span>
                       </div>
                    ))}
                 </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                 <div className="aspect-square glass-card rounded-[80px] p-16 flex items-center justify-center overflow-hidden border-white/5 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amaura-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <Cpu className="w-60 h-60 text-amaura-blue/10 absolute animate-spin-slow" style={{ animationDuration: '30s' }} />
                    <div className="relative z-10 text-center">
                       <span className="text-[100px] font-display font-bold tracking-tighter block leading-none">
                          <CountUp end={99.9} decimals={1} suffix="%" />
                       </span>
                       <p className="text-[10px] font-black tracking-[0.8em] text-amaura-blue mt-4">UPTIME VERIFIED</p>
                    </div>
                 </div>
              </motion.div>
           </div>
        </section>

        {/* PERFORMANCE METRICS */}
        <section className="max-w-7xl mx-auto px-6 py-60">
           <div className="grid md:grid-cols-2 gap-24">
              <div className="text-center">
                 <h3 className="text-[140px] font-display font-black tracking-tighter leading-none mb-4">
                    <CountUp end={800} suffix="K+" />
                 </h3>
                 <p className="text-xs font-black uppercase tracking-[0.4em] text-white/30">Tasks Automated Since Launch</p>
              </div>
              <div className="text-center">
                 <h3 className="text-[140px] font-display font-black tracking-tighter leading-none mb-4 text-amaura-blue">
                    <CountUp end={312} suffix="%" />
                 </h3>
                 <p className="text-xs font-black uppercase tracking-[0.4em] text-white/30">Avg Op Efficiency Improvement</p>
              </div>
           </div>
        </section>

        {/* FINAL CTA */}
        <section className="max-w-7xl mx-auto px-6 py-40">
           <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="p-24 md:p-40 rounded-[80px] glass-card text-center relative overflow-hidden group border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
           >
              <div className="absolute inset-0 bg-gradient-to-r from-amaura-blue/20 via-purple-600/20 to-amaura-blue/20 opacity-20" />
              <h2 className="text-6xl md:text-9xl font-display font-black tracking-tighter mb-16 relative z-10 leading-[0.85] uppercase italic">Ready to <br />Ascend?</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-12 relative z-10">
                 <MagneticButton>
                    <Link to="/login" className="px-20 py-8 bg-white text-black rounded-3xl font-black text-xl uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]">
                       Get Access
                    </Link>
                 </MagneticButton>
                 <Link to="/contact" className="text-sm font-black uppercase tracking-[0.5em] text-white/50 hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all hover:after:w-full">
                    Talk to Sales
                 </Link>
              </div>
           </motion.div>
        </section>
      </div>

      {/* Global Style Injector for Custom Text Effects */}
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
          color: transparent;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        @keyframes pixel-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.2); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.4); }
        }
        .animate-pixel-glow {
          animation: pixel-glow 3s infinite;
        }
      `}</style>
    </div>
  );
};
