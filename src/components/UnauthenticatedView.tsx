interface UnauthenticatedViewProps {
  onSignIn: () => void;
  onSignOut: () => void;
}

export const UnauthenticatedView = ({
  onSignIn,
  onSignOut,
}: UnauthenticatedViewProps) => {
  return (
    <div>
      <button onClick={onSignIn}>Sign in</button>
      <button onClick={onSignOut}>Sign out</button>
    </div>
  );
};
