import React, { useState } from 'react';
import { PageHeader } from '../common/PageHeader';
import { SummaryCard } from '../common/SummaryCard';
import { StatusBadge } from '../common/StatusBadge';
import { DetailsDrawer } from '../common/DetailsDrawer';
import { ConfirmationDialog } from '../common/ConfirmationDialog';
import {
  FilePlus,
  ShieldCheck,
  Video,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  FileText,
  UserCheck,
  Send,
  Eye,
  Camera,
  RefreshCw,
  AlertCircle,
  Calendar,
  CreditCard,
  Download,
  HelpCircle,
  Lock,
  Search,
  CheckCircle,
  FileBadge,
} from 'lucide-react';
import { useNotarization } from '../../context/NotarizationContext';
import { useAuth } from '../../context/AuthContext';
import { NotarizationMode, NotarialAct, NotarizationRequest } from '../../types';
import { truncateHash, sha256 } from '../../utils/crypto';
import { ClientJourneyTracker } from './principal/ClientJourneyTracker';
import { ClientIdentitySection } from './principal/ClientIdentitySection';
import { ClientCasesSection } from './principal/ClientCasesSection';
import { ClientParticipantsSection } from './principal/ClientParticipantsSection';
import { ClientEvidenceSection } from './principal/ClientEvidenceSection';
import { ClientConsultationSection } from './principal/ClientConsultationSection';
import { ClientNotarizationSection } from './principal/ClientNotarizationSection';
import { ClientAccountSection } from './principal/ClientAccountSection';
import { useClientCase } from '../../context/ClientCaseContext';

interface PrincipalDashboardProps {
  activeModuleId: string;
  onSelectModule: (id: string) => void;
}

