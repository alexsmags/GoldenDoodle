import { StyleSheet } from "react-native";
export default StyleSheet.create({
  background: {
    position: "absolute",
    width: "100%",
    height: 350, 
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  /* ✅ Keep icons aligned at the top */
  headerTopRow: {
    position: "absolute",
    top: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  /* ✅ Smaller Logout Button */
  logoutButton: {
    backgroundColor: "#912338",
    padding: 10,
    borderRadius: 30, // Circular button
  },
  /* ✅ Menu Button */
  menuButton: {
    padding: 10,
  },
  /* ✅ Reduce margins & padding so everything fits */
  headerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,  // Less space from the top
    paddingHorizontal: 60, // Less horizontal padding
  },
  welcomeText: {
    fontSize: 18, // Slightly smaller
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5, // Less space
  },
  studySpotText: { 
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
    marginTop: 50,
    textAlign: "center",
  },
  timerText: {
    fontSize: 20, // Slightly smaller
    fontWeight: "400",
    color: "#fff",
    marginTop: 5,
    textAlign: "center",
  },
  /* ✅ Optimize Route Button - Smaller */
  routeButton: {
    backgroundColor: "#912338",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 40
  },
  routeButtonText: {
    color: "#fff",
    fontSize: 14, // Slightly smaller
    fontWeight: "600",
  },
});
