import React from 'react';
import { Card } from '../common/Card';
import { mockMessageFunnel } from '../../lib/mockData';
import { CheckCheck, MessageSquare, Send, Eye, TrendingUp, Info } from 'lucide-react';

export const MessagePerformanceChart: React.FC = () => {
  return (
    <Card className="flex flex-col justify-between">
      {/* Chart Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Message Performance & Funnel
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
              <TrendingUp className="h-3 w-3" />
              96.5% Delivery
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time WhatsApp campaign delivery, engagement, and conversion funnel
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
            Sent
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
            Delivered
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            Read
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Replies
          </span>
        </div>
      </div>

      {/* Funnel Progress Visualization */}
      <div className="py-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {mockMessageFunnel.map((step) => {
            let StepIcon = Send;
            if (step.label === 'Delivered') StepIcon = CheckCheck;
            if (step.label === 'Read') StepIcon = Eye;
            if (step.label === 'Client Replies') StepIcon = MessageSquare;

            return (
              <div
                key={step.label}
                className="relative p-4 rounded-xl border border-slate-100 bg-slate-50/60 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-600">
                    {step.label}
                  </span>
                  <div
                    className="p-1.5 rounded-lg"
                    style={{ backgroundColor: `${step.color}15`, color: step.color }}
                  >
                    <StepIcon className="h-4 w-4" />
                  </div>
                </div>

                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-2xl font-bold text-slate-900">
                    {step.count}
                  </span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${step.color}20`, color: step.color }}
                  >
                    {step.rate}
                  </span>
                </div>

                {/* Micro visual bar */}
                <div className="w-full bg-slate-200/70 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${step.percentage}%`,
                      backgroundColor: step.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Flow / Comparison Bar */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Overall Conversion Flow</span>
            <span className="text-salon-600 font-bold">47 Conversions (Replies)</span>
          </div>

          <div className="h-4 w-full flex rounded-full overflow-hidden shadow-inner bg-slate-200">
            <div
              style={{ width: '96.5%' }}
              className="bg-gradient-to-r from-violet-500 to-sky-500 transition-all"
              title="Delivered (96.5%)"
            />
            <div
              style={{ width: '3.5%' }}
              className="bg-rose-300"
              title="Failed / Blocked (3.5%)"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>Official WhatsApp Cloud API Channel</span>
            <span className="flex items-center gap-1">
              <Info className="h-3 w-3" />
              Low opt-out rate (&lt;5%) maintains Tier-1 meta score
            </span>
          </div>
        </div>
      </div>

      {/* Footer Insight */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500">
        <span>Campaign: <strong className="text-slate-800">Weekend Glow & Balayage Special</strong></span>
        <span className="text-emerald-600 font-medium">98% recipient deliverability rate achieved</span>
      </div>
    </Card>
  );
};
