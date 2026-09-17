import React from 'react';
import { BrandLogo } from './BrandLogo';
import { NavItemConfig } from '../../data/navigationConfig';
import { AccessibleTooltip } from './AccessibleTooltip';
import { UserRole } from '../../types';
import {
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Activity,
  CheckCircle,
  FileSearch,
  ExternalLink,
  Headphones,
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
  const categories = Array.from(new Set(menuItems.map((item) => item.category || 'Workspace')));

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
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4 scrollbar-thin">
        {categories.map((category) => {
          const itemsInCategory = menuItems.filter((i) => (i.category || 'Workspace') === category);

          return (
            <div key={category} className="space-y-1">
              {!isCollapsed && (
                <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {category}
                </div>
              )}
              <div className="space-y-0.5">
                {itemsInCategory.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItemId === item.id;

                  const buttonElement = (
                    <button
                      onClick={() => onSelectItem(item.id)}
                      className={`group flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 text-xs transition-colors cursor-pointer ${
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
                    <AccessibleTooltip key={item.id} content={item.label} position="right">
                      {buttonElement}
                    </AccessibleTooltip>
                  ) : (
                    <div key={item.id}>{buttonElement}</div>
                  );
                })}
              </div>
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
