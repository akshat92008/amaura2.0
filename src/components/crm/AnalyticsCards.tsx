import { motion } from 'motion/react';
import { TrendingUp, DollarSign, Users, Activity } from 'lucide-react';
import { Lead } from '../../types';
import { calculateAnalytics, formatCurrency } from '../../lib/crmUtils';

interface AnalyticsCardsProps {
  leads: Lead[];
}

export const AnalyticsCards = ({ leads }: AnalyticsCardsProps) => {
  const stats = calculateAnalytics(leads);

  const cards = [
    {
      label: 'Total Pipeline Value',
      value: formatCurrency(stats.pipelineValue),
      icon: DollarSign,
      color: 'var(--color-primary)',
      change: '+12.5% vs last month'
    },
    {
      label: 'Active Leads',
      value: stats.activeLeads.toString(),
      icon: Users,
      color: '#10b981',
      change: '0 total in pipeline'
    },
    {
      label: 'Conversion Rate',
      value: leads.length > 0 
        ? `${((leads.filter(l => l.status === 'won').length / leads.length) * 100).toFixed(1)}%`
        : '0%',
      icon: Activity,
      color: '#8b5cf6',
      change: '+2.1% improvement'
    },
    {
      label: 'Phases Complete',
      value: '0/3',
      icon: TrendingUp,
      color: '#f59e0b',
      change: '0% delivered'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 relative overflow-hidden group"
        >
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amaura-text-muted">
              {card.label}
            </span>
            <div 
              className="p-1.5 rounded-lg bg-white/5 border border-white/10"
              style={{ color: card.color }}
            >
              <card.icon className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-4xl font-display font-bold text-white tracking-tight mb-2">
              {card.value}
            </div>
            <div className="text-[10px] font-bold text-amaura-text-muted/60 uppercase tracking-widest leading-none">
              {card.change}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
