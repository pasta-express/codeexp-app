import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "firebase";

export const FavouriteButton = ({ id, isFavourite = false }) => {
  const [favourite, setFavourite] = useState(isFavourite);

  const handlePress = () => {
    setFavourite((favourite) => !favourite);

    if (!favourite) {
      firebase.firestore().collection("sample-wishlists").add({ id: id });
    } else {
      firebase
        .firestore()
        .collection("sample-wishlists")
        .where("id", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => doc.ref.delete());
        });
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <FontAwesome
        name="heart-o"
        size={24}
        color={favourite ? "red" : "black"}
      />
    </TouchableOpacity>
  );
};
