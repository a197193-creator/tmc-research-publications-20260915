# TMC Research & Publications website handoff

Updated: 13 October 2026 (original handoff: 28 September 2026)

Current public website:
https://tmc-research-publications-20260915.vercel.app

Private GitHub repository:
https://github.com/a197193-creator/tmc-research-publications-20260915

## 13 October technical closeout

- All 22 projects and 56 subprojects reconciled against the supplied workbook: 156 target/current comparisons pass. MySerobiome parent target corrected to 8,000.
- 69 original publication rows retained; the interface shows 68 distinct publications. The repeated 2024 article is consolidated and two distinct conference abstracts retain separate PDF page links.
- The complete UKM Introduction page is available at `/cohort/introduction.html`, including English/Malay text, the historical video and all 13 infographic entries with local original media.
- An installable WordPress plugin provides a portal page template, 90 draft seed records, labelled CMS fields, and published-record integration. See `wordpress/tmc-research-portal/README.md` and `docs/wordpress-integration-2026-10-13.json`.
- Technical preparation is complete. Management/user/IT acceptance, permission to publish current counts, actual installation on UKM WordPress, final UKM hosting checks and release authorization remain pending.

Review evidence and decision sheet: `docs/RESEARCH-CLOSEOUT-2026-10-13.md`. Build the plugin ZIP with `node --import tsx scripts/package-wordpress.mjs`, then `python scripts/package-release.py`.

## Earlier completed updates (28 September)

- Refined the website structure and responsive navigation.
- Simplified the opening splash screen and added The Malaysian Cohort emblem and wordmark.
- Added the complete research index with 22 projects and 56 subprojects.
- Restored the Publications page with all 69 titles from the official TMC publication register.
- Added publication search, exact-year filtering, and research-category filtering.
- Added an Original article link for every publication record.
- Kept direct article uploads disabled until each paper's access status is reviewed.
- Improved bilingual interface behaviour, mobile responsiveness, accessibility, browser history routing, and empty states.
- Removed unverified news content from public display.
- Added a Publications Dashboard button linking to the existing UKM Power BI summary, following Mr. Arman's 24 September email.
- Completed a technical UAT pass on 28 September 2026 covering build, navigation, publication filtering, responsive layouts and browser errors. See `docs/TMC-RESEARCH-UAT-2026-09-28.md`.

## Open the project on another PC

1. Install the current Node.js LTS release from https://nodejs.org/.
2. Sign in to GitHub as `a197193-creator` and clone the private repository:

   ```powershell
   git clone https://github.com/a197193-creator/tmc-research-publications-20260915.git
   ```

3. Open the cloned folder in Visual Studio Code.
4. Open a terminal in the project folder and run:

   ```powershell
   npm install
   npm run dev
   ```

5. Open http://localhost:3000 in a browser.

No environment variables or API keys are required for the current static website.

## Validation commands

```powershell
npm run lint
npm run build
npm run preview
```

The transfer package was validated successfully with both `npm run lint` and `npm run build` before it was created.

## Continue deployment to the same Vercel project

Sign in to the same Vercel account that owns the project, then run:

```powershell
npx vercel login
npx vercel link --project tmc-research-publications-20260915
npx vercel --prod
```

The local `.vercel` folder and all credential files are intentionally excluded from Git. The new PC must link the cloned folder to the existing Vercel project after sign-in. Pushing to the repository's production branch also triggers the connected Vercel deployment.

## Important publication note

The 69 original publication rows and the derived 68 distinct display records are stored in `src/data/publications.ts`. The unchanged source snapshot is retained in `docs/publication-register-source-2026-10-13.json`. Research categories are editorial navigation groupings because the official publication register does not provide a category column.
