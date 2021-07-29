import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { ListCard } from "./components/ListCard";
import firebase from "firebase";
import { firebaseConfig } from "../../config/firebaseConfig";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore().collection("sample-listings");
const dbWishlists = firebase.firestore().collection("sample-wishlists");

export const SearchScreen = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [listings, setListings] = useState([]);
  const [wishlists, setWishlists] = useState([]);

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

  useEffect(() => {
    const unsubscribe = db.onSnapshot((collection) => {
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

  const onChangeText = (searchInput) => {
    setSearchInput(searchInput);
    const query = searchInput.toLowerCase();
    setListings(
      SAMPLE_LISTINGS.filter(
        (listing) =>
          listing.companyName.toLowerCase().includes(query) ||
          listing.location.toLowerCase().includes(query)
      )
    );
  };

  function renderItem({ item }) {
    const { id } = item;
    // Checks if user has wishlisted listing
    const isListingWishlisted = wishlists.some(
      (wishlist) => wishlist.id === id
    );
    return (
      <ListCard
        key={id}
        isListingWishlisted={isListingWishlisted}
        {...item}
        navigation={props.navigation}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        style={styles.searchInput}
        placeholder="Start searching"
        value={searchInput}
        onChangeText={onChangeText}
      />
      <FlatList data={listings} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
  },
  searchInput: {
    borderRadius: 25,
    margin: 15,
    paddingLeft: 10,
  },
});

export default SearchScreen;
