import { useCallback, useEffect, useRef } from "react";
import { generateClient, GraphQLSubscription } from "aws-amplify/api";
import "../amplify-config";
import { API_KEY, BACKEND_API_URL } from "../configs";

type TranscriptionJobStatus = {
  fileName: String;
  transcribedText: String;
  error: String;
};

type TranscriptionSubscriptionData = {
  onTranscriptionComplete: TranscriptionJobStatus;
};

export const useTranscriptionSubscription = (
  fileName: string | null,
  onStatusUpdate: (status: TranscriptionJobStatus) => void
) => {
  const subscriptionRef = useRef<{ unsubscribe: () => void } | null>(null);
  const fileNameWithoutPrefix = fileName
    ? fileName.replace(/^uploads\//, "")
    : null;

  const subscribeToTranscription = useCallback(async () => {
    if (!fileNameWithoutPrefix) return;

    // Clean up existing subscription if any
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }

    const client = generateClient({
      endpoint: BACKEND_API_URL,
      authMode: "apiKey",
      apiKey: API_KEY,
    });

    try {
      const subscriber = client
        .graphql<GraphQLSubscription<TranscriptionSubscriptionData>>({
          query: `subscription OnTranscriptionComplete($fileName: String!) {
                    onTranscriptionComplete(fileName: $fileName) {
                        error
                        fileName
                        transcribedText
                    }
                }`,
          variables: { fileName: fileNameWithoutPrefix },
        })
        .subscribe({
          next: (result) => {
            if (result.data?.onTranscriptionComplete) {
              const transcriptionData = result.data.onTranscriptionComplete;

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
          },
          error: (error) => {
            console.warn("Subscription error:", error);
            onStatusUpdate({
              fileName: fileNameWithoutPrefix as String,
              transcribedText: "" as String,
              error: error.message as String,
            });
          },
        });

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
    subscribeToTranscription();
  }, [subscribeToTranscription]);

  // Return unsubscribe function from the hook
  return () => {
    // The subscription is handled by the useEffect cleanup
  };
};
