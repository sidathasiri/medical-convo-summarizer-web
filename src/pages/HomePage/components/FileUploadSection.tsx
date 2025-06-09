import React, { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { styles } from "../HomePage.styles";
import { useTranscriptionSubscription } from "../../../hooks/useTranscriptionSubscription";

interface FileUploadSectionProps {
  isUploading: boolean;
  onFileUpload: (file: File) => Promise<string | null>;
  onTranscriptionUpdate: (transcription: string) => void;
}

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export const FileUploadSection = ({
  isUploading,
  onFileUpload,
  onTranscriptionUpdate,
}: FileUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  // Subscribe to transcription updates
  useTranscriptionSubscription(uploadedFileName, (status) => {
    // If we got any data, we're transcribing
    if (status.fileName) {
      setIsTranscribing(true);
    }

    // If we got transcribed text, update the UI
    if (status.transcribedText && status.transcribedText.length > 0) {
      console.log("Updating transcription with:", status.transcribedText);
      onTranscriptionUpdate(status.transcribedText.toString());
      setIsTranscribing(false);
    }

    // If we got an error, show it
    if (status.error && status.error.length > 0) {
      console.error("Transcription failed:", status.error);
      setError("Transcription failed: " + status.error);
      setIsTranscribing(false);
    }
  });

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return "File size exceeds 100MB limit";
    }

    const validTypes = ["audio/mp3", "audio/wav", "audio/x-m4a", "audio/mpeg"];
    if (!validTypes.includes(file.type)) {
      return "Invalid file type. Please upload MP3, WAV, or M4A files only";
    }

    return null;
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError(null);
    const file = event.target.files?.[0];

    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      try {
        const fileKey = await onFileUpload(file);
        setUploadedFileName(fileKey);
        setIsTranscribing(true);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("File upload failed:", error);
        setError(
          "Upload failed: " +
            (error instanceof Error ? error.message : "Unknown error")
        );
        setUploadedFileName(null);
      }
    }
  };

  const getStatusMessage = () => {
    if (error) {
      return <div style={{ color: "#E53E3E", marginTop: "1rem" }}>{error}</div>;
    }
    if (isUploading) {
      return (
        <div style={{ color: "#2B6CB0", marginTop: "1rem" }}>
          Uploading file...
        </div>
      );
    }
    if (isTranscribing) {
      return (
        <div style={{ color: "#2B6CB0", marginTop: "1rem" }}>
          Transcribing audio... This may take a few minutes.
        </div>
      );
    }
    return null;
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
          accept="audio/mp3,audio/wav,audio/x-m4a,audio/mpeg"
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
            opacity: isUploading || isTranscribing ? 0.7 : 1,
          }}
          disabled={isUploading || isTranscribing}
        >
          <FaUpload style={{ verticalAlign: "middle" }} />
          <span>
            {isUploading
              ? "Uploading..."
              : isTranscribing
              ? "Transcribing..."
              : "Select Audio File"}
          </span>
        </button>
      </div>

      {getStatusMessage()}

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
