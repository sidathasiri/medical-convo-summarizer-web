interface UnauthenticatedViewProps {
  onSignIn: () => void;
}

export const UnauthenticatedView = ({ onSignIn }: UnauthenticatedViewProps) => {
  return (
    <div>
      <button onClick={onSignIn}>Sign in</button>
    </div>
  );
};
