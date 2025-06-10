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

export async function fetchTranscriptionSummary(transcription: string): Promise<string> {
  const query = `
    query GetTranscriptionSummary($transcription: String!) {
      getTranscriptionSummary(transcription: $transcription) {
        success
        error
        summary
      }
    }
  `;

  const response = await fetch(`${BACKEND_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      query,
      variables: { transcription },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors[0].message || "Failed to generate summary");
  }

  if (!data.getTranscriptionSummary.success) {
    throw new Error(
      data.getTranscriptionSummary.error || "Failed to generate summary"
    );
  }

  return data.getTranscriptionSummary.summary;
}
