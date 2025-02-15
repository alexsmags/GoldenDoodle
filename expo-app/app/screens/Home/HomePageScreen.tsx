import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ButtonSection from "../../components/ButtonSection/ButtonSection";
import SearchBar from "../../components/SearchBar/SearchBar";
import QuickShortcuts from "../../components/QuickShortcuts/QuickShortcuts";
import HottestSpots from "../../components/HottestSpots/HottestSpots";
import ShuttleSchedule from "../../components/ShuttleSchedule/ShuttleSchedule";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomePageScreen() {
  const [userName, setUserName] = useState("Guest");
  const [isGuest, setIsGuest] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedName = await AsyncStorage.getItem("userName");

      if (storedName) {
        setUserName(storedName); 
        setIsGuest(storedName.toLowerCase() === "guest"); 
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Header userName={userName || "Guest"} isGuest={isGuest} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <ButtonSection />
        <SearchBar />
        <QuickShortcuts />
        <HottestSpots />
        <ShuttleSchedule />
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "space-between",
  },
  headerContainer: {},
  content: {
    marginTop: 250,
    alignItems: "center",
  },
});
