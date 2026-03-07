import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from '../components/Sidebar';
import { useClients } from '../hooks/useClients';
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
  CheckCircle2,
  Cpu,
  Activity,
  X,
  Trash2,
  Copy,
  Check,
  Key
} from 'lucide-react';

export const AdminDashboard = () => {
  const { clients, addClient, removeClient, loading } = useClients();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', email: '', industry: 'Solar' as const });
  const [search, setSearch] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const handleProvision = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `c${Date.now()}`; // Unique Timestamp ID
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
    setNewClient({ name: '', email: '', industry: 'Solar' });
  };

  const handleCopyScript = (clientId: string) => {
    const script = `/* Amaura Sync Engine */
async function syncLead(formData) {
  const HUB_API = "https://amaurastudio.netlify.app/.netlify/functions/inbound-lead";
  const TENANT_ID = "${clientId}"; 
  await fetch(HUB_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tenantID: TENANT_ID, ...formData, status: "new" })
  });
}`;
    navigator.clipboard.writeText(script);
    setCopiedId(clientId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white selection:bg-amaura-blue">
      <Sidebar />
      <main className="flex-grow ml-64 p-8 lg:p-12 relative overflow-y-auto">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-amaura-blue/5 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-12 relative z-10"
        >
          {/* Admin Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-xl bg-amaura-blue/10 border border-amaura-blue/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-amaura-blue" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amaura-blue">System Control Layer</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight">Infrastructure Command</h1>
              <p className="text-amaura-text-muted mt-2 font-medium">Provisioning and monitoring $42M+ in total locked assets.</p>
            </motion.div>
            
            <motion.button 
              variants={itemVariants}
              onClick={() => setIsProvisioning(true)}
              className="px-8 py-4 bg-amaura-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-amaura-blue/20 flex items-center gap-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Plus className="w-4 h-4" /> Provision New Node
            </motion.button>
          </header>

          {/* Global Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             {[
               { label: 'Active Nodes', val: clients.length, icon: Box, color: 'text-amaura-blue' },
               { label: 'Network GMV', val: '$1.4M', icon: Zap, color: 'text-purple-400' },
               { label: 'Storage Cluster', val: '4.2 TB', icon: Cloud, color: 'text-orange-400' },
               { label: 'System Uptime', val: '100%', icon: Globe, color: 'text-amaura-emerald' },
             ].map((stat, i) => (
               <motion.div 
                 key={i} 
                 variants={itemVariants}
                 className="bg-[#0a0a0c] border border-white/5 rounded-[32px] p-8 group hover:border-white/10 transition-all shadow-2xl"
               >
                  <stat.icon className={`w-5 h-5 ${stat.color} mb-6 opacity-40 group-hover:opacity-100 transition-opacity`} />
                  <h3 className="text-3xl font-display font-bold mb-1 tracking-tighter">{stat.val}</h3>
                  <p className="text-[10px] font-bold text-amaura-text-muted uppercase tracking-widest">{stat.label}</p>
               </motion.div>
             ))}
          </div>

          {/* Client Registry Table - Professional Bento Style */}
          <motion.div variants={itemVariants} className="bg-[#0a0a0c] border border-white/5 rounded-[40px] shadow-2xl overflow-hidden group hover:border-white/10 transition-all duration-500">
            <div className="p-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
               <h3 className="text-xl font-display font-bold flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-amaura-blue" />
                  Client Node Registry
               </h3>
               <div className="relative w-full md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amaura-text-muted" />
                  <input 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs focus:border-amaura-blue/50 transition-all font-medium placeholder:text-white/10" 
                    placeholder="Filter nodes by ID or Entity..."
                  />
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="bg-white/[0.02]">
                     <th className="p-8 text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Node Identity</th>
                     <th className="p-8 text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Tenant ID</th>
                     <th className="p-8 text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Vertical</th>
                     <th className="p-8 text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Revenue GMV</th>
                     <th className="p-8 text-[10px] font-black uppercase tracking-widest text-amaura-text-muted">Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map((client) => (
                     <tr key={client.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all group cursor-pointer">
                       <td className="p-8">
                         <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-amaura-blue/10 transition-colors">
                               <Server className="w-5 h-5 text-amaura-blue opacity-40 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div>
                               <p className="text-sm font-bold text-white mb-1">{client.name}</p>
                               <p className="text-[9px] font-bold text-amaura-text-muted uppercase tracking-widest">{client.email}</p>
                            </div>
                         </div>
                       </td>
                       <td className="p-8">
                         <code className="px-3 py-1.4 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono text-amaura-blue">
                           {client.id}
                         </code>
                       </td>
                       <td className="p-8 text-xs font-bold text-amaura-text-muted uppercase tracking-widest italic">{client.industry}</td>
                       <td className="p-8">
                         <p className="text-sm font-black text-white">${client.revenue.toLocaleString()}</p>
                       </td>
                       <td className="p-8">
                         <div className="flex items-center gap-3">
                            <a 
                              href={`/dashboard?tenantID=${client.id}`}
                              className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amaura-blue hover:text-white transition-all"
                            >
                              View Dashboard
                            </a>
                            <button 
                              onClick={() => handleCopyScript(client.id)}
                              className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 group/copy"
                              title="Copy Sync Script"
                            >
                              {copiedId === client.id ? <Check className="w-3.5 h-3.5 text-amaura-emerald" /> : <Copy className="w-3.5 h-3.5 text-amaura-text-muted group-hover/copy:text-white" />}
                            </button>
                            <button 
                              onClick={() => {
                                if(confirm('Are you sure you want to decommission this node?')) {
                                  removeClient(client.id);
                                }
                              }}
                              className="p-2 bg-red-500/5 border border-red-500/10 rounded-xl hover:bg-red-500/20 transition-all group/trash"
                              title="Delete Node"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-500/40 group-hover/trash:text-red-500" />
                            </button>
                            <ChevronRight className="w-4 h-4 text-amaura-text-muted ml-auto group-hover:translate-x-1 transition-transform" />
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          </motion.div>
        </motion.div>

        {/* Provisioning Modal Override */}
        <AnimatePresence>
          {isProvisioning && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 backdrop-blur-3xl bg-black/60">
              <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="bg-[#0a0a0c] border border-white/10 rounded-[50px] p-12 max-w-xl w-full shadow-2xl relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 w-64 h-64 bg-amaura-blue/10 blur-[100px] rounded-full" />
                 <button onClick={() => setIsProvisioning(false)} className="absolute top-10 right-10 p-2 hover:bg-white/5 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                 </button>
                 
                 <div className="relative z-10">
                    <h2 className="text-3xl font-display font-bold mb-3">Initialize Node</h2>
                    <p className="text-amaura-text-muted mb-10 font-medium">Deploying v4 infrastructure to a new revenue stream.</p>
                    
                    <form onSubmit={handleProvision} className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted ml-2">Client Entity Name</label>
                          <input 
                             required
                             value={newClient.name}
                             onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                             className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm focus:border-amaura-blue/50 outline-none transition-all font-medium placeholder:text-white/10"
                             placeholder="e.g. Solar Dynamics Corp"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted ml-2">Master Email Alias</label>
                          <input 
                             required
                             type="email"
                             value={newClient.email}
                             onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                             className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm focus:border-amaura-blue/50 outline-none transition-all font-medium placeholder:text-white/10"
                             placeholder="ceo@solardynamics.com"
                          />
                       </div>
                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted ml-2">Vertical Node</label>
                             <select 
                                value={newClient.industry}
                                onChange={(e) => setNewClient({ ...newClient, industry: e.target.value as any })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm focus:border-amaura-blue/50 outline-none transition-all font-medium appearance-none"
                             >
                                <option value="Solar">Solar V4</option>
                                <option value="HVAC">HVAC V4</option>
                                <option value="Roofing">Roofing V4</option>
                             </select>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted ml-2">Network Node</label>
                             <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-[10px] font-black uppercase tracking-widest text-amaura-blue/40 flex items-center justify-between italic">
                                AWS-US-EAST <Lock className="w-3 h-3" />
                             </div>
                          </div>
                       </div>
                       
                       <div className="mt-12 flex gap-4 pt-6">
                          <button 
                             type="button"
                             onClick={() => setIsProvisioning(false)}
                             className="flex-grow bg-white/5 border border-white/10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all text-white/40"
                          >
                             Abort
                          </button>
                          <button 
                             type="submit"
                             className="flex-grow bg-amaura-blue text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-amaura-blue/20"
                          >
                             Provision
                          </button>
                       </div>
                    </form>
                 </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
