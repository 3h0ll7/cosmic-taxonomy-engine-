import React, { useState } from 'react';
import { CelestialCandidate } from '../types';
import { ChevronRight, Bookmark, Activity, Compass, Info, CheckCircle2, Sliders } from 'lucide-react';

interface LeftPanelCandidate1Props {
  candidate: CelestialCandidate;
  allExoplanets: CelestialCandidate[];
  onSelectCandidate: (candidate: CelestialCandidate) => void;
}

export const LeftPanelCandidate1: React.FC<LeftPanelCandidate1Props> = ({
  candidate,
  allExoplanets,
  onSelectCandidate,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'spectroscopy' | 'orbital'>('overview');

  return (
    <div className="paper-card plate-border p-4 rounded-xs flex flex-col justify-between h-full">
      {/* Victorian Header Plate */}
      <div>
        <div className="flex items-center justify-between border-b border-[#dfd5c3] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1e3a5f]"></span>
            <span className="text-[11px] font-mono-archive tracking-widest text-[#8c6d31] uppercase font-bold">
              Specimen Folio · Candidate 1
            </span>
          </div>
          <span className="text-[10px] font-mono-archive text-[#857662] bg-[#f0e7d7] px-2 py-0.5 rounded-xs border border-[#ddd2be]">
            {candidate.plateNumber || 'TAB. MDCCCLXXXIV — FIG. IV'}
          </span>
        </div>

        {/* Section Title */}
        <div className="mb-3">
          <div className="text-xs uppercase tracking-widest text-[#6e5d48] font-cinzel font-semibold">
            Exoplanet Classification
          </div>
          <div className="flex items-center justify-between mt-1">
            <h2 className="text-2xl font-cinzel font-bold text-[#1a2533]">
              {candidate.name}
            </h2>
            
            {/* Quick selector if multiple exoplanets exist */}
            {allExoplanets.length > 1 && (
              <select
                value={candidate.id}
                onChange={(e) => {
                  const found = allExoplanets.find(p => p.id === e.target.value);
                  if (found) onSelectCandidate(found);
                }}
                className="text-[11px] bg-[#f3ece0] border border-[#cfc2ae] text-[#443828] px-2 py-1 rounded-xs font-cormorant focus:outline-none"
              >
                {allExoplanets.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            )}
          </div>
          <div className="text-xs italic text-[#705e49] font-cormorant mt-0.5">
            {candidate.latinName}
          </div>
        </div>

        {/* Primary Specimen Metadata Card */}
        <div className="paper-inset p-3 rounded-xs border border-[#dbceb9] mb-4 space-y-1.5 text-xs font-eb">
          <div className="flex justify-between items-center py-0.5 border-b border-[#e2d7c4]">
            <span className="text-[#6d5e4b] font-medium">Category:</span>
            <span className="font-semibold text-[#1e3a5f] bg-[#e7decc] px-2 py-0.5 rounded-xs font-mono-archive text-[11px]">
              {candidate.category}
            </span>
          </div>

          <div className="flex justify-between items-center py-0.5 border-b border-[#e2d7c4]">
            <span className="text-[#6d5e4b] font-medium">Distance:</span>
            <span className="font-semibold text-[#2b2723] font-mono-archive text-[11px]">
              {candidate.distance}
            </span>
          </div>

          <div className="flex justify-between items-center py-0.5 border-b border-[#e2d7c4]">
            <span className="text-[#6d5e4b] font-medium">Host Star:</span>
            <span className="font-semibold text-[#8c6d31]">
              {candidate.hostStarOrGalaxy}
            </span>
          </div>

          <div className="flex justify-between items-center py-0.5">
            <span className="text-[#6d5e4b] font-medium">Catalog Index:</span>
            <span className="font-mono-archive text-[11px] text-[#55493a]">
              {candidate.catalogNumber}
            </span>
          </div>
        </div>

        {/* Evolutionary Hierarchy Breadcrumb */}
        <div className="mb-4 bg-[#f8f3eb] p-2.5 rounded-xs border border-[#d6c7b2]">
          <div className="text-[10px] font-bold text-[#8c6d31] uppercase tracking-wider font-mono-archive mb-1.5 flex items-center gap-1">
            <Compass className="w-3 h-3 text-[#8c6d31]" />
            Evolutionary Hierarchy
          </div>
          
          <div className="flex flex-wrap items-center gap-1 text-[11px] font-cormorant font-semibold text-[#3a3227]">
            {candidate.hierarchy.map((step, idx) => (
              <React.Fragment key={idx}>
                <span className={`px-1.5 py-0.5 rounded-xs ${
                  idx === candidate.hierarchy.length - 1
                    ? 'bg-[#1e3a5f] text-[#f7f3eb] font-bold shadow-xs'
                    : 'bg-[#ebe0ce] text-[#4b4032]'
                }`}>
                  {step}
                </span>
                {idx < candidate.hierarchy.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-[#9e8d78]" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Botanical Cladistics Stamp */}
          <div className="mt-2 pt-1.5 border-t border-[#e2d8c7] text-[10px] text-[#73634f] flex justify-between font-mono-archive">
            <span>CLADUS: {candidate.taxonomicData.genus}</span>
            <span className="text-[#8c6d31] font-bold">APG-IV ASTRO CLASS</span>
          </div>
        </div>

        {/* Sub Navigation for Detailed Analysis */}
        <div className="flex border-b border-[#d8ccba] mb-3 text-xs font-cinzel">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`pb-1.5 px-2 border-b-2 font-semibold transition-colors ${
              activeSubTab === 'overview'
                ? 'border-[#1e3a5f] text-[#1e3a5f]'
                : 'border-transparent text-[#7e6e5a] hover:text-[#2b2723]'
            }`}
          >
            Scientific Treatise
          </button>
          <button
            onClick={() => setActiveSubTab('spectroscopy')}
            className={`pb-1.5 px-2 border-b-2 font-semibold transition-colors ${
              activeSubTab === 'spectroscopy'
                ? 'border-[#1e3a5f] text-[#1e3a5f]'
                : 'border-transparent text-[#7e6e5a] hover:text-[#2b2723]'
            }`}
          >
            Spectroscopy
          </button>
          <button
            onClick={() => setActiveSubTab('orbital')}
            className={`pb-1.5 px-2 border-b-2 font-semibold transition-colors ${
              activeSubTab === 'orbital'
                ? 'border-[#1e3a5f] text-[#1e3a5f]'
                : 'border-transparent text-[#7e6e5a] hover:text-[#2b2723]'
            }`}
          >
            Orbital Telemetry
          </button>
        </div>

        {/* Tab Content */}
        {activeSubTab === 'overview' && (
          <div className="space-y-3">
            {/* Detailed Scientific Paragraph */}
            <div className="bg-[#fcfaf5] p-3 rounded-xs border border-[#ded4c3] shadow-2xs">
              <div className="text-[10px] uppercase font-bold text-[#8c6d31] font-mono-archive mb-1">
                Atmospheric & Spectral Analysis
              </div>
              <p className="text-xs sm:text-[13px] text-[#332c24] font-eb leading-relaxed text-justify">
                {candidate.scientificDescription}
              </p>
            </div>

            {/* AI Classification Reasoning */}
            <div className="bg-[#f3ece0] p-3 rounded-xs border-l-2 border-l-[#1e3a5f] border-r border-t border-b border-[#dfd5c3]">
              <div className="text-[10px] uppercase font-bold text-[#1e3a5f] font-mono-archive mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#1e3a5f]" />
                AI Taxonomic Reasoning & Cladistics
              </div>
              <p className="text-xs text-[#42372a] font-eb italic leading-relaxed">
                {candidate.taxonomicReasoning}
              </p>
            </div>
          </div>
        )}

        {activeSubTab === 'spectroscopy' && (
          <div className="space-y-3">
            <div className="bg-[#fdfaf5] p-2.5 rounded-xs border border-[#ded4c3]">
              <div className="text-[10px] uppercase font-bold text-[#8c6d31] font-mono-archive mb-2">
                Molecular Absorption Spectrogram (Transit)
              </div>
              
              <div className="space-y-2">
                {(candidate.spectralSignatures || []).map((feat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono-archive">
                      <span className="font-bold text-[#2a241d]">{feat.molecule}</span>
                      <span className="text-[#8c6d31]">{feat.wavelength}</span>
                    </div>
                    <div className="w-full bg-[#e8dcce] h-2 rounded-xs overflow-hidden">
                      <div
                        className="bg-[#1e3a5f] h-full rounded-xs transition-all"
                        style={{ width: `${feat.intensity}%` }}
                      ></div>
                    </div>
                    <div className="text-[10px] text-[#736553] font-eb italic">
                      {feat.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Atmospheric Composition Breakdown */}
            <div className="bg-[#f5ede0] p-2.5 rounded-xs border border-[#d8cbba]">
              <div className="text-[10px] font-bold text-[#6b5d49] font-mono-archive uppercase mb-1.5">
                Bulk Composition Model
              </div>
              <div className="space-y-1 text-xs font-eb">
                {candidate.compositionBreakdown.map((comp, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: comp.color }}></span>
                      <span className="text-[#3c342a]">{comp.label}</span>
                    </div>
                    <span className="font-mono-archive font-bold text-[11px] text-[#2b2723]">{comp.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'orbital' && (
          <div className="bg-[#fcfaf5] p-3 rounded-xs border border-[#ded4c3] space-y-2 text-xs font-eb">
            <div className="text-[10px] uppercase font-bold text-[#8c6d31] font-mono-archive mb-1">
              Kepler Astrometric Ephemeris
            </div>
            
            {candidate.orbitalCharacteristics && (
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-archive">
                <div className="p-2 bg-[#f4ece0] rounded-xs border border-[#e0d6c4]">
                  <div className="text-[9px] text-[#7a6b57]">ORBITAL PERIOD</div>
                  <div className="font-bold text-[#1e3a5f] mt-0.5">{candidate.orbitalCharacteristics.period}</div>
                </div>
                <div className="p-2 bg-[#f4ece0] rounded-xs border border-[#e0d6c4]">
                  <div className="text-[9px] text-[#7a6b57]">SEMI-MAJOR AXIS</div>
                  <div className="font-bold text-[#1e3a5f] mt-0.5">{candidate.orbitalCharacteristics.semiMajorAxis}</div>
                </div>
                <div className="p-2 bg-[#f4ece0] rounded-xs border border-[#e0d6c4]">
                  <div className="text-[9px] text-[#7a6b57]">PLANETARY RADIUS</div>
                  <div className="font-bold text-[#1e3a5f] mt-0.5">{candidate.orbitalCharacteristics.radius}</div>
                </div>
                <div className="p-2 bg-[#f4ece0] rounded-xs border border-[#e0d6c4]">
                  <div className="text-[9px] text-[#7a6b57]">EQUILIBRIUM TEMP</div>
                  <div className="font-bold text-[#8c6d31] mt-0.5">{candidate.orbitalCharacteristics.equilibriumTemp}</div>
                </div>
                <div className="p-2 bg-[#f4ece0] rounded-xs border border-[#e0d6c4]">
                  <div className="text-[9px] text-[#7a6b57]">ESTIMATED MASS</div>
                  <div className="font-bold text-[#1e3a5f] mt-0.5">{candidate.orbitalCharacteristics.mass}</div>
                </div>
                <div className="p-2 bg-[#f4ece0] rounded-xs border border-[#e0d6c4]">
                  <div className="text-[9px] text-[#7a6b57]">SURFACE GRAVITY</div>
                  <div className="font-bold text-[#1e3a5f] mt-0.5">{candidate.orbitalCharacteristics.surfaceGravity}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Archival Footnote Stamp */}
      <div className="mt-4 pt-2.5 border-t border-[#dfd5c3] flex items-center justify-between text-[10px] text-[#857662] font-mono-archive">
        <span>COLLECTOR: KEPLER MISSION L2</span>
        <span className="italic font-cormorant text-xs text-[#8c6d31]">Status: Taxonomically Verified</span>
      </div>
    </div>
  );
};
