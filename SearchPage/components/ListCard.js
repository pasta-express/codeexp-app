import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { ListCardInfo } from "./ListCardInfo";
//import moment from "moment";
import { useNavigation } from "@react-navigation/native";
/*
const formatDate = (date) => {
  return moment(date).format("Do MMM YY");
};
*/
export const ListCard = (props) => {
  const { coverImage, navigation, route } = props;

  const handlePress = () => {
    navigation.navigate("Details", {
      description: props.description,
      features: props.features,
      companyName: props.companyName,
      coverImage: props.coverImage,
      isListingWishListed: false,
      id: props.id,
      location: props.location,
      startDate: props.startDate,
      endDate: props.endDate,
      price: props.price
    })
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: coverImage[0],
          }}
        />
        <ListCardInfo {...props} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 20,
    margin: 12,
    minHeight: 180,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  image: {
    height: 150,
    width: 130,
    resizeMode: "cover",
    alignSelf: "center",
  },
  info: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
});
