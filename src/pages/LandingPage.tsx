import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BarChart3, ShieldCheck, Zap, Lock, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

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
    <div className="min-h-screen bg-amaura-bg pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,255,157,0.1),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amaura-surface border border-amaura-border text-sm text-amaura-blue mb-8">
                <Zap className="w-4 h-4" />
                <span>Web3-Powered Agency Infrastructure</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight mb-6">
                We Engineer <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amaura-blue to-amaura-emerald">
                  Revenue Infrastructure
                </span><br />
                for Home Service Brands.
              </h1>
              <p className="text-xl text-amaura-text-muted mb-10 max-w-xl">
                AI-powered websites + CRM + automated lead systems. Stop losing high-ticket jobs to competitors with better digital presence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2 text-base" onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}>
                  Calculate Lost Revenue <ArrowRight className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-base">
                  Book Strategy Call
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-amaura-blue to-amaura-emerald rounded-2xl blur opacity-20" />
              <Card className="relative bg-amaura-bg/80 border-amaura-border overflow-hidden">
                <div className="p-4 border-b border-amaura-border flex items-center gap-2 bg-amaura-surface/50">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <div className="ml-4 flex-1 h-6 bg-amaura-bg rounded border border-amaura-border flex items-center px-3">
                    <span className="text-xs text-amaura-text-muted font-mono">app.amaura.studio/dashboard</span>
                  </div>
                </div>
                <div className="p-6 grid gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-amaura-text-muted mb-1">Total Pipeline Value</p>
                      <h3 className="text-3xl font-display font-bold text-white">$1,245,000</h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amaura-blue/10 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-amaura-blue" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-amaura-text-muted">Phase 2: Alpha Build</span>
                      <span className="text-amaura-emerald">Unlocked</span>
                    </div>
                    <div className="h-2 bg-amaura-surface rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amaura-blue to-amaura-emerald w-2/3 rounded-full" />
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-amaura-surface border border-amaura-border flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amaura-emerald/10 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-amaura-emerald" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Milestone Payment Verified</p>
                      <p className="text-xs text-amaura-text-muted font-mono">Tx: 0x8f9a...1b2c</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-24 px-6 bg-amaura-surface/30 border-y border-amaura-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-4">Calculate Your Lost Revenue</h2>
            <p className="text-amaura-text-muted max-w-2xl mx-auto">See exactly how much money you're leaving on the table with an unoptimized digital presence.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="p-8">
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
                    className="w-full accent-amaura-blue"
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
                    className="w-full accent-amaura-blue"
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
                    className="w-full accent-amaura-blue"
                  />
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="p-8 border-amaura-blue/30 bg-amaura-blue/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <DollarSign className="w-32 h-32 text-amaura-blue" />
                </div>
                <p className="text-sm text-amaura-blue font-medium mb-2 uppercase tracking-wider">Estimated Lost Monthly Revenue</p>
                <h3 className="text-5xl font-display font-bold text-white mb-2">
                  ${Math.round(lostMonthly).toLocaleString()}
                </h3>
                <p className="text-sm text-amaura-text-muted">Based on improving conversion from 2% to 5%</p>
              </Card>
              
              <Card className="p-8 border-amaura-emerald/30 bg-amaura-emerald/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <BarChart3 className="w-32 h-32 text-amaura-emerald" />
                </div>
                <p className="text-sm text-amaura-emerald font-medium mb-2 uppercase tracking-wider">Annual Upside Potential</p>
                <h3 className="text-5xl font-display font-bold text-white mb-2">
                  ${Math.round(annualUpside).toLocaleString()}
                </h3>
                <p className="text-sm text-amaura-text-muted">Extra revenue generated over 12 months</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section id="proof" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-4">Proven Infrastructure</h2>
            <p className="text-amaura-text-muted max-w-2xl mx-auto">We don't build brochures. We build revenue engines.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { industry: 'Solar CRM', before: '$120k/mo', after: '$350k/mo', leads: '+145%', conv: '+8.5%' },
              { industry: 'Plumbing CRM', before: '$80k/mo', after: '$210k/mo', leads: '+210%', conv: '+12%' },
              { industry: 'HVAC CRM', before: '$150k/mo', after: '$420k/mo', leads: '+180%', conv: '+10.2%' },
            ].map((study, i) => (
              <Card key={i} className="p-6 hover:border-amaura-blue/50 transition-colors group">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-display font-semibold text-white">{study.industry}</h4>
                  <div className="w-8 h-8 rounded-full bg-amaura-surface border border-amaura-border flex items-center justify-center group-hover:bg-amaura-blue/10 group-hover:border-amaura-blue/30 transition-colors">
                    <ArrowRight className="w-4 h-4 text-amaura-text-muted group-hover:text-amaura-blue" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-amaura-surface border border-amaura-border">
                    <span className="text-sm text-amaura-text-muted">Revenue</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium line-through text-amaura-text-muted">{study.before}</span>
                      <ArrowRight className="w-3 h-3 text-amaura-blue" />
                      <span className="text-sm font-bold text-white">{study.after}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-amaura-surface border border-amaura-border">
                      <p className="text-xs text-amaura-text-muted mb-1">Lead Flow</p>
                      <p className="text-lg font-bold text-amaura-emerald">{study.leads}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-amaura-surface border border-amaura-border">
                      <p className="text-xs text-amaura-text-muted mb-1">Conversion</p>
                      <p className="text-lg font-bold text-amaura-emerald">{study.conv}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
