import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { CurrentBookingCard } from "./CurrentBookingCard";
import firebase from "firebase";
import { firebaseConfig } from "../../config/firebaseConfig";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

const currUser = firebase.auth().currentUser;
const db = firebase.firestore().collection("sample-listings")
const dbRef = firebase.database().ref();

export const CurrentBookingsComponent = ({ bookings }) => {

  while (bookings.length === 0) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }

  function renderItem({ item }) {
    const { id } = item;
    return <CurrentBookingCard key={id} bookingDetails={item} />;
  }
  return (
    <View>
      <Text>Current Bookings</Text>
      <FlatList data={bookings} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
    </View>
  );
};
