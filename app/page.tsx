import { HeroSection } from "@/components/home/hero-section"
import { ProblemSection } from "@/components/home/problem-section"
import { SolutionSection } from "@/components/home/solution-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { BenefitsSection } from "@/components/home/benefits-section"
import { SecuritySection } from "@/components/home/security-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <BenefitsSection />
      <SecuritySection />
      <CTASection />
    </>
  )
}
