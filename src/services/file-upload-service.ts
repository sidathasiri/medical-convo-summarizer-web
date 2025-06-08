import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { REGION } from "../configs";
import { getAwsCredentials } from "./aws-credentials";

export class FileUploadService {
  private static BUCKET_NAME = "medical-convo-bucket";

  static async uploadFile(file: File, idToken: string): Promise<string> {
    console.log("Getting AWS credentials...");
    const credentials = await getAwsCredentials(idToken);

    console.log("Initializing S3 client...");
    const client = new S3Client({
      region: REGION,
      credentials: credentials,
    });

    // Create a unique filename with no spaces
    const timestamp = Date.now();
    const cleanFileName = file.name
      .replace(/[^a-zA-Z0-9.]/g, "_")
      .toLowerCase();
    const fileKey = `uploads/${timestamp}-${cleanFileName}`;

    try {
      console.log("Starting file upload to S3...", {
        bucket: this.BUCKET_NAME,
        key: fileKey,
        contentType: file.type,
      });

      // Convert File to Uint8Array
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      await client.send(
        new PutObjectCommand({
          Bucket: this.BUCKET_NAME,
          Key: fileKey,
          Body: uint8Array,
          ContentType: file.type,
        })
      );

      console.log("File uploaded successfully to S3:", fileKey);
      return fileKey;
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw error;
    }
  }
}
