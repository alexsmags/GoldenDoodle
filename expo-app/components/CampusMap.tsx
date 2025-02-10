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
import { SGWBuildings, LoyolaBuildings } from "../data/buildingData";
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

  // Handle long press on the map to set destination
  const handleMapPress = useCallback((event: any) => {
    const coordinate = event.nativeEvent.coordinate;
    console.log("Setting destination:", coordinate);
    setDestination(coordinate);
  }, []);

  // Toggle between SGW and Loyola campuses
  const toggleCampus = useCallback(() => {
    setCampus((prevCampus) => (prevCampus === "SGW" ? "Loyola" : "SGW"));
    resetDirections();
  }, []);

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
        onLongPress={handleMapPress}
      >
        {/* Render Markers */}
        {markers.map((marker) => (
          <CustomMarker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}

        {/* Render Polygons */}
        {buildings.map((building) => (
          <Polygon
            key={building.id}
            coordinates={building.coordinates}
            fillColor={building.fillColor}
            strokeColor={building.strokeColor}
            strokeWidth={2}
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
