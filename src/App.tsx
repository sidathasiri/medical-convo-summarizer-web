import { useAuth } from "react-oidc-context";
import { TranscriptionClient } from "./services/transcribe-client";
import { useCallback, useState, useRef } from "react";
import { StartStreamTranscriptionCommand } from "@aws-sdk/client-transcribe-streaming";
import { AudioCaptureService } from "./services/audio-capture-service";
import {
  COGNITO_CLIENT_ID,
  COGNITO_DOMAIN,
  COGNITO_LOGOUT_URI,
} from "./configs";

function App() {
  const auth = useAuth();
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

  const startTranscription = useCallback(async () => {
    if (isRecording) {
      stopRecording();
      return;
    }

    if (!auth.user?.id_token) {
      console.error("No access token available");
      return;
    }

    try {
      setIsRecording(true);
      const transcribeClient = await TranscriptionClient.create(
        auth.user.id_token
      );

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
        // Handle the transcript stream
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
  }, [auth.user?.id_token, isRecording, stopRecording]);

  const signOutRedirect = () => {
    window.location.href = `${COGNITO_DOMAIN}/logout?client_id=${COGNITO_CLIENT_ID}&logout_uri=${encodeURIComponent(
      COGNITO_LOGOUT_URI
    )}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre>Hello: {auth.user?.profile.email}</pre>
        <button onClick={startTranscription}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        {transcription && (
          <div>
            <h3>Transcription:</h3>
            <p>{transcription}</p>
          </div>
        )}
        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default App;
