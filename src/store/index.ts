import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'tenant_admin' | null;
export type Industry = 'Solar' | 'HVAC' | 'Plumbing';

export interface Milestone {
  id: string;
  title: string;
  amount: number;
  status: 'locked' | 'pending' | 'unlocked';
  txHash?: string;
  paidAt?: string;
}

export interface ClientData {
  id: string;
  name: string;
  email: string;
  industry: Industry;
  revenue: number;
  leads: number;
  conversionRate: number;
  milestones: Milestone[];
}

interface AppState {
  role: UserRole;
  currentUser: ClientData | null;
  clients: ClientData[];
  agencyWalletBalance: number;
  login: (role: UserRole, clientId?: string) => void;
  logout: () => void;
  addClient: (client: ClientData) => void;
  removeClient: (clientId: string) => void;
  payMilestone: (clientId: string, milestoneId: string, txHash: string) => void;
  forceUnlockMilestone: (clientId: string, milestoneId: string) => void;
}

const MOCK_CLIENTS: ClientData[] = [
  {
    id: 'c1',
    name: 'Apex Solar Solutions',
    email: 'ceo@apexsolar.com',
    industry: 'Solar',
    revenue: 125000,
    leads: 142,
    conversionRate: 12.5,
    milestones: [
      { id: 'm1', title: 'Deposit', amount: 500, status: 'unlocked', txHash: '0x1a2b3c...8f9a', paidAt: '2023-10-01T10:00:00Z' },
      { id: 'm2', title: 'Alpha Build', amount: 1500, status: 'pending' },
      { id: 'm3', title: 'Final Launch', amount: 1500, status: 'locked' },
    ],
  },
  {
    id: 'c2',
    name: 'ProFlow Plumbing',
    email: 'owner@proflow.com',
    industry: 'Plumbing',
    revenue: 85000,
    leads: 210,
    conversionRate: 18.2,
    milestones: [
      { id: 'm1', title: 'Deposit', amount: 500, status: 'unlocked', txHash: '0x9f8e7d...1b2c', paidAt: '2023-10-05T14:30:00Z' },
      { id: 'm2', title: 'Alpha Build', amount: 1500, status: 'unlocked', txHash: '0x5a6b7c...3d4e', paidAt: '2023-10-20T09:15:00Z' },
      { id: 'm3', title: 'Final Launch', amount: 1500, status: 'pending' },
    ],
  },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      role: null,
      currentUser: null,
      clients: MOCK_CLIENTS,
      agencyWalletBalance: 2000, // Initial balance from mock data
      
      login: (role, tenantID) => set((state) => {
        if (role === 'admin') return { role, currentUser: null };
        if (role === 'tenant_admin' && tenantID) {
          const client = state.clients.find(c => c.id === tenantID) || state.clients[0];
          return { role, currentUser: client };
        }
        return { role: null, currentUser: null };
      }),
      
      logout: () => set({ role: null, currentUser: null }),
      
      addClient: (client) => set((state) => ({
        clients: [...state.clients, client]
      })),
      
      removeClient: (clientId) => set((state) => ({
        clients: state.clients.filter(c => c.id !== clientId)
      })),
      
      payMilestone: (clientId, milestoneId, txHash) => set((state) => {
        const updatedClients = state.clients.map(client => {
          if (client.id !== clientId) return client;
          
          const updatedMilestones = client.milestones.map((m, index) => {
            if (m.id === milestoneId) {
              return { ...m, status: 'unlocked' as const, txHash, paidAt: new Date().toISOString() };
            }
            // If the current milestone is unlocked, unlock the next one if it's locked
            if (client.milestones[index - 1]?.id === milestoneId && m.status === 'locked') {
               return { ...m, status: 'pending' as const };
            }
            return m;
          });
          
          return { ...client, milestones: updatedMilestones };
        });
        
        const paidAmount = state.clients.find(c => c.id === clientId)?.milestones.find(m => m.id === milestoneId)?.amount || 0;
        
        // Update current user if it's the one paying
        const updatedCurrentUser = state.currentUser?.id === clientId 
          ? updatedClients.find(c => c.id === clientId) 
          : state.currentUser;
          
        return { 
          clients: updatedClients, 
          currentUser: updatedCurrentUser,
          agencyWalletBalance: state.agencyWalletBalance + paidAmount
        };
      }),
      
      forceUnlockMilestone: (clientId, milestoneId) => set((state) => {
        const updatedClients = state.clients.map(client => {
          if (client.id !== clientId) return client;
          
          const updatedMilestones = client.milestones.map((m, index) => {
            if (m.id === milestoneId) {
              return { ...m, status: 'unlocked' as const, txHash: 'ADMIN_OVERRIDE', paidAt: new Date().toISOString() };
            }
            if (client.milestones[index - 1]?.id === milestoneId && m.status === 'locked') {
               return { ...m, status: 'pending' as const };
            }
            return m;
          });
          
          return { ...client, milestones: updatedMilestones };
        });
        
        return { clients: updatedClients };
      }),
    }),
    {
      name: 'amaura-storage',
    }
  )
);
