import Banner from "@/components/banner/banner";
import BrandStory from "@/components/landing/brand-story";
import FaqSection from "@/components/landing/faq-section";
import FeaturedCollections from "@/components/landing/featured-collections";
import MilitaryHeritage from "@/components/landing/military-heritage";
import NewsletterSignup from "@/components/landing/newsletter-signup";
import OutfitBuilder from "@/components/landing/outfit-builder";
import ParallaxSection from "@/components/landing/parallax-section";
import ProductShowcase from "@/components/landing/product-showcase";
import SizeGuide from "@/components/landing/size-guide";
import StyleGuide from "@/components/landing/style-guide";
import Testimonials from "@/components/landing/testimonials";
import Footer from "@/components/shared/footer";

export default function Home() {
  return (
    <>
      <Banner />
      <FeaturedCollections />
      <ParallaxSection />
      <MilitaryHeritage />
      <BrandStory />
      <ProductShowcase />
      <StyleGuide />
      <OutfitBuilder />
      <Testimonials />
      <SizeGuide />
      <FaqSection />
      <NewsletterSignup />
      <Footer />
    </>
  )
}

