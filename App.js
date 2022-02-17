import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./firebase";
import "react-native-gesture-handler";
import CustomDrawer from "./constants/CustomDrawer";
import {
  Assistant_400Regular,
  Assistant_600SemiBold,
  Assistant_700Bold,
} from "@expo-google-fonts/assistant";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import Profile from "./Pages/Profile/Profile";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home/Home";
import Score from "./Pages/Score/Score";
const Drawer = createDrawerNavigator();

export default function App() {
  const userAuth = getAuth();
  const [userId, setUserId] = useState("");

  let [fontsLoaded, error] = useFonts({
    Assistant_400Regular,
    Assistant_600SemiBold,
    Assistant_700Bold,
    "Pacifico-Regular": require("./assets/fonts/Pacifico-Regular.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  useEffect(() => {
    onAuthStateChanged(userAuth, (user) => {
      if (user !== null) setUserId(user.uid);
      else setUserId("");
    });
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <CustomDrawer userId={userId} userAuth={userAuth} {...props} />
        )}
        screenOptions={{
          drawerPosition: "right",
          // headerShown: false,
        }}
      >
        <Drawer.Screen
          name="Auth"
          options={{
            drawerLabel: () => null, //This will make it not display Auth on the drawer .

            headerShown: false,
          }}
        >
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
              Scoreboard
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
