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
      label: 'Pipeline Value',
      value: formatCurrency(stats.pipelineValue),
      icon: DollarSign,
      color: 'var(--color-primary)',
      description: 'Total value of all leads'
    },
    {
      label: 'Projected Revenue',
      value: formatCurrency(stats.projectedRevenue),
      icon: TrendingUp,
      color: 'var(--color-amaura-emerald)',
      description: 'Value of closed won leads'
    },
    {
      label: 'Active Leads',
      value: stats.activeLeads.toString(),
      icon: Users,
      color: 'var(--color-amaura-blue)',
      description: 'Leads currently in pipeline'
    },
    {
      label: 'Conversion Rate',
      value: leads.length > 0 
        ? `${((leads.filter(l => l.status === 'won').length / leads.length) * 100).toFixed(1)}%`
        : '0%',
      icon: Activity,
      color: '#f59e0b',
      description: 'Win rate performance'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-panel p-6 border-white/5 bg-[#121214]/40 hover:bg-[#121214]/60 transition-all group"
        >
          <div className="flex justify-between items-start mb-4">
            <div 
              className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform"
              style={{ color: card.color }}
            >
              <card.icon className="w-6 h-6" />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-amaura-text-muted">
              Live updates
            </div>
          </div>
          <div>
            <h3 className="text-amaura-text-muted text-sm font-medium mb-1">{card.label}</h3>
            <div className="text-3xl font-display font-bold text-white tracking-tight">
              {card.value}
            </div>
            <p className="text-[10px] text-amaura-text-muted mt-2 italic">
              {card.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
