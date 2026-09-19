import React, { useEffect, useState } from 'react';
import {
  X,
  Scale,
  Activity,
  CheckCircle,
  FileSearch,
  Headphones,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  UserCheck,
  Briefcase,
  Users,
  FileText,
  MessageSquare,
  Stamp,
  Sliders,
  FolderClosed,
  ChevronsUpDown,
} from 'lucide-react';
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
  onOpenSupport?: () => void;
}

const getCategoryIcon = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('overview') || cat.includes('dashboard')) return LayoutDashboard;
  if (cat.includes('identity')) return UserCheck;
  if (cat.includes('case') || cat.includes('matter')) return Briefcase;
  if (cat.includes('participant') || cat.includes('witness')) return Users;
  if (cat.includes('document') || cat.includes('evidence')) return FileText;
  if (cat.includes('consultation') || cat.includes('hearing') || cat.includes('message')) return MessageSquare;
  if (cat.includes('notari') || cat.includes('stamp')) return Stamp;
  if (cat.includes('account') || cat.includes('setting')) return Sliders;
  return FolderClosed;
};

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
  onOpenSupport,
}) => {
  const categories: string[] = Array.from(new Set<string>((menuItems || []).map((item) => item.category || 'Workspace')));

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    const activeCat = (menuItems || []).find((i) => i.id === activeItemId)?.category || categories[0] || 'Overview';
    categories.forEach((cat) => {
      initial[cat] = cat === activeCat || cat === 'Overview';
    });
    return initial;
  });

  useEffect(() => {
    const activeCat = (menuItems || []).find((i) => i.id === activeItemId)?.category;
    if (activeCat) {
      setOpenCategories((prev) => ({ ...prev, [activeCat]: true }));
    }
  }, [activeItemId, menuItems]);

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const areAllExpanded = categories.length > 0 && categories.every((cat) => openCategories[cat]);

  const toggleAll = () => {
    const next = !areAllExpanded;
    const res: Record<string, boolean> = {};
    categories.forEach((c) => (res[c] = next));
    setOpenCategories(res);
  };
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
              <div className="text-sm font-bold leading-none">Dhenze ENF</div>
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
        <nav className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
          {categories.length > 1 && (
            <div className="flex items-center justify-between px-2 pb-1 text-[10px] font-mono text-neutral-500 border-b border-black/10 dark:border-white/10 mb-2">
              <span className="uppercase tracking-wider">Workspace Modules</span>
              <button
                onClick={toggleAll}
                className="flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              >
                <ChevronsUpDown className="h-3 w-3" />
                <span>{areAllExpanded ? 'Collapse All' : 'Expand All'}</span>
              </button>
            </div>
          )}

          {categories.map((category) => {
            const itemsInCategory = menuItems.filter((i) => (i.category || 'Workspace') === category);
            const isCategoryOpen = openCategories[category] ?? false;
            const CategoryIcon = getCategoryIcon(category);
            const hasActiveChild = itemsInCategory.some((i) => i.id === activeItemId);
            const totalBadgeCount = itemsInCategory.reduce((acc, item) => {
              const count = typeof item.badge === 'number' ? item.badge : parseInt(item.badge as string, 10);
              return isNaN(count) ? acc : acc + count;
            }, 0);

            return (
              <div key={category} className="space-y-1">
                <button
                  type="button"
                  onClick={() => toggleCategory(category)}
                  aria-expanded={isCategoryOpen}
                  className={`w-full flex items-center justify-between px-2 py-2 rounded-sm text-left transition-colors cursor-pointer ${
                    hasActiveChild
                      ? 'bg-neutral-100 text-black font-semibold dark:bg-neutral-900 dark:text-white'
                      : 'text-neutral-600 hover:bg-neutral-100/70 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <CategoryIcon className="h-3.5 w-3.5 shrink-0 text-neutral-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wider truncate">
                      {category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {totalBadgeCount > 0 && (
                      <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] font-bold text-white dark:bg-white dark:text-black">
                        {totalBadgeCount}
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-neutral-400">
                      {itemsInCategory.length}
                    </span>
                    {isCategoryOpen ? (
                      <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />
                    )}
                  </div>
                </button>

                {isCategoryOpen && (
                  <div className="space-y-1 pl-2">
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
                          className={`flex w-full items-center justify-between px-2.5 py-1.5 text-xs transition-colors rounded-sm cursor-pointer ${
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
                            <span className="rounded-full bg-neutral-200 px-1.5 py-0.2 text-[10px] font-bold text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
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
          {onOpenSupport && (
            <button
              onClick={() => {
                onOpenSupport();
                onClose();
              }}
              className="flex w-full items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
            >
              <Headphones className="h-3.5 w-3.5" />
              <span>Contact Admin / Support</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
