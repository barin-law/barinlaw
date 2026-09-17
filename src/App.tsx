import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SecurityProvider } from './context/SecurityContext';
import { NotarizationProvider } from './context/NotarizationContext';
import { IntegrationProvider } from './context/IntegrationContext';

// Application Shell
import { ApplicationShell } from './components/common/ApplicationShell';
import { IntegrationCenterView } from './components/common/IntegrationCenterView';

// Role-specific Authenticated Dashboards
import { PrincipalDashboard } from './components/dashboards/PrincipalDashboard';
import { EnpDashboard } from './components/dashboards/EnpDashboard';
import { WitnessDashboard } from './components/dashboards/WitnessDashboard';
import { OrgDashboard } from './components/dashboards/OrgDashboard';
import { EnpAssistantDashboard } from './components/dashboards/EnpAssistantDashboard';
import { SecOpsDashboard } from './components/dashboards/SecOpsDashboard';
import { AuditLogDashboard } from './components/dashboards/AuditLogDashboard';
import { DpoDashboard } from './components/dashboards/DpoDashboard';
import { FinanceDashboard } from './components/dashboards/FinanceDashboard';
import { CustomerSupportDashboard } from './components/dashboards/CustomerSupportDashboard';
import { EnfAdminDashboard } from './components/dashboards/EnfAdminDashboard';
import { InternalAuditorDashboard } from './components/dashboards/InternalAuditorDashboard';
import { CourtAuditorDashboard } from './components/dashboards/CourtAuditorDashboard';
import { ComplianceDashboard } from './components/dashboards/ComplianceDashboard';

// System & Forensic Utility Views
import { UnitTestRunnerView } from './components/dashboards/UnitTestRunnerView';
import { VerifyPortal } from './components/dashboards/VerifyPortal';
import { NotarialBookView } from './components/dashboards/NotarialBookView';
import { ApiDocumentationView } from './components/dashboards/ApiDocumentationView';
import { DocumentationView } from './components/dashboards/DocumentationView';

import { ArrowLeft, RefreshCw } from 'lucide-react';
import { ROLE_NAVIGATION_MAP } from './data/navigationConfig';
import { ROLE_ROUTE_MAP, ROUTE_ROLE_MAP } from './data/routesConfig';

// Public & Security Route Pages
import { DhenzeLawFirmPublicPage } from './pages/DhenzeLawFirmPublicPage';
import { SignInPage } from './pages/SignInPage';
import { PublicHomePage } from './pages/PublicHomePage';
import { PublicVerifyPage } from './pages/PublicVerifyPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { AccessDenied403 } from './components/common/AccessDenied403';
import { NotFound404 } from './components/common/NotFound404';

type OverlayView =
  | 'NONE'
  | 'INTEGRATION_CENTER'
  | 'UNIT_TESTS'
  | 'VERIFICATION_PORTAL'
  | 'API_DOCS'
  | 'NOTARIAL_BOOK'
  | 'DOCS';

