import Gallery from '@/components/Gallery'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdSlot from '@/components/AdSlot'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Top Ad */}
      <AdSlot position="top" />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Gallery />
      </main>

      {/* Bottom Ad */}
      <AdSlot position="bottom" />

      <Footer />
    </div>
  )
}
