import { StyleSheet } from "react-native";
import { scrollButtonBg, scrollButtonText } from "../components/brandColors";

export default StyleSheet.create({
  left: {
    position: "absolute",
    left: 4,
    bottom: 8,
    zIndex: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: scrollButtonBg,
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
    backgroundColor: scrollButtonBg,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: scrollButtonText,
    fontSize: 16,
    fontWeight: "600",
  },
});
