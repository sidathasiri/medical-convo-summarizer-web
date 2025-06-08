import { useAuth } from "react-oidc-context";
import {
  COGNITO_CLIENT_ID,
  COGNITO_DOMAIN,
  COGNITO_LOGOUT_URI,
} from "./configs";
import { HomePage } from "./pages/HomePage/HomePage";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Loader } from "./components/Loader/Loader";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    auth.removeUser().then(() => {
      window.location.href = `${COGNITO_DOMAIN}/logout?client_id=${COGNITO_CLIENT_ID}&logout_uri=${encodeURIComponent(
        COGNITO_LOGOUT_URI
      )}`;
    });
  };

  if (auth.isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom, #ffffff, #f7fafc)",
        }}
      >
        <Loader size="large" message="Loading MediScribe..." />
      </div>
    );
  }

  if (auth.error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#E53E3E",
          background: "linear-gradient(to bottom, #ffffff, #f7fafc)",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          An error occurred while loading MediScribe
        </div>
        <div style={{ color: "#718096", fontSize: "0.875rem" }}>
          {auth.error.message}
        </div>
      </div>
    );
  }

  if (auth.isAuthenticated && auth.user) {
    return <HomePage user={auth.user} onSignOut={signOutRedirect} />;
  }

  return <LandingPage onSignIn={() => auth.signinRedirect()} />;
}

export default App;
