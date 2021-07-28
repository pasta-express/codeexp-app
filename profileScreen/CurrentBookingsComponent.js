import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { CurrentBookingCard } from "./CurrentBookingCard";
import firebase from "firebase";
import { firebaseConfig } from "../config/firebaseConfig";
//firebase.initializeApp(firebaseConfig);
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

  var currentBookingIds = []
  if (currUser) {
    dbRef.child("users").child(currUser.uid).child('current_bookings').get().then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        currentBookingIds = (snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  
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
      <FlatList data={bookings} renderItem={renderItem} />
    </View>
  );
};
