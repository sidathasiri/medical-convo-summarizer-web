import React from "react";
import { FaFileAlt } from "react-icons/fa";
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
      <h2 style={styles.recordingTitle}>
        <span
          style={{
            marginRight: 8,
            color: "#805AD5",
            verticalAlign: "middle",
          }}
        >
          <FaFileAlt />
        </span>
        Transcription
      </h2>
      <div style={styles.transcriptionContent}>
        <p style={styles.transcriptionText}>{transcription}</p>
      </div>
    </div>
  );
};
