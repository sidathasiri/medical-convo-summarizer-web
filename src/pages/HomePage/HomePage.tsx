import { useTranscription } from "../../hooks/useTranscription";
import { styles } from "./HomePage.styles";
import { useState, useEffect, useCallback } from "react";
import { Header } from "./components/Header";
import { WelcomeSection } from "./components/WelcomeSection";
import { RecordingSection } from "./components/RecordingSection";
import { InfoSection } from "./components/InfoSection";
import { SummaryDisplay } from "./components/SummaryDisplay";
import { TranscriptionDisplay } from "./components/TranscriptionDisplay";
import { useFileUpload } from "../../hooks/useFileUpload";
import { FileUploadSection } from "./components/FileUploadSection";
import { BabyDevelopmentSection } from "./components/BabyDevelopmentSection";
import { RemindersSection } from "./components/RemindersSection";
import { fetchTranscriptionSummary } from "../../services/transcription-service";

interface HomePageProps {
  user: any;
  onSignOut: () => void;
}

export const HomePage = ({ user, onSignOut }: HomePageProps) => {
  const idToken = user.tokens.idToken.toString()
  
  const {
    transcription,
    isRecording,
    startTranscription,
    clearTranscription,
    setTranscription,
  } = useTranscription(idToken);
  const { uploadFile, isUploading } = useFileUpload(idToken);
  const [duration, setDuration] = useState("00:00");
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [generatedSummary, setGeneratedSummary] = useState<string | null>();

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
    clearTranscription();
    setGeneratedSummary(null);
    setSessionStartTime(null);
    setDuration("00:00");
  };

  const generateSummary = useCallback(
    async (text: string) => {
      try {
        setGeneratedSummary("Generating summary...");
        const summary = await fetchTranscriptionSummary(text);
        setGeneratedSummary(summary);
      } catch (error) {
        console.error("Error generating summary:", error);
        setGeneratedSummary("Failed to generate summary. Please try again.");
      }
    },
    [setGeneratedSummary]
  );

  const handleTranscriptionUpdate = useCallback(
    (transcribedText: string) => {
      setTranscription(transcribedText);
      generateSummary(transcribedText);
    },
    [setTranscription, generateSummary]
  );

  return (
    <div style={styles.container}>
      <Header email={user.email || "User"} onSignOut={onSignOut} />
      <main style={{...styles.mainContent, width: "90%"}}>
        <WelcomeSection
          name={user.username || "User"}
        />
        <div style={styles.sectionsGrid}>
          <RecordingSection
            isRecording={isRecording}
            transcription={transcription}
            isUploading={isUploading}
            duration={duration}
            onRecordingToggle={handleRecordingToggle}
            onClearTranscription={handleClearTranscription}
            onGenerateSummary={() => generateSummary(transcription)}
          />
          <FileUploadSection
            isUploading={isUploading}
            onFileUpload={uploadFile}
            onTranscriptionUpdate={handleTranscriptionUpdate}
          />
        </div>
        <div style={styles.sectionsGrid}>
          <TranscriptionDisplay transcription={transcription ?? ""} />
          <SummaryDisplay summary={generatedSummary ?? ""} />
        </div>
        <div style={{
          ...styles.sectionsGrid,
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <BabyDevelopmentSection />
          <RemindersSection />
        </div>
        <InfoSection />
      </main>
    </div>
  );
};
