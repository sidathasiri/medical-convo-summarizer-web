import React, { useRef } from "react";
import { FaUpload } from "react-icons/fa";
import { styles } from "../HomePage.styles";

interface FileUploadSectionProps {
  isUploading: boolean;
  onFileUpload: (file: File) => void;
}

export const FileUploadSection = ({
  isUploading,
  onFileUpload,
}: FileUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <section style={styles.recordingSection}>
      <h2 style={styles.recordingTitle}>Upload Audio File</h2>
      <p style={{ marginBottom: "1rem", color: "#4A5568" }}>
        Upload a pre-recorded audio file of your medical consultation
      </p>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="audio/*"
          style={{ display: "none" }}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            ...styles.button,
            ...styles.primaryButton,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          disabled={isUploading}
        >
          <FaUpload style={{ verticalAlign: "middle" }} />
          <span>{isUploading ? "Uploading..." : "Select Audio File"}</span>
        </button>
      </div>

      <div style={styles.transcriptionContent}>
        <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
          <li>Supported formats: MP3, WAV, M4A</li>
          <li>Maximum file size: 100MB</li>
          <li>For best results, ensure clear audio quality</li>
        </ul>
      </div>
    </section>
  );
};
