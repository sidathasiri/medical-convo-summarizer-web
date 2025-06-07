import { styles } from "../HomePage.styles";
import { FaLightbulb, FaClipboardList, FaQuestionCircle } from "react-icons/fa";

export const InfoSection = () => {
  return (
    <section style={styles.infoSection}>
      <h2 style={styles.recordingTitle}>Session Information</h2>
      <div style={styles.infoGrid}>
        <InfoCard
          icon={<FaLightbulb size={24} />}
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
          icon={<FaClipboardList size={24} />}
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
          icon={<FaQuestionCircle size={24} />}
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
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const InfoCard = ({ icon, title, content }: InfoCardProps) => {
  return (
    <div style={styles.infoCard}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1rem",
          color: "#4C51BF",
        }}
      >
        {icon}
        <h3 style={styles.infoTitle}>{title}</h3>
      </div>
      <div style={styles.infoText}>{content}</div>
    </div>
  );
};
