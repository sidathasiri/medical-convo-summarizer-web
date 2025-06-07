import { useAuth } from "react-oidc-context";
import {
  COGNITO_CLIENT_ID,
  COGNITO_DOMAIN,
  COGNITO_LOGOUT_URI,
} from "./configs";
import { AuthenticatedView } from "./components/AuthenticatedView";
import LandingPage from "./pages/LandingPage";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    auth.removeUser();
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

  if (auth.isAuthenticated && auth.user) {
    return <AuthenticatedView user={auth.user} onSignOut={signOutRedirect} />;
  }

  return <LandingPage onSignIn={() => auth.signinRedirect()} />;
}

export default App;
