export type Building = {
  id: string;
  name: string;
  coordinates: { latitude: number; longitude: number }[];
  fillColor: string;
  strokeColor: string;
};


export const SGWBuildings : Building[] = [
  {
    id: 'FB',
    name: 'Faubourg Building',
    coordinates: [
      { latitude: 45.494695, longitude: -73.577226 },
      { latitude: 45.494687, longitude: -73.577214 },
      { latitude: 45.494395, longitude: -73.577508 },
      { latitude: 45.494741, longitude: -73.578126 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)", // Semi-Transparent blue
    strokeColor: "rgba(0, 0, 255, 1)" // Solid blue outline
  },
  {
    id: 'FG',
    name: 'Faubourg Ste-Catherine Building',
    coordinates: [
      { latitude: 45.49471, longitude: -73.57806 },
      { latitude: 45.49445, longitude: -73.57762 },
      { latitude: 45.49383, longitude: -73.57911 },
      { latitude: 45.49360, longitude: -73.57871 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)"
  },
  {
    id: 'MB',
    name: 'John Molson Building',
    coordinates: [
      { latitude: 45.49559, longitude: -73.57921 },
      { latitude: 45.49523, longitude: -73.57785 },
      { latitude: 45.49496, longitude: -73.57878 },
      { latitude: 45.49535, longitude: -73.57941 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)"
  },
  {
    id: 'GM',
    name: 'Guy-De Maisonneuve Building',
    coordinates: [

      { latitude: 45.49616, longitude: -73.57888 },
      { latitude: 45.49597, longitude: -73.57842 },
      { latitude: 45.49559, longitude: -73.57888 },
      { latitude: 45.49577, longitude: -73.57914 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)"
  },
  {
    id: 'EV',
    name: 'Engineering, Computer Science and Visual Arts integrated Complex',
    coordinates: [
      { latitude: 45.49597, longitude: -73.57842 },
      { latitude: 45.49577, longitude: -73.57801 },
      { latitude: 45.49607, longitude: -73.57767 },
      { latitude: 45.49586, longitude: -73.57722 },
      { latitude: 45.49518, longitude: -73.57788 },
      { latitude: 45.49559, longitude: -73.57880 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)"
  },
  {
    id: 'LS',
    name: 'Learning Square Building',
    coordinates: [
      { latitude: 45.49632, longitude: -73.57978 },
      { latitude: 45.49639, longitude: -73.57922 },
      { latitude: 45.49615, longitude: -73.57941 },
      { latitude: 45.49632, longitude: -73.57978 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)"
  },
  {
    id: 'ER',
    name: 'ER Building',
    coordinates: [
      { latitude: 45.49670, longitude: -73.58012 },
      { latitude: 45.49656, longitude: -73.57922 },
      { latitude: 45.49611, longitude: -73.57997 },
      { latitude: 45.49626, longitude: -73.58047 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)"
  },
  {
    id: 'H',
    name: 'Hall Building',
    coordinates: [
      { latitude: 45.49777, longitude: -73.57901 },
      { latitude: 45.49741, longitude: -73.57830 },
      { latitude: 45.49682, longitude: -73.57886 },
      { latitude: 45.49720, longitude: -73.57959 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)"
  },
  {
    id: 'LB',
    name: 'J.W. McConnell Building',
    coordinates: [
      { latitude: 45.49730, longitude: -73.57806 },
      { latitude: 45.49695, longitude: -73.57723 },
      { latitude: 45.49659, longitude: -73.57755 },
      { latitude: 45.49651, longitude: -73.57743 },
      { latitude: 45.49624, longitude: -73.57770 },
      { latitude: 45.49669, longitude: -73.57863 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)"
  },
  {
    id: 'VA',
    name: 'Visual Arts Building',
    coordinates: [
      { latitude: 45.49564, longitude: -73.57438 },
      { latitude: 45.49622, longitude: -73.57377 },
      { latitude: 45.49594, longitude: -73.57317 },
      { latitude: 45.49532, longitude: -73.57371 }
    ],
    fillColor: "rgba(0, 100, 255, 0.5)",
    strokeColor: "rgba(0, 0, 255, 1)"
  }
];

export const LoyolaBuildings : Building[] = [
  {
    id: '1',
    name: "Central Building",
    coordinates: [
      { latitude: 45.458, longitude: -73.640 },
      { latitude: 45.4575, longitude: -73.640 },
      { latitude: 45.4575, longitude: -73.6395 },
      { latitude: 45.458, longitude: -73.6395 }
    ],
    fillColor: "rgba(255, 165, 0, 0.5)", // Semi-Transparent orange
    strokeColor: "rgba(255, 140, 0, 1)" // Solid orange outline
  }
];