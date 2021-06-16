import "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import { ProfileStack }  from "./profileScreen/ProfileStack";
import { WishlistStack } from "./WishlistPage/WishlistStack";
import SearchScreen from "./SearchPage/SearchScreen";
import SearchStack from './SearchPage/SearchStack';
import InboxScreen from "./InboxPage/Inbox";
import Login from "./Login";
import Signup from "./Signup";
import LoginStack from "./LoginStack";

import firebase from "firebase";
import { firebaseConfig } from "./config/firebaseConfig";
//firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

function ExploreStackScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Explore Screen</Text>
    </View>
  );
}

function WishlistStackScreen() {
  return <WishlistStack />;
}

function InboxStackScreen() {
  return <InboxScreen />
}

function loginScreen() {
  return <Login />
}

export default function App() {
  const Stack = createStackNavigator();
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
        <Tab.Screen name="Wishlist" component={WishlistStackScreen} />
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
