import { User } from "oidc-client-ts";
import { useTranscription } from "../../hooks/useTranscription";
import { styles } from "./HomePage.styles";
import { useState, useEffect, useCallback } from "react";
import { BACKEND_API_URL, API_KEY } from "../../configs";
import { Header } from "./components/Header";
import { WelcomeSection } from "./components/WelcomeSection";
import { RecordingSection } from "./components/RecordingSection";
import { InfoSection } from "./components/InfoSection";
import { SummaryDisplay } from "./components/SummaryDisplay";
import { TranscriptionDisplay } from "./components/TranscriptionDisplay";
import { useFileUpload } from "../../hooks/useFileUpload";
import { FileUploadSection } from "./components/FileUploadSection";

interface HomePageProps {
  user: User;
  onSignOut: () => void;
}

export const HomePage = ({ user, onSignOut }: HomePageProps) => {
  const {
    transcription,
    isRecording,
    startTranscription,
    clearTranscription,
    setTranscription,
  } = useTranscription(user.id_token);
  const { uploadFile, isUploading } = useFileUpload(user.id_token);
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

        const query = `
        query GetTranscriptionSummary($transcription: String!) {
          getTranscriptionSummary(transcription: $transcription) {
            success
            error
            summary
          }
        }
      `;

        const response = await fetch(`${BACKEND_API_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify({
            query,
            variables: {
              transcription: text,
            },
          }),
        });

        const { data, errors } = await response.json();

        if (errors) {
          throw new Error(errors[0].message || "Failed to generate summary");
        }

        if (!data.getTranscriptionSummary.success) {
          throw new Error(
            data.getTranscriptionSummary.error || "Failed to generate summary"
          );
        }

        setGeneratedSummary(data.getTranscriptionSummary.summary);
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
      <Header email={user.profile.email || "User"} onSignOut={onSignOut} />
      <main style={styles.mainContent}>
        <WelcomeSection
          name={user.profile.given_name || user.profile.email || "User"}
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
        <InfoSection />
      </main>
    </div>
  );
};
