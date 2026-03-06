import React from 'react';
import { Sparkles, TrendingUp, BrainCircuit } from 'lucide-react';

interface LeadInsightProps {
  score: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  explanation: string;
}

export const LeadInsight = ({ score, sentiment, explanation }: LeadInsightProps) => {
  const getSentimentColor = () => {
    switch (sentiment) {
      case 'positive': return 'text-amaura-emerald bg-amaura-emerald/10 border-amaura-emerald/20';
      case 'negative': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    }
  };

  return (
    <div className="bento-inner p-5 space-y-4 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] transition-all group">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-[var(--color-primary)]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-amaura-text-muted">AI Analysis</span>
        </div>
        <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${getSentimentColor()}`}>
          {sentiment}
        </div>
      </div>

      <div className="flex items-end gap-3">
        <div className="text-4xl font-black font-display text-white">
          {score}<span className="text-sm text-amaura-text-muted">/100</span>
        </div>
        <div className="flex items-center text-amaura-emerald text-[10px] font-bold mb-1">
          <TrendingUp className="w-3 h-3 mr-0.5" />
          <span>High Intent</span>
        </div>
      </div>

      <p className="text-xs text-amaura-text-muted leading-relaxed italic">
        "{explanation}"
      </p>

      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[var(--color-primary)] to-amaura-blue transition-all duration-1000"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};
