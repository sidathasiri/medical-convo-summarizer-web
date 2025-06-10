// filepath: /src/services/transcription-subscription-service.ts
import { generateClient, GraphQLSubscription } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
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

export async function fetchTranscriptionSummary(transcription: string): Promise<string> {
  try {
    // Verify authentication before making the request
    console.log('fetching summary');
    
    await getCurrentUser();
    
    const client = generateClient();
    const result = await client.graphql({
      query: getTranscriptionSummary,
      variables: { transcription },
      authMode: "userPool",
    });

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
  } catch (err: any) {
    if (err?.message?.includes("No current user")) {
      throw new Error("User is not authenticated. Please sign in again.");
    }
    throw err;
  }
}

export function subscribeToTranscription(
  fileName: string,
  onStatusUpdate: (status: TranscriptionJobStatus) => void
) {
  try {
    const client = generateClient();
    return client
      .graphql<GraphQLSubscription<TranscriptionSubscriptionData>>({
        query: onTranscriptionComplete,
        variables: { fileName },
        authMode: "userPool",
      })
      .subscribe({
        next: (result) => {
          if (result.data?.onTranscriptionComplete) {
            const transcriptionData = result.data.onTranscriptionComplete;
            onStatusUpdate(transcriptionData);
          }
        },
        error: (err) => {
          const errorMessage = err instanceof Error && err.message?.includes("No current user")
            ? "User is not authenticated. Please sign in again."
            : err instanceof Error ? err.message : "Unknown error";
          
          onStatusUpdate({
            fileName,
            transcribedText: "" as String,
            error: errorMessage as String,
          });
        },
      });
  } catch (err: any) {
    const errorMessage = err?.message || "Failed to setup subscription";
    onStatusUpdate({
      fileName,
      transcribedText: "" as String,
      error: errorMessage as String,
    });
    throw err;
  }
}
