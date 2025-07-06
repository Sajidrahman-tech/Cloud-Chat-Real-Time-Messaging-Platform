import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useAuth } from 'react-oidc-context';
import CallbackPage from './pages/CallbackPage';
import Profile from './components/Profile'; // ✅ capital "P" must match
import Header from './components/Header'; // ✅ capital "H" must match
import MainPage from './pages/HomePage';
// import { callGraphQL } from "./api";//
// import { getMessagesQuery } from "./graphql";

//console.log(response);
function HomePage() {
  // const auth = useAuth(); // ✅ safe use
 // console.log("HomePage rendered with auth:", auth);


// const token = localStorage.getItem("id_token"); // or wherever you store it

// const response = await callGraphQL(getMessagesQuery, { room_id: "general" }, token);

  // if (!auth.isAuthenticated) {
  //   return <button onClick={() => auth.signinRedirect()}>Login</button>;
  // }

  return (
    <div>
      {/* <h2>Welcomes, {auth.user?.profile?.email}</h2> */}
      {/* <a href="/profile">Go to Profile</a> */}
      <br />
      {/* <button onClick={() => auth.signoutRedirect()}>Logout</button> */}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<MainPage />} />
         {/* <Route path="/logout" element={<HomePage />} /> */}
      </Routes>
    </Router>
  );
}
