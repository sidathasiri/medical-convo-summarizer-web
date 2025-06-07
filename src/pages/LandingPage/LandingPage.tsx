import React from "react";
import { styles } from "./LandingPage.styles";

interface LandingPageProps {
  onSignIn: () => void;
}

export default function LandingPage({ onSignIn }: LandingPageProps) {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>MediScribe</div>
          <button style={styles.button} onClick={onSignIn}>
            Sign In
          </button>
        </div>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>
            Never Miss Important Medical Instructions Again
          </h1>
          <p style={styles.subtitle}>
            Turn pediatric consultations into clear, actionable summaries. Get
            organized medical notes, medication details, and follow-up steps —
            all powered by AI.
          </p>
          <button style={styles.button} onClick={onSignIn}>
            Try MediScribe Free
          </button>
        </div>
      </section>

      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Why Parents Choose MediScribe</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.feature}>
            <div style={styles.featureTitle}>Clear Summaries</div>
            <p style={styles.featureDescription}>
              Get easy-to-understand summaries of medical consultations,
              organized by topic and importance.
            </p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureTitle}>Medication Details</div>
            <p style={styles.featureDescription}>
              Never forget medication instructions. Get dosage, timing, and
              important warnings clearly laid out.
            </p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureTitle}>Follow-up Actions</div>
            <p style={styles.featureDescription}>
              Keep track of follow-up appointments, tests, and warning signs to
              watch for.
            </p>
          </div>
        </div>
      </section>

      <section style={styles.howItWorks}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.steps}>
          <div style={styles.step}>
            <div style={styles.stepNumber}>1</div>
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>Record the Consultation</h3>
              <p style={styles.stepDescription}>
                Use MediScribe to record your child's doctor visit (with
                permission).
              </p>
            </div>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>2</div>
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>AI Processing</h3>
              <p style={styles.stepDescription}>
                Our AI technology transcribes and analyzes the conversation,
                identifying key medical information.
              </p>
            </div>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>3</div>
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>Get Your Summary</h3>
              <p style={styles.stepDescription}>
                Receive a clear, organized summary with all important details
                and next steps.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
