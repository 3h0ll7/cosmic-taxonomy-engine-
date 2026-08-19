import { PhylogeneticNode } from '../types';

// Radial Hierarchical Cosmic Taxonomy Tree (UNIVERSE -> 5 Domains -> Subclasses -> Objects)
export const COSMIC_PHYLOGENETIC_TREE: PhylogeneticNode = {
  id: 'universe-root',
  name: 'UNIVERSE',
  latinName: 'Cosmos Primordialis et Continuum Spatiotemporale',
  level: 'universe',
  description:
    'The supreme taxonomic root of all baryonic matter, radiation, dark matter, and cosmic structures originating ~13.8 billion years ago from the Big Bang Singularity.',
  apgAnalog: 'Root Kingdom Plantae (Embryophyta Archetype)',
  metadata: {
    epoch: '13.787 ± 0.020 Billion Years',
    subClade: 'Continuum Spatiotemporale',
    distance: 'Observable Radius ~46.5 Billion Light-Years',
  },
  children: [
    // 1. EXOPLANETS
    {
      id: 'domain-exoplanets',
      name: 'Exoplanets',
      latinName: 'Divisio Exoplanetaria (Planetae Extrasolares)',
      level: 'category',
      description:
        'Planetary bodies gravitationally bound to stars beyond our Solar System, ranging from temperate terrestrial silicate lithospheres to ultra-hot gas giant atmospheres.',
      apgAnalog: 'Classis Angiospermae (Flowering Diverse Worlds)',
      metadata: {
        epoch: 'Confirmed census > 5,600+ worlds',
        subClade: 'Extrasolar Planetary Architectures',
      },
      children: [
        {
          id: 'sub-terrestrial',
          name: 'Terrestrial & Rocky Worlds',
          latinName: 'Ordo Planetae Telluricae',
          level: 'subclass',
          description:
            'Differentiated rocky planets with silicate mantles and iron-nickel cores residing predominantly within circumstellar habitable zones.',
          metadata: { subClade: 'Silicate & Iron Lithospheres' },
          sampleObjects: ['Kepler-186f', 'TRAPPIST-1e', 'Proxima Centauri b', 'LHS 1140 b'],
          children: [
            {
              id: 'obj-kepler-186f',
              name: 'Kepler-186f',
              latinName: 'Exoterra temperata kepleri-186f',
              level: 'object',
              description: 'First validated Earth-sized planet orbiting in the habitable zone of an M-dwarf star.',
              metadata: { distance: '500 ly', spectralType: 'M1V Host', temperature: '188 K (−85°C)' }
            },
            {
              id: 'obj-trappist-1e',
              name: 'TRAPPIST-1e',
              latinName: 'Exoterra compacta trappisti-1e',
              level: 'object',
              description: 'Resonant rocky world with high Earth Similarity Index (0.85) in ultra-cool dwarf system.',
              metadata: { distance: '39.5 ly', spectralType: 'M8V Host', temperature: '251 K (−22°C)' }
            },
            {
              id: 'obj-proxima-b',
              name: 'Proxima Centauri b',
              latinName: 'Exoterra proxima centauri-b',
              level: 'object',
              description: 'Closest known terrestrial exoplanet to our Solar System, receiving 65% of Earth stellar flux.',
              metadata: { distance: '4.25 ly', spectralType: 'M5.5Ve Host', temperature: '234 K' }
            },
            {
              id: 'obj-lhs-1140b',
              name: 'LHS 1140 b',
              latinName: 'Tellurica densa lhs-1140b',
              level: 'object',
              description: 'Dense rocky super-Earth with substantial water ice/liquid hydrosphere potential.',
              metadata: { distance: '48.8 ly', spectralType: 'M4.5V Host', temperature: '235 K' }
            }
          ]
        },
        {
          id: 'sub-hycean',
          name: 'Super-Earths & Hycean Worlds',
          latinName: 'Ordo Planetae Oceanicae Hycean',
          level: 'subclass',
          description:
            'Sub-Neptune transitional worlds with volatile-rich hydrogen envelopes overlaying vast global liquid water oceans.',
          metadata: { subClade: 'Hydrogen-Rich Hydrospheric Worlds' },
          sampleObjects: ['K2-18 b', 'TOI-700 d', 'Gliese 1214 b'],
          children: [
            {
              id: 'obj-k2-18b',
              name: 'K2-18 b',
              latinName: 'Hycean habitabilis k2-18b',
              level: 'object',
              description: 'Habitable-zone sub-Neptune with verified carbon-bearing atmospheric signatures (CH4, CO2).',
              metadata: { distance: '124 ly', spectralType: 'M2.5V Host', temperature: '265 K' }
            },
            {
              id: 'obj-toi-700d',
              name: 'TOI-700 d',
              latinName: 'Exoterra tranquilla toi-700d',
              level: 'object',
              description: 'Earth-sized planet in habitable zone of quiet M-dwarf star without flares.',
              metadata: { distance: '101.4 ly', spectralType: 'M2V Host', temperature: '269 K' }
            },
            {
              id: 'obj-gliese-1214b',
              name: 'Gliese 1214 b',
              latinName: 'Planeta vaporosa gliese-1214b',
              level: 'object',
              description: 'Water-world archetype shrouded in reflective photochemical atmospheric aerosols.',
              metadata: { distance: '48 ly', spectralType: 'M4.5V Host', temperature: '550 K' }
            }
          ]
        },
        {
          id: 'sub-gasgiants',
          name: 'Gas Giants & Hot Jupiters',
          latinName: 'Ordo Planetae Jovianae',
          level: 'subclass',
          description:
            'Massive hydrogen-helium Jovian envelopes experiencing extreme atmospheric irradiation and tidal forces.',
          metadata: { subClade: 'Jovian Gas Giant Envelopes' },
          sampleObjects: ['HD 209458 b', 'WASP-12 b', '51 Pegasi b'],
          children: [
            {
              id: 'obj-hd-209458b',
              name: 'HD 209458 b (Osiris)',
              latinName: 'Jovianus evaporans osiris',
              level: 'object',
              description: 'Archetypal transiting hot Jupiter with comet-like evaporating hydrogen exosphere.',
              metadata: { distance: '159 ly', spectralType: 'G0V Host', temperature: '1,400 K' }
            },
            {
              id: 'obj-wasp-12b',
              name: 'WASP-12 b',
              latinName: 'Jovianus carbonaceus wasp-12b',
              level: 'object',
              description: 'Egg-shaped ultra-hot Jupiter being tidally consumed by its host star.',
              metadata: { distance: '1,410 ly', spectralType: 'G0 Host', temperature: '2,500 K' }
            },
            {
              id: 'obj-51-pegasi-b',
              name: '51 Pegasi b (Dimidium)',
              latinName: 'Jovianus primordialis pegasi-b',
              level: 'object',
              description: 'First exoplanet discovered orbiting a Sun-like star (1995 Nobel Discovery).',
              metadata: { distance: '50.5 ly', spectralType: 'G2IV Host', temperature: '1,280 K' }
            }
          ]
        },
        {
          id: 'sub-lava-worlds',
          name: 'Lava & Ultra-Short-Period Worlds',
          latinName: 'Ordo Planetae Chthoniae Igneae',
          level: 'subclass',
          description:
            'Tidally locked extreme worlds orbiting inside tidal disruption radii with molten magma oceans.',
          metadata: { subClade: 'Magma & Vaporized Rock Oceans' },
          sampleObjects: ['55 Cancri e', 'Kepler-10 b', 'WASP-76 b'],
          children: [
            {
              id: 'obj-55-cancri-e',
              name: '55 Cancri e (Janssen)',
              latinName: 'Tellurica ignea cancri-e',
              level: 'object',
              description: 'Super-Earth with silicate lava seas and carbon-rich interior composition.',
              metadata: { distance: '41 ly', spectralType: 'G8V Host', temperature: '2,400 K' }
            },
            {
              id: 'obj-kepler-10b',
              name: 'Kepler-10 b',
              latinName: 'Tellurica densa kepler-10b',
              level: 'object',
              description: 'Iron-dense magma world orbiting its host star every 20 hours.',
              metadata: { distance: '608 ly', spectralType: 'G4V Host', temperature: '2,100 K' }
            },
            {
              id: 'obj-wasp-76b',
              name: 'WASP-76 b',
              latinName: 'Jovianus ferreus wasp-76b',
              level: 'object',
              description: 'Ultra-hot giant where vaporized iron condenses into liquid iron rain on the nightside.',
              metadata: { distance: '634 ly', spectralType: 'F7V Host', temperature: '2,500 K' }
            }
          ]
        }
      ]
    },

    // 2. STARS
    {
      id: 'domain-stars',
      name: 'Stars',
      latinName: 'Divisio Stellaris (Stellae et Nucleosyntheses)',
      level: 'category',
      description:
        'Self-luminous plasma spheroids powered by core thermonuclear fusion cascades across the Morgan-Keenan spectral classification.',
      apgAnalog: 'Classis Pinopsida (Evergreen Stellar Furnaces)',
      metadata: {
        epoch: 'Stellar Nucleosynthesis Engines',
        subClade: 'Spectral Classification (O, B, A, F, G, K, M)',
      },
      children: [
        {
          id: 'sub-supergiants',
          name: 'Massive Stars & Supergiants',
          latinName: 'Ordo Stellae Supergigantes',
          level: 'subclass',
          description:
            'Evolved high-mass stars with enormous luminosities nearing terminal core collapse and supernova nucleosynthesis.',
          metadata: { subClade: 'Post-Main Sequence Massive Clades' },
          sampleObjects: ['Betelgeuse', 'Rigel', 'VY Canis Majoris', 'R136a1'],
          children: [
            {
              id: 'obj-betelgeuse',
              name: 'Betelgeuse (Alpha Orionis)',
              latinName: 'Supergigas rubra alpha-orionis',
              level: 'object',
              description: 'Pulsating red supergiant (M1-2 Ia-ab) with radius ~800 times the Sun nearing supernova collapse.',
              metadata: { distance: '642.5 ly', spectralType: 'M2Ia-ab', temperature: '3,600 K' }
            },
            {
              id: 'obj-rigel',
              name: 'Rigel (Beta Orionis)',
              latinName: 'Supergigas caerulea beta-orionis',
              level: 'object',
              description: 'Luminous blue supergiant (B8Ia) shining with 120,000 times solar luminosity.',
              metadata: { distance: '860 ly', spectralType: 'B8Ia', temperature: '12,100 K' }
            },
            {
              id: 'obj-vy-canis-majoris',
              name: 'VY Canis Majoris',
              latinName: 'Hypergigas rubra canis-majoris',
              level: 'object',
              description: 'One of the largest known red hypergiants, ejecting massive circumstellar dust arcs.',
              metadata: { distance: '3,900 ly', spectralType: 'M5eIa', temperature: '3,490 K' }
            },
            {
              id: 'obj-r136a1',
              name: 'R136a1 (Hypermassive Wolf-Rayet)',
              latinName: 'Hypergigas wolf-rayet r136a1',
              level: 'object',
              description: 'Most massive known star (~215 M☉) in the Tarantula Nebula radiating at Eddington limit.',
              metadata: { distance: '163,000 ly', spectralType: 'WN5h', temperature: '46,000 K' }
            }
          ]
        },
        {
          id: 'sub-mainsequence',
          name: 'Main-Sequence & Solar Analogs',
          latinName: 'Ordo Stellae Sequentiae Principalis',
          level: 'subclass',
          description:
            'Stable hydrogen-burning main-sequence stars providing long-term stellar radiation equilibria for planetary biospheres.',
          metadata: { subClade: 'Stable Hydrogen Core Fusion' },
          sampleObjects: ['Sol (The Sun)', 'Alpha Centauri A', 'Vega', 'Sirius A'],
          children: [
            {
              id: 'obj-sol',
              name: 'Sol (The Sun)',
              latinName: 'Stella solaris sol-i',
              level: 'object',
              description: 'Yellow G-dwarf main-sequence star anchor of the Solar System (G2V).',
              metadata: { distance: '0.0000158 ly', spectralType: 'G2V', temperature: '5,778 K' }
            },
            {
              id: 'obj-alpha-centauri-a',
              name: 'Alpha Centauri A (Rigil Kentaurus)',
              latinName: 'Stella solaris centauri-a',
              level: 'object',
              description: 'Nearest G-type solar analog star to Earth, forming a triple system with B and Proxima.',
              metadata: { distance: '4.37 ly', spectralType: 'G2V', temperature: '5,790 K' }
            },
            {
              id: 'obj-vega',
              name: 'Vega (Alpha Lyrae)',
              latinName: 'Stella candida vega',
              level: 'object',
              description: 'Fast-rotating A-type standard photometric benchmark star with a circumstellar debris disk.',
              metadata: { distance: '25.0 ly', spectralType: 'A0Va', temperature: '9,602 K' }
            },
            {
              id: 'obj-sirius-a',
              name: 'Sirius A (Alpha Canis Majoris)',
              latinName: 'Stella praeclara sirius-a',
              level: 'object',
              description: 'Brightest star in Earth night sky, paired in binary orbit with white dwarf Sirius B.',
              metadata: { distance: '8.6 ly', spectralType: 'A1V', temperature: '9,940 K' }
            }
          ]
        },
        {
          id: 'sub-dwarfs',
          name: 'Red & Brown Dwarfs',
          latinName: 'Ordo Stellae Nanae Rubrae et Brunneae',
          level: 'subclass',
          description:
            'Ultra-cool, low-mass stars and substellar substructures with convective dynamos and multi-trillion-year lifespans.',
          metadata: { subClade: 'Low-Mass M & L/T/Y Dwarfs' },
          sampleObjects: ['Proxima Centauri', 'TRAPPIST-1', "Teegarden's Star"],
          children: [
            {
              id: 'obj-proxima-centauri',
              name: 'Proxima Centauri',
              latinName: 'Nana rubra proxima centauri',
              level: 'object',
              description: 'Nearest star to the Sun (4.25 ly), an active flaring M-dwarf hosting two planets.',
              metadata: { distance: '4.25 ly', spectralType: 'M5.5Ve', temperature: '3,042 K' }
            },
            {
              id: 'obj-trappist-1-star',
              name: 'TRAPPIST-1 Host Star',
              latinName: 'Nana ultra-frigida trappist-1',
              level: 'object',
              description: 'Ultra-cool red dwarf hosting seven transiting Earth-sized terrestrial planets.',
              metadata: { distance: '39.5 ly', spectralType: 'M8V', temperature: '2,566 K' }
            },
            {
              id: 'obj-teegardens-star',
              name: "Teegarden's Star",
              latinName: 'Nana quieta teegarden',
              level: 'object',
              description: 'Ancient, low-activity red dwarf with two temperate habitable-zone terrestrial planets.',
              metadata: { distance: '12.5 ly', spectralType: 'M7V', temperature: '2,904 K' }
            }
          ]
        },
        {
          id: 'sub-remnants',
          name: 'Degenerate Remnants & Compact Objects',
          latinName: 'Ordo Corpora Degenerata',
          level: 'subclass',
          description:
            'Extreme quantum-degenerate endpoints of stellar evolution: electron-degenerate white dwarfs, neutron stars, and black holes.',
          metadata: { subClade: 'White Dwarfs, Pulsars, Black Holes' },
          sampleObjects: ['Sirius B', 'Crab Pulsar', 'Cygnus X-1'],
          children: [
            {
              id: 'obj-sirius-b',
              name: 'Sirius B (The Pup)',
              latinName: 'Nana alba degenerata sirius-b',
              level: 'object',
              description: 'First identified white dwarf supported by electron degeneracy pressure.',
              metadata: { distance: '8.6 ly', spectralType: 'DA2 White Dwarf', temperature: '25,200 K' }
            },
            {
              id: 'obj-crab-pulsar',
              name: 'Crab Pulsar (PSR B0531+21)',
              latinName: 'Pulsar neutronica cancri',
              level: 'object',
              description: 'Rapidly spinning neutron star (30 rotations/sec) powering the Crab Nebula synchrotron glow.',
              metadata: { distance: '6,500 ly', spectralType: 'Neutron Star / Pulsar', temperature: '1.6 × 10^6 K' }
            },
            {
              id: 'obj-cygnus-x1',
              name: 'Cygnus X-1',
              latinName: 'Foramen nigrum stellare cygnus-x1',
              level: 'object',
              description: 'First confirmed stellar-mass black hole (~21 M☉) accreting gas from a blue supergiant companion.',
              metadata: { distance: '7,300 ly', spectralType: 'Black Hole Binary', temperature: 'Accretion Disk Multi-Million K' }
            }
          ]
        }
      ]
    },

    // 3. NEBULAE
    {
      id: 'domain-nebulae',
      name: 'Nebulae',
      latinName: 'Divisio Nebularis (Complexus Interstellaris)',
      level: 'category',
      description:
        'Vast interstellar clouds of ionized, neutral, or molecular gas and cosmic dust grains acting as nurseries for stellar germination or remnants of terminal stellar ejections.',
      apgAnalog: 'Classis Bryophyta (Primordial Spore Nurseries)',
      metadata: {
        epoch: 'Star Formation & Stellar Death Cycles',
        subClade: 'Interstellar Medium (ISM) Complexes',
      },
      children: [
        {
          id: 'sub-emission',
          name: 'Emission & H-II Nurseries',
          latinName: 'Ordo Regiones H-II Luminosae',
          level: 'subclass',
          description:
            'Fluorescent interstellar hydrogen clouds ionized by ultraviolet flux from embedded hot OB stellar associations.',
          metadata: { subClade: 'Ionized Hydrogen H-II Regions' },
          sampleObjects: ['Orion Nebula (M42)', 'Carina Nebula (NGC 3372)', 'Eagle Nebula (M16)'],
          children: [
            {
              id: 'obj-orion-nebula',
              name: 'Orion Nebula (Messier 42)',
              latinName: 'Nebula emissionis orionis m-42',
              level: 'object',
              description: 'Quintessential starburst nursery spanning 24 ly powered by the central Trapezium Cluster.',
              metadata: { distance: '1,344 ly', subClade: 'H-II Emission Nursery', discovery: 'Ancient / Peiresc 1610' }
            },
            {
              id: 'obj-carina-nebula',
              name: 'Carina Nebula (NGC 3372)',
              latinName: 'Nebula grandis carinae ngc-3372',
              level: 'object',
              description: 'Colossal stellar nursery hosting the hypergiant Eta Carinae and the Mystic Mountain pillars.',
              metadata: { distance: '8,500 ly', subClade: 'Giant Starburst Complex', discovery: 'Lacaille 1751' }
            },
            {
              id: 'obj-eagle-nebula',
              name: 'Eagle Nebula & Pillars of Creation (M16)',
              latinName: 'Columnae creationis aquilae m-16',
              level: 'object',
              description: 'Massive columns of cold molecular hydrogen gas and dust harboring infant protoplanetary proplyds.',
              metadata: { distance: '7,000 ly', subClade: 'Star-Forming Pillars', discovery: 'Cheseaux 1745' }
            }
          ]
        },
        {
          id: 'sub-planetary-nebulae',
          name: 'Planetary Nebulae',
          latinName: 'Ordo Nebulae Planetariae',
          level: 'subclass',
          description:
            'Symmetrical glowing envelopes of ionized gas expelled by asymptotic giant branch (AGB) stars during transition to white dwarfs.',
          metadata: { subClade: 'Terminal Stellar Envelope Ejections' },
          sampleObjects: ['Ring Nebula (M57)', 'Helix Nebula', "Cat's Eye Nebula"],
          children: [
            {
              id: 'obj-ring-nebula',
              name: 'Ring Nebula (Messier 57)',
              latinName: 'Nebula annularis lyrae m-57',
              level: 'object',
              description: 'Iconic barrel-shaped gas shell glowing in [O III] and Balmer lines with central 100,000 K white dwarf.',
              metadata: { distance: '2,570 ly', subClade: 'Planetary Nebula', discovery: 'Darquier 1779' }
            },
            {
              id: 'obj-helix-nebula',
              name: 'Helix Nebula (NGC 7293)',
              latinName: 'Nebula spiralis oculi dei ngc-7293',
              level: 'object',
              description: 'Nearby planetary nebula featuring cometary knots and concentric outer dust rings.',
              metadata: { distance: '655 ly', subClade: 'Cometary Knot Planetary', discovery: 'Harding 1824' }
            },
            {
              id: 'obj-cats-eye-nebula',
              name: "Cat's Eye Nebula (NGC 6543)",
              latinName: 'Nebula oculus felis ngc-6543',
              level: 'object',
              description: 'Complex nested planetary nebula shaped by precessing stellar winds and binary ejection.',
              metadata: { distance: '3,300 ly', subClade: 'Morphologically Complex', discovery: 'Herschel 1786' }
            }
          ]
        },
        {
          id: 'sub-supernova-remnants',
          name: 'Supernova Remnants & Shocks',
          latinName: 'Ordo Relicta Supernovarum',
          level: 'subclass',
          description:
            'High-velocity supersonic blast waves dispersing synthesized heavy elements (iron, silicon, oxygen) into the interstellar medium.',
          metadata: { subClade: 'Supernova Ejecta & Synchrotron Radiation' },
          sampleObjects: ['Crab Nebula (M1)', 'Cassiopeia A', 'Veil Nebula'],
          children: [
            {
              id: 'obj-crab-nebula',
              name: 'Crab Nebula (Messier 1)',
              latinName: 'Relictum supernivae cancri m-1',
              level: 'object',
              description: 'Expanding filamentary debris from historical supernova SN 1054 powered by a 30 Hz central pulsar.',
              metadata: { distance: '6,500 ly', subClade: 'Pulsar Wind Nebula', discovery: 'John Bevis 1731' }
            },
            {
              id: 'obj-cassiopeia-a',
              name: 'Cassiopeia A',
              latinName: 'Relictum cassiopeia-a',
              level: 'object',
              description: 'Youngest known core-collapse supernova remnant in the Milky Way with unburned silicon/sulfur knots.',
              metadata: { distance: '11,000 ly', subClade: 'Core-Collapse Remnant', discovery: 'Radio 1947' }
            },
            {
              id: 'obj-veil-nebula',
              name: 'Veil Nebula (Cygnus Loop)',
              latinName: 'Nebula velum cygni',
              level: 'object',
              description: 'Vast, delicate filamentary remnant of a supernova blast wave that collided with ambient gas 20,000 years ago.',
              metadata: { distance: '2,400 ly', subClade: 'Shock-Heated Filaments', discovery: 'Herschel 1784' }
            }
          ]
        },
        {
          id: 'sub-dark-nebulae',
          name: 'Dark Absorption Clouds',
          latinName: 'Ordo Nebulae Obscurae',
          level: 'subclass',
          description:
            'Dense, cold interstellar molecular clouds opaque to optical light, preserving pristine organic chemistry.',
          metadata: { subClade: 'Cold Molecular Hydrogen & Dust Absorption' },
          sampleObjects: ['Horsehead Nebula', 'Coalsack Nebula', 'Barnard 68'],
          children: [
            {
              id: 'obj-horsehead',
              name: 'Horsehead Nebula (Barnard 33)',
              latinName: 'Nebula caput equi barnard-33',
              level: 'object',
              description: 'Iconic dark dust column silhouetted against glowing pink hydrogen emission cloud IC 434.',
              metadata: { distance: '1,375 ly', subClade: 'Dark Absorption Column', discovery: 'Williamina Fleming 1888' }
            },
            {
              id: 'obj-coalsack',
              name: 'Coalsack Nebula',
              latinName: 'Saccus carbonarius',
              level: 'object',
              description: 'Prominent dark interstellar dust cloud visible to the naked eye in Crux.',
              metadata: { distance: '600 ly', subClade: 'Prominent Southern Dark Cloud', discovery: 'Ancient / Pinzón 1499' }
            },
            {
              id: 'obj-barnard-68',
              name: 'Barnard 68 Bok Globule',
              latinName: 'Globulus bok barnard-68',
              level: 'object',
              description: 'Cold isolated Bok globule on the verge of gravitational collapse into a protostar.',
              metadata: { distance: '500 ly', subClade: 'Isolated Bok Globule', discovery: 'Barnard 1919' }
            }
          ]
        }
      ]
    },

    // 4. GALAXIES
    {
      id: 'domain-galaxies',
      name: 'Galaxies',
      latinName: 'Divisio Galactica (Megastructurae Cosmicae)',
      level: 'category',
      description:
        'Colossal gravitationally bound cosmic engines containing millions to trillions of stars, stellar remnants, interstellar gas, and dark matter halos.',
      apgAnalog: 'Classis Magnoliopsida (Grand Structural Clades)',
      metadata: {
        epoch: 'Hubble & de Vaucouleurs Morphological Sequences',
        subClade: 'Large-Scale Cosmic Structures',
      },
      children: [
        {
          id: 'sub-spiral-galaxies',
          name: 'Spiral & Barred Galaxies',
          latinName: 'Ordo Galaxiae Spirales (S & SB)',
          level: 'subclass',
          description:
            'Rotating disc galaxies with distinct spiral arms driven by density waves and ongoing star formation.',
          metadata: { subClade: 'Spiral & Barred Star-Forming Disks' },
          sampleObjects: ['Milky Way', 'Andromeda (M31)', 'Triangulum (M33)', 'Whirlpool (M51)'],
          children: [
            {
              id: 'obj-milky-way',
              name: 'Milky Way (Via Lactea)',
              latinName: 'Galaxia nostra via lactea',
              level: 'object',
              description: 'Our home barred spiral galaxy (SBbc) spanning 100,000 ly with 400 billion stars and central Sgr A*.',
              metadata: { distance: '0 ly (Inside)', subClade: 'Barred Spiral SBbc', discovery: 'Ancient / Galileo 1610' }
            },
            {
              id: 'obj-andromeda-m31',
              name: 'Andromeda Galaxy (Messier 31)',
              latinName: 'Galaxia spiralis andromedae m-31',
              level: 'object',
              description: 'Dominant spiral galaxy of the Local Group containing ~1 trillion stars approaching Milky Way at 110 km/s.',
              metadata: { distance: '2.537 Mly', subClade: 'Barred Spiral SA(s)b', discovery: 'Al-Sufi 964 AD' }
            },
            {
              id: 'obj-triangulum-m33',
              name: 'Triangulum Galaxy (Messier 33)',
              latinName: 'Galaxia trianguli m-33',
              level: 'object',
              description: 'Third-largest member of the Local Group with active H-II starburst nurseries like NGC 604.',
              metadata: { distance: '2.73 Mly', subClade: 'Pure Unbarred Spiral SA(s)cd', discovery: 'Hodierna 1654' }
            },
            {
              id: 'obj-whirlpool-m51',
              name: 'Whirlpool Galaxy (Messier 51a)',
              latinName: 'Galaxia vortex messier-51',
              level: 'object',
              description: 'Archetypal grand-design spiral galaxy tidally interacting with companion NGC 5195.',
              metadata: { distance: '23 Mly', subClade: 'Grand-Design Spiral SA(s)bc', discovery: 'Messier 1773' }
            }
          ]
        },
        {
          id: 'sub-elliptical-galaxies',
          name: 'Elliptical Galaxies',
          latinName: 'Ordo Galaxiae Ellipticae (E0–E7)',
          level: 'subclass',
          description:
            'Spheroidal or ellipsoidal galaxies dominated by ancient Population II stars with depleted gas reserves and supermassive black holes.',
          metadata: { subClade: 'Triaxial Spheroidal Megagalaxies' },
          sampleObjects: ['Messier 87 (Virgo A)', 'Centaurus A', 'Cygnus A', 'IC 1101'],
          children: [
            {
              id: 'obj-m87',
              name: 'Messier 87 (Virgo A)',
              latinName: 'Galaxia elliptica virgo-a m-87',
              level: 'object',
              description: 'Supergiant elliptical galaxy hosting a 6.5-billion solar mass central black hole (first imaged by EHT).',
              metadata: { distance: '53.5 Mly', subClade: 'Supergiant Elliptical E7', discovery: 'Messier 1781' }
            },
            {
              id: 'obj-centaurus-a',
              name: 'Centaurus A (NGC 5128)',
              latinName: 'Galaxia radio centaurus-a',
              level: 'object',
              description: 'Giant elliptical radio galaxy with a prominent warped dark dust lane from a past spiral merger.',
              metadata: { distance: '13 Mly', subClade: 'Peculiar Elliptical / Merger', discovery: 'Dunlop 1826' }
            },
            {
              id: 'obj-cygnus-a',
              name: 'Cygnus A',
              latinName: 'Galaxia radio cygnus-a',
              level: 'object',
              description: 'One of the most powerful cosmic radio sources with relativistic plasma jets creating colossal lobes.',
              metadata: { distance: '760 Mly', subClade: 'FR-II Giant Radio Galaxy', discovery: 'Grote Reber 1939' }
            },
            {
              id: 'obj-ic-1101',
              name: 'IC 1101 Supergiant',
              latinName: 'Megagalaxia supergigas ic-1101',
              level: 'object',
              description: 'One of the largest known galaxies spanning over 6 million light-years in the Abell 2029 cluster.',
              metadata: { distance: '1.04 Gly', subClade: 'cD Supergiant Elliptical', discovery: 'Herschel 1790' }
            }
          ]
        },
        {
          id: 'sub-lenticular-peculiar',
          name: 'Lenticular & Peculiar Galaxies',
          latinName: 'Ordo Galaxiae Lenticulares et Peculiares',
          level: 'subclass',
          description:
            'Transitional disc galaxies lacking active spiral arms (S0) and collision ring systems created by cosmic impacts.',
          metadata: { subClade: 'Lenticular S0 & Collisional Rings' },
          sampleObjects: ['Sombrero Galaxy (M104)', 'Cartwheel Galaxy', 'Antennae Galaxies'],
          children: [
            {
              id: 'obj-sombrero-m104',
              name: 'Sombrero Galaxy (Messier 104)',
              latinName: 'Galaxia sombrero m-104',
              level: 'object',
              description: 'Magnificent lenticular galaxy with an enormous central bulge and sharp dark absorption dust rim.',
              metadata: { distance: '31.1 Mly', subClade: 'Lenticular SA(s)a', discovery: 'Méchain 1781' }
            },
            {
              id: 'obj-cartwheel',
              name: 'Cartwheel Galaxy',
              latinName: 'Galaxia rota plaustri',
              level: 'object',
              description: 'Monumental collisional ring galaxy formed when a smaller galaxy plunged directly through its disk.',
              metadata: { distance: '500 Mly', subClade: 'Collisional Ring Galaxy', discovery: 'Zwicky 1941' }
            },
            {
              id: 'obj-antennae',
              name: 'Antennae Galaxies (NGC 4038/4039)',
              latinName: 'Galaxiae concurrentes antennae',
              level: 'object',
              description: 'Pair of interacting spiral galaxies undergoing catastrophic merger with sweeping tidal tails.',
              metadata: { distance: '45 Mly', subClade: 'Interacting Merger Pair', discovery: 'Herschel 1785' }
            }
          ]
        },
        {
          id: 'sub-irregular-galaxies',
          name: 'Irregular & Dwarf Galaxies',
          latinName: 'Ordo Galaxiae Irregulares et Nanae',
          level: 'subclass',
          description:
            'Morphologically chaotic galaxies without distinct nucleus or symmetry, often gravitationally perturbed satellites.',
          metadata: { subClade: 'Magellanic & Dwarf Spheroidals' },
          sampleObjects: ['Large Magellanic Cloud (LMC)', 'Small Magellanic Cloud (SMC)', 'Sagittarius Dwarf'],
          children: [
            {
              id: 'obj-lmc',
              name: 'Large Magellanic Cloud (LMC)',
              latinName: 'Nubes magellanica major',
              level: 'object',
              description: 'Satellite galaxy of the Milky Way containing the vigorous Tarantula Nebula starburst region.',
              metadata: { distance: '163,000 ly', subClade: 'Magellanic Spiral / Irregular', discovery: 'Al-Sufi 964 AD' }
            },
            {
              id: 'obj-smc',
              name: 'Small Magellanic Cloud (SMC)',
              latinName: 'Nubes magellanica minor',
              level: 'object',
              description: 'Dwarf companion containing several hundred million stars with pristine low-metallicity gas.',
              metadata: { distance: '200,000 ly', subClade: 'Dwarf Irregular', discovery: 'Ancient / Vespucci 1503' }
            },
            {
              id: 'obj-sagittarius-dwarf',
              name: 'Sagittarius Dwarf Spheroidal (Sgr dSph)',
              latinName: 'Galaxia nana sagittarii',
              level: 'object',
              description: 'Looping satellite galaxy currently being tidally disrupted and assimilated by the Milky Way.',
              metadata: { distance: '70,000 ly', subClade: 'Dwarf Spheroidal', discovery: 'Ibata 1994' }
            }
          ]
        }
      ]
    },

    // 5. SPACE MISSIONS
    {
      id: 'domain-missions',
      name: 'Space Missions',
      latinName: 'Divisio Apparatus Spatialis (Technosphaera Astronomica)',
      level: 'category',
      description:
        'Human-engineered observational platforms, cryogenic space telescopes, and interstellar robotic emissaries extending taxonomic analysis across the electromagnetic spectrum.',
      apgAnalog: 'Classis Pteridophyta (Instrumental Vessels of Discovery)',
      metadata: {
        epoch: 'Space Age & Ground Astrophysics (1957–Present)',
        subClade: 'Human Astronomical Technosphere',
      },
      children: [
        {
          id: 'sub-space-observatories',
          name: 'Space Observatories & Flagships',
          latinName: 'Ordo Telescopia Spatiales Flagship',
          level: 'subclass',
          description:
            'Premier cryogenic observatories positioned outside Earth atmospheric opacity to capture pristine cosmic photons.',
          metadata: { subClade: 'Infrared, Optical & X-Ray Flagships' },
          sampleObjects: ['James Webb Space Telescope', 'Hubble Space Telescope', 'Chandra X-ray Observatory'],
          children: [
            {
              id: 'obj-jwst',
              name: 'James Webb Space Telescope (JWST)',
              latinName: 'Telescopium cryogenicum l2 webbii',
              level: 'object',
              description: '6.5-meter gold-coated infrared space telescope at Sun-Earth L2 observing first light and exoplanet atmospheres.',
              metadata: { distance: '1.5M km (L2)', subClade: 'Infrared Flagship', discovery: 'Launch 25 Dec 2021' }
            },
            {
              id: 'obj-hubble',
              name: 'Hubble Space Telescope (HST)',
              latinName: 'Telescopium spatiale hubble',
              level: 'object',
              description: 'Legendary 2.4-meter optical/UV space observatory operating for over 35 years in low Earth orbit.',
              metadata: { distance: '540 km (LEO)', subClade: 'Optical/UV Flagship', discovery: 'Launch 24 Apr 1990' }
            },
            {
              id: 'obj-chandra',
              name: 'Chandra X-ray Observatory',
              latinName: 'Telescopium radiis-x chandra',
              level: 'object',
              description: 'High-resolution grazing incidence X-ray optics resolving black hole accretion and supernova shocks.',
              metadata: { distance: '140,000 km Orbit', subClade: 'X-Ray High Energy Flagship', discovery: 'Launch 23 Jul 1999' }
            }
          ]
        },
        {
          id: 'sub-surveyors',
          name: 'All-Sky Surveyors & Astrometry',
          latinName: 'Ordo Observatoria Astrometrica et Transitus',
          level: 'subclass',
          description:
            'Wide-field photometric and astrometric spacecraft mapping billions of stellar positions and transiting exoplanets.',
          metadata: { subClade: 'Astrometry & Planetary Transit Surveys' },
          sampleObjects: ['Gaia Observatory', 'Kepler Space Telescope', 'TESS Satellite'],
          children: [
            {
              id: 'obj-gaia',
              name: 'Gaia Astrometry Observatory',
              latinName: 'Astrometrum gaia l2',
              level: 'object',
              description: 'ESA mission creating the most precise 3D kinematic map of over 1.8 billion stars in the Milky Way.',
              metadata: { distance: '1.5M km (L2)', subClade: '3D Astrometry Mapper', discovery: 'Launch 19 Dec 2013' }
            },
            {
              id: 'obj-kepler-mission',
              name: 'Kepler Space Telescope',
              latinName: 'Photometrum kepler',
              level: 'object',
              description: 'Pioneering exoplanet transit survey discovering >2,600 verified alien worlds across the Kepler field.',
              metadata: { distance: 'Earth-trailing Drift', subClade: 'Transit Photometer', discovery: 'Launch 7 Mar 2009' }
            },
            {
              id: 'obj-tess',
              name: 'TESS (Transiting Exoplanet Survey Satellite)',
              latinName: 'Explorator tess',
              level: 'object',
              description: 'All-sky survey satellite scanning nearby bright stars for transiting exoplanet candidates.',
              metadata: { distance: 'P/2 Resonant High Orbit', subClade: 'All-Sky Photometer', discovery: 'Launch 18 Apr 2018' }
            }
          ]
        },
        {
          id: 'sub-deep-space-probes',
          name: 'Deep Space & Interstellar Probes',
          latinName: 'Ordo Probae Interplanetariae et Interstellariae',
          level: 'subclass',
          description:
            'Autonomous robotic exploration probes journeying to outer planets, the Kuiper Belt, and pristine interstellar medium.',
          metadata: { subClade: 'Outer Solar System & Interstellar In Situ' },
          sampleObjects: ['Voyager 1 & 2', 'Cassini-Huygens', 'New Horizons'],
          children: [
            {
              id: 'obj-voyager-1',
              name: 'Voyager 1 Interstellar Probe',
              latinName: 'Speculor interstellaris voyager-1',
              level: 'object',
              description: 'Most distant human artifact (>24 billion km), measuring in situ interstellar plasma outside the heliosphere.',
              metadata: { distance: '162 AU from Sun', subClade: 'Interstellar In Situ Probe', discovery: 'Launch 5 Sep 1977' }
            },
            {
              id: 'obj-cassini',
              name: 'Cassini-Huygens Mission to Saturn',
              latinName: 'Explorator cassini-huygens',
              level: 'object',
              description: 'Revolutionized Saturnian science, discovering hydrothermal ocean plumes on Enceladus and methane seas on Titan.',
              metadata: { distance: '1.4 Billion km', subClade: 'Outer Planetary Orbiter', discovery: 'Launch 15 Oct 1997' }
            },
            {
              id: 'obj-new-horizons',
              name: 'New Horizons Pluto & Kuiper Belt',
              latinName: 'Proba kuiperiana new-horizons',
              level: 'object',
              description: 'Conducted the first flyby of the Pluto system (2015) and the primordial contact binary Arrokoth (2019).',
              metadata: { distance: '58 AU from Sun', subClade: 'Kuiper Belt Reconnaissance', discovery: 'Launch 19 Jan 2006' }
            }
          ]
        },
        {
          id: 'sub-ground-mega-arrays',
          name: 'Ground Mega-Arrays & VLBI',
          latinName: 'Ordo Interferometria Terrestris',
          level: 'subclass',
          description:
            'Giant optical and submillimeter interferometers leveraging Earth-sized baselines and high-altitude mountain apertures.',
          metadata: { subClade: 'Ground-Based Telescopes & VLBI Arrays' },
          sampleObjects: ['ALMA Submillimeter Array', 'Very Large Telescope (VLT)', 'Event Horizon Telescope (EHT)'],
          children: [
            {
              id: 'obj-alma',
              name: 'ALMA Submillimeter Array',
              latinName: 'Array submillimetricum alma',
              level: 'object',
              description: '66 high-precision radio antennas at 5,000m altitude in Atacama resolving protoplanetary disks and gas kinematics.',
              metadata: { distance: 'Atacama Plateau, Chile', subClade: 'Millimeter Interferometer', discovery: 'Operational 2013' }
            },
            {
              id: 'obj-vlt',
              name: 'Very Large Telescope (VLT / VLTI)',
              latinName: 'Telescopium amplissimum paranal',
              level: 'object',
              description: 'Four 8.2m Unit Telescopes operating independently or combined as an optical interferometer on Cerro Paranal.',
              metadata: { distance: 'Paranal, Chile (2,635m)', subClade: '8.2m Optical Array', discovery: 'Operational 1998' }
            },
            {
              id: 'obj-eht',
              name: 'Event Horizon Telescope (EHT Array)',
              latinName: 'Interferometrum horizontis eventus',
              level: 'object',
              description: 'Global Earth-sized virtual aperture telescope capturing the first direct shadow images of M87* and Sgr A*.',
              metadata: { distance: 'Global Earth Array', subClade: '1.3mm Global VLBI Array', discovery: 'First Shadow 2019' }
            }
          ]
        }
      ]
    }
  ]
};
