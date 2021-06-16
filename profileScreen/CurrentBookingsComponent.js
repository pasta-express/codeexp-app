import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { CurrentBookingCard } from "./CurrentBookingCard";
import firebase from "firebase";
import { firebaseConfig } from "../config/firebaseConfig";
//firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore().collection("sample-listings")

export const CurrentBookingsComponent = (props) => {
  const { bookings } = props;
  const currentBookingIds = bookings[0].currentBookings
  const [listings, setListings] = useState([])

  useEffect(() => {
    const unsubscribe = db.onSnapshot((collection) => {
      const listings = collection.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
      setListings(listings);
    });
    return (() => {
      unsubscribe();
    });
  }, []);

  // listings.filter(listing => {
  //   currentBookingIds.forEach(id => {
  //     console.log("hello")
  //     listing.id !== id
  //   })
  // })

  function renderItem({ item }) {
    const { id } = item;
    return <CurrentBookingCard key={id} bookingDetails={item} />;
  }

  return (
    <View>
      <Text>Current Bookings</Text>
      <FlatList data={listings} renderItem={renderItem} />
    </View>
  );
};
