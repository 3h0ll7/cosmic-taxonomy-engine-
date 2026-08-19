export interface TaxonomicHierarchy {
  realm: string;        // e.g. Universe (Universum)
  clade: string;        // e.g. Galaxies (Galaxiae)
  order: string;        // e.g. Stellar Systems / Nebulae
  family: string;       // e.g. Planets / Terrestrial Worlds / Emission Nurseries
  genus: string;        // e.g. Exoplaneta / Silicata
  species: string;      // e.g. Kepler-186f / M42 Orionis
  binomialLatin: string;// e.g. Exoplaneta terrestria habitabilis K-186f
}

export interface SpectralFeature {
  molecule: string;
  wavelength: string;
  intensity: number; // 0 to 100
  note: string;
}

export interface CelestialCandidate {
  id: string;
  name: string;
  latinName: string;
  tabCategory: 'exoplanets' | 'stars' | 'nebulae' | 'galaxies' | 'missions';
  category: string;
  distance: string;
  hostStarOrGalaxy: string;
  discoveryDate: string;
  catalogNumber: string;
  plateNumber: string;
  hierarchy: string[]; // ['Universe', 'Galaxies', 'Stellar Systems', 'Planets', 'Terrestrial Worlds']
  taxonomicData: TaxonomicHierarchy;
  scientificDescription: string;
  atmosphericAnalysis?: string;
  spectralSignatures?: SpectralFeature[];
  orbitalCharacteristics?: {
    period: string;
    semiMajorAxis: string;
    eccentricity: string;
    mass: string;
    radius: string;
    equilibriumTemp: string;
    surfaceGravity: string;
  };
  observationalData?: {
    instruments: string[];
    apparentMagnitude: string;
    constellation: string;
    rightAscension: string;
    declination: string;
  };
  taxonomicReasoning: string;
  imagePlateUrl: string;
  illustrationCallouts?: {
    id: string;
    label: string;
    latinLabel: string;
    x: number; // percentage
    y: number; // percentage
    description: string;
  }[];
  compositionBreakdown: { label: string; percentage: number; color: string }[];
}

export interface PhylogeneticNode {
  id: string;
  name: string;
  latinName: string;
  level: string; // 'universe' | 'category' | 'subclass' | 'object' | 'galaxy' | etc.
  description: string;
  children?: PhylogeneticNode[];
  specimenCount?: number;
  sampleObjects?: string[];
  apgAnalog?: string; // botanical analog note
  metadata?: {
    distance?: string;
    temperature?: string;
    spectralType?: string;
    epoch?: string;
    subClade?: string;
    discovery?: string;
  };
}
