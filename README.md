# The Malaysian Cohort website

This is a React + Vite website. It is a static site: it does not need a Gemini API key or a back-end server to run.

- Public site: https://tmc-research-publications-20260915.vercel.app/
- Private source repository: https://github.com/a197193-creator/tmc-research-publications-20260915
- Technical UAT evidence: `docs/TMC-RESEARCH-UAT-2026-09-28.md`
- Current closeout and pending approvals: `docs/RESEARCH-CLOSEOUT-2026-10-13.md`
- WordPress package and dashboard editing guide: `wordpress/tmc-research-portal/README.md`

## Run it in Visual Studio Code

1. Install the current Node.js **LTS** release from [nodejs.org](https://nodejs.org/).
2. Sign in to GitHub as `a197193-creator`, then clone the private repository:

   ```powershell
   git clone https://github.com/a197193-creator/tmc-research-publications-20260915.git
   ```

3. Open the cloned folder in Visual Studio Code: **File → Open Folder**.
4. Open **Terminal → New Terminal** and run:

   ```powershell
   npm install
   npm run dev
   ```

5. Open the address shown in the terminal, normally [http://localhost:3000](http://localhost:3000).

## Present it on another PC on the same Wi-Fi

Keep `npm run dev` running. Vite will show a **Network** address such as `http://192.168.1.25:3000`. Open that exact address on the other computer. If Windows asks, allow Node.js through the firewall on **Private networks**.

For a more production-like presentation, build once and run:

```powershell
npm run build
npm run preview
```

Then use the Network address displayed in the terminal (normally port `4173`).

## Publish updates

Commit and push changes to the private GitHub repository. The repository is connected to the existing Vercel project, so pushes to the production branch publish to the public site after the Vercel build succeeds.

## Useful commands

```powershell
npm run dev      # local development and same-network presentation
npm run build    # create the publishable dist folder
npm run preview  # test the production build locally/on your Wi-Fi
npm run lint     # check TypeScript
```

## 13 October updates and WordPress preparation

The current project index contains 22 projects and 56 components reconciled with the supplied source workbook. The MySerobiome target is 8,000. The 69-row publication source register is preserved; 68 distinct publications are displayed after consolidating one duplicate article. The shared conference DOI has distinct abstract page links.

About TMC opens the complete UKM Introduction page, including both languages, the 2010 video and all 13 infographic entries/full PDFs. The `public/cohort` collection retains the public topic pages and archive indexes. Research WordPress records can be edited through labelled dashboard fields; the historical public collection remains a static snapshot with original source links.

Build an installable WordPress staging ZIP:

```powershell
node --import tsx scripts/validate-content.mjs
node --import tsx scripts/package-wordpress.mjs
python scripts/package-release.py
```

The ZIP is generated in `release/`, with SHA256 evidence. It excludes credentials, environment files, dependencies and local fixture results. Source reconciliation is repeatable with `python scripts/validate-project-index.py <path-to-project-index.xlsx>`; this reads only public project fields, not participant records or private operational links.

Local WordPress integration is verified with `tests/wordpress-blueprint.json` in WordPress Playground. The fixture is only for a disposable local test site: it publishes test records there. UKM installation, final path, actual hosting compatibility, content permission, management/user/IT acceptance and official launch remain pending. See the closeout pack for the precise completion scope and acceptance sheet.
