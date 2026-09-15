import React, { useState, useEffect } from 'react';
import {
  Lock,
  User,
  Key,
  AlertCircle,
  CheckCircle2,
  Shield,
  ArrowRight,
  Sparkles,
  Building,
  Scale,
  LogOut,
  Info,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSecurity } from '../context/SecurityContext';
import { UserRole } from '../types';
import { ROLE_NAVIGATION_MAP } from '../data/navigationConfig';

interface SignInPageProps {
  returnTo?: string;
  onNavigate: (path: string) => void;
}

interface RoleOption {
  role: UserRole;
  name: string;
  title: string;
  route: string;
  description: string;
  category: 'Parties' | 'Notarial Office' | 'Governance & Security' | 'Operations';
}

const DEMO_ROLES: RoleOption[] = [
  {
    role: 'PRINCIPAL',
    name: 'Maria Elena Santos',
    title: 'Principal / Signer',
    route: '/portal/signer',
    description: 'Submits instruments, completes liveness check, signs documents, and pays fees.',
    category: 'Parties',
  },
  {
    role: 'WITNESS',
    name: 'Atty. Roberto Cruz',
    title: 'Instrument Witness',
    route: '/portal/witness',
    description: 'Attends scheduled notarial hearing, affirms declarations, and signs as witness.',
    category: 'Parties',
  },
  {
    role: 'ORG_REQUESTER',
    name: 'Andrea Dimatulac',
    title: 'Organization Requester',
    route: '/portal/organization/requester',
    description: 'Prepares and submits corporate notarization instruments on behalf of company.',
    category: 'Parties',
  },
  {
    role: 'ORG_ADMIN',
    name: 'Carlos Mendoza, CPA',
    title: 'Organization Administrator',
    route: '/portal/organization/admin',
    description: 'Manages organization users, templates, billing contacts, and corporate audits.',
    category: 'Parties',
  },
  {
    role: 'ENP',
    name: 'Atty. Juan Dela Cruz, En.P.',
    title: 'Electronic Notary Public',
    route: '/enp/workspace',
    description: 'Independent statutory officer exercising sole legal authority to execute notarial acts.',
    category: 'Notarial Office',
  },
  {
    role: 'ENP_ASSISTANT',
    name: 'Joy Bautista',
    title: 'ENP Office Assistant',
    route: '/enp/assistant',
    description: 'Administrative intake, calendar coordination, document checklists, and drafts.',
    category: 'Notarial Office',
  },
  {
    role: 'SECOPS_ANALYST',
    name: 'Engr. Kenneth Tan, CISSP',
    title: 'Security Operations',
    route: '/security/operations',
    description: 'Monitors real-time threats, quarantine telemetry, IP restrictions, and SIEM exports.',
    category: 'Governance & Security',
  },
  {
    role: 'COMPLIANCE_REVIEWER',
    name: 'Atty. Cristina Legaspi',
    title: 'Compliance Reviewer',
    route: '/compliance/reviewer',
    description: 'Enforces A.M. 24-10-14-SC compliance registers, accreditation readiness, and findings.',
    category: 'Governance & Security',
  },
  {
    role: 'DPO',
    name: 'Dean Miguel De Castro, CIPP/E',
    title: 'Data Protection Officer',
    route: '/privacy/dpo',
    description: 'Oversees R.A. 10173 data privacy compliance, ROPA registers, and DSR handling.',
    category: 'Governance & Security',
  },
  {
    role: 'INTERNAL_AUDITOR',
    name: 'Victoria Solis, CIA, CISA',
    title: 'Internal Auditor',
    route: '/audit/internal',
    description: 'Read-only verification of SHA-256 hash chains, SOC 2 controls, and signed workpapers.',
    category: 'Governance & Security',
  },
  {
    role: 'COURT_AUDITOR',
    name: 'Hon. Judicial Inspector',
    title: 'Supreme Court / Regulatory Auditor',
    route: '/regulatory/auditor',
    description: 'Time-limited judicial oversight, SC-ENAR registers, and cryptographic seal proofs.',
    category: 'Governance & Security',
  },
  {
    role: 'FINANCE_OFFICER',
    name: 'Rowena Garcia',
    title: 'Finance Officer',
    route: '/finance',
    description: 'Administers statutory notarial fees, invoice reconciliations, and payment ledgers.',
    category: 'Operations',
  },
  {
    role: 'SUPPORT_AGENT',
    name: 'Mark Lester Aquino',
    title: 'Customer Support Agent',
    route: '/support',
    description: 'Assists participants with video setup, hardware checks, and technical support tickets.',
    category: 'Operations',
  },
  {
    role: 'ENF_ADMIN',
    name: 'Engr. Paul Valdez',
    title: 'ENF System Administrator',
    route: '/admin/system',
    description: 'Platform infrastructure operations, container telemetry, and adapter management.',
    category: 'Operations',
  },
];

