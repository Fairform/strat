import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustMetrics from '@/components/TrustMetrics';
import HowItWorks from '@/components/HowItWorks';
import StateCompliance from '@/components/StateCompliance';
import UploadPortal from '@/components/UploadPortal';
import Pricing from '@/components/Pricing';
import B2BSection from '@/components/B2BSection';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-gray-50">
      <Header />
      <main className="relative">
        {/* Ambient background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        </div>

        <Hero />
        <TrustMetrics />
        <HowItWorks />
        <StateCompliance />
        <div id="upload">
          <UploadPortal />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <div id="b2b">
          <B2BSection />
        </div>
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
