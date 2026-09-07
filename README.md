# The Malaysian Cohort website

This is a React + Vite website. It is a static site: it does not need a Gemini API key or a back-end server to run.

## Run it in Visual Studio Code

1. Install the current Node.js **LTS** release from [nodejs.org](https://nodejs.org/).
2. Open this folder in Visual Studio Code: **File → Open Folder**.
3. Open **Terminal → New Terminal** and run:

   ```powershell
   npm install
   npm run dev
   ```

4. Open the address shown in the terminal, normally [http://localhost:3000](http://localhost:3000).

## Present it on another PC on the same Wi-Fi

Keep `npm run dev` running. Vite will show a **Network** address such as `http://192.168.1.25:3000`. Open that exact address on the other computer. If Windows asks, allow Node.js through the firewall on **Private networks**.

For a more production-like presentation, build once and run:

```powershell
npm run build
npm run preview
```

Then use the Network address displayed in the terminal (normally port `4173`).

## Make a public link

Run `npm run build`, then upload the generated `dist` folder to any static hosting provider such as Netlify, Vercel, GitHub Pages, or Cloudflare Pages. This project has no server-side dependency, so it is compatible with all of them. A public host will give you a link that works for anyone on the internet; the Wi-Fi link above works only while your laptop and the other PC are on the same local network.

## Useful commands

```powershell
npm run dev      # local development and same-network presentation
npm run build    # create the publishable dist folder
npm run preview  # test the production build locally/on your Wi-Fi
npm run lint     # check TypeScript
```
