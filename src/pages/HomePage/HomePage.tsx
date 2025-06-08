import { User } from "oidc-client-ts";
import { useTranscription } from "../../hooks/useTranscription";
import { styles } from "./HomePage.styles";
import { useState, useEffect } from "react";
import { BACKEND_API_URL, API_KEY } from "../../configs";
import { Header } from "./components/Header";
import { WelcomeSection } from "./components/WelcomeSection";
import { RecordingSection } from "./components/RecordingSection";
import { InfoSection } from "./components/InfoSection";
import { SummaryDisplay } from "./components/SummaryDisplay";
import { Loader } from "../../components/Loader/Loader";
import { useFileUpload } from "../../hooks/useFileUpload";
import { FileUploadSection } from "./components/FileUploadSection";

interface HomePageProps {
  user: User;
  onSignOut: () => void;
}

export const HomePage = ({ user, onSignOut }: HomePageProps) => {
  const { transcription, isRecording, startTranscription, clearTranscription } =
    useTranscription(user.id_token);
  const { uploadFile, isUploading } = useFileUpload(user.id_token);
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
    clearTranscription();
    setGeneratedSummary(null);
    setSessionStartTime(null);
    setDuration("00:00");
  };

  const handleGenerateSummary = async () => {
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

      const response = await fetch(`${BACKEND_API_URL}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          query,
          variables: {
            transcription: transcription,
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
  };

  const handleFileUpload = async (file: File) => {
    try {
      const fileKey = await uploadFile(file);
      if (fileKey) {
        console.log("File uploaded successfully:", fileKey);
        setGeneratedSummary(
          `File "${file.name}" uploaded successfully. Transcription will be implemented soon.`
        );
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setGeneratedSummary("Failed to upload file. Please try again.");
    }
  };

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
            isUploading={isUploading}
            duration={duration}
            transcription={transcription}
            onRecordingToggle={handleRecordingToggle}
            onClearTranscription={handleClearTranscription}
            onGenerateSummary={handleGenerateSummary}
          />
          <FileUploadSection
            isUploading={isUploading}
            onFileUpload={handleFileUpload}
          />
        </div>
        {generatedSummary && <SummaryDisplay summary={generatedSummary} />}
        <InfoSection />
      </main>
    </div>
  );
};
