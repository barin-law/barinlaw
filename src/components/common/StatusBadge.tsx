import React from 'react';
import { TransactionState, AdapterState, AuditSeverity } from '../../types';

interface StatusBadgeProps {
  status?: string | TransactionState | AdapterState | AuditSeverity;
  label?: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'demo';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  variant,
  size = 'md',
}) => {
  const displayLabel = label || (typeof status === 'string' ? status.replace(/_/g, ' ') : '');

  // Determine variant automatically if not provided
  let computedVariant = variant || 'default';
  if (!variant && status) {
    const s = String(status);
    if (s.includes('COMPLETED') || s === 'OPERATIONAL' || s === 'CLEARED' || s === 'LOW' || s === 'ACCREDITED') {
      computedVariant = 'success';
    } else if (s.includes('PENDING') || s.includes('REVIEW') || s === 'CONNECTING' || s === 'MEDIUM' || s === 'DEGRADED') {
      computedVariant = 'warning';
    } else if (s.includes('REFUSED') || s.includes('FAILED') || s === 'ERROR' || s === 'CRITICAL' || s === 'UNAVAILABLE' || s === 'QUARANTINED') {
      computedVariant = 'error';
    } else if (s.includes('DEMO') || s.includes('CANDIDATE') || s.includes('INTERACTIVE')) {
      computedVariant = 'demo';
    } else if (s.includes('SESSION') || s === 'SCHEDULED' || s === 'INFO') {
      computedVariant = 'info';
    }
  }

  const variantStyles = {
    default: 'border-neutral-400 bg-neutral-100 text-neutral-800 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200',
    success: 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300',
    warning: 'border-amber-500 bg-amber-50 text-amber-800 dark:border-amber-600 dark:bg-amber-950/40 dark:text-amber-300',
    error: 'border-red-500 bg-red-50 text-red-800 dark:border-red-600 dark:bg-red-950/40 dark:text-red-300',
    info: 'border-neutral-800 bg-neutral-100 text-neutral-900 dark:border-neutral-200 dark:bg-neutral-900 dark:text-neutral-100',
    demo: 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black',
  };

  const sizeStyles = {
    sm: 'px-1.5 py-0.2 text-[10px]',
    md: 'px-2 py-0.5 text-xs',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm border font-mono font-medium tracking-tight uppercase ${variantStyles[computedVariant]} ${sizeStyles[size]}`}
    >
      {displayLabel}
    </span>
  );
};
