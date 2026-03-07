import { Sidebar } from '../components/Sidebar';
import { Sparkles, Calendar as CalendarIcon, FileText, BarChart3, Bot, CreditCard } from 'lucide-react';

const PlaceholderPage = ({ title, icon: Icon, description }: { title: string, icon: any, description: string }) => (
  <div className="flex min-h-screen bg-[var(--color-amaura-bg)] text-white">
    <Sidebar />
    <main className="flex-grow ml-64 p-8 lg:p-12 relative overflow-y-auto">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ background: 'var(--color-primary)' }} />
      <div className="max-w-4xl mx-auto py-20 text-center space-y-6 relative z-10">
        <div className="w-20 h-20 rounded-3xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[var(--color-primary)]/10">
          <Icon className="w-10 h-10 text-[var(--color-primary)]" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight">{title}</h1>
        <p className="text-[var(--color-amaura-text-muted)] text-lg max-w-xl mx-auto leading-relaxed">{description}</p>
        <div className="pt-10">
          <div className="glass-panel border-white/5 rounded-[40px] p-12 inline-block">
             <div className="flex items-center gap-3 text-[var(--color-primary)] font-bold uppercase tracking-widest text-xs">
               <Sparkles className="w-4 h-4" />
               Coming Soon to Amaura Studio
             </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export const Calendar = () => <PlaceholderPage title="Unified Calendar" icon={CalendarIcon} description="Schedule surveys, installations, and follow-ups in one centralized hub." />;
export const Documents = () => <PlaceholderPage title="Document Vault" icon={FileText} description="Securely store and manage client contracts, permits, and site photos." />;
export const Analytics = () => <PlaceholderPage title="Revenue Analytics" icon={BarChart3} description="Deep-dive into your ROAS, conversion velocity, and LTV metrics." />;
export const Copilot = () => <PlaceholderPage title="AI Copilot" icon={Bot} description="Your intelligent assistant for automation, lead scoring, and strategic insights." />;
export const Billing = () => <PlaceholderPage title="Web3 Billing" icon={CreditCard} description="Seamless on-chain invoicing and payment processing for high-ticket contracts." />;
