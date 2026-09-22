import React from 'react';
import { Card } from '../../components/common/Card';
import { Users, UserPlus, Filter, Search } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { mockRecentCustomers } from '../../lib/mockData';
import { Badge } from '../../components/common/Badge';
import { formatCurrency } from '../../utils/formatters';

export const CustomersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Client Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your salon client profiles, phone numbers, and WhatsApp tags (850 total).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="md" leftIcon={<Filter className="h-4 w-4" />}>
            Filter Segments
          </Button>
          <Button variant="primary" size="md" leftIcon={<UserPlus className="h-4 w-4" />}>
            Add Client
          </Button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <Card padding="sm" className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client name, mobile (+1...), or service tags..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-salon-100"
          />
        </div>
      </Card>

      {/* Customer Preview Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-6">Client</th>
                <th className="py-3.5 px-4">Phone Number</th>
                <th className="py-3.5 px-4">Segment</th>
                <th className="py-3.5 px-4">Last Visit</th>
                <th className="py-3.5 px-4 text-right">Lifetime Spend</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {mockRecentCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={cust.avatarUrl}
                        alt={cust.name}
                        className="h-9 w-9 rounded-full object-cover ring-2 ring-slate-100"
                      />
                      <div>
                        <span className="font-semibold text-slate-900 block">{cust.name}</span>
                        <span className="text-xs text-slate-400">{cust.tags.join(', ')}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                    {cust.phone}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge segment={cust.segment} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    {cust.lastVisit}
                  </td>
                  <td className="py-3.5 px-4 text-right font-semibold text-slate-900 text-xs">
                    {formatCurrency(cust.totalSpent)}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button className="text-xs font-semibold text-salon-600 hover:text-salon-700">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phase 2 Architecture Notice */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-salon-50 text-salon-600 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Showing 5 of 850 Mock Client Records</p>
              <p className="text-[11px] text-slate-500">Phase 2 will integrate Supabase PostgreSQL client storage, pagination, and CSV batch import.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
