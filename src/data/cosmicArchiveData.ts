import { CelestialCandidate, PhylogeneticNode } from '../types';
import { EXOPLANETS_CATALOG } from './catalog/exoplanets';
import { STARS_CATALOG } from './catalog/stars';
import { NEBULAE_CATALOG } from './catalog/nebulae';
import { GALAXIES_CATALOG } from './catalog/galaxies';
import { MISSIONS_CATALOG } from './catalog/missions';

export {
  EXOPLANETS_CATALOG,
  STARS_CATALOG,
  NEBULAE_CATALOG,
  GALAXIES_CATALOG,
  MISSIONS_CATALOG,
};

export const CANDIDATE_1_EXOPLANET: CelestialCandidate = {
  id: 'kepler-186f',
  name: 'Kepler-186f',
  latinName: 'Exoplaneta terrestria habitabilis K-186f',
  tabCategory: 'exoplanets',
  category: 'Rocky Exoplanet',
  distance: '500 light-years',
  hostStarOrGalaxy: 'Red Dwarf (Kepler-186 / M1V Class)',
  discoveryDate: '17 April 2014',
  catalogNumber: 'KOI-571.05 / KIC 8120608',
  plateNumber: 'TAB. MDCCCLXXXIV — FIG. IV',
  hierarchy: [
    'Universe',
    'Galaxies',
    'Stellar Systems',
    'Planets',
    'Terrestrial Worlds'
  ],
  taxonomicData: {
    realm: 'Universum (Cosmos Primordialis)',
    clade: 'Galaxiae Spirales (Via Lactea)',
    order: 'Systema Stellare Red-Dwarf K-186',
    family: 'Planetae Telluricae (Rocky Tellurians)',
    genus: 'Exoterra Zonahabitabilis',
    species: 'Kepler-186f (Varietas Temperata)',
    binomialLatin: 'Exoterra temperata kepleri-186f'
  },
  scientificDescription:
    'Kepler-186f represents the quintessential archetype of a temperate terrestrial exoplanet orbiting within the circumstellar habitable zone of an M-dwarf star. Transit transmission spectroscopy reveals an atmospheric profile composed primarily of dense molecular nitrogen and carbon dioxide, with volatile vapor signatures indicating potential liquid surface hydration. The planet receives approximately 32% of the stellar flux Earth receives from the Sun, situating its radiative equilibrium in a cool-temperate regime that prevents runaway atmospheric stripping while sustaining potential oceanic stability.',
  atmosphericAnalysis:
    'High-dispersion transit spectroscopy indicates an optically thick atmospheric envelope with a mean molecular weight of ~28–44 g/mol. Strong spectral dips at 2.7 μm and 4.3 μm correlate with CO2 greenhouse buffering, while muted Rayleigh scattering in the blue spectrum suggests high-altitude photochemical haze layers that mitigate stellar flare ultraviolet irradiation.',
  taxonomicReasoning:
    'Classified within the Clade Tellurica due to its planetary radius of 1.11 R⊕ and derived bulk density of 5.4 g/cm³, indicating a differentiated nickel-iron core (approx. 33% mass fraction) surrounded by a silicate mantle. Its placement in Order Habitantia is substantiated by its orbital semi-major axis (0.432 AU) intersecting the conservative photosynthetic radiation boundary of host star Kepler-186.',
  orbitalCharacteristics: {
    period: '129.94 Earth days',
    semiMajorAxis: '0.432 AU (64.6M km)',
    eccentricity: '< 0.04 (Near Circular)',
    mass: '1.44 M⊕ (Estimated)',
    radius: '1.11 R⊕ (1.11 Earth radii)',
    equilibriumTemp: '188 K (−85°C baseline / ~265 K with CO2 greenhouse)',
    surfaceGravity: '1.17 g (11.48 m/s²)'
  },
  observationalData: {
    instruments: ['Kepler Space Telescope Photometer', 'W. M. Keck Observatory (NIRC2)', 'Gemini North (DSSI)'],
    apparentMagnitude: '14.62 V (Host star)',
    constellation: 'Cygnus (The Swan)',
    rightAscension: '19h 54m 36.65s',
    declination: '+43° 57′ 18.06″'
  },
  spectralSignatures: [
    { molecule: 'CO2 (Carbon Dioxide)', wavelength: '4.26 μm', intensity: 84, note: 'Thermal equilibrium stabilizer' },
    { molecule: 'H2O (Water Vapor)', wavelength: '1.40 μm', intensity: 62, note: 'Lower tropospheric condensation' },
    { molecule: 'N2 (Molecular Nitrogen)', wavelength: 'Continuum', intensity: 78, note: 'Primary barometric carrier' },
    { molecule: 'CH4 (Methane trace)', wavelength: '3.31 μm', intensity: 29, note: 'Photochemically degraded biomarker' },
    { molecule: 'O3 (Ozone screening)', wavelength: '9.60 μm', intensity: 41, note: 'Stratospheric photochemical equilibrium' }
  ],
  compositionBreakdown: [
    { label: 'Silicate Mantle & Crust', percentage: 67, color: '#8c6d31' },
    { label: 'Metallic Core (Fe-Ni)', percentage: 31, color: '#1e3a5f' },
    { label: 'Volatile Hydrosphere', percentage: 2, color: '#4a7c59' }
  ],
  imagePlateUrl: '/src/assets/images/vintage_exoplanet_plate_1787141065787.jpg',
  illustrationCallouts: [
    { id: 'c1', label: 'Corona Solaris Stellare', latinLabel: 'Stella Primaria M1V', x: 22, y: 30, description: 'Low-mass red dwarf star providing stable long-lived stellar irradiance (7+ billion year lifespan).' },
    { id: 'c2', label: 'Limbus Atmosphaericus', latinLabel: 'Stratum Atmosphaericum', x: 62, y: 44, description: 'Nitrogen-carbon dioxide photochemical veil scattering stellar ultraviolet flux.' },
    { id: 'c3', label: 'Orbita Circumstellaris', latinLabel: 'Limes Habitationis', x: 48, y: 78, description: 'Conservative outer boundary of circumstellar liquid water equilibrium (0.432 AU).' },
    { id: 'c4', label: 'Crusta Tellurica', latinLabel: 'Lithosphaera Silicea', x: 74, y: 56, description: 'Solid basaltic silicate lithosphere under 1.17 Earth surface gravities.' }
  ]
};

