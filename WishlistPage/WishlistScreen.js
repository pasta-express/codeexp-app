import React, { useState } from "react";
import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import { ListCard } from "../SearchPage/components/ListCard";

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
  {
    id: "5",
    companyName: "Company6",
    coverImage: SAMPLE_IMAGE_URL,
    price: 30,
    location: "Singapore",
    startDate: Date.now(),
    endDate: Date.now(),
  },
];

export const WishlistScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={SAMPLE_LISTINGS}
        renderItem={({ item }) => (
          <ListCard isListingWishlisted={true} {...item} />
        )}
      />
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

export default WishlistScreen