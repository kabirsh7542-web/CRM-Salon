import React from 'react';
import { Card } from '../common/Card';
import { mockRecentCustomers } from '../../lib/mockData';
import { Badge } from '../common/Badge';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';

export const RecentCustomersList: React.FC = () => {
  return (
    <Card>
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Recent Customers
          </h3>
          <p className="text-xs text-slate-500">
            Active clients and recent salon visits
          </p>
        </div>
        <Link
          to="/customers"
          className="inline-flex items-center gap-1 text-xs font-semibold text-salon-600 hover:text-salon-700 transition-colors"
        >
          View all
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-slate-100 mt-2">
        {mockRecentCustomers.map((customer) => (
          <div
            key={customer.id}
            className="flex items-center justify-between py-3.5 hover:bg-slate-50/70 rounded-xl px-2 transition-colors"
          >
            <div className="flex items-center gap-3">
              <img
                src={customer.avatarUrl}
                alt={customer.name}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    {customer.name}
                  </span>
                  <Badge segment={customer.segment} size="sm" />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span>{customer.phone}</span>
                  <span>•</span>
                  <span>{customer.lastVisit}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                {formatCurrency(customer.totalSpent)}
              </span>
              <span className="text-[11px] text-slate-400">
                {customer.totalVisits} visits
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
