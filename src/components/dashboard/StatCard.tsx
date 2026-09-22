import React from 'react';
import { cn } from '../../utils/formatters';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badgeText?: string;
  icon: React.ComponentType<{ className?: string }>;
  colorVariant: 'rose' | 'mint' | 'violet' | 'sky' | 'amber' | 'emerald' | 'coral' | 'indigo';
}

const variantStyles = {
  rose: {
    container: 'bg-[#FFF0F3] border-[#FCD8DF] text-[#D43859]',
    iconBg: 'bg-[#FFE2E8] text-[#D43859]',
    badge: 'bg-white/80 text-[#D43859] border-[#FCD8DF]',
    valueColor: 'text-slate-900',
  },
  mint: {
    container: 'bg-[#F0FDF4] border-[#DCFCE7] text-[#16A34A]',
    iconBg: 'bg-[#DCFCE7] text-[#16A34A]',
    badge: 'bg-white/80 text-[#16A34A] border-[#DCFCE7]',
    valueColor: 'text-slate-900',
  },
  violet: {
    container: 'bg-[#F5F3FF] border-[#EDE9FE] text-[#7C3AED]',
    iconBg: 'bg-[#EDE9FE] text-[#7C3AED]',
    badge: 'bg-white/80 text-[#7C3AED] border-[#EDE9FE]',
    valueColor: 'text-slate-900',
  },
  sky: {
    container: 'bg-[#F0F9FF] border-[#E0F2FE] text-[#0284C7]',
    iconBg: 'bg-[#E0F2FE] text-[#0284C7]',
    badge: 'bg-white/80 text-[#0284C7] border-[#E0F2FE]',
    valueColor: 'text-slate-900',
  },
  amber: {
    container: 'bg-[#FFFBEB] border-[#FEF3C7] text-[#D97706]',
    iconBg: 'bg-[#FEF3C7] text-[#D97706]',
    badge: 'bg-white/80 text-[#D97706] border-[#FEF3C7]',
    valueColor: 'text-slate-900',
  },
  emerald: {
    container: 'bg-[#ECFDF5] border-[#D1FAE5] text-[#059669]',
    iconBg: 'bg-[#D1FAE5] text-[#059669]',
    badge: 'bg-white/80 text-[#059669] border-[#D1FAE5]',
    valueColor: 'text-slate-900',
  },
  coral: {
    container: 'bg-[#FFF1F2] border-[#FFE4E6] text-[#E11D48]',
    iconBg: 'bg-[#FFE4E6] text-[#E11D48]',
    badge: 'bg-white/80 text-[#E11D48] border-[#FFE4E6]',
    valueColor: 'text-slate-900',
  },
  indigo: {
    container: 'bg-[#EEF2FF] border-[#E0E7FF] text-[#4F46E5]',
    iconBg: 'bg-[#E0E7FF] text-[#4F46E5]',
    badge: 'bg-white/80 text-[#4F46E5] border-[#E0E7FF]',
    valueColor: 'text-slate-900',
  },
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  badgeText,
  icon: Icon,
  colorVariant,
}) => {
  const styles = variantStyles[colorVariant];

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-md',
        styles.container
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className={cn('text-2xl sm:text-3xl font-bold tracking-tight', styles.valueColor)}>
              {value}
            </h3>
            {badgeText && (
              <span
                className={cn(
                  'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border',
                  styles.badge
                )}
              >
                {badgeText}
              </span>
            )}
          </div>
        </div>

        <div
          className={cn(
            'flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105',
            styles.iconBg
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {subtitle && (
        <p className="mt-3 text-xs text-slate-500 font-medium truncate">
          {subtitle}
        </p>
      )}
    </div>
  );
};
