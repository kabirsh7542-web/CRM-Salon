import React, { useEffect, useState } from 'react';
import {
  Users,
  UserCheck,
  Send,
  CheckCheck,
  Eye,
  MessageSquare,
  UserX,
  Sparkles,
} from 'lucide-react';
import { StatCard } from '../../components/dashboard/StatCard';
import { MessagePerformanceChart } from '../../components/dashboard/MessagePerformanceChart';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { CustomerSegments } from '../../components/dashboard/CustomerSegments';
import { RecentCampaignsTable } from '../../components/dashboard/RecentCampaignsTable';
import { RecentCustomersList } from '../../components/dashboard/RecentCustomersList';
import { RecentRepliesList } from '../../components/dashboard/RecentRepliesList';
import { formatNumber } from '../../utils/formatters';
import { customerService, type CustomerMetrics } from '../../services/customerService';
import { useAuth } from '../../contexts/useAuth';

export const DashboardPage: React.FC = () => {
  const { user, profile } = useAuth();
  const [metrics, setMetrics] = useState<CustomerMetrics | null>(null);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  useEffect(() => {
    let isMounted = true;
    customerService
      .fetchCustomerMetrics()
      .then((data) => {
        if (isMounted) {
          setMetrics(data);
          setLoadingMetrics(false);
        }
      })
      .catch((err) => {
        console.error('[DashboardPage] Error loading metrics from Supabase:', err);
        if (isMounted) setLoadingMetrics(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const displayName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Salon Director';

  const salonName = import.meta.env.VITE_APP_NAME || 'StyleSalon CRM';

  const total = metrics?.totalCustomers ?? 0;
  const active = metrics?.activeCustomers ?? 0;
  const blockedOptOut = metrics?.blockedOptOut ?? 0;
  const activeRate = total > 0 ? ((active / total) * 100).toFixed(1) : '100';

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Good Morning, {displayName}
            </h1>
            <span className="text-2xl">✨</span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Live client directory data powered by Supabase PostgreSQL.
          </p>
        </div>

        {/* Studio Indicator */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-soft">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-xs">
            <span className="font-semibold text-slate-800">{salonName}</span>
            <span className="text-slate-400 block text-[10px]">Private Salon Console</span>
          </div>
        </div>
      </div>

      {/* 8 Statistic Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Real Customer Metrics from Supabase */}
        <StatCard
          title="Total Customers"
          value={loadingMetrics ? '—' : formatNumber(total)}
          subtitle={total === 0 ? 'No clients registered yet' : 'Verified Supabase client database'}
          badgeText={loadingMetrics ? 'Loading...' : `${total} Clients`}
          icon={Users}
          colorVariant="rose"
        />

        <StatCard
          title="Active Customers"
          value={loadingMetrics ? '—' : formatNumber(active)}
          subtitle={`${activeRate}% active engagement rate`}
          badgeText={`${activeRate}%`}
          icon={UserCheck}
          colorVariant="mint"
        />

        {/* WhatsApp Metrics clearly designated as pending Phase 3 WhatsApp integration */}
        <StatCard
          title="Messages Sent"
          value="0"
          subtitle="WhatsApp broadcast channel pending"
          badgeText="Phase 3"
          icon={Send}
          colorVariant="violet"
        />

        <StatCard
          title="Delivered"
          value="0%"
          subtitle="Meta delivery webhooks pending"
          badgeText="Phase 3"
          icon={CheckCheck}
          colorVariant="sky"
        />

        <StatCard
          title="Read"
          value="0%"
          subtitle="WhatsApp read receipts pending"
          badgeText="Phase 3"
          icon={Eye}
          colorVariant="amber"
        />

        <StatCard
          title="Replies"
          value="0"
          subtitle="Two-way client inbox pending"
          badgeText="Phase 3"
          icon={MessageSquare}
          colorVariant="emerald"
        />

        {/* Real Blocked / Opt-out count from Supabase */}
        <StatCard
          title="Blocked / Opt-out"
          value={loadingMetrics ? '—' : formatNumber(blockedOptOut)}
          subtitle={blockedOptOut === 0 ? 'Zero client restrictions' : `${blockedOptOut} clients opted out or blocked`}
          badgeText={blockedOptOut > 0 ? 'Restricted' : '0 Active'}
          icon={UserX}
          colorVariant="coral"
        />

        <StatCard
          title="Last Campaign"
          value="Pending"
          subtitle="Connect WhatsApp WABA in Phase 3"
          badgeText="Phase 3"
          icon={Sparkles}
          colorVariant="indigo"
        />
      </div>

      {/* Quick Actions Bar */}
      <QuickActions />

      {/* Primary Analytics Row: Message Performance & Customer Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <MessagePerformanceChart />
        </div>
        <div className="lg:col-span-5">
          <CustomerSegments />
        </div>
      </div>

      {/* Full Width Recent Campaigns */}
      <RecentCampaignsTable />

      {/* Two Column Row: Recent Customers & Recent Replies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentCustomersList />
        <RecentRepliesList />
      </div>
    </div>
  );
};
