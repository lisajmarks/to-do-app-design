import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F1F6",
    alignItems: "center",
    justifyContent: "space-between",
  },
  personIcon: {
    color: "black",
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 20,
  },

  input: {
    flexDirection: "row",
    padding: 20,
    color: "gray",
    backgroundColor: "white",
    borderBottomWidth: 0,
    textAlign: "left",
    width: 250,
  },

  myInformation: {
    flexDirection: "row",
    color: "black",
    backgroundColor: "white",
    borderRadius: 0,
    padding: 20,
    borderBottomWidth: 0,
    textAlign: "left",
    width: 250,
  },

  changePassword: {
    flexDirection: "row",
    color: "black",
    backgroundColor: "white",
    borderBottomWidth: 0,
    padding: 20,
    textAlign: "left",
    borderRadius: 0,
    width: 250,
  },
});

export default styles;
