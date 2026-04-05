import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import WhyMedSwapSection from './components/WhyMedSwapSection';
import DisclaimerBanner from './components/DisclaimerBanner';
import CtaSection from './components/CtaSection';
import SearchResultsSection from './components/SearchResultsSection';

export const metadata = {
  title: 'MedSwap — Find Affordable Medicine Substitutes',
  description:
    'Search by brand name or salt composition to find doctor-verified, affordable substitutes for your prescribed medicines.',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SearchResultsSection />
        <HowItWorksSection />
        <WhyMedSwapSection />
        <DisclaimerBanner />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}