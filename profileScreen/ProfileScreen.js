import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { SignOutButton } from "./SignOutButton";
import { ProfileHeaderCard } from "./ProfileHeaderCard";
import { CurrentBookingsComponent } from "./CurrentBookingsComponent";
import { ShadowEffectCard } from "./ShadowEffectCard";
import firebase from "firebase";
import { firebaseConfig } from "../config/firebaseConfig";
//firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore().collection("sample-users")

console.log(db)
const SAMPLE_IMAGE_URL =
  "https://locations-api-production.imgix.net/locations/image/35be52d4-1240-11eb-af66-0eb0aa9dee1d/Web_150DPI-20200908_WeWork_9_Battery_Rd_-_Singapore_005.jpg?auto=format%20compress&fit=crop&q=50&w=1800&h=1013";

const SAMPLE_USER = {
  name: "Tom",
  email: "test@gmail.com",
  password: "password",
  profileImage: SAMPLE_IMAGE_URL,
  favourites: ["1", "2"],
  currentBookings: [
    {
      id: "1",
      startDate: Date.now(),
      endDate: Date.now(),
    },
    {
      id: "2",
      startDate: Date.now(),
      endDate: Date.now(),
    },
  ],
};
const dbSampleUsers = firebase.firestore().collection("sample-users");

const ProfileScreen = (props) => {
  useEffect(() => {
    const unsubscribe = dbSampleUsers.onSnapshot((collection) => {
      const updatedUsers = collection.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(updatedUsers);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  // supposed to receive User object and Sample Listings from DB

  const getCurrentBookingsDetails = () => {
    const currentBookings = SAMPLE_USER.currentBookings;
    const currentBookingsIDs = [];
    for (let i = 0; i < currentBookings.length; i++) {
      const bookingID = currentBookings[i].id;
      currentBookingsIDs.push(bookingID);
    }

    // iterate thru all listings to get listing details
    const bookingDetails = SAMPLE_LISTINGS.filter((listing) =>
      currentBookingsIDs.includes(listing.id)
    );
    return bookingDetails;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeaderCard user={SAMPLE_USER} />
      <ShadowEffectCard>
        <CurrentBookingsComponent />
      </ShadowEffectCard>
      <ShadowEffectCard>
        <SignOutButton />
      </ShadowEffectCard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
});

export default ProfileScreen;
