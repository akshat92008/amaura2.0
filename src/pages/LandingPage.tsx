import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Zap, 
  Shield, 
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
  Command
} from 'lucide-react';
import { SplineScene } from '../components/ui/SplineScene';
import { BentoCard } from '../components/ui/BentoCard';
import { SystemFlow } from '../components/ui/SystemFlow';

export const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="min-h-screen bg-[var(--color-amaura-bg)] text-white overflow-x-hidden selection:bg-amaura-blue selection:text-white">
      {/* Immersive Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-amaura-blue/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[160px]" />
        <div className="grid-background absolute inset-0 opacity-[0.1]" />
      </div>

      <div className="relative z-10">
        {/* HERO SECTION - Cinematic 3D */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <SplineScene 
              scene="https://prod.spline.design/9eu0NWT9iZha2dA6/scene.splinecode"
              className="opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-amaura-bg)]/50 to-[var(--color-amaura-bg)]" />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-7xl mx-auto px-6 text-center"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card mb-8 border-white/10 uppercase tracking-[0.3em] text-[10px] font-black text-white/50">
              <Sparkles className="w-3 h-3 text-amaura-blue" />
              Next-Gen Business Architecture
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.85] tracking-tight mb-10 text-gradient">
              THE FUTURE OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amaura-blue via-purple-400 to-amaura-blue animate-shimmer" style={{ backgroundSize: '200% auto' }}>DIGITAL OPS</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-amaura-text-muted text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mb-14">
              Premium, AI-powered systems engineered for high-ticket home service brands. Scale without friction.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/login" className="px-12 py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl shadow-white/10">
                Launch System
              </Link>
              <Link to="/roi" className="px-12 py-6 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all backdrop-blur-md">
                Calculate ROI
              </Link>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
            <div className="w-1 h-12 bg-gradient-to-b from-white to-transparent rounded-full" />
          </div>
        </section>

        {/* INTERACTIVE SYSTEM VISUALIZATION */}
        <section className="max-w-7xl mx-auto px-6 py-40">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">The Amaura Pipeline</h2>
            <p className="text-amaura-text-muted text-lg max-w-2xl mx-auto">From discovery to revenue, we automate every node of your business growth.</p>
          </div>
          <SystemFlow />
        </section>

        {/* PRODUCT MODULES GRID (BENTO) */}
        <section className="max-w-7xl mx-auto px-6 py-40">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <BentoCard 
              title="AI Lead Engine" 
              description="Real-time multi-agent validation and scoring."
              icon={<Bot />}
              className="md:col-span-3 lg:col-span-4"
            >
              <div className="w-full aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/5 relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-amaura-blue/20 to-transparent" />
                 <div className="p-6">
                    <div className="flex gap-2">
                       {[1,2,3,4].map(i => <div key={i} className="h-1 flex-1 bg-amaura-blue/30 rounded-full overflow-hidden">
                          <motion.div className="h-full bg-amaura-blue" animate={{ width: ['0%', '100%'] }} transition={{ duration: 2, repeat: Infinity, delay: i*0.5 }} />
                       </div>)}
                    </div>
                 </div>
              </div>
            </BentoCard>

            <BentoCard 
              title="Workflows" 
              description="Automated ops."
              icon={<Zap />}
              className="md:col-span-3 lg:col-span-2"
            >
              <Activity className="w-full h-24 opacity-20" />
            </BentoCard>

            <BentoCard 
              title="Analytics" 
              description="Deep data insights."
              icon={<BarChart3 />}
              className="md:col-span-3 lg:col-span-2"
            >
              <div className="flex items-end gap-1 h-20">
                 {[40, 70, 45, 90, 65, 80].map((h, i) => (
                    <motion.div 
                       key={i}
                       className="flex-1 bg-purple-500/20 border-t border-purple-500/40 rounded-t-sm"
                       initial={{ height: 0 }}
                       whileInView={{ height: `${h}%` }}
                    />
                 ))}
              </div>
            </BentoCard>

            <BentoCard 
              title="Dashboard" 
              description="Unified control center for your entire operation."
              icon={<Box />}
              className="md:col-span-3 lg:col-span-4"
            >
               <div className="relative h-32 w-full glass-card border-none rounded-2xl overflow-hidden p-4">
                  <div className="flex gap-4">
                     <div className="w-12 h-12 rounded-full bg-amaura-blue/20 animate-pulse" />
                     <div className="space-y-2 flex-1">
                        <div className="h-2 w-3/4 bg-white/10 rounded" />
                        <div className="h-2 w-1/2 bg-white/5 rounded" />
                     </div>
                  </div>
               </div>
            </BentoCard>
          </div>
        </section>

        {/* PRODUCT ENGINE SECTION */}
        <section className="bg-white/5 py-40 border-y border-white/5 overflow-hidden">
           <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                 <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter">Amaura Node <br /><span className="text-amaura-blue">Engine v2.0</span></h2>
                 <p className="text-xl text-amaura-text-muted mb-12">The most advanced infrastructure for home service businesses. Built for speed, precision, and high-fidelity project execution.</p>
                 <div className="space-y-4">
                    {['Core Logic Isolation', 'Multi-Tenant Architecture', 'Real-time Syncing', 'On-Chain Settlements'].map((t, i) => (
                       <div key={i} className="flex items-center gap-4 group">
                          <div className="w-2 h-2 rounded-full bg-amaura-blue group-hover:scale-150 transition-transform" />
                          <span className="font-bold text-sm tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">{t}</span>
                       </div>
                    ))}
                 </div>
              </div>
              <div className="relative">
                 <div className="aspect-square glass-card rounded-[60px] p-12 flex items-center justify-center overflow-hidden">
                    <Cpu className="w-40 h-40 text-amaura-blue/20 absolute animate-spin-slow" style={{ animationDuration: '20s' }} />
                    <div className="relative z-10 text-center">
                       <span className="text-[80px] font-display font-bold tracking-tighter">99.9%</span>
                       <p className="text-xs font-black tracking-[0.5em] text-amaura-blue">UPTIME VERIFIED</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* PERFORMANCE METRICS */}
        <section className="max-w-7xl mx-auto px-6 py-40">
           <div className="grid md:grid-cols-3 gap-12 text-center">
              {[
                { label: 'Revenue Generated', val: '$12.4M+' },
                { label: 'Efficiency Gain', val: '312%' },
                { label: 'Tasks Automated', val: '800k+' }
              ].map((m, i) => (
                <div key={i}>
                   <h3 className="text-6xl lg:text-8xl font-display font-bold tracking-tighter mb-4">{m.val}</h3>
                   <p className="text-xs font-black uppercase tracking-[0.3em] text-amaura-text-muted">{m.label}</p>
                </div>
              ))}
           </div>
        </section>

        {/* FINAL CTA */}
        <section className="max-w-7xl mx-auto px-6 py-40">
           <div className="p-20 md:p-32 rounded-[60px] glass-card text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-amaura-blue/20 via-purple-600/20 to-amaura-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-12 relative z-10">READY TO <br />ASCEND?</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative z-10">
                 <Link to="/login" className="px-16 py-8 bg-white text-black rounded-3xl font-black text-lg uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                    Get Access
                 </Link>
                 <Link to="/contact" className="text-lg font-black uppercase tracking-widest hover:text-amaura-blue transition-colors">
                    Talk to Sales
                 </Link>
              </div>
           </div>
        </section>
      </div>

      {/* Custom Styles for Spin */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
      `}</style>
    </div>
  );
};
