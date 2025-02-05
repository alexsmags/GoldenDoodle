// Entry Point of the app

import React, { useEffect } from "react";
import { View, Button, ActivityIndicator } from "react-native";
import useGoogleSignIn from "./hooks/useGoogleSignIn";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { user, loading, signIn } = useGoogleSignIn();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Sign In with Google" onPress={signIn} />
      )}
    </View>
  );
}
