import { Amplify } from "aws-amplify";
import {
  BACKEND_API_URL,
  COGNITO_POOL_ID,
  COGNITO_CLIENT_ID,
  COGNITO_IDENTITY_POOL_ID,
  COGNITO_DOMAIN,
  COGNITO_REDIRECT_URI,
  COGNITO_LOGOUT_URI,
} from "./configs";

Amplify.configure({
  API: {
    GraphQL: {
      endpoint: BACKEND_API_URL,
      defaultAuthMode: "userPool",
    },
  },
  Auth: {
    Cognito: {
      userPoolId: COGNITO_POOL_ID,
      userPoolClientId: COGNITO_CLIENT_ID,
      identityPoolId: COGNITO_IDENTITY_POOL_ID,
      loginWith: {
        oauth: {
          domain: COGNITO_DOMAIN,
          scopes: [
            'email',
            'openid',
            'profile',
            'aws.cognito.signin.user.admin'
          ],
          responseType: 'code',
          redirectSignIn: [COGNITO_REDIRECT_URI],
          redirectSignOut: [COGNITO_LOGOUT_URI]
        }
      }
    }
  }
});
