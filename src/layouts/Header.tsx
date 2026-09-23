import React from 'react';
import { Search, Bell, Menu, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const { user, profile } = useAuth();

  const ownerName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Salon Director';

  const roleLabel = profile?.role === 'owner' ? 'Owner & Studio Director' : 'Salon Personnel';
  const salonName = import.meta.env.VITE_APP_NAME || 'StyleSalon CRM';
  const initial = ownerName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 sm:px-8 backdrop-blur-md transition-all">
      {/* Left: Mobile trigger & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search clients by name, phone (+1...) or tag..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 transition-all focus:border-salon-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-salon-100"
          />
        </div>
      </div>

      {/* Right: Notifications & Owner Profile */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Salon Status Badge */}
        <div className="hidden md:flex items-center gap-2 rounded-full bg-salon-50 px-3 py-1 text-xs font-semibold text-salon-700 border border-salon-100">
          <Sparkles className="h-3.5 w-3.5 text-salon-500" />
          <span>{salonName}</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            className="relative p-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />

        {/* Salon Owner Avatar & Info */}
        <div className="flex items-center gap-3 pl-1">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-salon-600 to-rose-400 text-white font-serif font-bold text-sm flex items-center justify-center ring-2 ring-salon-200 shadow-sm">
              {initial}
            </div>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-sm font-bold text-slate-900 leading-tight">
              {ownerName}
            </p>
            <p className="text-xs text-slate-500 font-medium leading-normal">
              {roleLabel}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
