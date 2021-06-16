import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { SignOutButton } from "./SignOutButton";
import { ProfileHeaderCard } from "./ProfileHeaderCard";
import { CurrentBookingsComponent } from "./CurrentBookingsComponent";
import { ShadowEffectCard } from "./ShadowEffectCard";
import firebase from "firebase";
import { firebaseConfig } from "../config/firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const currUser = firebase.auth().currentUser;
const dbRef = firebase.database().ref();

const ProfileScreen = (props) => {

  const db = firebase.firestore()
  const [bookings, setBookings] = useState([])
  const [bookedidentities, setIdentities] = useState([])

  useEffect(() => {
    console.log('lantern')
    if (currUser) {
      dbRef.child("users").child(currUser.uid).child('current_bookings').get().then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setIdentities(snapshot.val())
          // bookedIds.push(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [])

  useEffect(() => {
    for (var i = 0; i < bookedidentities.length; i++) {
      var docRef = db.collection("sample-listings").doc(bookedidentities[i]);
      docRef.get().then((doc) => {
          if (doc.exists) {
              setBookings([
                ...doc.data()
              ])
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
    }
    console.log("TEST");
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeaderCard user={currUser} />
      <ShadowEffectCard>
        <CurrentBookingsComponent bookings={bookings} />
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