const MainWorkspace: React.FC = () => {
  const { currentUser } = useAuth();

  // Set default module based on active role
  const defaultModuleForRole = (role: string) => {
    const navItems = ROLE_NAVIGATION_MAP[role as keyof typeof ROLE_NAVIGATION_MAP] || ROLE_NAVIGATION_MAP.PRINCIPAL;
    return navItems[0]?.id || 'principal-overview';
  };

  const [activeModuleId, setActiveModuleId] = useState<string>(() =>
    defaultModuleForRole(currentUser.role)
  );
  const [overlayView, setOverlayView] = useState<OverlayView>('NONE');

  // Sync module whenever role changes
  useEffect(() => {
    setActiveModuleId(defaultModuleForRole(currentUser.role));
    setOverlayView('NONE');
  }, [currentUser.role]);

  // Handle module navigation from child or sidebar
  const handleSelectModule = (moduleId: string) => {
    // Check if it's a global utility module
    if (moduleId === 'global-integration-center') {
      setOverlayView('INTEGRATION_CENTER');
      return;
    }
    if (moduleId === 'global-verify-portal') {
      setOverlayView('VERIFICATION_PORTAL');
      return;
    }
    if (moduleId === 'global-unit-tests') {
      setOverlayView('UNIT_TESTS');
      return;
    }
    if (moduleId === 'enp-register' && currentUser.role !== 'ENP') {
      setOverlayView('NOTARIAL_BOOK');
      return;
    }

    setOverlayView('NONE');
    setActiveModuleId(moduleId);
  };

  return (
    <ApplicationShell
      activeModuleId={activeModuleId}
      setActiveModuleId={handleSelectModule}
      onOpenIntegrationCenter={() => setOverlayView('INTEGRATION_CENTER')}
      onOpenUnitTests={() => setOverlayView('UNIT_TESTS')}
      onOpenVerificationPortal={() => setOverlayView('VERIFICATION_PORTAL')}
    >
      {(currentModuleId, setCurrentModuleId) => {
        // If an overlay view is active, render it with a back button
        if (overlayView !== 'NONE') {
          return (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-black/10 pb-3 dark:border-white/10">
                <button
                  onClick={() => setOverlayView('NONE')}
                  className="flex items-center gap-1.5 border border-black px-3 py-1.5 text-xs font-semibold hover:bg-neutral-100 dark:border-white dark:hover:bg-neutral-900 cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Return to {currentUser.role.replace(/_/g, ' ')} Workspace</span>
                </button>
                <span className="text-[11px] font-mono text-neutral-500">
                  System Utility Mode
                </span>
              </div>

              {overlayView === 'INTEGRATION_CENTER' && <IntegrationCenterView />}
              {overlayView === 'UNIT_TESTS' && <UnitTestRunnerView />}
              {overlayView === 'VERIFICATION_PORTAL' && <VerifyPortal />}
              {overlayView === 'API_DOCS' && <ApiDocumentationView />}
              {overlayView === 'NOTARIAL_BOOK' && <NotarialBookView />}
              {overlayView === 'DOCS' && <DocumentationView />}
            </div>
          );
        }

        // Render role-specific workspace dashboard
        switch (currentUser.role) {
          case 'PRINCIPAL':
            return (
              <PrincipalDashboard
                activeModuleId={currentModuleId}
                onSelectModule={setCurrentModuleId}
              />
            );

          case 'ENP':
            return (
              <EnpDashboard
                activeModuleId={currentModuleId}
                onSelectModule={setCurrentModuleId}
              />
            );

          case 'WITNESS':
            return (
              <WitnessDashboard
                activeModuleId={currentModuleId}
                onSelectModule={setCurrentModuleId}
              />
            );

          case 'ORG_REQUESTER':
          case 'ORG_ADMIN':
            return (
              <OrgDashboard
                activeModuleId={currentModuleId}
                onSelectModule={setCurrentModuleId}
              />
            );

          case 'ENP_ASSISTANT':
            return (
              <EnpAssistantDashboard
                activeModuleId={currentModuleId}
                onSelectModule={setCurrentModuleId}
              />
            );

          case 'SECOPS_ANALYST':
            return (
              <SecOpsDashboard
                activeModuleId={currentModuleId}
                onSelectModule={setCurrentModuleId}
              />
            );

          case 'DPO':
            return (
              <DpoDashboard
                activeModuleId={currentModuleId}
                onSelectModule={setCurrentModuleId}
              />
            );

          case 'FINANCE_OFFICER':
            return (
              <FinanceDashboard
                activeModuleId={currentModuleId}
                onSelectModule={setCurrentModuleId}
              />
            );

          case 'SUPPORT_AGENT':
            return (
              <CustomerSupportDashboard
                activeModuleId={currentModuleId}
                onSelectModule={setCurrentModuleId}
              />
            );

          case 'ENF_ADMIN':
            return (
              <EnfAdminDashboard
                activeModuleId={currentModuleId}
                onSelectModule={setCurrentModuleId}
                onOpenIntegrationCenter={() => setOverlayView('INTEGRATION_CENTER')}
              />
            );

          case 'INTERNAL_AUDITOR':
            return (
              <InternalAuditorDashboard
                activeModuleId={currentModuleId}
                onSelectModule={setCurrentModuleId}
              />
            );

          case 'COURT_AUDITOR':
            return (
              <CourtAuditorDashboard
                activeModuleId={currentModuleId}
                onSelectModule={setCurrentModuleId}
              />
            );

          case 'COMPLIANCE_REVIEWER':
            return (
              <ComplianceDashboard
                activeModuleId={currentModuleId}
                onSelectModule={setCurrentModuleId}
              />
            );

          default:
            return (
              <PrincipalDashboard
                activeModuleId={currentModuleId}
                onSelectModule={setCurrentModuleId}
              />
            );
        }
      }}
    </ApplicationShell>
  );
};

const AppRouter: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // 1. Isolated Route: /dhenze-law-firm (with backwards-compatible alias /barin-law-firm)
  if (currentPath === '/dhenze-law-firm' || currentPath === '/barin-law-firm') {
    return <DhenzeLawFirmPublicPage onNavigate={navigate} />;
  }

  // 2. Demo Sign-In: /sign-in
  if (currentPath === '/sign-in') {
    return <SignInPage onNavigate={navigate} />;
  }

  // 3. Public Verification: /verify
  if (currentPath === '/verify') {
    return <PublicVerifyPage onNavigate={navigate} />;
  }

  // 4. Contact Us / Technical Support: /contact or /contact-us
  if (currentPath === '/contact' || currentPath === '/contact-us') {
    return <ContactUsPage onNavigate={navigate} />;
  }

  // 5. Role-based Dashboard Routes
  if (currentPath in ROUTE_ROLE_MAP) {
    const requiredRole = ROUTE_ROLE_MAP[currentPath];
    if (currentUser.role !== requiredRole) {
      return (
        <AccessDenied403
          currentRole={currentUser.role}
          requiredRole={requiredRole}
          authorizedRoute={ROLE_ROUTE_MAP[currentUser.role]}
          onNavigate={navigate}
          onSignOut={() => {
            logout();
            navigate('/sign-in');
          }}
        />
      );
    }
    return <MainWorkspace />;
  }

  // 6. Default Public Homepage: /
  if (currentPath === '' || currentPath === '/') {
    return <PublicHomePage onNavigate={navigate} />;
  }

  // 7. Unknown route -> Standardized 404 page
  return <NotFound404 onNavigate={navigate} />;
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SecurityProvider>
          <NotarizationProvider>
            <IntegrationProvider>
              <AppRouter />
            </IntegrationProvider>
          </NotarizationProvider>
        </SecurityProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
