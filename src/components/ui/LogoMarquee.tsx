import { motion } from 'motion/react';

const LOGOS = [
  "SOLAR OPS", "ELITE ROOFING", "SKYLINE HVAC", "HYDRO FLOW", "PRIME BUILD", 
  "ECO LINE", "CORE HOME", "ZENITH TECH"
];

export const LogoMarquee = () => {
  return (
    <div className="w-full py-20 overflow-hidden border-y border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 text-center">
          Trusted by Industry Leaders
        </p>
      </div>
      
      <div className="flex whitespace-nowrap overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
        <motion.div 
          className="flex gap-20 items-center animate-scroll"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <span 
              key={i} 
              className="text-2xl md:text-3xl font-display font-black text-white/20 hover:text-white/40 transition-colors uppercase italic tracking-tighter"
            >
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
