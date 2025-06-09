import React from "react";
import {
  FaMicrophone,
  FaStop,
  FaTrash,
  FaMagic,
  FaClock,
} from "react-icons/fa";
import { styles } from "../HomePage.styles";

interface RecordingSectionProps {
  isRecording: boolean;
  isUploading: boolean;
  duration: string;
  transcription: string;
  onRecordingToggle: () => void;
  onClearTranscription: () => void;
  onGenerateSummary: () => void;
}

export const RecordingSection = ({
  isRecording,
  isUploading,
  duration,
  onRecordingToggle,
  onClearTranscription,
  onGenerateSummary,
  transcription
}: RecordingSectionProps) => {
  return (
    <section style={{...styles.recordingSection, height: "60px"}}>
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
          disabled={isUploading}
        >
          {isRecording ? (
            <>
              <FaStop style={{ verticalAlign: "middle" }} />
              <span>Stop</span>
            </>
          ) : (
            <>
              <FaMicrophone style={{ verticalAlign: "middle" }} />
              <span>Start</span>
            </>
          )}
        </button>

    
          <>
            <button
              onClick={onClearTranscription}
              style={{
                ...styles.button,
                ...styles.dangerButton,
                ...(!!!transcription ? styles.disabledButton : {}),
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              disabled={!transcription}
            >
              <FaTrash style={{ verticalAlign: "middle" }} />
              <span>Start Over</span>
            </button>
            <button
              onClick={onGenerateSummary}
              style={{
                ...styles.button,
                ...styles.primaryButton,
                ...(!!!transcription ? styles.disabledButton : {}),
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              disabled={!transcription}
            >
              <FaMagic style={{ verticalAlign: "middle" }} />
              <span>Generate Summary</span>
            </button>
          </>
        
      </div>
    </section>
  );
};
