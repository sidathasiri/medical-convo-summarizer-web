import { generateClient } from "aws-amplify/api";
import { getBabyDevelopmentInfo } from "../graphql/babyDevelopment";

interface BabyDevelopmentResponse {
  info: string;
  success: boolean;
  error?: string;
}

export async function fetchBabyDevelopmentInfo(ageInMonths: number): Promise<string> {
  try {
    const client = generateClient();
    const result = await client.graphql<BabyDevelopmentResponse>({
      query: getBabyDevelopmentInfo,
      variables: { ageInMonths },
      authMode: "userPool",
    });

    const data = (result as any).data ?? result;
    const errors = (result as any).errors;

    if (errors && errors.length > 0) {
      throw new Error(errors[0].message || "Failed to get baby development info");
    }

    if (!data.getBabyDevelopmentInfo.success) {
      throw new Error(
        data.getBabyDevelopmentInfo.error || "Failed to get baby development info"
      );
    }
    return data.getBabyDevelopmentInfo.info;
  } catch (err: any) {
    console.error("Failed to get baby development info:", err);
    throw new Error(err.message || 'Failed to get baby development info');
  }
}
