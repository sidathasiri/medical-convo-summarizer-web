import { useEffect, useState } from "react";
import { signOut, getCurrentUser, signInWithRedirect, fetchUserAttributes, fetchAuthSession } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { HomePage } from "./pages/HomePage/HomePage";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Loader } from "./components/Loader/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();

    // Listen for auth events
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
          checkUser();
          break;
        case "signedOut":
          setUser(null);
          break;
        case "tokenRefresh":
          checkUser();
          break;
      }
    });

    return () => unsubscribe();
  }, []);

  async function checkUser() {
    try {
      try {
        const userData = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        const session = await fetchAuthSession();
        setUser({ ...userData, ...attributes, ...session });
      } catch (attributeError) {
        console.warn('Could not fetch user attributes:', attributeError);
        setUser(null);
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  if (isLoading) {
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

  if (error) {
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
          {error.message}
        </div>
      </div>
    );
  }

  if (user) {
    return <HomePage user={user} onSignOut={handleSignOut} />;
  }

  return <LandingPage onSignIn={() => signInWithRedirect()} />;
}

export default App;