export const SignInPage: React.FC<SignInPageProps> = ({
  returnTo,
  onNavigate,
}) => {
  const { switchRole } = useAuth();
  const { addAuditEvent } = useSecurity();

  // Authentication state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isLockedOut, setIsLockedOut] = useState<boolean>(false);
  const [lockoutSecondsRemaining, setLockoutSecondsRemaining] = useState<number>(0);

  // Authenticated state (shows demo persona workspace selector)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Handle 60s lockout timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLockedOut && lockoutSecondsRemaining > 0) {
      timer = setInterval(() => {
        setLockoutSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsLockedOut(false);
            setFailedAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLockedOut, lockoutSecondsRemaining]);

  const handleUseDemoAccess = () => {
    setUsername('test2026');
    setPassword('test2026');
    setErrorNotice(null);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLockedOut) return;

    if (!username.trim() || !password.trim()) {
      setErrorNotice('Invalid credentials. Enter the authorized demonstration username and password.');
      return;
    }

    if (username === 'test2026' && password === 'test2026') {
      setIsAuthenticated(true);
      setErrorNotice(null);
      setFailedAttempts(0);
      addAuditEvent({
        timestamp: new Date().toISOString(),
        actor: {
          uid: 'demo-auth-01',
          name: 'Authorized Demo Signer',
          role: 'PRINCIPAL',
          email: 'test2026@demo-enf.gov.ph',
        },
        action: 'DEMO_USER_AUTHENTICATED',
        resource: 'AUTH_GATEWAY',
        severity: 'INFO',
        ipAddress: '127.0.0.1',
        userAgent: navigator.userAgent,
        metadata: {
          mechanism: 'SHARED_DEMO_CREDENTIALS',
          username: 'test2026',
          result: 'SUCCESS',
        },
      });
    } else {
      const newFails = failedAttempts + 1;
      setFailedAttempts(newFails);

      if (newFails >= 5) {
        setIsLockedOut(true);
        setLockoutSecondsRemaining(60);
        setErrorNotice('Too many unsuccessful attempts. Please wait before trying again.');
        addAuditEvent({
          timestamp: new Date().toISOString(),
          actor: {
            uid: 'anonymous-visitor',
            name: 'Unauthenticated Visitor',
            role: 'PRINCIPAL',
            email: 'visitor@unauthenticated',
          },
          action: 'DEMO_AUTH_LOCKOUT_TRIGGERED',
          resource: 'AUTH_GATEWAY',
          severity: 'HIGH',
          ipAddress: '127.0.0.1',
          userAgent: navigator.userAgent,
          metadata: {
            failedAttempts: newFails,
            lockoutDurationSeconds: 60,
          },
        });
      } else {
        setErrorNotice('Invalid credentials. Enter the authorized demonstration username and password.');
      }
    }
  };

  const handleSelectRole = (roleOption: RoleOption) => {
    switchRole(roleOption.role);
    addAuditEvent({
      timestamp: new Date().toISOString(),
      actor: {
        uid: 'demo-user',
        name: roleOption.name,
        role: roleOption.role,
        email: `${roleOption.role.toLowerCase()}@demo-enf.gov.ph`,
      },
      action: 'DEMO_ROLE_CONTEXT_ACTIVATED',
      resource: 'PERSONA_SELECTOR',
      severity: 'INFO',
      ipAddress: '127.0.0.1',
      userAgent: navigator.userAgent,
      metadata: {
        activatedRole: roleOption.role,
        targetRoute: roleOption.route,
        actorName: roleOption.name,
      },
    });

    const destination = returnTo && returnTo.startsWith('/') ? returnTo : roleOption.route;
    onNavigate(destination);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col justify-between font-sans">
      {/* Top Bar with Demo Banner */}
      <header className="border-b border-neutral-200 bg-white px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <img
              src="/assets/barin-logo-bw.svg"
              alt="BARIN ENF Electronic Notarization Facility logo"
              className="h-8 w-8 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-serif text-sm font-bold tracking-tight">BARIN ENF</span>
              <span className="text-[10px] text-neutral-500 font-mono">
                Electronic Notarization Facility
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="border border-neutral-300 bg-neutral-100 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-neutral-700">
              DEMONSTRATION ENVIRONMENT — NOT FOR LEGAL USE
            </span>
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="text-xs text-neutral-600 hover:text-black font-medium"
            >
              Public Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-10 sm:py-16 flex items-center justify-center">
        {!isAuthenticated ? (
          /* Step 1: Sign-in Form */
          <div className="w-full max-w-md border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center border border-black bg-black text-white">
                <Lock className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-bold tracking-tight font-serif">
                Demonstration Portal Sign In
              </h1>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Enter the authorized evaluation credentials to select a role workspace
              </p>
            </div>

            {/* Demo Notice & Helper Box */}
            <div className="border border-neutral-200 bg-neutral-50 p-3.5 text-xs space-y-2 text-neutral-700">
              <div className="flex items-center justify-between">
                <span className="font-bold text-black uppercase font-mono text-[11px]">
                  Authorized Demo Credentials:
                </span>
                <span className="text-[10px] font-mono text-neutral-500">APP_ENV=demo</span>
              </div>
              <div className="font-mono text-xs space-y-0.5 bg-white border border-neutral-200 p-2 text-neutral-800">
                <p>Demo Username: <strong>test2026</strong></p>
                <p>Demo Password: <strong>test2026</strong></p>
              </div>
              <button
                type="button"
                onClick={handleUseDemoAccess}
                className="w-full border border-black bg-white py-1.5 text-xs font-semibold text-neutral-900 hover:bg-neutral-100 transition-colors"
              >
                Use Demo Access (Fill Fields)
              </button>
            </div>

            {/* Error or Lockout Notice */}
            {errorNotice && (
              <div
                role="alert"
                className={`border p-3 text-xs flex items-start gap-2 ${
                  isLockedOut
                    ? 'border-red-600 bg-red-50 text-red-900 font-semibold'
                    : 'border-neutral-300 bg-neutral-50 text-neutral-800'
                }`}
              >
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                <div>
                  <p>{errorNotice}</p>
                  {isLockedOut && (
                    <p className="text-[11px] font-mono mt-1 text-red-700">
                      Lockout active: {lockoutSecondsRemaining}s remaining
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-medium text-neutral-700">Username</label>
                <input
                  type="text"
                  required
                  disabled={isLockedOut}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter demonstration username"
                  className="w-full border border-neutral-300 p-2.5 outline-none focus:border-black bg-white disabled:bg-neutral-100"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-medium text-neutral-700">Password</label>
                <input
                  type="password"
                  required
                  disabled={isLockedOut}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter demonstration password"
                  className="w-full border border-neutral-300 p-2.5 outline-none focus:border-black bg-white disabled:bg-neutral-100"
                />
              </div>

              <button
                type="submit"
                disabled={isLockedOut}
                className={`w-full border py-2.5 text-xs font-semibold ${
                  isLockedOut
                    ? 'border-neutral-300 bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    : 'border-black bg-black text-white hover:bg-neutral-800 cursor-pointer'
                }`}
              >
                {isLockedOut ? `Locked Out (${lockoutSecondsRemaining}s)` : 'Authenticate Demo Session'}
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/barin-law-firm')}
                className="text-xs text-neutral-500 hover:text-black"
              >
                Return to Barin Law Firm Public Page
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Role / Persona Selector */
          <div className="w-full space-y-6">
            <div className="text-center space-y-2">
              <span className="border border-neutral-300 bg-neutral-100 px-3 py-1 text-xs font-mono uppercase tracking-wider text-neutral-700">
                Session Authenticated (test2026)
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif">
                Select a Demonstration Workspace
              </h1>
              <p className="text-xs text-neutral-600 max-w-xl mx-auto">
                Explore the platform through any of the 14 authorized statutory roles. Each persona
                operates within an isolated, role-specific dashboard with strict permission boundaries.
              </p>
            </div>

            {/* Filter categories */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              {['ALL', 'Parties', 'Notarial Office', 'Governance & Security', 'Operations'].map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`border px-3 py-1 text-xs font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'border-black bg-black text-white font-bold'
                        : 'border-neutral-200 bg-white text-neutral-600 hover:border-black'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            {/* 14 Role Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {DEMO_ROLES.filter(
                (r) => selectedCategory === 'ALL' || r.category === selectedCategory
              ).map((option) => (
                <div
                  key={option.role}
                  onClick={() => handleSelectRole(option)}
                  className="group cursor-pointer border border-neutral-200 bg-white p-4 hover:border-black hover:shadow-xs transition-all flex flex-col justify-between text-left"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 border border-neutral-200 px-1.5 py-0.5">
                        {option.category}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {option.route}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 group-hover:text-black">
                        {option.title}
                      </h3>
                      <p className="text-xs text-neutral-600 font-medium">{option.name}</p>
                    </div>

                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      {option.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-900 group-hover:text-black">
                    <span>Enter Workspace</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 text-xs text-neutral-500">
              <button
                type="button"
                onClick={() => setIsAuthenticated(false)}
                className="hover:text-black"
              >
                Sign Out Demo Session
              </button>
              <span>Demo Persona Switcher is active</span>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white px-4 py-3 text-center text-[11px] text-neutral-500">
        BARIN ENF Demonstration Environment • Supreme Court A.M. No. 24-10-14-SC Candidate v1.0
      </footer>
    </div>
  );
};
