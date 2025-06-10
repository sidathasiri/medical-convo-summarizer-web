// filepath: /src/services/transcription-subscription-service.ts
import { generateClient, GraphQLSubscription } from "aws-amplify/api";
import { getTranscriptionSummary } from "../graphql/queries";
import { onTranscriptionComplete } from "../graphql/subscriptions";

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
  const client = generateClient();

  return client
    .graphql<GraphQLSubscription<TranscriptionSubscriptionData>>({
      query: onTranscriptionComplete,
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
  const client = generateClient();

  const result = await client.graphql({
    query: getTranscriptionSummary,
    variables: { transcription },
  });

  // For Amplify API v6, result is { data, errors }.
  // For v5, result is just the data. We'll handle both.
  const data = (result as any).data ?? result;
  const errors = (result as any).errors;

  if (errors && errors.length > 0) {
    throw new Error(errors[0].message || "Failed to generate summary");
  }

  if (!data.getTranscriptionSummary.success) {
    throw new Error(
      data.getTranscriptionSummary.error || "Failed to generate summary"
    );
  }

  return data.getTranscriptionSummary.summary;
}
