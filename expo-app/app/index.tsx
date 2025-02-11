import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header/Header";
import ButtonSection from "../components/ButtonSection/ButtonSection";
import SearchBar from "../components/SearchBar/SearchBar"; // 🔍 Import SearchBar
import QuickShortcuts from "../components/QuickShortcuts/QuickShortcuts";
import HottestSpots from "../components/HottestSpots/HottestSpots";
import ShuttleSchedule from "../components/ShuttleSchedule/ShuttleSchedule"; // 🚌 Import Shuttle Schedule
import BottomNavigation from "../components/BottomNavigation/BottomNavigation";

export default function Index() {
  return (
    <View style={styles.container}>
      {/* ⬇️ Wrap Header with a View to apply padding */}
      <View style={styles.headerContainer}>
        <Header />
      </View>

      <View style={styles.content}>
        <ButtonSection />
        <SearchBar /> {/* 🔍 Add Search Bar Below Buttons */}
        <QuickShortcuts />
        <HottestSpots />
        <ShuttleSchedule /> {/* 🚌 Add Shuttle Schedule Here */}
      </View>

      <BottomNavigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "space-between",
  },
  headerContainer: {
  },
  content: {
    marginTop: 220,
    alignItems: "center",
  },
});
