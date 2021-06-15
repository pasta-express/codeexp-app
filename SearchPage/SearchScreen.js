import React, { useState } from "react";
import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { ListCard } from "./components/ListCard";

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

const SAMPLE_WISHLIST = [{ id: "0" }, { id: "2" }, { id: "4" }];

export const SearchScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  const [listings, setListings] = useState(SAMPLE_LISTINGS);

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

    return <ListCard isListingWishlisted={isListingWishlisted} {...item} />;
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
