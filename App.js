import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import { ProfileStack } from "./profileScreen/ProfileStack";
import { WishlistStack } from "./WishlistPage/WishlistStack";
import SearchStack from "./SearchPage/SearchStack";
import InboxScreen from "./InboxPage/Inbox";
import LoginStack from "./LoginStack";

import firebase from "firebase";
import { firebaseConfig } from "./config/firebaseConfig";
//firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function InboxStackScreen() {
  return <InboxScreen />;
}

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // TODO: Make focused icon different
            if (route.name === "Explore") {
              return <Feather name="search" size={24} color="black" />;
            } else if (route.name === "Wishlist") {
              // iconName = focused ? "ios-list-box" : "ios-list";
              return (
                <Ionicons
                  name="ios-heart-circle-outline"
                  size={24}
                  color="black"
                />
              );
            } else if (route.name === "Inbox") {
              return <Feather name="message-square" size={24} color="black" />;
            } else {
              return (
                <FontAwesome name="user-circle-o" size={24} color="black" />
              );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Explore" component={SearchStack} />
        <Tab.Screen name="Wishlist" component={WishlistStack} />
        <Tab.Screen name="Inbox" component={InboxStackScreen} />
        <Tab.Screen name="Profile" component={LoginStack} />
        <Tab.Screen name="ProfileScreen" component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9fa3cc",
    alignItems: "center",
    justifyContent: "center",
  },
});
