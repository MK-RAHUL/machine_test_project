import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, ArrowUpRight, ShieldCheck } from 'lucide-react'
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
       * =====================================================
       * INITIAL STATE Setup
       * =====================================================
       */
      gsap.set(heroContentRef.current, {
        autoAlpha: 1,
        y: 0,
      })

      // Position phone lower initially so it climbs up beautifully
      gsap.set(phoneGroupRef.current, {
        y: '20vh', 
        scale: 1,
        autoAlpha: 1,
      })

      // We pull the wave containers up from 'top-full' (100% viewport top) 
      // so that only their curves are visible at the bottom of the screen.
      gsap.set(backWaveRef.current, {
        y: '-340px', // Matches the curve height
        autoAlpha: 1,
      })

      gsap.set(frontWaveRef.current, {
        y: '-280px', // Matches the curve height
        autoAlpha: 1,
      })

      gsap.set(textSectionRef.current, {
        autoAlpha: 0,
        y: 40,
      })

      gsap.set(lines, {
        color: '#CFC8BD',
      })

      /*
       * =====================================================
       * SCROLLTRIGGER TIMELINE CREATION
       * =====================================================
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

      /*
       * =====================================================
       * STEP 1: Hero Text Fades Out Fast (Prevents collapse overlay)
       * =====================================================
       */
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

      /*
       * =====================================================
       * STEP 2: Phone Slides Up (Exposing 90% of its body)
       * Stops with its bottom 10% still masked safely behind the waves.
       * =====================================================
       */
      tl.to(
        phoneGroupRef.current,
        {
          y: '-38vh', 
          scale: 1.02,
          duration: 0.35,
          ease: 'power2.out',
        },
        0.08
      )

      /*
       * =====================================================
       * STEP 3: Waves Swell Upward to Fill the Entire Screen
       * Pulls the 200vh high curtain tail completely over the viewport.
       * =====================================================
       */
      tl.to(
        frontWaveRef.current,
        {
          y: '-200vh', // Slides the solid curtain tail up to cover 100% of the screen
          duration: 0.45,
          ease: 'power2.inOut',
        },
        0.4
      )

      tl.to(
        backWaveRef.current,
        {
          y: '-200vh',
          duration: 0.45,
          ease: 'power2.inOut',
        },
        0.4
      )

      /*
       * =====================================================
       * STEP 4: Hide old phone / content behind the curtain
       * =====================================================
       */
      tl.to(
        phoneGroupRef.current,
        {
          autoAlpha: 0,
          duration: 0.1,
        },
        0.6
      )

      /*
       * =====================================================
       * STEP 5: Clear waves upward to reveal the clean cream backdrop
       * =====================================================
       */
      tl.to(
        [frontWaveRef.current, backWaveRef.current],
        {
          y: '-300vh',
          autoAlpha: 0,
          duration: 0.35,
          ease: 'power2.in',
        },
        0.7
      )

      /*
       * =====================================================
       * STEP 6: Reveal lines fade in and light up sequentially
       * =====================================================
       */
      tl.to(
        textSectionRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.25,
          ease: 'power2.out',
        },
        0.95
      )

      lines.forEach((line, index) => {
        tl.to(
          line,
          {
            color: '#171717',
            duration: 0.25,
            ease: 'none',
          },
          1.1 + index * 0.22
        )
      })
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
          {/* Main heading */}
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

          {/* Subtitle */}
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

          {/* Buttons */}
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

        {/* =====================================================
            BACK WAVE (Extended 200vh height curtain tail)
        ====================================================== */}
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
          {/* SVG curve top */}
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
          {/* Continuous bottom cover block */}
          <div className="w-full grow bg-[#F8E9D2]" />
        </div>

        {/* PHONE MOCKUP GROUP */}
        <div
          ref={phoneGroupRef}
          className="
            pointer-events-none
            absolute
            bottom-[-150px]
            left-1/2
            z-20
            w-[290px]
            -translate-x-1/2
            sm:bottom-[-250px]
            sm:w-[330px]
            md:bottom-[-120px]
            md:w-[360px]
          "
        >
          <img
            src="/images/iPhone 14 Pro.png"
            alt="Lorem verification dashboard shown on a phone"
            className="relative z-10 w-full"
          />

          {/* LEFT FLOATING CARD */}
          <div
            className="
              absolute
              left-[-34%]
              top-[5%]
              z-30
              w-[165px]
              rounded-[14px]
              border
              border-white/90
              bg-white/30
              px-3
              py-2.5
              text-left
              shadow-[0_12px_40px_rgba(255,255,255,0.35)]
              backdrop-blur-xl
            "
          >
            <div className="mb-1 flex -space-x-1.5">
              {[0, 1, 2, 3].map((item) => (
                <span
                  key={item}
                  className="
                    h-6
                    w-6
                    rounded-full
                    border-2
                    border-white
                    bg-gradient-to-br
                    from-[#E88F00]
                    to-[#D9D9D9]
                  "
                />
              ))}
            </div>
            <p className="text-[17px] font-medium leading-none text-[#171717]">
              250+
            </p>
            <p className="mt-1 text-[9px] text-[#171717]/55">
              trusted organizations
            </p>
          </div>

          {/* RIGHT FLOATING CARD */}
          <div
            className="
              absolute
              right-[-39%]
              top-[25%]
              z-30
              w-[175px]
              rounded-[14px]
              border
              border-white/90
              bg-white/30
              px-3
              py-2.5
              text-left
              shadow-[0_12px_40px_rgba(255,255,255,0.35)]
              backdrop-blur-xl
            "
          >
            <div
              className="
                mb-1
                grid
                h-6
                w-6
                place-items-center
                rounded-full
                bg-[#F8E9D2]
              "
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[#E88F00]" />
            </div>
            <p className="text-[17px] font-medium leading-none text-[#171717]">
              10,000+
            </p>
            <p className="mt-1 text-[9px] leading-[1.25] text-[#171717]/55">
              credentials verified securely
            </p>
          </div>
        </div>

        {/* =====================================================
            FRONT WAVE (Extended 200vh height curtain tail with matching gradient)
        ====================================================== */}
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
          {/* SVG curve top */}
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
          {/* Continuous bottom cover block matching the wave's horizontal gradient */}
          <div className="w-full grow bg-gradient-to-r from-[#FFF7E9] via-[#F9E8C8] to-[#F4B43D]" />
        </div>

        {/* REVEAL TEXT SECTION */}
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
            text-center
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
                  leading-[1.08]
                  tracking-[-0.04em]
                  text-[#CFC8BD]
                  md:text-[52px]
                  lg:text-[60px]
                  ${index > 0 ? 'mt-20' : ''}
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