import React, { type HTMLAttributes } from 'react';
import { cn } from '../../utils/formatters';
import type { CustomerSegment } from '../../types/crm';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'pink' | 'success' | 'warning' | 'info' | 'neutral' | 'segment';
  segment?: CustomerSegment;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  segment,
  size = 'md',
  className,
  ...props
}) => {
  let styleClasses = 'bg-slate-100 text-slate-700 border border-slate-200';

  if (segment) {
    switch (segment) {
      case 'VIP':
        styleClasses = 'bg-rose-50 text-rose-700 border border-rose-200/80 font-semibold';
        break;
      case 'Regular':
        styleClasses = 'bg-sky-50 text-sky-700 border border-sky-200/80 font-medium';
        break;
      case 'New':
        styleClasses = 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-medium';
        break;
      case 'Inactive':
        styleClasses = 'bg-amber-50 text-amber-700 border border-amber-200/80 font-medium';
        break;
      case 'OptedOut':
        styleClasses = 'bg-slate-100 text-slate-600 border border-slate-200 font-medium';
        break;
    }
  } else {
    switch (variant) {
      case 'pink':
        styleClasses = 'bg-salon-50 text-salon-700 border border-salon-200/80';
        break;
      case 'success':
        styleClasses = 'bg-emerald-50 text-emerald-700 border border-emerald-200/80';
        break;
      case 'warning':
        styleClasses = 'bg-amber-50 text-amber-700 border border-amber-200/80';
        break;
      case 'info':
        styleClasses = 'bg-blue-50 text-blue-700 border border-blue-200/80';
        break;
      case 'neutral':
        styleClasses = 'bg-slate-100 text-slate-600 border border-slate-200/70';
        break;
      default:
        styleClasses = 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium rounded-full tracking-wide',
        sizeClasses[size],
        styleClasses,
        className
      )}
      {...props}
    >
      {children || segment}
    </span>
  );
};
