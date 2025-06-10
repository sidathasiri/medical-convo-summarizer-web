import { useCallback, useEffect, useRef } from "react";
import { subscribeToTranscription, TranscriptionJobStatus } from "../services/transcription-service";

export const useTranscriptionSubscription = (
  fileName: string | null,
  onStatusUpdate: (status: TranscriptionJobStatus) => void
) => {
  const subscriptionRef = useRef<{ unsubscribe: () => void } | null>(null);
  const fileNameWithoutPrefix = fileName
    ? fileName.replace(/^uploads\//, "")
    : null;

  const subscribeToTranscriptionCallback = useCallback(async () => {
    if (!fileNameWithoutPrefix) return;

    // Clean up existing subscription if any
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }

    try {
      const subscriber = subscribeToTranscription(
        fileNameWithoutPrefix,
        (transcriptionData: TranscriptionJobStatus) => {
          // Only process if it matches our file
          if (transcriptionData.fileName === fileNameWithoutPrefix) {
            onStatusUpdate(transcriptionData);

            // If we have either transcribed text or an error, unsubscribe
            if (
              (transcriptionData.transcribedText &&
                transcriptionData.transcribedText.length > 0) ||
              (transcriptionData.error &&
                transcriptionData.error.length > 0)
            ) {
              console.log("Transcription complete, unsubscribing");
              subscriber.unsubscribe();
              subscriptionRef.current = null;
            }
          } else {
            console.log(
              "Received update for different file:",
              transcriptionData.fileName
            );
          }
        }
      );
      subscriptionRef.current = subscriber;

      return () => {
        if (subscriptionRef.current) {
          subscriptionRef.current.unsubscribe();
          subscriptionRef.current = null;
        }
      };
    } catch (error) {
      console.error("Error setting up subscription:", error);
      onStatusUpdate({
        fileName: fileNameWithoutPrefix as String,
        transcribedText: "" as String,
        error:
          error instanceof Error
            ? (error.message as String)
            : ("Unknown error" as String),
      });
    }
  }, [fileNameWithoutPrefix, onStatusUpdate]);

  useEffect(() => {
    // Call subscribeToTranscription when fileName changes
    subscribeToTranscriptionCallback();
  }, [subscribeToTranscriptionCallback]);

  // Return unsubscribe function from the hook
  return () => {
    // The subscription is handled by the useEffect cleanup
  };
};
