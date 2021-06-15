import React from "react";
import { View, StyleSheet, Text } from "react-native";
import moment from "moment";
import { FavouriteButton } from "./FavouriteButton";

const formatDate = (date) => {
  return moment(date).format("Do MMM YY");
};

export const ListCardInfo = (information) => {
  const {
    companyName,
    price,
    startDate,
    endDate,
    location,
    isListingWishlisted,
  } = information;

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>{companyName}</Text>
      <Text>{`${formatDate(startDate)} to ${formatDate(endDate)}`}</Text>
      <Text>{location}</Text>
      <Text>{`$${price}/day`}</Text>
      <FavouriteButton isFavourite={isListingWishlisted} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
});
