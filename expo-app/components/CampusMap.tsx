import React, { useState, useCallback, useEffect } from "react";
import MapView, { Polygon, Polyline, Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Alert,
  Switch,
  Text,
  TouchableOpacity,
  Modal, // Import Modal
  Button, // Import Button
} from "react-native";
import CustomMarker from "./CustomMarker";
import { SGWBuildings, LoyolaBuildings, Building } from "../data/buildingData";
import { getDirections } from "../utils/directions";
import { initialRegion, SGWMarkers, LoyolaMarkers } from "./customMarkerData";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import NavTab from "./NavTab";
import * as Location from "expo-location";

type Coordinates = {
  latitude: number;
  longitude: number;
};

const CampusMap = () => {
  const [campus, setCampus] = useState<"SGW" | "Loyola">("SGW");
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinates[]>([]);
  const [destination, setDestination] = useState<Coordinates | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [viewCampusMap, setViewCampusMap] = useState<boolean>(true);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Modal visibility state

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
    setSelectedBuilding(null);
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
  const handleBuildingPressed = (building: Building) => () => {
    if (selectedBuilding?.id === building.id) {
      setSelectedBuilding(null);
      setIsModalVisible(false); // Close modal if the same building is clicked again
      return;
    }
    console.log("Building pressed:", building);
    setSelectedBuilding(building);
    setIsModalVisible(true); // Open modal
  };

  // Get fill color with opacity
  const getFillColorWithOpacity = (
    building: Building,
  ) => {
    const fillColor = building.fillColor;
    let rgbaColor = fillColor;
    if (fillColor.startsWith("#")) {
      const hexToRgb = (hex: any) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, 1)`;
      };
      rgbaColor = hexToRgb(fillColor);
    }
    const opacity = building.id === selectedBuilding?.id ? 0.8 : 0.4;
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
            onPress={() => handleMarkerPress(marker.coordinate)}
          />
        ))}

        {/* Render Polygons */}
        {buildings.map((building) => (
          <Polygon
            key={building.id}
            coordinates={building.coordinates}
            fillColor={getFillColorWithOpacity(building)}
            strokeColor={building.strokeColor}
            strokeWidth={2}
            onPress={handleBuildingPressed(building)}
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

      {/* Modal for Building Info */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedBuilding && (
              <>
                <Text style={styles.modalTitle}>{selectedBuilding.name}</Text>
                <Text>{}</Text>
                <Button
                  title="Navigate to this Building"
                  onPress={() => {
                    setDestination({
                      latitude: selectedBuilding.coordinates[0].latitude,
                      longitude: selectedBuilding.coordinates[0].longitude,
                    });
                    setIsModalVisible(false); // Close modal after setting destination
                  }}
                />
                <Button
                  title="Close"
                  onPress={() => setIsModalVisible(false)}
                />
              </>
            )}
          </View>
        </View>
      </Modal>

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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default CampusMap;
