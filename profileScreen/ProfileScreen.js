import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { SignOutButton } from "./SignOutButton";
import { ProfileHeaderCard } from "./ProfileHeaderCard";
import { CurrentBookingsComponent } from "./CurrentBookingsComponent";
import { ShadowEffectCard } from "./ShadowEffectCard";

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
const ProfileScreen = (props) => {
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

  const currentBookingsDetails = getCurrentBookingsDetails();

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeaderCard user={SAMPLE_USER} />
      <ShadowEffectCard>
        <CurrentBookingsComponent bookings={currentBookingsDetails} />
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
