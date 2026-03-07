import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useLeads } from '../hooks/useLeads';
import { 
  Search, 
  MessageSquare, 
  User, 
  Send, 
  Phone, 
  Video, 
  MoreHorizontal,
  Mail,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Inbox = () => {
  const { leads } = useLeads();
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [message, setMessage] = useState('');

  const mockMessages = [
    { text: "Hey! I was looking for a solar quote for my roof.", sender: 'lead', time: '10:15 AM' },
    { text: "Great! I've assigned an AI agent to analyze your site. One moment.", sender: 'you', time: '10:16 AM' },
    { text: "AI Scoring Complete: Lead is HOT (9.2/10)", sender: 'system', time: '10:16 AM' },
    { text: "Do you have any financing options available?", sender: 'lead', time: '10:20 AM' },
  ];

  return (
    <div className="flex min-h-screen bg-[#030303] text-white">
      <Sidebar />
      
      <main className="flex-grow ml-64 flex h-screen overflow-hidden">
        {/* Conversations List */}
        <div className="w-[400px] border-r border-white/5 flex flex-col bg-[#0a0a0c]/50">
           <header className="p-8 border-b border-white/5">
              <h1 className="text-2xl font-display font-bold mb-6">Unified Inbox</h1>
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amaura-text-muted" />
                 <input 
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-amaura-blue/50"
                    placeholder="Search conversations..."
                 />
              </div>
           </header>

           <div className="flex-grow overflow-y-auto">
              {leads.length === 0 && (
                <div className="p-8 text-center text-amaura-text-muted opacity-40">
                   <MessageSquare className="w-12 h-12 mx-auto mb-4" />
                   <p className="text-xs font-bold uppercase tracking-widest">No active leads</p>
                </div>
              )}
              {leads.map((lead) => (
                <button 
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`w-full p-6 flex items-center gap-4 hover:bg-white/5 transition-all text-left border-b border-white/5 ${selectedLead?.id === lead.id ? 'bg-amaura-blue/5 border-r-2 border-r-amaura-blue' : ''}`}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amaura-blue to-purple-600 flex items-center justify-center font-bold text-sm">
                    {lead.name.charAt(0)}
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <div className="flex justify-between items-center mb-1">
                       <span className="font-bold text-sm truncate">{lead.name}</span>
                       <span className="text-[10px] font-bold text-amaura-text-muted uppercase">10:20 AM</span>
                    </div>
                    <p className="text-[10px] font-bold text-amaura-text-muted truncate uppercase tracking-widest">
                       {lead.status === 'won' ? 'Project Active' : 'Negotiation'}
                    </p>
                  </div>
                </button>
              ))}
           </div>
        </div>

        {/* Chat Area */}
        <div className="flex-grow flex flex-col bg-[#030303] relative">
           {selectedLead ? (
             <>
               <header className="p-8 border-b border-white/5 flex items-center justify-between bg-[#0a0a0c]/30 backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-amaura-blue flex items-center justify-center font-bold text-xs">
                        {selectedLead.name.charAt(0)}
                     </div>
                     <div>
                        <h2 className="text-sm font-bold">{selectedLead.name}</h2>
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-amaura-emerald" />
                           <span className="text-[10px] font-bold text-amaura-emerald uppercase tracking-[0.2em]">Online</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <button className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all"><Phone className="w-4 h-4" /></button>
                     <button className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all"><Video className="w-4 h-4" /></button>
                     <button className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all"><MoreHorizontal className="w-4 h-4" /></button>
                  </div>
               </header>

               <div className="flex-grow overflow-y-auto p-10 space-y-6">
                  {mockMessages.map((m, i) => (
                    <div key={i} className={`flex ${m.sender === 'lead' ? 'justify-start' : 'justify-end'}`}>
                       {m.sender === 'system' ? (
                         <div className="w-full flex justify-center py-4">
                            <div className="px-4 py-2 rounded-full bg-amaura-blue/10 border border-amaura-blue/20 flex items-center gap-2">
                               <Zap className="w-3 h-3 text-amaura-blue" />
                               <span className="text-[10px] font-black uppercase tracking-widest text-amaura-blue">{m.text}</span>
                            </div>
                         </div>
                       ) : (
                         <div className={`max-w-[60%] p-6 rounded-[30px] shadow-sm ${m.sender === 'lead' ? 'bg-[#0a0a0c] border border-white/5 rounded-tl-none' : 'bg-amaura-blue rounded-tr-none'}`}>
                            <p className="text-sm font-medium leading-relaxed">{m.text}</p>
                            <span className={`text-[10px] font-bold uppercase mt-3 block opacity-40 ${m.sender === 'lead' ? '' : 'text-right'}`}>
                               {m.time}
                            </span>
                         </div>
                       )}
                    </div>
                  ))}
               </div>

               <div className="p-8 border-t border-white/5 bg-[#0a0a0c]/50">
                  <div className="max-w-4xl mx-auto relative">
                     <input 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-8 pr-20 text-sm focus:outline-none focus:border-amaura-blue/50 transition-all font-medium"
                        placeholder={`Message ${selectedLead.name}...`}
                     />
                     <button className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-amaura-blue flex items-center justify-center hover:scale-105 transition-all">
                        <Send className="w-5 h-5" />
                     </button>
                  </div>
               </div>
             </>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                <Mail className="w-16 h-16 mb-4" />
                <h3 className="text-xl font-display font-bold">Select a lead to start chatting</h3>
                <p className="text-sm font-medium mt-2">End-to-End Encrypted Session</p>
             </div>
           )}
        </div>
      </main>
    </div>
  );
};
