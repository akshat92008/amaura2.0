import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Wallet, Users, Activity, ExternalLink, Unlock, Plus, Code, Copy, Check } from 'lucide-react';
import { useStore, ClientData } from '../store';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function AdminDashboard() {
  const { role, clients, agencyWalletBalance, forceUnlockMilestone, addClient } = useStore();
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [activeConnectionClient, setActiveConnectionClient] = useState<ClientData | null>(null);
  const [copied, setCopied] = useState(false);
  
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    industry: 'Solar' as const,
    revenue: 0,
    leads: 0,
    conversionRate: 0,
  });

  if (role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSnippet = (clientId: string) => `// Amaura Lead Hook for ${clientId}
const TENANT_ID = '${clientId}'; 
const API_URL = 'https://YOUR_PROJECT.netlify.app/.netlify/functions/inbound-lead';

async function syncLead(data) {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tenantID: TENANT_ID, ...data })
  });
}`;

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `c${Date.now()}`;
    addClient({
      id,
      ...newClient,
      milestones: [
        { id: `m1_${id}`, title: 'Deposit', amount: 500, status: 'pending' },
        { id: `m2_${id}`, title: 'Alpha Build', amount: 1500, status: 'locked' },
        { id: `m3_${id}`, title: 'Final Launch', amount: 1500, status: 'locked' },
      ]
    });
    setIsAddingClient(false);
    setNewClient({ name: '', email: '', industry: 'Solar', revenue: 0, leads: 0, conversionRate: 0 });
  };

  return (
    <div className="min-h-screen bg-amaura-bg pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Connection Modal */}
        {activeConnectionClient && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-amaura-surface border border-amaura-border p-8 rounded-3xl max-w-2xl w-full shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Connect {activeConnectionClient.name}</h3>
                  <p className="text-sm text-amaura-text-muted italic">Copy this snippet to their website's contact form success handler.</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setActiveConnectionClient(null)}>Close</Button>
              </div>

              <div className="relative group">
                <pre className="bg-black/50 p-6 rounded-xl border border-amaura-border overflow-x-auto font-mono text-sm text-amaura-blue leading-relaxed">
                  {getSnippet(activeConnectionClient.id)}
                </pre>
                <button 
                  onClick={() => copyToClipboard(getSnippet(activeConnectionClient.id))}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-amaura-surface border border-amaura-border hover:bg-amaura-surface-hover transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-amaura-emerald" /> : <Copy className="w-4 h-4 text-amaura-text-muted" />}
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-amaura-border flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs text-amaura-text-muted">
                  <div className="w-2 h-2 rounded-full bg-amaura-emerald" />
                  Hook ID: {activeConnectionClient.id}
                </div>
                <Button onClick={() => setActiveConnectionClient(null)}>Done</Button>
              </div>
            </motion.div>
          </div>
        )}

        <header className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded bg-amaura-blue/10 border border-amaura-blue/30 flex items-center justify-center">
                <Shield className="w-4 h-4 text-amaura-blue" />
              </div>
              <span className="text-sm font-medium text-amaura-blue uppercase tracking-wider">Admin Control Center</span>
            </div>
            <h1 className="text-4xl font-display font-bold text-white">Agency Overview</h1>
          </div>
          <Button onClick={() => setIsAddingClient(!isAddingClient)} className="gap-2">
            <Plus className="w-4 h-4" /> New Client
          </Button>
        </header>

        {isAddingClient && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-12 overflow-hidden"
          >
            <Card className="p-6 border-amaura-blue/30 bg-amaura-blue/5">
              <h3 className="text-xl font-display font-bold text-white mb-4">Provision New Client Infrastructure</h3>
              <form onSubmit={handleAddClient} className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-amaura-text-muted mb-1">Company Name</label>
                    <Input required value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} placeholder="Acme Corp" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amaura-text-muted mb-1">Contact Email</label>
                    <Input required type="email" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} placeholder="ceo@acme.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amaura-text-muted mb-1">Industry</label>
                    <select 
                      className="flex h-10 w-full rounded-lg border border-amaura-border bg-amaura-surface px-3 py-2 text-sm text-amaura-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amaura-blue"
                      value={newClient.industry}
                      onChange={e => setNewClient({...newClient, industry: e.target.value as any})}
                    >
                      <option value="Solar">Solar</option>
                      <option value="HVAC">HVAC</option>
                      <option value="Plumbing">Plumbing</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-amaura-text-muted mb-1">Current Revenue ($)</label>
                    <Input required type="number" value={newClient.revenue} onChange={e => setNewClient({...newClient, revenue: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amaura-text-muted mb-1">Current Leads</label>
                    <Input required type="number" value={newClient.leads} onChange={e => setNewClient({...newClient, leads: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amaura-text-muted mb-1">Conversion Rate (%)</label>
                    <Input required type="number" step="0.1" value={newClient.conversionRate} onChange={e => setNewClient({...newClient, conversionRate: Number(e.target.value)})} />
                  </div>
                </div>
                <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                  <Button type="button" variant="ghost" onClick={() => setIsAddingClient(false)}>Cancel</Button>
                  <Button type="submit">Provision Infrastructure</Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 border-amaura-emerald/30 bg-amaura-emerald/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Wallet className="w-24 h-24 text-amaura-emerald" />
            </div>
            <div className="relative z-10">
              <p className="text-sm font-medium text-amaura-text-muted mb-1">Agency Treasury (USDC)</p>
              <h3 className="text-4xl font-display font-bold text-white mb-2">${agencyWalletBalance.toLocaleString()}</h3>
              <div className="flex items-center gap-2 text-xs text-amaura-emerald font-mono bg-amaura-bg p-2 rounded border border-amaura-border inline-flex">
                <span className="w-2 h-2 rounded-full bg-amaura-emerald animate-pulse" />
                0x7a8b...9c0d
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-amaura-text-muted mb-1">Active Tenants</p>
                <h3 className="text-3xl font-display font-bold text-white">{clients.length}</h3>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amaura-surface border border-amaura-border flex items-center justify-center">
                <Users className="w-5 h-5 text-amaura-blue" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-amaura-text-muted mb-1">System Status</p>
                <h3 className="text-3xl font-display font-bold text-amaura-emerald">Operational</h3>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amaura-surface border border-amaura-border flex items-center justify-center">
                <Activity className="w-5 h-5 text-amaura-emerald" />
              </div>
            </div>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-6">Tenant Management</h2>
          
          <div className="space-y-6">
            {clients.map(client => (
              <Card key={client.id} className="overflow-hidden">
                <div className="p-6 border-b border-amaura-border bg-amaura-surface/50 flex justify-between items-center text-white">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-display font-bold">{client.name}</h3>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-amaura-blue/10 text-amaura-blue border border-amaura-blue/20">
                        {client.industry}
                      </span>
                    </div>
                    <p className="text-sm text-amaura-text-muted">{client.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2 text-[var(--color-primary)] border-[var(--color-primary)]/30" onClick={() => setActiveConnectionClient(client)}>
                      <Code className="w-4 h-4" /> Connect site
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      View Portal <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 bg-amaura-bg">
                  <h4 className="text-sm font-medium text-amaura-text-muted mb-4 uppercase tracking-wider">Infrastructure Milestones</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {client.milestones.map((m, i) => (
                      <div key={m.id} className={`p-4 rounded-xl border ${
                        m.status === 'unlocked' ? 'border-amaura-emerald/30 bg-amaura-emerald/5' :
                        m.status === 'pending' ? 'border-amaura-blue/30 bg-amaura-blue/5' :
                        'border-amaura-border bg-amaura-surface'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-medium text-white">Phase {i + 1}: {m.title}</p>
                          <span className={`text-xs font-bold ${
                            m.status === 'unlocked' ? 'text-amaura-emerald' :
                            m.status === 'pending' ? 'text-amaura-blue' :
                            'text-amaura-text-muted'
                          }`}>
                            ${m.amount}
                          </span>
                        </div>
                        
                        {m.status === 'unlocked' ? (
                          <div className="text-xs text-amaura-text-muted font-mono truncate">
                            Tx: {m.txHash}
                          </div>
                        ) : m.status === 'pending' ? (
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-xs text-amaura-blue font-medium animate-pulse">Awaiting Payment</span>
                            <Button size="sm" variant="outline" className="h-7 text-xs gap-1 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300" onClick={() => forceUnlockMilestone(client.id, m.id)}>
                              <Unlock className="w-3 h-3" /> Force Unlock
                            </Button>
                          </div>
                        ) : (
                          <div className="text-xs text-amaura-text-muted mt-4 flex items-center gap-1">
                            <Shield className="w-3 h-3" /> Locked
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
