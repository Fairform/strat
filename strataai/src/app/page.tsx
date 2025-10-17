import Header from '@/components/Header'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import StateCompliance from '@/components/StateCompliance'
import UploadPortal from '@/components/UploadPortal'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <StateCompliance />
        <UploadPortal />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
