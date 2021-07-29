import React from "react";
import { TouchableOpacity, Text } from "react-native"
import firebase from "firebase";

export const SignOutButton = () => {

  const signOutHandler = () => {
    firebase.auth().signOut().then(() => console.log("user signed out"))
  }

  return (
    <TouchableOpacity
        onPress={signOutHandler}>
        <Text>Sign out</Text>
    </TouchableOpacity>
  )
}