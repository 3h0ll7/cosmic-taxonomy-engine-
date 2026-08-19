# Cosmic Analysis & Astronomical Taxonomic Logic

![React](https://img.shields.io/badge/React-19-1e3a5f?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-8c6d31?style=flat-square&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-1e3a5f?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-bfa15f?style=flat-square&logo=tailwindcss)

**An interactive AI-assisted cosmic taxonomy explorer for classifying celestial specimens through an archival astronomical folio.**

Cosmic Analysis & Astronomical Taxonomic Logic is a React and Express application that presents a curated astronomical catalog as a Victorian botanical-science archive. Visitors can explore exoplanets, stars, nebulae, galaxies, and space missions through a cosmic taxonomy dashboard, inspect individual specimen records, compare celestial objects, and optionally generate AI-assisted taxonomic analyses through a Gemini-backed server endpoint.

## Live Demo

[https://cosmic-analysis-astronomical-taxonomic-logic.ai.studio](https://cosmic-analysis-astronomical-taxonomic-logic.ai.studio)

## Features

| Domain | Implemented experience |
| --- | --- |
| Exoplanets | Dedicated exoplanet specimens, orbital characteristics, atmospheric notes, spectral signatures, habitability-style metrics, and specimen selection. |
| Stars | Stellar catalog entries with spectral classifications, distances, mass/radius notes, and taxonomic reasoning. |
| Nebulae | Emission, reflection, planetary, and star-forming nebula records with gas-composition context and archive plates. |
| Galaxies | Galaxy morphology records spanning spiral, barred, elliptical, interacting, and early-universe examples. |
| Space missions | Space observatories, probes, rovers, orbiters, and exploration programs treated as a technospheric catalog domain. |

- **Interactive cosmic dendrogram** — a radial dendrogram begins at the Primordial Universe and branches into five celestial domains, with alternate botanical cladogram and linear hierarchy views.
- **Navigation controls** — the radial view supports mouse-wheel zoom, click-drag pan, touch gestures, keyboard controls, zoom presets, focus/reset actions, fullscreen expansion, collapsible branches, and a mini-radar/minimap.
- **Search and filtering** — the header search can jump to matching catalog specimens; the catalog folio also supports per-domain search, sub-clade filtering, category sorting, and grid/table layouts.
- **Specimen inspection** — side-by-side panels expose taxonomic rank, Latin-style naming, archive metadata, orbital or observational data, composition breakdowns, spectral bands, and plate callouts.
- **Comparison tools** — a comparative folio modal lets users select two celestial objects and review their distance, host system, hierarchy, dominant spectral bands, composition, and divergence notes together.
- **AI-assisted classifier** — when `GEMINI_API_KEY` is configured, the Express server calls the Google GenAI SDK to generate structured JSON taxonomic classifications; without a key, it returns a deterministic fallback specimen analysis.
- **Responsive interface** — the UI is composed with responsive Tailwind classes for single-column mobile layouts and larger multi-panel desktop displays.

## Visual Language

The interface is styled as a scholarly astronomical museum archive rather than a conventional space dashboard. Its visible design system includes:

- parchment-like backgrounds, paper cards, inset panels, and lithographic plate borders;
- deep navy ink for primary labels and actions, with muted gold accents for catalog marks and scientific ornament;
- serif editorial typography from Google Fonts, including Cinzel, Cormorant Garamond, and EB Garamond;
- monospaced archival labels for specimen numbers, folio metadata, and technical controls;
- specimen-folio presentation with Latin-style binomials, catalog numbers, plate identifiers, hierarchy pills, and scientific descriptions;
- vintage astronomical plate imagery used across selected exoplanet, nebular, and phylogenetic views.

## Tech Stack

| Layer | Technologies present in the repository |
| --- | --- |
| Frontend | React 19, React DOM, TypeScript, Vite, Tailwind CSS 4 |
| UI and interaction | lucide-react icons, Motion dependency, custom SVG dendrogram logic, responsive utility classes |
| Server | Express 4, Vite middleware in development, static `dist` serving in production |
| AI integration | `@google/genai` via server-side Gemini endpoints guarded by `GEMINI_API_KEY` |
| Build tooling | Vite, esbuild, tsx, TypeScript compiler |
| Configuration | `vite.config.ts`, `tsconfig.json`, `.env.example`, `metadata.json` |

## Project Structure

```text
.
├── index.html
├── metadata.json
├── package.json
├── server.ts
├── tsconfig.json
├── vite.config.ts
├── .env.example
└── src
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── types.ts
    ├── assets/images
    │   ├── vintage_cosmic_phylogeny_1787141117125.jpg
    │   ├── vintage_exoplanet_plate_1787141065787.jpg
    │   └── vintage_orion_nebula_plate_1787141088586.jpg
    ├── components
    │   ├── CatalogFolioView.tsx
    │   ├── CosmicPhylogeneticTree.tsx
    │   ├── HeaderArchive.tsx
    │   ├── LeftPanelCandidate1.tsx
    │   ├── NavigationTabs.tsx
    │   ├── RightPanelCandidate2.tsx
    │   ├── SpectralComparatorModal.tsx
    │   └── TaxonomicAiModal.tsx
    └── data
        ├── cosmicArchiveData.ts
        ├── cosmicDendrogramData.ts
        └── catalog
            ├── exoplanets.ts
            ├── galaxies.ts
            ├── missions.ts
            ├── nebulae.ts
            └── stars.ts
```

## Getting Started

### Prerequisites

- Node.js compatible with the Vite 6 / TypeScript 5 toolchain.
- npm or another package manager capable of installing from `package.json`.
- Optional: a Gemini API key for live AI-generated classifications.

### Installation

```bash
npm install
```

### Environment variables

Create a local environment file from the example if you want AI-assisted server responses:

```bash
cp .env.example .env
```

Then set:

```bash
GEMINI_API_KEY="your_gemini_api_key"
```

If `GEMINI_API_KEY` is absent, the classifier and spectral endpoints still respond with built-in fallback JSON rather than calling Gemini.

### Development

```bash
npm run dev
```

The development command runs `tsx server.ts`. In development mode, the Express server creates Vite middleware and serves the React app on port `3000`.

## Production Build

```bash
npm run build
```

This command builds the Vite frontend and bundles `server.ts` with esbuild into `dist/server.cjs`.

To start the built server:

```bash
npm start
```

Additional available scripts:

```bash
npm run preview
npm run lint
npm run clean
```

## How It Works

```mermaid
flowchart TD
    A[Header archive search and actions] --> B[Navigation tabs]
    B --> C[Cosmic phylogenetic tree]
    C --> D[Selected taxon inspector]
    B --> E[Catalog folio]
    E --> F[Candidate specimen panels]
    F --> G[Spectral comparator modal]
    A --> H[AI taxonomic classifier modal]
    H --> I[/api/classify]
    I --> J[Gemini when GEMINI_API_KEY exists]
    I --> K[Structured fallback when no key exists]
```

The application opens with a header search, domain tabs, and a primary cosmic dendrogram. Selecting tabs changes the active celestial domain and aligns the side-panel specimen selection. The dendrogram can be explored visually through radial, cladogram, and linear modes; selecting a node updates the inspector and can jump to matching catalog specimens when available.

Below the dendrogram, two specimen panels provide focused analysis: the left panel emphasizes exoplanetary classification, while the right panel displays nebulae, galaxies, stars, and missions. The catalog folio presents the complete static archive for the selected tab and lets users choose objects for either side of the dashboard. Two modal tools extend the flow: the AI classifier creates or simulates a new taxonomic record, and the spectral comparator places two catalog specimens into a side-by-side analytical folio.

## Data and Scientific Context

The project uses a curated static catalog stored in TypeScript files. The repository defines a 250-item archive by combining five 50-item categories: exoplanets, stars, nebulae, galaxies, and missions.

Some catalog values are recognizable astronomical facts, such as known object names, approximate distances, host systems, spectral classes, mission names, and observational descriptions. However, the application also layers those entries with editorial, botanical-style taxonomy: Latin-like binomials, APG-IV-inspired hierarchy labels, invented folio plate identifiers, composition percentages, and descriptive archive language.

AI-generated classifier output, when enabled, is produced by a prompt sent to Gemini and should be treated as generated interpretive content rather than validated scientific classification. When Gemini is not configured, the server returns static fallback analysis. The dashboard is therefore best understood as an educational and conceptual visualization prototype, not a peer-reviewed astronomical database.

## Limitations

- The celestial catalog is static demo data bundled with the client source; it is not synchronized with NASA, ESA, SIMBAD, Exoplanet Archive, or other live astronomical databases.
- AI responses depend on `GEMINI_API_KEY`; without it, the server returns fallback JSON.
- Generated classifications and spectral interpretations are not independently validated in the codebase.
- The application does not include user accounts, persistent storage, saved sessions, or a database.
- Catalog sorting currently supports name and category in the folio UI; distance sorting is declared in component state but not implemented as a distinct numeric sort.
- The server listens on port `3000` as written in `server.ts`.

## Roadmap

Future possibilities, not currently implemented:

- Connect catalog entries to authoritative astronomical APIs with provenance and update timestamps.
- Add saved comparison sets, bookmarks, or exportable specimen folios.
- Expand distance, spectral, and morphology filters with numeric range controls.
- Add tests for catalog integrity, API fallback behavior, and interactive dendrogram controls.
- Provide accessibility refinements for keyboard-first exploration and reduced-motion presentation.

## Contributing

Contributions should preserve the project’s archival scientific tone while keeping implementation claims accurate. Suggested workflow:

1. Install dependencies with `npm install`.
2. Run `npm run lint` before submitting changes.
3. Use `npm run build` to verify production output when changing app or server code.
4. Keep data provenance clear when adding or editing astronomical entries.
5. Avoid committing secrets or local `.env` values.

## License

No repository-level license file has been specified yet. Individual source files may contain their own SPDX notices, but the project does not currently declare an overall distribution license in a dedicated license file or in `package.json`.
