# The Malaysian Cohort website

This is a React + Vite website. It is a static site: it does not need a Gemini API key or a back-end server to run.

- Public site: https://tmc-research-publications-20260915.vercel.app/
- Private source repository: https://github.com/a197193-creator/tmc-research-publications-20260915
- Technical UAT evidence: `docs/TMC-RESEARCH-UAT-2026-09-28.md`

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
