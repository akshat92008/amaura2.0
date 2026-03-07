import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  Calculator, 
  Globe, 
  Zap, 
  Bot, 
  BarChart3,
  TrendingUp,
  ExternalLink,
  Database,
  Code2,
  Server
} from 'lucide-react';

const FadeInView = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const BackgroundGlow = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#030303]">
    {/* Permanent Atmospheric Base */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.15),transparent_60%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(79,70,229,0.1),transparent_60%)]" />

    {/* Dynamic Blobs */}
    <motion.div 
      animate={{ 
        scale: [1, 1.3, 1],
        opacity: [0.5, 0.8, 0.5],
        x: [-50, 50, -50],
        y: [-20, 20, -20]
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-amaura-purple/40 rounded-full blur-[120px]" 
    />
    
    <motion.div 
      animate={{ 
        x: [50, -50, 50],
        y: [30, -30, 30],
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-amaura-blue/30 rounded-full blur-[100px]" 
    />
    
    <motion.div 
      animate={{ 
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-amaura-purple/20 rounded-full blur-[150px]" 
    />

    {/* Grid Overlay */}
    <div className="grid-background absolute inset-0 opacity-20" />

    {/* Grain Overlay */}
    <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none bg-[url('https://res.cloudinary.com/dqr66zvtj/image/upload/v1675104443/noise_pfxszq.png')]" />
  </div>
);

const TextAnimate = ({ text, className }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <h1 className={className}>
      {words.map((word, i) => {
        const isHighlight = word.toLowerCase().includes("crm") || word.toLowerCase().includes("high-ticket");
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ 
              duration: 0.8, 
              delay: i * 0.1, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            className={`inline-block mr-[0.25em] ${isHighlight ? 'text-shimmer-purple' : ''}`}
          >
            {word}
          </motion.span>
        );
      })}
    </h1>
  );
};

export const LandingPage = () => {
  const [visitors, setVisitors] = useState(5000);
  const [ticketSize, setTicketSize] = useState(15000);
  const [closeRate, setCloseRate] = useState(15);

  const [lostMonthly, setLostMonthly] = useState(0);
  const [annualUpside, setAnnualUpside] = useState(0);

  useEffect(() => {
    // Audit math: (Visitors * CloseRate * TicketSize) = Current
    // Improved = (Visitors * (CloseRate + 3%) * (TicketSize * 1.1)) // Assuming 10% higher ticket too
    const currentRev = visitors * (closeRate / 100) * ticketSize;
    const potentialRev = visitors * ((closeRate + 4) / 100) * (ticketSize * 1.05); // More aggressive impact
    const diff = potentialRev - currentRev;
    
    setLostMonthly(diff);
    setAnnualUpside(diff * 12);
  }, [visitors, ticketSize, closeRate]);

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-amaura-purple selection:text-white relative font-sans">
      <BackgroundGlow />

      <div className="relative z-10">
        {/* Navigation */}
        <header className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-amaura-purple rounded-[14px] flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover:scale-110 transition-transform duration-500">
               <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tighter">Amaura</span>
          </motion.div>

          <nav className="hidden md:flex bg-black/40 backdrop-blur-2xl border border-white/5 rounded-full px-6 py-3 items-center gap-6 shadow-xl">
            <a href="#services" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all">Services</a>
            <a href="#work" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all">Our Work</a>
            <a href="#calculator" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all">Calculator</a>
          </nav>

          <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/login" className="btn-premium-purple !px-6 !py-2.5 !text-[10px] !uppercase !tracking-[0.2em] !rounded-xl">
              Get Started
            </Link>
          </motion.div>
        </header>

        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-8 py-16 md:py-24 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.3em] text-white/50 mb-8 hover:bg-white/10 transition-all cursor-pointer"
          >
            <span className="text-amaura-purple animate-pulse">★</span> CRM Solution in 1 Place <ChevronRight className="w-3 h-3" />
          </motion.div>

          <TextAnimate 
            className="text-5xl md:text-[5rem] font-display font-bold tracking-tighter mb-8 leading-[1.0] max-w-4xl mx-auto"
            text="We Engineer High-Ticket CRMs for Home Service Brands."
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex justify-center mb-10"
          >
             <div className="h-px w-20 bg-gradient-to-r from-transparent via-amaura-purple/40 to-transparent" />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg md:text-xl text-white/30 mb-10 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight"
          >
            We build secure, AI-powered websites and multi-tenant CRMs that turn your traffic into high-value home service contracts.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <button className="btn-premium-outline">
              <Calculator className="w-4 h-4" /> Calculate ROI
            </button>
            <button className="btn-premium-purple group">
              Get A Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-40"
          >
            {[
              { label: 'Revenue Generated', val: '$8.2M+', color: 'text-amaura-purple' },
              { label: 'Active Clients', val: '24', color: 'text-white' },
              { label: 'Avg Lead Increase', val: '3.2x', color: 'text-amaura-emerald' },
              { label: 'On-Chain Verified', val: '100%', color: 'text-amaura-blue' }
            ].map((stat, i) => (
              <div key={i} className="stat-card group">
                <p className={`text-4xl font-display font-black mb-2 tracking-tighter ${stat.color} group-hover:scale-110 transition-transform`}>{stat.val}</p>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] leading-tight">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="max-w-7xl mx-auto px-8 section-padding border-t border-white/5">
           <FadeInView>
             <div className="mb-24 text-center">
                <h2 className="text-5xl font-display font-bold tracking-tighter mb-6">Core Infrastructure</h2>
                <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-black">End-to-End Operational Excellence</p>
             </div>
           </FadeInView>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  title: 'Website Design & Dev', 
                  desc: 'Pixel-perfect, high-converting landing pages purpose-built for home service brands.',
                  icon: <Globe className="w-8 h-8 text-amaura-purple" />,
                  tag: 'Design'
                },
                { 
                  title: 'CRM Development', 
                  desc: 'Custom multi-tenant CRM with AI lead scoring, Kanban pipelines, and automated follow-ups.',
                  icon: <Database className="w-8 h-8 text-amaura-purple" />,
                  tag: 'CRM'
                },
                { 
                  title: 'Web3 Billing Engine', 
                  desc: 'Accept USDC on Polygon. Milestone payments cryptographically verified on-chain.',
                  icon: <Code2 className="w-8 h-8 text-amaura-purple" />,
                  tag: 'Web3'
                },
                { 
                  title: 'AI Lead Automation', 
                  desc: 'GPT-powered lead scoring, automated SMS/email sequences, and predictive analytics.',
                  icon: <Bot className="w-8 h-8 text-amaura-purple" />,
                  tag: 'AI'
                }
              ].map((service, i) => (
                <FadeInView key={i} delay={i * 0.1}>
                  <div className="glass-card group">
                    <div className="flex items-center justify-between mb-12">
                       <div className="w-20 h-20 rounded-[28px] bg-white/[0.03] flex items-center justify-center border border-white/5 group-hover:scale-110 group-hover:bg-amaura-purple/10 transition-all duration-700">
                          {service.icon}
                       </div>
                       <span className="px-5 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase font-black tracking-widest text-white/30 group-hover:text-amaura-purple transition-colors">{service.tag}</span>
                    </div>
                    <h3 className="text-4xl font-display font-bold mb-6 tracking-tight">{service.title}</h3>
                    <p className="text-white/40 mb-12 text-lg leading-relaxed max-w-sm font-medium">{service.desc}</p>
                    <button className="text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-3 group-hover:gap-6 transition-all text-white/30 group-hover:text-white">
                      Learn more <ArrowRight className="w-5 h-5 text-amaura-purple" />
                    </button>
                  </div>
                </FadeInView>
              ))}
           </div>
        </section>

        {/* Proven Revenue Section */}
        <section id="work" className="max-w-7xl mx-auto px-8 section-padding border-t border-white/5">
           <FadeInView>
             <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
                <div>
                  <span className="px-4 py-1.5 rounded-full bg-amaura-purple/10 border border-amaura-purple/20 text-[10px] font-black text-amaura-purple uppercase tracking-[0.4em] mb-8 inline-block">★ Our Work</span>
                  <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-[0.9]">Proven Revenue <br /><span className="text-white/10 uppercase italic">Infrastructure</span></h2>
                </div>
                <p className="max-w-[280px] text-white/40 text-[11px] font-black uppercase tracking-[0.3em] leading-relaxed pb-4">
                  We don't build brochures. We engineer high-yield revenue machines.
                </p>
             </div>
           </FadeInView>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
                <FadeInView key={i} delay={i * 0.1}>
                  <div className="glass-card !p-16 hover:bg-white/[0.04] relative overflow-hidden group">
                     <div className="flex justify-between items-start mb-16">
                        <span className="px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] font-black text-orange-500 uppercase tracking-widest">{project.tag}</span>
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:text-amaura-purple transition-colors">
                          <ExternalLink className="w-6 h-6" />
                        </div>
                     </div>
                     <h3 className="text-4xl font-display font-bold mb-16 tracking-tight">{project.name}</h3>
                     <div className="grid grid-cols-2 gap-8 mb-12">
                        {project.stats.map((s, j) => (
                          <div key={j} className="p-8 bg-black/40 rounded-3xl border border-white/5 group-hover:border-white/10 transition-colors">
                             <p className="text-[10px] text-white/20 font-black uppercase tracking-widest mb-4">{s.label}</p>
                             <p className={`text-2xl font-black font-display leading-none ${j === 1 ? 'text-amaura-emerald' : 'text-white'}`}>{s.val}</p>
                          </div>
                        ))}
                     </div>
                     <div className="flex items-center justify-between pt-8 border-t border-white/5">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Target Opt: <span className="text-amaura-emerald font-black">{project.conversion}</span></span>
                       <TrendingUp className="w-6 h-6 text-amaura-emerald" />
                     </div>
                  </div>
                </FadeInView>
              ))}
           </div>
        </section>

        {/* ROI Calculator Section */}
        <section id="calculator" className="max-w-7xl mx-auto px-8 section-padding border-t border-white/5">
           <FadeInView>
             <div className="text-center mb-32">
                <span className="px-4 py-1.5 rounded-full bg-amaura-purple/10 border border-amaura-purple/20 text-[10px] font-black text-amaura-purple uppercase tracking-[0.4em] mb-8 inline-block"> $ ROI Calculator </span>
                <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-8 max-w-4xl mx-auto leading-[0.9]">Calculate Your Lost <span className="text-white/10 uppercase italic">Revenue</span></h2>
                <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.3em] max-w-sm mx-auto leading-relaxed">
                   See exactly how much you're leaving on the table without an optimized pipeline.
                </p>
             </div>
           </FadeInView>

           <div className="grid lg:grid-cols-5 gap-12 items-stretch max-w-6xl mx-auto">
              {/* Sliders Area */}
              <FadeInView className="lg:col-span-3" key="sliders">
                <div className="glass-card h-full !p-16">
                   <div className="space-y-16">
                     {[
                       { label: 'Monthly Website Visitors', val: visitors.toLocaleString('en-US'), min: 500, max: 50000, step: 500, current: visitors, set: setVisitors },
                       { label: 'Average Ticket Size ($)', val: `$${ticketSize.toLocaleString('en-US')}`, min: 1000, max: 100000, step: 1000, current: ticketSize, set: setTicketSize },
                       { label: 'Current Close Rate (%)', val: `${closeRate}%`, min: 1, max: 50, step: 1, current: closeRate, set: setCloseRate }
                     ].map((slider, i) => (
                       <div key={i}>
                         <div className="flex justify-between items-center mb-8">
                           <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40">{slider.label}</span>
                           <span className="text-2xl font-display font-black text-amaura-purple">{slider.val}</span>
                         </div>
                         <div className="relative h-2.5 bg-white/5 rounded-full group cursor-pointer">
                            <input 
                              type="range"
                              min={slider.min}
                              max={slider.max}
                              step={slider.step}
                              value={slider.current}
                              onChange={(e) => slider.set(Number(e.target.value))}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                            />
                            <div 
                              className="absolute top-0 left-0 h-full bg-amaura-purple rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-none" 
                              style={{ width: `${((slider.current - slider.min) / (slider.max - slider.min)) * 100}%` }}
                            />
                            <div 
                              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-amaura-purple rounded-full shadow-2xl transition-none z-10 pointer-events-none"
                              style={{ left: `${((slider.current - slider.min) / (slider.max - slider.min)) * 100}%`, transform: 'translate(-50%, -50%)' }}
                            />
                         </div>
                         <div className="flex justify-between mt-5 text-[9px] font-black text-white/10 uppercase tracking-[0.4em]">
                            <span>{slider.min.toLocaleString()}</span>
                            <span>{slider.max.toLocaleString()}</span>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
              </FadeInView>

              {/* Results Area */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                 <FadeInView delay={0.1} className="flex-1" key="res-1">
                   <div className="h-full bg-gradient-to-br from-amaura-purple/20 via-transparent to-transparent border border-amaura-purple/20 rounded-[48px] p-16 flex flex-col justify-center relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-1000">
                        <TrendingUp className="w-32 h-32 text-amaura-purple" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amaura-purple mb-6 relative z-10">Lost Monthly Revenue</p>
                      <h3 className="text-5xl md:text-6xl font-display font-black tracking-tighter mb-6 relative z-10">${Math.round(lostMonthly).toLocaleString('en-US')}</h3>
                      <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black relative z-10">Incr. conversion {closeRate}% → {closeRate + 4}% with Amaura</p>
                   </div>
                 </FadeInView>
                 
                 <FadeInView delay={0.2} className="flex-1" key="res-2">
                   <div className="h-full glass-card !p-16 flex flex-col justify-center border-amaura-emerald/20 group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-150 transition-transform duration-1000">
                        <ArrowRight className="w-32 h-32 text-amaura-emerald -rotate-45" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amaura-emerald mb-6 relative z-10">Annual Upside Potential</p>
                      <h3 className="text-5xl md:text-6xl font-display font-black tracking-tighter mb-6 relative z-10">${Math.round(annualUpside).toLocaleString('en-US')}</h3>
                      <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black relative z-10">Extra yield over 12 months pipeline</p>
                   </div>
                 </FadeInView>

                 <motion.button 
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   className="btn-premium-purple !h-auto !py-10 !rounded-[48px] !text-sm !uppercase !tracking-[0.5em] !font-black shadow-2xl relative group overflow-hidden"
                 >
                    <span className="relative z-10 flex items-center justify-center gap-4">
                      Recover Now 
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" />
                    </span>
                 </motion.button>
              </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-8 py-32 border-t border-white/5 text-center flex flex-col items-center">
           <FadeInView>
             <div className="w-16 h-16 bg-amaura-purple rounded-[22px] flex items-center justify-center mb-12 shadow-[0_0_40px_rgba(139,92,246,0.3)]">
                <Sparkles className="w-8 h-8 text-white" />
             </div>
             
             <div className="flex flex-col md:flex-row gap-16 md:gap-32 mb-20 text-[11px] font-black uppercase tracking-[0.5em] text-white/20">
                <a href="#services" className="hover:text-white transition-all hover:tracking-[0.8em]">Services</a>
                <a href="#work" className="hover:text-white transition-all hover:tracking-[0.8em]">Our Work</a>
                <a href="#calculator" className="hover:text-white transition-all hover:tracking-[0.8em]">Analytics</a>
             </div>

             <div className="h-px w-full max-w-sm bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />
             
             <p className="text-[10px] font-black opacity-10 uppercase tracking-[0.6em] mb-12">© 2026 Amaura Studio. End-to-End Cryptography Verified.</p>
             
             <div className="flex gap-16 text-[9px] font-black uppercase tracking-[0.4em] text-white/10">
                <a href="#" className="hover:text-white transition-all">Privacy Node</a>
                <a href="#" className="hover:text-white transition-all">Terms of Sync</a>
             </div>
           </FadeInView>
        </footer>
      </div>

      <style>{`
        .text-gradient {
          background: linear-gradient(to right, #8b5cf6, #d8b4fe, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
