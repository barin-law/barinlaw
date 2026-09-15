import React, { useEffect } from 'react';
import { X, Scale, Activity, CheckCircle, FileSearch } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { NavItemConfig } from '../../data/navigationConfig';
import { UserRole } from '../../types';

interface MobileNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: NavItemConfig[];
  activeItemId: string;
  onSelectItem: (id: string) => void;
  activeRole: UserRole;
  onOpenIntegrationCenter: () => void;
  onOpenUnitTests: () => void;
  onOpenVerificationPortal: () => void;
}

export const MobileNavigationDrawer: React.FC<MobileNavigationDrawerProps> = ({
  isOpen,
  onClose,
  menuItems,
  activeItemId,
  onSelectItem,
  activeRole,
  onOpenIntegrationCenter,
  onOpenUnitTests,
  onOpenVerificationPortal,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = Array.from(new Set(menuItems.map((item) => item.category || 'Workspace')));

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className="relative z-10 flex h-full w-[280px] flex-col border-r border-black bg-white text-black shadow-2xl transition-all dark:border-white dark:bg-black dark:text-white"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-3 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <BrandLogo
              variant="emblem"
              height={32}
              decorative
              className="shrink-0"
            />
            <div>
              <div className="text-sm font-bold leading-none">Barin ENF</div>
              <div className="text-[10px] text-neutral-500 font-mono mt-0.5">
                {activeRole.replace(/_/g, ' ')}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="flex h-7 w-7 items-center justify-center border border-black/20 hover:bg-neutral-100 dark:border-white/20 dark:hover:bg-neutral-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Menu list */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin">
          {categories.map((category) => {
            const itemsInCategory = menuItems.filter((i) => (i.category || 'Workspace') === category);

            return (
              <div key={category} className="space-y-1">
                <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  {category}
                </div>
                <div className="space-y-1">
                  {itemsInCategory.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItemId === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectItem(item.id);
                          onClose();
                        }}
                        className={`flex w-full items-center justify-between px-3 py-2 text-xs transition-colors rounded-sm cursor-pointer ${
                          isActive
                            ? 'border border-black bg-black font-semibold text-white dark:border-white dark:bg-white dark:text-black'
                            : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white dark:text-black' : 'text-neutral-500'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="rounded-full bg-neutral-200 px-1.5 py-0.5 text-[10px] font-bold text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Utilities in footer */}
        <div className="border-t border-black/10 p-3 dark:border-white/10 space-y-1.5">
          <button
            onClick={() => {
              onOpenIntegrationCenter();
              onClose();
            }}
            className="flex w-full items-center gap-2 px-2.5 py-1.5 text-xs text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
          >
            <Activity className="h-3.5 w-3.5" />
            <span>Integration Center</span>
          </button>
          <button
            onClick={() => {
              onOpenUnitTests();
              onClose();
            }}
            className="flex w-full items-center gap-2 px-2.5 py-1.5 text-xs text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
          >
            <CheckCircle className="h-3.5 w-3.5" />
            <span>Invariant Unit Tests</span>
          </button>
          <button
            onClick={() => {
              onOpenVerificationPortal();
              onClose();
            }}
            className="flex w-full items-center gap-2 px-2.5 py-1.5 text-xs text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
          >
            <FileSearch className="h-3.5 w-3.5" />
            <span>Public Verification</span>
          </button>
        </div>
      </div>
    </div>
  );
};
