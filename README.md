# Super Simple Source Code.
Motion Bits intends to be animation library.
Motion Bits is inspired by existing animation libraries. 

## Static hosting

`npm run build` prerenders every page and exports the complete site to `out/`.
Publish that directory to a static host; production does not require a Next.js server.
Routes use directory indexes, such as `out/collections/index.html`.

Code highlighting is also generated during the build. The Code tab reads static
`collections/snippets/<slug>/code.json` files, including component source, CSS, and
usage highlighting. Animations, navigation, and copy buttons run in the browser.

Set the donation and legal environment variables from `.env.example` before building.
Changing them requires rebuilding and publishing `out/` again. Request-time rendering
is disabled in the root layout, so pages that introduce dynamic server requirements
fail the build instead of silently becoming server-rendered.

Use `npm run dev` while editing. After a build, `npm start` serves the exported files
on port 3000 without compiling or rendering pages. The GitHub Pages workflow publishes
the same `out/` directory.

