import { useEffect, useRef, useState } from 'react'
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { FaInstagram, FaLinkedin, FaMailBulk } from "react-icons/fa";
import Logo from './Logo'
import useReducedMotion from '../hooks/useReducedMotion'


const SOCIALS = [
  { Icon: FaLinkedin, label: 'LinkedIn' },
  { Icon: FaInstagram, label: 'Instagram' },
  { Icon: Mail, label: 'Email' },
]

const COLUMNS = [
  {
    heading: 'Product',
    links: ['Overview', 'Solutions', 'Process', 'Platform Preview', 'Pricing', 'Request Demo'],
  },
  {
    heading: 'Company & Resources',
    links: ['Terms of Service', 'Privacy Policy', 'FAQs'],
  },
]

export default function Footer() {
  const footerRef = useRef(null)
  const videoRef = useRef(null)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const el = footerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadVideo(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  useEffect(() => {
    if (shouldLoadVideo && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [shouldLoadVideo])

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative bg-[#f6f6f6] pt-10"
      style={{ background: "linear-gradient(180deg,#FFFFFF 0%,rgba(255,255,255,0) 100%)" }}
    >
      <div className="relative mx-6 md:mx-10 lg:mx-16 overflow-hidden rounded-t-[32px] rounded-b-none bg-black isolate">

        {/* Background layer: video OR static fallback */}
        <div className="absolute inset-0">
          {!reduced && shouldLoadVideo ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            >
              <source src="/videos/footer_video.mp4" type="video/mp4" />
            </video>
          ) : (
            // Static fallback: reduced motion, or video not loaded yet
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 60%), #0a0a0a",
              }}
            />
          )}
          {/* Dark overlay for text contrast, always present */}
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 px-8 sm:px-12 md:px-16 pt-14 pb-0 flex flex-col">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-14">
            {/* Product */}
            <div>
              <h3 className="text-white text-xl font-medium mb-7">Product</h3>
              <ul className="space-y-3 text-white/70">
                {COLUMNS[0].links.map((link) => (
                  <li key={link}>
                    <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white text-xl font-medium mb-7">Company & Resources</h3>
              <ul className="space-y-3 text-white/70">
                {COLUMNS[1].links.map((link) => (
                  <li key={link}>
                    <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white text-xl font-medium mb-7">Contact</h3>
              <div className="space-y-4 text-white/70">
                <div className="flex items-center gap-3">
                  <MapPin size={17} />
                  <span>USA</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={17} />
                  <span>+971 51 547 3625</span>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-white text-xl font-medium mb-7">Connect</h3>
                <div className="flex gap-3">
                  {SOCIALS.map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="h-10 w-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition"
                      aria-label={label}
                    >
                      <Icon size={18} strokeWidth={2} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-10 pb-16 flex justify-end shrink-0">
            <p className="text-sm text-white/45">
              © 2026 Lorem.app. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}
