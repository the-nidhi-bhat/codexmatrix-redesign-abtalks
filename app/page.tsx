import { Hero } from "@/components/landing/Hero";
import { TrustTicker } from "@/components/landing/TrustTicker";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FaqPreview } from "@/components/landing/FaqPreview";
import { ClosingCta } from "@/components/landing/ClosingCta";

export default function LandingPage() {
  return (
    <div className="max-w-lg mx-auto">
      <Hero />
      <TrustTicker />
      <HowItWorks />
      <FaqPreview />
      <ClosingCta />
    </div>
  );
}
