import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WishlistScreen } from "./WishlistScreen";
import DetailScreen from "../DetailPage/DetailScreen";

const Stack = createStackNavigator();

export const WishlistStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Wishlist"
        component={WishlistScreen}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};
