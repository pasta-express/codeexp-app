import React from "react";
import { View, Text, FlatList } from "react-native";
import { CurrentBookingCard } from "./CurrentBookingCard";

export const CurrentBookingsComponent = (props) => {
  const { bookings } = props;

  function renderItem({ item }) {
    const { id } = item;

    return <CurrentBookingCard key={id} bookingDetails={item} />;
  }

  return (
    <View>
      <Text>Current Bookings</Text>
      <FlatList data={bookings} renderItem={renderItem} />
    </View>
  );
};
