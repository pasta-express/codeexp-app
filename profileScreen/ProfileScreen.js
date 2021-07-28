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

const dbRef = firebase.database().ref();

const ProfileScreen = (props) => {

  const db = firebase.firestore()
  const [bookings, setBookings] = useState([])
  const [bookedidentities, setIdentities] = useState([])

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (!user) {
      return undefined
    }
    dbRef.child("users").child(user.uid).child("current_bookings").get().then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setIdentities(snapshot.val())
      } else {
        console.log("no data available");
      }
    }).catch((error) => {
      console.error(error);
    });  
  }, [user])

  useEffect(() => {
    setBookings([])
    let prev = Array.from(bookings)
    if (!user || !bookedidentities) {
      return undefined
    }
    // console.log(bookedidentities.length)
    for (var i = 0; i < bookedidentities.length; i++) {
      console.log(prev)
      var docRef = db.collection("sample-listings").doc(bookedidentities[i]);
      docRef.get().then((doc) => {
        if (doc.exists) {
          // console.log(doc.data())
          prev.push(doc.data())
          setBookings(prev)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
    }      
  }, [bookedidentities])

  if (initializing) return null;

  if (!user) {
    return null;
  };  

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeaderCard user={user} />
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
