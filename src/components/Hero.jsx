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

export default function Hero() {
  const rootRef = useRef(null)
  const pinRef = useRef(null)

  const heroContentRef = useRef(null)
  const phoneGroupRef = useRef(null)
  const leftCardRef = useRef(null)
  const rightCardRef = useRef(null)

  const backWaveRef = useRef(null)
  const frontWaveRef = useRef(null)

  const textSectionRef = useRef(null)
  const textLinesRef = useRef([])

  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      const lines = textLinesRef.current.filter(Boolean)

      /*
       * INITIAL STATE SETUP
       */
      gsap.set(heroContentRef.current, {
        autoAlpha: 1,
        y: 0,
      })

      gsap.set(phoneGroupRef.current, {
        y: '25vh', 
        scale: 1,
        autoAlpha: 1,
      })

      gsap.set(leftCardRef.current, {
        top: '5%',
      })
      gsap.set(rightCardRef.current, {
        top: '25%',
      })

      gsap.set(backWaveRef.current, {
        y: '-340px',
        autoAlpha: 1,
      })

      gsap.set(frontWaveRef.current, {
        y: '-280px',
        autoAlpha: 1,
      })

      gsap.set(textSectionRef.current, {
        autoAlpha: 0,
        y: 40,
      })

      // Set initial text color to dim matching the orange/cream background
      gsap.set(lines, {
        color: 'rgba(23, 23, 23, 0.35)',
      })

      /*
       * SCROLLTRIGGER TIMELINE
       */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=400%', 
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // STEP 1: Hero Text Fades Out Fast
      tl.to(
        heroContentRef.current,
        {
          y: '-15vh',
          autoAlpha: 0,
          duration: 0.15,
          ease: 'power1.out',
        },
        0
      )

      // STEP 2: Phone rises upward
      tl.to(
        phoneGroupRef.current,
        {
          y: '-10vh',
          scale: 1.02,
          duration: 0.25,
          ease: 'power1.out',
        },
        0
      )

      tl.to(
        leftCardRef.current,
        {
          top: '20%',
          duration: 0.25,
          ease: 'power1.out',
        },
        0
      )

      tl.to(
        rightCardRef.current,
        {
          top: '40%',
          duration: 0.25,
          ease: 'power1.out',
        },
        0
      )

      // STEP 3: Wave Swoop slides UP to cover the screen
      tl.to(
        frontWaveRef.current,
        {
          y: '-200vh', 
          duration: 0.45,
          ease: 'power2.inOut',
        },
        0.3
      )

      tl.to(
        backWaveRef.current,
        {
          y: '-200vh',
          duration: 0.45,
          ease: 'power2.inOut',
        },
        0.3
      )

      // STEP 4: Hide phone when wave covers it
      tl.to(
        phoneGroupRef.current,
        {
          autoAlpha: 0,
          duration: 0.05,
        },
        0.55
      )

      // STEP 5: Keep waves filling the screen context to hold the reveal text content
      tl.to(
        textSectionRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.25,
          ease: 'power2.out',
        },
        0.55
      )

      // STEP 6: Highlighting text lines sequentially against the wave gradient bg
      lines.forEach((line, index) => {
        tl.to(
          line,
          {
            color: '#171717', // Changes to solid deep color on scroll
            duration: 0.25,
            ease: 'none',
          },
          0.7 + index * 0.25
        )
      })

      // STEP 7: Exit waves and transition to the next section
      tl.to(
        [frontWaveRef.current, backWaveRef.current, textSectionRef.current],
        {
          y: '-300vh',
          autoAlpha: 0,
          duration: 0.35,
          ease: 'power2.in',
        },
        1.3
      )

    }, rootRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative bg-[#F7F7F7]"
    >
      <div
        ref={pinRef}
        className="relative h-screen overflow-hidden"
      >
        {/* RIGHT ORANGE GRADIENT */}
        <img
          src="/images/hero_gradient.png"
          alt=""
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-0
            h-full
            w-[48%]
            object-cover
            object-left
          "
        />

        {/* HERO CONTENT */}
        <div
          ref={heroContentRef}
          className="
            absolute
            inset-x-0
            top-[13%]
            z-30
            flex
            flex-col
            items-center
            text-center
          "
        >
          <h1
            className="
              max-w-[900px]
              px-5
              text-[48px]
              font-medium
              leading-[0.98]
              tracking-[-0.055em]
              text-[#171717]
              sm:text-[64px]
              md:text-[78px]
              lg:text-[86px]
            "
          >
            Verification That
            <br />
            <span
              className="
                bg-gradient-to-r
                from-[#E88F00]
                via-[#F5B52E]
                to-[#FFE3A1]
                bg-clip-text
                text-transparent
              "
            >
              Starts At The Source.
            </span>
          </h1>

          <p
            className="
              mt-7
              max-w-[620px]
              px-5
              font-serif
              text-[15px]
              leading-[1.45]
              text-[#777]
              sm:text-[17px]
            "
          >
            Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum
            <br />
            lorem ipsum Lorem ipsum lorem ipsum
          </p>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              className="
                flex
                items-center
                gap-3
                rounded-full
                bg-gradient-to-r
                from-[#E88F00]
                to-[#F5B52E]
                px-5
                py-3
                text-[13px]
                font-medium
                text-white
                shadow-[0_10px_25px_rgba(232,143,0,0.25)]
              "
            >
              Book a Demo
              <span
                className="
                  grid
                  h-5
                  w-5
                  place-items-center
                  rounded-full
                  bg-white/30
                "
              >
                <Play className="ml-[1px] h-3 w-3 fill-white" />
              </span>
            </button>

            <button
              type="button"
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-white/80
                px-5
                py-3
                text-[13px]
                font-medium
                text-[#E88F00]
              "
            >
              See how it works
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* BACK WAVE */}
        <div
          ref={backWaveRef}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-full
            z-10
            flex
            h-[200vh]
            w-full
            flex-col
          "
        >
          <div className="h-[340px] w-full shrink-0">
            <svg
              viewBox="0 0 1440 340"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <path
                d="
                  M 0,140 
                  C 300,10 600,240 900,180 
                  C 1100,140 1280,110 1440,150 
                  L 1440,340 
                  L 0,340 
                  Z
                "
                fill="#F8E9D2"
              />
              <path
                d="
                  M 0,165 
                  C 300,35 600,265 900,205 
                  C 1100,165 1280,135 1440,175
                "
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeDasharray="10 10"
                opacity="0.65"
              />
            </svg>
          </div>
          <div className="w-full grow bg-[#F8E9D2]" />
        </div>

        {/* PHONE MOCKUP GROUP */}
        <div
          ref={phoneGroupRef}
          className="
            pointer-events-none
            absolute
            bottom-[-80px]
            left-1/2
            z-20
            w-[290px]
            -translate-x-1/2
            sm:bottom-[-120px]
            sm:w-[330px]
            md:bottom-[-70px]
            md:w-[360px]
          "
        >
          <img
            src="/images/iPhone 14 Pro.png"
            alt="Lorem verification dashboard"
            className="relative z-10 w-full"
          />

          {/* LEFT FLOATING CARD */}
          <div
            ref={leftCardRef}
            className="
              absolute
              left-[-34%]
              z-30
              w-[160px]
              h-[72px]
              rounded-[16px]
              border
              border-white/80
              bg-white/40
              px-3
              text-left
              shadow-[0_8px_32px_rgba(0,0,0,0.06)]
              backdrop-blur-xl
              flex
              items-center
              gap-2.5
            "
          >
            <div className="flex flex-col -space-y-3 shrink-0">
              {[1, 2, 3, 4].map((num) => (
                <span
                  key={num}
                  style={{ backgroundImage: `url('/images/user${num}.jpg')` }}
                  className="
                    h-[26px]
                    w-[26px]
                    rounded-full
                    border-[1.5px]
                    border-white
                    bg-cover
                    bg-center
                    bg-no-repeat
                    shadow-sm
                  "
                />
              ))}
            </div>

            <div className="flex flex-col justify-center min-w-0">
              <p className="text-[18px] font-semibold leading-tight text-[#111111] tracking-tight">
                250+
              </p>
              <p className="text-[9.5px] leading-tight text-[#555555]/85 font-normal mt-0.5 whitespace-normal">
                trusted organizations
              </p>
            </div>
          </div>

          {/* RIGHT FLOATING CARD */}
          <div
            ref={rightCardRef}
            className="
              absolute
              right-[-39%]
              z-30
              w-[160px]
              h-[72px]
              rounded-[16px]
              border
              border-white/80
              bg-white/40
              px-3
              text-left
              shadow-[0_8px_32px_rgba(0,0,0,0.06)]
              backdrop-blur-xl
              flex
              items-center
              gap-2.5
            "
          >
            <div
              className="
                grid
                h-[28px]
                w-[28px]
                shrink-0
                place-items-center
                rounded-full
                border
                border-white/60
                bg-white/30
                shadow-inner
              "
            >
              <Layers className="h-3.5 w-3.5 text-white" />
            </div>

            <div className="flex flex-col justify-center min-w-0">
              <p className="text-[18px] font-semibold leading-tight text-[#111111] tracking-tight">
                10,000+
              </p>
              <p className="text-[9.5px] leading-tight text-[#555555]/85 font-normal mt-0.5 whitespace-normal">
                credentials verified securely
              </p>
            </div>
          </div>
        </div>

        {/* FRONT WAVE */}
        <div
          ref={frontWaveRef}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-full
            z-40
            flex
            h-[200vh]
            w-full
            flex-col
          "
        >
          <div className="h-[280px] w-full shrink-0">
            <svg
              viewBox="0 0 1440 280"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <defs>
                <linearGradient
                  id="frontWaveGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0.1"
                >
                  <stop offset="0%" stopColor="#FFF7E9" />
                  <stop offset="55%" stopColor="#F9E8C8" />
                  <stop offset="100%" stopColor="#F4B43D" />
                </linearGradient>
              </defs>

              <path
                d="
                  M 0,110 
                  C 320,10 650,220 950,150 
                  C 1140,105 1300,75 1440,115 
                  L 1440,280 
                  L 0,280 
                  Z
                "
                fill="url(#frontWaveGradient)"
              />
              <path
                d="
                  M 0,135 
                  C 320,35 650,245 950,175 
                  C 1140,130 1300,100 1440,140
                "
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeDasharray="10 10"
                opacity="0.75"
              />
            </svg>
          </div>
          <div className="w-full grow bg-gradient-to-r from-[#FFF7E9] via-[#F9E8C8] to-[#F4B43D]" />
        </div>

        {/* REVEAL TEXT OVER THE SOLID WAVE GRADIENT */}
        <div
          ref={textSectionRef}
          className="
            absolute
            inset-0
            z-50
            flex
            items-center
            justify-center
            px-8
            opacity-0
          "
        >
          <div className="w-full max-w-[1000px]">
            {REVEAL_LINES.map((line, index) => (
              <p
                key={index}
                ref={(el) => {
                  textLinesRef.current[index] = el
                }}
                className={`
                  text-[38px]
                  font-light
                  leading-[1.12]
                  tracking-[-0.04em]
                  transition-colors
                  md:text-[52px]
                  lg:text-[60px]
                `}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}