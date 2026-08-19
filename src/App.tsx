/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  CANDIDATE_1_EXOPLANET,
  CANDIDATE_2_NEBULA,
  ALL_CELESTIAL_CATALOG,
} from './data/cosmicArchiveData';
import { CelestialCandidate } from './types';
import { HeaderArchive } from './components/HeaderArchive';
import { NavigationTabs, TabKey } from './components/NavigationTabs';
import { LeftPanelCandidate1 } from './components/LeftPanelCandidate1';
import { RightPanelCandidate2 } from './components/RightPanelCandidate2';
import { CosmicPhylogeneticTree } from './components/CosmicPhylogeneticTree';
import { CatalogFolioView } from './components/CatalogFolioView';
import { TaxonomicAiModal } from './components/TaxonomicAiModal';
import { SpectralComparatorModal } from './components/SpectralComparatorModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('exoplanets');
  const [searchTerm, setSearchTerm] = useState('');
  const [candidate1, setCandidate1] = useState<CelestialCandidate>(CANDIDATE_1_EXOPLANET);
  const [candidate2, setCandidate2] = useState<CelestialCandidate>(CANDIDATE_2_NEBULA);
  
  // Modals
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isComparatorOpen, setIsComparatorOpen] = useState(false);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      exoplanets: ALL_CELESTIAL_CATALOG.filter(c => c.tabCategory === 'exoplanets').length,
      stars: ALL_CELESTIAL_CATALOG.filter(c => c.tabCategory === 'stars').length,
      nebulae: ALL_CELESTIAL_CATALOG.filter(c => c.tabCategory === 'nebulae').length,
      galaxies: ALL_CELESTIAL_CATALOG.filter(c => c.tabCategory === 'galaxies').length,
      missions: ALL_CELESTIAL_CATALOG.filter(c => c.tabCategory === 'missions').length,
    };
  }, []);

  // Filtered lists
  const exoplanets = useMemo(() => {
    return ALL_CELESTIAL_CATALOG.filter(c => c.tabCategory === 'exoplanets');
  }, []);

  const nebulaeAndOthers = useMemo(() => {
    return ALL_CELESTIAL_CATALOG.filter(c => c.tabCategory !== 'exoplanets');
  }, []);

  // Quick candidate selection
  const handleSelectQuickCandidate = (idOrName: string) => {
    const found = ALL_CELESTIAL_CATALOG.find(
      c => c.id === idOrName || c.name.toLowerCase() === idOrName.toLowerCase()
    );
    if (found) {
      if (found.tabCategory === 'exoplanets') {
        setCandidate1(found);
        setActiveTab('exoplanets');
      } else {
        setCandidate2(found);
        setActiveTab(found.tabCategory);
      }
    }
  };

  // Search handling
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) return;
    const lower = term.toLowerCase();
    const match = ALL_CELESTIAL_CATALOG.find(
      c => c.name.toLowerCase().includes(lower) ||
           c.latinName.toLowerCase().includes(lower) ||
           c.category.toLowerCase().includes(lower) ||
           c.catalogNumber.toLowerCase().includes(lower)
    );
    if (match) {
      if (match.tabCategory === 'exoplanets') {
        setCandidate1(match);
      } else {
        setCandidate2(match);
      }
    }
  };

  // Switch tab and automatically align active view candidates if relevant
  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    const candidateInTab = ALL_CELESTIAL_CATALOG.find(c => c.tabCategory === tab);
    if (candidateInTab) {
      if (tab === 'exoplanets') {
        setCandidate1(candidateInTab);
      } else {
        setCandidate2(candidateInTab);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f3eb] text-[#2b2723] flex flex-col selection:bg-[#1e3a5f] selection:text-[#fbf8f1]">
      {/* 1. Victorian Academic Header */}
      <HeaderArchive
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onOpenAiClassifier={() => setIsAiModalOpen(true)}
        onOpenComparator={() => setIsComparatorOpen(true)}
        onSelectQuickCandidate={handleSelectQuickCandidate}
      />

      {/* 2. Top Navigation Tabs */}
      <NavigationTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        counts={tabCounts}
      />

      {/* 3. Main Dashboard: Cosmic Tree as the Primary Starting View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* 3.1 Primary Focal Section: Cosmic Phylogenetic Tree (Radial Dendrogram) */}
        <CosmicPhylogeneticTree
          onSelectCandidateByName={handleSelectQuickCandidate}
        />

        {/* 3.2 Side-by-Side Candidate Taxonomic Specimen Analyses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          {/* Candidate 1 — Exoplanet Classification */}
          <div className="h-full">
            <LeftPanelCandidate1
              candidate={candidate1}
              allExoplanets={exoplanets}
              onSelectCandidate={setCandidate1}
            />
          </div>

          {/* Candidate 2 — Celestial Object Analysis */}
          <div className="h-full">
            <RightPanelCandidate2
              candidate={candidate2}
              allNebulaeAndOthers={nebulaeAndOthers}
              onSelectCandidate={setCandidate2}
            />
          </div>
        </div>

        {/* 3.3 Complete 50-Item Topic Catalog Folio View */}
        <CatalogFolioView
          activeTab={activeTab}
          catalog={ALL_CELESTIAL_CATALOG}
          onSelectAsCandidate1={(item) => setCandidate1(item)}
          onSelectAsCandidate2={(item) => setCandidate2(item)}
        />
      </main>

      {/* 4. Victorian Academic Footer */}
      <footer className="border-t border-[#cfc3af] bg-[#faf6ee] py-4 px-4 sm:px-6 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-[#6e5f4c] font-mono-archive gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1e3a5f]"></span>
            <span>ACADEMIA SCIENTIARUM ASTRONOMICARUM ET BOTANICARUM</span>
          </div>
          <div className="italic font-cormorant text-sm text-[#8c6d31]">
            "Omnia quae sunt in caelo secundum ordinem ac legem cladis disponuntur."
          </div>
          <div className="text-[10px] text-[#8e7f6d]">
            APG-IV ASTRO-TAXONOMIC CLASSIFICATION SYSTEM
          </div>
        </div>
      </footer>

      {/* AI Classifier Modal */}
      <TaxonomicAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApplyAsCandidate={(newCandidate) => {
          setCandidate1(newCandidate);
          setActiveTab('exoplanets');
        }}
      />

      {/* Spectral Comparator Modal */}
      <SpectralComparatorModal
        isOpen={isComparatorOpen}
        onClose={() => setIsComparatorOpen(false)}
        initialCandidateA={candidate1}
        initialCandidateB={candidate2}
      />
    </div>
  );
}
