import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "../services/firebase/firebase";
import { signInWithCredential, GoogleAuthProvider, User } from "firebase/auth";
import { GOOGLE_WEB_CLIENT_ID } from "./googlePlatformConfig";

WebBrowser.maybeCompleteAuthSession();

export default function useGoogleSignIn() {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: GOOGLE_WEB_CLIENT_ID ,
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      const handleSignIn = async () => {
        setLoading(true);
        try {
          const userCredential = await signInWithCredential(auth, credential);
          setUser(userCredential.user);
        } catch (error) {
          console.error("Google Sign-In Error:", error);
        } finally {
          setLoading(false);
        }
      };

      handleSignIn(); // Call the async function
    }
  }, [response]);

  const signIn = () => {
    setLoading(true);
    promptAsync();
  };

  return { user, loading, signIn };
}
