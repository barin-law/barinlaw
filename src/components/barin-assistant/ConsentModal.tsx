import React, { useState } from 'react';
import { Shield, AlertCircle, CheckCircle2, Lock } from 'lucide-react';

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
      <div className="w-full max-w-lg border border-neutral-300 bg-white p-6 shadow-2xl space-y-5 text-neutral-900">
        <div className="flex items-center gap-3 border-b border-neutral-200 pb-3">
          <div className="flex h-9 w-9 items-center justify-center border border-black bg-black text-white">
            <Lock className="h-4 w-4" />
          </div>
          <div>
            <h2 id="consent-dialog-title" className="text-base font-bold tracking-tight">
              Barin Assistant • User Terms &amp; Privacy Consent
            </h2>
            <p className="text-xs text-neutral-500">
              Required acknowledgement prior to your first query
            </p>
          </div>
        </div>

        <div className="border border-neutral-200 bg-neutral-50 p-3.5 text-xs text-neutral-700 space-y-2 leading-relaxed">
          <p className="font-semibold text-neutral-900">
            Notice on Legal Information &amp; Privileged Communications:
          </p>
          <p>
            Using Barin Assistant does not create an attorney-client relationship. Do not submit
            confidential, privileged, or highly sensitive personal information unless the firm has
            authorized an official, secure client communication channel.
          </p>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedDisclaimer}
              onChange={(e) => setAgreedDisclaimer(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-black"
            />
            <span className="text-neutral-700">
              I understand that Barin Assistant provides general Philippine legal information only,
              which is not a substitute for advice from a licensed lawyer.
            </span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedPrivacy}
              onChange={(e) => setAgreedPrivacy(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-black"
            />
            <span className="text-neutral-700">
              I consent to the processing of my submitted question by the application's configured
              artificial intelligence service provider pursuant to R.A. 10173 (Data Privacy Act of 2012).
            </span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedNoPrivilege}
              onChange={(e) => setAgreedNoPrivilege(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-black"
            />
            <span className="text-neutral-700">
              I agree not to submit confidential trade secrets, attorney-client privileged facts, or
              sensitive unredacted personal identifiers.
            </span>
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200">
          <button
            type="button"
            onClick={onCancel}
            className="border border-neutral-300 px-4 py-2 text-xs font-semibold hover:bg-neutral-100"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canProceed}
            onClick={onAgree}
            className={`border px-4 py-2 text-xs font-semibold ${
              canProceed
                ? 'border-black bg-black text-white hover:bg-neutral-800 cursor-pointer'
                : 'border-neutral-300 bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            Confirm &amp; Proceed
          </button>
        </div>
      </div>
    </div>
  );
};
