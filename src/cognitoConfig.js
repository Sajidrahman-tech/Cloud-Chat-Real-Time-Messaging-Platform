// export const oidcConfig = {
//   authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_QMGiTdR67", // ✅ use exact domain from Cognito
//   client_id: "7l7d4mcoqgg83j92mcljgtao0u",
//   redirect_uri: "http://localhost:3000/callback",
//   post_logout_redirect_uri: "http://localhost:3000/logout",
//   response_type: "code",
//   scope: "openid profile email",
//   automaticSilentRenew: true,
//   loadUserInfo: true,
// };

// export const oidcConfig = {
//   authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_QMGiTdR67",
//   client_id: "7l7d4mcoqgg83j92mcljgtao0u",
//   redirect_uri: "http://localhost:3000/callback",
//  // post_logout_redirect_uri: "http://localhost:3000/",
//   response_type: "code",
//   scope: "email openid phone",
//   automaticSilentRenew: false, // <- important!
//    //loadUserInfo: true,
   
// };
// export const oidcConfig = {
//   authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_mcI9nZYMH",
//   client_id: "3tn511h27344iivn5mqtbni0jr",
//   redirect_uri: "http://localhost:3000/callback",
//   response_type: "code",
//   scope: "email openid phone profile",
//   automaticSilentRenew: false,
// };

// export const oidcConfig = {
//   authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_RbcayTtyP",
//   client_id: "3pnuf399jhkpd2203q3j73idba",
//   redirect_uri: "http://localhost:3000/callback",
//   response_type: "code",
//   scope: "email openid phone profile",
// };
// export const oidcConfig = {
//   authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_BfmHEw3Dl",
//   client_id: "6bejvg4hida86k4rnjqeg8qhh8",
//   redirect_uri: "http://localhost:3000/callback",
//   response_type: "code",
//   scope: "email openid phone profile",
// };

// export const oidcConfig = {
//   authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_pLv8PId0V",
//   client_id: "74u97u6pqe7j9e2gk0mkgqfvik",
//   redirect_uri: "http://localhost:3000/callback",
//   response_type: "code",
//   scope: "email openid phone profile",
// };
export const oidcConfig = {
  authority: "https://cloudchat-app-gxiprf.auth.us-east-1.amazoncognito.com",
  client_id: "74u97u6pqe7j9e2gk0mkgqfvik",
  redirect_uri: "http://localhost:3000/callBack",
  response_type: "code",
  scope: "email openid phone profile",
};