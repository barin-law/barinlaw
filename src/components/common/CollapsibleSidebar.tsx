import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { NavItemConfig } from '../../data/navigationConfig';
import { AccessibleTooltip } from './AccessibleTooltip';
import { UserRole } from '../../types';
import {
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Activity,
  CheckCircle,
  FileSearch,
  ExternalLink,
  Headphones,
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
import { siteContact } from '../../config/contactConfig';

interface CollapsibleSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
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

export const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  menuItems,
  activeItemId,
  onSelectItem,
  activeRole,
  onOpenIntegrationCenter,
  onOpenUnitTests,
  onOpenVerificationPortal,
  onOpenSupport,
}) => {
  // Group menu items by category if available
  const categories: string[] = Array.from(new Set<string>((menuItems || []).map((item) => item.category || 'Workspace')));

  // Track open state of categories: default to opening the category of the active item
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    const activeItem = (menuItems || []).find((i) => i.id === activeItemId);
    const activeCat = activeItem?.category || categories[0] || 'Overview';
    categories.forEach((cat) => {
      // Keep active category and Overview open by default, others collapsed to keep layout tidy
      initial[cat] = cat === activeCat || cat === 'Overview';
    });
    return initial;
  });

  // Automatically expand category if user navigates to an item in it
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

  const toggleAllCategories = () => {
    const nextState = !areAllExpanded;
    const updated: Record<string, boolean> = {};
    categories.forEach((cat) => {
      updated[cat] = nextState;
    });
    setOpenCategories(updated);
  };

  return (
    <aside
      id="application-sidebar"
      aria-label="Application Navigation Sidebar"
      className={`hidden md:flex flex-col border-r border-black/15 bg-neutral-50 dark:border-white/15 dark:bg-neutral-950 transition-all duration-200 select-none ${
        isCollapsed ? 'w-[76px]' : 'w-[270px]'
      }`}
    >
      {/* Sidebar Header / Role Info */}
      <div className={`flex items-center border-b border-black/10 dark:border-white/10 ${
        isCollapsed ? 'flex-col gap-2 py-2 px-1' : 'justify-between px-3 py-2.5'
      }`}>
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5 truncate pr-1">
            <BrandLogo
              variant="emblem"
              height={34}
              decorative
              className="shrink-0"
            />
            <div className="flex flex-col truncate">
              <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Role Workspace
              </span>
              <span className="text-xs font-bold text-black dark:text-white truncate">
                {activeRole.replace(/_/g, ' ')}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center pt-1" title="DHENZE ENF">
            <BrandLogo
              variant="emblem"
              height={32}
              decorative
              className="shrink-0"
            />
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={`flex h-7 w-7 items-center justify-center border border-black/20 hover:bg-neutral-200 dark:border-white/20 dark:hover:bg-neutral-800 transition-colors ${
            isCollapsed ? 'mx-auto' : ''
          }`}
        >
          {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Nav Menu Items */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-2 scrollbar-thin">
        {!isCollapsed && categories.length > 1 && (
          <div className="flex items-center justify-between px-2 pb-1 text-[10px] font-mono text-neutral-500 border-b border-black/10 dark:border-white/10 mb-2">
            <span className="uppercase tracking-wider">Workspace Modules</span>
            <button
              onClick={toggleAllCategories}
              className="flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              title={areAllExpanded ? 'Collapse all categories' : 'Expand all categories'}
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
              {!isCollapsed ? (
                <button
                  type="button"
                  onClick={() => toggleCategory(category)}
                  aria-expanded={isCategoryOpen}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-sm text-left transition-colors cursor-pointer ${
                    hasActiveChild
                      ? 'bg-neutral-200/70 text-black font-semibold dark:bg-neutral-800/80 dark:text-white'
                      : 'text-neutral-600 hover:bg-neutral-200/40 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white'
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
              ) : (
                /* Icon mode divider or indicator */
                <div className="my-1 border-t border-black/10 dark:border-white/10" />
              )}

              {/* Items List (only if open or if sidebar is collapsed into icons) */}
              {(isCategoryOpen || isCollapsed) && (
                <div className={`space-y-0.5 ${!isCollapsed ? 'pl-2' : ''}`}>
                  {itemsInCategory.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItemId === item.id;

                    const buttonElement = (
                      <button
                        onClick={() => onSelectItem(item.id)}
                        className={`group flex w-full items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                          isActive
                            ? 'border border-black bg-black font-semibold text-white shadow-xs dark:border-white dark:bg-white dark:text-black'
                            : 'text-neutral-700 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white'
                        } ${isCollapsed ? 'justify-center px-0' : ''}`}
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white dark:text-black' : 'text-neutral-500 group-hover:text-black dark:group-hover:text-white'}`} />
                        
                        {!isCollapsed && (
                          <div className="flex flex-1 items-center justify-between truncate">
                            <span className="truncate">{item.label}</span>
                            <div className="flex items-center gap-1.5 ml-1.5">
                              {item.statusBadge && (
                                <span
                                  className={`text-[9px] font-mono px-1 py-0.2 border uppercase ${
                                    isActive
                                      ? 'border-neutral-500 bg-neutral-800 text-white dark:bg-neutral-200 dark:text-black'
                                      : 'border-neutral-300 bg-neutral-100 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400'
                                  }`}
                                >
                                  {item.statusBadge}
                                </span>
                              )}
                              {item.badge && (
                                <span
                                  className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                                    isActive
                                      ? 'bg-white text-black dark:bg-black dark:text-white'
                                      : 'bg-neutral-300 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </button>
                    );

                    return isCollapsed ? (
                      <AccessibleTooltip key={item.id} content={`${category}: ${item.label}`} position="right">
                        {buttonElement}
                      </AccessibleTooltip>
                    ) : (
                      <div key={item.id}>{buttonElement}</div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Global Utilities in Sidebar Footer */}
      <div className="border-t border-black/10 p-2 dark:border-white/10 space-y-1">
        {!isCollapsed && (
          <div className="px-2 pt-1 pb-1 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
            Platform Utilities
          </div>
        )}

        {/* Integration Center */}
        {isCollapsed ? (
          <AccessibleTooltip content="Integration Center (18 Adapters)" position="right">
            <button
              onClick={onOpenIntegrationCenter}
              className="flex w-full items-center justify-center p-2 text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800 cursor-pointer"
            >
              <Activity className="h-4 w-4" />
            </button>
          </AccessibleTooltip>
        ) : (
          <button
            onClick={onOpenIntegrationCenter}
            className="flex w-full items-center gap-2 px-2 py-1.5 text-xs text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800 cursor-pointer"
          >
            <Activity className="h-3.5 w-3.5" />
            <span className="truncate">Integration Center</span>
          </button>
        )}

        {/* Invariant Unit Tests */}
        {isCollapsed ? (
          <AccessibleTooltip content="Accreditation Invariant Tests" position="right">
            <button
              onClick={onOpenUnitTests}
              className="flex w-full items-center justify-center p-2 text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800 cursor-pointer"
            >
              <CheckCircle className="h-4 w-4" />
            </button>
          </AccessibleTooltip>
        ) : (
          <button
            onClick={onOpenUnitTests}
            className="flex w-full items-center gap-2 px-2 py-1.5 text-xs text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800 cursor-pointer"
          >
            <CheckCircle className="h-3.5 w-3.5" />
            <span className="truncate">Invariant Unit Tests</span>
          </button>
        )}

        {/* Public Verification */}
        {isCollapsed ? (
          <AccessibleTooltip content="Public Verification Portal" position="right">
            <button
              onClick={onOpenVerificationPortal}
              className="flex w-full items-center justify-center p-2 text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800 cursor-pointer"
            >
              <FileSearch className="h-4 w-4" />
            </button>
          </AccessibleTooltip>
        ) : (
          <button
            onClick={onOpenVerificationPortal}
            className="flex w-full items-center gap-2 px-2 py-1.5 text-xs text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800 cursor-pointer"
          >
            <FileSearch className="h-3.5 w-3.5" />
            <span className="truncate">Public Verification</span>
          </button>
        )}

        {/* Contact Administrator / Support Desk */}
        {onOpenSupport && (
          isCollapsed ? (
            <AccessibleTooltip content="Contact Administrator & Support Desk" position="right">
              <button
                onClick={onOpenSupport}
                className="flex w-full items-center justify-center p-2 text-neutral-700 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-800 cursor-pointer"
              >
                <Headphones className="h-4 w-4" />
              </button>
            </AccessibleTooltip>
          ) : (
            <button
              onClick={onOpenSupport}
              className="flex w-full items-center gap-2 px-2 py-1.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-800 cursor-pointer"
            >
              <Headphones className="h-3.5 w-3.5" />
              <span className="truncate">Contact Admin / Support</span>
            </button>
          )
        )}
      </div>
    </aside>
  );
};
