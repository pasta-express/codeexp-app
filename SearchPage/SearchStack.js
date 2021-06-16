import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./SearchScreen";
import DetailScreen from "../detail-page/DetailScreen";
import BookingScreen from "../detail-page/BookingScreen";
import ProfileScreen from "../profileScreen/ProfileScreen"

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
    </InnerStack.Navigator>
  );
};

export default SearchStack;
