import { Amplify } from "aws-amplify";
import { BACKEND_API_URL, API_KEY, REGION } from "./configs";

Amplify.configure({
  API: {
    GraphQL: {
      endpoint: BACKEND_API_URL,
      region: REGION,
      defaultAuthMode: "apiKey",
      apiKey: API_KEY,
    },
  },
});
