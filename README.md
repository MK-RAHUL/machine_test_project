# Lorem — UI/UX Developer Test

A recreation of the reference design (`website_flow.mp4`) built with React, Vite, Tailwind CSS, and GSAP/ScrollTrigger.

## Setup & run

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build to /dist
npm run preview   # preview the production build
```

Requires Node 18+.

## Tech choices

- **Framework:** React + Vite (fast dev server, small output; Next.js wasn't needed since there's no routing or SSR requirement here).
- **Styling:** Tailwind CSS, with the brand palette and fonts registered as design tokens in `tailwind.config.js`.
- **Animation:** GSAP + ScrollTrigger for all scroll-driven work (pinned sections, scrubbed timelines). Chosen over Framer Motion because the brief's effects (pin-and-scrub, spiral orbit math, reversible stacking) map directly onto ScrollTrigger's `scrub`/`pin` primitives.
- **Icons:** lucide-react, plus two small inline SVGs for LinkedIn/Instagram (recent lucide versions dropped brand glyphs).

## Structure

```
src/
  components/
    Navbar.jsx            sticky nav, scroll-spy, hamburger menu
    Hero.jsx               hero copy, phone mockup + scroll reveal, text-reveal sequence
    WhoItsFor.jsx          orbiting/spiraling industry badges around the logo
    PlatformPreview.jsx    scroll card-stacking dashboard preview
    Footer.jsx             lazy-loaded background video, watermark, link columns
    Logo.jsx
  hooks/
    useReducedMotion.js    matchMedia('prefers-reduced-motion') hook used everywhere motion is scripted
```

## How the reference motion was interpreted

- **Navbar:** scroll-spy uses an `IntersectionObserver` over the section elements. The reference nav has 6 links (Home / Solution / Process / Industries / Platform / Contact) but the brief only asks for 5 built sections, so `Solution` and `Process` are wired to the nearest real section (`Home` and `Industries` respectively) rather than inventing extra sections — documented assumption.
- **Hero:** a single pinned `ScrollTrigger` (scrubbed) drives one continuous sequence: hero copy fades out -> phone rises from below with the two stat cards staggering in (left leads, right follows) and a glow fading in behind it -> the whole phone group fades out -> the two-part trust-copy reveal crossfades in. Nothing is on a timer; everything is tied to `self.progress`.
- **Who It's For:** the 5 industry badges are positioned every scroll tick with trigonometry (`x = cos(theta)*r`, `y = sin(theta)*r`) rather than CSS keyframes, so the rotation angle and radius can be driven by scroll progress independently — this is what produces the "tightens as it spins" spiral instead of a fixed-radius orbit. Badges are kept upright (only their `x`/`y` are transformed, never `rotate`), matching "badges must stay upright and readable." Orbit radius recalculates on resize so badges never clip on small screens.
- **Platform Preview:** the 5 cards are absolutely stacked and each one's offset/scale is driven directly from scroll progress (not from a one-shot animation), so scrubbing up reverses the stack exactly — no separate "scroll up" logic was needed.
- **Footer:** the background video element isn't mounted at all until an `IntersectionObserver` reports the footer is within `200px` of the viewport, and it's never mounted for `prefers-reduced-motion: reduce` users (a static gradient is shown instead). No footer video asset was provided in this submission, so `Footer.jsx` points at `/public/footer-loop.mp4` — drop a muted/looping brand video there to light it up; the blend/opacity treatment is already wired.
- **Reduced motion:** `useReducedMotion()` is checked before any `ScrollTrigger` is created. Hero and Who It's For render an alternate, non-pinned static layout (rather than just freezing mid-animation) so nothing overlaps when motion is off.

## Known limitations

- The hero phone mockup and background gradient now use the real assets provided (`public/images/iPhone 14 Pro.png`, `public/images/hero_gradient.png`, optimized/compressed from the originals). The dashboard preview cards in Platform Preview and the footer background video are still CSS/inline-SVG placeholders, since no dashboard screenshots or footer video file were included — swap them in via `DashboardPreview()` in `PlatformPreview.jsx` and by dropping a file at `public/footer-loop.mp4`.
- Copy (headline, badge labels, card descriptions, footer nav labels) was written to match what's legible in the reference recording; adjust freely.
- Scroll-jacked pin durations (`end: '+=X%'`) were tuned by eye against the reference video's pacing at a 1440x900 viewport — nudge the percentages in `Hero.jsx` / `WhoItsFor.jsx` / `PlatformPreview.jsx` if you want the hand-off points to land differently.
