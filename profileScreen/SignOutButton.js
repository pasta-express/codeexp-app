import React from "react";
import { TouchableOpacity, Text } from "react-native"

export const SignOutButton = () => {
    // const { signOutHandler } = props;

    // temporary holder
    const signOutHandler = () => {
        return null;
    }

    return (
        <TouchableOpacity
            onPress={signOutHandler}>
            <Text>Sign out</Text>
        </TouchableOpacity>
    )
}