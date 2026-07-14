import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    title: "Create verification cases instantly",
    desc: "Add the applicant and issuer. Hit send. Lorem notifies everyone and tracks every step.",
    image: "/images/card1.png",
  },
  {
    title: "Track real-time verification status",
    desc: "See exactly where each verification stands. No chasing emails or manual follow-up.",
    image: "/images/card2.png",
  },
  {
    title: "View applicant approval activity",
    desc: "Know the moment an applicant consents. Every action is logged and timestamped.",
    image: "/images/card3.png",
  },
  {
    title: "Access issuer verified documents",
    desc: "Signed at the source and delivered directly to your dashboard whenever you need them.",
    image: "/images/card4.png",
  },
];

// Card layout switches from side-by-side (desktop) to stacked (tablet/mobile)
// at this breakpoint, so the pixel dimensions below are tied to the same value.
const STACK_BREAKPOINT = 1024; // matches Tailwind's `lg`

// Per-breakpoint pixel dimensions for the pinned scroll animation.
// Stacked layouts need a taller card (title+desc+image all stacked) and a
// taller "peek strip" (HEADER_HEIGHT), since the title block itself is taller
// than the single compact row it occupies on desktop.
function getDims() {
  if (typeof window === "undefined") {
    return { cardHeight: 640, headerHeight: 150, breakpoint: "desktop" };
  }
  const w = window.innerWidth;
  if (w < 640) {
    return { cardHeight: 560, headerHeight: 120, breakpoint: "mobile" };
  }
  if (w < STACK_BREAKPOINT) {
    return { cardHeight: 600, headerHeight: 130, breakpoint: "tablet" };
  }
  return { cardHeight: 640, headerHeight: 150, breakpoint: "desktop" };
}

export default function PlatformPreview() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const cardRefs = useRef([]);

  const reducedMotion = useReducedMotion();
  const [dims, setDims] = useState(getDims);

  // Only rebuild the GSAP timeline when the breakpoint category actually
  // changes (not on every resize pixel), to avoid constant re-inits while
  // dragging a window edge.
  useLayoutEffect(() => {
    const onResize = () => {
      setDims((prev) => {
        const next = getDims();
        return next.breakpoint !== prev.breakpoint ? next : prev;
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const { headerHeight } = dims;

    // Smooths out scroll-input jitter globally, not just for this component
    gsap.ticker.lagSmoothing(500, 33);

    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      const total = cards.length;

      gsap.set(cards, { clearProps: "all" });

      cards.forEach((card, index) => {
        gsap.set(card, {
          y: index === 0 ? 0 : "100%",
          zIndex: index + 1,
          autoAlpha: 1,
          force3D: true, // keeps this on the GPU compositor, avoids repaint cost
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * total}`,
          pin: pinRef.current,
          scrub: 0.6, // was `true` — this adds a small smoothing lag
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        const isLast = index === total - 1;
        const targetY = isLast ? 0 : headerHeight * index;

        tl.to(card, { y: targetY, duration: 1, ease: "none" }, index - 1);

        for (let i = 0; i < index; i++) {
          tl.set(cards[i], { y: headerHeight * i }, index - 1);
        }
      });

      const lastCardArrivesAt = total - 1;

      // Fade the covered cards out DURING the last 0.3s of the cover
      // tween instead of snapping the instant it lands. This overlaps
      // with the tail end of the slide, so it reads as one continuous
      // motion rather than slide-then-cut.
      tl.to(
        cards.slice(0, total - 1),
        { autoAlpha: 0, duration: 0.3, ease: "none" },
        lastCardArrivesAt - 0.3
      );

      tl.to({}, { duration: 0.3 });
    }, sectionRef);

    // Preload images BEFORE building/refreshing ScrollTrigger positions,
    // so refresh() never has to fire again mid-scroll due to a late-
    // loading image changing layout height underneath the user.
    const images = sectionRef.current.querySelectorAll("img");
    let loaded = 0;
    const checkDone = () => {
      loaded++;
      if (loaded === images.length) ScrollTrigger.refresh();
    };
    images.forEach((img) => {
      if (img.complete) checkDone();
      else img.addEventListener("load", checkDone, { once: true });
    });
    if (images.length === 0) ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [reducedMotion, dims]);

  const { cardHeight } = dims;

  return (
    <section id="platform" ref={sectionRef} className="relative bg-white">
      <div
        ref={pinRef}
        className="relative flex min-h-screen flex-col overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
        style={{
          background: "linear-gradient(180deg,#FFFFFF 0%,rgba(255,255,255,0) 100%)",
        }}
      >
        {/* Heading */}
        <div className="mx-auto mb-10 flex w-full max-w-7xl flex-col justify-between gap-6 sm:mb-12 sm:gap-8 lg:mb-16 lg:flex-row lg:items-start lg:gap-12">
          <div className="max-w-xl">
            <p className="mb-2 text-sm font-medium text-[#E88F00] sm:mb-3">• Platform Preview</p>
            <h2 className="text-3xl font-semibold leading-tight text-[#171717] sm:text-4xl lg:text-5xl">
              Verify documents from a single dashboard.
            </h2>
          </div>
          <div className="max-w-sm lg:pt-10">
            <p className="text-base leading-relaxed text-[#666666] sm:text-lg">
              One dashboard to request, track and receive verified credentials from anywhere in the world.
            </p>
          </div>
        </div>

        {/* Card Stack */}
        <div
          className="relative mx-auto w-full max-w-7xl"
          style={{ height: `${cardHeight}px` }}
        >
          {CARDS.map(({ title, desc, image }, index) => (
            <div
              key={title}
              ref={(el) => (cardRefs.current[index] = el)}
              className="absolute inset-0 w-full overflow-hidden rounded-[24px] border border-neutral-200 bg-white sm:rounded-[36px]"
              style={{ height: `${cardHeight}px` }}
            >
              <div className="grid h-full grid-cols-1 overflow-y-auto lg:grid-cols-12 lg:overflow-visible">
                <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-4 lg:justify-start lg:p-14">
                  <h3 className="mb-3 text-2xl font-semibold leading-tight text-[#171717] sm:mb-4 sm:text-3xl lg:mb-6 lg:text-4xl">
                    {title}
                  </h3>
                  <p className="text-base leading-7 text-[#707070] sm:text-lg sm:leading-8">
                    {desc}
                  </p>
                </div>
                <div className="min-h-0 flex-1 bg-[#FAFAFA] lg:col-span-8">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}