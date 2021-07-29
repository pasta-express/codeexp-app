import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import { ListCard } from "../SearchPage/components/ListCard";
import firebase from "firebase";
import { EmptyPage } from "./EmptyPage";
import { firebaseConfig } from "../config/firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

// const dbListings = firebase.firestore().collection("sample-listings");
// const dbSampleUsers = firebase.firestore().collection("sample-users");

// const currUser = firebase.auth().currentUser;
// console.log("current user is " + currUser);

// const dbRef = firebase.database().ref();

const dbListings = firebase.firestore().collection("sample-listings");
const dbWishlists = firebase.firestore().collection("sample-wishlists");

export const WishlistScreen = ({ navigation }) => {
  const [listings, setListings] = useState([]);
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    const unsubscribe = dbListings.onSnapshot((collection) => {
      const updatedListings = collection.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setListings(updatedListings);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = dbWishlists.onSnapshot((collection) => {
      const updatedWishlist = collection.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setWishlists(updatedWishlist);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function renderData() {
    return listings.filter((listing) =>
      wishlists.some((wishlist) => wishlist.id === listing.id)
    );
  }

  // useEffect(() => {
  //   const unsubscribe = dbListings.onSnapshot((collection) => {
  //     const updatedListings = collection.docs.map((doc) => {
  //       return {
  //         id: doc.id,
  //         ...doc.data(),
  //       };
  //     });
  //     setListings(updatedListings);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // });

  // useEffect(() => {

  //   const unsubscribe = dbSampleUsers.onSnapshot((collection) => {
  //     const updatedUsers = collection.docs.map((doc) => {
  //       return {
  //         id: doc.id,
  //         ...doc.data(),
  //       };
  //     });

  //     setWishlists(updatedUsers[0].favourites);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };

  //   // const unsubscribe = dbRef
  //   //   .child("users")
  //   //   .child(currUser.uid)
  //   //   .child("wishlist")
  //   //   .get()
  //   //   .then((snapshot) => {
  //   //     if (snapshot.exists()) {
  //   //       console.log(snapshot.val());
  //   //       setWishlists(snapshot.val());
  //   //     }
  //   //   });
  //   // return () => {
  //   //   unsubscribe;
  //   // };
  // });

  // function renderData() {
  //   return listings.filter((listing) =>
  //     wishlists.some((wishlist) => wishlist === listing.id)
  //   );
  // }

  if (wishlists.length === 0) {    
    return (<EmptyPage />)
  }
  else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={renderData()}
          renderItem={({ item }) => {
            const { id } = item;
            return (
              <ListCard
                key={id}
                navigation={navigation}
                isListingWishlisted={true}
                {...item}
              />
            );
          }}
        />
      </SafeAreaView>
    );  
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
  },
  searchInput: {
    borderRadius: 20,
    margin: 15,
  },
});

export default WishlistScreen;
