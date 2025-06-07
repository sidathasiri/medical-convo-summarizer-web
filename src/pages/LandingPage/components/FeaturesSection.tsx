import { styles } from "../LandingPage.styles";

export const FeaturesSection = () => {
  return (
    <section style={styles.features}>
      <h2 style={styles.sectionTitle}>Why Parents Choose MediScribe</h2>
      <div style={styles.featuresGrid}>
        <FeatureCard
          title="Clear Summaries"
          description="Get easy-to-understand summaries of medical consultations, organized by topic and importance."
        />
        <FeatureCard
          title="Medication Details"
          description="Never forget medication instructions. Get dosage, timing, and important warnings clearly laid out."
        />
        <FeatureCard
          title="Follow-up Actions"
          description="Keep track of follow-up appointments, tests, and warning signs to watch for."
        />
      </div>
    </section>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <div style={styles.feature}>
      <div style={styles.featureTitle}>{title}</div>
      <p style={styles.featureDescription}>{description}</p>
    </div>
  );
};
