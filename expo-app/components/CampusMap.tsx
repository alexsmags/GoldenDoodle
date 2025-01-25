import React, { useState } from 'react';
import MapView, { Polygon, Polyline, Marker } from 'react-native-maps';
import { StyleSheet, View, Button, Alert } from 'react-native';
import CustomMarker from './CustomMarker';
import { SGWBuildings, LoyolaBuildings } from '../data/buildingData';
import { getDirections } from '../utils/directions';

type Coordinates = {
  latitude: number;
  longitude: number;
};

const CampusMap = () => {
  const [campus, setCampus] = useState<'SGW' | 'Loyola'>('SGW');
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinates[]>([]);
  const [origin, setOrigin] = useState<Coordinates | null>(null);
  const [destination, setDestination] = useState<Coordinates | null>(null);

  const initialRegion = {
    SGW: {
      latitude: 45.4971,
      longitude: -73.5792,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    Loyola: {
      latitude: 45.458,
      longitude: -73.640,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
  };

  const SGWMarkers = [
    {
      id: 1,
      title: 'Concordia University - SGW',
      description: 'SGW Campus',
      coordinate: { latitude: 45.4971, longitude: -73.5792 },
    },
    {
      id: 2,
      title: 'Guy-Concordia Metro',
      description: 'Public transport near campus',
      coordinate: { latitude: 45.4958, longitude: -73.5781 },
    },
  ];

  const LoyolaMarkers = [
    {
      id: 1,
      title: 'Concordia University - Loyola',
      description: 'Loyola Campus',
      coordinate: { latitude: 45.458, longitude: -73.640 },
    },
    {
      id: 2,
      title: 'Loyola Chapel',
      description: 'Historic chapel on Loyola Campus',
      coordinate: { latitude: 45.459, longitude: -73.641 },
    },
  ];

  const markers = campus === 'SGW' ? SGWMarkers : LoyolaMarkers;
  const buildings = campus === 'SGW' ? SGWBuildings : LoyolaBuildings;

  // Fetch route from origin to destination
  const fetchRoute = async () => {
    if (!origin || !destination) {
      Alert.alert('Select both origin and destination points');
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
      Alert.alert('Origin set');
    } else if (!destination) {
      setDestination(coordinate);
      Alert.alert('Destination set');
    } else {
      Alert.alert('Both origin and destination are already set');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title={`Switch to ${campus === 'SGW' ? 'Loyola' : 'SGW'} Campus`}
          onPress={() => {
            setCampus(campus === 'SGW' ? 'Loyola' : 'SGW');
            setRouteCoordinates([]);
            setOrigin(null);
            setDestination(null);
          }}
          color="#1e90ff"
        />
        <Button title="Fetch Route" onPress={fetchRoute} color="#32cd32" />
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
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 5,
  },
});

export default CampusMap;
