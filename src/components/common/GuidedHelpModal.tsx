import React from 'react';
import { X, BookOpen, ShieldAlert, CheckCircle, Scale, FileText } from 'lucide-react';

interface GuidedHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRole: string;
}

export const GuidedHelpModal: React.FC<GuidedHelpModalProps> = ({
  isOpen,
  onClose,
  activeRole,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col border border-black bg-white text-black shadow-2xl transition-colors dark:border-white dark:bg-black dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-4 dark:border-white/10">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <h2 id="help-modal-title" className="text-base font-bold">
              Barin ENF Operational Guide & Legal Disclosures
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close help modal"
            className="flex h-8 w-8 items-center justify-center border border-black/20 hover:bg-neutral-100 dark:border-white/20 dark:hover:bg-neutral-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {/* Candidate Notice */}
          <div className="border border-black/20 bg-neutral-50 p-4 dark:border-white/20 dark:bg-neutral-950">
            <div className="flex items-center gap-2 font-bold text-black dark:text-white">
              <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span>Accreditation Candidate Environment</span>
            </div>
            <p className="mt-1.5 text-[11px] text-neutral-600 dark:text-neutral-400">
              The Barin Electronic Notarization Facility (Barin ENF) is an accreditation candidate platform under the Supreme Court of the Philippines Rules on Electronic Notarization (A.M. No. 24-10-14-SC). No documents generated in this demonstration environment possess official legal validity.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-black dark:text-white flex items-center gap-1.5 mb-2">
              <Scale className="h-4 w-4" />
              <span>Philippine Legal Framework</span>
            </h3>
            <ul className="space-y-1.5 pl-4 list-disc text-[11px]">
              <li>
                <strong>2004 Rules on Notarial Practice (A.M. No. 02-8-13-SC):</strong> Preserves the fundamental requirement of personal appearance before a duly commissioned notary public.
              </li>
              <li>
                <strong>Supreme Court A.M. No. 24-10-14-SC:</strong> Governs Electronic Notarization (IEN and REN), requiring tamper-evident PDF/A documents, cryptographic X.509 seals, and audio-video recording archives.
              </li>
              <li>
                <strong>Republic Act No. 8792 (Electronic Commerce Act of 2000):</strong> Establishes the legal recognition of electronic signatures and documents.
              </li>
              <li>
                <strong>Republic Act No. 10173 (Data Privacy Act of 2012):</strong> Mandates strict privacy protection, biometric isolation, and non-disclosure of personal data beyond statutory notarial registry purposes.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-black dark:text-white flex items-center gap-1.5 mb-2">
              <CheckCircle className="h-4 w-4" />
              <span>Current Persona Context: {activeRole}</span>
            </h3>
            <p className="text-[11px]">
              You are currently reviewing the application as a <strong>{activeRole}</strong>. The left navigation sidebar dynamically presents only the authorized modules permitted for this role under strict principle of least privilege.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-black dark:text-white flex items-center gap-1.5 mb-2">
              <FileText className="h-4 w-4" />
              <span>Interactive Demonstration Workflow</span>
            </h3>
            <p className="text-[11px]">
              You can test the entire workflow from start to finish:
            </p>
            <ol className="mt-1.5 space-y-1 pl-4 list-decimal text-[11px]">
              <li>Switch to <strong>Principal</strong> &rarr; Click <em>Start a Request</em> &rarr; Upload a PDF (computes genuine client-side SHA-256 hash).</li>
              <li>Observe quarantine status and simulated malware / PDF/A checks.</li>
              <li>Switch to <strong>ENP Candidate</strong> &rarr; Open <em>Review Queue</em> &rarr; Inspect participant credentials and start REN ceremony.</li>
              <li>Conduct the ceremony checklist and click <em>Complete Demo Ceremony</em> &rarr; View demonstration seal and notarial book entry.</li>
              <li>Verify the issued reference code on the <strong>Public Verification Portal</strong>.</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-black/10 px-6 py-3 dark:border-white/10">
          <button
            onClick={onClose}
            className="border border-black bg-black px-4 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
