import { StyleSheet } from "react-native";

export const layoutConstants = {
  containerPadding: 20,
  cardBorderRadius: 20,
  cardPadding: 24,
  cardPaddingMobile: 16,
  safeAreaBackground: "#000000",
  cardBackground: "#ffffff",
};

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: layoutConstants.safeAreaBackground,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImageStyle: {
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: layoutConstants.containerPadding,
  },
  cardShadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 12,
  },
  card: {
    backgroundColor: layoutConstants.cardBackground,
    borderRadius: layoutConstants.cardBorderRadius,
    padding: layoutConstants.cardPadding,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardMobile: {
    padding: layoutConstants.cardPaddingMobile,
  },
  welcomeLogoArea: {
    marginBottom: 20,
    paddingTop: 16,
  },
  buttonsGrid: {
    alignItems: "center",
  },
});
