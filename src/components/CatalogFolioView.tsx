import React, { useState, useMemo } from 'react';
import { CelestialCandidate } from '../types';
import { TabKey } from './NavigationTabs';
import { Search, Filter, BookOpen, Layers, ArrowUpDown, ChevronRight, Eye, Sparkles } from 'lucide-react';

interface CatalogFolioViewProps {
  activeTab: TabKey;
  catalog: CelestialCandidate[];
  onSelectAsCandidate1: (candidate: CelestialCandidate) => void;
  onSelectAsCandidate2: (candidate: CelestialCandidate) => void;
}

export const CatalogFolioView: React.FC<CatalogFolioViewProps> = ({
  activeTab,
  catalog,
  onSelectAsCandidate1,
  onSelectAsCandidate2,
}) => {
  const [filterText, setFilterText] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'distance' | 'category'>('name');
  const [viewLayout, setViewLayout] = useState<'grid' | 'table'>('grid');

  // Filter for active tab (50 items)
  const topicItems = useMemo(() => {
    return catalog.filter(item => item.tabCategory === activeTab);
  }, [catalog, activeTab]);

  // Extract distinct categories in active topic
  const subCategories = useMemo(() => {
    const set = new Set<string>();
    topicItems.forEach(item => set.add(item.category));
    return Array.from(set);
  }, [topicItems]);

  // Filtered & Sorted 50 items
  const displayedItems = useMemo(() => {
    let list = topicItems.filter(item => {
      const matchSearch =
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.latinName.toLowerCase().includes(filterText.toLowerCase()) ||
        item.catalogNumber.toLowerCase().includes(filterText.toLowerCase()) ||
        item.category.toLowerCase().includes(filterText.toLowerCase());

      const matchCategory = selectedSubCategory === 'all' || item.category === selectedSubCategory;
      return matchSearch && matchCategory;
    });

    if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'category') {
      list = [...list].sort((a, b) => a.category.localeCompare(b.category));
    }
    return list;
  }, [topicItems, filterText, selectedSubCategory, sortBy]);

  const topicLabels: Record<TabKey, { title: string; subtitle: string; clade: string }> = {
    exoplanets: {
      title: 'Exoplanetary Flora & Terrestrial Clades',
      subtitle: '50 Cataloged Extrasolar Planetary Systems & Astrobiological Worlds',
      clade: 'Divisio Exoplanetaria'
    },
    stars: {
      title: 'Stellar Genera & Spectral Classifications',
      subtitle: '50 Cataloged Stars from Protostellar Cores to Evolved Supergiants',
      clade: 'Divisio Stellaris'
    },
    nebulae: {
      title: 'Nebular Complexes & Protostellar Nurseries',
      subtitle: '50 Cataloged Emission, Reflection, and Planetary Gaseous Shells',
      clade: 'Divisio Nebularis'
    },
    galaxies: {
      title: 'Galactic Morphologies & Cosmic Megastructures',
      subtitle: '50 Cataloged Spiral, Barred, Elliptical, and Primordial Deep Galaxies',
      clade: 'Divisio Galactica'
    },
    missions: {
      title: 'Space Missions & Astronomical Technosphere',
      subtitle: '50 Cataloged Space Observatories, Interstellar Probes, and Flagships',
      clade: 'Divisio Apparatus Spatialis'
    }
  };

  const currentTopic = topicLabels[activeTab];

  return (
    <section className="paper-card plate-border p-4 sm:p-6 rounded-xs mt-6 space-y-5">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#dfd5c3] pb-3 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8c6d31]"></span>
            <span className="text-[11px] font-mono-archive tracking-widest text-[#8c6d31] uppercase font-bold">
              Complete Botanical Catalog Folio · {currentTopic.clade}
            </span>
            <span className="text-[10px] bg-[#1e3a5f] text-[#fbf8f1] px-2 py-0.5 rounded-xs font-mono-archive">
              {topicItems.length} SPECIMENS CATALOGED
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#1f2c3d] mt-1">
            {currentTopic.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#5c5243] font-eb mt-0.5">
            {currentTopic.subtitle} — Taxonomic dossiers indexed with Latin binomials, distance metrics, evolutionary lineage, and observational telemetry.
          </p>
        </div>

        {/* Layout & Sort Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex bg-[#ede2d1] p-0.5 rounded-xs border border-[#cfc3af] text-xs font-cinzel">
            <button
              onClick={() => setViewLayout('grid')}
              className={`px-3 py-1 rounded-xs font-semibold transition-colors ${
                viewLayout === 'grid'
                  ? 'bg-[#1e3a5f] text-[#fbf8f1] shadow-xs'
                  : 'text-[#5a4d3c] hover:text-[#2b2723]'
              }`}
            >
              Herbarium Grid
            </button>
            <button
              onClick={() => setViewLayout('table')}
              className={`px-3 py-1 rounded-xs font-semibold transition-colors ${
                viewLayout === 'table'
                  ? 'bg-[#1e3a5f] text-[#fbf8f1] shadow-xs'
                  : 'text-[#5a4d3c] hover:text-[#2b2723]'
              }`}
            >
              Cladistic Ledger
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#f6eee0] p-3 rounded-xs border border-[#d8cbba]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8a7a67] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder={`Search within 50 ${activeTab} by name, Latin clade, catalog index...`}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#fdfaf5] border border-[#cfc2ae] rounded-xs text-[#2b2723] focus:outline-none focus:border-[#1e3a5f] font-mono-archive"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono-archive">
          {/* Subcategory dropdown */}
          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#8c6d31]" />
            <select
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              className="px-2 py-1 bg-[#fdfaf5] border border-[#cfc2ae] text-[#332b21] rounded-xs text-xs focus:outline-none"
            >
              <option value="all">All Sub-Clades ({topicItems.length})</option>
              {subCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#8c6d31]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2 py-1 bg-[#fdfaf5] border border-[#cfc2ae] text-[#332b21] rounded-xs text-xs focus:outline-none"
            >
              <option value="name">Sort by Name</option>
              <option value="category">Sort by Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewLayout === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedItems.map((specimen, idx) => (
            <div
              key={specimen.id}
              className="bg-[#fcf9f2] p-4 rounded-xs border border-[#dbceb8] hover:border-[#bfa15f] transition-all shadow-2xs flex flex-col justify-between group hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#e5dac8] pb-1.5 mb-2">
                  <span className="text-[10px] font-mono-archive font-bold text-[#8c6d31]">
                    NO. {(idx + 1).toString().padStart(2, '0')} · {specimen.catalogNumber}
                  </span>
                  <span className="text-[10px] font-mono-archive text-[#1e3a5f] bg-[#e7decb] px-1.5 py-0.5 rounded-xs">
                    {specimen.distance}
                  </span>
                </div>

                <h3 className="text-base font-cinzel font-bold text-[#1f2c3d] group-hover:text-[#8c6d31] transition-colors">
                  {specimen.name}
                </h3>
                <div className="text-xs italic font-cormorant text-[#6e5f4c] mb-2">
                  {specimen.latinName}
                </div>

                <div className="inline-block bg-[#f0e6d6] text-[#443828] text-[10px] font-mono-archive px-2 py-0.5 rounded-xs border border-[#ded1be] mb-2 font-semibold">
                  {specimen.category}
                </div>

                <p className="text-xs text-[#382f24] font-eb line-clamp-3 leading-relaxed mb-3">
                  {specimen.scientificDescription}
                </p>

                {/* Evolutionary Hierarchy Pills */}
                <div className="text-[10px] font-mono-archive text-[#7a6b57] flex flex-wrap items-center gap-1 mb-3">
                  {specimen.hierarchy.slice(-3).map((h, i) => (
                    <React.Fragment key={i}>
                      <span className="bg-[#ede2d1] px-1.5 py-0.5 rounded-xs">{h}</span>
                      {i < 2 && <span className="text-[#a89783]">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#ebdcca] flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectAsCandidate1(specimen)}
                  className="flex-1 px-2 py-1 bg-[#1e3a5f] hover:bg-[#14263e] text-[#fbf8f1] text-[11px] font-cinzel font-semibold rounded-xs transition-colors text-center"
                >
                  Mount Specimen 1
                </button>
                <button
                  onClick={() => onSelectAsCandidate2(specimen)}
                  className="flex-1 px-2 py-1 bg-[#8c6d31] hover:bg-[#735926] text-[#fbf8f1] text-[11px] font-cinzel font-semibold rounded-xs transition-colors text-center"
                >
                  Mount Specimen 2
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewLayout === 'table' && (
        <div className="overflow-x-auto bg-[#fdfaf4] border border-[#dbceb9] rounded-xs">
          <table className="w-full text-left text-xs font-eb border-collapse">
            <thead>
              <tr className="bg-[#f0e7d7] border-b border-[#cfc2ae] text-[#443828] font-cinzel font-bold text-[11px]">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Specimen Name</th>
                <th className="py-2.5 px-3">Latin Clade Binomial</th>
                <th className="py-2.5 px-3">Taxonomic Category</th>
                <th className="py-2.5 px-3">Distance / Orbit</th>
                <th className="py-2.5 px-3">Host Star / Galaxy</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8dcce]">
              {displayedItems.map((specimen, idx) => (
                <tr key={specimen.id} className="hover:bg-[#f6eee0] transition-colors">
                  <td className="py-2.5 px-3 font-mono-archive text-[#8c6d31] font-bold">
                    {(idx + 1).toString().padStart(2, '0')}
                  </td>
                  <td className="py-2.5 px-3 font-cinzel font-bold text-[#1f2c3d]">
                    {specimen.name}
                  </td>
                  <td className="py-2.5 px-3 italic font-cormorant text-[#6b5c48]">
                    {specimen.latinName}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="bg-[#ede2d1] px-2 py-0.5 rounded-xs font-mono-archive text-[10px] text-[#3a3023]">
                      {specimen.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono-archive text-[11px] text-[#2b2723]">
                    {specimen.distance}
                  </td>
                  <td className="py-2.5 px-3 text-[#55493a]">
                    {specimen.hostStarOrGalaxy}
                  </td>
                  <td className="py-2.5 px-3 text-right space-x-1">
                    <button
                      onClick={() => onSelectAsCandidate1(specimen)}
                      className="px-2 py-0.5 bg-[#1e3a5f] text-[#fbf8f1] rounded-xs font-cinzel text-[10px] hover:bg-[#14263e]"
                    >
                      Specimen 1
                    </button>
                    <button
                      onClick={() => onSelectAsCandidate2(specimen)}
                      className="px-2 py-0.5 bg-[#8c6d31] text-[#fbf8f1] rounded-xs font-cinzel text-[10px] hover:bg-[#735926]"
                    >
                      Specimen 2
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Catalog Ledger Footer */}
      <div className="pt-3 border-t border-[#dfd5c3] flex flex-wrap items-center justify-between text-xs text-[#6e5f4c] font-mono-archive">
        <span>SHOWING {displayedItems.length} OF {topicItems.length} ITEMS IN {activeTab.toUpperCase()} SPECIMEN FOLIO</span>
        <span className="italic font-cormorant text-sm text-[#8c6d31]">
          "Index Universalis — 250 Total Cataloged Astronomical Specimen Plates"
        </span>
      </div>
    </section>
  );
};
