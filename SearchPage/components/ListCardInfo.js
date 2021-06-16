import React from "react";
import { View, StyleSheet, Text } from "react-native";
//import moment from "moment";
import { FavouriteButton } from "./FavouriteButton";

const formatDate = (date) => {
  //return moment(date).format("Do MMM YY");
};

export const ListCardInfo = (information) => {
  const {
    id,
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
      <Text>
        {startDate} to {endDate}
      </Text>
      <Text>{location}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{`$${price}/day`}</Text>
        <FavouriteButton id={id} isFavourite={isListingWishlisted} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingLeft: 15,
    paddingRight: 15,
    width: "70%"
  },
});
