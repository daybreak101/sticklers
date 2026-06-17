import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  page: {
    flex: 1,
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  themeRed: {
    color: "rgb(104, 33, 29)",
  },
  themeRedBright: {
    color: "rgb(160, 70, 60)",
  },
  themeYellow: {
    color: "rgb(255, 244, 5)",
  },
  themeBlack: {
    color: "rgb(1, 1, 0)",
  },
  tabBarStyle: {
    backgroundColor: "#333",
  },
});
