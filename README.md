# MERN Developer Portfolio

A personal portfolio for a full stack MERN developer: a counted preloader, a
hero with an animated typing role line, a tech marquee, an about section with
count-up stats, grouped technical skills with level bars, an expanding
services list, a project grid with case-study pages, an experience timeline
and a contact section with a working form.

Dark theme by default, with a light/dark toggle in the navbar. Fully
responsive, glassmorphism navbar and cards, Framer Motion–style animations
(via Motion) that respect `prefers-reduced-motion`.

## Run it

```sh
bun install
bun run dev        # http://localhost:5173
bun run build      # dist/client (assets) + dist/portfolio/index.js (Worker)
bun run typecheck  # tsc --noEmit
```

## Make it yours

- `src/data/site.ts` is the whole site: name, role, typing roles, intro,
  socials (GitHub / LinkedIn / Facebook), stats, skills by category,
  services, projects, experience and the tech marquee. Edit it and the pages
  follow.
- `public/resume.pdf` is the file behind every "Download Resume" button —
  replace it with your own resume.
- `public/images/` holds the portrait and the project covers.
- The photo assets and the placeholder resume are not part of this repository:
  add your own `public/images/portrait.jpg`, your six project covers and your
  CV at `public/resume.pdf`.
- `src/app/pages/Home.tsx` builds the sections; `src/app/components/motion.tsx`
  holds the reusable animation pieces (masked line reveals, parallax, magnetic
  buttons).
- `src/styles.css` holds the tokens: dark navy canvas, white ink, electric
  blue and purple accents. `html.light` overrides the same variables for the
  light theme.

## Contact form

`src/worker/index.ts` receives the form at `POST /api/contact` (validated,
then acknowledged). Add forwarding with an email API — put the key in
Sites → Secrets — or store messages in a D1 database.

## Deploy with Freebuff Sites

`deploy.json` points at the build output. After `bun run build`, deploy with
the `sites_deploy` tool from this directory.
