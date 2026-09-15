import React from 'react';
import { BrandLogo } from '../components/common/BrandLogo';
import {
  Scale,
  ShieldCheck,
  FileCheck2,
  Lock,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Building,
  UserCheck,
} from 'lucide-react';

interface PublicHomePageProps {
  onNavigate: (path: string) => void;
}

export const PublicHomePage: React.FC<PublicHomePageProps> = ({ onNavigate }) => {
  return (
    <div
      id="barin-enf-public-homepage"
      className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white"
    >
      {/* Public Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div
            onClick={() => onNavigate('/')}
            className="flex items-center cursor-pointer select-none"
            title="Barin Electronic Notarization Facility"
          >
            <BrandLogo
              variant="full"
              height={42}
              priority
              alt="BARIN ENF Electronic Notarization Facility"
              className="max-h-[46px]"
            />
          </div>

          <nav aria-label="Public Navigation" className="flex items-center gap-4 sm:gap-6 text-xs font-medium">
            <button
              onClick={() => onNavigate('/verify')}
              className="text-neutral-600 hover:text-black transition-colors"
            >
              Verify Notarization
            </button>
            <button
              onClick={() => onNavigate('/barin-law-firm')}
              className="text-neutral-600 hover:text-black transition-colors"
            >
              Barin Law Firm &amp; Assistant
            </button>
            <button
              onClick={() => onNavigate('/sign-in')}
              className="border border-black bg-black px-4 py-1.5 text-white hover:bg-neutral-800 transition-colors font-semibold"
            >
              Sign In
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20 space-y-16">
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center pb-2">
            <BrandLogo
              variant="full"
              width={200}
              height="auto"
              priority
              alt="BARIN ENF Electronic Notarization Facility"
              className="max-w-[220px]"
            />
          </div>

          <div className="inline-flex items-center gap-2 border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-mono text-neutral-700">
            <span>Supreme Court A.M. No. 24-10-14-SC</span>
            <span>•</span>
            <span>Candidate v1.0</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
            Philippine Electronic Notarization Facility
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed font-light">
            A comprehensive digital infrastructure designed for accredited Electronic Notaries Public,
            instrument parties, and regulatory auditors in compliance with Philippine Supreme Court rules.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={() => onNavigate('/verify')}
              className="w-full sm:w-auto border border-black bg-black px-6 py-3 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              Verify Notarized Instrument
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/barin-law-firm')}
              className="w-full sm:w-auto border border-neutral-300 bg-white px-6 py-3 text-xs font-semibold text-neutral-800 hover:border-black transition-colors"
            >
              Visit Barin Law Firm &amp; Assistant
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/sign-in')}
              className="w-full sm:w-auto border border-neutral-300 bg-white px-6 py-3 text-xs font-semibold text-neutral-800 hover:border-black transition-colors"
            >
              Portal Sign In (14 Roles)
            </button>
          </div>
        </section>

        {/* 3 Pillar Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="border border-neutral-200 p-6 space-y-3 bg-white">
            <div className="flex h-10 w-10 items-center justify-center border border-black bg-neutral-50">
              <ShieldCheck className="h-5 w-5 text-neutral-900" />
            </div>
            <h2 className="text-sm font-bold text-neutral-950 font-serif">
              Supreme Court A.M. 24-10-14-SC
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Engineered to meet the standards for electronic notarial commissions, multi-party teleconferences, and Philippine judicial evidence standards.
            </p>
          </div>

          <div className="border border-neutral-200 p-6 space-y-3 bg-white">
            <div className="flex h-10 w-10 items-center justify-center border border-black bg-neutral-50">
              <Lock className="h-5 w-5 text-neutral-900" />
            </div>
            <h2 className="text-sm font-bold text-neutral-950 font-serif">
              Cryptographic SHA-256 Ledger
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every notarial register entry, document hash, and digital signature is anchored in a tamper-evident audit chain with verifiable mathematical integrity.
            </p>
          </div>

          <div className="border border-neutral-200 p-6 space-y-3 bg-white">
            <div className="flex h-10 w-10 items-center justify-center border border-black bg-neutral-50">
              <MessageSquare className="h-5 w-5 text-neutral-900" />
            </div>
            <h2 className="text-sm font-bold text-neutral-950 font-serif">
              Barin Law Firm &amp; Assistant
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed">
              An isolated public portal offering grounded Philippine legal information, court rulings, and consultation preparation via the dedicated Barin Assistant.
            </p>
          </div>
        </section>

        {/* Demonstration Disclaimer Banner */}
        <section className="border border-neutral-300 bg-neutral-50 p-6 space-y-3 text-xs text-neutral-700">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
            <span className="font-bold uppercase font-mono text-[11px] text-neutral-900">
              Demonstration &amp; Evaluation Notice
            </span>
            <span className="text-[10px] font-mono text-neutral-500">
              CANDIDATE ENVIRONMENT
            </span>
          </div>
          <p className="leading-relaxed">
            This platform is operating in an evaluation environment. No live notarial acts or binding legal services are executed without an accredited Electronic Notary Public and verified identity credentials. To explore the platform across all 14 statutory roles, use the shared demonstration credentials on the sign-in page.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/sign-in')}
              className="inline-flex items-center gap-1.5 font-semibold text-black hover:underline"
            >
              <span>Access Demonstration Workspace Selector</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50/50 py-10 mt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2.5">
            <BrandLogo
              variant="emblem"
              height={22}
              decorative
              className="shrink-0 opacity-90"
            />
            <span className="font-serif font-bold text-neutral-900">BARIN ENF</span>
            <span>• Candidate Accreditation Architecture</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => onNavigate('/verify')} className="hover:text-black">
              Hash Verification
            </button>
            <button onClick={() => onNavigate('/barin-law-firm')} className="hover:text-black">
              Barin Law Firm
            </button>
            <button onClick={() => onNavigate('/sign-in')} className="hover:text-black">
              Demo Sign In
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
