import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { auth } from "../services/firebase/firebase";
import { signInWithCredential, GoogleAuthProvider, User } from "firebase/auth";
import {
  // GOOGLE_WEB_CLIENT_ID,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "./googlePlatformConfig";

interface UseGoogleSignIn {
  user: User | null;
  loading: boolean;
  signIn: () => void;
  accessToken: string | null;
}

WebBrowser.maybeCompleteAuthSession();

export default function useGoogleSignIn(): UseGoogleSignIn {
  const [request, response, promptAsync] = useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    scopes: ["profile", "email"], // Need to update to calendar most likely
    // redirectUri: "https://auth.expo.io/@gderhy/expo-app",
  });

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;

      if (authentication) {
        const { accessToken: token } = authentication;

        // Store the accessToken
        setAccessToken(token);

        // Sign in with Firebase -- Use ID token for firebase authentication
        const { idToken } = authentication;
        const credential = GoogleAuthProvider.credential(idToken);

        const handleSignIn = async () => {
          setLoading(true);
          try {
            const userCredential = await signInWithCredential(auth, credential);
            setUser(userCredential.user);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };

        handleSignIn(); // Calls the async function
      }
    }
  }, [response]);

  const signIn = () => {
    setLoading(true);
    promptAsync();
  };

  return { user, loading, signIn, accessToken };
}
