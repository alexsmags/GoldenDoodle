import Constants from "expo-constants";
import { decode } from "@mapbox/polyline";
import { Coordinates } from "./types";

const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey;

export const getDirections = async (
  origin: Coordinates,
  destination: Coordinates
): Promise<Coordinates[]> => {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const points = data.routes[0].overview_polyline.points;
      const decodedPoints = decode(points).map(([lat, lng]) => ({
        latitude: lat,
        longitude: lng,
      }));
      return decodedPoints;
    } else {
      console.error("No routes found");
      return [];
    }
  } catch (error) {
    console.error("Error fetching directions:", error);
    return [];
  }
};
