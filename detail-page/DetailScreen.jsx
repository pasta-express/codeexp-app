import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import Carousel from "react-native-snap-carousel";

import { Card, FAB } from "react-native-paper";

import { FontAwesome } from "@expo/vector-icons";

const SLIDER_WIDTH = Dimensions.get("window").width + 200;

const NORMAL_WIDTH = Dimensions.get("window").width;

const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

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

const DescriptionCard = ({ description }) => {
  return (
    <Card style={styles.box}>
      <Text style={styles.descTitle}>Description</Text>
      <Text style={styles.descMain}>
        {description}
      </Text>
    </Card>
  );
};

const FeatureCard = ({ features }, { id }) => {
  return (
    <Card style={styles.box}>
      <Text style={styles.descTitle}>Features</Text>
      {features.map((f) => (
        <Text key={f} style={styles.descMain}>
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
          <DescriptionCard description={route.params.description} />
          <FeatureCard features={route.params.features} id={route.params.id} />
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
          onPress={() => navigation.navigate("Message")}
        />
        <FAB 
          extended label="book now" 
          style={styles.FAB} 
          onPress={() => navigation.navigate("Booking", {
            description: route.params.description,
            features: route.params.features,
            companyName: route.params.companyName,
            coverImage: route.params.coverImage,
            isListingWishListed: false,
            id: route.params.id,
            location: route.params.location,
            startDate: route.params.startDate,
            endDate: route.params.endDate,
            price: route.params.price
          })} />
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
