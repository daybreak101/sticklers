import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  page: {
    flex: 1,
    padding: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  themeRed: {
    color: "rgba(104, 33, 29)"
  },
  themeYellow: {
    color: "rgba(255, 244, 5)"
  },
  themeBlack: {
    color: "rgba(1, 1, 0)"
  }
});
