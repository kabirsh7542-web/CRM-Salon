import React from 'react';
import { Card } from '../common/Card';
import { Megaphone, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RecentCampaignsTable: React.FC = () => {
  return (
    <Card>
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Recent Campaigns
          </h3>
          <p className="text-xs text-slate-500">
            Performance of recent WhatsApp broadcasts
          </p>
        </div>
        <Link
          to="/campaigns"
          className="inline-flex items-center gap-1 text-xs font-semibold text-salon-600 hover:text-salon-700 transition-colors"
        >
          View all campaigns
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="py-10 text-center space-y-3">
        <div className="h-11 w-11 rounded-2xl bg-salon-50 text-salon-500 mx-auto flex items-center justify-center">
          <Megaphone className="h-5 w-5" />
        </div>
        <div className="max-w-md mx-auto space-y-1">
          <h4 className="text-sm font-bold text-slate-800">
            No WhatsApp Broadcast Campaigns Yet
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            WhatsApp promotional blasts, styling reminders, and delivery metrics will be recorded here once Phase 3 Cloud API integration is connected.
          </p>
        </div>
        <div className="pt-1">
          <Link
            to="/campaigns"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition-colors"
          >
            Go to Campaigns &rarr;
          </Link>
        </div>
      </div>
    </Card>
  );
};
