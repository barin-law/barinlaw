import React from 'react';

interface SummaryCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: React.ReactNode;
  trend?: {
    value: string;
    positive?: boolean;
  };
  onClick?: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  badge,
  trend,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`border border-black/15 bg-white p-4 transition-colors dark:border-white/15 dark:bg-neutral-950 ${
        onClick ? 'cursor-pointer hover:border-black dark:hover:border-white' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider dark:text-neutral-400">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          {badge}
          {Icon && <Icon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />}
        </div>
      </div>

      <div className="mt-2.5 flex items-baseline justify-between">
        <div className="text-2xl font-bold tracking-tight text-black dark:text-white sm:text-3xl">
          {value}
        </div>
        {trend && (
          <span
            className={`text-xs font-medium ${
              trend.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
          {subtext}
        </p>
      )}
    </div>
  );
};
