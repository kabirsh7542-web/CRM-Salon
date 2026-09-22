import React from 'react';
import { Card } from '../../components/common/Card';
import { BarChart3, Download } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Analytics & Reports
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track salon client retention, broadcast delivery rates, and ROI metrics.
          </p>
        </div>

        <Button variant="outline" size="md" leftIcon={<Download className="h-4 w-4" />}>
          Export PDF Summary
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Delivery Health</span>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
              Tier 1
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-900">96.5%</p>
          <p className="text-xs text-slate-500">Official Meta Cloud API uptime & delivery</p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Read & Open Rate</span>
            <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-bold">
              +4.2%
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-900">77.6%</p>
          <p className="text-xs text-slate-500">Clients opening broadcasts within 2 hours</p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Response Rate</span>
            <span className="text-xs bg-salon-50 text-salon-700 px-2 py-0.5 rounded-full font-bold">
              8.7%
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-900">47 Replies</p>
          <p className="text-xs text-slate-500">Direct booking inquiries from recent campaigns</p>
        </Card>
      </div>

      <Card className="p-8 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-salon-50 text-salon-600">
          <BarChart3 className="h-6 w-6" />
        </div>
        <div className="max-w-md mx-auto space-y-1">
          <h3 className="text-lg font-bold text-slate-900">Extended Analytics Module</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Phase 1 UI foundation established. In Phase 2, aggregate retention graphs and Supabase SQL reporting views will populate dynamic date-range charts.
          </p>
        </div>
      </Card>
    </div>
  );
};
