import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  title: string;
  description: string;
  icon?: ReactNode;
}

export const BentoCard = ({ children, className = "", title, description, icon }: BentoCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`p-8 rounded-[32px] glass-card group relative overflow-hidden flex flex-col justify-between min-h-[300px] ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amaura-blue/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {icon && (
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-amaura-blue group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
        )}
        <h3 className="text-2xl font-display font-bold mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-amaura-text-muted leading-relaxed max-w-[200px]">{description}</p>
      </div>

      <div className="relative z-10 mt-8">
        {children}
      </div>

      {/* Decorative Glow */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-amaura-blue/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
};
