import { styles } from "../LandingPage.styles";
import { FaMicrophone, FaRobot, FaFileAlt, FaBaby, FaChartLine, FaBell } from "react-icons/fa";

export const HowItWorksSection = () => {
  return (
    <section style={styles.howItWorks}>
      <h2 style={styles.sectionTitle}>How It Works</h2>
      <div style={styles.steps}>
        <Step
          number={1}
          icon={<FaMicrophone size={24} />}
          title="Record or Upload"
          description="Record your child's doctor visit or upload a pre-recorded consultation."
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
        <Step
          number={4}
          icon={<FaBell size={24} />}
          title="Set Reminders"
          description="Create reminders for medications, follow-ups, and important milestones to stay on track."
        />
        <Step
          number={5}
          icon={<FaBaby size={24} />}
          title="Track Development"
          description="Access expert information about your child's development milestones at any age."
        />
        <Step
          number={6}
          icon={<FaChartLine size={24} />}
          title="Monitor Progress"
          description="Keep track of your child's growth and development journey over time."
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
      <div style={styles.stepNumber}>{number}</div>
      <div style={{ color: "#4C51BF", fontSize: "2rem", marginBottom: "1rem" }}>{icon}</div>
      <div style={styles.stepContent}>
        <h3 style={styles.stepTitle}>{title}</h3>
        <p style={styles.stepDescription}>{description}</p>
      </div>
    </div>
  );
};
