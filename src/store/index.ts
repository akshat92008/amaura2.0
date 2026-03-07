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
  tenantID: string | null;
  agencyWalletBalance: number;
  login: (role: UserRole, tenantID?: string) => void;
  logout: () => void;
  updateWallet: (amount: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      role: null,
      tenantID: null,
      agencyWalletBalance: 12500, // Starting balance for the agency
      
      login: (role, tenantID) => set({ 
        role, 
        tenantID: tenantID || null 
      }),
      
      logout: () => set({ role: null, tenantID: null }),
      
      updateWallet: (amount) => set((state) => ({
        agencyWalletBalance: state.agencyWalletBalance + amount
      })),
    }),
    {
      name: 'amaura-storage',
    }
  )
);
