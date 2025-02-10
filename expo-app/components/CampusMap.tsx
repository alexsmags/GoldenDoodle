import React, { useState } from "react";
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


type Coordinates = {
  latitude: number;
  longitude: number;
};

const CampusMap = () => {
  const [campus, setCampus] = useState<"SGW" | "Loyola">("SGW");
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinates[]>([]);
  const [origin, setOrigin] = useState<Coordinates | null>(null);
  const [destination, setDestination] = useState<Coordinates | null>(null);
  const [viewCampusMap, setViewCampusMap] = useState<boolean>(true);

  const markers = campus === "SGW" ? SGWMarkers : LoyolaMarkers;
  const buildings = campus === "SGW" ? SGWBuildings : LoyolaBuildings;

  // Fetch route from origin to destination
  const fetchRoute = async () => {
    if (!origin || !destination) {
      Alert.alert("Select both origin and destination points");
      return;
    }

    const route = await getDirections(origin, destination);
    if (route) {
      setRouteCoordinates(route);
    }
  };

  // Handle user tap on the map
  const handleMapPress = (event: any) => {
    const coordinate = event.nativeEvent.coordinate;
    if (!origin) {
      setOrigin(coordinate);
      Alert.alert("Origin set");
    } else if (!destination) {
      setDestination(coordinate);
      Alert.alert("Destination set");
    } else {
      Alert.alert("Both origin and destination are already set");
    }
  };

  return (
    <View style={styles.container}>
      {/* Container for the toggle switch and campus view button */}
      <View style={styles.topRightContainer}>
        {/* View Campus Button */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            setCampus(campus === "SGW" ? "Loyola" : "SGW");
            setRouteCoordinates([]);
            setOrigin(null);
            setDestination(null);
          }}
        >
          <Text style={styles.buttonText}>
            <MaterialIcons name="arrow-upward" size={16} color="black" />
            <MaterialIcons name="arrow-downward" size={16} color="black" />
            View {campus === "SGW" ? "Loyola Campus" : "SGW Campus"}
          </Text>
        </TouchableOpacity>

        {/* Toggle Switch */}
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
        onPress={handleMapPress} // Handle map press to set origin/destination
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

        {/* Render Origin Marker */}
        {origin && (
          <Marker coordinate={origin} pinColor="green" title="Origin" />
        )}

        {/* Render Destination Marker */}
        {destination && (
          <Marker coordinate={destination} pinColor="red" title="Destination" />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  topRightContainer: {
    position: "absolute",
    top: 10,
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
  buttonText: {
    fontSize: 14, // Smaller font size
    fontWeight: "bold", // Bold text
  },
  switchContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    marginRight: 5,
    fontSize: 12, // Smaller font size
    fontWeight: "bold", // Bold text
  },
});

export default CampusMap;
