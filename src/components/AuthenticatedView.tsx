import { User } from "oidc-client-ts";
import { useTranscription } from "../hooks/useTranscription";

interface AuthenticatedViewProps {
  user: User;
  onSignOut: () => void;
}

export const AuthenticatedView = ({
  user,
  onSignOut,
}: AuthenticatedViewProps) => {
  const { transcription, isRecording, startTranscription } = useTranscription(
    user.id_token
  );

  return (
    <div>
      <pre>Hello: {user.profile.email}</pre>
      <button onClick={startTranscription}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {transcription && (
        <div>
          <h3>Transcription:</h3>
          <p>{transcription}</p>
        </div>
      )}
      <button onClick={onSignOut}>Sign out</button>
    </div>
  );
};
