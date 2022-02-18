import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import Score from "../Pages/Score/Score";

const CustomDrawer = (props) => {
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });
  const signout = () => {
    props.userAuth.signOut();
    props.navigation.navigate("Auth");
  };
  return (
    <DrawerContentScrollView>
      <View>
        <View>
          <Text
            style={{
              marginTop: 91,
              marginBottom: 65,
              color: "#39A5B0",
              fontSize: 47,
              fontFamily: "Pacifico_400Regular",
              // fontSize: 96,

              lineHeight: 10,
              justifyContent: "center",
              alignSelf: "center",
              // letterSpacing: -0.08,
            }}
          >
            Doozit
          </Text>
          <Text
            style={{
              color: "#000",
              fontSize: 18,
              fontFamily: "Roboto-Medium",
              marginTop: 10,
              marginBottom: 5,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            Yiley Belete
            {/* {user.providerData[0].displayName} */}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#fff",
                // fontFamily: "Roboto-Regular",
                marginRight: 5,
              }}
            >
              Your score is 5.
            </Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </View>

      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={signout}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <Ionicons name="exit-outline" size={22} /> */}

            <Text
              style={{
                fontSize: 15,
                // fontFamily: "Roboto-Medium",
                marginLeft: 5,
              }}
            >
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
