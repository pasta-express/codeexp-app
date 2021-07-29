import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import firebase from "firebase";
import { firebaseConfig } from "../config/firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const ProfileHeaderCard = (props) => {
  const { user } = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: user.photoURL,
        }}
      />
      <Text style={styles.text}>{user.displayName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    minHeight: 75,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    // shadow effects
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    
    elevation: 8,
  },
  image: {
    height: 75,
    width: 75,
    marginRight: 20,
    resizeMode: "cover",
    alignSelf: "center",
    borderRadius: 50,
  },
  text: {
    fontSize: 20,
  },
});
