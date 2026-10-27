import React from 'react';
import { Layers, Terminal, Cpu } from 'lucide-react';

const TABS = [
  { id: 'all', label: 'All', icon: Layers },
  { id: 'fullstack', label: 'Full-Stack', icon: Terminal },
  { id: 'saas', label: 'SaaS & Utilities', icon: Cpu },
];

/**
 * ProjectFilterTabs Component
 * Interactive iOS-style glass tab bar for filtering projects
 */
export default function ProjectFilterTabs({
  activeTab,
  onTabChange,
  counts = {},
}) {
  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl ios-glass border border-[var(--border-glass)] shadow-sm max-w-fit overflow-x-auto">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        const count = counts[tab.id];

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 active:scale-95 whitespace-nowrap ${
              isActive
                ? 'text-white bg-electric-blue shadow-[0_0_16px_rgba(59,130,246,0.5)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
            }`}
            aria-selected={isActive}
            role="tab"
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
            {count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-[var(--text-secondary)]'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
