# 🏫 GoldenDoodle - Concordia Campus Guide Project

GoldenDoodle is a complete Campus Guide application created as part of the SOEN-390 course to assist students in navigating and exploring Concordia University's campuses efficiently. The project is designed to provide an easy and dynamic navigation experience for both the SGW and Loyola campuses, with features such as outdoor and indoor navigation, real-time class instructions, and highlighting major sites of interest across campus.

## 🚀 Features

### 1. Campus Map Exploration
- 🗺️ Explore both **SGW** and **Loyola** campus maps.
- 🏢 Distinct visual shapes for campus buildings vs. city buildings.
- 🔀 Easy toggle to switch between campuses.
- 📍 Display the user's current building location.
- ℹ️ View additional building information via pop-ups.

### 2. Outdoor Directions
- 📍 Select start and destination buildings (by clicking or typing).
- 🏠 Use current location as the starting point.
- 🛣️ Display route directions using **Google Maps API**.
- 🔄 Support inter-campus travel (SGW ↔ Loyola).
- 🚶‍♂️🚗🚌 Multiple transportation modes (walk, car, public transport).
- 🕐 Concordia Shuttle Service integration (time & location aware).

### 3. Directions to My Next Class (Option 1)
- 📅 Connect to **Google Calendar**.
- 🔄 Select among multiple calendars (with course schedules).
- 🏫 Locate classroom based on upcoming event.
- 🚶‍♀️ Generate directions to the next class based on the current time.

### 4. Directions to My Next Class (Option 2)
- 📡 Integrate with **Concordia Open Data API**.
- 📖 Retrieve course schedules and classroom locations.
- 🧭 Provide directions to the next class based on current time.

### 5. Indoor Navigation (Key Feature)
- 🏢 Locate rooms and provide shortest path directions.
- ♿ Accessible navigation for students with disabilities.
- 🚻 Highlight indoor points of interest (washrooms, water fountains, etc.).
- 🔼 Provide multi-floor directions within a building.
- 🔄 Inter-campus indoor navigation (SGW ↔ Loyola).

### 6. Outdoor Points of Interest (POI)
- 🍽️ Show nearest outdoor POIs (restaurants, coffee shops, etc.).
- 🗺️ Provide directions to selected POIs.

### 7. Smart Planner (Optional Bonus Feature)
- ✅ Optimize task-based routes (library, photocopies, coffee, classes, meetings).
- 🌤️ Minimize walking time and exposure to outdoor weather.
- 🤖 Leverage AI (GPT, Gemini, Llama, etc.) for intelligent planning.

## 📊 Technical Stack
- **Frontend:** React Native
- **Backend:** Node.js / Express.js
- **Maps Integration:** Google Maps API / OpenStreetMap
- **APIs:** Google Calendar API, Concordia Open Data API
- **Authentication:** OAuth 2.0 (Google Sign-In) `TBD`
- **Database:** MongoDB
- **Hosting:** `TBD`

## 📋 Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/alexsmags/GoldenDoodle

2. Install dependencies:
   ```bash
   npm install

3. Configure the API keys in the `.env` file

4. Start the application
   ```bash
   npm run dev

### Running the Expo App

1. Install the Expo CLI globally on your machine (if not already installed):
   ```bash
   npm install -g expo-cli
   ```
2. Start the Expo development server
   ```bash
   npx expo start
   ```
3. Download the Expo Go app on your mobile device from the App Store or Google Play.

4. Connect your device and development machine to the same Wi-Fi network.

5. Scan the QR code displayed in the terminal or Expo Developer Tools using the Expo Go app.

6. The app will load on your device, allowing you to test it in real-time.

## 📅 Project Timeline

| Release     | Sprint        | Description                         | Duration       |
|-------------|--------------|-------------------------------------|----------------|
| Release 1   | Sprint 1      |   | Jan. 13 - Jan. 26         |
|             | Sprint 2      |    | Jan. 27 - Feb. 09     |
| Release 2   | Sprint 3      |  | Feb. 10 - Feb. 23      |
|             | Sprint 4      |        | Feb. 24 - Mar. 09     |
| Release 3   | Sprint 5      |                | Mar. 10 - Mar. 23      |
|             | Sprint 6      |           | Mar. 24 - Apr. 06        |


## 🧑‍💻 Team Members

| Name         | Role                | Contact            |
|--------------|--------------------|--------------------|
| Alexander Smagorinski    | Team Lead/Full-Stack        | alexsmag@gmail.com |
| Albaz Fathi    | N/A   | N/A  |
| Anthony Anania    | N/A   | N/A  |
| Brandon Toledano    | N/A     | N/A  |
| Desire Ouattara    | N/A     | N/A  |
| Gabriel Derhy    | N/A     | gabrielderhy@gmail.com  |
| Jonathan Della Penta    | N/A     | N/A  |
| Patrick Fuoco    | N/A     | N/A  |
| Seth Hains   | N/A     | N/A  |
| Steven Zrihen    | N/A     | N/A  |

