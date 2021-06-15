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
  ScrollView
} from "react-native";

import Carousel from 'react-native-snap-carousel'

import { Card } from 'react-native-paper'

const SLIDER_WIDTH = Dimensions.get('window').width + 200

const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const features = ['Accommodates 4-6 pax', 'WiFi', 'Aircon', 'Free Parking', 'Coffeebar', 'Comfortable furniture', 'Projector', 'Omnidesk']

// const data = [
//   {
//     title: "Aenean leo",
//     body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
//     imgUrl: "https://picsum.photos/id/11/200/300"
//   },
//   {
//     title: "In turpis",
//     body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
//     imgUrl: "https://picsum.photos/id/10/200/300"
//   },
//   {
//     title: "Lorem Ipsum",
//     body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
//     imgUrl: "https://picsum.photos/id/12/200/300"
//   }
// ]


const ImageCard = ({ item, index }) => {
  return (
    <View>
      <Image
        source={{ uri: 'https://picsum.photos/id/11/200/300'}}
        style={styles.image}
      />
    </View>
  )
}

// const CarouselCards = () => {
//   const isCarousel = React.useRef(null)

//   return (
//     <View style={styles.carousel}>
//       <Carousel
//         layoutCardOffset={9}
//         ref={isCarousel}
//         data={data}
//         renderItem={ImageCard}
//         sliderWidth={SLIDER_WIDTH}
//         itemWidth={ITEM_WIDTH}
//         inactiveSlideShift={0}
//         useScrollView={true}
//       />
//     </View>
//   )

// }

const DescriptionCard = () => {

  return (
    <Card style={styles.box}>
      <Text style={styles.descTitle}>Description</Text>
      <Text style={styles.descMain}>Located at the heart of the CBD with a great view of Marina Bay. 3 Min walk from Raffles Place MRT</Text>
    </Card>
  )
}

const FeatureCard = () => {
  return (
    <Card style={styles.box}>
      <Text style={styles.descTitle}>Features</Text>
      {features.map(f => <Text>{f}</Text>)}
    </Card>
  )
}


const DetailScreen = () => {

  return (
    <View style={styles.container}>
      <ImageCard />
      <ScrollView styles={styles.scrollView}>
        <DescriptionCard />
        <FeatureCard />
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9fa3cc',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  scrollView: {
    flex: 1,
  },
  box: {
    //this is the text box
    backgroundColor: 'white',
    width: '95%',
    paddingHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  descMain: {
    padding: 10
  },
  descTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 20,
    padding: 5
  },
  carousel: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  image: {
    //this is the image
    width: ITEM_WIDTH,
    borderWidth: 5,
    height: '60%',
  },
})


export default DetailScreen