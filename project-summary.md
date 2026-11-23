# Nu-Tech India Website — v2 (Premium Upgrade)

Static HTML/CSS/JS site upgraded from the original build to a higher-authority,
premium-agency presentation. Same brand identity preserved: navy/orange
"fabrication yard" palette, Anton + IBM Plex typography, work-order/signage motifs.

## What changed in this pass
- **Hero**: full-bleed collage of 7 real project photos, dark overlay, subtle
  animated light-streak, new headline/subhead/CTA copy, trust line.
- **Stats**: 4 premium stat cards with count-up animation on scroll
  (15+ years, 1000+ executions, 30 districts, 24/7 support).
- **Trust wall**: "Trusted by Leading Brands & Institutions" — real client
  names in a premium logotype-style grid.
- **Case-study cards**: featured projects (home) and full portfolio grid
  redesigned with outcome badges and a metadata row (sector/service/
  location/coverage). No fabricated client names, years, or figures —
  only what's actually known about each project.
- **Execution Network**: stylized node-based statewide network panel with
  pulsing highlights on major hubs (Bhubaneswar, Cuttack, Puri). Not a
  literal geographic map — built as a network diagram since accurate
  cartographic data wasn't available.
- **About page**: added "Our Journey" timeline and a real "Download Company
  Profile (PDF)" button — the original PPTX deck converted to PDF
  (`files/nu-tech-india-company-profile.pdf`).
- **Contact page**: added Call Now / WhatsApp Us buttons.
- **Site-wide**: floating WhatsApp "Request a Quote" button on every page,
  scroll-reveal animations (visible-by-default so nothing depends on JS
  timing), fully responsive down to 390px, portfolio filter and mobile nav
  both verified working.

## Structure
```
nutech-india-website/
  index.html, about.html, portfolio.html, clients.html, contact.html
  css/style.css        All styling incl. new hero/case-study/network/timeline rules
  js/main.js            Nav toggle, marquee, portfolio filter, form handler,
                         floating WhatsApp button, scroll-reveal, stat counters
  img/                  Logo files, favicons, real project photos
  files/nu-tech-india-company-profile.pdf   Downloadable company profile
```
Open `index.html` directly, or upload the whole folder to any static host
(Netlify, GitHub Pages, cPanel, etc.) — no build step, no server required.

## Known open items
- The WhatsApp number used (919090004400) is the primary listed phone
  number formatted for wa.me — worth confirming this line is on WhatsApp
  before going live.
- Contact form still has no backend (mailto fallback, as before) — a form
  service (Formspree, Netlify Forms) would be the next step for real
  submissions.
- Execution Network is a stylized node diagram, not a literal Odisha map —
  swap in a real map graphic if one becomes available.
