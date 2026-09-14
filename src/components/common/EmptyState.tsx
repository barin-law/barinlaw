import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon = Inbox,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-black/20 p-8 text-center dark:border-white/20">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-neutral-100 dark:border-white/10 dark:bg-neutral-900 mb-3">
        <Icon className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />
      </div>
      <h3 className="text-base font-semibold text-black dark:text-white">
        {title}
      </h3>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 max-w-sm">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 border border-black bg-black px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 cursor-pointer"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
