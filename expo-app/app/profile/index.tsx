import React from "react";
import { View, Text, Button } from "react-native";
import { auth } from "../services/firebase/firebase";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  const user = auth.currentUser;

  const handleLogout = () => {
    auth.signOut();
    router.push('/');
  };
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user ? (
        <>
          <Text>Welcome, {user.displayName}!</Text>
          <Text>Email: {user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Text>Not logged in</Text>
      )}
    </View>
  );
}
