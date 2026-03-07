import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../contexts/ThemeContext';
import { 
  LayoutDashboard, 
  Users, 
  Columns,
  FolderKanban,
  Inbox, 
  Calculator, 
  Settings, 
  LogOut,
  Zap,
  Sparkles
} from 'lucide-react';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const { brandConfig } = useTheme();

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Inbox, label: 'Unified Inbox', path: '/inbox' },
    { icon: Columns, label: 'Calendar', path: '/calendar' },
    { icon: FolderKanban, label: 'Document Vault', path: '/documents' },
    { icon: Zap, label: 'Analytics', path: '/analytics' },
    { icon: Sparkles, label: 'AI Copilot', path: '/copilot' },
    { icon: Users, label: 'Lead Pipeline', path: '/kanban' },
    { icon: LayoutDashboard, label: 'Project Tracker', path: '/projects' },
    { icon: Calculator, label: 'Billing', path: '/billing' },
  ];

  return (
    <aside className="w-64 h-screen glass-panel fixed left-0 top-0 flex flex-col border-r border-[var(--color-amaura-border)] z-20">
      <div className="p-8 flex items-center space-x-3">
        {brandConfig.logoUrl ? (
          <img src={brandConfig.logoUrl} alt={brandConfig.companyName} className="h-8 w-auto" />
        ) : (
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <Zap className="w-6 h-6 fill-current" />
          </div>
        )}
        <span className="font-display font-bold text-xl tracking-tight text-[var(--color-amaura-text)]">
          {brandConfig.companyName}
        </span>
      </div>

      <nav className="flex-grow px-4 mt-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300
              ${isActive 
                ? 'text-white' 
                : 'text-[var(--color-amaura-text-muted)] hover:bg-[var(--color-amaura-surface-hover)] hover:text-[var(--color-amaura-text)]'}
            `}
            style={({ isActive }) => isActive ? { 
              backgroundColor: 'var(--color-primary)',
              boxShadow: '0 0 20px -5px var(--color-primary)' 
            } : {}}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto space-y-2">
        <NavLink
          to="/settings"
          className="flex items-center space-x-3 px-4 py-3 rounded-xl text-[var(--color-amaura-text-muted)] hover:bg-[var(--color-amaura-surface-hover)] hover:text-[var(--color-amaura-text)] transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </NavLink>
        
        <button
          onClick={() => logout()}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>

      <div className="p-6 border-t border-[var(--color-amaura-border)] bg-[var(--color-amaura-surface)]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
            {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </div>
          <div className="overflow-hidden text-xs">
            <p className="text-[var(--color-amaura-text)] font-semibold truncate">{user?.displayName || 'User'}</p>
            <p className="text-[var(--color-amaura-text-muted)] truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
