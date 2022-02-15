import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
// import { confirmPasswordReset } from "firebase/auth";
import TaskItem from "./TaskItem";
// import { Swipeable } from "react-native-gesture-handler";
import styles from "./styles";

const Home = (props) => {
  const [newToDo, setNewToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const [completedToDos, setCompletedToDos] = useState([]);
  const [completeToDo, setCompleteToDo] = useState(false);
  const [point, setPoint] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  const db = getDatabase();
  const toDoListRef = ref(db, "toDoList/" + props.userId);
  //go to this userId
  const newToDoRef = push(toDoListRef);
  //add new to do to end of toDoListRef

  useEffect(() => {
    const day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date().getDay();
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear(); //Current Year
    setCurrentDate(day[today] + ", " + month + "/" + date + "/" + year);
  }, []);

  const onAdd = () => {
    if (newToDo !== "") {
      set(newToDoRef, {
        id: newToDoRef.key,
        todo: newToDo,
        complete: completeToDo,
        point: point,
      }).catch((err) => console.log(err));
      setNewToDo("");
    }
  };
  //newToDoRef.key gives us the key for that specific to do
  //.catch catches any errors

  useEffect(() => {
    onValue(toDoListRef, (snapshot) => {
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        let result = Object.keys(data).map((key) => data[key]);

        let completedToDos = [];
        let incompleteToDos = [];

        result.map((item) => {
          if (item.complete) {
            completedToDos.push(item);
          } else {
            incompleteToDos.push(item);
          }
        });
        setToDos(incompleteToDos);
        setCompletedToDos(completedToDos);
      } else {
        setToDos([]);
        setCompletedToDos([]);
      }
    });
  }, []);
  //Object.keys gets the data out in a way that it can be rendered
  // if else prevents error from null

  const signout = () => {
    props.userAuth.signOut();
    props.navigation.navigate("Auth");
  };
  //signOut is firebase
  // navigation.navigate("Page") - what page to go to in nav stack

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.navigate("Profile")}>
        <Ionicons name="person-circle-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text>Things To Do!</Text>
      <Text>Current date: {currentDate}</Text>
      <View>
        <TouchableOpacity onPress={() => onAdd()}>
          <AntDesign name="plus" size={15} color="#000" />
        </TouchableOpacity>

        <TextInput
          placeholder="Add to do item"
          value={newToDo}
          onChangeText={setNewToDo}
        />
      </View>

      <View>
        <View style={styles.listContainer}>
          <FlatList
            data={toDos}
            renderItem={({ item }) => (
              <TaskItem item={item} db={db} userId={props.userId} />
            )}
            //For each item inside todos put it inside TaskItem as a prop
          />
        </View>
        <View style={styles.listContainer}>
          <Text> Completed To Dos</Text>
          <FlatList
            data={completedToDos}
            renderItem={({ item }) => (
              <TaskItem item={item} db={db} userId={props.userId} />
            )}
          />
        </View>
      </View>

      <TouchableOpacity onPress={() => props.navigation.navigate("Score")}>
        <Text>Score Page</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 50 }}>
        <TouchableOpacity onPress={signout}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
