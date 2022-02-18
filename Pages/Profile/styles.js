import { StyleSheet } from "react-native-web";
import { TextInput } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F1F6",
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
    borderBottomWidth: 1,
    textAlign: "left",
  },

  myInformation: {
    flexDirection: "row",
    color: "black",
    backgroundColor: "white",
    borderRadius: 0,
    padding: 20,
    borderBottomWidth: 1,
    textAlign: "left",
  },

  changePassword: {
    flexDirection: "row",
    color: "black",
    backgroundColor: "white",
    padding: 10,
  },
});

export default styles;
