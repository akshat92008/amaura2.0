import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  Calculator, 
  Smartphone, 
  Globe, 
  Zap, 
  Bot, 
  ShieldCheck, 
  BarChart3,
  TrendingUp,
  ExternalLink,
  Database,
  Code2
} from 'lucide-react';
import { ROICalculator } from '../components/ROICalculator';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-amaura-purple selection:text-white relative">
      <div className="grid-background absolute inset-0 opacity-20 pointer-events-none" />
      
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amaura-purple/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amaura-blue/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <header className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amaura-purple rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)]">
               <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">Amaura</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 bg-white/[0.02] border border-white/5 rounded-full px-8 py-3 backdrop-blur-xl">
            <a href="#services" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Services</a>
            <a href="#work" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Our Work</a>
            <a href="#calculator" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Calculator</a>
          </nav>

          <Link to="/login" className="btn-primary">
            Get Started <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </header>

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 py-32 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60 mb-8 hover:bg-white/10 transition-all cursor-pointer"
          >
            <span className="text-amaura-purple">★</span> CRM Solution in 1 Place <ChevronRight className="w-3 h-3" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.05]"
          >
            We Engineer <span className="text-gradient">High-Ticket CRMs</span> for Home Service Brands.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/40 mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            We build secure, AI-powered websites and multi-tenant CRMs that turn your traffic into high-value home service contracts — with Web3 billing built in.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button className="btn-outline">
              <Calculator className="w-4 h-4 mr-2" /> Calculate ROI
            </button>
            <button className="btn-primary px-10 py-4 scale-110">
              Get A Quote <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-32"
          >
            {[
              { label: 'Revenue Generated', val: '$8.2M+' },
              { label: 'Active Clients', val: '24' },
              { label: 'Avg Lead Increase', val: '3.2x' },
              { label: 'On-Chain Verified', val: '100%' }
            ].map((stat, i) => (
              <div key={i} className="stat-card">
                <p className="text-sm font-bold text-white mb-1">{stat.val}</p>
                <p className="text-[10px] font-bold text-amaura-text-muted uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="max-w-7xl mx-auto px-6 py-60 border-t border-white/5">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  title: 'Website Design & Dev', 
                  desc: 'Pixel-perfect, high-converting landing pages purpose-built for home service brands.',
                  icon: <Globe className="w-6 h-6 text-amaura-purple" />,
                  tag: 'Design'
                },
                { 
                  title: 'CRM Development', 
                  desc: 'Custom multi-tenant CRM with AI lead scoring, Kanban pipelines, and automated follow-ups.',
                  icon: <Database className="w-6 h-6 text-amaura-purple" />,
                  tag: 'CRM'
                },
                { 
                  title: 'Web3 Billing Engine', 
                  desc: 'Accept USDC on Polygon. Milestone payments cryptographically verified on-chain.',
                  icon: <Code2 className="w-6 h-6 text-amaura-purple" />,
                  tag: 'Web3'
                },
                { 
                  title: 'AI Lead Automation', 
                  desc: 'GPT-powered lead scoring, automated SMS/email sequences, and predictive analytics.',
                  icon: <Bot className="w-6 h-6 text-amaura-purple" />,
                  tag: 'AI'
                }
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white/[0.02] border border-white/5 rounded-[40px] p-10 hover:border-amaura-purple/20 transition-all group"
                >
                  <div className="flex items-center justify-between mb-8">
                     <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                        {service.icon}
                     </div>
                     <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase font-bold text-white/40">{service.tag}</span>
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">{service.title}</h3>
                  <p className="text-amaura-text-muted mb-8 text-sm leading-relaxed max-w-sm">{service.desc}</p>
                  <button className="text-xs font-bold flex items-center gap-2 hover:gap-4 transition-all text-white/60 hover:text-white">
                    Learn more <ArrowRight className="w-4 h-4 text-amaura-purple" />
                  </button>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Proven Revenue Section */}
        <section id="work" className="max-w-7xl mx-auto px-6 py-60 border-t border-white/5">
           <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-8">
              <div>
                <span className="px-3 py-1 rounded-full bg-amaura-purple/10 border border-amaura-purple/20 text-[10px] font-bold text-amaura-purple uppercase tracking-widest mb-6 inline-block">★ Our Work</span>
                <h2 className="text-6xl font-display font-bold tracking-tight">Proven Revenue <br /><span className="text-white/20">Infrastructure</span></h2>
              </div>
              <p className="max-w-xs text-amaura-text-muted text-sm font-medium leading-relaxed">
                We don't build brochures. We engineer revenue machines.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  name: 'Windore Solar CRM', 
                  tag: 'Solar',
                  stats: [
                    { label: 'Revenue', val: '$120k → $350k' },
                    { label: 'Lead Flow', val: '+145%' }
                  ],
                  conversion: '+8.5%'
                },
                { 
                  name: 'ProPlumb Pro', 
                  tag: 'Plumbing',
                  stats: [
                    { label: 'Revenue', val: '$80k → $210k' },
                    { label: 'Lead Flow', val: '+210%' }
                  ],
                  conversion: '+12%'
                }
              ].map((project, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[40px] p-12 hover:bg-white/[0.03] transition-all relative overflow-hidden group">
                   <div className="flex justify-between items-start mb-10">
                      <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] font-bold text-orange-500 uppercase">{project.tag}</span>
                      <ExternalLink className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-opacity" />
                   </div>
                   <h3 className="text-2xl font-display font-bold mb-10">{project.name}</h3>
                   <div className="grid grid-cols-2 gap-6 mb-8">
                      {project.stats.map((s, j) => (
                        <div key={j} className="p-6 bg-black/40 rounded-2xl border border-white/5">
                           <p className="text-[10px] text-amaura-text-muted font-bold uppercase mb-2">{s.label}</p>
                           <p className={`text-lg font-bold font-display ${j === 1 ? 'text-amaura-emerald' : 'text-white'}`}>{s.val}</p>
                        </div>
                      ))}
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-xs font-medium text-amaura-text-muted">Conversion: <span className="text-amaura-emerald font-bold">{project.conversion}</span></span>
                     <TrendingUp className="w-5 h-5 text-amaura-emerald" />
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* ROI Calculator Section */}
        <section id="calculator" className="max-w-7xl mx-auto px-6 py-60 border-t border-white/5">
           <div className="text-center mb-24">
              <span className="px-3 py-1 rounded-full bg-amaura-purple/10 border border-amaura-purple/20 text-[10px] font-bold text-amaura-purple uppercase tracking-widest mb-6 inline-block"> $ ROI Calculator </span>
              <h2 className="text-6xl font-display font-bold tracking-tight mb-6">Calculate Your Lost Revenue</h2>
              <p className="text-amaura-text-muted text-sm max-w-lg mx-auto leading-relaxed">
                 See exactly how much you're leaving on the table without an optimized CRM.
              </p>
           </div>

           <div className="grid lg:grid-cols-5 gap-10 items-stretch max-w-6xl mx-auto">
              {/* Sliders Area */}
              <div className="lg:col-span-3 bg-white/[0.02] border border-white/5 rounded-[40px] p-10 lg:p-16">
                 <div className="space-y-12">
                   {[
                     { label: 'Monthly Website Visitors', val: '5,000', min: '500', max: '50,000' },
                     { label: 'Average Ticket Size ($)', val: '$15,000', min: '$1,000', max: '$100,000' },
                     { label: 'Current Close Rate (%)', val: '15%', min: '5%', max: '50%' }
                   ].map((slider, i) => (
                     <div key={i}>
                       <div className="flex justify-between items-center mb-6">
                         <span className="text-sm font-medium text-white/60">{slider.label}</span>
                         <span className="text-lg font-bold text-amaura-purple">{slider.val}</span>
                       </div>
                       <div className="relative h-2 bg-white/5 rounded-full">
                          <div className="absolute top-0 left-0 h-full w-1/3 bg-amaura-purple rounded-full" />
                          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-5 h-5 bg-white border-2 border-amaura-purple rounded-full shadow-xl" />
                       </div>
                       <div className="flex justify-between mt-3 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                          <span>{slider.min}</span>
                          <span>{slider.max}</span>
                       </div>
                     </div>
                   ))}
                 </div>
              </div>

              {/* Results Area */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                 <div className="flex-1 bg-gradient-to-br from-amaura-purple/20 to-transparent border border-amaura-purple/20 rounded-[40px] p-12 flex flex-col justify-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amaura-purple mb-4">Lost Monthly Revenue</p>
                    <h3 className="text-5xl font-display font-bold tracking-tighter mb-4">$337,500</h3>
                    <p className="text-xs text-amaura-text-muted">Improving conversion 2% → 5% with Amaura</p>
                 </div>
                 <div className="flex-1 bg-white/[0.02] border border-amaura-emerald/20 rounded-[40px] p-12 flex flex-col justify-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amaura-emerald mb-4">Annual Upside Potential</p>
                    <h3 className="text-5xl font-display font-bold tracking-tighter mb-4">$4,050,000</h3>
                    <p className="text-xs text-amaura-text-muted">Extra revenue over 12 months with Amaura</p>
                 </div>
                 <button className="w-full py-8 bg-black/60 border border-white/10 rounded-[40px] font-black text-xs uppercase tracking-[0.4em] hover:bg-amaura-purple transition-all group overflow-hidden relative">
                    <span className="relative z-10 flex items-center justify-center gap-3">Recover This Revenue Now <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform" /></span>
                 </button>
              </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 text-center flex flex-col items-center">
           <div className="w-12 h-12 bg-amaura-purple rounded-xl flex items-center justify-center mb-8">
              <Sparkles className="w-6 h-6 text-white" />
           </div>
           <p className="text-sm font-bold opacity-20 uppercase tracking-[0.5em] mb-12">© 2026 Amaura Studio. All rights reserved.</p>
           
           <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
              <a href="#" className="hover:text-white transition-all">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-all">Terms of Service</a>
              <a href="#" className="hover:text-white transition-all">Legal</a>
           </div>
        </footer>
      </div>

      <style>{`
        .text-gradient {
          background: linear-gradient(to right, #8b5cf6, #d8b4fe, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};
