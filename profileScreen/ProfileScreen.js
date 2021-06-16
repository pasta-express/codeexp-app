import React, { useEffect, useState } from "react";
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

const dbSampleUsers = firebase.firestore().collection("sample-users");

//eventually need to identify the logged in user and only extract info for the logged in user

const ProfileScreen = (props) => {
  const [bookedListings, setBookedListings] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = dbSampleUsers.onSnapshot((collection) => {
      const userBookings = collection.docs.map((doc) => {
        return {
          id: doc.id,
          currentBookings: doc.data().currentBookings
        };
      });
      const user = collection.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      setUser(user);
      setBookedListings(userBookings);
    });
    return () => {
      unsubscribe();
    };
  });

  console.log("pls la")
  console.log('lol')
  console.log(user)
  // console.log(bookedListings)
  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeaderCard user={user} />
      <ShadowEffectCard>
        <CurrentBookingsComponent bookings={bookedListings} />
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
