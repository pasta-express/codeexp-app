import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './Login'
import Signup from "../Signup";

const InnerStack = createStackNavigator()

const LoginStack = () => {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen 
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <InnerStack.Screen 
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
    </InnerStack.Navigator>
  )
}

export default LoginStack