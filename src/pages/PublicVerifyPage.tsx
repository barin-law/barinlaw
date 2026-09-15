import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { VerifyPortal } from '../components/dashboards/VerifyPortal';

interface PublicVerifyPageProps {
  onNavigate: (path: string) => void;
}

export const PublicVerifyPage: React.FC<PublicVerifyPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div
            onClick={() => onNavigate('/')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src="/assets/barin-logo-bw.svg"
              alt="BARIN ENF Electronic Notarization Facility logo"
              className="h-8 w-8 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-serif text-sm font-bold tracking-tight text-neutral-950">
                BARIN ENF
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">
                Verification Gateway
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="text-neutral-600 hover:text-black font-medium"
            >
              Public Home
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/barin-law-firm')}
              className="text-neutral-600 hover:text-black font-medium"
            >
              Barin Law Firm
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/sign-in')}
              className="border border-black bg-black px-3.5 py-1.5 text-white font-semibold hover:bg-neutral-800"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-16">
        <div className="mb-6">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Public Home</span>
          </button>
        </div>

        <VerifyPortal />
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50/50 py-8 mt-20 text-center text-xs text-neutral-500">
        BARIN ENF • Cryptographic Document Verification under R.A. 8792 &amp; Supreme Court A.M. No. 24-10-14-SC
      </footer>
    </div>
  );
};
