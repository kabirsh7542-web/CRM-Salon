import React from 'react';
import { Card } from '../common/Card';
import { mockRecentCampaigns } from '../../lib/mockData';
import { Megaphone, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
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

      <div className="overflow-x-auto mt-3">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3 px-2">Campaign Name</th>
              <th className="py-3 px-2">Audience</th>
              <th className="py-3 px-2">Timing</th>
              <th className="py-3 px-2 text-center">Delivered</th>
              <th className="py-3 px-2 text-center">Read Rate</th>
              <th className="py-3 px-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {mockRecentCampaigns.map((camp) => (
              <tr
                key={camp.id}
                className="hover:bg-slate-50/70 transition-colors group"
              >
                <td className="py-3.5 px-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-salon-50 text-salon-600">
                      <Megaphone className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block group-hover:text-salon-600 transition-colors">
                        {camp.name}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {camp.type}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-2 text-slate-600 text-xs">
                  {camp.audience}
                </td>

                <td className="py-3.5 px-2 text-slate-500 text-xs">
                  {camp.sentAt}
                </td>

                <td className="py-3.5 px-2 text-center font-medium text-slate-800 text-xs">
                  {camp.status === 'Scheduled' ? (
                    <span className="text-slate-400">—</span>
                  ) : (
                    `${camp.deliveredCount}/${camp.totalRecipients}`
                  )}
                </td>

                <td className="py-3.5 px-2 text-center text-xs">
                  {camp.status === 'Scheduled' ? (
                    <span className="text-slate-400">—</span>
                  ) : (
                    <span className="font-semibold text-emerald-600">
                      {camp.readRatePercent}%
                    </span>
                  )}
                </td>

                <td className="py-3.5 px-2 text-right">
                  {camp.status === 'Sent' ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="h-3 w-3" />
                      Sent
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 border border-indigo-200">
                      <Clock className="h-3 w-3" />
                      Scheduled
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
