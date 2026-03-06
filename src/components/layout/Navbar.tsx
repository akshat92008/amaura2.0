import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useStore } from '../../store';
import { Shield, Zap } from 'lucide-react';

export function Navbar() {
  const { role, logout } = useStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-amaura-border bg-amaura-bg/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-amaura-blue flex items-center justify-center glow-blue">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white">Amaura Studio</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/#calculator" className="text-sm font-medium text-amaura-text-muted hover:text-white transition-colors">
            Calculator
          </Link>
          <Link to="/#proof" className="text-sm font-medium text-amaura-text-muted hover:text-white transition-colors">
            Case Studies
          </Link>
          
          <div className="w-px h-6 bg-amaura-border mx-2" />
          
          {role ? (
            <div className="flex items-center gap-4">
              <Link to={role === 'admin' ? '/admin' : '/dashboard'}>
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm" className="gap-2">
                <Shield className="w-4 h-4" />
                Client Portal
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
