import { useState } from 'react';
import { motion } from 'motion/react';
import { Sidebar } from '../components/Sidebar';
import { useStore } from '../store';
import { 
  Plus, 
  Settings, 
  Shield, 
  Globe, 
  Database, 
  Zap, 
  Bot, 
  Box,
  ChevronRight,
  Server,
  Cloud,
  Lock,
  Search,
  CheckCircle2
} from 'lucide-react';

export const AdminDashboard = () => {
  const { clients, addClient } = useStore();
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', email: '', industry: 'Solar' as const });
  const [search, setSearch] = useState('');

  const handleProvision = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `c${clients.length + 1}`;
    addClient({
      id,
      ...newClient,
      revenue: 0,
      leads: 0,
      conversionRate: 0,
      milestones: [
        { id: 'm1', title: 'Infrastructure Setup', amount: 500, status: 'pending' },
        { id: 'm2', title: 'Revenue Node Alpha', amount: 1500, status: 'locked' },
        { id: 'm3', title: 'Global Deployment', amount: 1500, status: 'locked' },
      ],
    });
    setIsProvisioning(false);
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white">
      <Sidebar />
      <main className="flex-grow ml-64 p-8 lg:p-12 overflow-y-auto">
        {/* Header Section */}
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 rounded-xl bg-amaura-blue/10 border border-amaura-blue/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amaura-blue" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amaura-blue">Master Administrative Node</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight">Infrastructure Command</h1>
            <p className="text-amaura-text-muted mt-2 font-medium">Provisioning and monitoring $42M+ in total locked revenue assets.</p>
          </div>
          
          <button 
            onClick={() => setIsProvisioning(true)}
            className="px-8 py-4 bg-amaura-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-amaura-blue/20 flex items-center gap-3"
          >
            <Plus className="w-4 h-4" /> Provision New Node
          </button>
        </header>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
           {[
             { label: 'Active Nodes', val: clients.length, icon: Box },
             { label: 'Network GMV', val: '$1.4M', icon: Zap },
             { label: 'Storage Cluster', val: '4.2 TB', icon: Cloud },
             { label: 'System Uptime', val: '100%', icon: Globe },
           ].map((stat, i) => (
             <div key={i} className="bg-[#0a0a0c] border border-white/5 rounded-[32px] p-8 group hover:border-amaura-blue/20 transition-all">
                <stat.icon className="w-5 h-5 text-amaura-blue mb-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-3xl font-display font-bold mb-1 tracking-tighter">{stat.val}</h3>
                <p className="text-[10px] font-bold text-amaura-text-muted uppercase tracking-widest">{stat.label}</p>
             </div>
           ))}
        </div>

        {/* Client Management Area */}
        <div className="bg-[#0a0a0c] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
          <div className="p-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
             <h3 className="text-xl font-display font-bold">Client Node Registry</h3>
             <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amaura-text-muted" />
                <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs focus:border-amaura-blue/50 transition-all font-medium" 
                  placeholder="Filter nodes by ID, client, or industry..."
                />
             </div>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Node Identity</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Vertical</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Revenue GMV</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Integrations</th>
                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map((client) => (
                <tr key={client.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-amaura-blue/10 transition-colors">
                          <Server className="w-5 h-5 text-amaura-blue opacity-40 group-hover:opacity-100 transition-opacity" />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-white mb-1">{client.name}</p>
                          <p className="text-[10px] font-bold text-amaura-text-muted uppercase tracking-widest">ID: {client.id.toUpperCase()}</p>
                       </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-amaura-text-muted italic">
                      {client.industry} Node
                    </span>
                  </td>
                  <td className="p-8">
                    <p className="text-sm font-black">${client.revenue.toLocaleString()}</p>
                    <p className="text-[10px] font-bold text-amaura-emerald uppercase tracking-widest mt-1">Live Feed</p>
                  </td>
                  <td className="p-8">
                    <div className="flex -space-x-2">
                       {[Bot, Globe, Database].map((Icon, i) => (
                         <div key={i} className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shadow-lg">
                            <Icon className="w-3.5 h-3.5 text-amaura-blue" />
                         </div>
                       ))}
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-amaura-emerald animate-pulse" />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amaura-emerald">Synchronized</span>
                       <ChevronRight className="w-4 h-4 text-amaura-text-muted ml-auto group-hover:translate-x-1 transition-transform" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Provisioning Modal Override (Simulated) */}
        {isProvisioning && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-3xl bg-black/60">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               className="bg-[#0a0a0c] border border-white/10 rounded-[40px] p-12 max-w-xl w-full shadow-2xl relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-amaura-blue/10 blur-[100px] rounded-full" />
               <div className="relative z-10">
                  <h2 className="text-3xl font-display font-bold mb-2">Initialize Node</h2>
                  <p className="text-amaura-text-muted mb-10 font-medium">Deploying v4 infrastructure to a new revenue node.</p>
                  
                  <form onSubmit={handleProvision} className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Client Entity Name</label>
                        <input 
                           required
                           value={newClient.name}
                           onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                           className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm focus:border-amaura-blue/50 outline-none transition-all font-medium"
                           placeholder="e.g. Solar Pro Dynamics"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Master Email Alias</label>
                        <input 
                           type="email"
                           required
                           value={newClient.email}
                           onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                           className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm focus:border-amaura-blue/50 outline-none transition-all font-medium"
                           placeholder="ceo@solarpro.com"
                        />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Vertical Node</label>
                           <select 
                              value={newClient.industry}
                              onChange={(e) => setNewClient({ ...newClient, industry: e.target.value as any })}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm focus:border-amaura-blue/50 outline-none transition-all font-medium appearance-none"
                           >
                              <option value="Solar">Solar V4</option>
                              <option value="HVAC">HVAC V4</option>
                              <option value="Plumbing">Plumbing V4</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Network Node</label>
                           <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-xs font-black uppercase tracking-widest text-amaura-blue/50 flex items-center justify-between">
                              AWS-WEST-1 <Lock className="w-3 h-3" />
                           </div>
                        </div>
                     </div>
                     
                     <div className="mt-12 flex gap-4">
                        <button 
                           type="button"
                           onClick={() => setIsProvisioning(false)}
                           className="flex-grow bg-white/5 border border-white/10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                        >
                           Cancel
                        </button>
                        <button 
                           type="submit"
                           className="flex-grow bg-amaura-blue text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-amaura-blue/20"
                        >
                           Execute Provisioning
                        </button>
                     </div>
                  </form>
               </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};
