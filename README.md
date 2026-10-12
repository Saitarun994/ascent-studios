# Ascent Studios — landing page

A production-oriented, responsive single-page site for **Ascent Studios**, owned by **Tolu Andre Olatunbosun**. Photography is organized construction-first, followed by creative work. The page includes minimal motion, a responsive portfolio carousel with filters, a lightbox, founder portrait, services, and direct contact links.

## Getting started

No build step, package installation, or external dependencies are required. Open `index.html` in a browser or serve locally:

```bash
python -m http.server 8000
```

Visit `http://localhost:8000`.

## Deployment

Deploy the **contents of this folder** as a static website:

- **Netlify Drop:** drag the unzipped folder onto https://app.netlify.com/drop
- **Vercel:** import a GitHub repository containing these files as an **Other** framework, with no build command and output directory `.`
- **GitHub Pages:** push files to the repository root and enable Pages from the root branch.

A custom domain can be connected in the hosting provider's settings. The site has no server-side infrastructure or runtime secrets.

## Files

- `index.html` — accessible semantic landing page and gallery markup
- `styles.css` — Apple-inspired minimalist / editorial design and responsive breakpoints
- `contact.js` — business email, phone, Instagram, and LinkedIn details used across the page
- `script.js` — carousel filtering, navigation, lightbox, contact links, and footer year
- `assets/` — web-optimized client-supplied photography, generated transparent drone artwork, favicon, social preview

## Editing

Change contact details (email, phone, Instagram, LinkedIn) in `contact.js`. Change headlines and service descriptions directly in `index.html`. The gallery is an HTML list of `.gallery-item` cards, with `data-category="construction"` or `data-category="creative"`. When adding/removing images, update the category filter numbers (07 and 03, currently) and image count (10).

Replace `assets/drone-art.png` to change the decorative hero drone. The original editable SVG used to generate it is `assets/drone-art.svg`. Set `display:none` on `.drone-decoration` to remove it.

## Before publishing

- Verify final photo usage rights and obtain the owner's approval for the bio and services copy.
- Confirm whether the client accepts the wording "USA" or prefers a particular city/region.
- Replace the social preview image and adjust meta copy if branding changes.

## Accessibility and performance

Uses system fonts, WebP photography, lazy-loading for portfolio images, keyboard-accessible carousel controls, reduced-motion handling, and responsive layouts. No tracker or third-party scripts are installed.
