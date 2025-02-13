import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: 310,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  menuButton: {
    position: "absolute",
    top: 63,
    right: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginTop: 50,
  },
  studySpotText: { 
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
  },
  timerText: {
    fontSize: 30,
    fontWeight: "400",
    color: "#fff",
    marginTop: 10,
  },
  routeButton: {
    backgroundColor: "#912338",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 25, 
    marginBottom: 15,
  },
  routeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
