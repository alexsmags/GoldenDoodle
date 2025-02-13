import { Stack } from "expo-router";
import { AuthProvider } from "./contexts/AuthContex";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
