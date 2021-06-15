import * as React from "react";

import { View, Text, StyleSheet, TouchableOpacity} from "react-native";

import { TextInput } from 'react-native-paper';


export default function ConversationScreen({ navigation }) {
    const [text, setText] = React.useState('');
    return (
        <View styles={styles.InputBar}>
            <TextInput
            label="input"
            value={text}
            onChangeText={text => setText(text)}
            />
        </View>
      );
}

const styles = StyleSheet.create({
    InputBar:{
        alignItems: "end"
    }
});