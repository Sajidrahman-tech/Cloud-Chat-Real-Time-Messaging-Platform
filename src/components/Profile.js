import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((currentUser) => {
        setUser(currentUser);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const handleLogin = () => {
    Auth.federatedSignIn();
  };

  const handleLogout = () => {
    Auth.signOut({ global: true });
  };

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <div>
        <p>You are not logged in.</p>
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  const { email, email_verified, sub } = user.attributes;

  return (
    <div>
      <h2>Welcome, {email}</h2>
      <p>Email Verified: {email_verified ? "Yes" : "No"}</p>
      <p>User ID: {sub}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
