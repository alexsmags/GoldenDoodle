import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons"; // Using FontAwesome icons

export default function BottomNavigation() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.label}
          testID={`tab-${tab.label}`}
          style={styles.tab}
          onPress={() => setActiveTab(tab.label)}
        >
          <FontAwesome5 name={tab.icon} size={22} color={activeTab === tab.label ? "#912338" : "#999"} />
          <Text style={[styles.label, activeTab === tab.label && styles.activeLabel]}>
            {tab.label} {/* ✅ Wraps text inside <Text> */}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const TABS = [
  { label: "Home", icon: "home" },
  { label: "Services", icon: "concierge-bell" },
  { label: "Report", icon: "exclamation-circle" },
  { label: "Settings", icon: "cog" },
];

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 25,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  tab: {
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    color: "#999",
    marginTop: 3,
  },
  activeLabel: {
    color: "#912338",
    fontWeight: "bold",
  },
});
