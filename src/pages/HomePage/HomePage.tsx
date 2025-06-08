import { User } from "oidc-client-ts";
import { useTranscription } from "../../hooks/useTranscription";
import { styles } from "./HomePage.styles";
import { useState, useEffect } from "react";
import { BACKEND_API_URL } from "../../configs";
import { Header } from "./components/Header";
import { WelcomeSection } from "./components/WelcomeSection";
import { RecordingSection } from "./components/RecordingSection";
import { InfoSection } from "./components/InfoSection";
import { SummaryDisplay } from "./components/SummaryDisplay";
import { Loader } from "../../components/Loader/Loader";

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
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isInitializingRecording, setIsInitializingRecording] = useState(false);

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
    if (!isRecording) {
      setIsInitializingRecording(true);
      try {
        await startTranscription();
      } finally {
        setIsInitializingRecording(false);
      }
    } else {
      await startTranscription();
    }
  };

  const handleClearTranscription = () => {
    clearTranscription();
    setGeneratedSummary(null);
    setSessionStartTime(null);
    setDuration("00:00");
  };

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      setGeneratedSummary("Generating summary...");

      const response = await fetch(`${BACKEND_API_URL}/transcription/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.id_token}`,
        },
        body: JSON.stringify({
          transcription: transcription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const data = await response.json();
      setGeneratedSummary(data.transcription);
    } catch (error) {
      console.error("Error generating summary:", error);
      setGeneratedSummary("Failed to generate summary. Please try again.");
    } finally {
      setIsGeneratingSummary(false);
    }
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
        {generatedSummary && <SummaryDisplay summary={generatedSummary} />}
        <InfoSection />
      </main>
    </div>
  );
};
