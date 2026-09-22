import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Megaphone, Plus, Clock, Sparkles } from 'lucide-react';
import { mockRecentCampaigns } from '../../lib/mockData';

export const CampaignsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            WhatsApp Campaigns
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Broadcast promotional offers, styling tips, and re-engagement messages directly to WhatsApp.
          </p>
        </div>

        <Button variant="primary" size="md" leftIcon={<Plus className="h-4 w-4" />}>
          New Campaign
        </Button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockRecentCampaigns.map((camp) => (
          <Card key={camp.id} hoverEffect className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-salon-50 text-salon-600 flex items-center justify-center">
                  <Megaphone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {camp.name}
                  </h3>
                  <span className="text-xs text-slate-400">{camp.type}</span>
                </div>
              </div>

              <span
                className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                  camp.status === 'Sent'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                }`}
              >
                {camp.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Audience</span>
                <span className="font-bold text-slate-800">{camp.audience}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Delivered</span>
                <span className="font-bold text-slate-800">
                  {camp.status === 'Sent' ? `${camp.deliveredCount}` : '—'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Read Rate</span>
                <span className="font-bold text-emerald-600">
                  {camp.status === 'Sent' ? `${camp.readRatePercent}%` : '—'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {camp.sentAt}
              </span>
              <button className="font-semibold text-salon-600 hover:text-salon-700">
                View Details →
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Phase 2 Architecture Notice */}
      <Card className="bg-gradient-to-r from-salon-50/50 to-white border-dashed border-salon-200">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-salon-100 text-salon-600">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">
              Official WhatsApp Cloud API Integration (Phase 2)
            </h4>
            <p className="text-xs text-slate-600">
              In Phase 2, this section connects to the WhatsApp Business Platform / Cloud API to broadcast approved template messages, track webhooks for delivery ticks, and monitor read receipts in real-time.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
