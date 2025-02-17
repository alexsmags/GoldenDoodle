import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  setUser: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null>>;
  loading: boolean;
  handleGoogleSignIn: () => Promise<void>;
  signOut: () => Promise<void>;
  handleSignInAsGuest: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "259837654437-eo18pu30v9grv1i3dog8ba5i64ipj1q7.apps.googleusercontent.com",
    });
  }, []);

  useEffect(() => {
    // Load user data from AsyncStorage on app start
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  useEffect(() => {
    // Listen for Firebase authentication state changes
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await AsyncStorage.setItem("user", JSON.stringify(firebaseUser));
      } else {
        await AsyncStorage.removeItem("user");
      }
    });

    return () => unsubscribe(); // Unsubscribe when component unmounts
  }, []);

  // Google Sign-In function
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const signInResponse = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      const idToken = tokens.idToken ?? null;

      if (!idToken) {
        console.error("Google Sign-In failed: No ID Token received.");
        return;
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential
      );

      await AsyncStorage.setItem(
        "user",
        JSON.stringify(userCredential.user) || ""
      );
      router.replace("/screens/Home/HomePageScreen");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleSignInAsGuest = async () => {
    router.replace("/screens/Home/HomePageScreen");
  };

  // Sign out function
  const signOut = async () => {
    var i = 0;
    try {
      await GoogleSignin.revokeAccess();
      i++;
      await GoogleSignin.signOut();
      i++;
      await auth().signOut();
      i++;
      await AsyncStorage.removeItem("user");
      i++;
      setUser(null);
      router.replace("/");
    } catch (error) {
      console.error("Logout Error:", error, "wwe", i);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        handleGoogleSignIn,
        signOut,
        handleSignInAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
