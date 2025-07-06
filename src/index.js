import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from "aws-amplify";

// Amplify.configure({
//   Auth: {
//     region: "us-east-1",
//     userPoolId: "us-east-1_pLv8PId0V",
//     userPoolWebClientId: "74u97u6pqe7j9e2gk0mkgqfvik",
//     oauth: {
//       domain: "cloudchat-app-gxiprf.auth.us-east-1.amazoncognito.com",
//       scope: ["email", "openid", "profile"],
//       redirectSignIn: "http://localhost:3000/callback",
//       redirectSignOut: "http://localhost:3000/",
//       responseType: "code"
//     }
//   }
// });
Amplify.configure({
  aws_project_region: "us-east-1",
  aws_appsync_graphqlEndpoint: "https://sef76pcnpzfs3law4gpil6lwka.appsync-api.us-east-1.amazonaws.com/graphql",
  aws_appsync_region: "us-east-1",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_uQKfq9f9k",
    userPoolWebClientId: "5l3gat82qdpildjb8m3epf2n05",
    identityPoolId: "us-east-1:ada25c2a-e9ba-4cc5-bd9d-3190a80ddc22",
    oauth: {
      domain: "cloudchat-app-pyas3r.auth.us-east-1.amazoncognito.com",
      scope: ["email", "openid", "profile"],
      redirectSignIn: "https://dx6toxay2p45d.cloudfront.net/callback",
      redirectSignOut: "https://dx6toxay2p45d.cloudfront.net/",
      responseType: "code"
    }
  }
});


// Amplify.configure({
//   Auth: {
//     region: "us-east-1",
//     userPoolId: "us-east-1_uQKfq9f9k",
//     userPoolWebClientId: "5l3gat82qdpildjb8m3epf2n05",
//     identityPoolId: "us-east-1:ada25c2a-e9ba-4cc5-bd9d-3190a80ddc22",
//     oauth: {
//       domain: "cloudchat-app-pyas3r.auth.us-east-1.amazoncognito.com",
//       scope: ["email", "openid", "profile"],
//       redirectSignIn: "https://dx6toxay2p45d.cloudfront.net/callback",
//       redirectSignOut: "https://dx6toxay2p45d.cloudfront.net/",
//       responseType: "code"
//     }
//   }
// });
// https://cloudchat-app-pyas3r.auth.us-east-1.amazoncognito.com
// https://cloudchat-app-ir9g94.auth.us-east-1.amazoncognito.com
// https://cloudchat-app-5vtgsq.auth.us-east-1.amazoncognito.com
// https://cloudchat-app-4wx0y1.auth.us-east-1.amazoncognito.com


// Amplify.configure({
//   // AppSync API
//   aws_project_region: "us-east-1",
//   aws_appsync_graphqlEndpoint: "https://67tgi3kgmveq5kd6t2cncd2hcq.appsync-api.us-east-1.amazonaws.com/graphql",
//   aws_appsync_region: "us-east-1",
//   aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
//   // Auth config
//   Auth: {
//     region: "us-east-1",
//     userPoolId: "us-east-1_pLv8PId0V",
//     userPoolWebClientId: "74u97u6pqe7j9e2gk0mkgqfvik",
//     identityPoolId: "us-east-1:33b22980-231b-4778-924e-de42e2c040d6", // YOUR Identity Pool ID
//     oauth: {
//       domain: "cloudchat-app-gxiprf.auth.us-east-1.amazoncognito.com",
//       scope: ["email", "openid", "profile"],
//       redirectSignIn: "http://localhost:3000/",
//       redirectSignOut: "http://localhost:3000/",
//       responseType: "code"
//     }
//   }
// });



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
