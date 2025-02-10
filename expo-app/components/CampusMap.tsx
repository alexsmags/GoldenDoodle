import React, { useState, useCallback, useEffect } from "react";
import MapView, { Polygon, Polyline, Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Alert,
  Switch,
  Text,
  TouchableOpacity,
} from "react-native";
import CustomMarker from "./CustomMarker";
import { SGWBuildings, LoyolaBuildings, Building } from "../data/buildingData";
import { getDirections } from "../utils/directions";
import { initialRegion, SGWMarkers, LoyolaMarkers } from "./customMarkerData";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import NavTab from "./NavTab"; // Import the NavTab component
import * as Location from "expo-location";

type Coordinates = {
  latitude: number;
  longitude: number;
};

const CampusMap = () => {
  const [campus, setCampus] = useState<"SGW" | "Loyola">("SGW");
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinates[]>([]);
  const [destination, setDestination] = useState<Coordinates | null>(null); // Only destination is needed
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null); // User's location is the origin
  const [viewCampusMap, setViewCampusMap] = useState<boolean>(true);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);

  const markers = campus === "SGW" ? SGWMarkers : LoyolaMarkers;
  const buildings = campus === "SGW" ? SGWBuildings : LoyolaBuildings;

  // Get user’s current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access to navigate.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  // Reset destination and route
  const resetDirections = () => {
    setRouteCoordinates([]);
    setDestination(null);
    setSelectedBuildingId(null);
  };

  // Fetch route from user's location to destination
  const fetchRoute = useCallback(async () => {
    if (!userLocation || !destination) {
      Alert.alert("Select a destination point");
      return;
    }

    const route = await getDirections(userLocation, destination);
    if (route) {
      setRouteCoordinates(route);
    }
  }, [userLocation, destination]);

  // Handle marker press to set destination
  const handleMarkerPress = useCallback((coordinate: Coordinates) => {
    console.log("Setting destination:", coordinate);
    setDestination(coordinate);
  }, []);

  // Toggle between SGW and Loyola campuses
  const toggleCampus = useCallback(() => {
    setCampus((prevCampus) => (prevCampus === "SGW" ? "Loyola" : "SGW"));
    resetDirections();
  }, []);

  // Handle building press to show building info
  const handleBuildingPressed = (buildingId: string) => () => {
    if (selectedBuildingId === buildingId) {
      setSelectedBuildingId(null);
      return;
    }
    console.log("Building pressed:", buildingId);
    setSelectedBuildingId(buildingId);
  };

  const getFillColorWithOpacity = (building : Building, selectedBuildingId: string | null) => {
    // Extract the fillColor from the building object
    const fillColor = building.fillColor;

    // Convert hex to RGBA if necessary
    let rgbaColor = fillColor;
    if (fillColor.startsWith("#")) {
      // Convert hex to RGBA
      const hexToRgb = (hex : any) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, 1)`;
      };
      rgbaColor = hexToRgb(fillColor);
    }

    // Adjust the opacity based on whether the building is selected
    const opacity = building.id === selectedBuildingId ? 0.8 : 0.4;
    return rgbaColor.replace(/[\d\.]+\)$/, `${opacity})`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRightContainer}>
        <TouchableOpacity style={styles.buttonContainer} onPress={toggleCampus}>
          <Text style={styles.buttonText}>
            <MaterialIcons name="arrow-upward" size={16} color="black" />
            <MaterialIcons name="arrow-downward" size={16} color="black" />
            View {campus === "SGW" ? "Loyola Campus" : "SGW Campus"}
          </Text>
        </TouchableOpacity>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>View Campus Map</Text>
          <Switch
            value={viewCampusMap}
            onValueChange={(value) => setViewCampusMap(value)}
          />
        </View>
      </View>

      <MapView
        style={styles.map}
        region={initialRegion[campus]}
        showsUserLocation={true}
        loadingEnabled={true}
        scrollEnabled={true}
        zoomEnabled={true}
      >
        {/* Render Markers */}
        {markers.map((marker) => (
          <CustomMarker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onPress={() => handleMarkerPress(marker.coordinate)} // Pass the onPress handler
          />
        ))}

        {/* Render Polygons */}
        {buildings.map((building) => (
          <Polygon
            key={building.id}
            coordinates={building.coordinates}
            fillColor={getFillColorWithOpacity(building, selectedBuildingId)}
            strokeColor={building.strokeColor}
            strokeWidth={2}
            onPress={handleBuildingPressed(building.id)}
          />
        ))}

        {/* Render Polyline for Route */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}

        {/* Render Destination Marker */}
        {destination && (
          <Marker coordinate={destination} pinColor="red" title="Destination" />
        )}

        {/* Render User Location Marker */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            pinColor="blue"
            title="Your Location"
          />
        )}
      </MapView>

      <NavTab
        campus={campus}
        onNavigatePress={fetchRoute}
        onTravelPress={() => Alert.alert("Travel pressed")}
        onEatPress={() => Alert.alert("Eat on Campus pressed")}
        onNextClassPress={() => Alert.alert("Next Class pressed")}
        onMoreOptionsPress={() => Alert.alert("More Options pressed")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
  map: { flex: 1 },
  topRightContainer: {
    position: "absolute",
    bottom: 100,
    right: 10,
    zIndex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
  },
  buttonContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { fontSize: 14, fontWeight: "bold" },
  switchContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: { marginRight: 5, fontSize: 12, fontWeight: "bold" },
});

export default CampusMap;
