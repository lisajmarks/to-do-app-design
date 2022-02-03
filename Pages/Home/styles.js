import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  swipeContainer: {
    flexDirection: "row",
  },
  listContainer: {
    borderWidth: 1,
    color: "black",
    width: 250,
  },
  listItem: {
    borderBottomWidth: 1,
    color: "black",
    padding: 10,
    textAlign: "right",
  },
  rightAction: {
    backgroundColor: "blue",
    width: 230,
  },
  textAction: {
    color: "white",
  },
  editInput: {
    textAlign: "right",
    alignItems: "flex-end",
    width: 150,
  },
  item: {
    flexDirection: "row",
    padding: 10,
  },
});
export default styles;
