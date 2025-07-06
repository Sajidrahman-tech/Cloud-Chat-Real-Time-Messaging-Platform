import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

export default function CallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // On mount, try to finish the login silently and redirect
    Auth.currentAuthenticatedUser()
      .then(() => {
        console.log("User authenticated successfully.", Auth);
        Auth.currentCredentials().then(console.log)

        //Auth.currentCredentials().then(console.log)

        navigate("/home");
      })
      .catch((err) => {
        console.error("Error completing login:", err);
        navigate("/");
      });
  }, [navigate]);

  return <p>Finishing login...</p>;
}
