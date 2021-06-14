import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DetailScreen from './detail-page/DetailScreen';

export default function App() {
  return (
    <View style={styles.container}>
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
