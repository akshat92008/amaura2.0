export type BrandConfig = {
  primaryColor: string;
  logoUrl?: string;
  companyName: string;
};

export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  tenantID: string | null;
  role: 'admin' | 'tenant_admin';
  brandConfig?: BrandConfig;
};

export type Lead = {
  id: string;
  tenantID: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'proposal' | 'won' | 'lost';
  score?: 'Hot' | 'Warm' | 'Unscored';
  value?: number;
  createdAt: number;
  source: string;
};
