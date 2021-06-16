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
/*
const SAMPLE_IMAGE_URL =
  "https://locations-api-production.imgix.net/locations/image/35be52d4-1240-11eb-af66-0eb0aa9dee1d/Web_150DPI-20200908_WeWork_9_Battery_Rd_-_Singapore_005.jpg?auto=format%20compress&fit=crop&q=50&w=1800&h=1013";

const SAMPLE_LISTINGS = [
  {
    id: "0",
    companyName: "Company1",
    coverImage: SAMPLE_IMAGE_URL,
    price: 30,
    location: "Singapore",
    startDate: Date.now(),
    endDate: Date.now(),
  },
  {
    id: "1",
    companyName: "Company2",
    coverImage: SAMPLE_IMAGE_URL,
    price: 40,
    location: "Singapore",
    startDate: Date.now(),
    endDate: Date.now(),
  },
  {
    id: "2",
    companyName: "Company3",
    coverImage: SAMPLE_IMAGE_URL,
    price: 20,
    location: "Singapore",
    startDate: Date.now(),
    endDate: Date.now(),
  },
  {
    id: "3",
    companyName: "Company4",
    coverImage: SAMPLE_IMAGE_URL,
    price: 20,
    location: "Singapore",
    startDate: Date.now(),
    endDate: Date.now(),
  },
  {
    id: "4",
    companyName: "Company5",
    coverImage: SAMPLE_IMAGE_URL,
    price: 10,
    location: "Singapore",
    startDate: Date.now(),
    endDate: Date.now(),
  },
];


var SAMPLE_USER;

if (currUser) {
  SAMPLE_USER = {
    name: currUser.displayName,
    email: currUser.email,
    password: "password",
    profileImage: currUser.photoURL,
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
} else {
  SAMPLE_USER = {
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
}

const dbSampleUsers = firebase.firestore().collection("sample-users");
*/
//eventually need to identify the logged in user and only extract info for the logged in user

var bookedListings = []
var bookedIds = []
const ProfileScreen = (props) => {

  const db = firebase.firestore()
  
  
    if (currUser) {
      dbRef.child("users").child(currUser.uid).child('current_bookings').get().then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          bookedIds = (snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    /*
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
      */


  
  //const [user, setUser] = useState(null)

  for (var i = 0; i < bookedIds.length; i++) {
    var docRef = db.collection("sample-listings").doc(bookedIds[i]);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            bookedListings.push(doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }
  
  

  
  console.log(bookedListings)
  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeaderCard user={currUser} />
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
