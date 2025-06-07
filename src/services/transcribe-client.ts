import { TranscribeStreamingClient } from "@aws-sdk/client-transcribe-streaming";
import { getAwsCredentials } from "./aws-credentials";
import { REGION } from "../configs";

export class TranscriptionClient {
  static async create(idToken: string): Promise<TranscribeStreamingClient> {
    const credentials = await getAwsCredentials(idToken);
    return new TranscribeStreamingClient({
      region: REGION,
      credentials,
    });
  }
}
