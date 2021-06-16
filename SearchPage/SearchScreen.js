import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { ListCard } from "./components/ListCard";
import firebase from "firebase";
import { firebaseConfig } from "../config/firebaseConfig";
//firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore().collection("sample-listings")
  
const SAMPLE_WISHLIST = [{ id: "0" }, { id: "2" }, { id: "4" }];

export const SearchScreen = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [listings, setListings] = useState([]);

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
    return (() => {
      unsubscribe();
    });
  }, [])



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
    const isListingWishlisted = SAMPLE_WISHLIST.some(
      (wishlist) => wishlist.id === id
    );

    return <ListCard key={id} isListingWishlisted={isListingWishlisted} {...item} navigation={props.navigation} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        style={styles.searchInput}
        placeholder="Where do you want to work at?"
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
    backgroundColor: "#9FA3CC",
    width: "100%",
  },
  searchInput: {
    borderRadius: 20,
    margin: 15,
  },
});

export default SearchScreen