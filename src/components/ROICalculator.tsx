import { useState } from 'react';
import { DollarSign, TrendingUp, Users } from 'lucide-react';

export const ROICalculator = () => {
  const [leads, setLeads] = useState(100);
  const [conversionRate, setConversionRate] = useState(5);
  const [avgTicket, setAvgTicket] = useState(5000);

  const estimatedSales = (leads * (conversionRate / 100)).toFixed(0);
  const estimatedRevenue = (Number(estimatedSales) * avgTicket).toLocaleString();

  return (
    <div className="space-y-6 h-full flex flex-col justify-between p-2">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-medium text-[var(--color-amaura-text-muted)]">
            <span className="flex items-center gap-2"><Users className="w-3 h-3" /> Monthly Leads</span>
            <span className="text-white">{leads}</span>
          </div>
          <input 
            type="range" min="10" max="1000" step="10" value={leads}
            onChange={(e) => setLeads(Number(e.target.value))}
            className="w-full accent-[var(--color-primary)] opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-xs font-medium text-[var(--color-amaura-text-muted)]">
            <span className="flex items-center gap-2"><TrendingUp className="w-3 h-3" /> Conv. Rate (%)</span>
            <span className="text-white">{conversionRate}%</span>
          </div>
          <input 
            type="range" min="1" max="50" step="1" value={conversionRate}
            onChange={(e) => setConversionRate(Number(e.target.value))}
            className="w-full accent-[var(--color-primary)] opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-xs font-medium text-[var(--color-amaura-text-muted)]">
            <span className="flex items-center gap-2"><DollarSign className="w-3 h-3" /> Avg. Ticket ($)</span>
            <span className="text-white">${avgTicket}</span>
          </div>
          <input 
            type="range" min="100" max="50000" step="100" value={avgTicket}
            onChange={(e) => setAvgTicket(Number(e.target.value))}
            className="w-full accent-[var(--color-primary)] opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[var(--color-amaura-border)]">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[var(--color-amaura-text-muted)] text-[10px] uppercase tracking-tighter">Est. Revenue</p>
            <h4 className="text-3xl font-bold font-display" style={{ color: 'var(--color-primary)' }}>
              ${estimatedRevenue}
            </h4>
          </div>
          <div className="text-right">
            <p className="text-[var(--color-amaura-text-muted)] text-[10px] uppercase tracking-tighter">Est. Sales</p>
            <p className="text-lg font-semibold text-white">{estimatedSales}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
