import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, ArrowUpRight, ShieldCheck } from 'lucide-react'
import useReducedMotion from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const REVEAL_LINES = [
  {
    lead: 'PDFs get forged. Emails get lost. Manual checks create liability.',
    sub: 'Lorem replaces static documents with cryptographically signed credentials issued directly from the source, with a full audit trail.',
  },
  {
    lead: 'Built for workflows where trust is non-negotiable.',
    sub: 'Wherever credentials matter, Lorem handles the verification.',
  },
]

export default function Hero() {
  const rootRef = useRef(null)
  const pinRef = useRef(null)
  const copyRef = useRef(null)
  const phoneRef = useRef(null)
  const cardLeftRef = useRef(null)
  const cardRightRef = useRef(null)
  const glowRef = useRef(null)
  const revealRefs = useRef([])
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return // show static resting state, skip scroll-jacking

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=260%',
          scrub: 0.6,
          pin: pinRef.current,
          anticipatePin: 1,
        },
      })

      const phoneGroup = [phoneRef.current, cardLeftRef.current, cardRightRef.current, glowRef.current]

      tl.to(copyRef.current, { autoAlpha: 0, y: -40, duration: 0.16 }, 0)
        .to(glowRef.current, { autoAlpha: 1, duration: 0.18 }, 0.14)
        .fromTo(
          phoneRef.current,
          { yPercent: 70, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.24 },
          0.14
        )
        .fromTo(
          cardLeftRef.current,
          { y: 60, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.14 },
          0.3
        )
        .fromTo(
          cardRightRef.current,
          { y: 60, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.14 },
          0.38
        )
        // Hold the settled phone briefly, then fade the whole group out
        // before the text-reveal sequence takes over the frame.
        .to(phoneGroup, { autoAlpha: 0, y: -20, duration: 0.14 }, 0.58)

      // Text reveal sequence, each paragraph crossfades to the next
      revealRefs.current.forEach((el, i) => {
        if (!el) return
        if (i === 0) {
          tl.fromTo(el, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.16 }, 0.66)
        } else {
          tl.to(revealRefs.current[i - 1], { autoAlpha: 0, y: -24, duration: 0.14 }, 0.86)
          tl.fromTo(el, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.86)
        }
      })
    }, rootRef)

    return () => ctx.revert()
  }, [reduced])

  if (reduced) {
    return (
      <section id="home" className="relative overflow-hidden bg-bg">
        <img
          src="/images/hero_gradient.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-[70%] w-[55%] object-cover object-left opacity-80 sm:-right-10"
        />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-16 pt-32 text-center sm:pt-40">
          <p className="mb-4 rounded-full border border-amber/30 bg-white/60 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber">
            Issuer-verified, from source
          </p>
          <h1 className="font-sans text-5xl font-semibold leading-[1.05] tracking-tight text-ink text-balance sm:text-6xl md:text-7xl">
            Verification That
            <br />
            <span className="bg-gradient-to-r from-amber via-[#F2B347] to-[#F8D68B] bg-clip-text text-transparent">
              Starts At The Source.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-serif text-base italic text-ink/60 sm:text-lg">
            Verify credentials the moment they're issued — not weeks after someone claims them.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber to-[#F2A730] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              Book a Demo
              <span className="grid h-5 w-5 place-items-center rounded-full bg-white/25">
                <Play className="h-2.5 w-2.5 fill-white text-white" />
              </span>
            </a>
            <a
              href="#platform"
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold text-ink/80 underline decoration-amber/40 decoration-2 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
            >
              See how it works <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="relative mt-16 flex justify-center">
            <img
              src="/images/iPhone 14 Pro.png"
              alt="Lorem verification dashboard shown on a phone, listing recently verified credential cases"
              className="relative z-10 w-[230px] sm:w-[260px]"
              width={260}
              height={530}
            />
            <div className="absolute -left-6 top-[15%] z-20 w-40 rounded-2xl border border-black/5 bg-white/95 p-3 text-left shadow-xl shadow-black/10 sm:-left-16">
              <div className="mb-1.5 flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-amber to-deepblue"
                  />
                ))}
              </div>
              <p className="text-lg font-semibold leading-none text-ink">250+</p>
              <p className="text-xs text-ink/50">trusted organizations</p>
            </div>
            <div className="absolute -right-10 bottom-[15%] z-20 w-44 rounded-2xl border border-black/5 bg-white/95 p-3 text-left shadow-xl shadow-black/10 sm:-right-20">
              <div className="mb-1.5 grid h-7 w-7 place-items-center rounded-full bg-cream">
                <ShieldCheck className="h-4 w-4 text-amber" />
              </div>
              <p className="text-lg font-semibold leading-none text-ink">10,000+</p>
              <p className="text-xs text-ink/50">credentials verified securely</p>
            </div>
          </div>
        </div>

        <div id="solution" className="relative mx-auto max-w-xl px-6 pb-24 pt-8 text-center">
          {REVEAL_LINES.map((line, i) => (
            <p key={i} className={i > 0 ? 'mt-8' : ''}>
              <span className="block text-2xl font-medium leading-snug text-ink sm:text-3xl">
                {line.lead}
              </span>
              <span className="mt-4 block font-serif text-base italic text-ink/55 sm:text-lg">
                {line.sub}
              </span>
            </p>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="home" ref={rootRef} className="relative bg-bg">
      <div ref={pinRef} className="relative h-screen overflow-hidden">
        {/* Ambient background gradient, matching reference art */}
        <img
          src="/images/hero_gradient.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-[140%] w-[55%] object-cover object-left opacity-90 sm:-right-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-[130%] rounded-[100%] bg-cream/70 blur-md"
        />

        {/* Hero copy */}
        <div
          ref={copyRef}
          className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center"
        >
          <p className="mb-4 rounded-full border border-amber/30 bg-white/60 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber">
            Issuer-verified, from source
          </p>
          <h1 className="font-sans text-5xl font-semibold leading-[1.05] tracking-tight text-ink text-balance sm:text-6xl md:text-7xl">
            Verification That
            <br />
            <span className="bg-gradient-to-r from-amber via-[#F2B347] to-[#F8D68B] bg-clip-text text-transparent">
              Starts At The Source.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-serif text-base italic text-ink/60 sm:text-lg">
            Verify credentials the moment they're issued — not weeks after someone claims them.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber to-[#F2A730] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber/30 transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              Book a Demo
              <span className="grid h-5 w-5 place-items-center rounded-full bg-white/25">
                <Play className="h-2.5 w-2.5 fill-white text-white" />
              </span>
            </a>
            <a
              href="#platform"
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold text-ink/80 underline decoration-amber/40 decoration-2 underline-offset-4 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
            >
              See how it works <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Phone mockup + side cards, scroll revealed */}
        <div
          ref={phoneRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 mx-auto flex h-[62%] max-w-md items-end justify-center sm:h-[68%]"
        >
          <div ref={glowRef} aria-hidden="true" className="absolute inset-0 -z-10 opacity-0">
            <div className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-amber/40 blur-3xl" />
          </div>

          <img
            src="/images/iPhone 14 Pro.png"
            alt="Lorem verification dashboard shown on a phone, listing recently verified credential cases"
            className="relative z-10 w-[230px] sm:w-[260px]"
            width={260}
            height={530}
          />

          <div
            ref={cardLeftRef}
            className="absolute left-[-4%] top-[18%] z-20 w-40 rounded-2xl border border-black/5 bg-white/95 p-3 shadow-xl shadow-black/10 backdrop-blur sm:left-[2%] sm:w-44"
          >
            <div className="mb-1.5 flex -space-x-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-amber to-deepblue"
                />
              ))}
            </div>
            <p className="text-lg font-semibold leading-none text-ink">250+</p>
            <p className="text-xs text-ink/50">trusted organizations</p>
          </div>

          <div
            ref={cardRightRef}
            className="absolute right-[-8%] top-[46%] z-20 w-44 rounded-2xl border border-black/5 bg-white/95 p-3 shadow-xl shadow-black/10 backdrop-blur sm:right-[-4%] sm:w-48"
          >
            <div className="mb-1.5 grid h-7 w-7 place-items-center rounded-full bg-cream">
              <ShieldCheck className="h-4 w-4 text-amber" />
            </div>
            <p className="text-lg font-semibold leading-none text-ink">10,000+</p>
            <p className="text-xs text-ink/50">credentials verified securely</p>
          </div>
        </div>

        {/* Text reveal sequence */}
        <div id="solution" className="absolute inset-x-0 top-0 z-30 flex h-full items-center justify-center px-6">
          <div className="relative mx-auto min-h-[10rem] w-full max-w-xl text-center">
            {REVEAL_LINES.map((line, i) => (
              <p
                key={i}
                ref={(el) => (revealRefs.current[i] = el)}
                className="invisible absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-0"
              >
                <span className="block text-2xl font-medium leading-snug text-ink sm:text-3xl">
                  {line.lead}
                </span>
                <span className="mt-4 block font-serif text-base italic text-ink/55 sm:text-lg">
                  {line.sub}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
