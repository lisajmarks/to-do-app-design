import { StyleSheet } from "react-native-web";
import { TextInput } from "react-native";

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
    padding: 30,
    color: "gray",
    backgroundColor: "white",
    borderBottomWidth: 0,
    textAlign: "left",
  },

  myInformation: {
    flexDirection: "row",
    color: "black",
    backgroundColor: "white",
    borderRadius: 0,
    padding: 30,
    borderBottomWidth: 0,
    textAlign: "left",
  },

  changePassword: {
    flexDirection: "row",
    color: "black",
    backgroundColor: "white",
    borderBottomWidth: 0,
    padding: 30,
    textAlign: "left",
    borderRadius: 0,
  },
});

export default styles;
