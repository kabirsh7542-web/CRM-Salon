import React, { type HTMLAttributes } from 'react';
import { cn } from '../../utils/formatters';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  padding = 'md',
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-slate-100 shadow-soft transition-all duration-200',
        paddingStyles[padding],
        hoverEffect && 'hover:shadow-soft-md hover:border-slate-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
