import { StyleSheet } from "react-native";



export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 20,
    borderColor: "brown",
    borderWidth: 0,
  },
 
  displayArea: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: 0,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "red",
  },

  rootTop: {
    flex: 1,
    width: "100%",
    height: "88%",
    alignSelf: "stretch",
    padding: 0,
    minHeight: 0,
    maxHeight: "100%",
    borderColor: "orange",
    borderRadius: 20,
    borderWidth: 3,
  },
  rootTopContentTop: {
    flex: 0.4,
    minHeight: 0,
    overflow: "hidden",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0,
    borderColor: "grey",
    borderRadius: 30,
    borderWidth: 3,
  },
  rootTopContentBottom: {
    flex: 0.6,
    minHeight: 0,
    overflow: "hidden",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    paddingTop: 0,
    paddingBottom: 16,
    borderColor: "grey",
    borderRadius: 30,
    borderWidth: 3,
  },
  rootBottomFooter: {
    width: "100%",
    height: "12%",
    maxHeight: "100%",
    flexShrink: 0,
    borderWidth: 3,
    borderColor: "orange",
    borderRadius: 20,
  },
  rootBottomFooterContent: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
    borderRadius: 30,
    borderWidth: 3,
  },

});
