import React, { useState } from 'react';
import { BrandLogo } from '../components/common/BrandLogo';
import {
  Scale,
  Menu,
  X,
  ArrowRight,
  Mail,
  Shield,
  FileText,
  ExternalLink,
  MessageSquare,
  Lock,
  Headphones,
  Phone,
} from 'lucide-react';
import { BarinAssistantWorkspace } from '../components/barin-assistant/BarinAssistantWorkspace';
import { GlobalFooter } from '../components/common/GlobalFooter';
import { SupportModal } from '../components/common/SupportModal';
import { ContactInformation } from '../components/common/ContactInformation';
import { ContactForm } from '../components/common/ContactForm';
import { siteContact } from '../config/contactConfig';

interface BarinLawFirmPublicPageProps {
  onNavigate?: (path: string) => void;
}

export const BarinLawFirmPublicPage: React.FC<BarinLawFirmPublicPageProps> = ({
  onNavigate,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);

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
    const el = document.getElementById('barin-assistant-section');
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
      id="barin-law-firm-public-page"
      className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white font-sans antialiased"
    >
      {/* 1. Minimal Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Left: Black-and-white BARIN Logo & Wordmark */}
          <div
            onClick={() => scrollToSection('top-intro')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <BrandLogo
              variant="emblem"
              height={36}
              priority
              alt="BARIN ENF Emblem"
              className="shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-serif text-base font-bold tracking-tight text-neutral-950 group-hover:text-neutral-700 transition-colors">
                BARIN LAW FIRM
              </span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">
                Legal Information &amp; Services
              </span>
            </div>
          </div>

          {/* Right Navigation (Desktop) */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 text-xs font-medium">
            <button
              onClick={() => scrollToSection('top-intro')}
              className="text-neutral-600 hover:text-black transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about-section')}
              className="text-neutral-600 hover:text-black transition-colors"
            >
              About
            </button>
            <button
              onClick={scrollToAssistant}
              className="text-neutral-600 hover:text-black transition-colors"
            >
              Barin Assistant
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className="text-neutral-600 hover:text-black transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => handleNav('/sign-in')}
              className="border border-black bg-black px-4 py-1.5 text-white hover:bg-neutral-800 transition-colors font-semibold"
            >
              Sign In
            </button>
          </nav>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center border border-neutral-300 md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="border-b border-neutral-200 bg-white px-4 py-3 md:hidden space-y-2 text-xs">
            <button
              onClick={() => scrollToSection('top-intro')}
              className="block w-full text-left py-1.5 text-neutral-700 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about-section')}
              className="block w-full text-left py-1.5 text-neutral-700 font-medium"
            >
              About
            </button>
            <button
              onClick={scrollToAssistant}
              className="block w-full text-left py-1.5 text-neutral-700 font-medium"
            >
              Barin Assistant
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className="block w-full text-left py-1.5 text-neutral-700 font-medium"
            >
              Contact
            </button>
            <div className="pt-2 border-t border-neutral-100">
              <button
                onClick={() => handleNav('/sign-in')}
                className="w-full border border-black bg-black py-2 text-center text-white font-semibold"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Container with Large Open Spaces */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20 space-y-24">
        {/* 2. Main Introduction */}
        <section id="top-intro" className="text-center max-w-3xl mx-auto space-y-8">
          <div className="flex justify-center">
            <BrandLogo
              variant="emblem"
              height={112}
              priority
              alt="BARIN ENF Emblem"
              className="shrink-0 max-w-[128px]"
            />
          </div>

          <div className="space-y-4">
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950">
              BARIN LAW FIRM
            </h1>
            <p className="text-base sm:text-xl text-neutral-600 font-light tracking-wide max-w-xl mx-auto leading-relaxed">
              Clear legal information. Responsible guidance. Secure digital service.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={scrollToAssistant}
              className="w-full sm:w-auto border border-black bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors shadow-xs"
            >
              Ask Barin Assistant
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact-section')}
              className="w-full sm:w-auto border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 hover:border-black transition-colors"
            >
              Contact the Firm
            </button>
          </div>
        </section>

        {/* 3. About Section */}
        <section
          id="about-section"
          className="border-t border-neutral-200 pt-16 max-w-3xl mx-auto space-y-4 text-center sm:text-left"
        >
          <h2 className="font-serif text-2xl font-bold tracking-tight text-neutral-950">
            About Barin Law Firm
          </h2>
          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
            Barin Law Firm provides a professional digital environment where clients can access
            general legal information, learn about Philippine laws and court rulings, and connect
            with the firm for appropriate legal assistance.
          </p>
        </section>

        {/* 4. Barin Assistant Section */}
        <section id="barin-assistant-section" className="border-t border-neutral-200 pt-16 space-y-6">
          <div className="max-w-3xl mx-auto text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-2 border border-neutral-300 bg-neutral-50 px-2.5 py-1 text-xs font-mono text-neutral-600">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Interactive Public Legal Assistant</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
              Barin Assistant
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
              Inquire regarding Philippine statutes, Supreme Court issuances, notarial requirements under
              A.M. No. 24-10-14-SC, or prepare for an official lawyer consultation.
            </p>
          </div>

          <BarinAssistantWorkspace
            onSignInClick={() => handleNav('/sign-in')}
            onContactAdminClick={() => scrollToSection('contact-section')}
          />
        </section>

        {/* 5. Contact Section */}
        <section
          id="contact-section"
          className="border-t border-neutral-200 pt-16 max-w-3xl mx-auto space-y-6 text-left"
        >
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-neutral-950">
              Contact Barin Law Firm
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Connect with Barin Law Firm for legal inquiries, scheduled consultations, or enterprise notarial coordination.
            </p>
          </div>

          <div className="border border-neutral-300 bg-neutral-50/70 p-5 sm:p-6 space-y-5">
            <ContactInformation variant="card" showDisclaimer={true} />

            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-neutral-200">
              <a
                href={siteContact.phoneHref}
                className="inline-flex items-center gap-2 border border-black bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call Hotline ({siteContact.phoneDisplay})</span>
              </a>
              <a
                href={siteContact.emailHref}
                className="inline-flex items-center gap-2 border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 hover:border-black transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Send Email ({siteContact.email})</span>
              </a>
              <button
                type="button"
                onClick={() => setShowInquiryForm(!showInquiryForm)}
                className="inline-flex items-center gap-2 border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 hover:border-black transition-colors cursor-pointer"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{showInquiryForm ? 'Hide Inquiry Form' : 'Send an Online Message'}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsSupportModalOpen(true)}
                className="inline-flex items-center gap-2 border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 hover:border-black transition-colors cursor-pointer"
              >
                <Headphones className="h-3.5 w-3.5" />
                <span>Open Support Hub</span>
              </button>
            </div>

            {showInquiryForm && (
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                  Submit Direct Inquiry
                </h3>
                <ContactForm
                  defaultCategory="consultation"
                  onSuccess={() => {
                    setTimeout(() => setShowInquiryForm(false), 3000);
                  }}
                />
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Standardized Global Public Footer */}
      <GlobalFooter
        onNavigate={handleNav}
        onOpenSupportModal={() => setIsSupportModalOpen(true)}
      />

      {/* Central Support Modal */}
      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        defaultTopic="consultation"
      />
    </div>
  );
};
