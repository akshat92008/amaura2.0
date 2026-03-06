import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calculator, Check, ExternalLink, Sparkles, TrendingUp, Users, Shield } from 'lucide-react';
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amaura-surface border border-amaura-border text-[10px] font-bold uppercase tracking-widest text-amaura-text-muted mb-10">
              <Sparkles className="w-3 h-3 text-amaura-blue" />
              <span>CRM Solution in 1 Place</span>
              <ArrowRight className="w-3 h-3" />
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] max-w-5xl">
              We Engineer <span className="text-gradient animate-shimmer">High-Ticket CRMs</span> for Home Service Brands.
            </h1>

            <p className="text-lg md:text-xl text-amaura-text-muted max-w-2xl mb-12 leading-relaxed">
              We build secure, AI-powered websites and multi-tenant CRMs that turn your traffic into high-value home service contracts — with Web3 billing built in.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
              <Button variant="outline" className="px-10 py-7 rounded-2xl bg-transparent border-amaura-border hover:bg-amaura-surface transition-all gap-2 text-sm font-bold">
                <Calculator className="w-4 h-4" /> Calculate ROI
              </Button>
              <Button className="px-10 py-7 rounded-2xl bg-amaura-blue hover:scale-105 transition-all gap-2 text-sm font-bold button-glow shadow-xl shadow-amaura-blue/20">
                Get A Quote <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
              {[
                { label: 'Revenue Generated', val: '$8.2M+' },
                { label: 'Active Clients', val: '24' },
                { label: 'Avg Lead Increase', val: '3.2x' },
                { label: 'On-Chain Verified', val: '100%' },
              ].map((s, i) => (
                <div key={i} className="bg-amaura-surface/50 border border-amaura-border rounded-2xl p-6 text-left backdrop-blur-sm">
                  <h4 className="text-3xl font-black mb-1">{s.val}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amaura-text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">Proven Revenue</h2>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-amaura-text-muted opacity-40">Infrastructure</h3>
            </div>
            <p className="max-w-xs text-sm text-amaura-text-muted leading-relaxed font-medium">
              We don't build brochures. We engineer revenue machines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                tag: 'Solar', 
                name: 'Windore Solar CRM', 
                rev: { old: '120k', new: '350k' }, 
                leads: '+145%', 
                conv: '+8.5%',
                color: 'amaura-blue' 
              },
              { 
                tag: 'Plumbing', 
                name: 'ProPlumb Pro', 
                rev: { old: '80k', new: '210k' }, 
                leads: '+210%', 
                conv: '+12%',
                color: 'amaura-emerald' 
              },
              { 
                tag: 'HVAC', 
                name: 'AcreHVAC Control', 
                rev: { old: '150k', new: '420k' }, 
                leads: '+180%', 
                conv: '+10.2%',
                color: 'orange-500' 
              },
              { 
                tag: 'Roofing', 
                name: 'UrbanRoof Partners', 
                rev: { old: '95k', new: '280k' }, 
                leads: '+195%', 
                conv: '+9.8%',
                color: 'purple-500' 
              }
            ].map((p, i) => (
              <div key={i} className="group relative bg-amaura-surface/40 hover:bg-amaura-surface/60 border border-amaura-border p-10 rounded-[40px] transition-all duration-500">
                <div className="flex justify-between items-start mb-12">
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-${p.color}/10 text-${p.color} border border-${p.color}/20`}>
                    {p.tag}
                  </div>
                  <ExternalLink className="w-5 h-5 text-amaura-text-muted opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h4 className="text-3xl font-black mb-10">{p.name}</h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bento-inner p-6">
                    <p className="text-[10px] uppercase font-bold text-amaura-text-muted mb-4 tracking-widest">Revenue</p>
                    <div className="flex items-center gap-2">
                       <span className="text-xs text-amaura-text-muted line-through">${p.rev.old}</span>
                       <ArrowRight className="w-3 h-3 text-amaura-text-muted" />
                       <span className="text-xl font-black">${p.rev.new}</span>
                    </div>
                  </div>
                  <div className="bento-inner p-6">
                    <p className="text-[10px] uppercase font-bold text-amaura-text-muted mb-4 tracking-widest">Lead Flow</p>
                    <div className="flex items-center gap-1 text-[var(--color-amaura-emerald)]">
                       <TrendingUp className="w-4 h-4" />
                       <span className="text-xl font-black">{p.leads}</span>
                    </div>
                  </div>
                  <div className="col-span-2 bento-inner p-4 flex justify-between items-center px-6">
                    <p className="text-[10px] uppercase font-bold text-amaura-text-muted tracking-widest">Conversion:</p>
                    <div className="flex items-center gap-1 text-[var(--color-amaura-emerald)]">
                      <span className="text-sm font-black">{p.conv}</span>
                      <TrendingUp className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-amaura-surface/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6">Calculate Your Lost Revenue</h2>
            <p className="text-amaura-text-muted max-w-xl mx-auto leading-relaxed">See exactly how much you're leaving on the table without an optimized CRM.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="bg-amaura-surface/60 border border-amaura-border p-12 rounded-[40px] space-y-12 backdrop-blur-md">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold uppercase tracking-widest text-amaura-text-muted">Monthly Website Visitors</label>
                  <span className="text-xl font-black text-amaura-blue">{visitors.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="500" max="50000" step="500" value={visitors}
                  onChange={(e) => setVisitors(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amaura-blue"
                />
                <div className="flex justify-between text-[10px] font-bold text-amaura-text-muted"><span>500</span><span>50,000</span></div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold uppercase tracking-widest text-amaura-text-muted">Average Ticket Size ($)</label>
                  <span className="text-xl font-black text-amaura-blue">${ticketSize.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="1000" max="100000" step="1000" value={ticketSize}
                  onChange={(e) => setTicketSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amaura-blue"
                />
                <div className="flex justify-between text-[10px] font-bold text-amaura-text-muted"><span>$1,000</span><span>$100,000</span></div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold uppercase tracking-widest text-amaura-text-muted">Current Close Rate (%)</label>
                  <span className="text-xl font-black text-amaura-blue">{closeRate}%</span>
                </div>
                <input 
                  type="range" min="5" max="50" step="1" value={closeRate}
                  onChange={(e) => setCloseRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amaura-blue"
                />
                <div className="flex justify-between text-[10px] font-bold text-amaura-text-muted"><span>5%</span><span>50%</span></div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-12 rounded-[40px] border border-[var(--color-primary)]/30 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent relative overflow-hidden">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amaura-blue mb-4">Lost Monthly Revenue</p>
                <div className="text-7xl font-black mb-4">
                  ${Math.round(lostMonthly).toLocaleString()}
                </div>
                <p className="text-sm text-amaura-text-muted leading-relaxed font-medium">Improving conversion 2% → 5% with Amaura</p>
              </div>

              <div className="p-12 rounded-[40px] border border-amaura-emerald/30 bg-gradient-to-br from-amaura-emerald/10 to-transparent">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amaura-emerald mb-4">Annual Upside Potential</p>
                <div className="text-7xl font-black mb-4">
                  ${Math.round(annualUpside).toLocaleString()}
                </div>
                <p className="text-sm text-amaura-text-muted leading-relaxed font-medium">Extra revenue over 12 months with Amaura</p>
              </div>

              <Button className="w-full py-10 rounded-[30px] bg-amaura-blue text-white font-black text-xl italic hover:scale-[1.02] transition-all button-glow">
                Recover This Revenue Now <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-20 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amaura-blue flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-2xl tracking-tighter">Amaura</span>
        </div>
        <p className="text-amaura-text-muted text-sm font-medium">© 2024 Amaura Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}
