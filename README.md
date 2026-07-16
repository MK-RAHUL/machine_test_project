# Lorem — UI/UX Developer Test

A recreation of the reference design (`website_flow.mp4`) built with **React**, **Vite**, **Tailwind CSS**, and **GSAP/ScrollTrigger**.

The project focuses on scroll-driven storytelling, animated hero transitions, a verification platform preview, industry badges, and a video-based footer.

---

## Setup & Run

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Requires **Node.js 18+**.

---

## Tech Stack

* **Framework:** React + Vite
* **Styling:** Tailwind CSS
* **Animation:** GSAP + ScrollTrigger
* **Icons:** lucide-react and react-icons
* **Language:** JavaScript / JSX

---

## Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── PlatformPreview.jsx
│   └── Footer.jsx
│
├── hooks/
│   └── useReducedMotion.js
│
├── App.jsx
└── main.jsx

public/
├── images/
│   ├── logo.png
│   ├── hero_gradient.png
│   ├── iPhone 14 Pro.png
│   ├── card1.png
│   ├── card2.png
│   ├── card3.png
│   ├── card4.png
│   └── user*.jpg
│
├── svg/
│   ├── icon1.svg
│   ├── icon2.svg
│   ├── icon3.svg
│   └── icon4.svg
│
└── videos/
    └── footer_video.mp4
```

---

## Main Sections

### Navbar

The fixed navigation bar includes:

* Home
* Solution
* Process
* Industries
* Platform
* Contact
* Sign In button

The navbar remains fixed at the top of the page and uses a rounded, blurred navigation container.

---

### Hero

The hero section is built around a single scroll-driven GSAP sequence.

The animation includes:

1. Hero heading and supporting copy.
2. Primary and secondary CTA buttons.
3. iPhone verification dashboard mockup.
4. Trusted organization statistics card.
5. Credentials verified statistics card.
6. Background wave transitions.
7. Verification-focused text reveal.
8. Transition into the “Who It's For” section.

The hero uses a pinned `ScrollTrigger` timeline so all animation progress is controlled by the user's scroll position.

The main hero assets are:

```text
/public/images/hero_gradient.png
/public/images/iPhone 14 Pro.png
/public/images/logo.png
```

---

### Who It's For

The “Who It's For” experience is currently implemented inside `Hero.jsx`.

It includes five animated industry badges:

* Compliance & Mobility Teams
* Immigration Law Firms
* Financial Institutions
* Universities & Training Institutes
* HR & Recruitment Firms

The badges are positioned around a central Lorem logo and animate around the orbit during scrolling.

The badge icons are loaded from:

```text
/public/svg/icon1.svg
/public/svg/icon2.svg
/public/svg/icon3.svg
/public/svg/icon4.svg
```

The orbit layout uses GSAP and `ScrollTrigger` to animate the badges between predefined positions while keeping the badges upright and readable.

---

### Platform Preview

`PlatformPreview.jsx` contains a pinned, scroll-driven card stack.

The section includes four verification workflow cards:

1. Create verification cases instantly
2. Track real-time verification status
3. View applicant approval activity
4. Access issuer verified documents

Each card contains:

* A title
* Supporting description
* Dashboard preview image

The cards are absolutely stacked and animated using GSAP. As the user scrolls, each new card moves into view while previous cards remain partially visible behind it.

The platform preview assets are:

```text
/public/images/card1.png
/public/images/card2.png
/public/images/card3.png
/public/images/card4.png
```

The card layout is responsive and adapts for:

* Mobile
* Tablet
* Desktop

---

### Footer

The footer contains:

* Product navigation
* Company & Resources links
* Contact information
* Social media links
* Copyright information

The footer uses a lazy-loaded background video.

The video is loaded only when the footer approaches the viewport using `IntersectionObserver`.

Expected video location:

```text
/public/videos/footer_video.mp4
```

The video is:

* Muted
* Looping
* Autoplayed
* Inline on mobile devices
* Lazy-loaded when needed

For users with reduced-motion preferences, the video is not loaded and a static fallback background is displayed instead.

---

## Animation Approach

GSAP and ScrollTrigger were chosen because the design relies heavily on:

* Scroll-scrubbed animations
* Pinned sections
* Reversible animations
* Layered card transitions
* Wave transitions
* Scroll-driven content reveals
* Orbiting badge animations

Animations are connected directly to scroll progress instead of relying on independent timers.

This ensures that:

* Scrolling forward advances the animation.
* Scrolling backward reverses the animation.
* The animation remains synchronized with the user's scroll position.

---

## Reduced Motion Support

The project uses a custom hook:

```text
src/hooks/useReducedMotion.js
```

The hook detects the user's:

```text
prefers-reduced-motion
```

preference.

When reduced motion is enabled:

* GSAP scroll animations are disabled.
* ScrollTrigger timelines are not created.
* The footer background video is not loaded.
* Static content remains visible and usable.

This provides an accessible fallback for users who prefer reduced motion.

---

## Design System

The project follows the provided brand palette.

### Colors

| Name       | Hex       |
| ---------- | --------- |
| Navy       | `#0A192F` |
| Deep Blue  | `#002966` |
| Amber      | `#E88F00` |
| Cream      | `#F8E9D2` |
| Ink        | `#171717` |
| Background | `#F7F7F7` |

