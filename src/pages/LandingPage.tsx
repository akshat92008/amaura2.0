import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Zap, 
  Shield, 
  Bot, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Activity,
  Code,
  Sparkles,
  Command,
  TrendingUp,
  Cpu,
  BarChart3,
  Box,
  Wallet
} from 'lucide-react';

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
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-amaura-blue/20 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="grid-background absolute inset-0 opacity-[0.15]" />
      </div>

      <div className="relative z-10 items-center justify-center pt-32 pb-40">
        {/* Main Hero */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 text-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card mb-8 border-white/10">
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">CRM Solution in 1 Place</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tight mb-10">
             We Engineer <span className="text-white">High-Ticket</span> <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-amaura-blue via-purple-400 to-amaura-blue animate-shimmer" style={{ backgroundSize: '200% auto' }}>CRMs</span> <br />
             <span className="text-white">for Home Service Brands.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-amaura-text-muted text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-14">
             We build secure, AI-powered websites and multi-tenant CRMs that turn your traffic into high-value home service contracts — with Web3 billing built in.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/roi" className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all backdrop-blur-md flex items-center gap-3 group">
               <span className="opacity-60 group-hover:opacity-100 transition-opacity">Calculate ROI</span>
            </Link>
            <Link to="/login" className="px-10 py-5 bg-[var(--color-primary)] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl shadow-purple-500/30 flex items-center gap-3">
               Get A Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Grid - Matching the screenshot exactly */}
        <section className="max-w-7xl mx-auto px-6 mt-32">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Revenue Generated', val: '$8.2M+', icon: TrendingUp },
                { label: 'Active Clients', val: '24', icon: CheckCircle2 },
                { label: 'Avg Lead Increase', val: '3.2x', icon: Zap },
                { label: 'On-Chain Verified', val: '100%', icon: Shield }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="p-10 rounded-[40px] glass-card border-white/5 group hover:border-amaura-blue/30 transition-all flex flex-col justify-end aspect-square relative overflow-hidden"
                >
                   <div className="absolute top-8 left-8">
                      <stat.icon className="w-6 h-6 text-amaura-blue/50 group-hover:text-amaura-blue group-hover:scale-110 transition-all duration-500" />
                   </div>
                   <div>
                      <h3 className="text-4xl lg:text-5xl font-display font-bold tracking-tighter mb-2">{stat.val}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted">{stat.label}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Floating Dashboard Preview (High End Animation) */}
        <section className="max-w-7xl mx-auto px-6 py-40">
           <motion.div 
             initial={{ opacity: 0, y: 100 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1 }}
             viewport={{ once: true }}
             className="relative pt-20"
           >
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-amaura-bg)] to-transparent z-10 h-32 bottom-0" />
              <div className="p-2 rounded-[50px] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
                 <div className="aspect-video rounded-[42px] bg-[#0a0a0c] relative overflow-hidden flex items-center justify-center group">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <div className="relative z-10 text-center">
                       <div className="w-20 h-20 rounded-full bg-amaura-blue/10 border border-amaura-blue/20 flex items-center justify-center mx-auto mb-8">
                          <Bot className="w-10 h-10 text-amaura-blue" />
                       </div>
                       <h3 className="text-3xl font-display font-bold tracking-tight mb-4 text-white">Advanced Node Visualizer</h3>
                       <div className="flex gap-2 justify-center">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className="w-2 h-8 bg-purple-500/50 rounded-full animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />
                          ))}
                       </div>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-amaura-blue/10 rounded-full blur-[100px] group-hover:bg-amaura-blue/20 transition-all duration-1000" />
                    <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[100px]" />
                 </div>
              </div>
           </motion.div>
        </section>

        {/* Features Content */}
        <section id="services" className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                 <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 leading-tight tracking-tight">Scale Without <br /><span className="text-amaura-blue">Compromise.</span></h2>
                 <p className="text-xl text-amaura-text-muted leading-relaxed mb-12 font-medium">
                   Traditional CRMs are slow, bloated, and generic. Amaura Hub is built for speed, precision, and high-ticket service architecture.
                 </p>
                 <div className="space-y-6">
                    {[
                      { icon: Box, text: 'Modular Dashboard for any industry' },
                      { icon: Bot, text: 'Real-time lead scoring & AI validation' },
                      { icon: Wallet, text: 'Integrated Web3 Billing & settlements' },
                      { icon: Cpu, text: 'High-fidelity project execution tracking' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-5 group">
                         <div className="w-10 h-10 rounded-xl bg-amaura-emerald/10 border border-amaura-emerald/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <CheckCircle2 className="w-5 h-5 text-amaura-emerald" />
                         </div>
                         <span className="font-bold text-sm tracking-wide text-white/80 group-hover:text-white transition-colors uppercase tracking-[0.1em]">{item.text}</span>
                      </div>
                    ))}
                 </div>
              </motion.div>
              
              <div className="relative">
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.8 }}
                   viewport={{ once: true }}
                   className="aspect-square bg-gradient-to-br from-amaura-blue/20 to-purple-600/20 rounded-[60px] p-1 shadow-2xl overflow-hidden group"
                 >
                    <div className="absolute inset-0 bg-[#0c0c0e]/80" />
                    <div className="relative h-full p-12 flex flex-col justify-between">
                       <div className="flex justify-between items-start">
                          <Cpu className="w-12 h-12 text-amaura-blue group-hover:rotate-12 transition-transform duration-1000" />
                          <div className="text-right">
                             <p className="text-[10px] font-black text-amaura-text-muted uppercase tracking-[0.2em] mb-1">Infrastructure Load</p>
                             <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-amaura-emerald animate-pulse" />
                                <span className="text-xs font-black tracking-widest uppercase">SYDNEY-NODE-01</span>
                             </div>
                          </div>
                       </div>
                       <div>
                          <h3 className="text-4xl font-display font-bold mb-4 tracking-tighter">Powered by <br />Amaura Node Engine</h3>
                          <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               whileInView={{ width: '84%' }}
                               transition={{ duration: 2, delay: 0.5 }}
                               className="h-full bg-gradient-to-r from-amaura-blue to-purple-500 rounded-full" 
                             />
                          </div>
                       </div>
                    </div>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* CTA Section */}
        <section id="quote" className="max-w-7xl mx-auto px-6 py-32">
           <div className="bg-white text-black p-16 md:p-24 rounded-[60px] flex flex-col md:flex-row items-center justify-between gap-12 shadow-[0_50px_100px_rgba(0,0,0,0.2)] overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amaura-blue/10 blur-[100px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
              <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-left relative z-10">
                 Let’s talk about <br />your project.
              </h2>
              <Link to="/login" className="px-12 py-7 bg-black text-white rounded-[32px] font-black text-lg uppercase tracking-widest hover:scale-105 transition-all shadow-xl relative z-10 flex items-center gap-3">
                 Partner With Us <ArrowRight className="w-5 h-5" />
              </Link>
           </div>
        </section>
      </div>
    </div>
  );
};
