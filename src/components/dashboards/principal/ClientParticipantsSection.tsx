/**
 * Dhenze Electronic Notarization Facility (Dhenze ENF)
 * Client Participants & Witness Management Module
 * Authorization, Invitations, Role Conflict Checks, and Masked Internal Lookup
 */

import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Mail,
  Smartphone,
  Search,
  Key,
  Eye,
  FileCheck,
} from 'lucide-react';
import { useClientCase } from '../../../context/ClientCaseContext';
import { StatusBadge } from '../../common/StatusBadge';
import { CaseParticipantRole } from '../../../types/client-case';

interface ClientParticipantsSectionProps {
  activeSubModule: string;
}

export const ClientParticipantsSection: React.FC<ClientParticipantsSectionProps> = ({
  activeSubModule,
}) => {
  const {
    activeCase,
    inviteWitness,
    performMaskedInternalLookup,
  } = useClientCase();

  // Invite Witness Form State
  const [witnessName, setWitnessName] = useState('');
  const [witnessEmail, setWitnessEmail] = useState('');
  const [witnessPhone, setWitnessPhone] = useState('+63 917 555 1290');
  const [witnessRole, setWitnessRole] = useState<CaseParticipantRole>('INSTRUMENT_WITNESS');
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);
  const [invitationSuccess, setInvitationSuccess] = useState<string | null>(null);

  // Masked Lookup State
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState<{
    found: boolean;
    maskedName?: string;
    maskedMobile?: string;
    internalPersonId?: string;
    disclaimer: string;
  } | null>(null);

  // Check role conflict when name or role changes
  const handleNameChange = (val: string) => {
    setWitnessName(val);
    if (
      val.toLowerCase().includes('maria') ||
      val.toLowerCase().includes('santos') ||
      val.toLowerCase().includes('dhenze') ||
      val.toLowerCase().includes('enp') ||
      val.toLowerCase().includes('beneficiary')
    ) {
      setConflictWarning('Potential role conflict detected — professional review required');
    } else {
      setConflictWarning(null);
    }
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!witnessName.trim() || !witnessEmail.trim() || !activeCase) return;

    inviteWitness(
      activeCase.caseId,
      witnessName.trim(),
      witnessEmail.trim(),
      witnessPhone,
      witnessRole
    );

    setInvitationSuccess(
      `Invitation dispatched to ${witnessName}. A time-limited secure link (valid for 48 hours) has been generated.`
    );
    setWitnessName('');
    setWitnessEmail('');
    setTimeout(() => setInvitationSuccess(null), 6000);
  };

  const handleRunLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupQuery.trim()) return;
    const res = performMaskedInternalLookup(lookupQuery);
    setLookupResult(res);
  };

  if (!activeCase) {
    return (
      <div className="border border-black/15 bg-white p-6 dark:border-white/15 dark:bg-neutral-950 text-xs">
        Please select or create an active case to manage participants.
      </div>
    );
  }

  return (
    <div className="space-y-5 text-xs">
      {/* Notice Banner */}
      <div className="border border-black/15 bg-neutral-50 p-3.5 text-xs text-neutral-600 dark:border-white/15 dark:bg-neutral-900/60 dark:text-neutral-400">
        <div className="flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 text-black dark:text-white mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-black dark:text-white">
              Demonstration Environment — Participant Sandbox
            </p>
            <p className="text-[11px]">
              This function uses simulated demonstration data and does not create a legally valid identity verification, signature, notarization, certificate, seal, payment, or government record.
            </p>
          </div>
        </div>
      </div>

      {invitationSuccess && (
        <div className="border border-emerald-500 bg-emerald-50 p-3 text-xs text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
          {invitationSuccess}
        </div>
      )}

      {/* Case Header Context */}
      <div className="border border-black/20 bg-white p-4 dark:border-white/20 dark:bg-neutral-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[10px] font-mono uppercase text-neutral-500">
            Active Matter Participants
          </span>
          <h4 className="text-sm font-bold text-black dark:text-white">
            {activeCase.caseReference} • {activeCase.title}
          </h4>
        </div>
        <span className="border border-black/20 bg-neutral-100 px-2 py-0.5 text-xs font-mono dark:border-white/20 dark:bg-neutral-900">
          {activeCase.participants.length} Active Participants
        </span>
      </div>

      {/* SUB-VIEW: Invite Witness or All Participants */}
      {activeSubModule === 'principal-invite-witness' ? (
        /* Invite Witness Form */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 pb-3 dark:border-white/10">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                Authorize & Invite Instrumental Witness
              </h3>
              <p className="text-xs text-neutral-500">
                Rule 6 A.M. No. 24-10-14-SC: Witnesses must be disinterested parties with verified government credentials.
              </p>
            </div>
            <StatusBadge status="WITNESS ONBOARDING" variant="info" size="sm" />
          </div>

          <form onSubmit={handleInviteSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold uppercase text-[10px] text-neutral-500 mb-1">
                  Witness Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={witnessName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g., Atty. Roberto Cruz"
                  className="w-full border border-black/20 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-black"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[10px] text-neutral-500 mb-1">
                  Participant Role
                </label>
                <select
                  value={witnessRole}
                  onChange={(e) => setWitnessRole(e.target.value as CaseParticipantRole)}
                  className="w-full border border-black/20 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-black"
                >
                  <option value="INSTRUMENT_WITNESS">Instrumental Witness</option>
                  <option value="AUTHORIZED_REPRESENTATIVE">Authorized Representative</option>
                  <option value="SIGNER">Co-Signer</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[10px] text-neutral-500 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={witnessEmail}
                  onChange={(e) => setWitnessEmail(e.target.value)}
                  placeholder="roberto.cruz@lawfirm.ph"
                  className="w-full border border-black/20 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-black"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[10px] text-neutral-500 mb-1">
                  Mobile Phone (SMS Dispatch)
                </label>
                <input
                  type="text"
                  value={witnessPhone}
                  onChange={(e) => setWitnessPhone(e.target.value)}
                  className="w-full border border-black/20 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-black"
                />
              </div>
            </div>

            {/* Conflict of Interest Warning Banner */}
            {conflictWarning && (
              <div className="border border-amber-500 bg-amber-50 p-3 text-xs text-amber-900 dark:bg-amber-950/50 dark:text-amber-300 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-bold">{conflictWarning}</p>
                  <p className="text-[11px] mt-0.5">
                    Under the 2004 Rules on Notarial Practice and Supreme Court ethical canons, an instrumental witness must not be a beneficiary, grantee, or attorney-in-fact in the instrument.
                  </p>
                </div>
              </div>
            )}

            <div className="border border-black/10 p-3 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 text-[11px] text-neutral-600 dark:text-neutral-400 space-y-1">
              <p className="font-semibold text-black dark:text-white">
                Witness Data Minimization & Privacy Safeguards
              </p>
              <p>
                Invited witnesses only receive access to the specific instrument clauses requiring their presence. They cannot view your internal person identifier, private payment data, or unrelated case files.
              </p>
            </div>

            <div className="pt-3 border-t border-black/10 dark:border-white/10 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-1.5 border border-black bg-black px-4 py-2 font-semibold text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 cursor-pointer"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Issue Secure Witness Invitation</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Participants Registry Table */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 pb-3 dark:border-white/10">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                Case Participants Registry
              </h3>
              <p className="text-xs text-neutral-500">
                Verified principals, signers, and disinterested witnesses authorized for this matter.
              </p>
            </div>
            <StatusBadge status="ACTIVE AUTHORIZATIONS" variant="success" size="sm" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-black/20 bg-neutral-50 text-[11px] font-semibold text-neutral-600 dark:border-white/20 dark:bg-neutral-900 dark:text-neutral-400">
                <tr>
                  <th className="p-2.5">Participant Name</th>
                  <th className="p-2.5">Case Role</th>
                  <th className="p-2.5">Contact Email</th>
                  <th className="p-2.5">Identity Status</th>
                  <th className="p-2.5">Authorization</th>
                  <th className="p-2.5 text-right">Privacy Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/10 font-mono text-[11px]">
                {(activeCase.participants || []).map((p) => (
                  <tr key={p.caseParticipantId} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                    <td className="p-2.5 font-sans font-bold">{p.fullName}</td>
                    <td className="p-2.5 font-sans">
                      <span className="border border-black/20 px-1.5 py-0.5 text-[10px]">
                        {p.role}
                      </span>
                    </td>
                    <td className="p-2.5 text-neutral-500">{p.email}</td>
                    <td className="p-2.5">
                      <StatusBadge
                        status={p.status === 'ACTIVE' ? 'VERIFIED_EKYC' : 'PENDING_VERIFICATION'}
                        size="sm"
                      />
                    </td>
                    <td className="p-2.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-right font-sans text-neutral-500">
                      {p.role === 'PRINCIPAL' ? 'Full Case Access' : 'Minimally Scoped'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Masked Internal Person Lookup Tool (Section 9) */}
      <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-xs">Firm Masked Internal Person Lookup</h4>
            <p className="text-[11px] text-neutral-500">
              Assists support staff and clients in safely locating internal person files with privacy-preserving redaction.
            </p>
          </div>
          <span className="font-mono text-[10px] border border-black/20 px-2 py-0.5">
            Privacy Filter Active
          </span>
        </div>

        <form onSubmit={handleRunLookup} className="flex gap-2">
          <input
            type="text"
            value={lookupQuery}
            onChange={(e) => setLookupQuery(e.target.value)}
            placeholder="Enter name, email, or internal person ID..."
            className="flex-1 border border-black/20 bg-white p-2 text-xs font-mono dark:border-white/20 dark:bg-black"
          />
          <button
            type="submit"
            className="flex items-center gap-1 border border-black bg-black px-4 py-2 font-semibold text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black cursor-pointer"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search</span>
          </button>
        </form>

        {lookupResult && (
          <div className="border border-black/10 p-3 bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 space-y-2">
            {lookupResult.found ? (
              <div className="font-mono text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Masked Name:</span>
                  <span className="font-bold">{lookupResult.maskedName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Masked Mobile:</span>
                  <span>{lookupResult.maskedMobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Internal Reference:</span>
                  <span className="font-bold">{lookupResult.internalPersonId}</span>
                </div>
                <p className="text-[10px] text-amber-700 dark:text-amber-400 font-sans italic pt-1">
                  {lookupResult.disclaimer}
                </p>
              </div>
            ) : (
              <div className="text-neutral-500 font-mono text-xs">
                No matching internal record located for query.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
