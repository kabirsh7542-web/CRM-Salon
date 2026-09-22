import React from 'react';
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
import { mockSalonOwner, mockStats } from '../../lib/mockData';
import { formatNumber } from '../../utils/formatters';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Good Morning, {mockSalonOwner.name.split(' ')[0]}
            </h1>
            <span className="text-2xl">✨</span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Here's what's happening at your salon today.
          </p>
        </div>

        {/* Studio Indicator */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-soft">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-xs">
            <span className="font-semibold text-slate-800">{mockSalonOwner.salonName}</span>
            <span className="text-slate-400 block text-[10px]">Private Salon Console</span>
          </div>
        </div>
      </div>

      {/* 8 Statistic Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Customers"
          value={formatNumber(mockStats.totalCustomers)}
          subtitle="Registered salon client base"
          badgeText="+12 this month"
          icon={Users}
          colorVariant="rose"
        />

        <StatCard
          title="Active Customers"
          value={formatNumber(mockStats.activeCustomers)}
          subtitle="95.5% active engagement rate"
          badgeText="95.5%"
          icon={UserCheck}
          colorVariant="mint"
        />

        <StatCard
          title="Messages Sent"
          value={formatNumber(mockStats.messagesSent)}
          subtitle="Total WhatsApp broadcasts"
          badgeText="Oct Cycle"
          icon={Send}
          colorVariant="violet"
        />

        <StatCard
          title="Delivered"
          value={formatNumber(mockStats.delivered)}
          subtitle="96.5% delivery success"
          badgeText="96.5%"
          icon={CheckCheck}
          colorVariant="sky"
        />

        <StatCard
          title="Read"
          value={formatNumber(mockStats.read)}
          subtitle="77.6% read & opened"
          badgeText="77.6%"
          icon={Eye}
          colorVariant="amber"
        />

        <StatCard
          title="Replies"
          value={formatNumber(mockStats.replies)}
          subtitle="Inquiries & confirmations"
          badgeText="47 replies"
          icon={MessageSquare}
          colorVariant="emerald"
        />

        <StatCard
          title="Blocked / Opt-out"
          value={formatNumber(mockStats.blockedOptOut)}
          subtitle="4.4% opt-out rate (Healthy)"
          badgeText="Low Risk"
          icon={UserX}
          colorVariant="coral"
        />

        <StatCard
          title="Last Campaign"
          value="98% Deliv."
          subtitle="Weekend Glow & Balayage Special"
          badgeText="High CTR"
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
