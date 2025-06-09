import { styles } from "../LandingPage.styles";
import { FaRocket } from "react-icons/fa";

interface HeroSectionProps {
  onSignIn: () => void;
}

export const HeroSection = ({ onSignIn }: HeroSectionProps) => {
  return (
    <section style={styles.hero}>
      <div style={styles.heroContent}>
        <img src="/main-logo.png" style={{width: '30%'}}/>
        <h1 style={styles.title}>
          Never Miss Important Medical Instructions Again
        </h1>
        <p style={styles.subtitle}>
          Turn pediatric consultations into clear, actionable summaries. Get
          organized medical notes, medication details, and follow-up steps — all
          powered by AI.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{
              ...styles.button,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1.25rem 3rem",
            }}
            onClick={onSignIn}
          >
            <FaRocket />
            <span>Try MediScribe Free</span>
          </button>
        </div>
      </div>
    </section>
  );
};
