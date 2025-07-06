import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure({
  // AppSync API
  aws_project_region: "us-east-1",
  aws_appsync_graphqlEndpoint: "https://67tgi3kgmveq5kd6t2cncd2hcq.appsync-api.us-east-1.amazonaws.com/graphql",
  aws_appsync_region: "us-east-1",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  // Auth config
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_pLv8PId0V",
    userPoolWebClientId: "74u97u6pqe7j9e2gk0mkgqfvik",
    identityPoolId: "us-east-1:33b22980-231b-4778-924e-de42e2c040d6", // YOUR Identity Pool ID
    oauth: {
      domain: "cloudchat-app-gxiprf.auth.us-east-1.amazoncognito.com",
      scope: ["email", "openid", "profile"],
      redirectSignIn: "http://localhost:3000/",
      redirectSignOut: "http://localhost:3000/",
      responseType: "code"
    }
  }
});
