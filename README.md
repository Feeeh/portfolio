# Portfolio

Personal single-page portfolio website — dark themed, pixel-art accents, animated gradient background.

Built with [Vite](https://vite.dev), TypeScript, [Tailwind CSS v4](https://tailwindcss.com) and SCSS. The only runtime dependency is [Blob](https://github.com/Feeeh/blob), the soft-body virtual guide, consumed as `"blob": "file:../../blob"` — the blob repo must be checked out as a sibling (`<root>/blob` next to `<root>/website/portfolio`) with its committed `dist/` present (run `npm run build` there after changing its source).

## Sections

- **Hero** — landing presentation
- **Introduction** — about me
- **Education** — timeline
- **Projects** — grouped by category (SESI, IA Kiko, Survival Craft Brasil, CashbackHub, Personal); each card opens a modal with an image carousel and project details

## Development

```sh
npm install
npm run dev      # dev server with hot reload
npm run build    # type-check + build static files into dist/
npm run preview  # serve the built dist/ locally
```

Deploy by uploading the contents of `dist/` to any static host.

## Editing content

- `src/projects.ts` — project data: titles, descriptions, tech tags and images. Replace the `placeholders(...)` calls with real image paths (put files under `public/img/`).
- `index.html` — name, introduction paragraphs and education entries.

## License

[GPL-3.0](LICENSE)
