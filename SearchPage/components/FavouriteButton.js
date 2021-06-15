import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const FavouriteButton = ({ isFavourite = false }) => {
  const [favourite, setFavourite] = useState(isFavourite);

  const handlePress = () => {
    setFavourite((favourite) => !favourite);
    
    // TODO: update user's favourite array
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
