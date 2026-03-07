import { useState, useRef, useEffect } from 'react';
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
  ArrowUpRight
} from 'lucide-react';
import { useDashboardFeatures } from '../hooks/useDashboardFeatures';
import { motion, AnimatePresence } from 'motion/react';

// --- AI COPILOT ---
export const Copilot = () => {
  const { messages, sendAIMessage } = useDashboardFeatures();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendAIMessage(input);
    setInput('');
  };

  return (
    <div className="flex min-h-screen bg-[#030303] text-white">
      <Sidebar />
      <main className="flex-grow ml-64 flex flex-col h-screen overflow-hidden">
        <header className="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold flex items-center gap-3">
              <Bot className="text-amaura-blue" />
              AI Copilot
            </h1>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-amaura-text-muted mt-1">Strategic Automation Engine</p>
          </div>
          <div className="px-4 py-2 rounded-full bg-amaura-blue/10 border border-amaura-blue/20 text-amaura-blue text-[10px] font-bold uppercase tracking-widest">
            Neural Node Active
          </div>
        </header>

        <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 scroll-smooth">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <Bot className="w-16 h-16 mb-4" />
              <p className="text-sm font-medium">System initialized. Awaiting strategy input...</p>
            </div>
          )}
          {messages.map((m) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={m.id} 
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] p-6 rounded-[30px] text-sm font-medium leading-relaxed ${
                m.sender === 'user' 
                  ? 'bg-amaura-blue text-white rounded-tr-none' 
                  : 'bg-white/5 border border-white/5 text-amaura-text-muted rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </motion.div>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-8 bg-[#0a0a0c] border-t border-white/5">
          <div className="max-w-4xl mx-auto relative">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
               className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-8 pr-20 text-sm focus:outline-none focus:border-amaura-blue/50 transition-all font-medium"
               placeholder="Ask anything about your pipeline or automation..."
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-amaura-blue flex items-center justify-center hover:scale-105 transition-all shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

// --- CALENDAR ---
export const Calendar = () => {
  const { events } = useDashboardFeatures();
  
  return (
    <div className="flex min-h-screen bg-[#030303] text-white">
      <Sidebar />
      <main className="flex-grow ml-64 p-8 lg:p-12 overflow-y-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">Unified Calendar</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted">Operations & Fulfillment Schedule</p>
          </div>
          <button className="bg-amaura-blue px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" /> New Event
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {/* Simple Grid Representation */}
          {Array.from({ length: 31 }).map((_, i) => (
            <div key={i} className="aspect-square bg-[#0a0a0c] border border-white/5 rounded-2xl p-4 hover:border-amaura-blue/30 transition-colors group relative">
               <span className="text-xs font-bold text-amaura-text-muted group-hover:text-white">{i + 1}</span>
               {i === 14 && (
                 <div className="absolute inset-x-2 bottom-2 p-2 bg-amaura-blue/20 border border-amaura-blue/30 rounded-lg text-[10px] font-bold text-amaura-blue truncate">
                   Solar Install - Smith
                 </div>
               )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// --- DOCUMENTS ---
export const Documents = () => {
  const { documents } = useDashboardFeatures();
  
  const mockDocs = documents.length > 0 ? documents : [
    { name: 'ServiceAgreement_v1.pdf', type: 'contract', size: '2.4 MB', date: 'Oct 24, 2023' },
    { name: 'SiteSurvey_Roof_01.jpg', type: 'photo', size: '4.8 MB', date: 'Oct 22, 2023' },
    { name: 'Permit_Status_Approved.pdf', type: 'permit', size: '1.2 MB', date: 'Oct 15, 2023' },
  ];

  return (
    <div className="flex min-h-screen bg-[#030303] text-white">
      <Sidebar />
      <main className="flex-grow ml-64 p-8 lg:p-12 overflow-y-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">Document Vault</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted">Secure Asset Management</p>
          </div>
          <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-white/10 transition-all">
            <Plus className="w-4 h-4" /> Upload File
          </button>
        </header>

        <div className="bg-[#0a0a0c] border border-white/5 rounded-[40px] overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-amaura-text-muted">Document Name</th>
                <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-amaura-text-muted">Type</th>
                <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-amaura-text-muted">Size</th>
                <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-amaura-text-muted">Date</th>
                <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-amaura-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockDocs.map((doc, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-amaura-blue" />
                      </div>
                      <span className="text-sm font-bold">{doc.name}</span>
                    </div>
                  </td>
                  <td className="p-8">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-amaura-text-muted">
                      {doc.type}
                    </span>
                  </td>
                  <td className="p-8 text-sm text-amaura-text-muted font-medium">{doc.size}</td>
                  <td className="p-8 text-sm text-amaura-text-muted font-medium">{'date' in doc ? doc.date : 'Just now'}</td>
                  <td className="p-8">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:text-amaura-blue"><Download className="w-4 h-4" /></button>
                      <button className="p-2 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
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
    <div className="flex min-h-screen bg-[#030303] text-white">
      <Sidebar />
      <main className="flex-grow ml-64 p-8 lg:p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-display font-bold mb-2">Web3 Billing</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted">Decentralized Revenue Settlement</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 bg-gradient-to-br from-amaura-blue to-purple-600 rounded-[40px] p-12 relative overflow-hidden shadow-2xl shadow-amaura-blue/20">
             <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-8">Node Wallet Balance</p>
                   <div className="flex items-baseline gap-4">
                      <h2 className="text-6xl font-display font-bold tracking-tighter">142.85 <span className="text-2xl">ETH</span></h2>
                   </div>
                </div>
                <div className="flex mt-20 gap-4">
                   <button className="flex-grow bg-white text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">Withdraw</button>
                   <button className="px-8 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-black/30 transition-all"><MoreVertical /></button>
                </div>
             </div>
             <Wallet className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10 -rotate-12" />
          </div>

          <div className="bg-[#0a0a0c] border border-white/5 rounded-[40px] p-10 flex flex-col justify-between">
             <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted mb-8">Active Invoices</h3>
                <div className="space-y-6">
                   {[
                     { client: 'Elite Shield', amount: '$12,500', status: 'Pending' },
                     { client: 'Apex Solar', amount: '$8,200', status: 'Sent' }
                   ].map((inv, i) => (
                     <div key={i} className="flex justify-between items-center bg-white/5 rounded-2xl p-4 border border-white/5">
                        <div className="flex flex-col">
                           <span className="text-xs font-bold">{inv.client}</span>
                           <span className="text-[10px] font-bold text-amaura-text-muted">{inv.status}</span>
                        </div>
                        <span className="text-sm font-black">{inv.amount}</span>
                     </div>
                   ))}
                </div>
             </div>
             <button className="w-full py-4 mt-10 rounded-2xl border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">Create Invoice</button>
          </div>
        </div>

        <div className="bg-[#0a0a0c] border border-white/5 rounded-[40px] p-10">
           <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted mb-8">Recent Settlement History</h3>
           <div className="space-y-4">
              {[
                { type: 'Payment Recieved', from: '0x71...f2', amount: '+4.2 ETH', date: '2h ago' },
                { type: 'Withdrawal', from: 'Node Wallet', amount: '-1.5 ETH', date: '1d ago' },
                { type: 'Payment Recieved', from: '0x12...a4', amount: '+12.0 ETH', date: '3d ago' },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                   <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.amount.startsWith('+') ? 'bg-amaura-emerald/10 text-amaura-emerald' : 'bg-red-400/10 text-red-400'}`}>
                         <ArrowUpRight className="w-4 h-4" />
                      </div>
                      <div>
                         <p className="text-xs font-bold">{tx.type}</p>
                         <p className="text-[10px] text-amaura-text-muted tracking-widest uppercase">{tx.from}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className={`text-sm font-black ${tx.amount.startsWith('+') ? 'text-amaura-emerald' : 'text-white'}`}>{tx.amount}</p>
                      <p className="text-[10px] text-amaura-text-muted font-bold">{tx.date}</p>
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
    <div className="flex min-h-screen bg-[#030303] text-white">
      <Sidebar />
      <main className="flex-grow ml-64 p-8 lg:p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-display font-bold mb-2">Revenue Analytics</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted">Core Performance Matrix</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
           {[
             { label: 'Avg Ticket Size', val: '$18,450', growth: '+12%' },
             { label: 'Acquisition Cost', val: '$840', growth: '-5%' },
             { label: 'LTV Projection', val: '$42,000', growth: '+24%' },
           ].map((s, i) => (
             <div key={i} className="bg-[#0a0a0c] border border-white/5 rounded-[30px] p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted mb-6">{s.label}</p>
                <div className="flex items-end justify-between">
                   <h2 className="text-4xl font-display font-bold tracking-tighter">{s.val}</h2>
                   <span className={`text-[10px] font-black px-2 py-1 rounded-md ${s.growth.startsWith('+') ? 'bg-amaura-emerald/10 text-amaura-emerald' : 'bg-red-400/10 text-red-400'}`}>
                      {s.growth}
                   </span>
                </div>
             </div>
           ))}
        </div>

        <div className="bg-[#0a0a0c] border border-white/5 rounded-[40px] p-10 h-[400px] flex items-center justify-center">
           <div className="text-center opacity-40">
              <BarChart3 className="w-16 h-16 mx-auto mb-4" />
              <p className="text-sm font-medium uppercase tracking-[0.2em]">Live Data Streams Syncing...</p>
           </div>
        </div>
      </main>
    </div>
  );
};
