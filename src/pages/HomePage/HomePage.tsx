import { User } from "oidc-client-ts";
import { useTranscription } from "../../hooks/useTranscription";
import { styles } from "./HomePage.styles";
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { WelcomeSection } from "./components/WelcomeSection";
import { RecordingSection } from "./components/RecordingSection";
import { InfoSection } from "./components/InfoSection";

interface HomePageProps {
  user: User;
  onSignOut: () => void;
}

export const HomePage = ({ user, onSignOut }: HomePageProps) => {
  const { transcription, isRecording, startTranscription, clearTranscription } =
    useTranscription(user.id_token);
  const [duration, setDuration] = useState("00:00");
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [generatedSummary, setGeneratedSummary] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRecording && !sessionStartTime) {
      setSessionStartTime(new Date());
    }

    if (isRecording && sessionStartTime) {
      intervalId = setInterval(() => {
        const diff = Math.floor(
          (new Date().getTime() - sessionStartTime.getTime()) / 1000
        );
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;
        setDuration(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );
      }, 1000);
    }

    if (!isRecording) {
      setSessionStartTime(null);
      setDuration("00:00");
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRecording, sessionStartTime]);

  const handleRecordingToggle = async () => {
    await startTranscription();
  };

  const handleClearTranscription = () => {
    clearTranscription(); // This will also stop the recording
    setGeneratedSummary(null);
    setSessionStartTime(null);
    setDuration("00:00");
  };

  const handleGenerateSummary = async () => {
    setGeneratedSummary("Generating summary...");
    setTimeout(() => {
      setGeneratedSummary(`
        Summary of the consultation:
        
        Key Points:
        - Discussion about the patient's symptoms
        - Medication prescribed and dosage instructions
        - Follow-up appointment scheduled
        
        Next Steps:
        1. Start prescribed medication
        2. Monitor symptoms
        3. Return for follow-up in 2 weeks
      `);
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <Header email={user.profile.email || "User"} onSignOut={onSignOut} />
      <main style={styles.mainContent}>
        <WelcomeSection
          name={user.profile.given_name || user.profile.email || "User"}
        />
        <RecordingSection
          isRecording={isRecording}
          duration={duration}
          transcription={transcription}
          onRecordingToggle={handleRecordingToggle}
          onClearTranscription={handleClearTranscription}
          onGenerateSummary={handleGenerateSummary}
        />
        {generatedSummary && (
          <section style={styles.recordingSection}>
            <h3 style={styles.recordingTitle}>Generated Summary</h3>
            <div style={styles.transcriptionContent}>
              <pre style={styles.transcriptionText}>{generatedSummary}</pre>
            </div>
          </section>
        )}
        <InfoSection />
      </main>
    </div>
  );
};
