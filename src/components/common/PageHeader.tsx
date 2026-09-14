import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  purpose: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ComponentType<{ className?: string }>;
    disabled?: boolean;
    tooltip?: string;
  };
  secondaryActions?: Array<{
    label: string;
    onClick: () => void;
    icon?: React.ComponentType<{ className?: string }>;
    disabled?: boolean;
  }>;
  statusBadge?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbs,
  title,
  purpose,
  primaryAction,
  secondaryActions = [],
  statusBadge,
}) => {
  return (
    <div className="mb-6 space-y-3 border-b border-black/10 pb-5 dark:border-white/10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl dark:text-white">
              {title}
            </h1>
            {statusBadge}
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            {purpose}
          </p>
        </div>

        {/* Action Buttons */}
        {(primaryAction || secondaryActions.length > 0) && (
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {secondaryActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  className="flex items-center gap-1.5 border border-black/20 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-white/20 dark:bg-black dark:text-neutral-200 dark:hover:bg-neutral-900"
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  <span>{action.label}</span>
                </button>
              );
            })}

            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                disabled={primaryAction.disabled}
                title={primaryAction.tooltip}
                className="flex items-center gap-1.5 border border-black bg-black px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                {primaryAction.icon && <primaryAction.icon className="h-3.5 w-3.5" />}
                <span>{primaryAction.label}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
