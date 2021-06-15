import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DetailScreen from './detail-page/DetailScreen';
import BookingScreen from './detail-page/BookingScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator()
export default function App() {
  return (
    <View style={styles.container}>
      {/* <BookingScreen /> */}
      <DetailScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9fa3cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
