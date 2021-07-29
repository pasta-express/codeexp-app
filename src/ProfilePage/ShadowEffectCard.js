import React from "react";
import { View, StyleSheet } from "react-native";

export const ShadowEffectCard = (props) => {
  return <View style={styles.shadowContainer}>{props.children}</View>;
};

const styles = StyleSheet.create({
  shadowContainer: {
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
