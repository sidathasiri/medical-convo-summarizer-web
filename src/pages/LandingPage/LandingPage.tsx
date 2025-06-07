import React from "react";
import { styles } from "./LandingPage.styles";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";

interface LandingPageProps {
  onSignIn: () => void;
}

export default function LandingPage({ onSignIn }: LandingPageProps) {
  return (
    <div style={styles.container}>
      <Header onSignIn={onSignIn} />
      <HeroSection onSignIn={onSignIn} />
      <FeaturesSection />
      <HowItWorksSection />
    </div>
  );
}
