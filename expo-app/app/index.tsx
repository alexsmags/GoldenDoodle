import React from "react";
import { View, StyleSheet } from "react-native";
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