export const PrincipalDashboard: React.FC<PrincipalDashboardProps> = ({
  activeModuleId,
  onSelectModule,
}) => {
  const { requests, createRequest, updateState } = useNotarization();
  const { currentUser } = useAuth();

  // New Request Form State
  const [title, setTitle] = useState('');
  const [docType, setDocType] = useState('Special Power of Attorney');
  const [mode, setMode] = useState<NotarizationMode>('REN');
  const [notarialAct, setNotarialAct] = useState<NotarialAct>('ACKNOWLEDGMENT');
  const [fileName, setFileName] = useState('Special_Power_of_Attorney_2026.pdf');
  const [fileHash, setFileHash] = useState<string>('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  const [submitting, setSubmitting] = useState(false);
  const [witnessName, setWitnessName] = useState('Atty. Roberto Cruz (Witness)');
  const [requestCreatedNotice, setRequestCreatedNotice] = useState<string | null>(null);

  // Selected Request for Viewing / Signing Simulation
  const [selectedRequest, setSelectedRequest] = useState<NotarizationRequest | null>(null);
  const [sessionRoomOpen, setSessionRoomOpen] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [livenessScore, setLivenessScore] = useState<number | null>(null);
  const [scanningLiveness, setScanningLiveness] = useState(false);
  const [filterState, setFilterState] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // 8-Category Navigation Matchers
  const isIdentityModule = [
    'principal-personal-info',
    'principal-contact-info',
    'principal-id-documents',
    'principal-identity',
    'principal-liveness',
    'principal-consent',
    'principal-verify-history',
    'principal-security-mfa',
  ].includes(activeModuleId);

  const isCasesModule = [
    'principal-requests',
    'principal-active-cases',
    'principal-awaiting-client',
    'principal-awaiting-lawyer',
    'principal-ready-signing',
    'principal-completed',
    'principal-refused',
    'principal-archived',
  ].includes(activeModuleId);

  const isParticipantsModule = [
    'principal-participants',
    'principal-invite-witness',
    'principal-pending-invitations',
    'principal-participation-requests',
    'principal-id-requirements',
    'principal-participant-access',
  ].includes(activeModuleId);

  const isEvidenceModule = [
    'principal-documents',
    'principal-upload-docs',
    'principal-camera-capture',
    'principal-photographs',
    'principal-audio-evidence',
    'principal-video-evidence',
    'principal-testimonies',
    'principal-supporting-docs',
    'principal-ai-organized',
    'principal-duplicate-review',
    'principal-shared-lawyer',
  ].includes(activeModuleId);

  const isConsultationModule = [
    'principal-lawyer-messages',
    'principal-calendar',
    'principal-live-sessions',
    'principal-meeting-history',
    'principal-shared-screen',
    'principal-consultation-notes',
    'principal-action-items',
  ].includes(activeModuleId);

  const isNotarizationModule = [
    'principal-notarization-requests',
    'principal-appearance-reqs',
    'principal-signing-session',
    'principal-reverify',
    'principal-notarial-status',
    'principal-completed-docs',
    'principal-hash-qr',
  ].includes(activeModuleId);

  const isAccountModule = [
    'principal-profile',
    'principal-privacy',
    'principal-devices',
    'principal-security-settings',
    'principal-payments',
    'principal-support',
    'principal-sign-out',
  ].includes(activeModuleId);

  // Payment simulator state
  const [paidReqId, setPaidReqId] = useState<string | null>(null);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      const participants = [currentUser.name];
      if (witnessName.trim()) participants.push(witnessName.trim());

      const newReq = await createRequest({
        title,
        documentType: docType,
        mode,
        notarialAct,
        originalFilename: fileName,
        fileSize: Math.floor(450000 + Math.random() * 2000000),
        requesterName: currentUser.name,
        requesterEmail: currentUser.email,
        participantNames: participants,
      });

      setRequestCreatedNotice(`Filing ${newReq.referenceNumber} successfully staged in demonstration quarantine.`);
      setTitle('');
      onSelectModule('principal-requests');
      setTimeout(() => setRequestCreatedNotice(null), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const text = `${file.name}-${file.size}-${Date.now()}`;
      const hash = await sha256(text);
      setFileHash(hash);
    }
  };

  const startLivenessScan = () => {
    setScanningLiveness(true);
    setTimeout(() => {
      setScanningLiveness(false);
      setLivenessScore(98.6);
    }, 1200);
  };

  const handleSimulatePayment = (reqId: string) => {
    setPaidReqId(reqId);
    setTimeout(() => {
      updateState(reqId, 'SCHEDULED', 'Statutory notarial fee settled via Maya sandbox.');
      setPaidReqId(null);
    }, 1000);
  };

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    if (filterState !== 'ALL' && r.state !== filterState) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.referenceNumber.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.documentType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const completedRequests = requests.filter((r) => r.state === 'COMPLETED');
  const scheduledRequests = requests.filter((r) => r.state === 'SCHEDULED');
  const pendingRequests = requests.filter(
    (r) => r.state !== 'COMPLETED' && r.state !== 'REFUSED' && r.state !== 'CANCELLED'
  );

  return (
    <div id="principal-dashboard-view" className="space-y-6">
      <PageHeader
        breadcrumbs={[{ label: 'Parties' }, { label: 'Signer & Principal Workspace', active: true }]}
        title="Signer & Principal Workspace"
        purpose="Initiate demonstrative notarial filings, complete identity preparation, track quarantine screening, and participate in scheduled videoconference hearings."
        statusBadge={<StatusBadge status="PRINCIPAL ROLE" variant="info" />}
        primaryAction={{
          label: 'Start Notarization Request (Demo)',
          icon: FilePlus,
          onClick: () => onSelectModule('principal-start'),
        }}
        secondaryActions={[
          {
            label: 'My Documents',
            icon: FileText,
            onClick: () => onSelectModule('principal-documents'),
          },
        ]}
      />

      {requestCreatedNotice && (
        <div className="border border-emerald-500 bg-emerald-50 p-3 text-xs text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
          {requestCreatedNotice}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="Active Filings"
          value={pendingRequests.length}
          subtext="In review or processing"
          icon={FileText}
        />
        <SummaryCard
          label="Scheduled Hearings"
          value={scheduledRequests.length}
          subtext="Awaiting videoconference slot"
          icon={Calendar}
          trend={{ value: 'Awaiting hearing', positive: true }}
        />
        <SummaryCard
          label="Completed Instruments"
          value={completedRequests.length}
          subtext="Demo notarial certificates"
          icon={CheckCircle2}
        />
        <SummaryCard
          label="Identity Readiness"
          value={livenessScore ? `${livenessScore}% Passed` : 'eKYC Prepared'}
          subtext="PhilSys ePhilID active"
          icon={UserCheck}
          trend={{ value: 'Demo profile ready', positive: true }}
        />
      </div>

      {/* Legal & Security Safeguard Banner */}
      <div className="border border-black/20 bg-neutral-100 p-4 dark:border-white/20 dark:bg-neutral-900 text-xs space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="h-4 w-4 text-black dark:text-white shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-black dark:text-white uppercase tracking-wider font-mono">
                DEMONSTRATION ENVIRONMENT — NOT FOR LEGAL USE
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                This function uses simulated demonstration data and does not create a legally valid identity verification, signature, notarization, certificate, seal, payment, or government record.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono border border-black/30 px-2 py-0.5 dark:border-white/30 shrink-0">
            A.M. No. 24-10-14-SC
          </span>
        </div>
        <div className="flex flex-wrap gap-2 text-[10px] font-mono text-neutral-500 pt-1.5 border-t border-black/10 dark:border-white/10">
          <span>APP_ENV=demo</span>
          <span>•</span>
          <span>DEMO_MODE=true</span>
          <span>•</span>
          <span>DEMO_LEGAL_VALIDITY=false</span>
          <span>•</span>
          <span>EGOVPH=simulated</span>
          <span>•</span>
          <span>PHILSYS=simulated</span>
          <span>•</span>
          <span>MALWARE_SCANNER=simulated</span>
          <span>•</span>
          <span>NOTARIZATION=simulated</span>
        </div>
      </div>

      {/* 24-Step Client Journey Tracker */}
      <ClientJourneyTracker onNavigateModule={onSelectModule} />

      {/* SUB-VIEWS */}
      {isIdentityModule ? (
        <ClientIdentitySection activeSubModule={activeModuleId} />
      ) : isCasesModule ? (
        <ClientCasesSection activeSubModule={activeModuleId} onNavigateModule={onSelectModule} />
      ) : isParticipantsModule ? (
        <ClientParticipantsSection activeSubModule={activeModuleId} />
      ) : isEvidenceModule ? (
        <ClientEvidenceSection activeSubModule={activeModuleId} />
      ) : isConsultationModule ? (
        <ClientConsultationSection activeSubModule={activeModuleId} />
      ) : isNotarizationModule ? (
        <ClientNotarizationSection activeSubModule={activeModuleId} onNavigateModule={onSelectModule} />
      ) : isAccountModule ? (
        <ClientAccountSection activeSubModule={activeModuleId} onNavigateModule={onSelectModule} />
      ) : activeModuleId === 'principal-start' ? (
        /* Request Intake Wizard */
        <div className="border border-black/15 bg-white p-6 dark:border-white/15 dark:bg-neutral-950 space-y-6">
          <div className="flex items-center justify-between border-b border-black/10 pb-3 dark:border-white/10">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                Initiate Notarization Request (Demonstration Workflow)
              </h3>
              <p className="text-xs text-neutral-500">
                Phase A & B: Document Intake, WebCrypto SHA-256 Hashing & Quarantine Screening
              </p>
            </div>
            <span className="text-[10px] font-mono border border-black/20 px-2 py-0.5 dark:border-white/20">
              A.M. No. 24-10-14-SC
            </span>
          </div>

          <form onSubmit={handleCreateSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold uppercase text-[10px] text-neutral-500 mb-1">
                    Document Title / Instrument Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Special Power of Attorney for Real Property"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-black/20 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold uppercase text-[10px] text-neutral-500 mb-1">
                      Document Type
                    </label>
                    <select
                      value={docType}
                      onChange={(e) => setDocType(e.target.value)}
                      className="w-full border border-black/20 bg-white p-2 text-xs dark:border-white/20 dark:bg-black"
                    >
                      <option value="Special Power of Attorney">Special Power of Attorney</option>
                      <option value="Affidavit">Affidavit of Loss / Facts</option>
                      <option value="Contract / Agreement">Commercial Contract / Lease</option>
                      <option value="Board Resolution">Board Resolution / Secretary Cert</option>
                      <option value="Deed of Sale">Deed of Absolute Sale</option>
                      <option value="Last Will and Testament (Excluded)">Last Will & Testament (Will Test Exclusion)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-[10px] text-neutral-500 mb-1">
                      Notarial Act
                    </label>
                    <select
                      value={notarialAct}
                      onChange={(e) => setNotarialAct(e.target.value as NotarialAct)}
                      className="w-full border border-black/20 bg-white p-2 text-xs dark:border-white/20 dark:bg-black"
                    >
                      <option value="ACKNOWLEDGMENT">Acknowledgment</option>
                      <option value="JURAT">Jurat (Oath or Affirmation)</option>
                      <option value="OATH_AFFIRMATION">Oath / Affirmation</option>
                      <option value="SIGNATURE_WITNESSING">Signature Witnessing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-[10px] text-neutral-500 mb-1">
                    Instrumental Witness (Optional)
                  </label>
                  <input
                    type="text"
                    value={witnessName}
                    onChange={(e) => setWitnessName(e.target.value)}
                    placeholder="e.g., Atty. Roberto Cruz (Witness)"
                    className="w-full border border-black/20 bg-white p-2 text-xs dark:border-white/20 dark:bg-black"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-semibold uppercase text-[10px] text-neutral-500 mb-1">
                    Notarization Mode
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMode('REN')}
                      className={`border p-3 text-left transition-all cursor-pointer ${
                        mode === 'REN'
                          ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black font-semibold'
                          : 'border-black/20 bg-white text-black dark:border-white/20 dark:bg-black dark:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <Video className="h-4 w-4" />
                        <span className="text-xs">REN (Remote)</span>
                      </div>
                      <p className="text-[10px] opacity-80">
                        Synchronous encrypted WebRTC video conference.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMode('IEN')}
                      className={`border p-3 text-left transition-all cursor-pointer ${
                        mode === 'IEN'
                          ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black font-semibold'
                          : 'border-black/20 bg-white text-black dark:border-white/20 dark:bg-black dark:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <MapPin className="h-4 w-4" />
                        <span className="text-xs">IEN (In-Person)</span>
                      </div>
                      <p className="text-[10px] opacity-80">
                        Physical appearance with electronic tablet signing.
                      </p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-[10px] text-neutral-500 mb-1">
                    Document File & Cryptographic Hash
                  </label>
                  <div className="border border-dashed border-black/30 p-3.5 bg-neutral-50 dark:border-white/30 dark:bg-neutral-900 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{fileName}</span>
                      <label className="border border-black/20 bg-white px-2.5 py-1 text-[11px] cursor-pointer hover:bg-neutral-100 dark:border-white/20 dark:bg-black dark:hover:bg-neutral-800">
                        Browse PDF
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div className="font-mono text-[10px] break-all text-neutral-500 border-t border-black/10 pt-1.5 dark:border-white/10">
                      SHA-256: {fileHash}
                    </div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      ✓ Isolated Client Sandbox: Quarantine cleared via synthetic scan.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => onSelectModule('principal-overview')}
                className="border border-black/20 px-4 py-2 text-xs hover:bg-neutral-100 dark:border-white/20 dark:hover:bg-neutral-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-1.5 border border-black bg-black px-5 py-2 text-xs font-semibold text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 cursor-pointer disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{submitting ? 'Staging Request...' : 'Submit Request (Demonstration)'}</span>
              </button>
            </div>
          </form>
        </div>
      ) : activeModuleId === 'principal-documents' ? (
        /* Documents Inspection Module */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                Cryptographic Document Inspection Vault
              </h3>
              <p className="text-xs text-neutral-500">
                Inspect SHA-256 hashes, PDF/A ISO 19005 archival conformance, and synthetic quarantine verification logs.
              </p>
            </div>
            <StatusBadge status="PDF/A CONFORMANT" variant="success" size="sm" />
          </div>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-black/20 bg-neutral-50 text-[11px] font-semibold text-neutral-600 dark:border-white/20 dark:bg-neutral-900 dark:text-neutral-400">
                <tr>
                  <th className="p-2.5">Filing Ref</th>
                  <th className="p-2.5">Instrument Title</th>
                  <th className="p-2.5">Original File</th>
                  <th className="p-2.5">SHA-256 Digest</th>
                  <th className="p-2.5">Quarantine Scan</th>
                  <th className="p-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/10 font-mono text-[11px]">
                {requests.map((r) => (
                  <tr key={r.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                    <td className="p-2.5 font-bold">{r.referenceNumber}</td>
                    <td className="p-2.5 font-sans font-medium">{r.title}</td>
                    <td className="p-2.5 font-sans text-neutral-500">{r.document.originalFilename}</td>
                    <td className="p-2.5 truncate max-w-[180px] text-neutral-600 dark:text-neutral-400">
                      {r.document.pdfaSha256}
                    </td>
                    <td className="p-2.5">
                      <StatusBadge status="QUARANTINE_CLEARED" size="sm" />
                    </td>
                    <td className="p-2.5 text-right font-sans">
                      <button
                        onClick={() => setSelectedRequest(r)}
                        className="border border-black/20 px-2 py-1 text-[11px] hover:bg-neutral-100 dark:border-white/20 dark:hover:bg-neutral-900"
                      >
                        Inspect Hash
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeModuleId === 'principal-identity' ? (
        /* Identity & eKYC Readiness Module */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                PSA PhilSys / Passport Identity Verification (Demonstration)
              </h3>
              <p className="text-xs text-neutral-500">
                Pre-session camera diagnostic, facial alignment, and passive liveness analysis.
              </p>
            </div>
            <StatusBadge status="DEMO EKYC" variant="demo" size="sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="border border-black/10 p-4 space-y-3 bg-neutral-50 dark:bg-neutral-900">
              <h4 className="text-xs font-bold uppercase text-neutral-500">
                Philippine Government-Issued Credential
              </h4>
              <div className="font-mono text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Signer Name:</span>
                  <span className="font-bold">{currentUser.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Credential Type:</span>
                  <span>PSA National ID (PhilSys ePhilID)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Card Number:</span>
                  <span>•••• •••• 9104</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Issuing Authority:</span>
                  <span>Philippine Statistics Authority (PSA)</span>
                </div>
              </div>
            </div>

            <div className="border border-black/10 p-4 space-y-3 bg-neutral-50 dark:bg-neutral-900 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase text-neutral-500">
                  Camera Passive Liveness Diagnostic
                </h4>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Confirms physical presence in the Philippines and deters deepfake spoofing.
                </p>
                {livenessScore && (
                  <div className="mt-2 text-emerald-600 dark:text-emerald-400 font-bold font-mono text-xs">
                    ✓ Confidence Score: {livenessScore}% (ISO/IEC 30107-3 Compliant)
                  </div>
                )}
              </div>

              <button
                onClick={startLivenessScan}
                disabled={scanningLiveness}
                className="flex items-center justify-center gap-1.5 border border-black bg-black py-2 text-xs font-semibold text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 cursor-pointer"
              >
                <Camera className="h-3.5 w-3.5" />
                <span>{scanningLiveness ? 'Analyzing Liveness...' : 'Run Passive Liveness Scan'}</span>
              </button>
            </div>
          </div>
        </div>
      ) : activeModuleId === 'principal-payments' ? (
        /* Statutory Payments Module */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                Statutory Notarial Fee Settlements
              </h3>
              <p className="text-xs text-neutral-500">
                Official fees pursuant to Supreme Court 2004 Rules on Notarial Practice and A.M. No. 24-10-14-SC.
              </p>
            </div>
            <StatusBadge status="MAYA / GCASH" variant="info" size="sm" />
          </div>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-black/20 bg-neutral-50 text-[11px] font-semibold text-neutral-600 dark:border-white/20 dark:bg-neutral-900 dark:text-neutral-400">
                <tr>
                  <th className="p-2.5">Filing Ref</th>
                  <th className="p-2.5">Instrument Title</th>
                  <th className="p-2.5">Notarial Act</th>
                  <th className="p-2.5">Statutory Fee</th>
                  <th className="p-2.5">Payment State</th>
                  <th className="p-2.5 text-right">Settlement Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/10 font-mono text-[11px]">
                {requests.map((r) => (
                  <tr key={r.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                    <td className="p-2.5 font-bold">{r.referenceNumber}</td>
                    <td className="p-2.5 font-sans font-medium">{r.title}</td>
                    <td className="p-2.5 font-sans">{r.notarialAct}</td>
                    <td className="p-2.5 font-bold">₱500.00</td>
                    <td className="p-2.5">
                      <StatusBadge
                        status={r.state === 'SCHEDULED' || r.state === 'COMPLETED' ? 'SETTLED' : 'AWAITING_PAYMENT'}
                        size="sm"
                      />
                    </td>
                    <td className="p-2.5 text-right font-sans">
                      {r.state === 'INTAKE_REVIEW' || r.state === 'NEEDS_INFORMATION' || r.state === 'UPLOADED_QUARANTINED' ? (
                        <button
                          onClick={() => handleSimulatePayment(r.id)}
                          disabled={paidReqId === r.id}
                          className="border border-black bg-black px-2.5 py-1 text-[11px] text-white font-semibold dark:border-white dark:bg-white dark:text-black"
                        >
                          {paidReqId === r.id ? 'Settling...' : 'Simulate Maya QR'}
                        </button>
                      ) : (
                        <span className="text-xs text-neutral-500 font-mono">Receipt Generated</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeModuleId === 'principal-completed' ? (
        /* Completed Instruments & Certificates */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white">
                Completed Instruments & Demo Certificates
              </h3>
              <p className="text-xs text-neutral-500">
                Executed notarial certificates bearing demonstrative digital seals and notarial register references.
              </p>
            </div>
            <StatusBadge status="SEALED INSTRUMENTS" variant="demo" size="sm" />
          </div>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-black/20 bg-neutral-50 text-[11px] font-semibold text-neutral-600 dark:border-white/20 dark:bg-neutral-900 dark:text-neutral-400">
                <tr>
                  <th className="p-2.5">Reference No.</th>
                  <th className="p-2.5">Instrument Title</th>
                  <th className="p-2.5">Completed Date</th>
                  <th className="p-2.5">Notary Public</th>
                  <th className="p-2.5">Notarial Register</th>
                  <th className="p-2.5 text-right">Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/10 font-mono text-[11px]">
                {completedRequests.map((r) => (
                  <tr key={r.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                    <td className="p-2.5 font-bold">{r.referenceNumber}</td>
                    <td className="p-2.5 font-sans font-medium">{r.title}</td>
                    <td className="p-2.5">{new Date(r.updatedAt).toLocaleDateString()}</td>
                    <td className="p-2.5 font-sans">Atty. Juan Dela Cruz</td>
                    <td className="p-2.5 text-neutral-500">
                      Doc #413, Page 89, Book XIV, S. 2026
                    </td>
                    <td className="p-2.5 text-right font-sans">
                      <button
                        onClick={() => {
                          setSelectedRequest(r);
                          setSessionRoomOpen(true);
                        }}
                        className="border border-black bg-black px-2.5 py-1 text-[11px] text-white font-semibold dark:border-white dark:bg-white dark:text-black"
                      >
                        View Demo Certificate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Default / All Requests Overview */
        <div className="border border-black/15 bg-white p-5 dark:border-white/15 dark:bg-neutral-950 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-3 dark:border-white/10">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-black dark:text-white">
                My Notarization Filings Portfolio
              </h3>
              <span className="text-xs font-mono text-neutral-500">
                ({filteredRequests.length} filings)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-56">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search filings..."
                  className="w-full border border-black/20 bg-white py-1.5 pl-8 pr-2.5 text-xs dark:border-white/20 dark:bg-black"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-black/20 bg-neutral-50 text-[11px] font-semibold text-neutral-600 dark:border-white/20 dark:bg-neutral-900 dark:text-neutral-400">
                <tr>
                  <th className="p-2.5">Reference No.</th>
                  <th className="p-2.5">Instrument Title</th>
                  <th className="p-2.5">Mode & Act</th>
                  <th className="p-2.5">Quarantine & Hash</th>
                  <th className="p-2.5">State</th>
                  <th className="p-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/10 font-mono text-[11px]">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                    <td className="p-2.5 font-bold">{req.referenceNumber}</td>
                    <td className="p-2.5 font-sans">
                      <div className="font-semibold text-black dark:text-white">{req.title}</div>
                      <div className="text-[10px] text-neutral-500">{req.documentType}</div>
                    </td>
                    <td className="p-2.5 font-sans">
                      <span className="font-semibold">{req.mode}</span> • {req.notarialAct}
                    </td>
                    <td className="p-2.5">
                      <div className="flex items-center gap-1 text-[11px]">
                        <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                        <span className="font-mono">{truncateHash(req.document.pdfaSha256, 6, 4)}</span>
                      </div>
                      <span className="text-[10px] text-neutral-500">PDF/A Clean</span>
                    </td>
                    <td className="p-2.5">
                      <StatusBadge status={req.state} size="sm" />
                    </td>
                    <td className="p-2.5 text-right font-sans space-x-1">
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="border border-black/20 px-2 py-1 text-[11px] hover:bg-neutral-100 dark:border-white/20 dark:hover:bg-neutral-900"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRequest(req);
                          setSessionRoomOpen(true);
                        }}
                        className="border border-black bg-black px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black"
                      >
                        Ceremony
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Drawer */}
      <DetailsDrawer
        isOpen={!!selectedRequest && !sessionRoomOpen}
        onClose={() => setSelectedRequest(null)}
        title={selectedRequest?.referenceNumber || 'Filing Details'}
        subtitle={selectedRequest?.title}
      >
        {selectedRequest && (
          <div className="space-y-4 text-xs font-mono">
            <div>
              <span className="text-[10px] uppercase text-neutral-400">Document Type & Act</span>
              <p className="font-bold font-sans">{selectedRequest.documentType} ({selectedRequest.notarialAct})</p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-400">Filing Status</span>
              <div className="mt-1">
                <StatusBadge status={selectedRequest.state} size="sm" />
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-400">PDF/A Hash (SHA-256)</span>
              <p className="border border-black/10 p-2 text-[10px] break-all bg-neutral-50 dark:bg-neutral-900">
                {selectedRequest.document.pdfaSha256}
              </p>
            </div>
            <div className="pt-3 border-t border-black/10 dark:border-white/10 flex justify-end">
              <button
                onClick={() => setSessionRoomOpen(true)}
                className="border border-black bg-black px-3 py-1.5 text-xs text-white font-semibold dark:border-white dark:bg-white dark:text-black"
              >
                Enter Ceremony Workspace
              </button>
            </div>
          </div>
        )}
      </DetailsDrawer>

      {/* Interactive Ceremony & Document Signing Modal */}
      {sessionRoomOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="w-full max-w-4xl border border-black bg-white p-6 shadow-2xl max-h-[92vh] overflow-y-auto dark:border-white dark:bg-black space-y-6">
            <div className="flex items-center justify-between border-b border-black/15 pb-3 dark:border-white/15">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                  {selectedRequest.mode} Remote Ceremony Workspace • {selectedRequest.referenceNumber}
                </span>
                <h3 className="text-base font-bold">{selectedRequest.title}</h3>
              </div>
              <button
                onClick={() => setSessionRoomOpen(false)}
                className="border border-black px-2.5 py-1 text-xs hover:bg-neutral-100 dark:border-white dark:hover:bg-neutral-900 cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left 2 Cols: Document Viewer with Watermark */}
              <div className="md:col-span-2 border border-black/20 p-5 bg-neutral-50 space-y-4 dark:border-white/20 dark:bg-neutral-900">
                <div className="flex items-center justify-between border-b border-black/10 pb-2 dark:border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Synchronized PDF/A Document Viewer
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    Pages: 1 of {selectedRequest.document.pagesCount}
                  </span>
                </div>

                <div className="relative bg-white p-6 border border-neutral-300 min-h-[260px] text-xs font-serif leading-relaxed dark:bg-black dark:border-neutral-700 text-black dark:text-white space-y-3">
                  <div className="absolute top-2 right-2 border border-black bg-black px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white dark:border-white dark:bg-white dark:text-black">
                    DEMO — NOT LEGALLY VALID
                  </div>
                  <div className="text-center font-bold tracking-wider uppercase border-b pb-2">
                    REPUBLIC OF THE PHILIPPINES) S.S.
                    <br />
                    CITY OF MAKATI)
                  </div>
                  <p className="font-bold text-center underline">{selectedRequest.title}</p>
                  <p>
                    KNOW ALL MEN BY THESE PRESENTS: That I,{' '}
                    <strong>{selectedRequest.requester.name}</strong>, of legal age, Filipino, do
                    hereby name, constitute, and appoint the Attorney-in-Fact herein named to act in my name and stead...
                  </p>
                  <div className="pt-4 border-t border-dashed space-y-1 text-[11px] font-mono">
                    <p>DOCUMENT SHA-256: {selectedRequest.document.pdfaSha256}</p>
                    <p>ACT: {selectedRequest.notarialAct}</p>
                    <p>STATUS: {selectedRequest.state}</p>
                  </div>

                  {hasSigned && (
                    <div className="mt-4 border border-black p-2.5 bg-neutral-100 dark:border-white dark:bg-neutral-800 text-[11px] font-mono">
                      <div className="flex items-center gap-1.5 font-bold">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        DIGITAL SIGNATURE DEMO APPLIED (NOT LEGALLY VALID)
                      </div>
                      <p className="text-[10px] text-neutral-600 dark:text-neutral-400 mt-1">
                        Signer: {currentUser.name} • Timestamp: {new Date().toLocaleTimeString()}
                      </p>
                    </div>
                  )}

                  {selectedRequest.state === 'COMPLETED' && (
                    <div className="mt-4 border-2 border-dashed border-black p-4 text-center dark:border-white bg-neutral-50 dark:bg-neutral-900 font-mono">
                      <div className="text-xs font-bold uppercase tracking-wider">
                        DEMO — NOT A LEGALLY NOTARIZED DOCUMENT
                      </div>
                      <p className="text-[10px] text-neutral-500 mt-1">
                        Applied by Atty. Juan Dela Cruz (ENP Candidate) • Book XIV, Page 89, Doc #413
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500">
                    Demonstration Mode Only
                  </span>
                  {!hasSigned && selectedRequest.state !== 'COMPLETED' && (
                    <button
                      onClick={() => setHasSigned(true)}
                      className="border border-black bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 cursor-pointer"
                    >
                      Affix Principal Digital Signature (Demo)
                    </button>
                  )}
                </div>
              </div>

              {/* Right Col: Video & Hardware Status */}
              <div className="space-y-4">
                <div className="border border-black/20 p-4 space-y-3 dark:border-white/20 bg-neutral-50 dark:bg-neutral-900">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      Ceremony Attendees
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      ENP In Room
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between border border-black/10 p-2 bg-white dark:border-white/10 dark:bg-black">
                      <span>{currentUser.name} (Signer)</span>
                      <StatusBadge status="CONNECTED" variant="success" size="sm" />
                    </div>
                    <div className="flex items-center justify-between border border-black/10 p-2 bg-white dark:border-white/10 dark:bg-black">
                      <span>Atty. Juan Dela Cruz (ENP)</span>
                      <StatusBadge status="PRESIDING" variant="info" size="sm" />
                    </div>
                    <div className="flex items-center justify-between border border-black/10 p-2 bg-white dark:border-white/10 dark:bg-black">
                      <span>Atty. Roberto Cruz (Witness)</span>
                      <StatusBadge status="CONNECTED" variant="success" size="sm" />
                    </div>
                  </div>
                </div>

                <div className="border border-black/20 p-4 space-y-2 text-xs dark:border-white/20">
                  <h4 className="font-bold uppercase tracking-wider text-xs">ENP Commission</h4>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Atty. Juan Dela Cruz • Commission NP-2025-0814-MKT
                  </p>
                  <p className="text-[10px] text-neutral-500 font-mono">
                    Jurisdiction: Regional Trial Court (RTC) Makati City
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
