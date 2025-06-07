import { useCallback, useState, useRef } from "react";
import { StartStreamTranscriptionCommand } from "@aws-sdk/client-transcribe-streaming";
import { AudioCaptureService } from "../services/audio-capture-service";
import { TranscriptionClient } from "../services/transcribe-client";

export const useTranscription = (idToken: string | undefined) => {
  const [transcription, setTranscription] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const audioCaptureRef = useRef<AudioCaptureService | undefined>(undefined);
  const transcribeStreamRef = useRef<AbortController | undefined>(undefined);

  const stopRecording = useCallback(() => {
    if (transcribeStreamRef.current) {
      transcribeStreamRef.current.abort();
      transcribeStreamRef.current = undefined;
    }
    if (audioCaptureRef.current) {
      audioCaptureRef.current.stop();
      audioCaptureRef.current = undefined;
    }
    setIsRecording(false);
  }, []);

  const clearTranscription = useCallback(() => {
    stopRecording(); // Make sure recording is stopped when clearing
    setTranscription("");
  }, [stopRecording]);

  const startTranscription = useCallback(async () => {
    if (isRecording) {
      stopRecording();
      return;
    }

    if (!idToken) {
      console.error("No access token available");
      return;
    }

    try {
      setIsRecording(true);
      const transcribeClient = await TranscriptionClient.create(idToken);

      audioCaptureRef.current = new AudioCaptureService();
      transcribeStreamRef.current = new AbortController();

      const command = new StartStreamTranscriptionCommand({
        LanguageCode: "en-US",
        MediaEncoding: "pcm",
        MediaSampleRateHertz: 16000,
        AudioStream: audioCaptureRef.current.createAudioStream(),
      });

      const response = await transcribeClient.send(command);

      if (response.TranscriptResultStream) {
        for await (const event of response.TranscriptResultStream) {
          if (event.TranscriptEvent?.Transcript?.Results?.[0]) {
            const result = event.TranscriptEvent.Transcript.Results[0];
            if (result.IsPartial === false) {
              const transcriptText = result.Alternatives?.[0]?.Transcript;
              if (transcriptText) {
                setTranscription((prev) => prev + " " + transcriptText);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error in transcription:", error);
    } finally {
      stopRecording();
    }
  }, [idToken, isRecording, stopRecording]);

  return {
    transcription,
    isRecording,
    startTranscription,
    clearTranscription,
  };
};
