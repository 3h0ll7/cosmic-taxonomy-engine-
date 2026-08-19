import React, { useState } from 'react';
import { CelestialCandidate } from '../types';
import { ChevronRight, Radio, Eye, Sparkles, Layers, Telescope, CheckCircle2 } from 'lucide-react';

interface RightPanelCandidate2Props {
  candidate: CelestialCandidate;
  allNebulaeAndOthers: CelestialCandidate[];
  onSelectCandidate: (candidate: CelestialCandidate) => void;
}

export const RightPanelCandidate2: React.FC<RightPanelCandidate2Props> = ({
  candidate,
  allNebulaeAndOthers,
  onSelectCandidate,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'treatise' | 'gas_lines' | 'telescopes'>('treatise');

  return (
    <div className="paper-card plate-border p-4 rounded-xs flex flex-col justify-between h-full">
      {/* Victorian Header Plate */}
      <div>
        <div className="flex items-center justify-between border-b border-[#dfd5c3] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8c6d31]"></span>
            <span className="text-[11px] font-mono-archive tracking-widest text-[#8c6d31] uppercase font-bold">
              Specimen Folio · Candidate 2
            </span>
          </div>
          <span className="text-[10px] font-mono-archive text-[#857662] bg-[#f0e7d7] px-2 py-0.5 rounded-xs border border-[#ddd2be]">
            {candidate.plateNumber || 'TAB. MDCCCLXXXIV — FIG. VII'}
          </span>
        </div>

        {/* Section Title */}
        <div className="mb-3">
          <div className="text-xs uppercase tracking-widest text-[#6e5d48] font-cinzel font-semibold">
            Celestial Object Analysis
          </div>
          <div className="flex items-center justify-between mt-1">
            <h2 className="text-2xl font-cinzel font-bold text-[#1a2533]">
              {candidate.name}
            </h2>

            {/* Quick selector for nebulae & other objects */}
            {allNebulaeAndOthers.length > 1 && (
              <select
                value={candidate.id}
                onChange={(e) => {
                  const found = allNebulaeAndOthers.find(p => p.id === e.target.value);
                  if (found) onSelectCandidate(found);
                }}
                className="text-[11px] bg-[#f3ece0] border border-[#cfc2ae] text-[#443828] px-2 py-1 rounded-xs font-cormorant focus:outline-none"
              >
                {allNebulaeAndOthers.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            )}
          </div>
          <div className="text-xs italic text-[#705e49] font-cormorant mt-0.5">
            {candidate.latinName}
          </div>
        </div>

        {/* Vintage Botanical Thumbnail Engraving Inset */}
        <div className="mb-3 p-1.5 bg-[#efe7d8] border border-[#d3c5af] rounded-xs shadow-2xs flex items-center gap-3">
          <div className="w-20 h-20 rounded-xs overflow-hidden border border-[#bfa15f] shrink-0 bg-[#3a2f24]">
            <img
              src={candidate.imagePlateUrl || '/src/assets/images/vintage_orion_nebula_plate_1787141088586.jpg'}
              alt={candidate.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover mix-blend-luminosity filter contrast-125"
            />
          </div>
          <div className="text-xs font-eb leading-tight space-y-1">
            <div className="font-cinzel font-bold text-[#1e3a5f] text-[13px]">
              {candidate.name}
            </div>
            <div className="text-[11px] text-[#6b5b48] italic font-cormorant">
              "Ionized Hydrogen & [O III] Recombination Complex"
            </div>
            <div className="text-[10px] font-mono-archive text-[#8c6d31]">
              Coordinates: RA 05h 35m / Dec −05° 23′
            </div>
          </div>
        </div>

        {/* Primary Specimen Metadata Card */}
        <div className="paper-inset p-3 rounded-xs border border-[#dbceb9] mb-4 space-y-1.5 text-xs font-eb">
          <div className="flex justify-between items-center py-0.5 border-b border-[#e2d7c4]">
            <span className="text-[#6d5e4b] font-medium">Type:</span>
            <span className="font-semibold text-[#1e3a5f] bg-[#e7decc] px-2 py-0.5 rounded-xs font-mono-archive text-[11px]">
              {candidate.category}
            </span>
          </div>

          <div className="flex justify-between items-center py-0.5 border-b border-[#e2d7c4]">
            <span className="text-[#6d5e4b] font-medium">Galaxy / Host:</span>
            <span className="font-semibold text-[#2b2723]">
              {candidate.hostStarOrGalaxy || 'Milky Way (Via Lactea)'}
            </span>
          </div>

          <div className="flex justify-between items-center py-0.5 border-b border-[#e2d7c4]">
            <span className="text-[#6d5e4b] font-medium">Distance:</span>
            <span className="font-semibold text-[#8c6d31] font-mono-archive text-[11px]">
              {candidate.distance}
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
            <Sparkles className="w-3 h-3 text-[#8c6d31]" />
            Classification Hierarchy
          </div>
          
          <div className="flex flex-wrap items-center gap-1 text-[11px] font-cormorant font-semibold text-[#3a3227]">
            {candidate.hierarchy.map((step, idx) => (
              <React.Fragment key={idx}>
                <span className={`px-1.5 py-0.5 rounded-xs ${
                  idx === candidate.hierarchy.length - 1
                    ? 'bg-[#8c6d31] text-[#f7f3eb] font-bold shadow-xs'
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
            <span>FAMILY: {candidate.taxonomicData.family}</span>
            <span className="text-[#1e3a5f] font-bold">NURSERY CLADE</span>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex border-b border-[#d8ccba] mb-3 text-xs font-cinzel">
          <button
            onClick={() => setActiveSubTab('treatise')}
            className={`pb-1.5 px-2 border-b-2 font-semibold transition-colors ${
              activeSubTab === 'treatise'
                ? 'border-[#8c6d31] text-[#8c6d31]'
                : 'border-transparent text-[#7e6e5a] hover:text-[#2b2723]'
            }`}
          >
            Scientific Treatise
          </button>
          <button
            onClick={() => setActiveSubTab('gas_lines')}
            className={`pb-1.5 px-2 border-b-2 font-semibold transition-colors ${
              activeSubTab === 'gas_lines'
                ? 'border-[#8c6d31] text-[#8c6d31]'
                : 'border-transparent text-[#7e6e5a] hover:text-[#2b2723]'
            }`}
          >
            Gas Composition
          </button>
          <button
            onClick={() => setActiveSubTab('telescopes')}
            className={`pb-1.5 px-2 border-b-2 font-semibold transition-colors ${
              activeSubTab === 'telescopes'
                ? 'border-[#8c6d31] text-[#8c6d31]'
                : 'border-transparent text-[#7e6e5a] hover:text-[#2b2723]'
            }`}
          >
            Telescope Telemetry
          </button>
        </div>

        {/* Tab Contents */}
        {activeSubTab === 'treatise' && (
          <div className="space-y-3">
            {/* Detailed Scientific Paragraph */}
            <div className="bg-[#fcfaf5] p-3 rounded-xs border border-[#ded4c3] shadow-2xs">
              <div className="text-[10px] uppercase font-bold text-[#8c6d31] font-mono-archive mb-1">
                Gas Composition & Star Formation Regions
              </div>
              <p className="text-xs sm:text-[13px] text-[#332c24] font-eb leading-relaxed text-justify">
                {candidate.scientificDescription}
              </p>
            </div>

            {/* Infrared Observations & Protoplanetary Disks */}
            <div className="bg-[#f3ece0] p-3 rounded-xs border-l-2 border-l-[#8c6d31] border-r border-t border-b border-[#dfd5c3]">
              <div className="text-[10px] uppercase font-bold text-[#8c6d31] font-mono-archive mb-1 flex items-center gap-1">
                <Telescope className="w-3 h-3 text-[#8c6d31]" />
                Infrared Observations & Proplyds
              </div>
              <p className="text-xs text-[#42372a] font-eb italic leading-relaxed">
                {candidate.taxonomicReasoning}
              </p>
            </div>
          </div>
        )}

        {activeSubTab === 'gas_lines' && (
          <div className="space-y-3">
            <div className="bg-[#fdfaf5] p-2.5 rounded-xs border border-[#ded4c3]">
              <div className="text-[10px] uppercase font-bold text-[#8c6d31] font-mono-archive mb-2">
                Balmer & Forbidden Emission Transitions
              </div>
              
              <div className="space-y-2">
                {(candidate.spectralSignatures || []).map((feat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono-archive">
                      <span className="font-bold text-[#2a241d]">{feat.molecule}</span>
                      <span className="text-[#1e3a5f]">{feat.wavelength}</span>
                    </div>
                    <div className="w-full bg-[#e8dcce] h-2 rounded-xs overflow-hidden">
                      <div
                        className="bg-[#8c6d31] h-full rounded-xs transition-all"
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

            {/* Nebula Gas Composition */}
            <div className="bg-[#f5ede0] p-2.5 rounded-xs border border-[#d8cbba]">
              <div className="text-[10px] font-bold text-[#6b5d49] font-mono-archive uppercase mb-1.5">
                Volumetric Ionization Breakdown
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

        {activeSubTab === 'telescopes' && (
          <div className="bg-[#fcfaf5] p-3 rounded-xs border border-[#ded4c3] space-y-2 text-xs font-eb">
            <div className="text-[10px] uppercase font-bold text-[#8c6d31] font-mono-archive mb-1">
              Observational Array Telemetry
            </div>

            <div className="space-y-2 text-[11px] font-mono-archive">
              <div className="p-2 bg-[#f4ece0] rounded-xs border border-[#e0d6c4]">
                <div className="text-[9px] text-[#7a6b57]">PRIMARY OBSERVING INSTRUMENTS</div>
                <div className="font-bold text-[#1e3a5f] mt-0.5 space-y-0.5">
                  {(candidate.observationalData?.instruments || ['JWST NIRCam', 'Hubble WFC3', 'ALMA']).map((inst, i) => (
                    <div key={i}>• {inst}</div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-[#f4ece0] rounded-xs border border-[#e0d6c4]">
                  <div className="text-[9px] text-[#7a6b57]">APPARENT MAGNITUDE</div>
                  <div className="font-bold text-[#8c6d31] mt-0.5">{candidate.observationalData?.apparentMagnitude || '+4.0 V'}</div>
                </div>
                <div className="p-2 bg-[#f4ece0] rounded-xs border border-[#e0d6c4]">
                  <div className="text-[9px] text-[#7a6b57]">CONSTELLATION</div>
                  <div className="font-bold text-[#1e3a5f] mt-0.5">{candidate.observationalData?.constellation || 'Orion'}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Archival Footnote Stamp */}
      <div className="mt-4 pt-2.5 border-t border-[#dfd5c3] flex items-center justify-between text-[10px] text-[#857662] font-mono-archive">
        <span>OBSERVATORIUM: PARIS & L2 WEBB</span>
        <span className="italic font-cormorant text-xs text-[#1e3a5f]">H-II Active Classification</span>
      </div>
    </div>
  );
};
