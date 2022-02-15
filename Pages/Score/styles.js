import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F1F6",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  scoreMenu: {
    borderRadius: 20,
    backgroundColor: "#ff1493",
    flexDirection: "row",
    justifyContent: "space-around",
    height: 30,
    alignItems: "center",
  },
  scoreMenuText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  activeText: {
    backgroundColor: "white",
    color: "#ff1493",
    borderRadius: 15,
    padding: 3,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  top3: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  top3Text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  trophies: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 10,
    textAlign: "center",
    alignItems: "center",
  },
  flatListContainer: {
    flex: 1,
    marginTop: 50,
  },
  scoreList: {
    flexDirection: "row",
    alignSelf: "stretch",
    backgroundColor: "white",
    height: 50,
    marginBottom: 10,
    alignItems: "center",
  },
  rank: {
    borderColor: "#d3d3d3",
    borderWidth: 2,
    textAlign: "center",
    padding: 3,
    borderRadius: 5,
    margin: 10,
    justifyContent: "center",
  },
  rankText: {
    color: "#a9a9a9",
  },
});

export default styles;
