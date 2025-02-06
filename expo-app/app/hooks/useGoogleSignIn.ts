import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { auth } from "../services/firebase/firebase";
import { signInWithCredential, GoogleAuthProvider, User } from "firebase/auth";
import {
  // GOOGLE_WEB_CLIENT_ID,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "./googlePlatformConfig";

WebBrowser.maybeCompleteAuthSession();

export default function useGoogleSignIn() {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const redirectUri = makeRedirectUri({
    scheme: "myapp", // Must match "scheme" in app.json
    path: "auth",
  });

  const discovery = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
    revocationEndpoint: "https://oauth2.googleapis.com/revoke",
  };


  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: GOOGLE_CLIENT_ID,
      // clientSecret: GOOGLE_CLIENT_SECRET,
      redirectUri,
      scopes: [
        "openid",
        "profile",
        "email",
        "https://www.googleapis.com/auth/calendar.readonly",
        "https://www.googleapis.com/auth/calendar.events.readonly",
      ],
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success" && response.params?.code) {
      const exchangeCodeForToken = async () => {
        setLoading(true);
        try {
          const tokenResponse = await fetch(discovery.tokenEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              code: response.params.code,
              client_id: GOOGLE_CLIENT_ID,
              client_secret: GOOGLE_CLIENT_SECRET,
              redirect_uri: redirectUri,
              grant_type: "authorization_code",
            }).toString(),
          });

          const tokenData = await tokenResponse.json();
          setAccessToken(tokenData.access_token); // Store the access token for API requests

          if (tokenData.id_token) {
            // Authenticate with Firebase if needed
            const credential = GoogleAuthProvider.credential(
              tokenData.id_token
            );
            const userCredential = await signInWithCredential(auth, credential);
            setUser(userCredential.user);
          }
        } catch (error) {
          console.error("Google OAuth Error:", error);
        } finally {
          setLoading(false);
        }
      };

      exchangeCodeForToken();
    }
  }, [response]);

  const signIn = () => {
    setLoading(true);
    promptAsync();
  };

  return { user, accessToken, loading, signIn };
}
