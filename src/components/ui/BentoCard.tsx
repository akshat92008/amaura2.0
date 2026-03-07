import { motion, useMotionValue, useSpring } from 'motion/react';
import { ReactNode, useRef } from 'react';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  title: string;
  description: string;
}

export const BentoCard = ({ children, className = "", title, description }: BentoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden group premium-glass p-8 rounded-[32px] flex flex-col justify-between min-h-[350px] ${className}`}
    >
      {/* Dynamic Purple Hover Gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(500px circle at var(--x) var(--y), rgba(94, 23, 235, 0.15), transparent 60%)`,
          ['--x' as any]: `${springX.get()}px`,
          ['--y' as any]: `${springY.get()}px`,
        } as any}
      />

      <div className="relative z-10">
        <h3 className="text-2xl font-display font-black tracking-tight mb-2 text-white uppercase italic">{title}</h3>
        <p className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase leading-relaxed max-w-[200px]">{description}</p>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-end mt-8">
        {children}
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-amaura-purple/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-amaura-purple/10 transition-colors duration-700" />
    </motion.div>
  );
};
