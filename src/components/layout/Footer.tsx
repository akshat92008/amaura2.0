import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-amaura-border bg-amaura-bg pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded bg-amaura-blue flex items-center justify-center glow-blue">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">Amaura Studio</span>
            </Link>
            <p className="text-amaura-text-muted max-w-sm mb-6">
              Decentralized revenue infrastructure for elite home service brands. We engineer systems that convert traffic into high-ticket contracts.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amaura-surface border border-amaura-border flex items-center justify-center hover:bg-amaura-blue/10 hover:border-amaura-blue/30 transition-colors cursor-pointer">
                <span className="text-amaura-text-muted hover:text-amaura-blue font-bold">𝕏</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-amaura-surface border border-amaura-border flex items-center justify-center hover:bg-amaura-blue/10 hover:border-amaura-blue/30 transition-colors cursor-pointer">
                <span className="text-amaura-text-muted hover:text-amaura-blue font-bold">in</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-white mb-4">Infrastructure</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-sm text-amaura-text-muted hover:text-amaura-blue transition-colors">Acquisition Engine</Link></li>
              <li><Link to="#" className="text-sm text-amaura-text-muted hover:text-amaura-blue transition-colors">Client Portal</Link></li>
              <li><Link to="#" className="text-sm text-amaura-text-muted hover:text-amaura-blue transition-colors">Web3 Billing</Link></li>
              <li><Link to="#" className="text-sm text-amaura-text-muted hover:text-amaura-blue transition-colors">Automated CRM</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-sm text-amaura-text-muted hover:text-amaura-blue transition-colors">About Us</Link></li>
              <li><Link to="#" className="text-sm text-amaura-text-muted hover:text-amaura-blue transition-colors">Case Studies</Link></li>
              <li><Link to="#" className="text-sm text-amaura-text-muted hover:text-amaura-blue transition-colors">Careers</Link></li>
              <li><Link to="#" className="text-sm text-amaura-text-muted hover:text-amaura-blue transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-amaura-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-amaura-text-muted">
            © {new Date().getFullYear()} Amaura Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-sm text-amaura-text-muted hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-sm text-amaura-text-muted hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
