/**
 * Dhenze Electronic Notarization Facility (Dhenze ENF)
 * Client Identity & Credential Management Module
 * eGovPH / PhilSys Simulation, Consent, Liveness, and Internal Person ID
 */

import React, { useState } from 'react';
import {
  UserCheck,
  ShieldCheck,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Smartphone,
  Fingerprint,
  RefreshCw,
  Clock,
  Eye,
  FileCheck,
  KeyRound,
  ExternalLink,
} from 'lucide-react';
import { useClientCase } from '../../../context/ClientCaseContext';
import { StatusBadge } from '../../common/StatusBadge';

interface ClientIdentitySectionProps {
  activeSubModule: string;
}

export const ClientIdentitySection: React.FC<ClientIdentitySectionProps> = ({ activeSubModule }) => {
  const {
    profile,
    updateProfile,
    updateConsent,
    simulateEgovPhVerification,
    runLivenessDiagnostic,
    performIdentityReverification,
  } = useClientCase();

  const [verifyingEgov, setVerifyingEgov] = useState(false);
  const [runningLiveness, setRunningLiveness] = useState(false);
  const [egovNotice, setEgovNotice] = useState<string | null>(null);

  // Re-verification state (Step-Up challenge)
  const [stepUpCode, setStepUpCode] = useState('');
  const [stepUpRunning, setStepUpRunning] = useState(false);
  const [stepUpSuccess, setStepUpSuccess] = useState(false);

  const handleRunEgovPh = async () => {
    setVerifyingEgov(true);
    try {
      const res = await simulateEgovPhVerification();
      setEgovNotice(res.message);
      setTimeout(() => setEgovNotice(null), 6000);
    } finally {
      setVerifyingEgov(false);
    }
  };

  const handleLiveness = async () => {
    setRunningLiveness(true);
    try {
      await runLivenessDiagnostic();
    } finally {
      setRunningLiveness(false);
    }
  };

  const handleStepUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStepUpRunning(true);
    try {
      const res = await performIdentityReverification(stepUpCode || '482109');
      if (res.success) {
        setStepUpSuccess(true);
        setTimeout(() => setStepUpSuccess(false), 5000);
      }
    } finally {
      setStepUpRunning(false);
    }
  };

  return (
    <div className="space-y-5 text-xs">
      {/* Notice Banner */}
      <div className="border border-black/15 bg-neutral-50 p-3.5 text-xs text-neutral-600 dark:border-white/15 dark:bg-neutral-900/60 dark:text-neutral-400">
        <div className="flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 text-black dark:text-white mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-black dark:text-white">
              Demonstration Environment — Identity Verification Sandbox
            </p>
            <p className="text-[11px]">
              This function uses simulated demonstration data and does not create a legally valid identity verification, signature, notarization, certificate, seal, payment, or government record.
            </p>
          </div>
        </div>
      </div>

      {egovNotice && (
        <div className="border border-emerald-500 bg-emerald-50 p-3 text-xs text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
          {egovNotice}
        </div>
      )}

      {/* Internal Person Identifier Box (Section 7, 8, 9) */}
      <div className="border border-black/20 bg-white p-4 dark:border-white/20 dark:bg-neutral-950">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/10 pb-2.5 dark:border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-500">
              System Architecture & Account-Holder Reference
            </span>
            <h4 className="text-sm font-bold text-black dark:text-white">
              DHENZE Internal Person Identifier
            </h4>
          </div>
          <span className="font-mono text-xs font-bold border border-black bg-neutral-100 px-2 py-1 dark:border-white dark:bg-neutral-900">
            {profile.internalPersonId}
          </span>
        </div>

        <div className="mt-2.5 space-y-2 text-[11px] text-neutral-600 dark:text-neutral-400">
          <p className="italic font-sans text-amber-700 dark:text-amber-400 font-medium">
            "Internal reference only. This identifier does not grant access and must not be used as proof of identity."
          </p>
          <p>
            Strict Isolation Guarantee: This identifier is strictly internal to the firm’s case management database. It is never included in public verification links, notarial register references, certificates, or QR codes.
          </p>
        </div>
      </div>

      {/* SUB-VIEW ROUTING */}
      {activeSubModule === 'principal-personal-info' || activeSubModule === 'principal-contact-info' ? (
        /* Personal & Contact Information Card */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 pb-3 dark:border-white/10">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                Personal & Contact Profile
              </h3>
              <p className="text-xs text-neutral-500">
                Verified principal data mapped to Supreme Court notarial record requirements.
              </p>
            </div>
            <StatusBadge status="VERIFIED CITIZEN" variant="success" size="sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-neutral-500 text-[10px] uppercase">Full Legal Name</span>
              <p className="font-bold font-sans text-sm">{profile.fullName}</p>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-500 text-[10px] uppercase">Citizenship & Civil Status</span>
              <p className="font-sans">{profile.citizenship} • {profile.civilStatus}</p>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-500 text-[10px] uppercase">Date of Birth</span>
              <p>{profile.dateOfBirth}</p>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-500 text-[10px] uppercase">Registered Address</span>
              <p className="font-sans">{profile.residentialAddress}</p>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-500 text-[10px] uppercase">Official Email</span>
              <p>{profile.email}</p>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-500 text-[10px] uppercase">Mobile Phone</span>
              <p>{profile.mobilePhone}</p>
            </div>
          </div>
        </div>
      ) : activeSubModule === 'principal-consent' ? (
        /* Consent Records Card (Section 6) */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 pb-3 dark:border-white/10">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                Mandatory Privacy & Notarial Consents
              </h3>
              <p className="text-xs text-neutral-500">
                Data Privacy Act of 2012 (R.A. 10173) and A.M. No. 24-10-14-SC Electronic Notarization Disclosures.
              </p>
            </div>
            <span className="text-[10px] font-mono border border-black/20 px-2 py-0.5 dark:border-white/20">
              Version v2026.1
            </span>
          </div>

          <div className="space-y-3">
            {(profile.consents || []).map((consent) => (
              <div
                key={consent.id}
                className="border border-black/10 p-3 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-black dark:text-white">{consent.title}</span>
                    {consent.consentedAt ? (
                      <span className="border border-emerald-600 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-mono text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Consented {new Date(consent.consentedAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="border border-amber-600 bg-amber-50 px-1.5 py-0.5 text-[9px] font-mono text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        Action Required
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500">{consent.description}</p>
                </div>

                <button
                  onClick={() => updateConsent(consent.id, !consent.consentedAt)}
                  className={`px-3 py-1.5 text-xs font-semibold cursor-pointer border ${
                    consent.consentedAt
                      ? 'border-black/20 bg-white text-neutral-700 hover:bg-neutral-100 dark:border-white/20 dark:bg-black dark:text-neutral-300 dark:hover:bg-neutral-900'
                      : 'border-black bg-black text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200'
                  }`}
                >
                  {consent.consentedAt ? 'Revoke Consent' : 'Grant Consent'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : activeSubModule === 'principal-liveness' ? (
        /* Passive Liveness Diagnostic */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 pb-3 dark:border-white/10">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                Camera Diagnostic & Anti-Spoofing Passive Liveness
              </h3>
              <p className="text-xs text-neutral-500">
                Complies with ISO/IEC 30107-3 Presentation Attack Detection (PAD Level 2).
              </p>
            </div>
            <StatusBadge status="PAD LEVEL 2" variant="info" size="sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-black/10 p-4 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 space-y-2">
              <h4 className="font-bold text-xs">Diagnostic Criteria</h4>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-neutral-600 dark:text-neutral-400">
                <li>3D Depth micro-motion analysis</li>
                <li>Display screen flash reflection detection</li>
                <li>Silicon mask and printed photo attack screening</li>
                <li>Device integrity and browser sandbox fingerprinting</li>
              </ul>

              {profile.livenessScore && (
                <div className="mt-3 p-2 bg-emerald-50 border border-emerald-500 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-mono">
                  ✓ Passed: Confidence {profile.livenessScore}% • Low false acceptance rate
                </div>
              )}
            </div>

            <div className="border border-black/10 p-4 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-xs">Interactive Camera Scan</h4>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Ensure adequate lighting on your face without backlighting or glare.
                </p>
              </div>

              <button
                onClick={handleLiveness}
                disabled={runningLiveness}
                className="mt-4 flex items-center justify-center gap-2 border border-black bg-black py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 cursor-pointer disabled:opacity-50"
              >
                <Camera className="h-4 w-4" />
                <span>{runningLiveness ? 'Executing 3D PAD Scan...' : 'Run Passive Liveness Scan'}</span>
              </button>
            </div>
          </div>
        </div>
      ) : activeSubModule === 'principal-reverify' ? (
        /* Identity Re-verification / Pre-Signing Step-Up (Section 11) */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 pb-3 dark:border-white/10">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                Pre-Signing Step-Up Re-verification Challenge
              </h3>
              <p className="text-xs text-neutral-500">
                Supreme Court mandate: Step-up authentication required immediately prior to electronic signing ceremony.
              </p>
            </div>
            <StatusBadge status="STEP-UP CHALLENGE" variant="warning" size="sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-black/10 p-4 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 space-y-3">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-black dark:text-white" />
                <h4 className="font-bold text-xs">One-Time Security Passcode (OTP)</h4>
              </div>
              <p className="text-[11px] text-neutral-500">
                A 6-digit cryptographic verification code has been dispatched to your registered mobile ending in <strong>4821</strong>.
              </p>

              <form onSubmit={handleStepUpSubmit} className="space-y-3">
                <input
                  type="text"
                  maxLength={6}
                  value={stepUpCode}
                  onChange={(e) => setStepUpCode(e.target.value)}
                  placeholder="Enter 6-digit OTP (demo: 482109)"
                  className="w-full border border-black/20 bg-white p-2 text-xs font-mono dark:border-white/20 dark:bg-black"
                />

                <button
                  type="submit"
                  disabled={stepUpRunning}
                  className="w-full border border-black bg-black py-2 text-xs font-semibold text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 cursor-pointer disabled:opacity-50"
                >
                  {stepUpRunning ? 'Validating Step-Up...' : 'Confirm Step-Up Authentication'}
                </button>
              </form>

              {stepUpSuccess && (
                <div className="p-2 border border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 font-mono text-[11px]">
                  ✓ Re-verification token issued. Valid for the duration of the scheduled signing session.
                </div>
              )}
            </div>

            <div className="border border-black/10 p-4 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 space-y-2">
              <h4 className="font-bold text-xs">Security Assurance Controls</h4>
              <p className="text-[11px] text-neutral-500">
                Prevents session hijacking, credential theft, and unauthorized signing delegation under Rule 6 of the 2026 Rules on Electronic Notarization.
              </p>
              <div className="font-mono text-[10px] space-y-1 text-neutral-600 dark:text-neutral-400 pt-2 border-t border-black/10 dark:border-white/10">
                <div>CHALLENGE_TYPE: STEP_UP_MFA_LIVENESS</div>
                <div>EXPIRY_WINDOW: 15 MINUTES</div>
                <div>SESSION_BINDING: TLS_MUTUAL_SIMULATED</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Default Identity View: eGovPH & PhilSys Simulation (Section 10) */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/10 pb-3 dark:border-white/10">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                PSA PhilSys / eGovPH Identity Verification
              </h3>
              <p className="text-xs text-neutral-500">
                Simulated integration with Philippine National ID (PhilSys ePhilID) and eGov Super App SSO.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge
                status={profile.identityStatus === 'VERIFIED' ? 'PSA VERIFIED' : 'PENDING SIMULATION'}
                variant={profile.identityStatus === 'VERIFIED' ? 'success' : 'warning'}
                size="sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Government Credential Card */}
            <div className="border border-black/15 p-4 bg-neutral-50 space-y-3 dark:border-white/15 dark:bg-neutral-900">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Philippine Statistics Authority (PSA)
                </span>
                <span className="font-mono text-[10px] font-bold">PhilSys ePhilID</span>
              </div>

              <div className="font-mono text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Signer Name:</span>
                  <span className="font-bold">{profile.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">PhilSys Card No:</span>
                  <span>{profile.idCardNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Verification TxID:</span>
                  <span className="truncate max-w-[140px]">{profile.verificationRecord?.transactionId || 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Credential Status:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Active & Validated</span>
                </div>
              </div>

              <div className="pt-2 border-t border-black/10 dark:border-white/10 flex justify-end">
                <button
                  onClick={handleRunEgovPh}
                  disabled={verifyingEgov}
                  className="flex items-center gap-1.5 border border-black bg-black px-3 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`h-3 w-3 ${verifyingEgov ? 'animate-spin' : ''}`} />
                  <span>{verifyingEgov ? 'Synchronizing with eGovPH...' : 'Re-verify eGovPH Record'}</span>
                </button>
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="border border-black/15 p-4 bg-neutral-50 space-y-3 dark:border-white/15 dark:bg-neutral-900">
              <h4 className="font-bold text-xs">Accreditation Verification Parameters</h4>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between border-b border-black/10 pb-1.5 dark:border-white/10">
                  <span>Explicit Identity Consent:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">✓ Granted (v2026.1)</span>
                </div>
                <div className="flex items-center justify-between border-b border-black/10 pb-1.5 dark:border-white/10">
                  <span>PhilSys Demographic Match:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">✓ 100% Exact Match</span>
                </div>
                <div className="flex items-center justify-between border-b border-black/10 pb-1.5 dark:border-white/10">
                  <span>Facial Liveness Diagnostic:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">✓ {profile.livenessScore || 98.6}% Passed</span>
                </div>
                <div className="flex items-center justify-between border-b border-black/10 pb-1.5 dark:border-white/10">
                  <span>Device Fingerprint Record:</span>
                  <span className="font-mono text-[10px]">DFP-MAC-APPLE-2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
