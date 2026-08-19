import React, { useState } from 'react';
import { Sparkles, X, Loader2, BookOpen, Compass, CheckCircle2, ChevronRight } from 'lucide-react';
import { CelestialCandidate } from '../types';

interface TaxonomicAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyAsCandidate?: (candidate: CelestialCandidate) => void;
}

export const TaxonomicAiModal: React.FC<TaxonomicAiModalProps> = ({
  isOpen,
  onClose,
  onApplyAsCandidate,
}) => {
  const [objectName, setObjectName] = useState('');
  const [categoryHint, setCategoryHint] = useState('Rocky Exoplanet');
  const [parameters, setParameters] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClassify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!objectName.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          objectName: objectName.trim(),
          categoryHint,
          parameters: parameters.trim()
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to classify celestial object.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1f2c3d]/60 backdrop-blur-xs overflow-y-auto">
      <div className="paper-card plate-border-gold w-full max-w-3xl rounded-xs shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#6c5d4a] hover:text-[#1e3a5f] hover:bg-[#eae0ce] rounded-xs transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-[#dfd5c3] pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono-archive text-[#8c6d31] uppercase font-bold">
            <Sparkles className="w-4 h-4 text-[#8c6d31]" />
            AI Astronomical Taxonomic Engine · Gemini 3.7 Flash
          </div>
          <h2 className="text-2xl font-cinzel font-bold text-[#1f2c3d] mt-1">
            Classify Celestial Specimen via Botanical Logic
          </h2>
          <p className="text-xs sm:text-sm text-[#5c5243] font-eb mt-0.5">
            Query the universe for automated Linnaean/APG-IV botanical taxonomic categorization, evolutionary lineage sequencing, and spectral molecular evaluation.
          </p>
        </div>

        {/* Query Form */}
        <form onSubmit={handleClassify} className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-mono-archive font-bold text-[#443828] uppercase">
                Celestial Object / System Name *
              </label>
              <input
                type="text"
                required
                value={objectName}
                onChange={(e) => setObjectName(e.target.value)}
                placeholder="e.g. Enceladus, Proxima Centauri b, M87*, K2-18b, WASP-12b..."
                className="w-full px-3 py-2 text-xs bg-[#fdfaf4] border border-[#cfc2ae] rounded-xs text-[#2b2723] focus:outline-none focus:border-[#1e3a5f] font-mono-archive"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono-archive font-bold text-[#443828] uppercase">
                Category Clade
              </label>
              <select
                value={categoryHint}
                onChange={(e) => setCategoryHint(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#fdfaf4] border border-[#cfc2ae] rounded-xs text-[#2b2723] focus:outline-none focus:border-[#1e3a5f] font-mono-archive"
              >
                <option value="Rocky Exoplanet">Rocky Exoplanet</option>
                <option value="Gas Giant / Hot Jupiter">Gas Giant / Hot Jupiter</option>
                <option value="Hycean Ocean World">Hycean Ocean World</option>
                <option value="Emission Nebula">Emission Nebula</option>
                <option value="Red Supergiant Star">Red Supergiant Star</option>
                <option value="Barred Spiral Galaxy">Barred Spiral Galaxy</option>
                <option value="Cryovolcanic Moon">Cryovolcanic Moon</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono-archive font-bold text-[#443828] uppercase">
              Optional Telemetry / Astrometric Parameters
            </label>
            <input
              type="text"
              value={parameters}
              onChange={(e) => setParameters(e.target.value)}
              placeholder="e.g. Radius: 1.2 R⊕, Teq: 270K, Host: G-type, Transit Period: 42 days..."
              className="w-full px-3 py-1.5 text-xs bg-[#fdfaf4] border border-[#cfc2ae] rounded-xs text-[#2b2723] focus:outline-none focus:border-[#1e3a5f] font-mono-archive"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-xs text-[#756551] font-eb italic">
              Try presets:
              <button
                type="button"
                onClick={() => { setObjectName('K2-18b'); setCategoryHint('Hycean Ocean World'); }}
                className="text-[#1e3a5f] hover:underline"
              >
                K2-18b
              </button>
              •
              <button
                type="button"
                onClick={() => { setObjectName('Enceladus'); setCategoryHint('Cryovolcanic Moon'); }}
                className="text-[#1e3a5f] hover:underline"
              >
                Enceladus
              </button>
              •
              <button
                type="button"
                onClick={() => { setObjectName('Messier 87'); setCategoryHint('Barred Spiral Galaxy'); }}
                className="text-[#1e3a5f] hover:underline"
              >
                M87
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || !objectName.trim()}
              className="flex items-center gap-2 px-5 py-2 bg-[#1e3a5f] hover:bg-[#14263e] disabled:opacity-50 text-[#fbf8f1] text-xs font-semibold rounded-xs shadow-xs transition-colors border border-[#0f2137]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#e8c784]" />
                  <span>Classifying Specimen...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#e8c784]" />
                  <span>Execute Taxonomic Analysis</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-3 bg-[#fbeae8] border border-[#d99f96] rounded-xs text-xs text-[#78261e] font-eb">
            {error}
          </div>
        )}

        {/* Generated Taxonomic Dossier */}
        {result && (
          <div className="border border-[#bfa15f] bg-[#fbf8f2] p-4 rounded-xs shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between border-b border-[#ded2be] pb-2">
              <div>
                <span className="text-[10px] font-mono-archive font-bold text-[#8c6d31] uppercase">
                  CLASSIFICATION FOLIO RESULT
                </span>
                <h3 className="text-xl font-cinzel font-bold text-[#1f2c3d]">
                  {result.name}
                </h3>
                <div className="text-xs italic font-cormorant text-[#7a6b57]">
                  {result.latinName || result.taxonomicData?.binomialLatin}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold bg-[#1e3a5f] text-[#fff] px-2.5 py-1 rounded-xs font-mono-archive">
                  {result.category}
                </span>
                {result.distance && (
                  <div className="text-[11px] font-mono-archive text-[#6e5f4c] mt-1">
                    Dist: {result.distance}
                  </div>
                )}
              </div>
            </div>

            {/* Hierarchy Trail */}
            {result.hierarchy && (
              <div className="bg-[#f3ebd9] p-2.5 rounded-xs border border-[#dbceb8]">
                <div className="text-[10px] font-bold text-[#8c6d31] uppercase tracking-wider font-mono-archive mb-1">
                  Evolutionary Lineage Trail
                </div>
                <div className="flex flex-wrap items-center gap-1 text-xs font-cormorant font-bold text-[#352c21]">
                  {result.hierarchy.map((step: string, idx: number) => (
                    <React.Fragment key={idx}>
                      <span className="bg-[#fbf8f1] px-1.5 py-0.5 rounded-xs border border-[#d6c7b2]">
                        {step}
                      </span>
                      {idx < result.hierarchy.length - 1 && (
                        <ChevronRight className="w-3 h-3 text-[#948470]" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Scientific Description */}
            <div className="bg-[#fefdfb] p-3 rounded-xs border border-[#ded4c3] text-xs font-eb leading-relaxed text-[#352b20]">
              <div className="text-[10px] uppercase font-bold text-[#8c6d31] font-mono-archive mb-1">
                Academic Treatise & Spectral Findings
              </div>
              <p>{result.scientificDescription}</p>
            </div>

            {/* AI Reasoning */}
            {result.taxonomicReasoning && (
              <div className="bg-[#f4eee2] p-3 rounded-xs border-l-2 border-l-[#1e3a5f] border-r border-t border-b border-[#dfd5c3] text-xs font-eb italic text-[#443828]">
                <div className="text-[10px] uppercase font-bold text-[#1e3a5f] font-mono-archive mb-1 not-italic">
                  Taxonomic Rationale
                </div>
                <p>{result.taxonomicReasoning}</p>
              </div>
            )}

            {/* Action to Apply to Dashboard */}
            {onApplyAsCandidate && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    onApplyAsCandidate({
                      id: result.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                      name: result.name,
                      latinName: result.latinName || result.taxonomicData?.binomialLatin || `Taxon ${result.name}`,
                      tabCategory: 'exoplanets',
                      category: result.category || 'Rocky Exoplanet',
                      distance: result.distance || 'Unknown',
                      hostStarOrGalaxy: result.hostStarOrGalaxy || 'Host Star System',
                      discoveryDate: 'AI Taxonomic Discovery',
                      catalogNumber: `ACAD-SPEC-${Date.now().toString().slice(-4)}`,
                      plateNumber: 'TAB. NOVUM — AI CLASSIFICATIO',
                      hierarchy: result.hierarchy || ['Universe', 'Galaxies', 'Stellar Systems', 'Planets', 'Terrestrial Worlds'],
                      taxonomicData: result.taxonomicData || {
                        realm: 'Universum',
                        clade: 'Galaxiae',
                        order: 'Systema Stellare',
                        family: 'Planetae',
                        genus: 'Exoterra',
                        species: result.name,
                        binomialLatin: result.latinName || `Exoterra ${result.name}`
                      },
                      scientificDescription: result.scientificDescription || '',
                      atmosphericAnalysis: result.atmosphericAnalysis || '',
                      taxonomicReasoning: result.taxonomicReasoning || '',
                      spectralSignatures: result.spectralSignatures || [],
                      compositionBreakdown: result.compositionBreakdown || [
                        { label: 'Silicates', percentage: 60, color: '#8c6d31' },
                        { label: 'Core', percentage: 35, color: '#1e3a5f' },
                        { label: 'Volatiles', percentage: 5, color: '#4a7c59' }
                      ],
                      imagePlateUrl: '/src/assets/images/vintage_exoplanet_plate_1787141065787.jpg'
                    });
                    onClose();
                  }}
                  className="px-4 py-2 bg-[#8c6d31] hover:bg-[#735926] text-[#fbf8f1] text-xs font-semibold rounded-xs transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mount as Active Specimen (Candidate 1)</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
