import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';

// Define the prop types
type CustomMarkerProps = {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title?: string;
  description?: string;
};

const CustomMarker: React.FC<CustomMarkerProps> = ({
  coordinate,
  title = 'Unknown Title', // Default title if not provided
  description = 'No description available', // Default description if not provided
}) => (
  <Marker coordinate={coordinate}>
    <View style={styles.marker}>
      <Text style={styles.markerText}>{title[0] || '?'}</Text>
    </View>
    <Callout>
      <View style={styles.callout}>
        <Text style={styles.calloutTitle}>{title}</Text>
        <Text>{description}</Text>
      </View>
    </Callout>
  </Marker>
);

const styles = StyleSheet.create({
  marker: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 2,
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  callout: {
    width: 150,
    padding: 5,
  },
  calloutTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default CustomMarker;
