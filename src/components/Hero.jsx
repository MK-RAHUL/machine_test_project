import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, ArrowUpRight, Layers } from 'lucide-react'
import useReducedMotion from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const REVEAL_LINES = [
  'PDFs get forged. Emails get lost. Manual checks create liability.',
  'Lorem replaces static documents with cryptographically signed credentials issued directly from the source, with a full audit trail.',
]

const BADGES = [
  {
    label: 'Compliance & Mobility Teams',
    icon: '/svg/icon1.svg',
    x: 0,
    y: -270,
  },
  {
    label: 'Immigration Law Firms',
    icon: '/svg/icon4.svg',
    x: 260,
    y: -70,
  },
  {
    label: 'Financial Institutions',
    icon: '/svg/icon4.svg',
    x: 200,
    y: 220,
  },
  {
    label: 'Universities & Training Institutes',
    icon: '/svg/icon3.svg',
    x: -180,
    y: 220,
  },
  {
    label: 'HR & Recruitment Firms',
    icon: '/svg/icon2.svg',
    x: -240,
    y: -70,
  },
]

export default function Hero() {
  const wrapperRef = useRef(null)
  const rootRef = useRef(null)
  const pinRef = useRef(null)

  const heroContentRef = useRef(null)
  const phoneGroupRef = useRef(null)
  const leftCardRef = useRef(null)
  const rightCardRef = useRef(null)

  const backWaveRef = useRef(null)
  const frontWaveRef = useRef(null)

  const sequenceContainerRef = useRef(null)
  const textLinesRef = useRef([])
  const whoItsForTextRef = useRef(null)

  // ORBIT / BADGES SECTION
  const orbitSectionRef = useRef(null)
  const orbitWrapperRef = useRef(null)
  const badgeRefs = useRef([])

  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      const lines = textLinesRef.current.filter(Boolean)
      const badges = badgeRefs.current.filter(Boolean)

      /* =========================================================
       * INITIAL STATES
       * ========================================================= */
      gsap.set(heroContentRef.current, { autoAlpha: 1, y: 0 })
      gsap.set(phoneGroupRef.current, { y: '25vh', scale: 1, autoAlpha: 1 })
      gsap.set(leftCardRef.current, { top: '5%' })
      gsap.set(rightCardRef.current, { top: '25%' })
      gsap.set(backWaveRef.current, { y: '-340px', autoAlpha: 1 })
      gsap.set(frontWaveRef.current, { y: '-280px', autoAlpha: 1 })
      gsap.set(sequenceContainerRef.current, { autoAlpha: 0 })
      gsap.set(lines, { color: '#C5C5C5' })
      gsap.set(whoItsForTextRef.current, { autoAlpha: 0 })

      // Set badges directly to their designated starting coordinates
      badges.forEach((badge, index) => {
        const target = BADGES[index]
        gsap.set(badge, {
          x: target.x,
          y: target.y,
          scale: 1,
          autoAlpha: 1,
        })
      })

      /* =========================================================
       * TIMELINE STAGE 1: HERO → WAVES → REVEAL TEXT
       * ========================================================= */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1.2,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(heroContentRef.current, { y: '-15vh', autoAlpha: 0, duration: 0.15, ease: 'power1.out' }, 0)
      tl.to(phoneGroupRef.current, { y: '-10vh', scale: 1.02, duration: 0.25 }, 0)
      tl.to(leftCardRef.current, { top: '20%', duration: 0.25 }, 0)
      tl.to(rightCardRef.current, { top: '40%', duration: 0.25 }, 0)

      tl.to(frontWaveRef.current, { y: '-200vh', duration: 0.45, ease: 'power2.inOut' }, 0.3)
      tl.to(backWaveRef.current, { y: '-200vh', duration: 0.45, ease: 'power2.inOut' }, 0.3)

      tl.to(phoneGroupRef.current, { autoAlpha: 0, duration: 0.05 }, 0.55)
      tl.to(sequenceContainerRef.current, { autoAlpha: 1, duration: 0.2 }, 0.55)
      tl.to(whoItsForTextRef.current, { autoAlpha: 1, duration: 0.2 }, 0.55)

      if (lines[0]) tl.to(lines[0], { color: '#171717', duration: 0.3, ease: 'none' }, 0.65)
      if (lines[1]) tl.to(lines[1], { color: '#171717', duration: 0.3, ease: 'none' }, 0.9)
      tl.to({}, { duration: 0.12 })

      /* =========================================================
       * TIMELINE STAGE 2: ROTATION SHIFT (NO ENTRANCE FLIGHT)
       * ========================================================= */
      const movementTl = gsap.timeline({
        scrollTrigger: {
          trigger: orbitSectionRef.current,
          start: 'top top',
          end: '+=100%', // Symmetrical scroll distance for the rotation
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      })

      // Shift all badges directly to the NEXT coordinate slot in a single scroll motion
      badges.forEach((badge, index) => {
        const nextTarget = BADGES[(index + 1) % BADGES.length]
        
        movementTl.to(
          badge,
          {
            x: nextTarget.x,
            y: nextTarget.y,
            ease: 'power2.inOut',
          },
          0 // Runs all shifts in parallel instantly upon scrolling
        )
      })

    }, wrapperRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* SECTION 1 — PINNED HERO */}
      <section id="home" ref={rootRef} className="relative w-full bg-[#F7F7F7]">
        <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
          <img
            src="/images/hero_gradient.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-0 h-full w-[48%] object-cover object-left"
          />

          <div ref={heroContentRef} className="absolute inset-x-0 top-[13%] z-30 flex flex-col items-center text-center">
            <h1 className="max-w-[900px] px-5 text-[48px] font-medium leading-[0.98] tracking-[-0.055em] text-[#171717] sm:text-[64px] md:text-[78px] lg:text-[86px]">
              Verification That
              <br />
              <span className="bg-gradient-to-r from-[#E88F00] via-[#F5B52E] to-[#FFE3A1] bg-clip-text text-transparent">
                Starts At The Source.
              </span>
            </h1>

            <p className="mt-7 max-w-[620px] px-5 font-serif text-[15px] leading-[1.45] text-[#777] sm:text-[17px]">
              Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum
              <br />
              lorem ipsum Lorem ipsum lorem ipsum
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button type="button" className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#E88F00] to-[#F5B52E] px-5 py-3 text-[13px] font-medium text-white shadow-[0_10px_25px_rgba(232,143,0,0.25)]">
                Book a Demo
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white/30">
                  <Play className="ml-[1px] h-3 w-3 fill-white" />
                </span>
              </button>

              <button type="button" className="flex items-center gap-2 rounded-full bg-white/80 px-5 py-3 text-[13px] font-medium text-[#E88F00]">
                See how it works
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* WAVES & PHONE MOCKUPS SECTIONS CONTAINER */}
          <div ref={backWaveRef} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full z-10 flex h-[200vh] w-full flex-col">
            <div className="h-[340px] w-full shrink-0">
              <svg viewBox="0 0 1440 340" preserveAspectRatio="none" className="h-full w-full">
                <path d="M 0,140 C 300,10 600,240 900,180 C 1100,140 1280,110 1440,150 L 1440,340 L 0,340 Z" fill="#F8E9D2" />
              </svg>
            </div>
            <div className="w-full grow bg-[#F8E9D2]" />
          </div>

          <div ref={phoneGroupRef} className="pointer-events-none absolute bottom-[-80px] left-1/2 z-20 w-[290px] -translate-x-1/2 sm:bottom-[-120px] sm:w-[330px] md:bottom-[-70px] md:w-[360px]">
            <img src="/images/iPhone 14 Pro.png" alt="Lorem verification dashboard" className="relative z-10 w-full" />
            <div ref={leftCardRef} className="absolute left-[-34%] z-30 flex h-[72px] w-[160px] items-center gap-2.5 rounded-[16px] border border-white/80 bg-white/40 px-3 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-xl">
              <div className="flex shrink-0 flex-col -space-y-3">
                {[1, 2, 3, 4].map((num) => (
                  <span key={num} style={{ backgroundImage: `url('/images/user${num}.jpg')` }} className="h-[26px] w-[26px] rounded-full border-[1.5px] border-white bg-cover bg-center" />
                ))}
              </div>
              <div>
                <p className="text-[18px] font-semibold text-[#111]">250+</p>
                <p className="text-[9.5px] text-[#555]/85">trusted organizations</p>
              </div>
            </div>

            <div ref={rightCardRef} className="absolute right-[-39%] z-30 flex h-[72px] w-[160px] items-center gap-2.5 rounded-[16px] border border-white/80 bg-white/40 px-3 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-xl">
              <div className="grid h-[28px] w-[28px] shrink-0 place-items-center rounded-full border border-white/60 bg-white/30">
                <Layers className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <p className="text-[18px] font-semibold text-[#111]">10,000+</p>
                <p className="text-[9.5px] text-[#555]/85">credentials verified</p>
              </div>
            </div>
          </div>

          <div ref={frontWaveRef} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full z-40 flex h-[200vh] w-full flex-col">
            <div className="h-[280px] w-full shrink-0">
              <svg viewBox="0 0 1440 280" preserveAspectRatio="none" className="h-full w-full">
                <defs>
                  <linearGradient id="frontWaveGradient" x1="0" y1="0" x2="1" y2="0.1">
                    <stop offset="0%" stopColor="#FFF7E9" />
                    <stop offset="55%" stopColor="#F9E8C8" />
                    <stop offset="100%" stopColor="#F4B43D" />
                  </linearGradient>
                </defs>
                <path d="M 0,110 C 320,10 650,220 950,150 C 1140,105 1300,75 1440,115 L 1440,280 L 0,280 Z" fill="url(#frontWaveGradient)" />
              </svg>
            </div>
            <div className="w-full grow bg-gradient-to-r from-[#FFF7E9] via-[#F9E8C8] to-[#F4B43D]" />
          </div>

          <div ref={sequenceContainerRef} className="pointer-events-none absolute inset-0 z-50 flex h-full w-full items-start justify-center px-8 pt-[12vh]">
            <div className="w-full max-w-[940px]">
              {REVEAL_LINES.map((line, index) => (
                <p key={index} ref={(el) => { textLinesRef.current[index] = el }} className="mb-4 text-[26px] font-light leading-[1.22] tracking-[-0.035em] sm:text-[34px] md:text-[42px] lg:text-[50px]">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div ref={whoItsForTextRef} className="pointer-events-none absolute inset-x-0 top-[68%] z-50 mx-auto max-w-2xl px-8 text-center">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#E88F00]">• Who It's For</p>
            <h2 className="mb-2 text-[24px] font-medium tracking-[-0.035em] text-[#171717] sm:text-[32px] md:text-[50px]">
              Built for workflows where trust is non-negotiable.
            </h2>
            <p className="text-[16px] font-normal text-[#666]">Wherever credentials matter, Lorem handles the verification.</p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — RADIAL ORBIT */}
      <section ref={orbitSectionRef} className="relative flex min-h-[100vh] w-full items-center justify-center overflow-hidden bg-[#F7F7F7] px-8 py-[12vh]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[420px]" style={{ backgroundImage: 'linear-gradient(to right, #FFF7E9, #F9E8C8, #F4B43D)', WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)', maskImage: 'linear-gradient(to bottom, black, transparent)' }} />

        <div ref={orbitWrapperRef} className="relative z-10 mx-auto flex h-[700px] w-full max-w-[760px] items-center justify-center">
          
          {/* BACKGROUND CONCENTRIC SQUIRCLE RINGS */}
          <div className="pointer-events-none absolute h-[620px] w-[620px] rounded-[130px] border-[2px] border-white/70 shadow-[0_0_40px_rgba(255,255,255,0.3)_inset]" />
          <div className="pointer-events-none absolute h-[460px] w-[460px] rounded-[100px] border-[2px] border-white/65 shadow-[0_0_30px_rgba(255,255,255,0.25)_inset]" />

          {/* INNER GLOW SQUIRCLE CONTAINER */}
          <div className="pointer-events-none absolute h-[300px] w-[300px] rounded-[70px] border-2 border-white/60 bg-gradient-to-b from-amber-100/40 via-amber-200/20 to-transparent p-1 backdrop-blur-[2px]">
            <div className="h-full w-full rounded-[64px] bg-gradient-to-b from-[#FFF2D4] to-transparent opacity-80 blur-sm" />
          </div>

          {/* BADGES GRAPHICS CONTAINER */}
          {BADGES.map(({ label, icon }, index) => (
            <div
              key={label}
              ref={(el) => { badgeRefs.current[index] = el }}
              className="absolute z-30 flex min-h-[64px] w-[260px] items-center gap-3 rounded-full border border-gray-100 bg-white px-4 py-2.5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gray-50">
                <img src={icon} alt="" className="h-6 w-6 object-contain" />
              </span>
              <span className="text-[14px] font-medium tracking-tight text-[#171717]">
                {label}
              </span>
            </div>
          ))}

          {/* CENTRAL CORE LOGO BLOCK */}
          <div className="relative z-40 flex h-[100px] w-[100px] items-center justify-center rounded-[28px] border-2 border-white bg-gradient-to-b from-amber-100/40 via-amber-200/20 to-transparent shadow-[0_12px_40px_rgba(232,143,0,0.12)] backdrop-blur-md">
            <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[18px] bg-gradient-to-br from-[#FFF7E9] to-[#F4B43D] p-3 shadow-inner">
              <img src="/images/logo.png" alt="Lorem Logo" className="h-full w-full object-contain" />
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}