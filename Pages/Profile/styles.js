import { StyleSheet } from "react-native-web";
import { TextInput } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "left",
    backgroundColor: "#F2F1F6",
  },
  header: {
    fontFamily: "bold",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    TextInput: "center",
    alignItems: "center",
  },
  input: {
    flexDirection: "row",
    padding: 20,
    color: "black",
    backgroundColor: "white",
    borderRadius: 1,
    borderWidth: 1,
  },
  myInformation: {
    flexDirection: "row",
    padding: 20,
    color: "black",
    backgroundColor: "white",
  },
});

export default styles;
