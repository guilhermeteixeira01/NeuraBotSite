import HeroSection from "../components/sections/HeroSection";
import StatsBar from "../components/sections/StatsBar";
import BotsSection from "../components/sections/BotsSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import PlansSection from "../components/sections/PlansSection";
import CTASection from "../components/sections/CTASection";
import StackSection from "../components/ui/StackSection";

export default function HomePage() {
  return (
    <>
      <StackSection zIndex={1} plain>
        <HeroSection />
      </StackSection>

      <StackSection zIndex={2}>
        <StatsBar />
        <BotsSection />
      </StackSection>

      <StackSection zIndex={3}>
        <FeaturesSection />
      </StackSection>

      <StackSection zIndex={4}>
        <PlansSection />
      </StackSection>

      <StackSection zIndex={5}>
        <CTASection />
      </StackSection>
    </>
  );
}