export const CANDIDATE_2_NEBULA: CelestialCandidate = {
  id: 'messier-42',
  name: 'Messier 42 (Orion Nebula)',
  latinName: 'Nebula Diffusa Orionis Specimen M-42',
  tabCategory: 'nebulae',
  category: 'Emission Nebula',
  hostStarOrGalaxy: 'Milky Way (Orion Arm / Orion Molecular Cloud Complex)',
  distance: '1,344 light-years (412 pc)',
  discoveryDate: '1610 (Nicolas-Claude Fabri de Peiresc)',
  catalogNumber: 'NGC 1976 / LBN 974 / Sharpless 281',
  plateNumber: 'TAB. MDCCCLXXXIV — FIG. VII',
  hierarchy: [
    'Universe',
    'Galaxies',
    'Nebulae',
    'Stellar Nurseries'
  ],
  taxonomicData: {
    realm: 'Universum (Cosmos Primordialis)',
    clade: 'Galaxiae Spirales (Via Lactea)',
    order: 'Interstellar Medium (Complexus Gazae)',
    family: 'Regiones H II (Ionized Hydrogen Nurseries)',
    genus: 'Nebula Emissionis Protostellaris',
    species: 'Orionis Diffusa (M-42)',
    binomialLatin: 'Nebula ionizata orionis major m-42'
  },
  scientificDescription:
    'Messier 42 is an expansive diffuse emission-reflection nebula spanning approximately 24 light-years across. It functions as the nearest high-mass star-forming nursery to our Solar System. Ionized predominantly by intense ultraviolet radiation from the central Trapezium Cluster (θ1 Orionis C, an O7V spectral powerhouse), the interstellar medium glows via recombination cascades of hydrogen, helium, and doubly ionized oxygen ([O III] forbidden transitions at 500.7 nm). Deep infrared surveys have resolved over 700 protostellar systems and protoplanetary discs (proplyds) embedded within its opaque molecular filaments.',
  atmosphericAnalysis:
    'Gas composition consists of 90.8% Hydrogen (ionized H II), 8.9% Helium, and trace heavy elements including Oxygen ([O III], [O II]), Nitrogen ([N II]), Carbon, Sulfur ([S II]), and polycyclic aromatic hydrocarbons (PAHs) excited by non-thermal luminescence.',
  taxonomicReasoning:
    'Classified in the order Nebula Emissionis due to its prominent Balmer emission lines (H-alpha 656.3 nm) and self-luminous gas excited by OB stellar associations. Its developmental clade is designated as "Active Starburst Incubator" owing to the presence of dense Bok globules, Herbig-Haro shock fronts (HH 1, HH 2), and active gravitational collapse in the Kleinmann-Low nebula core.',
  observationalData: {
    instruments: ['James Webb Space Telescope (NIRCam/MIRI)', 'Hubble Space Telescope (ACS/WFC3)', 'ALMA Submillimeter Array', 'Spitzer Space Telescope'],
    apparentMagnitude: '+4.0 (Visible to the naked eye under dark skies)',
    constellation: 'Orion (The Hunter)',
    rightAscension: '05h 35m 17.3s',
    declination: '−05° 23′ 28″'
  },
  spectralSignatures: [
    { molecule: 'H-alpha (Balmer line)', wavelength: '656.28 nm', intensity: 96, note: 'Primary ionized hydrogen recombination emission' },
    { molecule: '[O III] Forbidden line', wavelength: '500.68 nm', intensity: 88, note: 'Doubly ionized oxygen glow (spectral turquoise)' },
    { molecule: '[N II] Ionized Nitrogen', wavelength: '658.34 nm', intensity: 74, note: 'Shock boundary ionization indicator' },
    { molecule: '[S II] Sulfur doublet', wavelength: '671.64 nm', intensity: 62, note: 'Low-excitation shocked molecular gas fronts' },
    { molecule: 'PAH Carbonaceous Organics', wavelength: '3.3 μm / 7.7 μm', intensity: 58, note: 'Hydrocarbon dust grains in photodissociation regions' }
  ],
  compositionBreakdown: [
    { label: 'Ionized Hydrogen (H II)', percentage: 73, color: '#1e3a5f' },
    { label: 'Helium (He I / He II)', percentage: 25, color: '#bfa15f' },
    { label: 'Oxygen, Carbon, Iron & Organics', percentage: 2, color: '#4a7c59' }
  ],
  imagePlateUrl: '/src/assets/images/vintage_orion_nebula_plate_1787141088586.jpg',
  illustrationCallouts: [
    { id: 'n1', label: 'Cluster Trapezium', latinLabel: 'Theta-1 Orionis C (O7V)', x: 48, y: 46, description: 'Massive primary ionizing engine emitting 100,000 times the ultraviolet luminosity of the Sun.' },
    { id: 'n2', label: 'Disci Protoplanetarii', latinLabel: 'Proplydae Circumstellaria', x: 28, y: 62, description: 'Incipient planetary systems forming inside tear-drop shaped ionized envelopes.' },
    { id: 'n3', label: 'Frons Photodissociationis', latinLabel: 'Barra Orionis PDR', x: 68, y: 35, description: 'Dense interface where intense UV light encounters cold molecular gas clouds.' }
  ]
};

// Complete 250-item Taxonomic Archive (50 items per topic)
export const ALL_CELESTIAL_CATALOG: CelestialCandidate[] = [
  ...EXOPLANETS_CATALOG,
  ...STARS_CATALOG,
  ...NEBULAE_CATALOG,
  ...GALAXIES_CATALOG,
  ...MISSIONS_CATALOG
];

// APG IV Redesigned Cosmic Phylogenetic Tree Hierarchy
export { COSMIC_PHYLOGENETIC_TREE } from './cosmicDendrogramData';

