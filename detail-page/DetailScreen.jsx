import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";

import { Card } from 'react-native-paper'

const FeatureCard = () => {

}

const DescriptionCard = () => {



  return (
    <Card style={styles.box}>
      <Text style={styles.descTitle} >Description</Text>
      <Text style={styles.descMain}>Located at the heart of the CBD with a great view of Marina Bay. 3 Min walk from Raffles Place MRT</Text>
    </Card>
  )
}

const DetailScreen = () => {
  



  return (
    <View style={styles.container}>
      <DescriptionCard />
    </View>
  )
}


const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    width: '95%',
    // height: '20%',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    // alignSelf: 'flex-start',
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  descMain: {
    padding: 10
  },
  descTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 20,
    padding: 10
  }
})


export default DetailScreen