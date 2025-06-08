import { useState, useCallback } from "react";
import { FileUploadService } from "../services/file-upload-service";

export const useFileUpload = (idToken: string | undefined) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      if (!idToken) {
        setUploadError("Authentication required");
        return null;
      }

      try {
        setIsUploading(true);
        setUploadError(null);
        const fileKey = await FileUploadService.uploadFile(file, idToken);
        return fileKey;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Upload failed";
        setUploadError(message);
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [idToken]
  );

  return {
    uploadFile,
    isUploading,
    uploadError,
  };
};
