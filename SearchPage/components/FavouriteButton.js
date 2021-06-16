import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "firebase";

const currUser = firebase.auth().currentUser;

const dbRef = firebase.database().ref();

var currWishList = [];
if (currUser) {
  dbRef
    .child("users")
    .child(currUser.uid)
    .child("wishlist")
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        currWishList = snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export const FavouriteButton = ({ id, isFavourite }) => {
  const [favourite, setFavourite] = useState(isFavourite);

  const handlePress = () => {
    setFavourite((favourite) => !favourite);

    if (!favourite) {
      firebase.firestore().collection("sample-wishlists").add({ id: id });
      currWishList.push(id);
      console.log("liked");
      if (currUser) {
        firebase
          .database()
          .ref("users/" + currUser.uid)
          .set({
            gmail: currUser.email,
            profile_picture: currUser.photoURL,
            username: currUser.displayName,
            uid: currUser.uid,
            wishlist: currWishList,
          })
          .catch(function (e) {
            console.log("upload data to firebase failed: " + e);
          });
      }
    } else {
      firebase
        .firestore()
        .collection("sample-wishlists")
        .where("id", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => doc.ref.delete());
        });

      const index = currWishList.indexOf(id);
      currWishList.splice(index, 1);

      console.log("unliked list is " + currWishList);
      if (currUser) {
        firebase
          .database()
          .ref("users/" + currUser.uid)
          .set({
            gmail: currUser.email,
            profile_picture: currUser.photoURL,
            username: currUser.displayName,
            uid: currUser.uid,
            wishlist: currWishList,
          })
          .catch(function (e) {
            console.log("upload data to firebase failed: " + e);
          });
      }
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
