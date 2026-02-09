import { StyleSheet } from "react-native";

export const layoutConstants = {
  containerPadding: 20,
  cardBorderRadius: 20,
  cardPadding: 24,
  cardPaddingMobile: 16,
  safeAreaBackground: "#ffffff",
  cardBackground: "#ffffff",
};

export default StyleSheet.create({
  "safeArea-OuterLayout": {
    flex: 1,
    backgroundColor: layoutConstants.safeAreaBackground,
    borderWidth: 10,
    borderColor: "green",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImageStyle: {
    resizeMode: "cover",
  },
  innerLayout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    backgroundColor: layoutConstants.safeAreaBackground,
    borderWidth: 4,
    borderColor: "red",
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
  buttonsContainer: {
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.08)",
    padding: 25,
    marginTop: 8,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  tabletLogoSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  tabletButtonsSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: 0,
    overflow: "hidden",
    paddingTop: 0,
  },
  buttonsContainerTablet: {
    padding: 30,
  },
  buttonsGrid: {
    alignItems: "center",
  },
  buttonsGridScroll: {
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },
  scrollView: {
    width: "100%",
    overflow: "hidden",
  },
  scrollContent: {
    alignItems: "center",
  },
  scrollContentCentered: {
    flexGrow: 1,
    justifyContent: "center",
  },
  contentWrap: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    flexShrink: 0,
  },
  footerText: {
    fontSize: 18,
    color: "rgba(0, 0, 0, 0.55)",
  },
});