### Gradient

The main brand gradient uses:

```css
linear-gradient(
  90deg,
  #E88F00 0%,
  #F5B52E 55%,
  #FFE3A1 100%
);
```

The navigation and footer areas use additional navy, cream, and dark gradient treatments based on the reference design.

---

## Reference Motion Interpretation

### Hero

The hero uses a single pinned GSAP timeline.

The animation sequence is:

```text
Hero content
    ↓
Phone mockup enters the visual focus
    ↓
Statistic cards move into position
    ↓
Background waves transition upward
    ↓
Phone mockup fades out
    ↓
Verification copy is revealed
    ↓
Who It's For content becomes visible
```

All transitions are controlled by scroll progress.

---

### Industry Badge Orbit

The five industry badges are positioned around the central logo.

Their positions are defined using predefined coordinates and animated with GSAP.

The badges remain upright while their position changes, ensuring that the text remains readable during the animation.

---

### Platform Card Stack

The platform cards are positioned in a stacked layout.

As the user scrolls:

```text
Card 1
    ↓
Card 2 moves into view
    ↓
Card 3 moves into view
    ↓
Card 4 moves into view
```

The animation is scrubbed by ScrollTrigger, allowing the user to move both forward and backward through the animation.

---

### Footer Video

The footer video is intentionally lazy-loaded.

The video is only mounted after the footer enters the observer's preload range.

This avoids loading the video immediately when the page first loads and helps reduce unnecessary initial network usage.

---

## Accessibility

The implementation includes:

* A skip-to-content link.
* `aria-hidden` for decorative background images and waves.
* Descriptive `alt` text for meaningful images.
* Accessible labels for social media buttons.
* Reduced-motion support.
* Keyboard-accessible navigation and buttons.

---

## Known Limitations

* The project is a static frontend implementation and does not currently include backend authentication.
* The Sign In button is currently visual only.
* Navigation links are currently placeholders and can be connected to actual sections or routes.
* Contact information and footer copy are sample content.
* The verification dashboard images are static assets used to recreate the reference design.
* The footer video requires the file to exist at:

```text
/public/videos/footer_video.mp4
```

---

## Notes

The implementation was designed to closely reproduce the provided visual reference while keeping the animation behavior responsive and reversible.

The animation timings and pinned scroll distances can be adjusted in:

```text
src/components/Hero.jsx
src/components/PlatformPreview.jsx
```

The project also supports responsive layouts across mobile, tablet, and desktop screen sizes.