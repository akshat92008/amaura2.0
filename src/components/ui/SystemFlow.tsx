import { motion } from 'motion/react';
import { Bot, Zap, TrendingUp, BarChart3 } from 'lucide-react';

export const SystemFlow = () => {
  const nodes = [
    { icon: <Zap className="w-6 h-6" />, label: "Traffic", x: 10, y: 50 },
    { icon: <Bot className="w-6 h-6" />, label: "AI Automation", x: 40, y: 50 },
    { icon: <TrendingUp className="w-6 h-6" />, label: "CRM Pipeline", x: 70, y: 50 },
    { icon: <BarChart3 className="w-6 h-6" />, label: "Revenue Tracking", x: 95, y: 50 }
  ];

  return (
    <div className="relative w-full h-[300px] flex items-center justify-between px-10">
      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.path
          d="M 10 150 L 950 150"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {nodes.map((node, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.2, duration: 0.5 }}
          className="relative z-10 flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center glass-card glow-border group">
            <div className="text-amaura-blue group-hover:text-white transition-colors">
              {node.icon}
            </div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{node.label}</span>
          
          {/* Animated Pulse */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-amaura-blue/5 rounded-full animate-ping pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
};
