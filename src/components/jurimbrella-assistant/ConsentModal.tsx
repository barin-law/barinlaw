import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface ConsentModalProps {
  isOpen: boolean;
  onAgree: () => void;
  onCancel: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({
  isOpen,
  onAgree,
  onCancel,
}) => {
  const [agreedDisclaimer, setAgreedDisclaimer] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedNoPrivilege, setAgreedNoPrivilege] = useState(false);

  if (!isOpen) return null;

  const canProceed = agreedDisclaimer && agreedPrivacy && agreedNoPrivilege;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
    >
      <div className="w-full max-w-lg border border-slate-300 bg-white p-6 shadow-2xl space-y-5 text-slate-900 rounded-xs">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <div className="flex h-9 w-9 items-center justify-center border border-[#0B192C] bg-[#0B192C] text-[#C5A059] rounded-xs">
            <Lock className="h-4 w-4" />
          </div>
          <div>
            <h2 id="consent-dialog-title" className="text-base font-bold tracking-tight text-[#0B192C]">
              JuriMbrella Assistant • Terms &amp; Privacy Consent
            </h2>
            <p className="text-xs text-slate-500">
              Required acknowledgement prior to your first legal-information query
            </p>
          </div>
        </div>

        <div className="border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-700 space-y-2 leading-relaxed">
          <p className="font-semibold text-[#0B192C]">
            Notice on Legal Information &amp; Privileged Communications:
          </p>
          <p>
            Using JuriMbrella Assistant does not create an attorney-client relationship. Do not submit
            confidential, privileged, or highly sensitive personal information unless an authorized
            secure client representation channel has been formally confirmed.
          </p>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedDisclaimer}
              onChange={(e) => setAgreedDisclaimer(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#0B192C]"
            />
            <span className="text-slate-700">
              I understand that JuriMbrella Assistant provides general Philippine legal information only,
              which is not a substitute for advice from a licensed lawyer.
            </span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedPrivacy}
              onChange={(e) => setAgreedPrivacy(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#0B192C]"
            />
            <span className="text-slate-700">
              I consent to the processing of my submitted question by the application's configured
              artificial intelligence service provider pursuant to R.A. 10173 (Data Privacy Act of 2012).
            </span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedNoPrivilege}
              onChange={(e) => setAgreedNoPrivilege(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#0B192C]"
            />
            <span className="text-slate-700">
              I agree not to submit confidential trade secrets, attorney-client privileged facts, or
              sensitive unredacted personal identifiers.
            </span>
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={onCancel}
            className="border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canProceed}
            onClick={onAgree}
            className="border border-[#0B192C] bg-[#0B192C] px-4 py-2 text-xs font-semibold text-white hover:bg-[#112240] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Agree &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
};
