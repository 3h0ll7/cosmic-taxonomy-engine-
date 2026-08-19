# Security Audit Report

Audit date: 2026-08-19

## Scope and method

Checked the current working tree, hidden repository files, generated/local dependency artifacts, binary image assets, and all available Git refs.

### Files checked

Tracked source/config/documentation files checked:

- `.env.example`
- `.gitignore`
- `README.md`
- `assets/.aistudio/.gitignore`
- `index.html`
- `metadata.json`
- `package.json`
- `server.ts`
- `src/App.tsx`
- `src/assets/images/vintage_cosmic_phylogeny_1787141117125.jpg`
- `src/assets/images/vintage_exoplanet_plate_1787141065787.jpg`
- `src/assets/images/vintage_orion_nebula_plate_1787141088586.jpg`
- `src/components/CatalogFolioView.tsx`
- `src/components/CosmicPhylogeneticTree.tsx`
- `src/components/HeaderArchive.tsx`
- `src/components/LeftPanelCandidate1.tsx`
- `src/components/NavigationTabs.tsx`
- `src/components/RightPanelCandidate2.tsx`
- `src/components/SpectralComparatorModal.tsx`
- `src/components/TaxonomicAiModal.tsx`
- `src/data/catalog/exoplanets.ts`
- `src/data/catalog/galaxies.ts`
- `src/data/catalog/missions.ts`
- `src/data/catalog/nebulae.ts`
- `src/data/catalog/stars.ts`
- `src/data/cosmicArchiveData.ts`
- `src/data/cosmicDendrogramData.ts`
- `src/index.css`
- `src/main.tsx`
- `src/types.ts`
- `tsconfig.json`
- `vite.config.ts`

Additional local/generated paths checked:

- `.git/HEAD`, `.git/config`, `.git/FETCH_HEAD`, `.git/packed-refs`, `.git/info/exclude`, `.git/logs/**`, `.git/hooks/*.sample`
- `node_modules/**` and `node_modules/.package-lock.json` were present locally and scanned as generated dependency artifacts. No project-owned secrets were identified there.

### Git refs checked

- `refs/heads/work` at `e45004b18450a7c58545aa14e3e1e11b2fd14e83`
- All commits reachable from available refs: `70f1aae`, `ef8148d`, `f4e70f6`, `e45004b`
- No tags were present.
- No additional local or remote branches were present in this checkout.

### Commands used

- `find /workspace -name AGENTS.md -print`
- `git status --short`
- `rg --files -uu | sort`
- `git show-ref --heads --tags`
- `git branch -a`
- `git tag -l`
- `git ls-files -z | xargs -0 -n1 | sort`
- `rg -n -uu --hidden --glob '!node_modules/**' --glob '!.git/objects/**' --glob '!.git/index' -i "(api[_-]?key|secret|token|password|passwd|authorization|bearer|cookie|private[_ -]?key|BEGIN (RSA|OPENSSH|PRIVATE)|AIza[0-9A-Za-z_-]{35}|sk-[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16}|firebase|supabase|vercel|netlify|webhook|oauth|jwt|database_url|mongodb\\+srv|postgres://|mysql://|ssh-rsa|@)" .`
- `git grep -n -I -i -E "(api[_-]?key|secret|token|password|authorization|bearer|cookie|private[_ -]?key|AIza[0-9A-Za-z_-]{20,}|sk-[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16}|firebase|supabase|vercel|netlify|webhook|oauth|jwt|database_url|mongodb\\+srv|postgres://|mysql://|ssh-rsa)" $(git rev-list --all) -- . ':(exclude)node_modules'`
- Custom high-entropy token scan over non-`.git`, non-`node_modules` text files.
- `strings -n 12 src/assets/images/*.jpg | rg -i "(key|token|secret|password|email|@|gps|author|comment|software|exif|http)"`

## Findings

### Confirmed Secret

No confirmed secrets were found in the current working tree or reachable Git history.

### Placeholder

