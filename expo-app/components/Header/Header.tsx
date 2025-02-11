import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import styles from "./Header.styles";

export default function Header(): JSX.Element {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/header-background.jpg")}
      style={styles.background}
    >
      {/* Dark Overlay for Text Readability */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Hamburger Menu */}
        <TouchableOpacity style={styles.menuButton} onPress={() => router.push("/screens/Home/HomeMenuScreen")}>
          <Feather name="menu" size={28} color="white" />
        </TouchableOpacity>

        {/* Welcome Message */}
        <Text style={styles.welcomeText}>Welcome Back, Steven</Text>

        {/* Timer */}
        <Text style={styles.timerText}>You have 13 minutes until your next class</Text>

        {/* Optimize Route Button */}
        <TouchableOpacity style={styles.routeButton}>
          <Text style={styles.routeButtonText}>Optimize Route</Text>
        </TouchableOpacity>
        
        {/* Move "Find your next study spot or coffee stop." Here */}
          <Text style={styles.studySpotText}>
            Find your next study spot or coffee stop.
          </Text>
      </View>
    </ImageBackground>
  );
}
