import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import styles from "./Header.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface HeaderProps {
  userName: string;
  isGuest: boolean;
}

export default function Header({ userName, isGuest }: HeaderProps): JSX.Element {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
      
      await AsyncStorage.removeItem("userName");
  
      router.push("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    
    <ImageBackground
      source={require("../../../assets/images/header-background.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay} />

      {/* Header Row for Icons */}
      <View style={styles.headerTopRow}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={isGuest ? () => router.push("/") : handleLogout}
        >
          {isGuest ? (
            <Feather name="arrow-left" size={22} color="white" />
          ) : (
            <Feather name="log-out" size={22} color="white" />
          )}
        </TouchableOpacity>

        {/* Hamburger Menu */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => router.push("/screens/Home/HomeMenuScreen")}
        >
          <Feather name="menu" size={26} color="white" />
        </TouchableOpacity>
      </View>

      {/* Text & Buttons */}
      <View style={styles.headerContent}>
        <Text style={styles.welcomeText}>
          {userName ? `Welcome Back, ${userName}` : "Welcome!"}
        </Text>
        <Text style={styles.timerText}>
          You have 13 minutes until your next class
        </Text>

        {/* Optimize Route Button */}
        <TouchableOpacity style={styles.routeButton}>
          <Text style={styles.routeButtonText}>Optimize Route</Text>
        </TouchableOpacity>

        <Text style={styles.studySpotText}>
          Find your next study spot or coffee stop.
        </Text>
      </View>
    </ImageBackground>
  );
}
