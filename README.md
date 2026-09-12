# bekluoo.github.io

Rebecca Luo's personal site. One page, one vertical scroll, no build step.

Live at **https://bekluoo.github.io/**

---

## Deploying

There is nothing to compile. Commit and push to `master` and GitHub Pages
serves it:

```bash
git add -A && git commit -m "Update site" && git push
```

To preview locally before pushing:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. (Opening `index.html` directly as a `file://`
URL mostly works, but a local server matches production behavior.)

---

## What's where

```
index.html              The whole page. Sections in order:
                        hero → about → experience → projects
                        → community → gallery → contact → footer
assets/css/site.css     Design tokens + every component. Numbered sections
                        with comments; section 1 is the color/type palette.
assets/js/site.js       Scroll progress, nav, reveal-on-scroll, timeline
                        expanders, project/community modal copy, gallery
                        filters + lightbox.
assets/img/             portrait.jpg (hero), boston-bw.jpg (contact band),
                        about-srilanka.jpg, bcnc-gift.jpg, women-in-tech.png
assets/img/logos/       organization logos used on project cards and
                        community blocks
assets/img/gallery/     Full-size gallery images (opened in the lightbox)
assets/img/gallery/thumb/  Smaller versions used in the grid
assets/img/work/        exported design work shown inside pop-ups
assets/video/           video shown inside pop-ups
assets/docs/            Résumé and project PDFs
```

### Common edits

| To change… | Edit |
| --- | --- |
| Any headline, blurb, or timeline bullet | `index.html` |
| The long write-up behind a project or community card | the `DETAIL` object at the top of `assets/js/site.js` |
| Colors, fonts, spacing | the `:root` block at the top of `assets/css/site.css` |
| A card or block's brand color | the inline `--t-bg` / `--t-ink` / `--t-chip` on that card in `index.html`, and the matching `theme:` array in `DETAIL` |
| Résumé PDF | replace `assets/docs/Rebecca-Luo-Resume.pdf` (keep the filename) |
| A picture inside a pop-up | the `figure:` field in that entry's `DETAIL` block — `[src, alt, padded?, caption]` |
| Design work shown in a pop-up | the `media:` field — `[kind, src, caption, aspect%, poster-or-alt]`, where kind is `"image"` or `"video"`. See the AJ Stickers block. |

### Adding a gallery image

1. Save the full-size version (max ~1600px wide) to `assets/img/gallery/`.
2. Make a grid version (max 760px wide) at `assets/img/gallery/thumb/`:
   ```bash
   sips -s format jpeg -s formatOptions 62 -Z 760 assets/img/gallery/NEW.jpg --out assets/img/gallery/thumb/NEW.jpg
   ```
3. Copy an existing `<button class="tile">` block in `index.html`, point both
   paths at the new file, and update `data-cat` (`photo` or `art`),
   `data-medium` (the visible caption — just the medium, e.g. `Graphite`), the
   `alt` text, and the `width`/`height` attributes.
4. Bump the counts in the filter chips (`All 26`, `Photography 19`, `Art 7`).

### Adding a project card

1. Copy an existing `<article class="card">` block in `index.html`. Set its
   inline `--t-bg` / `--t-ink` / `--t-chip` colors and put
   `data-open-sheet="yourkey"` on its `.card__hit` button.
2. Add a matching `yourkey: { … }` entry to `DETAIL` in `assets/js/site.js`.
   Every card needs one or the modal won't open.

---

## Design notes

- **Type** — Helvetica Neue / Helvetica / Arial throughout, no webfonts. Nothing
  is downloaded at load time, so text paints immediately.
- **Palette** — off-white paper `#faf8f4`, near-black ink `#171614`, and three
  accents: cotton periwinkle `#4356b5` for education, orange `#d0600f` for work,
  and rose `#c2497c` for links, eyebrow dots and highlights.
- **Brand colors** — each project card and community block carries the real
  organization's colors, set inline as `--t-bg` (background), `--t-ink`
  (accessible text on that background) and `--t-chip` (the pad behind its logo;
  Jackfruit's needs a dark pad because their logo is white). The same three
  values are repeated in the `theme:` array in `assets/js/site.js` so the modal
  matches its card.
- **Timeline icons** — a graduation cap in blue for the two degrees, and an
  orange book / briefcase / laptop for the three roles. They are inline SVG in
  `index.html`; swap a `<path>` to change one.
- **Motion** — a scroll-progress bar, reveal-on-scroll, and a gallery wall whose
  tiles all rise the same distance in the same direction so it settles as one
  parallel plane. Everything is disabled under `prefers-reduced-motion`.
- **No framework.** Plain semantic HTML with hand-written CSS, so there is no
  toolchain to keep alive and text edits are a one-line change.
- **Graceful degradation** — reveal animations only apply when JS runs (the
  `.js` class on `<html>`), so the page stays fully readable with scripts
  blocked.

---

## Accessibility

Headings are real headings; cards use an overlaid button rather than wrapping
block content in a `<button>`. Modals and the lightbox trap focus, close on
`Escape` or backdrop click, and restore focus to whatever opened them. The
lightbox supports arrow keys. Every image has descriptive alt text even though
the visible caption is only the medium.

---

## Editing this site

Open `index.html` in any plain-text editor. **Do not use TextEdit** — it opens
HTML as a formatted document and saving will destroy the markup. Safe options:

- **VS Code** (free, recommended): https://code.visualstudio.com
- **GitHub's web editor**: open the repo on github.com, click a file, press the
  pencil icon. Edits commit straight to the live site.
- **Terminal**: `nano index.html` (`Ctrl+O` saves, `Ctrl+X` exits).

To see a change, save the file and refresh the browser. To preview the whole
site the way GitHub Pages will serve it:

```bash
cd ~/Documents/Wesbite/bekluoo.github.io
python3 -m http.server 8000
```

Then open http://localhost:8000 and press `Ctrl+C` in Terminal when done.

### Where things are in index.html

| Line (approx.) | What |
| --- | --- |
| 1–50 | `<head>` — page title, social preview text, favicon |
| 55–78 | Nav links and the mobile menu |
| 83–110 | Cover: your name, the welcome line, the three icon buttons |
| 113–160 | About: Sri Lanka photo, the three paragraphs, the fun-fact tiles |
| 163–288 | Experience timeline — one `<li class="job">` per role |
| 291–400 | Project cards — one `<article class="card">` each |
| 403–470 | Organization blocks |
| 473–620 | Gallery tiles — one `<button class="tile">` per image |
| 624–660 | Contact band and footer |

The longer write-ups that appear *after* clicking a card are not in this file —
they live in the `DETAIL` object at the top of `assets/js/site.js`.
