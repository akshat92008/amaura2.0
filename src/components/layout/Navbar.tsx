import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useStore } from '../../store';
import { Zap, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Navbar() {
  const { role, logout } = useStore();

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-[100] px-6 py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3 bg-[#0a0a0c]/40 backdrop-blur-2xl border border-white/5 rounded-full shadow-2xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-amaura-blue flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-amaura-blue/20">
            <Zap className="w-5 h-5 text-white fill-current" />
          </div>
          <span className="font-display font-black text-xl tracking-tighter text-white">Amaura</span>
        </Link>

        {/* Navigation - Clean, High End */}
        <div className="hidden lg:flex items-center gap-10">
          {['Home', 'Services', 'Our Work', 'Calculator'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-amaura-text-muted hover:text-white transition-all hover:translate-y-[-1px]"
            >
              {item}
            </a>
          ))}
        </div>

        {/* System Actions */}
        <div className="flex items-center gap-6">
          {role ? (
            <div className="flex items-center gap-4">
              <Link to={role === 'admin' ? '/admin' : '/dashboard'}>
                 <span className="text-[10px] font-black uppercase tracking-widest text-amaura-blue hover:text-white transition-colors cursor-pointer">
                    Portal Access
                 </span>
              </Link>
              <div className="w-[1px] h-4 bg-white/10" />
              <button 
                onClick={logout}
                className="text-[10px] font-black uppercase tracking-widest text-amaura-text-muted hover:text-red-400 transition-colors"
              >
                 Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <Link to="/login" className="text-[11px] font-black uppercase tracking-[0.2em] text-amaura-text-muted hover:text-white transition-colors">
                 Sign In
              </Link>
              <Link to="/#quote">
                 <button className="bg-white text-black px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                 </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
