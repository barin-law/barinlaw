import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import {
  Sun,
  Moon,
  Shield,
  User,
  ChevronDown,
  Lock,
  AlertCircle,
  Key,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useSecurity } from '../../context/SecurityContext';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const { currentUser, activeRole, switchRole, availableRoles } = useAuth();
  const { isDark, toggleDarkMode } = useTheme();
  const { threatAlerts, chainIntegrity } = useSecurity();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const activeThreatsCount = threatAlerts.filter((t) => t.status === 'ACTIVE').length;

  return (
    <header
      id="app-main-header"
      className="sticky top-0 z-40 border-b border-black/15 bg-white text-black transition-colors dark:border-white/15 dark:bg-black dark:text-white"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand & Wordmark */}
        <div className="flex items-center gap-3">
          <BrandLogo
            variant="emblem"
            height={36}
            priority
            alt="DHENZE ENF Emblem"
            className="shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight">DHENZE ENF</span>
              <span className="border border-black/30 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider dark:border-white/30">
                Candidate v1.0
              </span>
            </div>
            <p className="hidden text-[11px] text-neutral-600 sm:block dark:text-neutral-400">
              Philippine Electronic Notarization Facility • Supreme Court A.M. No. 24-10-14-SC
            </p>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Security & Cryptography State Pill */}
          <div className="hidden items-center gap-2 border border-black/20 px-2.5 py-1 text-[11px] md:flex dark:border-white/20">
            <Lock className="h-3 w-3 text-black dark:text-white" />
            <span className="font-mono">AES-256 • SHA-256</span>
            {!chainIntegrity.isValid && (
              <span className="flex items-center gap-1 font-bold text-red-600 dark:text-red-400">
                <AlertCircle className="h-3 w-3" />
                Tamper Detected!
              </span>
            )}
            {activeThreatsCount > 0 && (
              <span className="ml-1 border border-black bg-black px-1.5 py-0.2 text-[10px] font-bold text-white dark:border-white dark:bg-white dark:text-black">
                {activeThreatsCount} Threats
              </span>
            )}
          </div>

          {/* Role Switcher Menu */}
          <div className="relative">
            <button
              id="role-switcher-button"
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 border border-black px-3 py-1.5 text-xs font-semibold hover:bg-neutral-100 dark:border-white dark:hover:bg-neutral-900"
              title="Switch role to view the platform from different authorization perspectives"
            >
              <User className="h-3.5 w-3.5" />
              <span className="max-w-[130px] truncate sm:max-w-[200px]">
                {currentUser.name} ({activeRole})
              </span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {roleMenuOpen && (
              <div
                id="role-switcher-dropdown"
                className="absolute right-0 mt-1.5 w-80 border border-black bg-white p-2 shadow-xl z-50 dark:border-white dark:bg-black"
              >
                <div className="border-b border-black/10 pb-2 mb-2 px-2 dark:border-white/10">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Switch Active Persona & Role (RBAC)
                  </p>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                    Simulate permissions and dashboard access:
                  </p>
                </div>

                <div className="max-h-80 overflow-y-auto space-y-1">
                  {availableRoles.map((r) => {
                    const isSelected = activeRole === r.role;
                    return (
                      <button
                        key={r.role}
                        onClick={() => {
                          switchRole(r.role);
                          setRoleMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-2 text-xs transition-colors flex flex-col gap-0.5 border ${
                          isSelected
                            ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black font-semibold'
                            : 'border-transparent hover:border-black/20 hover:bg-neutral-50 dark:hover:border-white/20 dark:hover:bg-neutral-900 text-black dark:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{r.label}</span>
                          <span className="text-[10px] uppercase opacity-70">
                            {r.category}
                          </span>
                        </div>
                        <p className={`text-[10px] line-clamp-1 ${isSelected ? 'opacity-85' : 'text-neutral-500 dark:text-neutral-400'}`}>
                          {r.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            id="dark-mode-toggle-button"
            onClick={toggleDarkMode}
            className="flex h-8 w-8 items-center justify-center border border-black hover:bg-neutral-100 dark:border-white dark:hover:bg-neutral-900"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
