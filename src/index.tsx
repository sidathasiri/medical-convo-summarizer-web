import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { WebStorageStateStore } from "oidc-client-ts";
import {
  COGNITO_CLIENT_ID,
  COGNITO_POOL_ID,
  COGNITO_REDIRECT_URI,
} from "./configs";

const cognitoAuthConfig = {
  authority: `https://cognito-idp.us-east-1.amazonaws.com/${COGNITO_POOL_ID}`,
  client_id: COGNITO_CLIENT_ID,
  redirect_uri: COGNITO_REDIRECT_URI,
  response_type: "code",
  redirectMethod: "replace",
  scopes: ["openid", "profile", "email"],
  onSigninCallback: (_user: any) => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
