import React, { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { ArrowUpRight, Phone, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { customerService } from '../../services/customerService';
import type { DbCustomer } from '../../types/crm';

export const RecentCustomersList: React.FC = () => {
  const [customers, setCustomers] = useState<DbCustomer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    customerService
      .fetchRecentCustomers(5)
      .then((data) => {
        if (isMounted) {
          setCustomers(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('[RecentCustomersList] Error loading customers:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Card>
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Recent Customers
          </h3>
          <p className="text-xs text-slate-500">
            Live client directory profiles from Supabase
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
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3.5 px-2 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div className="space-y-1.5">
                  <div className="h-4 w-28 bg-slate-200 rounded" />
                  <div className="h-3 w-20 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="h-4 w-16 bg-slate-100 rounded" />
            </div>
          ))
        ) : customers.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <div className="h-10 w-10 rounded-xl bg-salon-50 text-salon-500 mx-auto flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold text-slate-700">No client profiles registered yet</p>
            <p className="text-[11px] text-slate-400">
              Add your first client or import contacts to view recent visits.
            </p>
            <Link
              to="/customers"
              className="inline-block pt-1 text-xs font-semibold text-salon-600 hover:underline"
            >
              Go to Client Directory &rarr;
            </Link>
          </div>
        ) : (
          customers.map((customer) => (
            <div
              key={customer.id}
              className="flex items-center justify-between py-3.5 hover:bg-slate-50/70 rounded-xl px-2 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-salon-100 to-rose-50 text-salon-700 ring-2 ring-salon-200/50 flex items-center justify-center font-serif font-bold text-sm">
                  {customer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">
                      {customer.name}
                    </span>
                    {customer.status === 'active' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                        Active
                      </span>
                    )}
                    {customer.status === 'blocked' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700">
                        Blocked
                      </span>
                    )}
                    {customer.status === 'opted_out' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700">
                        Opted Out
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Phone className="h-3 w-3 text-emerald-600" />
                      {customer.phone}
                    </span>
                    {customer.last_visit && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[11px]">
                          <Calendar className="h-3 w-3 text-slate-400" />
                          {customer.last_visit}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right">
                {customer.tags && customer.tags.length > 0 ? (
                  <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                    {customer.tags[0]}
                    {customer.tags.length > 1 && ` +${customer.tags.length - 1}`}
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-300">Registered</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