| Location | Masked value | Context | Exists in current working tree? | Exists in Git history? | Action |
| --- | --- | --- | --- | --- | --- |
| `.env.example:4` | `MY_***_KEY` | Ambiguous Gemini API key placeholder. It is not a real credential. | No, replaced during cleanup. | Yes, in commits `ef8148d`, `f4e70f6`, and `e45004b`. | Replaced with `your_gemini_api_key_here`. |
| `.env.example:9` | `MY_***_URL` | Ambiguous app URL placeholder. It is not a real credential. | No, replaced during cleanup. | Yes, in commits `ef8148d`, `f4e70f6`, and `e45004b`. | Replaced with `https://your-app-url.example`. |
| `README.md:121` | `your_***_api_key` | Documentation placeholder instructing users where to put their own Gemini key. | Yes. | Yes, in commits `f4e70f6` and `e45004b`. | No change required. |

### Public Data

| Location | Masked value | Context | Exists in current working tree? | Exists in Git history? | Action |
| --- | --- | --- | --- | --- | --- |
| `server.ts:18`, `server.ts:20`, `server.ts:47` | `GEMINI_***_KEY` | Environment variable name required for optional Gemini integration and fallback behavior. | Yes. | Yes. | Preserved. |
| `README.md:31`, `README.md:52`, `README.md:124`, `README.md:168`, `README.md:187` | `GEMINI_***_KEY` | Documentation references to the public environment variable name. | Yes. | Yes. | Preserved. |
| `package.json:15` and imports in source files | `@google/***` and other package names | Public npm package names. | Yes. | Yes. | No action required. |
| `index.html:10` | `https://fonts.googleapis.com/***` | Public Google Fonts stylesheet URL. | Yes. | Yes. | No action required. |
| `src/assets/images/*.jpg` embedded C2PA/SynthID strings | `http://pki.goog/***`, `Google Core Time Stamping Authority ***` | Public certificate/time-stamping metadata embedded in generated image assets. | Yes. | Yes. | No action required. |
| `.git/logs/**` | `codex@***` | Local Git reflog committer email from the automation environment. | Yes, local `.git` only. | No, not part of committed tree. | No action required. |

### False Positive

| Location | Masked value | Context | Exists in current working tree? | Exists in Git history? | Action |
| --- | --- | --- | --- | --- | --- |
| `README.md:73` and multiple source data/component files | `vintage_***_[numeric timestamp].jpg` | High-entropy scan matched local image filenames and paths. | Yes. | Yes. | Not sensitive. |
| `.git/hooks/*.sample` | `token`, `$@`, hook variables | Standard Git sample hook text. | Yes, local `.git` only. | No, not part of committed tree. | Not sensitive. |

## Cleanup performed

- Clarified `.env.example` placeholders so they are visibly fake values.
- Kept `.env.example` tracked.
- Verified `.gitignore` continues to ignore `.env*` while allowing `.env.example`.
- Preserved `server.ts` use of `process.env.GEMINI_API_KEY` and its deterministic fallback behavior when no key is configured.

## Rotation and history-cleanup guidance

No confirmed credential was found, so no credential revocation/rotation is required and no Git-history cleanup is required.

If a real credential is later discovered outside this checkout, rotate/revoke it with the provider first, then coordinate an explicit history-rewrite plan with repository maintainers before force-pushing any rewritten refs.

## Limitations

- The audit was limited to files and refs available in this local checkout on 2026-08-19.
- Remote-only branches, pull-request refs, release assets, issue attachments, CI secrets, hosting-provider settings, and the live deployment environment were not directly inspected.
- The attempted `npx gitleaks detect` run could not install because the npm registry request returned `403 Forbidden`; manual pattern, history, high-entropy, and binary-string scans were used instead.

## Post-cleanup validation

- `npm run lint` completed successfully.
- `npm run build` completed successfully.
- A second current-working-tree scan found no confirmed secrets; remaining matches were public environment variable names, safe placeholders, local Git hook/reflog text, public package/font/license strings, generated build output, and this report's audit terminology.
- A second all-ref history scan found no confirmed secrets; remaining matches were public environment variable names and placeholders already classified above.
- Fallback behavior was verified by running the built server without `GEMINI_API_KEY` and posting to `/api/classify`; the endpoint returned deterministic local JSON.
