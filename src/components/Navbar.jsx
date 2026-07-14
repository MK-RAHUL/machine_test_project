import { ArrowUpRight } from 'lucide-react'

const LINKS = [
  { label: 'Home', active: true },
  { label: 'Solution', active: false },
  { label: 'Process', active: false },
  { label: 'Industries', active: false },
  { label: 'Platform', active: false },
  { label: 'Contact', active: false },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-black/5 bg-white/90 px-6 py-2.5 backdrop-blur-md shadow-sm"
        style={{ marginInline: 'clamp(1rem, 4vw, auto)' }}
      >
        <div className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-8 w-8 object-contain"
          />
        </div>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((item) => (
            <li key={item.label}>
              <span
                className={`text-sm font-medium cursor-pointer ${
                  item.active
                    ? 'text-[#E88F00]'
                    : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>

      <button
        className="hidden sm:flex items-center gap-1 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:opacity-90"
        style={{
          background: 'linear-gradient(-90deg,#0A192F 0%, #002966 100%)',
        }}
      >
        Sign In
        <ArrowUpRight className="h-3.5 w-3.5" />
      </button>
      </nav>
    </header>
  )
}