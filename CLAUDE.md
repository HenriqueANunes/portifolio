# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static HTML/CSS personal portfolio site (henrique.dev), served by Nginx inside Docker. No build step, no package manager, no JavaScript framework.

## Running locally

```bash
docker compose up -d
```

The container mounts `public/` as read-only into Nginx. Editing files in `public/` takes effect immediately without rebuilding the image. The `homelab` Docker network must already exist on the host (`docker network create homelab`).

## Deploy

Any commit pushed to `main` triggers a GitHub Actions workflow (`.github/workflows/deploy.yml`) on a self-hosted runner, which runs `git pull` + `docker compose up -d` on the server.

## Architecture

```
public/
├── index.html        ← single-page site; sections are shells, content populated by JS
├── style.css         ← all styles, no preprocessor
├── translations.js   ← TRANSLATIONS object with all PT/EN content data
├── main.js           ← DOM rendering logic + language toggle
└── img/              ← certification badge images
nginx.conf          ← serves public/, gzip enabled, no cache config
docker-compose.yml  ← nginx:alpine, mounts public/ and nginx.conf read-only
design novo/        ← original Dreamweaver design file (reference only)
```

`index.html` loads `translations.js` first, then `main.js`.

## Content & i18n

All page text lives in `public/translations.js` inside the `TRANSLATIONS` object. The page supports PT and EN. On load and on language switch, `render()` in `main.js` updates:

- Simple text: elements with `data-i18n="key"` get `textContent` replaced
- Lists (nav, experience, skills, education, certs, homelab, contact links): replaced via `innerHTML` on their container `id`s

To add or edit content, update the relevant key in both `TRANSLATIONS.pt` and `TRANSLATIONS.en` in `translations.js`.

## CSS design tokens

All colours and fonts are CSS custom properties defined in `:root` at the top of `style.css`:

- `--accent: oklch(0.75 0.14 235)` — blue/cyan, used for highlights and interactive states
- `--green: oklch(0.75 0.14 150)` — green dot in homelab services
- `--bg / --surface / --surface-2` — dark background layers
- `--mono / --sans` — IBM Plex Mono, IBM Plex Sans (Google Fonts)
- `--max-w: 1100px` / `--sidebar: 280px` — section layout grid dimensions

Sections use a two-column grid (`var(--sidebar)` label column + `1fr` content).

## Cache-busting

The stylesheet is referenced with a `?v=` query string in `index.html`. Update the version string after CSS changes to force browser cache invalidation.
