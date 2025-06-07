import { styles } from "../HomePage.styles";

export const InfoSection = () => {
  return (
    <section style={styles.infoSection}>
      <h2 style={styles.recordingTitle}>Session Information</h2>
      <div style={styles.infoGrid}>
        <InfoCard
          title="Tips for Better Results"
          content={
            <ul>
              <li>Ensure you have permission to record</li>
              <li>Find a quiet environment</li>
              <li>Place the device closer to the speaker</li>
              <li>Speak clearly and at a normal pace</li>
            </ul>
          }
        />
        <InfoCard
          title="What You'll Get"
          content={
            <ul>
              <li>Clear consultation summary</li>
              <li>Medication instructions</li>
              <li>Follow-up actions</li>
              <li>Important warning signs</li>
            </ul>
          }
        />
        <InfoCard
          title="Need Help?"
          content={
            <p>
              Contact support at support@mediscribe.com
              <br />
              Available Monday-Friday, 9 AM - 5 PM EST
            </p>
          }
        />
      </div>
    </section>
  );
};

interface InfoCardProps {
  title: string;
  content: React.ReactNode;
}

const InfoCard = ({ title, content }: InfoCardProps) => {
  return (
    <div style={styles.infoCard}>
      <h3 style={styles.infoTitle}>{title}</h3>
      <div style={styles.infoText}>{content}</div>
    </div>
  );
};
