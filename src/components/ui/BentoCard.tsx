import { motion, useMotionValue, useSpring } from 'motion/react';
import { ReactNode, useRef, useEffect } from 'react';

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

  // Smooth spring for the gradient movement
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
      className={`relative overflow-hidden group premium-glass p-10 rounded-[40px] flex flex-col justify-between min-h-[400px] ${className}`}
    >
      {/* Dynamic Hover Gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(600px circle at var(--x) var(--y), rgba(255, 255, 255, 0.08), transparent 40%)`,
          // Note: using dynamic vars for CSS
          ['--x' as any]: `${springX.get()}px`,
          ['--y' as any]: `${springY.get()}px`,
        } as any}
      />

      <div className="relative z-10">
        <h3 className="text-3xl font-display font-black tracking-tighter mb-4 text-white uppercase italic">{title}</h3>
        <p className="text-sm font-medium text-white/40 leading-relaxed uppercase tracking-wider max-w-[250px]">{description}</p>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-end mt-12">
        {children}
      </div>

      {/* Finishing Touch: Corner Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2" />
    </motion.div>
  );
};
