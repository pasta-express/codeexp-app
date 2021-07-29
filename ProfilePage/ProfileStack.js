import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "./ProfileScreen";

const InnerStack = createStackNavigator()

export const ProfileStack = () => {
  //add back the safe area view here
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen 
        name="Profile"
        component={ProfileScreen} />
    </InnerStack.Navigator>
  )
}