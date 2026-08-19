import React from 'react';
import { Globe, Sun, Sparkles, Orbit, Rocket } from 'lucide-react';

export type TabKey = 'exoplanets' | 'stars' | 'nebulae' | 'galaxies' | 'missions';

interface NavigationTabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  counts: Record<TabKey, number>;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  const tabs: { key: TabKey; label: string; latinClade: string; icon: React.FC<{ className?: string }> }[] = [
    { key: 'exoplanets', label: 'Exoplanets', latinClade: 'Ordo Exoplanetologia', icon: Globe },
    { key: 'stars', label: 'Stars', latinClade: 'Ordo Astrologia Primaria', icon: Sun },
    { key: 'nebulae', label: 'Nebulae', latinClade: 'Ordo Complexus Interstellaris', icon: Sparkles },
    { key: 'galaxies', label: 'Galaxies', latinClade: 'Ordo Megastructura Galactica', icon: Orbit },
    { key: 'missions', label: 'Space Missions', latinClade: 'Ordo Instrumenta Exploratoria', icon: Rocket },
  ];

  return (
    <nav className="bg-[#f5ede1] border-b border-[#cfc3af] px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`group flex items-center gap-2 px-4 py-2 text-xs rounded-xs border transition-all shrink-0 ${
                isActive
                  ? 'bg-[#faf6ee] text-[#1e3a5f] border-[#b89047] shadow-xs font-semibold'
                  : 'bg-[#ede3d3] text-[#5e513f] border-[#d8ccba] hover:bg-[#f5ecde] hover:text-[#2b2723]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#8c6d31]' : 'text-[#8a7b68] group-hover:text-[#5e513f]'}`} />
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-cinzel text-xs">{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-xs font-mono-archive ${
                    isActive ? 'bg-[#1e3a5f] text-[#f7f3eb]' : 'bg-[#ded2be] text-[#6b5d49]'
                  }`}>
                    {counts[tab.key] || 1}
                  </span>
                </div>
                <div className={`text-[9px] italic font-cormorant leading-none mt-0.5 ${
                  isActive ? 'text-[#8c6d31]' : 'text-[#9c8e79]'
                }`}>
                  {tab.latinClade}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
