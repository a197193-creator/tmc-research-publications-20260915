# TMC Research & Publications website handoff

Prepared: 21 September 2026

Current public website:
https://tmc-research-publications-20260915.vercel.app

## Latest completed updates

- Refined the website structure and responsive navigation.
- Simplified the opening splash screen and added The Malaysian Cohort emblem and wordmark.
- Added the complete research index with 22 projects and 56 subprojects.
- Restored the Publications page with all 69 titles from the official TMC publication register.
- Added publication search, exact-year filtering, and research-category filtering.
- Added an Original article link for every publication record.
- Kept direct article uploads disabled until each paper's access status is reviewed.
- Improved bilingual interface behaviour, mobile responsiveness, accessibility, browser history routing, and empty states.
- Removed unverified news content from public display.

## Open the project on another PC

1. Install the current Node.js LTS release from https://nodejs.org/.
2. Extract this ZIP file.
3. Open the extracted folder in Visual Studio Code.
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

The `.vercel` folder and all environment or credential files are intentionally excluded from this package. The new PC must link the folder to the existing Vercel project after sign-in.

## Important publication note

The 69 publication records are stored in `src/data/publications.ts`. Research categories are editorial navigation groupings because the official publication register does not provide a category column.
