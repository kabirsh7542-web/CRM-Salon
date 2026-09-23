import React, { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { Users } from 'lucide-react';
import { Badge } from '../common/Badge';
import { customerService } from '../../services/customerService';
import type { CustomerSegmentStat } from '../../types/crm';

export const CustomerSegments: React.FC = () => {
  const [segments, setSegments] = useState<CustomerSegmentStat[]>([]);
  const [total, setTotal] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [activePercentage, setActivePercentage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    customerService
      .fetchCustomerSegmentStats()
      .then((data) => {
        if (isMounted) {
          setSegments(data.segments);
          setTotal(data.total);
          setActiveCount(data.activeCount);
          setActivePercentage(data.activePercentage);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('[CustomerSegments] Error loading segments:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Card className="flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Customer Segments
            </h3>
            <p className="text-xs text-slate-500">
              Audience segmentation for WhatsApp broadcasts
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
            <Users className="h-3.5 w-3.5 text-slate-500" />
            <span>{loading ? '...' : `${total} Total`}</span>
          </div>
        </div>

        {/* Distribution bar */}
        <div className="my-5">
          {total === 0 ? (
            <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex items-center justify-center">
              <span className="text-[9px] text-slate-400 font-medium tracking-wider uppercase">
                No clients yet
              </span>
            </div>
          ) : (
            <div className="flex h-3 w-full rounded-full overflow-hidden bg-slate-100 shadow-inner">
              {segments.map((seg) =>
                seg.count > 0 ? (
                  <div
                    key={seg.segment}
                    style={{
                      width: `${(seg.count / total) * 100}%`,
                      backgroundColor: seg.color,
                    }}
                    className="transition-all duration-300 hover:opacity-90"
                    title={`${seg.label}: ${seg.count} (${seg.percentage}%)`}
                  />
                ) : null
              )}
            </div>
          )}
        </div>

        {/* List of segments */}
        <div className="space-y-3">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-slate-200" />
                  <div className="space-y-1">
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                    <div className="h-3 w-36 bg-slate-100 rounded" />
                  </div>
                </div>
                <div className="h-4 w-12 bg-slate-100 rounded" />
              </div>
            ))
          ) : (
            segments.map((seg) => (
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
            ))
          )}
        </div>
      </div>

      <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Active reachable audience:</span>
        <span className="font-bold text-emerald-600">
          {loading ? '...' : `${activeCount} clients (${activePercentage}%)`}
        </span>
      </div>
    </Card>
  );
};
