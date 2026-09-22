import React from 'react';
import { Card } from '../common/Card';
import { mockRecentReplies } from '../../lib/mockData';
import { MessageSquare, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RecentRepliesList: React.FC = () => {
  return (
    <Card>
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Recent Client Replies
          </h3>
          <p className="text-xs text-slate-500">
            Direct customer WhatsApp inquiries & responses
          </p>
        </div>
        <Link
          to="/inbox"
          className="inline-flex items-center gap-1 text-xs font-semibold text-salon-600 hover:text-salon-700 transition-colors"
        >
          Open inbox
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-slate-100 mt-2">
        {mockRecentReplies.map((reply) => (
          <div
            key={reply.id}
            className="flex items-start gap-3.5 py-3.5 px-2 hover:bg-slate-50/70 rounded-xl transition-colors"
          >
            <div className="relative flex-shrink-0">
              <img
                src={reply.avatar}
                alt={reply.customerName}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100"
              />
              {reply.unread && (
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-salon-500 ring-2 ring-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-slate-900 truncate">
                  {reply.customerName}
                </span>
                <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
                  {reply.timestamp}
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 mt-0.5 leading-relaxed">
                "{reply.messagePreview}"
              </p>

              {reply.relatedCampaign && (
                <div className="flex items-center gap-1 mt-1.5 text-[11px] text-salon-600 font-medium">
                  <MessageSquare className="h-3 w-3" />
                  <span className="truncate">Re: {reply.relatedCampaign}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
