import React, { useState } from 'react';
import { X, Microscope, ArrowRightLeft, Layers, Compass, Check } from 'lucide-react';
import { CelestialCandidate } from '../types';
import { ALL_CELESTIAL_CATALOG } from '../data/cosmicArchiveData';

interface SpectralComparatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCandidateA?: CelestialCandidate;
  initialCandidateB?: CelestialCandidate;
}

export const SpectralComparatorModal: React.FC<SpectralComparatorModalProps> = ({
  isOpen,
  onClose,
  initialCandidateA,
  initialCandidateB,
}) => {
  const [candidateA, setCandidateA] = useState<CelestialCandidate>(
    initialCandidateA || ALL_CELESTIAL_CATALOG[0]
  );
  const [candidateB, setCandidateB] = useState<CelestialCandidate>(
    initialCandidateB || ALL_CELESTIAL_CATALOG[1]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1f2c3d]/60 backdrop-blur-xs overflow-y-auto">
      <div className="paper-card plate-border-gold w-full max-w-5xl rounded-xs shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#6c5d4a] hover:text-[#1e3a5f] hover:bg-[#eae0ce] rounded-xs transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-[#dfd5c3] pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono-archive text-[#8c6d31] uppercase font-bold">
            <Microscope className="w-4 h-4 text-[#8c6d31]" />
            Comparative Astronomical Cladistics & Spectroscopy
          </div>
          <h2 className="text-2xl font-cinzel font-bold text-[#1f2c3d] mt-1">
            Herbarium Dual Specimen Comparative Folio
          </h2>
          <p className="text-xs sm:text-sm text-[#5c5243] font-eb mt-0.5">
            Side-by-side taxonomic divergence analysis, transmission spectral overlay, and planetary habitability indices.
          </p>
        </div>

        {/* Specimen Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-[#f5ede1] rounded-xs border border-[#dbcdb8]">
            <label className="text-[10px] font-mono-archive font-bold text-[#8c6d31] uppercase block mb-1">
              Specimen Alpha:
            </label>
            <select
              value={candidateA.id}
              onChange={(e) => {
                const found = ALL_CELESTIAL_CATALOG.find(c => c.id === e.target.value);
                if (found) setCandidateA(found);
              }}
              className="w-full text-xs font-cinzel font-bold bg-[#fdfaf5] border border-[#cfc2ae] text-[#1e3a5f] p-2 rounded-xs focus:outline-none"
            >
              {ALL_CELESTIAL_CATALOG.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.category})</option>
              ))}
            </select>
          </div>

          <div className="p-3 bg-[#f5ede1] rounded-xs border border-[#dbcdb8]">
            <label className="text-[10px] font-mono-archive font-bold text-[#8c6d31] uppercase block mb-1">
              Specimen Beta:
            </label>
            <select
              value={candidateB.id}
              onChange={(e) => {
                const found = ALL_CELESTIAL_CATALOG.find(c => c.id === e.target.value);
                if (found) setCandidateB(found);
              }}
              className="w-full text-xs font-cinzel font-bold bg-[#fdfaf5] border border-[#cfc2ae] text-[#8c6d31] p-2 rounded-xs focus:outline-none"
            >
              {ALL_CELESTIAL_CATALOG.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.category})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparative Side-by-Side Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Specimen A Card */}
          <div className="bg-[#fcfaf5] p-4 rounded-xs border border-[#ded4c3] space-y-3">
            <div className="border-b border-[#dfd5c3] pb-2">
              <span className="text-[10px] font-mono-archive text-[#1e3a5f] font-bold">SPECIMEN A</span>
              <h3 className="text-xl font-cinzel font-bold text-[#1e3a5f]">{candidateA.name}</h3>
              <div className="text-xs italic font-cormorant text-[#6b5d49]">{candidateA.latinName}</div>
            </div>

            <div className="space-y-1 text-xs font-eb">
              <div className="flex justify-between py-1 border-b border-[#ebdcca]">
                <span className="text-[#6d5e4b]">Taxon Clade:</span>
                <span className="font-semibold text-[#1e3a5f]">{candidateA.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ebdcca]">
                <span className="text-[#6d5e4b]">Distance:</span>
                <span className="font-mono-archive text-[#2b2723]">{candidateA.distance}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ebdcca]">
                <span className="text-[#6d5e4b]">Host / Galaxy:</span>
                <span className="text-[#8c6d31]">{candidateA.hostStarOrGalaxy}</span>
              </div>
            </div>

            {/* Absorption Peaks */}
            <div className="bg-[#f6efe2] p-2.5 rounded-xs border border-[#dbceba]">
              <div className="text-[10px] font-bold text-[#1e3a5f] font-mono-archive uppercase mb-1">
                Dominant Spectral Absorption Bands
              </div>
              <div className="space-y-1 text-xs font-eb">
                {(candidateA.spectralSignatures || []).slice(0, 3).map((sig, i) => (
                  <div key={i} className="flex justify-between text-[11px]">
                    <span className="font-semibold text-[#3b3125]">{sig.molecule}</span>
                    <span className="font-mono-archive text-[#1e3a5f]">{sig.wavelength}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-[#3d3326] font-eb leading-relaxed text-justify">
              {candidateA.scientificDescription}
            </p>
          </div>

          {/* Specimen B Card */}
          <div className="bg-[#fcfaf5] p-4 rounded-xs border border-[#ded4c3] space-y-3">
            <div className="border-b border-[#dfd5c3] pb-2">
              <span className="text-[10px] font-mono-archive text-[#8c6d31] font-bold">SPECIMEN B</span>
              <h3 className="text-xl font-cinzel font-bold text-[#8c6d31]">{candidateB.name}</h3>
              <div className="text-xs italic font-cormorant text-[#6b5d49]">{candidateB.latinName}</div>
            </div>

            <div className="space-y-1 text-xs font-eb">
              <div className="flex justify-between py-1 border-b border-[#ebdcca]">
                <span className="text-[#6d5e4b]">Taxon Clade:</span>
                <span className="font-semibold text-[#8c6d31]">{candidateB.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ebdcca]">
                <span className="text-[#6d5e4b]">Distance:</span>
                <span className="font-mono-archive text-[#2b2723]">{candidateB.distance}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ebdcca]">
                <span className="text-[#6d5e4b]">Host / Galaxy:</span>
                <span className="text-[#8c6d31]">{candidateB.hostStarOrGalaxy}</span>
              </div>
            </div>

            {/* Absorption Peaks */}
            <div className="bg-[#f6efe2] p-2.5 rounded-xs border border-[#dbceba]">
              <div className="text-[10px] font-bold text-[#8c6d31] font-mono-archive uppercase mb-1">
                Dominant Spectral Absorption Bands
              </div>
              <div className="space-y-1 text-xs font-eb">
                {(candidateB.spectralSignatures || []).slice(0, 3).map((sig, i) => (
                  <div key={i} className="flex justify-between text-[11px]">
                    <span className="font-semibold text-[#3b3125]">{sig.molecule}</span>
                    <span className="font-mono-archive text-[#8c6d31]">{sig.wavelength}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-[#3d3326] font-eb leading-relaxed text-justify">
              {candidateB.scientificDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
