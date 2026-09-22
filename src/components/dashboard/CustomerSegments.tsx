import React from 'react';
import { Card } from '../common/Card';
import { mockCustomerSegments } from '../../lib/mockData';
import { Users } from 'lucide-react';
import { Badge } from '../common/Badge';

export const CustomerSegments: React.FC = () => {
  const total = mockCustomerSegments.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <Card className="flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Customer Segments
            </h3>
            <p className="text-xs text-slate-500">
              Targeted segmentation for WhatsApp broadcasts
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
            <Users className="h-3.5 w-3.5 text-slate-500" />
            <span>{total} Total</span>
          </div>
        </div>

        {/* Multi-color stacked distribution bar */}
        <div className="my-5">
          <div className="flex h-3 w-full rounded-full overflow-hidden bg-slate-100 shadow-inner">
            {mockCustomerSegments.map((seg) => (
              <div
                key={seg.segment}
                style={{
                  width: `${(seg.count / total) * 100}%`,
                  backgroundColor: seg.color,
                }}
                className="transition-all duration-300 hover:opacity-90"
                title={`${seg.label}: ${seg.count} (${seg.percentage}%)`}
              />
            ))}
          </div>
        </div>

        {/* List of segments */}
        <div className="space-y-3">
          {mockCustomerSegments.map((seg) => (
            <div
              key={seg.segment}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {seg.label}
                    </span>
                    <Badge segment={seg.segment} size="sm" />
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                    {seg.description}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold text-slate-900">
                  {seg.count}
                </span>
                <span className="text-xs text-slate-400 block font-medium">
                  {seg.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Active reachable audience:</span>
        <span className="font-bold text-emerald-600">812 clients (95.5%)</span>
      </div>
    </Card>
  );
};
