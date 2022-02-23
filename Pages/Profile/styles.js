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
    padding: 30,
  },
  inputContainer: {
    borderWidth: 1,
  },
  input: {
    flexDirection: "row",
    padding: 20,
    color: "#ADB3BC",
    backgroundColor: "white",
    textAlign: "left",
    width: 250,
    borderRadius: 2,
    borderBottomWidth: 1,
  },

  myInformation: {
    flexDirection: "row",
    color: "#000000",
    backgroundColor: "white",
    borderRadius: 0,
    padding: 20,
    textAlign: "left",
    width: 250,
    fontSize: 15,
    fontFamily: "Assistant_400Regular",
    fontWeight: "bold",
    marginBottom: 0,
  },

  changePassword: {
    flexDirection: "row",
    color: "#000000",
    backgroundColor: "white",
    fontFamily: "Assistant_400Regular",
    padding: 20,
    textAlign: "left",
    width: 250,
    fontWeight: "bold",
    fontSize: 15,
    borderRadius: 0,
  },
});

export default styles;
