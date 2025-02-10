import React from "react";
import { Marker, Callout } from "react-native-maps";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

// Define the prop types
type CustomMarkerProps = {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title?: string;
  description?: string;
  onPress?: () => void; // Add onPress prop
};

const CustomMarker: React.FC<CustomMarkerProps> = ({
  coordinate,
  title = "Unknown Title", // Default title if not provided
  description = "No description available", // Default description if not provided
  onPress, // Destructure onPress prop
}) => (
  <Marker coordinate={coordinate} onPress={onPress}>
    <View style={styles.marker}>
      <Text style={styles.markerText}>{title[0] || "?"}</Text>
    </View>
    <Callout>
      <View style={styles.callout}>
        <Text style={styles.calloutTitle}>{title}</Text>
        <Text>{description}</Text>
        {/* Add a button to navigate to this location */}
        <TouchableOpacity
          style={styles.navigateButton}
          onPress={() => {
            if (onPress) {
              onPress(); // Trigger the onPress handler
            } else {
              Alert.alert("Navigation", "Navigate to this location");
            }
          }}
        >
          <Text style={styles.navigateButtonText}>
            Navigate to this location
          </Text>
        </TouchableOpacity>
      </View>
    </Callout>
  </Marker>
);

const styles = StyleSheet.create({
  marker: {
    backgroundColor: "blue",
    padding: 5,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 2,
  },
  markerText: {
    color: "white",
    fontWeight: "bold",
  },
  callout: {
    width: 150,
    padding: 5,
  },
  calloutTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  navigateButton: {
    marginTop: 10,
    backgroundColor: "#912338",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  navigateButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomMarker;
