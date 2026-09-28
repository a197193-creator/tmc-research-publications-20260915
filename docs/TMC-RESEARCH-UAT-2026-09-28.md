# TMC Research & Publications technical UAT

Date: 28 September 2026  
Scope: Public research and publications prototype  
Public URL: https://tmc-research-publications-20260915.vercel.app/  
Repository: https://github.com/a197193-creator/tmc-research-publications-20260915

## Result

The technical checks completed on 28 September 2026 passed. Formal content approval, supervisor/management sign-off, nominated-user acceptance, and UKM WordPress access remain external requirements.

## Automated checks

- `npm run lint`: passed (`tsc --noEmit`).
- `npm run build`: passed with Vite 6.4.3; 52 modules transformed.
- Publication register: 69 records, 69 unique IDs, 69 HTTPS source URLs, 2011–2026 coverage, and seven research categories.
- Research index: 22 project cards rendered and project-detail navigation opened successfully.
- Browser console: no errors during the tested flows.
- Vite/framework error overlay: not present.

## Functional checks

- Home, Research Projects, Publications & Evidence, and project-detail views loaded.
- Publications page rendered all 69 records.
- Searching for `COVID` returned 5 of 69 records; clearing the search restored all 69.
- `Back to Overview` returned directly to `#home`.
- `Back to Research Projects` returned directly to `#research`.
- The main header remained sticky.
- Mobile navigation opened, exposed the four primary links, navigated correctly, and closed after navigation.

## Responsive checks

| Viewport | Result |
| --- | --- |
| 1440 × 900 | Passed; desktop navigation visible, sticky header active, no horizontal overflow. |
| 768 × 1024 | Passed; responsive menu available, sticky header active, no horizontal overflow. |
| 390 × 844 | Passed; logo, search action, accessible menu, and announcement bar remained usable with no horizontal overflow. |

## Source-link review

All 69 records contain HTTPS source URLs. An automated request check received successful HTTP responses for 49 URLs. The remaining 20 resolved to publisher pages but returned automated-access restrictions or server-specific responses (18 HTTP 403 and 2 HTTP 400); these are not treated as confirmed broken links because publishers commonly block scripted requests.

## Content items requiring officer validation

1. `tmc-publication-54` (2024) and `tmc-publication-46` (2023) have the same normalized title and DOI `10.21315/mjms2024.31.3.6`. Confirm whether the 2023 row should be removed or corrected.
2. `tmc-publication-48` and `tmc-publication-47` use the same DOI `10.17576/MH.2023.s1809` for two different conference records. Confirm whether the shared DOI identifies a proceedings issue or whether either row needs a distinct source.
3. Project participant counts and other preliminary facts remain labelled as pending Statistics Unit validation.

## External blockers

- Supervisor and management review/sign-off has not been recorded.
- Nominated TMC users have not yet provided acceptance feedback.
- UKM WordPress staging credentials and administrator coordination are required before transfer and official-domain deployment.

