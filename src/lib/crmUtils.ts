import { Lead } from '../types';

export const calculateAnalytics = (leads: Lead[]) => {
  const pipelineValue = leads.reduce((acc, lead) => acc + (lead.value || 0), 0);
  const projectedRevenue = leads
    .filter(l => l.status === 'won')
    .reduce((acc, lead) => acc + (lead.value || 0), 0);
    
  return {
    pipelineValue,
    projectedRevenue,
    leadCount: leads.length,
    activeLeads: leads.filter(l => l.status !== 'won' && l.status !== 'lost').length
  };
};

export const scoreLead = (lead: Lead): 'Hot' | 'Warm' | 'Unscored' => {
  // Simulating Windore AI scoring logic
  // Hot: Has phone AND email AND value > 1000
  // Warm: Has phone OR email
  // Unscored: Otherwise
  
  if (lead.phone && lead.email && (lead.value || 0) > 1000) {
    return 'Hot';
  }
  
  if (lead.phone || lead.email) {
    return 'Warm';
  }
  
  return 'Unscored';
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};
