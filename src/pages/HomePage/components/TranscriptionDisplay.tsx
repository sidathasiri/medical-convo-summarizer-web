import React from "react";
import { styles } from "../HomePage.styles";

interface TranscriptionDisplayProps {
  transcription: string;
}

export const TranscriptionDisplay = ({
  transcription,
}: TranscriptionDisplayProps) => {
  return (
    <div
      style={{
        ...styles.recordingSection,
        marginBottom: "2rem",
      }}
    >
      <h3 style={styles.recordingTitle}>Transcription</h3>
      <div style={styles.transcriptionContent}>
        <p style={styles.transcriptionText}>{transcription}</p>
      </div>
    </div>
  );
};
