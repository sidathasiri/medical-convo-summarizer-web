import { TranscribeStreamingClient } from "@aws-sdk/client-transcribe-streaming";
import { getAwsCredentials } from "./aws-credentials";
import { REGION } from "../configs";

export const createTranscribeClient = async (token: string) => {
  const credentials = await getAwsCredentials(token);

  return new TranscribeStreamingClient({
    region: REGION,
    credentials,
  });
};
