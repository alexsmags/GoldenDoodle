import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import Svg, { Circle } from "react-native-svg"; 

export default function LoginScreen() {
  const router = useRouter(); 

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
  });

  const handleGoogleSignIn = () => {
    promptAsync();
  };

  const handleGuestAccess = () => {
    console.log("Guest Access Clicked");
    router.push("/screens/Home/HomePageScreen"); 
  };

  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFillObject}>
        <Circle cx="0" cy="30" r="100" fill="#731b2b" opacity="0.6" />
        <Circle cx="400" cy="275" r="100" fill="#731b2b" opacity="0.5" />
        <Circle cx="80" cy="500" r="100" fill="#731b2b" opacity="0.4" />
        <Circle cx="330" cy="700" r="100" fill="#731b2b" opacity="0.6" />
      </Svg>

      <Image source={require("../../expo-app/assets/images/concordia-logo.png")} style={styles.logo} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to Concordia Navigator</Text>
        <Text style={styles.subtitle}>Sign in or continue as a guest</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn} activeOpacity={0.8}>
          <Image 
            source={require("../../expo-app/assets/images/google-logo.png")} 
            style={styles.googleImage} 
          />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.guestButton} onPress={handleGuestAccess} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 50,
  },
  backgroundSvg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1, 
  },
  logo: {
    width: 400,
    height: 120,
    marginTop: 100,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#731b2b",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 15,
    width: "85%",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  googleImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  guestButton: {
    backgroundColor: "#912338",
    paddingVertical: 16,
    borderRadius: 15,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

