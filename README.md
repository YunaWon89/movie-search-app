## Live Demo

Deployed on GitHub Pages: 

## Deployment

This project is deployed as a static export via GitHub Pages.

### Deploy updates

After making changes:

```bash
git add .
git commit -m "your message"
git push
```

To publish the updated build to GitHub Pages:

```bash
npm run deploy
```

This runs `next build` (via the `predeploy` script) to generate a static export in `out/`,
then pushes that folder to the `gh-pages` branch using the `gh-pages` package.

### Notes on static export

- The app uses `output: "export"` in `next.config.ts`, since GitHub Pages only serves static
  files (no Node.js server).
- Because of this, the TMDB data fetched in `app/page.tsx` is fetched **once, at build time**
  — it does not revalidate automatically like it would with a real Next.js server (ISR).
  Re-run `npm run deploy` to refresh the data.
- `images.unoptimized: true` is set because Next.js Image Optimization requires a server,
  which isn't available on static hosting.
- `public/.nojekyll` is required so GitHub Pages doesn't ignore the `_next/` folder
  (GitHub Pages uses Jekyll by default, which ignores folders starting with `_`).
