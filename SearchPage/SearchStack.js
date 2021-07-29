import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./SearchScreen";
import DetailScreen from "../src/DetailPage/DetailScreen.jsx";
import BookingScreen from "../src/DetailPage/BookingScreen.jsx";
import ProfileScreen from "../ProfilePage/ProfileScreen"
import MessageScreen from "../src/InboxPage/Conversation"

const InnerStack = createStackNavigator();

//to add for profile and inbox

const SearchStack = () => {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="Explore"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <InnerStack.Screen
        options={{
          title: "",
        }}
        name="Details"
        component={DetailScreen}
      />
      <InnerStack.Screen name="Booking" component={BookingScreen} />
      <InnerStack.Screen 
        name="Profile"
        component={ProfileScreen}
      />
      <InnerStack.Screen
        name="Message"
        component={MessageScreen}
      />
    </InnerStack.Navigator>
  );
};

export default SearchStack;
