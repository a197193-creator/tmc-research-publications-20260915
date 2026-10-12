# Browser verification — 13 October 2026

## Vercel build / local production preview

- TypeScript check and production build passed.
- The Vite build withholds operational participant/count fields from the public JavaScript bundle as well as the interface. The WordPress package gate checks the bundle and draft seed; reconciliation still uses the supplied source figures locally.
- Publications: 68 distinct displayed records; the repeated LDLR DOI returns one article. Applying 2023 to that 2024 article returns an empty result; reset restores the archive.
- The conference supplement DOI returns two distinct abstracts with PDF page 57 and page 75 links.
- Research index renders 22 project cards. Searching MySerobiome returns one project with target 8,000; its profile retains the 3,000 and 5,000 component targets.
- At a verified 390 × 844 CSS-pixel viewport, the project index, profile and Introduction page have no horizontal overflow. The mobile menu reaches the index; Malay Introduction text expands; all 13 PDF links are present. Temporary browser emulation was cleared after testing.
- Introduction has all original text, video and 13 infographic entries. Its images load without broken-image errors.

## Local WordPress integration

- The disposable WordPress fixture reports WordPress 7.1.3 / PHP 8.5.10 (the actual runtime versions).
- 90 draft imports; repeat import adds zero records. Drafts are excluded from the published snapshot. Local fixture publication yields 22 projects and 68 publications.
- A CMS title edit reaches the frontend snapshot; an invalid save nonce is rejected. Current participant figures remain withheld.
- The final portal build renders from the plugin asset path without broken images or browser console errors. Project navigation and the Introduction page work, and the Research portal return link returns to the actual WordPress portal URL.

These are technical checks on a local fixture. Compatibility with the real UKM version, active theme/plugins, URL and hosting environment requires administrator access and staging acceptance.
