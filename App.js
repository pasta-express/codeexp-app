import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import { ProfileStack } from "./ProfilePage/ProfileStack";
import { WishlistStack } from "./WishlistPage/WishlistStack";
import SearchStack from "./SearchPage/SearchStack";
import InboxScreen from "./src/InboxPage/Inbox";
import LoginScreen from "./src/LoginPage/Login"
import firebase from "firebase";
import { firebaseConfig } from "./config/firebaseConfig";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}


export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <LoginScreen />
    )
  };  
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
        <Tab.Screen name="Inbox" component={InboxScreen} />
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
