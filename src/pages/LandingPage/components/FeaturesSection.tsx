import { styles } from "../LandingPage.styles";
import { FaClipboardList, FaCalendarCheck, FaBaby, FaBell } from "react-icons/fa";

export const FeaturesSection = () => {
  return (
    <section style={styles.features}>
      <h2 style={styles.sectionTitle}>Why Parents Choose CuddleScribe</h2>
      <div style={styles.featuresGrid}>
        <FeatureCard
          icon={<FaClipboardList size={24} />}
          title="Clear Summaries"
          description="Get easy-to-understand summaries of medical consultations, organized by topic and importance."
        />
        <FeatureCard
          icon={<FaBaby size={24} />}
          title="Development Tracking"
          description="Access expert information about your baby's development milestones from 1 to 60 months of age."
        />
        <FeatureCard
          icon={<FaBell size={24} />}
          title="Smart Reminders"
          description="Set and manage reminders for medications, follow-ups, and important milestones. Never miss a critical date."
        />
        <FeatureCard
          icon={<FaCalendarCheck size={24} />}
          title="Follow-up Actions"
          description="Keep track of follow-up appointments, tests, and warning signs to watch for."
        />
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div style={styles.feature}>
      <div style={{ marginBottom: "1rem", color: "#4C51BF" }}>{icon}</div>
      <div style={styles.featureTitle}>{title}</div>
      <p style={styles.featureDescription}>{description}</p>
    </div>
  );
};
