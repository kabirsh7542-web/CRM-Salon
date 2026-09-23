import React, { useEffect, useState } from 'react';
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
import { useAuth } from '../contexts/useAuth';
import { customerService } from '../services/customerService';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen = false,
  onCloseMobile,
}) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [customerCount, setCustomerCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    customerService
      .fetchCustomerMetrics()
      .then((m) => {
        if (isMounted) setCustomerCount(m.totalCustomers);
      })
      .catch(() => {
        if (isMounted) setCustomerCount(0);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      navigate('/login');
    }
  };

  const navItems = [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    {
      label: 'Customers',
      to: '/customers',
      icon: Users,
      badge: customerCount !== null && customerCount > 0 ? String(customerCount) : undefined,
    },
    { label: 'Campaigns', to: '/campaigns', icon: Megaphone },
    { label: 'Templates', to: '/templates', icon: FileText },
    { label: 'Inbox', to: '/inbox', icon: MessageSquare },
    { label: 'Reports', to: '/reports', icon: BarChart3 },
    { label: 'Settings', to: '/settings', icon: Settings },
  ];

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
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between bg-charcoal-900 border-r border-charcoal-800 transition-transform duration-300 lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col flex-1">
          {/* Top Brand Banner */}
          <div className="flex h-20 items-center justify-between px-6 border-b border-charcoal-800">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-salon-500 to-rose-400 text-white shadow-glow-pink">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <span className="font-serif tracking-widest text-lg font-bold text-white uppercase block leading-none">
                  LUMIÈRE
                </span>
                <span className="text-[10px] tracking-widest text-salon-400 font-semibold uppercase block mt-1">
                  Private Salon Studio
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-lg text-slate-400 hover:text-white lg:hidden"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto">
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Studio Management
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    cn(
                      'group flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-salon-500 text-white shadow-soft font-semibold'
                        : 'text-slate-300 hover:bg-charcoal-800/80 hover:text-white'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={cn(
                            'h-5 w-5 transition-colors',
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-salon-400'
                          )}
                        />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={cn(
                            'px-2 py-0.5 rounded-full text-xs font-semibold',
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-charcoal-800 text-slate-400 group-hover:text-slate-200'
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
              <span className="h-2 w-2 rounded-full bg-amber-400"></span>
              WhatsApp Cloud
            </span>
            <span className="text-[11px] font-mono text-slate-400">Pending Setup</span>
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
