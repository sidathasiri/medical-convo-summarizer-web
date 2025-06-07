import { styles } from "../HomePage.styles";
import {
  FaMicrophone,
  FaStop,
  FaTrash,
  FaMagic,
  FaClock,
} from "react-icons/fa";

interface RecordingSectionProps {
  isRecording: boolean;
  duration: string;
  transcription: string;
  onRecordingToggle: () => void;
  onClearTranscription: () => void;
  onGenerateSummary: () => void;
}

export const RecordingSection = ({
  isRecording,
  duration,
  transcription,
  onRecordingToggle,
  onClearTranscription,
  onGenerateSummary,
}: RecordingSectionProps) => {
  return (
    <section style={styles.recordingSection}>
      <div style={styles.recordingHeader}>
        <h2 style={styles.recordingTitle}>Recording Session</h2>
        <div style={styles.recordingStatus}>
          <div style={styles.statusIndicator(isRecording)} />
          <span>{isRecording ? "Recording" : "Ready"}</span>
          {isRecording && (
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <FaClock style={{ verticalAlign: "middle" }} />
              {duration}
            </span>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button
          onClick={onRecordingToggle}
          style={{
            ...styles.button,
            ...styles.primaryButton,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {isRecording ? (
            <>
              <FaStop style={{ verticalAlign: "middle" }} />
              <span>Stop Recording</span>
            </>
          ) : (
            <>
              <FaMicrophone style={{ verticalAlign: "middle" }} />
              <span>Start Recording</span>
            </>
          )}
        </button>

        {transcription && !isRecording && (
          <>
            <button
              onClick={onClearTranscription}
              style={{
                ...styles.button,
                ...styles.dangerButton,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FaTrash style={{ verticalAlign: "middle" }} />
              <span>Clear & Start Over</span>
            </button>
            <button
              onClick={onGenerateSummary}
              style={{
                ...styles.button,
                ...styles.primaryButton,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FaMagic style={{ verticalAlign: "middle" }} />
              <span>Generate Summary</span>
            </button>
          </>
        )}
      </div>

      {transcription && (
        <div style={styles.transcriptionContent}>
          <h3 style={styles.recordingTitle}>Live Transcription</h3>
          <p style={styles.transcriptionText}>{transcription}</p>
        </div>
      )}
    </section>
  );
};
