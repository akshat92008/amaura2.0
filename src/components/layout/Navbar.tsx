import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useStore } from '../../store';
import { Zap, Shield } from 'lucide-react';

export function Navbar() {
  const { role, logout } = useStore();

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-amaura-blue flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-2xl tracking-tighter text-white">Amaura</span>
        </Link>

        {/* Centered Links */}
        <div className="hidden md:flex items-center bg-amaura-surface/60 backdrop-blur-xl border border-amaura-border rounded-full px-8 py-3 gap-8">
          {['Home', 'Services', 'Our Work', 'Calculator'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-[13px] font-bold text-amaura-text-muted hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {role ? (
            <div className="flex items-center gap-3">
              <Link to={role === 'admin' ? '/admin' : '/dashboard'}>
                <Button variant="outline" size="sm" className="rounded-xl border-amaura-border bg-amaura-surface/50 text-[12px] font-bold">Portal</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout} className="text-amaura-text-muted hover:text-white text-[12px] font-bold">Logout</Button>
            </div>
          ) : (
            <>
              <Link to="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="text-amaura-text-muted hover:text-white text-[13px] font-bold">Sign In</Button>
              </Link>
              <Link to="/#quote">
                <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white px-6 py-5 rounded-xl font-bold text-[13px] shadow-lg shadow-purple-500/20">
                  Get Started ↗
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
