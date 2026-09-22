import React from 'react';
import { Search, Bell, Menu, Sparkles } from 'lucide-react';
import { mockSalonOwner } from '../lib/mockData';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
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
          <span>{mockSalonOwner.salonName}</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            className="relative p-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-salon-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-salon-500"></span>
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />

        {/* Salon Owner Avatar & Info */}
        <div className="flex items-center gap-3 pl-1">
          <div className="relative">
            <img
              src={mockSalonOwner.avatarUrl}
              alt={mockSalonOwner.name}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-salon-200 shadow-sm"
            />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-sm font-bold text-slate-900 leading-tight">
              {mockSalonOwner.name}
            </p>
            <p className="text-xs text-slate-500 font-medium leading-normal">
              Owner & Lead Stylist
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
