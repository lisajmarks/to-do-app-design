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

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const CustomDrawer = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View>
          <Text
            style={{
              color: "#39A5B0",
              fontSize: 46.6849,
              fontFamily: "Pacifico",
              fontStyle: "normal",
              fontWeight: "normal",
              lineHeight: 46,
              letterSpacing: -0.08,
              //   border:2.91781 solid #FFF7F3,
            }}
          >
            Doozit
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontFamily: "Roboto-Medium",
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            Yiley Belete
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#fff",
                fontFamily: "Roboto-Regular",
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
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Roboto-Medium",
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;
