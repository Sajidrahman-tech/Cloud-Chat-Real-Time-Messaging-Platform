import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

const Header = () => {
  const [user, setUser] = useState(null);

  // Fetch user info when mounted
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const signOutRedirect = () => {
    const clientId = "5l3gat82qdpildjb8m3epf2n05";
    const logoutUri = "https://d457lyvhjoeyr.cloudfront.net/"; // or your production CloudFront URL
    const cognitoDomain = "https://cloudchat-app-pyas3r.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  const handleLogin = () => {
    Auth.federatedSignIn();
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    signOutRedirect();
  };

  const getUserInitials = (id) => {
    if (!id) return "U";
    const parts = id.split(/[@.]/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return id[0].toUpperCase();
  };

  // Use username or email as display
  const displayName = user?.username || user?.attributes?.email || "Anonymous";

  return (
    <div className="header-bar">
      <div className="app-title">ChitChat</div>
      <div className="user-info">
        {user && (
          <div className="user-avatar">
            {getUserInitials(displayName)}
          </div>
        )}
        <div className="user-email">{displayName}</div>
        <div className="d-flex align-items-center gap-2">
          {user ? (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="logout-button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
