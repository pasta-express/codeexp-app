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

export const CurrentBookingsComponent = ({ bookings }) => {
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

  const getCurrentBookingsDetails = () => {
    // console.log('help pls')
    // console.log(currentBookingIds)
    // iterate thru all listings to get listing details
    const bookingDetails = listings.filter((listing) =>
      currentBookingIds.includes(listing.id)
    );
    return bookingDetails;
  };

  const currentBookingsDetails = getCurrentBookingsDetails();

  // console.log(currentBookingsDetails)

  function renderItem({ item }) {
    const { id } = item;
    return <CurrentBookingCard key={id} bookingDetails={item} />;
  }

  return (
    <View>
      <Text>Current Bookings</Text>
      <FlatList data={currentBookingsDetails} renderItem={renderItem} />
    </View>
  );
};
