// App.js

import { useAuth } from "react-oidc-context";
import { createTranscribeClient } from "./services/transcribe-client";
import { useCallback, useState } from "react";
import {
  StartStreamTranscriptionCommand,
  AudioStream,
} from "@aws-sdk/client-transcribe-streaming";
import {
  COGNITO_CLIENT_ID,
  COGNITO_DOMAIN,
  COGNITO_LOGOUT_URI,
} from "./configs";

function App() {
  const auth = useAuth();
  const [transcription, setTranscription] = useState("");

  const startTranscription = useCallback(async () => {
    if (!auth.user?.id_token) {
      console.error("No access token available");
      return;
    }

    try {
      const transcribeClient = await createTranscribeClient(auth.user.id_token);

      // Create an audio stream (this is just a placeholder - you'll need to implement actual audio streaming)
      const audioStream = async function* () {
        // This is where you would put your actual audio streaming logic
        yield { AudioEvent: { AudioChunk: new Uint8Array(0) } };
      };

      const command = new StartStreamTranscriptionCommand({
        LanguageCode: "en-US",
        MediaEncoding: "pcm",
        MediaSampleRateHertz: 16000,
        AudioStream: audioStream(),
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
    }
  }, [auth.user?.id_token]);

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
        <button onClick={startTranscription}>Start Transcription</button>
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
