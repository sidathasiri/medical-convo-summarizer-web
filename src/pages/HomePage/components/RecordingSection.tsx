import { styles } from "../HomePage.styles";

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
          {isRecording && <span>{duration}</span>}
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button
          onClick={onRecordingToggle}
          style={{
            ...styles.button,
            ...styles.primaryButton,
          }}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>

        {transcription && !isRecording && (
          <>
            <button
              onClick={onClearTranscription}
              style={{
                ...styles.button,
                ...styles.dangerButton,
              }}
            >
              Clear & Start Over
            </button>
            <button
              onClick={onGenerateSummary}
              style={{
                ...styles.button,
                ...styles.primaryButton,
              }}
            >
              Generate Summary
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
