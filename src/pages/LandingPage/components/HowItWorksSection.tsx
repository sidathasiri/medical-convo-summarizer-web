import { styles } from "../LandingPage.styles";

export const HowItWorksSection = () => {
  return (
    <section style={styles.howItWorks}>
      <h2 style={styles.sectionTitle}>How It Works</h2>
      <div style={styles.steps}>
        <Step
          number={1}
          title="Record the Consultation"
          description="Use MediScribe to record your child's doctor visit (with permission)."
        />
        <Step
          number={2}
          title="AI Processing"
          description="Our AI technology transcribes and analyzes the conversation, identifying key medical information."
        />
        <Step
          number={3}
          title="Get Your Summary"
          description="Receive a clear, organized summary with all important details and next steps."
        />
      </div>
    </section>
  );
};

interface StepProps {
  number: number;
  title: string;
  description: string;
}

const Step = ({ number, title, description }: StepProps) => {
  return (
    <div style={styles.step}>
      <div style={styles.stepNumber}>{number}</div>
      <div style={styles.stepContent}>
        <h3 style={styles.stepTitle}>{title}</h3>
        <p style={styles.stepDescription}>{description}</p>
      </div>
    </div>
  );
};
