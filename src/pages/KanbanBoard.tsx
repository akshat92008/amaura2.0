import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { KanbanBoard as KanbanComponent } from '../components/crm/KanbanBoard';
import { useLeads } from '../hooks/useLeads';
import { useAuth } from '../hooks/useAuth';
import { useClients } from '../hooks/useClients';
import { useStore } from '../store';
import { Columns, Shield, Globe } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const KanbanBoard = () => {
  const { user } = useAuth();
  const { clients, currentUser } = useStore();
  const { clients: dbClients } = useClients();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [tenantFilter, setTenantFilter] = useState(queryParams.get('tenantID') || '');
  
  const { leads, loading } = useLeads(tenantFilter);

  const isAdmin = user?.role === 'admin';
  const displayClient = isAdmin && tenantFilter 
    ? (dbClients.find(c => c.id === tenantFilter) || clients.find(c => c.id === tenantFilter))
    : currentUser;

  const clientName = displayClient?.name || '';

  return (
    <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white overflow-hidden">
      <Sidebar />
      
      <main className="flex-grow ml-64 p-8 lg:p-12 relative h-screen overflow-y-auto">
        <div 
          className="absolute -top-[10%] left-[20%] w-[60%] h-[50%] rounded-full blur-[150px] opacity-10 pointer-events-none"
          style={{ background: 'var(--color-primary)' }}
        />
        
        <div className="max-w-[1600px] mx-auto space-y-8 relative z-10 w-full h-full flex flex-col">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
            <div>
              <div className="flex items-center gap-2 text-[var(--color-primary)] mb-2">
                {isAdmin ? <Shield className="w-4 h-4" /> : <Columns className="w-4 h-4 fill-current" />}
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  {isAdmin ? 'Agency Global Pipeline' : 'Live Pipeline'}
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-3">
                {isAdmin && clientName ? `Pipeline: ${clientName}` : isAdmin ? 'Infrastructure Kanban' : 'Kanban Board'}
              </h1>
              <p className="text-amaura-text-muted">Drag cards to move leads through the sales pipeline hubs.</p>
            </div>
            
            {isAdmin && (
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amaura-blue/60 focus-within:text-amaura-blue transition-colors" />
                  <select 
                    value={tenantFilter}
                    onChange={(e) => setTenantFilter(e.target.value)}
                    className="appearance-none bg-[#0a0a0c]/80 border border-white/10 rounded-xl py-2.5 pl-11 pr-10 text-xs font-bold uppercase tracking-widest focus:border-amaura-blue/50 outline-none hover:bg-white/5 transition-all text-amaura-text-muted focus:text-white"
                  >
                    <option value="">Global Pipeline</option>
                    {[...clients, ...dbClients].map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="flex-grow overflow-hidden">
            <KanbanComponent leads={leads} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
};
