import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

export const ProfileHeaderCard = (props) => {
  const { user } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: user.profileImage,
        }}
      />
      <Text style={styles.text}>{user.name}</Text>
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
