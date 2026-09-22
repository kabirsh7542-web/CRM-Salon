import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Megaphone,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
  X,
} from 'lucide-react';
import { cn } from '../utils/formatters';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Customers', to: '/customers', icon: Users, badge: '850' },
  { label: 'Campaigns', to: '/campaigns', icon: Megaphone },
  { label: 'Templates', to: '/templates', icon: FileText },
  { label: 'Inbox', to: '/inbox', icon: MessageSquare, badge: '2 unread' },
  { label: 'Reports', to: '/reports', icon: BarChart3 },
  { label: 'Settings', to: '/settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen = false,
  onCloseMobile,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Phase 1 navigation back to login
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col bg-charcoal-900 border-r border-charcoal-800 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        )}
      >
        {/* Salon Brand Header */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-charcoal-800/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-salon-400 to-salon-600 text-white shadow-glow-pink">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="font-serif tracking-widest text-lg font-bold text-white uppercase block leading-none">
                LUMIÈRE
              </span>
              <span className="text-[10px] tracking-wider text-slate-400 uppercase font-semibold mt-1 block">
                Salon CRM
              </span>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-charcoal-800 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    cn(
                      'group flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-150',
                      isActive
                        ? 'bg-salon-500 text-white shadow-soft font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-charcoal-800/80'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={cn(
                            'h-5 w-5 transition-colors',
                            isActive
                              ? 'text-white'
                              : 'text-slate-400 group-hover:text-salon-400'
                          )}
                        />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={cn(
                            'text-[11px] font-semibold px-2 py-0.5 rounded-full',
                            isActive
                              ? 'bg-white/20 text-white'
                              : item.badge.includes('unread')
                              ? 'bg-salon-500/20 text-salon-300 border border-salon-500/30'
                              : 'bg-charcoal-800 text-slate-400'
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Client App System Status */}
        <div className="px-5 py-3 border-t border-charcoal-800/60 bg-charcoal-950/40">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              WhatsApp Cloud
            </span>
            <span className="text-[11px] font-mono text-slate-400">Ready</span>
          </div>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-charcoal-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
