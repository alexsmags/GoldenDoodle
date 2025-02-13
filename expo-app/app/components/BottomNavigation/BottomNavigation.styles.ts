import { StyleSheet } from "react-native";

export default StyleSheet.create({
    navContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 20,
        borderTopWidth: 2,
        borderTopColor: "#ddd",
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
    navItem: {
        alignItems: "center",
        padding: 8,
    },
    navText: {
        fontSize: 12,
        color: "#666",
        marginTop: 4,
    },
    activeText: {
        color: "#912338",
        fontWeight: "600",
    },
});
