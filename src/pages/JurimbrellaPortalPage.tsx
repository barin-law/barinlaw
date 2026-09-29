import React, { useState } from 'react';
import { BrandLogo, BrandMark } from '../components/common/BrandLogo';
import {
  Menu,
  X,
  MessageSquare,
  ShieldCheck,
  FileCheck2,
} from 'lucide-react';
import { JurimbrellaAssistantWorkspace } from '../components/jurimbrella-assistant/JurimbrellaAssistantWorkspace';
import { GlobalFooter } from '../components/common/GlobalFooter';
import { SupportModal } from '../components/common/SupportModal';
import { ContactInformation } from '../components/common/ContactInformation';
import { ContactForm } from '../components/common/ContactForm';

interface JurimbrellaPortalPageProps {
  onNavigate?: (path: string) => void;
}

export const JurimbrellaPortalPage: React.FC<JurimbrellaPortalPageProps> = ({
  onNavigate,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const handleNav = (path: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const scrollToAssistant = () => {
    const el = document.getElementById('jurimbrella-assistant-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="jurimbrella-portal-page"
      className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#0B192C] selection:text-white font-sans antialiased"
    >
      {/* 1. Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div
            onClick={() => scrollToSection('top-intro')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <BrandLogo
              variant="compact"
              height={38}
              priority
              alt="JuriMbrella Philippine eNotarization"
            />
          </div>

          {/* Right Navigation (Desktop) */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 text-xs font-medium">
            <button
              onClick={() => handleNav('/')}
              className="text-slate-600 hover:text-[#0B192C] transition-colors"
            >
              Public Home
            </button>
            <button
              onClick={() => scrollToSection('about-section')}
              className="text-slate-600 hover:text-[#0B192C] transition-colors"
            >
              Platform Overview
            </button>
            <button
              onClick={scrollToAssistant}
              className="text-slate-600 hover:text-[#0B192C] transition-colors"
            >
              Assistant
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className="text-slate-600 hover:text-[#0B192C] transition-colors"
            >
              Contact Desk
            </button>
            <button
              onClick={() => handleNav('/sign-in')}
              className="border border-[#0B192C] bg-[#0B192C] px-4 py-1.5 text-white hover:bg-[#112240] transition-colors font-semibold rounded-xs shadow-xs"
            >
              Sign In
            </button>
          </nav>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center border border-slate-300 md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white px-4 py-3 md:hidden space-y-2 text-xs">
            <button
              onClick={() => handleNav('/')}
              className="block w-full text-left py-1.5 text-slate-700 font-medium"
            >
              Public Home
            </button>
            <button
              onClick={() => scrollToSection('about-section')}
              className="block w-full text-left py-1.5 text-slate-700 font-medium"
            >
              Platform Overview
            </button>
            <button
              onClick={scrollToAssistant}
              className="block w-full text-left py-1.5 text-slate-700 font-medium"
            >
              Assistant
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className="block w-full text-left py-1.5 text-slate-700 font-medium"
            >
              Contact Desk
            </button>
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => handleNav('/sign-in')}
                className="w-full border border-[#0B192C] bg-[#0B192C] py-2 text-center text-white font-semibold"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20 space-y-20">
        {/* 2. Main Introduction */}
        <section id="top-intro" className="text-center max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <BrandMark size={96} />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 border border-[#C5A059]/40 bg-white px-3 py-1 text-xs font-mono text-[#0B192C] rounded-full shadow-2xs">
              <span className="font-semibold">PHILIPPINE eNOTARIZATION</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-[#0B192C]">
              Juri<span className="text-[#C5A059]">M</span>brella
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-normal tracking-wide max-w-xl mx-auto leading-relaxed">
              Protection over every signature. Secure, compliant, traceable, and professionally controlled digital notarization workflows.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={scrollToAssistant}
              className="w-full sm:w-auto border border-[#0B192C] bg-[#0B192C] px-6 py-3 text-xs font-semibold text-white hover:bg-[#112240] transition-colors shadow-xs"
            >
              Consult JuriMbrella Assistant
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact-section')}
              className="w-full sm:w-auto border border-slate-300 bg-white px-6 py-3 text-xs font-semibold text-slate-800 hover:border-[#0B192C] transition-colors shadow-2xs"
            >
              Contact Support Desk
            </button>
          </div>
        </section>

        {/* 3. About Section */}
        <section
          id="about-section"
          className="border-t border-slate-200 pt-16 max-w-3xl mx-auto space-y-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059] uppercase tracking-wider font-bold">
            <ShieldCheck className="h-4 w-4" />
            <span>Platform Overview</span>
          </div>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-[#0B192C]">
            About JuriMbrella Electronic Notarization
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed font-normal">
            JuriMbrella is an institutional Philippine electronic notarization platform engineered in alignment
            with Supreme Court Administrative Matter No. 24-10-14-SC (Rules on Electronic Notarization).
            It provides seamless cryptographic verification, tamper-evident audit logging, and role-segregated
            workflows for Principals, Electronic Notaries Public, and verifying parties.
          </p>
        </section>

        {/* 4. Assistant Section */}
        <section id="jurimbrella-assistant-section" className="border-t border-slate-200 pt-16 space-y-6">
          <div className="max-w-3xl mx-auto text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-2 border border-[#C5A059]/40 bg-white px-2.5 py-1 text-xs font-mono text-[#0B192C] rounded-full">
              <MessageSquare className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>Interactive Procedural Assistant</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0B192C]">
              JuriMbrella Assistant
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Inquire regarding Philippine statutes, Supreme Court issuances, notarial requirements under
              A.M. No. 24-10-14-SC, or prepare for notarial appearance.
            </p>
          </div>

          <JurimbrellaAssistantWorkspace
            onSignInClick={() => handleNav('/sign-in')}
            onContactAdminClick={() => scrollToSection('contact-section')}
          />
        </section>

        {/* 5. Contact Section */}
        <section
          id="contact-section"
          className="border-t border-slate-200 pt-16 max-w-3xl mx-auto space-y-6 text-left"
        >
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-[#0B192C]">
              Contact JuriMbrella Legal &amp; Administrative Support
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our administration desk is available for questions regarding platform functionality,
              accreditation alignment, or procedural consultations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <ContactInformation />
            </div>

            <div className="border border-slate-200 bg-white p-5 rounded-xs shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B192C] font-mono mb-3">
                Send an Inquiry
              </h3>
              <ContactForm
                onSuccess={() => {}}
                className="space-y-3"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Global Public Footer */}
      <GlobalFooter
        onNavigate={handleNav}
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
export default JurimbrellaPortalPage;
