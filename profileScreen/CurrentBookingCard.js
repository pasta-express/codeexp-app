import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

export const CurrentBookingCard = (props) => {
  const { bookingDetails } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: bookingDetails.coverImage,
        }}
      />
      <Text>{bookingDetails.companyName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    minHeight: 50,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 20,
    resizeMode: "cover",
    alignSelf: "center",
  },
});
