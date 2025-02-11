import { Building } from "./types";

// Get fill color with opacity
export const getFillColorWithOpacity = (
  building: Building,
  selectedBuilding: Building | null
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
