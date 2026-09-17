/**
 * Dhenze Electronic Notarization Facility (Dhenze ENF)
 * Client Account, Security, Devices & Payments Module
 * Official Statutory Settlements, Device Authorizations & Support
 */

import React, { useState } from 'react';
import {
  CreditCard,
  Smartphone,
  Shield,
  HelpCircle,
  LogOut,
  CheckCircle2,
  Lock,
  ExternalLink,
  Receipt,
  FileText,
} from 'lucide-react';
import { useClientCase } from '../../../context/ClientCaseContext';
import { useAuth } from '../../../context/AuthContext';
import { StatusBadge } from '../../common/StatusBadge';

interface ClientAccountSectionProps {
  activeSubModule: string;
  onNavigateModule: (moduleId: string) => void;
}

export const ClientAccountSection: React.FC<ClientAccountSectionProps> = ({
  activeSubModule,
  onNavigateModule,
}) => {
  const { profile } = useClientCase();
  const { currentUser, logout } = useAuth();

  const [simulatingPayment, setSimulatingPayment] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const handleSimulatePayment = () => {
    setSimulatingPayment(true);
    setTimeout(() => {
      setSimulatingPayment(false);
      setPaymentDone(true);
      setTimeout(() => setPaymentDone(false), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-5 text-xs">
      {/* Notice Banner */}
      <div className="border border-black/15 bg-neutral-50 p-3.5 text-xs text-neutral-600 dark:border-white/15 dark:bg-neutral-900/60 dark:text-neutral-400">
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 shrink-0 text-black dark:text-white mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-black dark:text-white">
              Demonstration Environment — Account & Settings Sandbox
            </p>
            <p className="text-[11px]">
              This function uses simulated demonstration data and does not create a legally valid identity verification, signature, notarization, certificate, seal, payment, or government record.
            </p>
          </div>
        </div>
      </div>

      {paymentDone && (
        <div className="border border-emerald-500 bg-emerald-50 p-3 text-xs text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
          ✓ Statutory notarial fee of ₱500.00 settled via Maya Sandbox. Official Electronic Receipt #OER-2026-914 generated.
        </div>
      )}

      {/* SUB-VIEW ROUTING */}
      {activeSubModule === 'principal-payments' ? (
        /* STATUTORY PAYMENTS & RECEIPTS (Preserving existing payment flow) */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 pb-3 dark:border-white/10">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                Statutory Notarial Fee Settlements
              </h3>
              <p className="text-xs text-neutral-500">
                Authorized electronic payment channels pursuant to Supreme Court 2004 Rules on Notarial Practice and A.M. No. 24-10-14-SC.
              </p>
            </div>
            <StatusBadge status="MAYA / GCASH INTEGRATION" variant="info" size="sm" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-black/20 bg-neutral-50 text-[11px] font-semibold text-neutral-600 dark:border-white/20 dark:bg-neutral-900 dark:text-neutral-400">
                <tr>
                  <th className="p-2.5">Billing Reference</th>
                  <th className="p-2.5">Item Description</th>
                  <th className="p-2.5">Statutory Amount</th>
                  <th className="p-2.5">Payment State</th>
                  <th className="p-2.5 text-right">Settlement Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/10 font-mono text-[11px]">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                  <td className="p-2.5 font-bold">INV-2026-0814-01</td>
                  <td className="p-2.5 font-sans">Remote Notarization of Special Power of Attorney</td>
                  <td className="p-2.5 font-bold">₱500.00</td>
                  <td className="p-2.5">
                    <StatusBadge status={paymentDone ? 'SETTLED' : 'AWAITING_PAYMENT'} size="sm" />
                  </td>
                  <td className="p-2.5 text-right font-sans">
                    {!paymentDone ? (
                      <button
                        onClick={handleSimulatePayment}
                        disabled={simulatingPayment}
                        className="border border-black bg-black px-3 py-1 text-[11px] font-semibold text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black cursor-pointer disabled:opacity-50"
                      >
                        {simulatingPayment ? 'Settling...' : 'Simulate Maya QR'}
                      </button>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                        Receipt #OER-2026-914
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : activeSubModule === 'principal-devices' ? (
        /* AUTHORIZED DEVICES */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 pb-3 dark:border-white/10">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                Authorized Client Hardware & Trusted Devices
              </h3>
              <p className="text-xs text-neutral-500">
                Cryptographic hardware tokens and registered signing workstations.
              </p>
            </div>
            <StatusBadge status="SECURE ENCLAVE" variant="success" size="sm" />
          </div>

          <div className="space-y-3">
            <div className="border border-black/10 p-3 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5" />
                <div>
                  <div className="font-bold text-xs">Apple MacBook Pro 16" (Current Session)</div>
                  <div className="text-[10px] font-mono text-neutral-500">
                    Fingerprint: DFP-MAC-APPLE-2026 • Last Active: Just now
                  </div>
                </div>
              </div>
              <span className="text-emerald-600 font-bold text-[10px] border border-emerald-500 px-2 py-0.5">
                PRIMARY TRUSTED
              </span>
            </div>
          </div>
        </div>
      ) : activeSubModule === 'principal-support' ? (
        /* HELP AND SUPPORT */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 pb-3 dark:border-white/10">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                Client Support & Regulatory Assistance
              </h3>
              <p className="text-xs text-neutral-500">
                Guidance on Supreme Court A.M. No. 24-10-14-SC electronic notarization rules.
              </p>
            </div>
            <HelpCircle className="h-4 w-4 text-neutral-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-black/10 p-4 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 space-y-2">
              <h4 className="font-bold text-xs">Helpdesk Contacts</h4>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                Email: support@dhenze-notary.ph
                <br />
                Direct Hotline: +63 (2) 8888-0814
                <br />
                Office Hours: Monday - Friday, 8:00 AM - 5:00 PM PHT
              </p>
            </div>

            <div className="border border-black/10 p-4 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 space-y-2">
              <h4 className="font-bold text-xs">Supreme Court Rules Repository</h4>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                A.M. No. 24-10-14-SC establishes rules for Remote and In-Person Electronic Notarization across Philippine jurisdictions.
              </p>
            </div>
          </div>
        </div>
      ) : activeSubModule === 'principal-sign-out' ? (
        /* SIGN OUT */
        <div className="border border-black/15 bg-white p-6 dark:border-white/15 dark:bg-neutral-950 space-y-4 text-center max-w-md mx-auto">
          <LogOut className="h-8 w-8 mx-auto text-neutral-400" />
          <h3 className="text-sm font-bold text-black dark:text-white">
            Terminate Client Session
          </h3>
          <p className="text-xs text-neutral-500">
            Securely revoke local session keys and log out of the Dhenze Electronic Notarization Facility.
          </p>
          <button
            onClick={() => {
              logout();
              window.location.href = '/sign-in';
            }}
            className="w-full border border-black bg-black py-2.5 font-semibold text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black cursor-pointer"
          >
            Confirm Sign Out
          </button>
        </div>
      ) : (
        /* DEFAULT PROFILE VIEW */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 pb-3 dark:border-white/10">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                Account Settings & Credentials
              </h3>
              <p className="text-xs text-neutral-500">
                Manage personal profile, authenticated login identifiers, and privacy preferences.
              </p>
            </div>
            <StatusBadge status="ACTIVE ACCOUNT" variant="success" size="sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <span className="text-neutral-500 text-[10px] uppercase">Account Holder:</span>
              <p className="font-bold font-sans text-sm">{currentUser.name}</p>
            </div>
            <div>
              <span className="text-neutral-500 text-[10px] uppercase">Official Email:</span>
              <p>{currentUser.email}</p>
            </div>
            <div>
              <span className="text-neutral-500 text-[10px] uppercase">Role:</span>
              <p>{currentUser.role}</p>
            </div>
            <div>
              <span className="text-neutral-500 text-[10px] uppercase">Internal Person Reference:</span>
              <p className="font-bold">{profile.internalPersonId}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
