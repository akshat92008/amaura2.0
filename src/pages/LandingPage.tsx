import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calculator, ExternalLink, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function LandingPage() {
  const [visitors, setVisitors] = useState(5000);
  const [ticketSize, setTicketSize] = useState(15000);
  const [closeRate, setCloseRate] = useState(15);

  const currentLeads = visitors * 0.02;
  const currentRevenue = currentLeads * (closeRate / 100) * ticketSize;
  const optimizedLeads = visitors * 0.05;
  const optimizedRevenue = optimizedLeads * (closeRate / 100) * ticketSize;
  const lostMonthly = optimizedRevenue - currentRevenue;
  const annualUpside = lostMonthly * 12;

  return (
    <div className="min-h-screen bg-amaura-bg text-white selection:bg-amaura-blue selection:text-white">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-background pointer-events-none opacity-40 z-0" />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-primary)]/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amaura-surface border border-amaura-border text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted mb-10"
            >
              <Sparkles className="w-3 h-3 text-amaura-blue" />
              <span>CRM Solution in 1 Place</span>
              <ArrowRight className="w-3 h-3" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-[100px] font-black tracking-tight mb-8 leading-[0.9] max-w-5xl"
            >
              We Engineer <span className="text-gradient animate-shimmer">High-Ticket CRMs</span> for Home Service Brands.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-amaura-text-muted max-w-2xl mb-12 leading-relaxed"
            >
              We build secure, AI-powered websites and multi-tenant CRMs that turn your traffic into high-value home service contracts — with Web3 billing built in.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24"
            >
              <Button variant="outline" className="px-10 py-7 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 transition-all gap-2 text-sm font-bold backdrop-blur-md">
                <Calculator className="w-4 h-4" /> Calculate ROI
              </Button>
              <Button className="px-10 py-7 rounded-2xl bg-amaura-blue hover:scale-105 transition-all gap-2 text-sm font-bold button-glow shadow-2xl shadow-amaura-blue/20">
                Get A Quote <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl"
            >
              {[
                { label: 'Revenue Generated', val: '$8.2M+' },
                { label: 'Active Clients', val: '24' },
                { label: 'Avg Lead Increase', val: '3.2x' },
                { label: 'On-Chain Verified', val: '100%' },
              ].map((s, i) => (
                <div key={i} className="bg-[#0a0a0c]/80 border border-white/5 rounded-3xl p-8 text-left backdrop-blur-xl group hover:border-amaura-blue/30 transition-colors">
                  <h4 className="text-4xl font-black mb-2 group-hover:text-amaura-blue transition-colors tracking-tighter">{s.val}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 leading-none">Proven Revenue</h2>
              <h3 className="text-5xl md:text-8xl font-black tracking-tighter text-amaura-text-muted opacity-40 leading-none">Infrastructure.</h3>
            </div>
            <p className="max-w-xs text-sm text-amaura-text-muted leading-relaxed font-medium">
              We don't build brochures. We engineer revenue machines for industry leaders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                tag: 'Roofing', 
                name: 'Elite Shield Roofing', 
                rev: { old: '120k', new: '350k' }, 
                leads: '+145%', 
                conv: '+8.5%',
                color: 'amaura-blue' 
              },
              { 
                tag: 'Solar', 
                name: 'Apex Solar Solutions', 
                rev: { old: '150k', new: '420k' }, 
                leads: '+180%', 
                conv: '+10.2%',
                color: 'amaura-blue' 
              }
            ].map((p, i) => (
              <div key={i} className="group relative bg-[#0a0a0c]/60 hover:bg-[#0a0a0c]/80 border border-white/5 p-12 rounded-[50px] transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amaura-blue/5 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-amaura-blue/10 transition-all" />
                
                <div className="flex justify-between items-start mb-16 relative z-10">
                  <div className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-amaura-blue/10 text-amaura-blue border border-amaura-blue/20">
                    {p.tag}
                  </div>
                  <ExternalLink className="w-5 h-5 text-amaura-text-muted opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h4 className="text-4xl font-black mb-12 tracking-tight relative z-10">{p.name}</h4>

                <div className="grid grid-cols-2 gap-6 relative z-10">
                  <div className="bg-white/5 border border-white/5 rounded-3xl p-8">
                    <p className="text-[10px] uppercase font-bold text-amaura-text-muted mb-4 tracking-widest">Revenue Growth</p>
                    <div className="flex items-center gap-2">
                       <span className="text-xs text-amaura-text-muted line-through">${p.rev.old}</span>
                       <ArrowRight className="w-3 h-3 text-amaura-text-muted" />
                       <span className="text-2xl font-black tracking-tighter">${p.rev.new}</span>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-3xl p-8">
                    <p className="text-[10px] uppercase font-bold text-amaura-text-muted mb-4 tracking-widest">Lead Flow</p>
                    <div className="flex items-center gap-1 text-[var(--color-amaura-emerald)]">
                       <TrendingUp className="w-5 h-5" />
                       <span className="text-2xl font-black tracking-tighter">{p.leads}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero-like CTA Section */}
      <section className="py-40 px-6 relative z-10 text-center overflow-hidden">
        <div className="absolute inset-0 bg-amaura-blue/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <div className="flex items-center justify-center gap-2 mb-8">
             <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-4xl animate-bounce">
                👋
             </div>
          </div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            Let’s talk about your project
          </h2>
          <p className="text-amaura-text-muted text-lg max-w-xl mx-auto font-medium">
            I am available for new projects 🔥<br />
            We only take 3 new clients per quarter to ensure Tier 1 quality.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button variant="outline" className="px-10 py-7 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 transition-all gap-2 text-sm font-bold backdrop-blur-md">
              <Zap className="w-4 h-4" /> Chat Now
            </Button>
            <Button className="px-10 py-7 rounded-2xl bg-amaura-blue hover:scale-105 transition-all gap-2 text-sm font-bold shadow-2xl shadow-amaura-blue/20">
              Get A Quote <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[10px] font-bold text-amaura-text-muted/40 uppercase tracking-widest pt-8">
            No setup fees. First milestone only. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-24 text-center relative z-10 border-t border-white/5">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amaura-blue flex items-center justify-center shadow-lg shadow-amaura-blue/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="font-black text-3xl tracking-tighter">Amaura</span>
        </div>
        <div className="space-y-4">
          <nav className="flex items-center justify-center gap-10 text-xs font-bold text-amaura-text-muted uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#" className="hover:text-white transition-colors">Services</a>
            <a href="#" className="hover:text-white transition-colors">Stack</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </nav>
          <p className="text-amaura-text-muted/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-8">
            © 2024 Amaura Agency. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
