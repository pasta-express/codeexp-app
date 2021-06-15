import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { List } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import ConversationScreen from "./Conversation";

function InboxScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "top", alignItems: "left" }}>

      <TouchableOpacity onPress={()=> navigation.navigate("Conversation")}>
        <Text style={styles.button}> Jerry</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();

export default function InboxStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inbox" component={InboxScreen} />
      <Stack.Screen name="Conversation" component={ConversationScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
    button:{
      backgroundColor: 'white',
      borderBottomColor: 'black',
      alignText:'left',
      height: 60,
      fontSize: 40,
      fontWeight: "bold",
      width: "100%"
    }
  });

  

// function InboxScreen({ navigation }) {
//   return (
//     <List.Section>
//         <List.Item
//         title="Jerry"
//         left={(props) => <List.Icon {...props} icon="circle" />}
//         onPress= {()=>{console.log("hello")}}
//         />
//         <List.Item
//         title="Merlin"
//         left={(props) => <List.Icon {...props} icon="circle" />}
//         onPress= {()=>navigation.navigate("Conversation")}
//         />
//     </List.Section>
//   );
// }