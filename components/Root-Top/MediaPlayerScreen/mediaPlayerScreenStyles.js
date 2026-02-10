import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 24,
    padding: 12,
  },
  backText: {
    fontSize: 16,
    color: "#333",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },
  trackTitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 32,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  controlBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "rgba(0,0,0,0.06)",
    borderRadius: 8,
  },
  playBtn: {
    paddingHorizontal: 32,
    backgroundColor: "rgba(206, 25, 60, 0.15)",
  },
  controlText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
