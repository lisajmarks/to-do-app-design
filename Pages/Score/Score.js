import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getAuth } from "firebase/auth";

const Score = (props) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [allProfiles, setAllProfiles] = useState([]);
  const [highScore, setHighScore] = useState(0);

  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();
  //get database to db
  const reference = ref(db, "profiles/" + props.userId);
  //setting word reference to mean "go to this pathway (db > profiles > userId)"
  const allProfilesRef = ref(db, "profiles/");

  useEffect(() => {
    onValue(reference, (snapshot) => {
      if (snapshot.val() !== null) {
        const totalpoints = snapshot.val().currentScore;
        setTotalPoints(totalpoints);
      }
    });
  }, []);

  console.log("Loook here ====>", user.providerData[0]);
  //when we get value go to your reference pathway and take a snapshot
  //if snapshot value has something there, assign value to totalpoints
  //setTotalPoints to totalpoints

  useEffect(() => {
    onValue(allProfilesRef, (snapshot) => {
      const data = snapshot.val();
      let result = Object.keys(data)
        .map((key) => data[key])
        .sort((a, b) => b.currentScore - a.currentScore);
      setAllProfiles(result);
      setHighScore(result[0].currentScore);
    });
  }, []);
  //go to all profile ref, look for some values and take a snapshot
  //because it is an array - map through the values and pull out only the currentScore values
  //sort current score and set high score from first result in current score

  return (
    <View>
      <Text>Hello, {user.providerData[0].displayName}! Score Page</Text>
      <Text>Your Score: {totalPoints}</Text>
      <Text>High Score: {highScore}</Text>
      <View style={{ flex: 1, marginTop: 10 }}>
        <FlatList
          data={allProfiles}
          renderItem={({ item, index }) => (
            <Text key={index} style={{ margin: 5 }}>
              {item.name}'s Current Score: {item.currentScore}
            </Text>
          )}
        />
      </View>
    </View>
  );
};

export default Score;
