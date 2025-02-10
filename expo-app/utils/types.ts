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
};
