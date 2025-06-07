import { styles } from "../HomePage.styles";

interface RecordingSectionProps {
  isRecording: boolean;
  duration: string;
  transcription: string;
  onRecordingToggle: () => void;
}

export const RecordingSection = ({
  isRecording,
  duration,
  transcription,
  onRecordingToggle,
}: RecordingSectionProps) => {
  return (
    <section style={styles.recordingSection}>
      <div style={styles.recordingHeader}>
        <h2 style={styles.recordingTitle}>Recording Session</h2>
        <div style={styles.recordingStatus}>
          <div style={styles.statusIndicator(isRecording)} />
          <span>{isRecording ? "Recording" : "Ready"}</span>
          {isRecording && <span>{duration}</span>}
        </div>
      </div>

      <button
        onClick={onRecordingToggle}
        style={{
          ...styles.button,
          ...styles.primaryButton,
          marginBottom: "1rem",
        }}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {transcription && (
        <div style={styles.transcriptionContent}>
          <h3 style={styles.recordingTitle}>Live Transcription</h3>
          <p style={styles.transcriptionText}>{transcription}</p>
        </div>
      )}
    </section>
  );
};
