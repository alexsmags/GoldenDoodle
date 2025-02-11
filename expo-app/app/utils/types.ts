export type Campus = "SGW" | "Loyola";

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Building = {
  id: string;
  name: string;
  coordinates: Coordinates[];
  fillColor: string;
  strokeColor: string;
  description?: string;
};

export type CustomMarker = {
  id: number;
  title: string;
  description: string;
  coordinate: Coordinates;
  campus?: Campus;
};
