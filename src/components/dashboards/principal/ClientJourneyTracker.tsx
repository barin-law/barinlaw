/**
 * Dhenze Electronic Notarization Facility (Dhenze ENF)
 * Client Journey Progress Tracker & Step-by-Step Wizard
 * Supreme Court A.M. No. 24-10-14-SC Demonstration Environment
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Shield,
  FileCheck,
  Scale,
} from 'lucide-react';
import { ClientCase, ClientProfile } from '../../../types/client-case';
import { useClientCase } from '../../../context/ClientCaseContext';

interface ClientJourneyTrackerProps {
  activeCase?: ClientCase;
  profile?: ClientProfile;
  onNavigateModule: (moduleId: string) => void;
}

export const JOURNEY_STEPS = [
  { id: 1, label: 'Client Registration', moduleId: 'principal-profile', responsible: 'Client' },
  { id: 2, label: 'Profile and Consent', moduleId: 'principal-consent', responsible: 'Client' },
  { id: 3, label: 'DHENZE Internal Person ID Creation', moduleId: 'principal-profile', responsible: 'System (Internal)' },
  { id: 4, label: 'Identity Verification (PhilSys/eGovPH)', moduleId: 'principal-identity', responsible: 'Client / System' },
  { id: 5, label: 'Case Creation', moduleId: 'principal-start', responsible: 'Client' },
  { id: 6, label: 'Participant and Witness Authorization', moduleId: 'principal-participants', responsible: 'Client / Counsel' },
  { id: 7, label: 'Document Selection', moduleId: 'principal-documents', responsible: 'Client' },
  { id: 8, label: 'Document and Evidence Upload', moduleId: 'principal-upload-docs', responsible: 'Client' },
  { id: 9, label: 'Supporting Documents', moduleId: 'principal-supporting-docs', responsible: 'Client' },
  { id: 10, label: 'Preliminary Document Review', moduleId: 'principal-awaiting-lawyer', responsible: 'Counsel' },
  { id: 11, label: 'Lawyer Consultation', moduleId: 'principal-live-sessions', responsible: 'Client & Counsel' },
  { id: 12, label: 'Conflict and Legal Review', moduleId: 'principal-awaiting-lawyer', responsible: 'Counsel' },
  { id: 13, label: 'Document Correction', moduleId: 'principal-awaiting-client', responsible: 'Counsel' },
  { id: 14, label: 'Client Approval', moduleId: 'principal-awaiting-client', responsible: 'Client' },
  { id: 15, label: 'Signing and Appearance', moduleId: 'principal-signing-session', responsible: 'Client & ENP' },
  { id: 16, label: 'Identity Re-verification', moduleId: 'principal-reverify', responsible: 'Client (Step-Up)' },
  { id: 17, label: 'Notarial Act', moduleId: 'principal-signing-session', responsible: 'Commissioned ENP' },
  { id: 18, label: 'Notarial Register', moduleId: 'principal-notarial-status', responsible: 'Commissioned ENP' },
  { id: 19, label: 'Notarial Certificate', moduleId: 'principal-completed-docs', responsible: 'Commissioned ENP' },
  { id: 20, label: 'Seal and Signature', moduleId: 'principal-completed-docs', responsible: 'Commissioned ENP' },
  { id: 21, label: 'Canonical SHA-256 Hash', moduleId: 'principal-hash-qr', responsible: 'System (WebCrypto)' },
  { id: 22, label: 'QR Verification Record', moduleId: 'principal-hash-qr', responsible: 'System (Public)' },
  { id: 23, label: 'Secure Storage', moduleId: 'principal-documents', responsible: 'System (Vault)' },
  { id: 24, label: 'Certified / Downloadable Copy', moduleId: 'principal-completed-docs', responsible: 'Client' },
];

export const ClientJourneyTracker: React.FC<ClientJourneyTrackerProps> = ({
  activeCase: propsActiveCase,
  profile: propsProfile,
  onNavigateModule,
}) => {
  const context = useClientCase();
  const profile = propsProfile || context.profile;
  const activeCase = propsActiveCase || context.activeCase;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCardCollapsed, setIsCardCollapsed] = useState(false);

  // Determine current step index based on active case status & profile
  const getCurrentStepIndex = (): number => {
    if (!profile.verificationRecord) return 3; // Identity Verification
    if (!activeCase) return 4; // Case Creation
    switch (activeCase.status) {
      case 'DRAFT':
      case 'ONBOARDING_PENDING':
        return 4;
      case 'EVIDENCE_INTAKE':
        return 7;
      case 'LAWYER_REVIEW':
        return 10;
      case 'DOCUMENT_CORRECTION':
        return 12;
      case 'CLIENT_APPROVAL_PENDING':
        return 13;
      case 'READY_FOR_SIGNING':
      case 'CEREMONY_SCHEDULED':
        return 14;
      case 'IN_CEREMONY':
        return 15;
      case 'COMPLETED':
        return 23;
      default:
        return 5;
    }
  };

  const currentStep = getCurrentStepIndex();
  const currentStepObj = JOURNEY_STEPS[currentStep] || JOURNEY_STEPS[0];
  const percentComplete = Math.round(((currentStep + 1) / JOURNEY_STEPS.length) * 100);

  if (isCardCollapsed) {
    return (
      <div className="border border-black/15 bg-white p-3 dark:border-white/15 dark:bg-neutral-950 text-xs flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5 truncate">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black bg-black text-white text-[10px] font-bold dark:border-white dark:bg-white dark:text-black">
            {currentStep + 1}
          </span>
          <div className="truncate">
            <span className="text-[10px] font-mono text-neutral-500 mr-2 uppercase">Step {currentStep + 1}/24</span>
            <span className="font-semibold text-black dark:text-white truncate">{currentStepObj.label}</span>
            <span className="text-[10px] text-neutral-400 font-mono ml-2">({percentComplete}% done)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateModule(currentStepObj.moduleId)}
            className="inline-flex items-center gap-1 border border-black bg-black px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 cursor-pointer"
          >
            <span>Action</span>
            <ArrowRight className="h-3 w-3" />
          </button>
          <button
            onClick={() => setIsCardCollapsed(false)}
            className="border border-black/20 px-2 py-1 text-[11px] hover:bg-neutral-100 dark:border-white/20 dark:hover:bg-neutral-900 cursor-pointer flex items-center gap-1 text-neutral-600 dark:text-neutral-400"
            title="Expand Journey Details"
          >
            <span>Expand</span>
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-black/15 bg-white p-4 dark:border-white/15 dark:bg-neutral-950 text-xs space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/10 pb-2.5 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono uppercase text-[10px] tracking-wider text-neutral-500">
              Consolidated Client Journey
            </span>
            <span className="border border-black/20 bg-neutral-100 px-1.5 py-0.5 text-[10px] font-bold dark:border-white/20 dark:bg-neutral-900">
              Step {currentStep + 1} of 24
            </span>
          </div>
          <h4 className="text-sm font-bold text-black dark:text-white mt-0.5">
            {currentStepObj.label}
          </h4>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-neutral-500 font-mono">Workflow Progress</span>
            <span className="font-bold text-xs font-mono">{percentComplete}% Completed</span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 border border-black/20 px-2 py-1 text-[11px] hover:bg-neutral-100 dark:border-white/20 dark:hover:bg-neutral-900 cursor-pointer"
          >
            <span>{isExpanded ? 'Hide Steps' : '24 Steps'}</span>
            {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
          <button
            onClick={() => setIsCardCollapsed(true)}
            className="flex items-center gap-1 border border-black/20 px-2 py-1 text-[11px] hover:bg-neutral-100 dark:border-white/20 dark:hover:bg-neutral-900 cursor-pointer text-neutral-500"
            title="Collapse to minimal bar"
          >
            <span>Minimize</span>
            <ChevronUp className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Visual Step Bar */}
      <div className="w-full bg-neutral-100 h-2 border border-black/10 dark:bg-neutral-900 dark:border-white/10 overflow-hidden">
        <div
          className="bg-black dark:bg-white h-full transition-all duration-300"
          style={{ width: `${percentComplete}%` }}
        />
      </div>

      {/* Active Step Quick Action Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-neutral-50 p-2.5 border border-black/10 dark:bg-neutral-900 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center border border-black bg-black text-white dark:border-white dark:bg-white dark:text-black text-[10px] font-bold">
            {currentStep + 1}
          </div>
          <div>
            <span className="font-semibold text-black dark:text-white">
              Next Action: {currentStepObj.label}
            </span>
            <span className="text-neutral-500 text-[11px] ml-1.5">
              (Assigned to: {currentStepObj.responsible})
            </span>
          </div>
        </div>

        <button
          onClick={() => onNavigateModule(currentStepObj.moduleId)}
          className="inline-flex items-center gap-1.5 border border-black bg-black px-3 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 cursor-pointer self-start sm:self-auto"
        >
          <span>Open Workspace Action</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* Expanded 24-step Grid View */}
      {isExpanded && (
        <div className="pt-2 border-t border-black/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {JOURNEY_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={step.id}
                onClick={() => onNavigateModule(step.moduleId)}
                className={`p-2 border text-left cursor-pointer transition-colors ${
                  isCurrent
                    ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black font-semibold shadow-xs'
                    : isCompleted
                    ? 'border-black/20 bg-neutral-50 text-neutral-700 dark:border-white/20 dark:bg-neutral-900/60 dark:text-neutral-300'
                    : 'border-black/10 bg-white text-neutral-400 dark:border-white/10 dark:bg-black dark:text-neutral-600 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span>Step {step.id}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : isCurrent ? (
                    <Clock className="h-3.5 w-3.5 animate-pulse" />
                  ) : (
                    <span className="text-[9px]">Pending</span>
                  )}
                </div>
                <div className="text-[11px] truncate">{step.label}</div>
                <div className="text-[9px] text-neutral-500 truncate mt-0.5">
                  Resp: {step.responsible}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
