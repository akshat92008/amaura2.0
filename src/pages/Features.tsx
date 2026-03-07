import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  FileText, 
  BarChart3, 
  Bot, 
  CreditCard, 
  Send,
  Plus,
  MoreVertical,
  Download,
  Trash2,
  Wallet,
  ArrowUpRight,
  ChevronRight,
  Terminal,
  Cpu, 
  ShieldCheck, 
  History,
  X
} from 'lucide-react';
import { useDashboardFeatures } from '../hooks/useDashboardFeatures';
import { motion, AnimatePresence } from 'motion/react';

// --- AI COPILOT ---
export const Copilot = () => {
  const { messages, sendAIMessage } = useDashboardFeatures();
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const currentInput = input;
    setInput('');
    setIsThinking(true);
    
    try {
      await sendAIMessage(currentInput);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white">
      <Sidebar />
      <main className="flex-grow ml-64 flex flex-col h-screen overflow-hidden relative">
        {/* Animated Neural Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full glow-mesh opacity-20" />
        </div>

        <header className="p-10 border-b border-white/5 flex items-center justify-between relative z-10 backdrop-blur-xl bg-black/20">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-[20px] bg-amaura-blue/10 border border-amaura-blue/20 flex items-center justify-center relative">
               <Cpu className="w-7 h-7 text-amaura-blue" />
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-amaura-emerald rounded-full border-2 border-black animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold tracking-tight">AI Command Center</h1>
              <div className="flex items-center gap-3 mt-1">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amaura-blue">Neural Model: Amaura-4S</span>
                 <div className="w-1 h-1 bg-white/20 rounded-full" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amaura-emerald">Operational</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button className="p-3 rounded-xl hover:bg-white/5 transition-all text-amaura-text-muted"><History className="w-5 h-5" /></button>
             <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Node Logs
             </button>
          </div>
        </header>

        <div ref={scrollRef} className="flex-grow overflow-y-auto p-10 space-y-10 relative z-10 custom-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 rounded-full glow-mesh flex items-center justify-center mb-8 border border-amaura-blue/20">
                 <Sparkles className="w-12 h-12 text-amaura-blue animate-pulse" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-3 tracking-tight">Systems Visualizer Online</h2>
              <p className="max-w-md text-sm text-amaura-text-muted font-medium leading-relaxed"> Amaura-4S is processing your infrastructure variables. Inquire about revenue optimization, lead scoring models, or project logistics. </p>
            </div>
          )}
          
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={m.id} 
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`group relative max-w-[80%] lg:max-w-[60%] p-8 rounded-[32px] text-sm font-medium leading-relaxed shadow-2xl ${
                  m.sender === 'user' 
                    ? 'bg-amaura-blue text-white rounded-tr-none' 
                    : 'bg-[#0a0a0c] border border-white/5 text-amaura-text-muted rounded-tl-none'
                }`}>
                  {m.sender === 'ai' && (
                    <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-4">
                       <div className="flex items-center gap-2 uppercase tracking-[0.2em] text-[10px] font-black">
                          <ShieldCheck className="w-3 h-3 text-amaura-emerald" /> Verified Logic
                       </div>
                    </div>
                  )}
                  {m.text}
                </div>
              </motion.div>
            ))}
            
            {isThinking && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex justify-start"
              >
                <div className="bg-[#0a0a0c] border border-white/5 p-6 rounded-[24px] rounded-tl-none flex items-center gap-4">
                   <div className="flex gap-1.5 focus-within:ring-0">
                      {[1, 2, 3].map(i => (
                        <motion.div 
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 rounded-full bg-amaura-blue"
                        />
                      ))}
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Analyzing Infrastructure...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <form onSubmit={handleSend} className="p-10 bg-[#060608] border-t border-white/5 relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <div className="max-w-5xl mx-auto relative group">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-[#0a0a0c] border border-white/10 rounded-[28px] py-7 pl-10 pr-24 text-base focus:outline-none focus:border-amaura-blue/50 focus:ring-4 focus:ring-amaura-blue/5 transition-all font-medium placeholder:text-white/20"
              placeholder="Deploy a command or request system analysis..."
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-amaura-blue text-white flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-xl shadow-amaura-blue/20"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

// --- CALENDAR ---
export const Calendar = () => {
  const { events, addEvent } = useDashboardFeatures();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ 
    title: '', 
    date: new Date().toISOString().split('T')[0], 
    type: 'installation' as const 
  });

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = (getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()) + 6) % 7; // Adjust for Mon start

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;
    
    await addEvent(newEvent);
    setIsModalOpen(false);
    setNewEvent({ title: '', date: new Date().toISOString().split('T')[0], type: 'installation' });
  };

  const eventTypes = [
    { value: 'installation', label: 'Installation', color: 'bg-amaura-blue' },
    { value: 'survey', label: 'Site Survey', color: 'bg-orange-500' },
    { value: 'meeting', label: 'Consultation', color: 'bg-purple-500' },
    { value: 'follow-up', label: 'Follow Up', color: 'bg-amaura-emerald' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-500' }
  ];
  
  return (
    <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white">
      <Sidebar />
      <main className="flex-grow ml-64 p-8 lg:p-12 overflow-y-auto relative">
        <header className="mb-16 flex justify-between items-end">
          <div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-3">Fulfillment Timeline</h1>
            <div className="flex items-center gap-4">
               <div className="px-3 py-1 rounded-lg bg-amaura-blue/10 border border-amaura-blue/20 text-[10px] font-black text-amaura-blue uppercase tracking-widest">
                  {events.length} System Nodes
               </div>
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted">
                 {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
               </p>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-amaura-blue px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-amaura-blue/20"
          >
            <Plus className="w-4 h-4" /> Provision Milestone
          </button>
        </header>

        <div className="grid grid-cols-7 gap-px border border-white/5 bg-white/5 rounded-[40px] overflow-hidden shadow-2xl">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="bg-[#0a0a0c] p-6 text-[10px] font-black uppercase tracking-[0.3em] text-amaura-text-muted text-center border-b border-white/5">
               {day}
            </div>
          ))}
          {Array.from({ length: 42 }).map((_, i) => {
            const dayNum = i - firstDay + 1;
            const isCurrentMonth = dayNum > 0 && dayNum <= daysInMonth;
            const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const dayEvents = events.filter(e => e.date === dateStr);

            return (
              <div key={i} className={`min-h-[140px] bg-[#030303] p-6 hover:bg-white/[0.02] transition-colors relative group border-r border-b border-white/5 ${i % 7 === 6 ? 'border-r-0' : ''}`}>
                 <span className={`text-xs font-black ${isCurrentMonth ? 'text-white/60' : 'text-white/5'} group-hover:text-amaura-blue transition-colors`}>
                   {isCurrentMonth ? dayNum : ''}
                 </span>
                 
                 <div className="mt-2 space-y-2">
                   {dayEvents.map(event => {
                     const typeInfo = eventTypes.find(t => t.value === event.type) || eventTypes[0];
                     return (
                       <motion.div 
                         key={event.id}
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className={`p-2.5 rounded-xl border border-white/5 cursor-pointer hover:border-white/20 transition-all overflow-hidden ${typeInfo.color}/10`}
                       >
                          <div className={`w-1 h-1 rounded-full ${typeInfo.color} mb-1.5`} />
                          <p className="text-[9px] font-bold truncate text-white/80">{event.title}</p>
                       </motion.div>
                     );
                   })}
                 </div>
              </div>
            );
          })}
        </div>

        {/* Add Event Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/40">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-[#0a0a0c] border border-white/10 rounded-[40px] p-10 max-w-lg w-full shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-amaura-blue/10 blur-[100px] rounded-full" />
                <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>

                <h2 className="text-3xl font-display font-bold mb-2">Provision Node</h2>
                <p className="text-amaura-text-muted mb-8 text-sm font-medium">Synchronizing fulfillment milestones with the global core.</p>

                <form onSubmit={handleCreateEvent} className="space-y-6 relative z-10 text-white/25">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted ml-2">Milestone Descriptor</label>
                    <input 
                      required
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm focus:border-amaura-blue/50 outline-none transition-all font-medium placeholder:text-white/10"
                      placeholder="e.g. Phase 1 Deployment"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted ml-2">Temporal Node</label>
                       <input 
                        required
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm focus:border-amaura-blue/50 outline-none transition-all font-medium appearance-none"
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted ml-2">Category</label>
                       <select 
                        value={newEvent.type}
                        onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as any })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm focus:border-amaura-blue/50 outline-none transition-all font-medium appearance-none"
                      >
                        {eventTypes.map(type => (
                          <option key={type.value} value={type.value} className="bg-[#0a0a0c] text-white">
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-grow bg-white/5 border border-white/5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      Abort
                    </button>
                    <button 
                      type="submit"
                      className="flex-grow bg-amaura-blue text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-amaura-blue/20"
                    >
                      Deploy Milestone
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

// --- DOCUMENTS ---
export const Documents = () => {
  const { documents } = useDashboardFeatures();
  
  const mockDocs = documents.length > 0 ? documents : [
    { name: 'ServiceAgreement_Apex.pdf', type: 'Contract', size: '2.4 MB', date: 'Dec 14, 2025', owner: 'Legal Bot' },
    { name: 'Survey_Asset_01.raw', type: 'Media', size: '124 MB', date: 'Dec 12, 2025', owner: 'Field Node' },
    { name: 'Permit_Approval_V2.pdf', type: 'Official', size: '1.1 MB', date: 'Dec 08, 2025', owner: 'Gov Portal' },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white">
      <Sidebar />
      <main className="flex-grow ml-64 p-8 lg:p-12 overflow-y-auto">
        <header className="mb-16 flex justify-between items-end">
          <div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-3">Asset Vault</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted">High-Fidelity Document Infrastructure</p>
          </div>
          <div className="flex gap-4">
             <button className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                Create Folder
             </button>
             <button className="bg-amaura-blue px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-amaura-blue/20 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Upload Infrastructure
             </button>
          </div>
        </header>

        <div className="bg-[#0a0a0c] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-10 text-[10px] font-black uppercase tracking-[0.2em] text-amaura-text-muted">Asset Name</th>
                <th className="p-10 text-[10px] font-black uppercase tracking-[0.2em] text-amaura-text-muted">Identity</th>
                <th className="p-10 text-[10px] font-black uppercase tracking-[0.2em] text-amaura-text-muted">Origin</th>
                <th className="p-10 text-[10px] font-black uppercase tracking-[0.2em] text-amaura-text-muted">Weight</th>
                <th className="p-10 text-[10px] font-black uppercase tracking-[0.2em] text-amaura-text-muted">Commands</th>
              </tr>
            </thead>
            <tbody>
              {mockDocs.map((doc, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group cursor-pointer">
                  <td className="p-10">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-amaura-blue/30 transition-all">
                        <FileText className="w-6 h-6 text-amaura-blue" />
                      </div>
                      <div>
                         <span className="text-base font-bold text-white block mb-1">{doc.name}</span>
                         <span className="text-[10px] font-bold text-amaura-text-muted uppercase tracking-widest">SHA-256 Verified</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-10">
                    <span className="px-4 py-1.5 rounded-full bg-amaura-blue/10 border border-amaura-blue/20 text-[10px] font-black uppercase tracking-widest text-amaura-blue">
                      {doc.type}
                    </span>
                  </td>
                  <td className="p-10 text-sm font-bold text-amaura-text-muted">{'owner' in doc ? doc.owner : 'System'}</td>
                  <td className="p-10 text-sm font-bold text-amaura-text-muted uppercase">{doc.size}</td>
                  <td className="p-10">
                    <div className="flex items-center gap-4 translate-x-10 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-amaura-blue/20 hover:text-amaura-blue"><Download className="w-4 h-4" /></button>
                      <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-red-400/20 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

// --- BILLING (WEB3) ---
export const Billing = () => {
  return (
    <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white">
      <Sidebar />
      <main className="flex-grow ml-64 p-8 lg:p-12 overflow-y-auto relative">
        <header className="mb-16">
          <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-3">Settlement Infrastructure</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted">Decentralized Node Revenue Sync</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 bg-gradient-to-br from-amaura-blue to-purple-800 rounded-[50px] p-16 relative overflow-hidden shadow-2xl shadow-amaura-blue/30 group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
             <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                   <div className="flex items-center justify-between mb-12">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Global Node Balance</p>
                      <ShieldCheck className="w-6 h-6 text-amaura-emerald" />
                   </div>
                   <div className="flex items-baseline gap-6">
                      <h2 className="text-7xl lg:text-8xl font-display font-bold tracking-tighter">142.85 <span className="text-4xl opacity-50 font-sans tracking-normal">ETH</span></h2>
                   </div>
                   <div className="mt-6 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-amaura-emerald animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Secure Settlement Node Connected</span>
                   </div>
                </div>
                <div className="flex mt-24 gap-6">
                   <button className="flex-grow bg-white text-black py-6 rounded-[28px] font-black text-sm uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl">Execute Withdrawal</button>
                   <button className="px-10 bg-black/30 backdrop-blur-xl rounded-[28px] border border-white/10 hover:bg-black/50 transition-all flex items-center justify-center"><ArrowUpRight className="w-6 h-6" /></button>
                </div>
             </div>
             <Wallet className="absolute -right-16 -bottom-16 w-80 h-80 text-white/10 group-hover:scale-110 transition-transform duration-1000" />
          </div>

          <div className="bg-[#0a0a0c] border border-white/5 rounded-[50px] p-12 flex flex-col justify-between shadow-2xl">
             <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amaura-text-muted mb-10">Active Invoices</h3>
                <div className="space-y-6">
                   {[
                     { client: 'Elite Shield Roofing', amount: '4.50 ETH', status: 'Pending Verification', color: 'text-orange-400' },
                     { client: 'Apex Solar Solutions', amount: '12.2 ETH', status: 'Confirmed', color: 'text-amaura-emerald' }
                   ].map((inv, i) => (
                     <div key={i} className="p-6 bg-white/[0.02] rounded-[30px] border border-white/5 hover:border-amaura-blue/30 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                           <span className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">#INV-882-{i}</span>
                           <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-white/5 ${inv.color}`}>{inv.status}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">{inv.client}</h4>
                        <p className="text-xl font-display font-bold tracking-tighter">{inv.amount}</p>
                     </div>
                   ))}
                </div>
             </div>
             <button className="w-full py-5 mt-12 rounded-[24px] border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all">Generate New Request</button>
          </div>
        </div>

        <div className="bg-[#0a0a0c] border border-white/5 rounded-[50px] p-12 shadow-2xl">
           <div className="flex items-center justify-between mb-12">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amaura-text-muted">Settlement Node Logs</h3>
              <button className="text-[10px] font-black uppercase tracking-widest text-amaura-blue hover:underline transition-all">Audit All Transactions</button>
           </div>
           <div className="space-y-8">
              {[
                { type: 'Payment Sync', from: '0x71...f2', amount: '+4.200 ETH', date: '2h ago', status: 'COMPLETED' },
                { type: 'Node Withdrawal', from: 'Amaura Master', amount: '-1.500 ETH', date: '1d ago', status: 'COMPLETED' },
                { type: 'Contract Settlement', from: '0x12...a4', amount: '+12.000 ETH', date: '3d ago', status: 'COMPLETED' },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between group">
                   <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5 ${tx.amount.startsWith('+') ? 'bg-amaura-emerald/10 text-amaura-emerald' : 'bg-red-400/10 text-red-400'}`}>
                         <ArrowUpRight className={`w-5 h-5 ${tx.amount.startsWith('-') ? 'rotate-180' : ''}`} />
                      </div>
                      <div>
                         <p className="text-sm font-bold text-white mb-1 uppercase tracking-tight">{tx.type}</p>
                         <p className="text-[10px] text-amaura-text-muted tracking-[0.2em] font-black uppercase">{tx.from}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className={`text-lg font-display font-bold tracking-tighter ${tx.amount.startsWith('+') ? 'text-amaura-emerald' : 'text-white'}`}>{tx.amount}</p>
                      <div className="flex items-center gap-2 justify-end mt-1">
                         <div className="w-1 h-1 bg-amaura-emerald rounded-full" />
                         <span className="text-[9px] text-amaura-text-muted font-black tracking-widest uppercase">{tx.status} — {tx.date}</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
};

// --- ANALYTICS ---
export const Analytics = () => {
  return (
    <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white">
      <Sidebar />
      <main className="flex-grow ml-64 p-8 lg:p-12 overflow-y-auto relative">
        <header className="mb-16">
          <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-3">Revenue Intelligence</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted">Real-Time Core Performance Matrix</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
           {[
             { label: 'Avg Ticket Value', val: '$18,450', growth: '+12.4%', color: 'text-amaura-emerald' },
             { label: 'Acquisition Latency', val: '14.2m', growth: '-5.2%', color: 'text-amaura-emerald' },
             { label: 'LTV Multiplier', val: '4.2x', growth: '+24.1%', color: 'text-purple-400' },
           ].map((s, i) => (
             <div key={i} className="bg-[#0a0a0c] border border-white/5 rounded-[40px] p-10 shadow-xl group hover:border-amaura-blue/30 transition-all">
                <div className="flex items-center justify-between mb-10">
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amaura-text-muted">{s.label}</p>
                   <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-amaura-blue" /></div>
                </div>
                <div className="flex items-end justify-between">
                   <h2 className="text-5xl font-display font-bold tracking-tighter">{s.val}</h2>
                   <div className="text-right">
                      <span className={`text-[10px] font-black flex items-center gap-1 uppercase ${s.color}`}>
                         <ArrowUpRight className={`w-3 h-3 ${s.growth.startsWith('-') ? 'rotate-90' : ''}`} /> {s.growth}
                      </span>
                      <p className="text-[9px] font-bold text-amaura-text-muted uppercase tracking-widest mt-1">vs prev active</p>
                   </div>
                </div>
             </div>
           ))}
        </div>

        <div className="bg-[#0a0a0c] border border-white/5 rounded-[50px] p-20 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 glow-mesh opacity-10 group-hover:opacity-20 transition-opacity" />
           <div className="text-center relative z-10">
              <div className="w-24 h-24 rounded-full bg-amaura-blue/10 border border-amaura-blue/20 flex items-center justify-center mx-auto mb-10 animate-pulse">
                 <BarChart3 className="w-10 h-10 text-amaura-blue" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 tracking-tight">Streaming Data Matrix</h3>
              <p className="max-w-md text-sm text-amaura-text-muted font-medium mb-10 leading-relaxed mx-auto uppercase tracking-widest text-[10px]"> Amaura Node V4 is currently synchronizing with global revenue streams. Neural visualization will initialize shortly. </p>
              <div className="flex gap-4 justify-center">
                 {[1, 2, 3, 4, 5].map(i => (
                    <motion.div 
                       key={i}
                       animate={{ 
                         height: [20, 40, 20],
                         opacity: [0.3, 1, 0.3]
                       }}
                       transition={{ 
                         repeat: Infinity, 
                         duration: 0.8, 
                         delay: i * 0.1 
                       }}
                       className="w-1.5 bg-amaura-blue rounded-full"
                    />
                 ))}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};
