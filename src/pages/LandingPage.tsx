import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BarChart3, Database, Shield, Zap, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function LandingPage() {
  const [visitors, setVisitors] = useState(5000);
  const [ticketSize, setTicketSize] = useState(15000);
  const [closeRate, setCloseRate] = useState(15);

  const currentLeads = visitors * 0.02; // 2% conversion
  const currentRevenue = currentLeads * (closeRate / 100) * ticketSize;

  const optimizedLeads = visitors * 0.05; // 5% conversion with Amaura
  const optimizedRevenue = optimizedLeads * (closeRate / 100) * ticketSize;

  const lostMonthly = optimizedRevenue - currentRevenue;
  const annualUpside = lostMonthly * 12;

  return (
    <div className="min-h-screen bg-amaura-bg font-sans">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-amaura-blue/10 via-transparent to-transparent opacity-50 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amaura-surface border border-amaura-border text-xs font-medium text-amaura-blue mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amaura-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amaura-blue"></span>
              </span>
              Now accepting 2 new clients for Q2
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1] text-white">
              We Engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-amaura-blue via-white to-amaura-blue">Automated Lead CRMs</span> for High-Ticket Home Services.
            </h1>
            
            <p className="text-lg md:text-xl text-amaura-text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
              From Solar to HVAC, we build the technical infrastructure that turns cold traffic into verified revenue. No templates. Just custom engineering.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto px-8 py-6 bg-amaura-blue hover:bg-amaura-blue/90 text-black rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group shadow-xl shadow-amaura-blue/20">
                Transform Your Pipeline
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 bg-amaura-surface hover:bg-amaura-surface-hover border-amaura-border rounded-2xl font-bold text-white transition-all">
                View Case Studies
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-24 px-6 bg-amaura-surface/30 border-y border-amaura-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">Calculate Your Lost Revenue</h2>
            <p className="text-amaura-text-muted max-w-2xl mx-auto">See exactly how much money you're leaving on the table with an unoptimized digital presence.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="p-8 bg-amaura-surface border-amaura-border">
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-white">Monthly Website Visitors</label>
                    <span className="text-sm text-amaura-blue font-mono">{visitors.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="500" max="50000" step="500"
                    value={visitors}
                    onChange={(e) => setVisitors(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amaura-blue"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-white">Average Ticket Size ($)</label>
                    <span className="text-sm text-amaura-blue font-mono">${ticketSize.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1000" max="50000" step="1000"
                    value={ticketSize}
                    onChange={(e) => setTicketSize(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amaura-blue"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-white">Sales Close Rate (%)</label>
                    <span className="text-sm text-amaura-blue font-mono">{closeRate}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" max="50" step="1"
                    value={closeRate}
                    onChange={(e) => setCloseRate(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amaura-blue"
                  />
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <div className="p-8 rounded-3xl border border-amaura-blue/30 bg-amaura-blue/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <DollarSign className="w-32 h-32 text-amaura-blue" />
                </div>
                <p className="text-sm text-amaura-blue font-medium mb-2 uppercase tracking-wider">Estimated Lost Monthly Revenue</p>
                <h3 className="text-5xl font-bold text-white mb-2">
                  ${Math.round(lostMonthly).toLocaleString()}
                </h3>
                <p className="text-sm text-amaura-text-muted">Based on improving conversion from 2% to 5%</p>
              </div>
              
              <div className="p-8 rounded-3xl border border-amaura-emerald/30 bg-amaura-emerald/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <BarChart3 className="w-32 h-32 text-amaura-emerald" />
                </div>
                <p className="text-sm text-amaura-emerald font-medium mb-2 uppercase tracking-wider">Annual Upside Potential</p>
                <h3 className="text-5xl font-bold text-white mb-2">
                  ${Math.round(annualUpside).toLocaleString()}
                </h3>
                <p className="text-sm text-amaura-text-muted">Extra revenue generated over 12 months</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Portfolio */}
      <section id="portfolio" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 italic font-serif">Engineered to Convert</h2>
            <p className="text-amaura-text-muted max-w-md">A look at the custom CRM ecosystems we've deployed for market leaders.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Case Study 1: Solar */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-amaura-surface border border-amaura-border p-8 transition-all hover:bg-amaura-surface-hover">
              <div className="absolute top-0 right-0 p-8 text-amaura-blue opacity-10 group-hover:scale-150 transition-transform duration-500">
                <Zap size={120} />
              </div>
              <div className="relative h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-amaura-blue mb-2 tracking-widest uppercase">Solar Industry</div>
                  <h3 className="text-3xl font-bold mb-4 text-white">Windore Solar AI CRM</h3>
                  <p className="text-amaura-text-muted max-w-sm">Automated lead qualification and automated appointment setting for a $50M/year solar installer.</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <span className="px-3 py-1 rounded-full bg-amaura-blue/10 text-amaura-blue border border-amaura-blue/20">+42% Conversion</span>
                  <span className="px-3 py-1 rounded-full bg-zinc-800 text-amaura-text-muted">Next.js + AI</span>
                </div>
              </div>
            </div>

            {/* Case Study 2: HVAC */}
            <div className="group relative overflow-hidden rounded-3xl bg-amaura-surface border border-amaura-border p-8 transition-all hover:bg-amaura-surface-hover">
              <div className="relative h-full flex-col justify-between hidden group-hover:flex">
                 {/* Visual effect only */}
              </div>
              <div className="relative h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-amaura-blue mb-2 tracking-widest uppercase">HVAC</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Emergency Dispatch Hub</h3>
                  <p className="text-amaura-text-muted text-sm">Real-time technician routing and automated billing for residential HVAC fleets.</p>
                </div>
                <BarChart3 className="text-amaura-blue/30 group-hover:text-amaura-blue transition-colors" size={48} />
              </div>
            </div>

            {/* Case Study 3: AI Development */}
            <div className="group relative overflow-hidden rounded-3xl bg-amaura-surface border border-amaura-border p-8 transition-all hover:bg-amaura-surface-hover">
              <div className="relative h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-amaura-blue mb-2 tracking-widest uppercase">AI Engineering</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">LeadGen Oracle</h3>
                  <p className="text-amaura-text-muted text-sm">Predictive lead scoring engine for multi-state real estate agencies.</p>
                </div>
                <Database className="text-amaura-blue/30 group-hover:text-amaura-blue transition-colors" size={48} />
              </div>
            </div>

            {/* CTA Card */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-amaura-blue p-[1px] transition-all hover:scale-[1.01]">
              <div className="h-full w-full bg-amaura-bg rounded-[23px] p-8 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Ready to engineer your growth?</h3>
                  <p className="text-amaura-text-muted text-sm italic">Let's build something that actually drives revenue.</p>
                </div>
                <Button className="px-6 py-3 bg-amaura-blue hover:bg-amaura-blue/90 text-black rounded-xl font-bold transition-colors flex items-center gap-2">
                  Get Started <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
