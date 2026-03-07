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
  Command
} from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[var(--color-amaura-bg)] text-white overflow-x-hidden selection:bg-amaura-blue selection:text-white">
      {/* Immersive Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amaura-blue/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="grid-background absolute inset-0 opacity-20" />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <div className="flex items-center gap-3 group list-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amaura-blue to-purple-600 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
               <Zap className="w-6 h-6 fill-current" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tighter">Amaura <span className="text-amaura-blue">Hub</span></span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest text-amaura-text-muted">
            <a href="#features" className="hover:text-white transition-colors">Infrastructure</a>
            <a href="#solutions" className="hover:text-white transition-colors">Case Studies</a>
            <Link to="/login" className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-all">Portal Access</Link>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center md:text-left grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
               <Sparkles className="w-4 h-4 text-amaura-blue" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amaura-blue">v4.0 Revenue Engine Active</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[1.05] tracking-tight mb-8">
               High-Ticket <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-amaura-blue via-purple-400 to-white">AI Infrastructure</span>
            </h1>
            <p className="text-lg md:text-xl text-amaura-text-muted font-medium mb-12 max-w-xl leading-relaxed">
               We build sovereign revenue machines for elite service providers. Modular AI agent systems that capture, close, and fulfill at global scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
               <Link to="/login" className="px-10 py-5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-3">
                  Start Deployment <ArrowRight className="w-4 h-4" />
               </Link>
               <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
                  View Demo Node
               </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative hidden lg:block"
          >
             <div className="aspect-[4/3] bg-gradient-to-br from-amaura-blue/20 to-purple-600/20 rounded-[60px] border border-white/10 backdrop-blur-3xl p-1 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-[#0a0a0c]/80" />
                <div className="relative h-full p-12 flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <div className="w-16 h-16 rounded-2xl bg-amaura-blue flex items-center justify-center">
                         <Bot className="w-8 h-8" />
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted mb-1">System Health</p>
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amaura-emerald animate-pulse" />
                            <span className="font-mono text-sm tracking-widest">99.8% READY</span>
                         </div>
                      </div>
                   </div>
                   <div>
                      <h3 className="text-4xl font-display font-bold mb-4 tracking-tighter">Automating <br />$12M+ Annual GMV</h3>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: '84%' }}
                           transition={{ duration: 2, delay: 0.5 }}
                           className="h-full bg-gradient-to-r from-amaura-blue to-purple-500"
                         />
                      </div>
                   </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amaura-blue/20 blur-[100px] rounded-full" />
             </div>
          </motion.div>
        </header>

        {/* Stats Grid */}
        <section className="max-w-7xl mx-auto px-6 pb-40">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Latency', val: '12ms', icon: Activity },
                { label: 'Uptime', val: '100%', icon: Shield },
                { label: 'Global Nodes', val: '432', icon: Globe },
                { label: 'Success Rate', val: '94%', icon: CheckCircle2 }
              ].map((stat, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 flex flex-col justify-between aspect-square group hover:bg-white/5 transition-all">
                   <stat.icon className="w-6 h-6 text-amaura-blue group-hover:scale-110 transition-transform" />
                   <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-amaura-text-muted mb-2">{stat.label}</p>
                      <h3 className="text-4xl font-display font-bold tracking-tighter">{stat.val}</h3>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Features Preview */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-40 border-t border-white/5">
           <div className="flex flex-col lg:flex-row gap-20">
              <div className="lg:w-1/3">
                 <h2 className="text-5xl font-display font-bold mb-8 leading-tight">Built for <br /><span className="text-amaura-blue">Unfair Advantage.</span></h2>
                 <p className="text-amaura-text-muted font-medium leading-relaxed">Most agencies give you tools. We give you infrastructure. Our hub centralizes the entire lifecycle of a high-ticket transaction.</p>
              </div>
              <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">
                 {[
                   { title: 'Neural CRM', desc: 'Real-time pipeline management with AI-scored lead validation.' },
                   { title: 'Unified Inbox', desc: 'Centralized command for every message, SMS, and email flow.' },
                   { title: 'Vision Logistics', desc: 'Visual project tracking from survey to final inspection.' },
                   { title: 'Settlement Hub', desc: 'Decentralized invoicing with instant node wallet sync.' }
                 ].map((feat, i) => (
                   <div key={i} className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-amaura-blue/30 transition-all cursor-default">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                        <Command className="w-5 h-5 text-amaura-blue" />
                      </div>
                      <h4 className="text-xl font-display font-bold mb-4">{feat.title}</h4>
                      <p className="text-sm text-amaura-text-muted leading-relaxed font-medium">{feat.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* CTA */}
        <section className="bg-white text-black py-32 px-6">
           <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-20">
              <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter max-w-3xl">
                 Ready to provision <br />your revenue node?
              </h2>
              <Link to="/login" className="px-12 py-7 bg-black text-white rounded-[32px] font-black text-lg uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                 Access Portal
              </Link>
           </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-6 border-t border-white/5 bg-[#030303]">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-amaura-blue flex items-center justify-center">
                    <Zap className="w-5 h-5 fill-current" />
                 </div>
                 <span className="font-display font-bold text-xl">Amaura</span>
              </div>
              <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">
                 <a href="#" className="hover:text-white transition-colors">Privacy</a>
                 <a href="#" className="hover:text-white transition-colors">Terms</a>
                 <a href="#" className="hover:text-white transition-colors">API Docs</a>
              </div>
              <p className="text-[10px] font-bold text-amaura-text-muted tracking-widest">© 2026 AMAURA INFRASTRUCTURE NODES</p>
           </div>
        </footer>
      </div>
    </div>
  );
};
