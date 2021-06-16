import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import Carousel from "react-native-snap-carousel";

import { createStackNavigator } from "@react-navigation/stack";

import { Card, FAB } from "react-native-paper";

import { FontAwesome } from "@expo/vector-icons";

const SLIDER_WIDTH = Dimensions.get("window").width + 200;

const NORMAL_WIDTH = Dimensions.get("window").width;

const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const features = [
  "Accommodates 4-6 pax",
  "WiFi",
  "Aircon",
  "Free Parking",
  "Coffeebar",
  "Comfortable furniture",
  "Projector",
  "Omnidesk",
];

//===============================Images=================================================
const ImageCard = ({ item }) => {
  return (
    <View>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );
};

const CarouselCards = (coverImage) => {
  const isCarousel = React.useRef(null);

  return (
    <View style={styles.carousel}>
      <Carousel
        layoutCardOffset={9}
        ref={isCarousel}
        data={coverImage.images}
        renderItem={ImageCard}
        sliderWidth={NORMAL_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
      />
    </View>
  );
};

//================================================Images===============================================================================
//================================================Content==============================================================================

const DescriptionCard = () => {
  return (
    <Card style={styles.box}>
      <Text style={styles.descTitle}>Description</Text>
      <Text style={styles.descMain}>
        Located at the heart of the CBD with a great view of Marina Bay. 3 Min
        walk from Raffles Place MRT
      </Text>
    </Card>
  );
};

const FeatureCard = () => {
  return (
    <Card style={styles.box}>
      <Text style={styles.descTitle}>Features</Text>
      {features.map((f) => (
        <Text style={styles.descMain}>
          {`\u2714`}
          {f}
        </Text>
      ))}
    </Card>
  );
};
//=================================================Content===============================================================================

const DetailScreen = ({route, navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.favouriteButton}
          onPress={() => console.log("toggle favourites")}
        >
          <FontAwesome
            name="heart-o"
            size={24}
            // TODO: Sync with backend
            color={false ? "red" : "black"}
          />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.carousel}>
        <CarouselCards images={route.params.coverImage} />
      </View>
      <View style={styles.scrollView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DescriptionCard />
          <FeatureCard />
        </ScrollView>
      </View>
      <View style={{ width: "100%",
                      flexDirection: "row", 
                      display: "flex", 
                      justifyContent: "space-between",
                      borderTopColor: "grey",
                      borderTopWidth: 1}}>
        <FAB
          extended
          label="message host"
          style={styles.FAB}
          onPress={() => console.log("hello")}
        />
        <FAB extended label="book now" style={styles.FAB} onPress={() => navigation.navigate("Booking")} />
      </View>
    </View>
  );
};

//=================================================Stylesheet=============================================================================

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 20,
  },
  favouriteButton: {
    marginRight: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollView: {
    flex: 2,
  },
  box: {
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 8,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "black",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  descMain: {
    padding: 10,
  },
  descTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 15,
    paddingLeft: 8
  },
  carousel: {
    flex: 1,
    width: NORMAL_WIDTH,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  FAB: {
    backgroundColor: "black",
    margin: 8,
  },
});

///===========================================Stylesheet==============================================================================

export default DetailScreen;
