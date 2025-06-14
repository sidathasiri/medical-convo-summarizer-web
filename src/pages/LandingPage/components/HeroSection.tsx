import { styles } from "../LandingPage.styles";
import { FaRocket } from "react-icons/fa";

interface HeroSectionProps {
  onSignIn: () => void;
}

export const HeroSection = ({ onSignIn }: HeroSectionProps) => {
  return (
    <section style={styles.hero}>
      <div style={{
        ...styles.heroContent,
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 24,
        boxShadow: '0 8px 32px rgba(44, 62, 80, 0.12)',
        padding: '3rem 2.5rem 2.5rem 2.5rem',
        maxWidth: 540,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <img 
          src="/main-logo-no-bg.png" 
          style={{ width: 200, borderRadius: 16, marginBottom: 24, boxShadow: '0 4px 16px rgba(49,130,206,0.10)' }}
          alt="CuddleScribe Logo"
        />
        <h1 style={{
          ...styles.title,
          fontSize: 40,
          fontWeight: 800,
          color: '#2B6CB0',
          marginBottom: 16,
          textAlign: 'center',
          letterSpacing: '-1px',
        }}>
          Your Complete Child Health & Development Companion
        </h1>
        <p style={{
          ...styles.subtitle,
          fontSize: 20,
          color: '#4A5568',
          marginBottom: 32,
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          Record consultations, track milestones, set smart reminders, and get AI-powered
          summaries of your child's health journey. From birth to 5 years, we're here
          to help you stay organized and informed every step of the way.
        </p>
        <div style={{ display: "flex", justifyContent: "center", width: '100%' }}>
          <button
            style={{
              ...styles.button,
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1.25rem 3rem",
              fontSize: 18,
              fontWeight: 700,
              background: 'linear-gradient(90deg, #3182ce 0%, #63b3ed 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(49,130,206,0.10)',
              transition: 'background 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
            }}
            onClick={onSignIn}
          >
            <FaRocket />
            <span>Try CuddleScribe Free</span>
          </button>
        </div>
      </div>
    </section>
  );
};
