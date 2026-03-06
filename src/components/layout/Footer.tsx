import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 border-t border-amaura-border bg-amaura-bg">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-2 opacity-50">
          <div className="w-5 h-5 rounded-lg bg-amaura-blue flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-bold tracking-tight text-white uppercase">Amaura Agency</span>
        </div>
        <p className="text-amaura-text-muted text-sm italic">© 2026 Amaura Agency Hub. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="#" className="text-sm text-amaura-text-muted hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="#" className="text-sm text-amaura-text-muted hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
