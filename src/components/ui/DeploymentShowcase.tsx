import { motion } from 'motion/react';

const PROJECTS = [
  { name: "Solar Core", type: "Home Service SaaS" },
  { name: "Elite Roof", type: "Enterprise CRM" },
  { name: "HVAC Flow", type: "Ops Infrastructure" },
  { name: "Hydro Hub", type: "Deployment Node" }
];

export const DeploymentShowcase = () => {
  return (
    <section className="py-60 px-6">
      <div className="max-w-7xl mx-auto mb-32">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] font-black uppercase tracking-[1em] text-amaura-purple mb-8"
        >
          Product Showcase
        </motion.p>
        <h2 className="text-huge-architectural text-left leading-[0.8]">
          Engineered <br /> <span className="opacity-20 italic">for Leaders.</span>
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div 
          className="flex gap-12 px-6"
          drag="x"
          dragConstraints={{ right: 0, left: -1000 }}
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              className="min-w-[400px] h-[500px] premium-glass rounded-[40px] p-1 flex flex-col relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-amaura-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[40px]" />
              <div className="flex-1 rounded-[38px] bg-[#000000] m-2 overflow-hidden flex items-center justify-center relative">
                 {/* Visual Placeholder for Laptop/Phone Mockup */}
                 <div className="w-3/4 h-3/4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                    <div className="text-[10px] font-black text-white/20 tracking-widest uppercase">3D_MOCKUP_0{i+1}</div>
                 </div>
              </div>
              <div className="p-8 relative z-10">
                <h3 className="text-xl font-display font-black tracking-tighter uppercase mb-1">{project.name}</h3>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">{project.type}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
