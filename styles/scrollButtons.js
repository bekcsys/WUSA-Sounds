import { StyleSheet } from "react-native";

export default StyleSheet.create({
  left: {
    position: "absolute",
    left: 4,
    bottom: 8,
    zIndex: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    position: "absolute",
    right: 4,
    bottom: 8,
    zIndex: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "rgba(0,0,0,0.5)",
    fontSize: 16,
    fontWeight: "600",
  },
});
