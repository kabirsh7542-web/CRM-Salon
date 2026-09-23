import React from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Megaphone, Plus, Sparkles, MessageCircle } from 'lucide-react';

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

      {/* Empty State Card */}
      <Card className="py-12 text-center space-y-4">
        <div className="h-14 w-14 rounded-2xl bg-salon-50 text-salon-600 mx-auto flex items-center justify-center shadow-sm">
          <Megaphone className="h-7 w-7" />
        </div>
        <div className="max-w-md mx-auto space-y-1.5">
          <h3 className="text-lg font-bold text-slate-900">
            No Broadcast Campaigns Yet
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Create tailored WhatsApp broadcasts for your VIP, Regular, or New clients. When WhatsApp Business Platform credentials are configured, delivery rates and replies will stream here in real-time.
          </p>
        </div>
        <div className="pt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <MessageCircle className="h-3.5 w-3.5" />
            Phase 3: Meta Cloud API Integration Pending
          </span>
        </div>
      </Card>

      {/* Phase 3 Architecture Notice */}
      <Card className="bg-gradient-to-r from-salon-50/50 to-white border-dashed border-salon-200">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-salon-100 text-salon-600">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">
              Official WhatsApp Cloud API Integration (Phase 3)
            </h4>
            <p className="text-xs text-slate-600">
              In Phase 3, this section connects to the WhatsApp Business Platform / Cloud API to broadcast approved template messages, track webhooks for delivery ticks, and monitor read receipts in real-time.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
