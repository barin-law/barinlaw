import React, { useState } from 'react';
import { BrandLogo, BrandMark } from '../components/common/BrandLogo';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  MessageSquare,
  FileCheck2,
  CheckCircle2,
  FileText,
  Key,
} from 'lucide-react';
import { GlobalFooter } from '../components/common/GlobalFooter';
import { SupportModal } from '../components/common/SupportModal';

interface PublicHomePageProps {
  onNavigate: (path: string) => void;
}

export const PublicHomePage: React.FC<PublicHomePageProps> = ({ onNavigate }) => {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  return (
    <div
      id="jurimbrella-public-homepage"
      className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-[#0B192C] selection:text-white"
    >
      {/* Public Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div
            onClick={() => onNavigate('/')}
            className="flex items-center cursor-pointer select-none"
            title="JuriMbrella — Protection over every signature"
          >
            <BrandLogo
              variant="compact"
              height={40}
              priority
              alt="JuriMbrella Philippine Electronic Notarization"
            />
          </div>

          <nav aria-label="Public Navigation" className="flex items-center gap-3 sm:gap-6 text-xs font-medium">
            <button
              onClick={() => onNavigate('/verify')}
              className="text-slate-600 hover:text-[#0B192C] transition-colors"
            >
              Verify Notarization
            </button>
            <button
              onClick={() => onNavigate('/jurimbrella-portal')}
              className="text-slate-600 hover:text-[#0B192C] transition-colors"
            >
              Legal Information
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="text-slate-600 hover:text-[#0B192C] transition-colors"
            >
              Contact Us
            </button>
            <button
              onClick={() => onNavigate('/sign-in')}
              className="border border-[#0B192C] bg-[#0B192C] px-4 py-1.5 text-white hover:bg-[#112240] transition-colors font-semibold shadow-xs"
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
              height={100}
              priority
              alt="JuriMbrella — Protection over every signature — Philippine eNotarization"
              className="max-w-[420px]"
            />
          </div>

          <div className="inline-flex items-center gap-2 border border-[#C5A059]/40 bg-white px-3.5 py-1 text-xs font-mono text-[#0B192C] rounded-full shadow-xs">
            <span className="h-2 w-2 rounded-full bg-[#C5A059]" />
            <span className="font-semibold">PHILIPPINE eNOTARIZATION</span>
            <span>•</span>
            <span className="text-slate-500">A.M. No. 24-10-14-SC Aligned</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-[#0B192C] leading-tight">
            Protection Over Every Signature
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
            A professional Philippine electronic notarization platform focused on secure, compliant,
            traceable, and professionally controlled digital notarization workflows.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={() => onNavigate('/verify')}
              className="w-full sm:w-auto border border-[#0B192C] bg-[#0B192C] px-6 py-3 text-xs font-semibold text-white hover:bg-[#112240] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <FileCheck2 className="h-4 w-4 text-[#C5A059]" />
              <span>Verify Notarized Instrument</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/jurimbrella-portal')}
              className="w-full sm:w-auto border border-slate-300 bg-white px-6 py-3 text-xs font-semibold text-slate-800 hover:border-[#0B192C] transition-colors shadow-xs"
            >
              Legal Information &amp; Procedures
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/sign-in')}
              className="w-full sm:w-auto border border-[#C5A059] bg-[#F4EAD4]/30 px-6 py-3 text-xs font-semibold text-[#0B192C] hover:bg-[#F4EAD4]/60 transition-colors shadow-xs"
            >
              Enter Workspace (14 Roles)
            </button>
          </div>
        </section>

        {/* 3 Pillar Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="border border-slate-200 p-6 space-y-3 bg-white shadow-xs rounded-xs border-t-2 border-t-[#0B192C]">
            <div className="flex h-10 w-10 items-center justify-center border border-slate-200 bg-slate-50 text-[#0B192C]">
              <ShieldCheck className="h-5 w-5 text-[#0B192C]" />
            </div>
            <h2 className="text-sm font-bold text-[#0B192C] font-serif">
              Procedural &amp; Legal Compliance
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full alignment with Philippine Supreme Court Rules on Electronic Notarization (A.M. No. 24-10-14-SC),
              supporting both Integrated In-Person (IEN) and Remote Electronic Notarization (REN).
            </p>
          </div>

          <div className="border border-slate-200 p-6 space-y-3 bg-white shadow-xs rounded-xs border-t-2 border-t-[#C5A059]">
            <div className="flex h-10 w-10 items-center justify-center border border-slate-200 bg-slate-50 text-[#C5A059]">
              <Lock className="h-5 w-5 text-[#0B192C]" />
            </div>
            <h2 className="text-sm font-bold text-[#0B192C] font-serif">
              Cryptographic Integrity &amp; Audit
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every document version receives an immutable SHA-256 hash computed directly from file bytes.
              All ceremonies, certificates, and seals are preserved in a verifiable tamper-evident trail.
            </p>
          </div>

          <div className="border border-slate-200 p-6 space-y-3 bg-white shadow-xs rounded-xs border-t-2 border-t-[#0B192C]">
            <div className="flex h-10 w-10 items-center justify-center border border-slate-200 bg-slate-50 text-[#0B192C]">
              <MessageSquare className="h-5 w-5 text-[#0B192C]" />
            </div>
            <h2 className="text-sm font-bold text-[#0B192C] font-serif">
              Authorized Professional Review
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              End-to-end procedural guidance, conflict checks, identity verification safeguards, and
              notarial book recordings under authorized Electronic Notary Public oversight.
            </p>
          </div>
        </section>

        {/* Demonstration Disclaimer Banner */}
        <section className="border border-slate-300 bg-white p-6 space-y-3 text-xs text-slate-700 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="font-bold uppercase font-mono text-[11px] text-[#0B192C] flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#C5A059]" />
              Demonstration &amp; Evaluation Environment
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              SIMULATED VERIFICATION
            </span>
          </div>
          <p className="leading-relaxed">
            This platform operates in an evaluation sandbox. No live government database was queried, and all
            digital identity verification transactions are simulated in accordance with Supreme Court testing requirements.
            To explore the platform across all 14 statutory roles, use the workspace credentials on the sign-in page.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/sign-in')}
              className="inline-flex items-center gap-1.5 font-semibold text-[#0B192C] hover:text-[#C5A059] transition-colors"
            >
              <span>Access Demonstration Workspace Selector</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>
      </main>

      {/* Standardized Global Public Footer */}
      <GlobalFooter
        onNavigate={onNavigate}
        onOpenSupportModal={() => setIsSupportModalOpen(true)}
      />

      {/* Support Modal */}
      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        defaultTopic="general"
      />
    </div>
  );
};
export default PublicHomePage;
