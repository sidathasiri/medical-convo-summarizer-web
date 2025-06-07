import { styles } from "../LandingPage.styles";

interface HeroSectionProps {
  onSignIn: () => void;
}

export const HeroSection = ({ onSignIn }: HeroSectionProps) => {
  return (
    <section style={styles.hero}>
      <div style={styles.heroContent}>
        <h1 style={styles.title}>
          Never Miss Important Medical Instructions Again
        </h1>
        <p style={styles.subtitle}>
          Turn pediatric consultations into clear, actionable summaries. Get
          organized medical notes, medication details, and follow-up steps — all
          powered by AI.
        </p>
        <button style={styles.button} onClick={onSignIn}>
          Try MediScribe Free
        </button>
      </div>
    </section>
  );
};
