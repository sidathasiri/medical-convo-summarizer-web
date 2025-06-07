import { styles } from "../HomePage.styles";

interface WelcomeSectionProps {
  name: string;
}

export const WelcomeSection = ({ name }: WelcomeSectionProps) => {
  return (
    <section style={styles.welcomeSection}>
      <h1 style={styles.welcomeTitle}>Welcome back, {name}</h1>
      <p>Ready to record and transcribe your next medical consultation?</p>
    </section>
  );
};
