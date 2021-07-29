import React from 'react'
import { View, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    backgroundColor: "black"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white"
  },
});

export const EmptyPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        There is nothing here at the moment
      </Text>
    </View>
  )
}


