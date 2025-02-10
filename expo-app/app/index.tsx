import React from "react";
import { View, StyleSheet } from "react-native";
// import { NavTab } from "../components/NavTab"; // Import the NavTab component
import CampusMap from "../components/CampusMap"; // Import the CampusMap component

export default function Index() {
  return (
    <View style={styles.container}>
      <CampusMap /> {/* Render the CampusMap component */}
      {/* <NavTab /> Render the NavTab component */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
