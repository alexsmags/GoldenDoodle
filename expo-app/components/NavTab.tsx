import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Building } from "../utils/types";

type NavTabProps = {
  campus: "SGW" | "Loyola";
  selectedBuilding: Building | null;
  onNavigatePress?: () => void;
  onTravelPress?: () => void;
  onEatPress?: () => void;
  onNextClassPress?: () => void;
  onMoreOptionsPress?: () => void;
  onInfoPress?: () => void;
  onBackPress?: () => void;
  onDirectionsPress?: () => void;
};

const NavTab = ({
  campus,
  selectedBuilding,
  onNavigatePress,
  onTravelPress,
  onEatPress,
  onNextClassPress,
  onMoreOptionsPress,
  onInfoPress, 
  onBackPress,
  onDirectionsPress,
}: NavTabProps) => {
  // console.log("NavTab is rendering!"); // Debugging line
  return (
    <SafeAreaView style={styles.navTab}>
      {!selectedBuilding ? ( // Show different tabs when building will be pressed to show building info
        <>
          {/* Navigate (Campus Icon) */}
          <TouchableOpacity style={styles.tabItem} onPress={onNavigatePress}>
            <Ionicons name="compass" size={24} color="black" />
            <Text style={styles.tabText}>Navigate</Text>
          </TouchableOpacity>

          {/* I didnt like the way this look -- user should press the campus they want to travel too */}
          {/* Loyola/SGW Travel (Empty Navigation Arrow Icon) */}
          {/* <TouchableOpacity style={styles.tabItem} onPress={onTravelPress}>
            <MaterialIcons name="navigation" size={24} color="black" />
            <Text style={styles.tabText}>
              {campus === "SGW" ? "Loyola Travel" : "SGW Travel"}
            </Text>
          </TouchableOpacity> */}

          {/* Eat on Campus (Fork and Knife Icon) */}
          <TouchableOpacity style={styles.tabItem} onPress={onEatPress}>
            <FontAwesome name="cutlery" size={24} color="black" />
            <Text style={styles.tabText}>Eat on Campus</Text>
          </TouchableOpacity>

          {/* Next Class (Schedule Icon) */}
          <TouchableOpacity style={styles.tabItem} onPress={onNextClassPress}>
            <MaterialIcons name="schedule" size={24} color="black" />
            <Text style={styles.tabText}>Next Class</Text>
          </TouchableOpacity>

          {/* More Options (Three Dots Icon) */}
          <TouchableOpacity style={styles.tabItem} onPress={onMoreOptionsPress}>
            <Ionicons name="ellipsis-horizontal" size={24} color="black" />
            <Text style={styles.tabText}>More Options</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* Back Icon  */}
          <TouchableOpacity style={styles.tabItem} onPress={onBackPress}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={styles.tabText}>Back</Text>
          </TouchableOpacity>

          {/* Show different tabs when origin and destination are set */}
          <TouchableOpacity style={styles.tabItem} onPress={onInfoPress}>
            <Ionicons name="information-circle" size={24} color="black" />
            <Text style={styles.tabText}>Info about building</Text>
          </TouchableOpacity>

          {/* Directions -- this allows the user to press this to find directions from current position to the building */}
          <TouchableOpacity style={styles.tabItem} onPress={onDirectionsPress}>
            <Ionicons name="navigate" size={24} color="black" />
            <Text style={styles.tabText}>Directions</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navTab: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#912338",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
  },

  tabItem: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 0,
    marginBottom:0,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default NavTab;
