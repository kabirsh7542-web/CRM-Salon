import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Sparkles, MessageCircle, Shield, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/useAuth';

export const SettingsPage: React.FC = () => {
  const { user, profile } = useAuth();

  const ownerName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    'Salon Director';

  const ownerEmail = user?.email || '';
  const salonName = import.meta.env.VITE_APP_NAME || 'StyleSalon Studio';

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
          Salon Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure salon identity, WhatsApp Business Platform keys, and notification triggers.
        </p>
      </div>

      {/* Salon Profile Section */}
      <Card className="space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="h-9 w-9 rounded-xl bg-salon-50 text-salon-600 flex items-center justify-center">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Salon Profile</h3>
            <p className="text-xs text-slate-500">Internal studio details and branding</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Salon Studio Name" defaultValue={salonName} />
          <Input label="Studio Tagline" defaultValue="Private Luxury Salon Studio" />
          <Input label="Owner / Lead Director" defaultValue={ownerName} />
          <Input label="Direct Email" defaultValue={ownerEmail} disabled />
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" size="sm">
            Save Changes
          </Button>
        </div>
      </Card>

      {/* WhatsApp Cloud API Integration Setting */}
      <Card className="space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">WhatsApp Cloud API (Meta)</h3>
            <p className="text-xs text-slate-500">Official business channel credentials (Phase 3)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Meta Phone Number ID"
            placeholder="e.g. 109823485729182"
            defaultValue="••••••••••••"
            disabled
          />
          <Input
            label="WhatsApp Business Account ID (WABA)"
            placeholder="e.g. 981273948572019"
            defaultValue="••••••••••••"
            disabled
          />
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-800 flex items-center gap-2">
          <Shield className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          <span>Configured via secure environment variables (.env) during Phase 3 deployment.</span>
        </div>
      </Card>

      {/* System Notifications */}
      <Card className="space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="h-9 w-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Notifications</h3>
            <p className="text-xs text-slate-500">Front desk alerts for client replies</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <label className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <p className="font-semibold text-slate-800 text-xs sm:text-sm">Instant reply alert</p>
              <p className="text-xs text-slate-400">Receive in-app toast when a VIP replies to a broadcast</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded text-salon-500 focus:ring-salon-400 accent-salon-500"
            />
          </label>
        </div>
      </Card>
    </div>
  );
};
