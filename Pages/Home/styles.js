import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F2F1F6",
  },
  swipeContainer: {
    flexDirection: "row",
  },
  listContainer: {
    borderWidth: 0,
    color: "white",
    width: 250,
  },
  listItem: {
    borderBottomWidth: 0,
    color: "white",
    padding: 8,
    textAlign: "right",
  },
  rightAction: {
    backgroundColor: "blue",
    width: 150,
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
    color: "gray",
    backgroundColor: "white",
  },

  personIcon: {
    color: "black",
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 20,
  },

  completed: {
    fontWeight: "bold",
    backgroundColor: "#656565",
    padding: 5,
    color: "white",
    flexDirection: "row",
  },
});
export default styles;
