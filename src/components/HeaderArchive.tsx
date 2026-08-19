import React from 'react';
import { Compass, Sparkles, Search, BookOpen, Layers, Microscope } from 'lucide-react';

interface HeaderArchiveProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onOpenAiClassifier: () => void;
  onOpenComparator: () => void;
  onSelectQuickCandidate: (id: string) => void;
}

export const HeaderArchive: React.FC<HeaderArchiveProps> = ({
  searchTerm,
  onSearchChange,
  onOpenAiClassifier,
  onOpenComparator,
  onSelectQuickCandidate,
}) => {
  return (
    <header className="border-b border-[#cfc3af] bg-[#faf6ee] relative shadow-xs">
      {/* Top Academic Ribbon */}
      <div className="bg-[#f0e7d8] border-b border-[#dfd5c3] px-4 py-1 flex flex-wrap items-center justify-between text-xs text-[#6b5d49] font-mono-archive tracking-wider">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f]"></span>
            ARCHIVUM TAXONOMIAE ASTRONOMICAE
          </span>
          <span className="hidden sm:inline text-[#a3947d]">|</span>
          <span className="hidden sm:inline">FOLIO VOL. XVIII — APG-IV ASTRO-CLADISTIC ENGINE</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#8c6d31] font-semibold">REGISTRUM SPECIMINUM: ACAD. SCIENT. MDCCCLXXXIV</span>
          <span className="bg-[#dfd5c3] px-2 py-0.5 rounded-xs text-[10px] uppercase font-bold text-[#443828]">SYSTEM VERIFIED</span>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left Title & Latin Subtext */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[#8c6d31] font-semibold border border-[#d6c49e] px-2 py-0.5 rounded-xs bg-[#f4ebe0]">
                Botanical-Astronomy Archive System
              </span>
              <span className="text-xs text-[#7e6f5c] italic font-cormorant">
                Tabulae Classificationis Universalis
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-[#1f2c3d] tracking-tight leading-tight flex items-center gap-3">
              <span>Cosmic Analysis & Astronomical Taxonomic Logic</span>
            </h1>

            <p className="text-sm sm:text-base text-[#5c5243] font-eb max-w-3xl leading-relaxed">
              Synthesizing 19th-century Victorian botanical research taxonomy (APG IV) with contemporary astrophysical telemetry, planetary transmission spectroscopy, and interstellar cladistics.
            </p>
          </div>

          {/* Right Action Controls */}
          <div className="flex flex-wrap items-center gap-2.5 sm:self-end lg:self-center">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8c7e6b]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search taxon, specimen, catalog..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#fdfaf4] border border-[#cfc2ae] rounded-xs text-[#2b2723] placeholder-[#9c8e7a] focus:outline-none focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f] font-mono-archive"
              />
            </div>

            {/* AI Classifier Button */}
            <button
              onClick={onOpenAiClassifier}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e3a5f] hover:bg-[#152a45] text-[#fbf8f1] text-xs font-semibold rounded-xs shadow-xs transition-colors border border-[#0f2137] tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e5c179]" />
              <span>AI Taxonomic Engine</span>
            </button>

            {/* Spectral Comparator */}
            <button
              onClick={onOpenComparator}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f4ebe0] hover:bg-[#ecdfcf] text-[#443828] text-xs font-semibold rounded-xs border border-[#cdbfab] shadow-xs transition-colors tracking-wide"
            >
              <Microscope className="w-3.5 h-3.5 text-[#8c6d31]" />
              <span>Compare Specimen</span>
            </button>
          </div>
        </div>

        {/* Quick Specimen Quick-Pills */}
        <div className="mt-3 pt-2.5 border-t border-[#e8decb] flex items-center gap-2 overflow-x-auto text-xs pb-1">
          <span className="text-[11px] font-semibold text-[#8c6d31] uppercase tracking-wider font-mono-archive shrink-0">
            Catalog Exemplars:
          </span>
          {[
            { id: 'kepler-186f', label: 'Kepler-186f (Candidate 1)' },
            { id: 'messier-42', label: 'Messier 42 (Candidate 2)' },
            { id: 'trappist-1e', label: 'TRAPPIST-1e' },
            { id: 'betelgeuse', label: 'Betelgeuse' },
            { id: 'andromeda-m31', label: 'Andromeda M-31' },
            { id: 'jwst-mission', label: 'JWST L2' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectQuickCandidate(item.id)}
              className="px-2.5 py-0.5 bg-[#f2e9dc] hover:bg-[#e8dcce] border border-[#d6c7b2] rounded-xs text-[#4a3f31] hover:text-[#1e3a5f] shrink-0 font-cormorant text-xs transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
