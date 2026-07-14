import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhoItsFor from './components/WhoItsFor'
import PlatformPreview from './components/PlatformPreview'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <WhoItsFor />
        <PlatformPreview />
      </main>
      <Footer />
    </div>
  )
}
