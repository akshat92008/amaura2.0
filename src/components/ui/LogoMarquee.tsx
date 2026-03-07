import { motion } from 'motion/react';

const LOGOS = [
  "SOLAR OPS", "ELITE ROOFING", "SKYLINE HVAC", "HYDRO FLOW", "PRIME BUILD", 
  "ECO LINE", "CORE HOME", "ZENITH TECH"
];

export const LogoMarquee = () => {
  return (
    <div className="w-full py-24 overflow-hidden border-y border-white/5 bg-black/40 marquee-mask">
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div 
          className="flex gap-32 items-center"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
            <span 
              key={i} 
              className="text-4xl md:text-5xl font-display font-black text-white/10 hover:text-white/40 transition-all duration-700 uppercase italic tracking-tighter mix-blend-screen"
            >
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
