import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import BrandPhilosophy from '@/components/brand-philosophy';
import ConfidenceConcierge from '@/components/confidence-concierge';
import FeaturedCollection from '@/components/featured-collection';
import WardrobeCurator from '@/components/wardrobe-curator';
import PrecisionFit from '@/components/precision-fit';
import EditorialLookbook from '@/components/editorial-lookbook';
import NewsletterSection from '@/components/newsletter-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="bg-[#f8f7f5]">
      <Navigation />
      <HeroSection />
      <BrandPhilosophy />
      <ConfidenceConcierge />
      <FeaturedCollection />
      <WardrobeCurator />
      <PrecisionFit />
      <EditorialLookbook />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
