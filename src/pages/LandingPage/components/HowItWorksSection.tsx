import { styles } from "../LandingPage.styles";
import { FaMicrophone, FaRobot, FaFileAlt } from "react-icons/fa";

export const HowItWorksSection = () => {
  return (
    <section style={styles.howItWorks}>
      <h2 style={styles.sectionTitle}>How It Works</h2>
      <div style={styles.steps}>
        <Step
          number={1}
          icon={<FaMicrophone size={24} />}
          title="Record the Consultation"
          description="Use MediScribe to record your child's doctor visit (with permission)."
        />
        <Step
          number={2}
          icon={<FaRobot size={24} />}
          title="AI Processing"
          description="Our AI technology transcribes and analyzes the conversation, identifying key medical information."
        />
        <Step
          number={3}
          icon={<FaFileAlt size={24} />}
          title="Get Your Summary"
          description="Receive a clear, organized summary with all important details and next steps."
        />
      </div>
    </section>
  );
};

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Step = ({ number, title, description, icon }: StepProps) => {
  return (
    <div style={styles.step}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        <div style={styles.stepNumber}>{number}</div>
        <div style={{ color: "#4C51BF" }}>{icon}</div>
      </div>
      <div style={styles.stepContent}>
        <h3 style={styles.stepTitle}>{title}</h3>
        <p style={styles.stepDescription}>{description}</p>
      </div>
    </div>
  );
};
