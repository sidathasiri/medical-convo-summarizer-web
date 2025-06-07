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
  const { transcription, isRecording, startTranscription } = useTranscription(
    user.id_token
  );
  const [duration, setDuration] = useState("00:00");
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

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
        />
        <InfoSection />
      </main>
    </div>
  );
};
