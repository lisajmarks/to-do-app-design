import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./firebase";

import Profile from "./Pages/Profile/Profile";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home/Home";
import Score from "./Pages/Score/Score";
import { Ionicons } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const userAuth = getAuth();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    onAuthStateChanged(userAuth, (user) => {
      if (user !== null) setUserId(user.uid);
      else setUserId("");
    });
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerPosition: "right",
        }}
      >
        <Drawer.Screen name="Auth">
          {(props) => (
            <Auth userId={userId} userAuth={userAuth} {...props}>
              Auth
            </Auth>
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Home" options={{ headerLeft: (props) => null }}>
          {(props) => (
            <Home userId={userId} userAuth={userAuth} {...props}>
              Home
            </Home>
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Profile">
          {(props) => (
            <Profile userId={userId} userAuth={userAuth} {...props}>
              Profile
            </Profile>
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Score">
          {(props) => (
            <Score userId={userId} userAuth={userAuth} {...props}>
              Score
            </Score>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
