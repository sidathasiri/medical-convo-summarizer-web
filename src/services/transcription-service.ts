// filepath: /src/services/transcription-subscription-service.ts
import { generateClient, GraphQLSubscription } from "aws-amplify/api";
import { API_KEY, BACKEND_API_URL } from "../configs";

export type TranscriptionJobStatus = {
  fileName: String;
  transcribedText: String;
  error: String;
};

export type TranscriptionSubscriptionData = {
  onTranscriptionComplete: TranscriptionJobStatus;
};

export function subscribeToTranscription(
  fileName: string,
  onStatusUpdate: (status: TranscriptionJobStatus) => void
) {
  const client = generateClient({
    endpoint: BACKEND_API_URL,
    authMode: "apiKey",
    apiKey: API_KEY,
  });

  return client
    .graphql<GraphQLSubscription<TranscriptionSubscriptionData>>({
      query: `subscription OnTranscriptionComplete($fileName: String!) {
        onTranscriptionComplete(fileName: $fileName) {
          error
          fileName
          transcribedText
        }
      }`,
      variables: { fileName },
    })
    .subscribe({
      next: (result) => {
        if (result.data?.onTranscriptionComplete) {
          const transcriptionData = result.data.onTranscriptionComplete;
          onStatusUpdate(transcriptionData);
        }
      },
      error: (error) => {
        onStatusUpdate({
          fileName,
          transcribedText: "" as String,
          error: error.message as String,
        });
      },
    });
}
