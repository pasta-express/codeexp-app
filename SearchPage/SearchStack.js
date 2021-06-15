import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SearchScreen from "./SearchScreen";
import DetailScreen from "../detail-page/DetailScreen";
import BookingScreen from "../detail-page/BookingScreen";

const InnerStack = createStackNavigator();

const SearchStack = () => {
  //add back the safe area view here
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="Explore"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <InnerStack.Screen name="Details" component={DetailScreen} />
      <InnerStack.Screen name="Booking" component={BookingScreen} />
    </InnerStack.Navigator>
  );
};

export default SearchStack;
