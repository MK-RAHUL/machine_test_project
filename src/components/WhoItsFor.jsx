import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, Users2, Landmark, GraduationCap, Scale } from 'lucide-react'
import useReducedMotion from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const BADGES = [
  { label: 'Compliance & Mobility Teams', icon: '/svg/icon1.svg' },
  { label: 'Immigration Law Firms', icon: '/svg/icon4.svg' },
  { label: 'Financial Institutions', icon: '/svg/icon4.svg' },
  { label: 'Universities & Training Institutes', icon: '/svg/icon3.svg' },
  { label: 'HR & Recruitment Firms', icon: '/svg/icon2.svg' },
]

const START_RADIUS = 210
const END_RADIUS = 116
const START_ANGLE = -90 // first badge starts at top
const TOTAL_ROTATION = 260 // degrees, clockwise
const BADGE_HALF_WIDTH = 70 // half of the badge pill width, mobile-safe estimate

export default function WhoItsFor() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const orbitRef = useRef(null)
  const badgeRefs = useRef([])
  const ringRefs = useRef([])
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let radiusScale = 1

      const computeScale = () => {
        const containerWidth = orbitRef.current?.offsetWidth || 640
        const maxAllowedRadius = containerWidth / 2 - BADGE_HALF_WIDTH
        radiusScale = Math.min(1, Math.max(0.35, maxAllowedRadius / START_RADIUS))
      }

      const setBadgePosition = (progress) => {
        const rotation = START_ANGLE + progress * TOTAL_ROTATION
        const radius = gsap.utils.interpolate(START_RADIUS, END_RADIUS, progress) * radiusScale
        BADGES.forEach((_, i) => {
          const el = badgeRefs.current[i]
          if (!el) return
          const angleDeg = rotation + (360 / BADGES.length) * i
          const angleRad = (angleDeg * Math.PI) / 180
          const x = Math.cos(angleRad) * radius
          const y = Math.sin(angleRad) * radius
          gsap.set(el, { x, y })
        })
        ringRefs.current.forEach((ring, i) => {
          if (!ring) return
          gsap.set(ring, { rotate: rotation * (0.3 + i * 0.15) })
        })
      }

      computeScale()
      // Initial resting layout
      setBadgePosition(0)

      const onResize = () => {
        computeScale()
        setBadgePosition(ScrollTrigger.getById('who-orbit')?.progress || 0)
      }
      window.addEventListener('resize', onResize)

      if (reduced) {
        window.removeEventListener('resize', onResize)
        return
      }

      ScrollTrigger.create({
        id: 'who-orbit',
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=160%',
        scrub: 0.6,
        pin: pinRef.current,
        anticipatePin: 1,
        onUpdate: (self) => setBadgePosition(self.progress),
      })

      return () => window.removeEventListener('resize', onResize)
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="industries" ref={sectionRef} className="relative bg-gradient-to-b from-cream/40 via-bg to-bg">
      <div ref={pinRef} className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16">
        <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-amber">Who it's for</p>
        <h2 className="mb-2 max-w-2xl text-center text-2xl font-semibold text-ink sm:text-3xl md:text-4xl">
          Built for workflows where trust is non-negotiable.
        </h2>
        <p className="mb-6 max-w-md text-center text-sm text-ink/50">
          Wherever credentials matter, Lorem handles the verification        </p>

        <div ref={orbitRef} className="relative grid h-[400px] w-full max-w-2xl place-items-center">
          {/* Concentric decorative rings */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              ref={(el) => (ringRefs.current[i] = el)}
              aria-hidden="true"
              className="absolute rounded-[70px] border border-amber/20"
              style={{ width: `${180 + i * 90}px`, height: `${180 + i * 90}px` }}
            />
          ))}

          <div className="relative z-10 flex items-center justify-center">

            <img
              src="/images/who_it_is_for_gradient.png"
              alt=""
              className="absolute h-[500px]
w-[500px]
opacity-100 max-w-none opacity-95"
            />

            <div className="relative flex h-[210px]
w-[210px]
rounded-[58px] items-center justify-center border-[3px] border-white bg-white/10 backdrop-blur-sm">

              <div className="flex h-[70px]
w-[70px]
rounded-[20px] items-center justify-center border-2 border-white bg-white shadow-xl">

                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="h-10 w-10 object-contain"
                />

              </div>

            </div>
          </div>

          {BADGES.map(({ label, icon }, i) => (
            <div
              key={label}
              ref={(el) => (badgeRefs.current[i] = el)}
              className="absolute z-20 flex w-32 max-w-[9.5rem] items-center gap-2 rounded-full border border-black/5 bg-white/95 px-2.5 py-2 text-left shadow-lg shadow-black/5 backdrop-blur sm:w-auto sm:px-3"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full">
                <img
                  src={icon}
                  alt=""
                  className="h-4 w-4 object-contain"
                />
              </span>

              <span className="text-[11px] font-medium leading-tight text-ink/80">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
