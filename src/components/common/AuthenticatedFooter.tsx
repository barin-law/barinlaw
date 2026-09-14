import React from 'react';
import { ShieldCheck, Scale, Lock } from 'lucide-react';
import { UserRole } from '../../types';

interface AuthenticatedFooterProps {
  currentRole: UserRole;
}

export const AuthenticatedFooter: React.FC<AuthenticatedFooterProps> = ({ currentRole }) => {
  return (
    <footer
      id="authenticated-workspace-footer"
      role="contentinfo"
      className="border-t border-black/10 bg-neutral-50 px-4 py-3 text-[11px] text-neutral-500 transition-colors dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-400"
    >
      <div className="mx-auto flex flex-col items-center justify-between gap-2 sm:flex-row text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          <span className="font-semibold text-black dark:text-white">
            Barin Electronic Notarization Facility
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Candidate Environment</span>
          <span className="hidden sm:inline">•</span>
          <span className="font-mono text-[10px]">Session Role: {currentRole}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-[10px]">
          <span className="inline-flex items-center gap-1">
            <Scale className="h-3 w-3" />
            <span>A.M. No. 24-10-14-SC</span>
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <Lock className="h-3 w-3" />
            <span>R.A. 10173 Protected</span>
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" />
            <span>Strict Tamper-Evidence Enforced</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
