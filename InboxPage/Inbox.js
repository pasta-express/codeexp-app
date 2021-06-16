import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList} from "react-native";
import { List, Colors } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import ConversationScreen from "./Conversation";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const contacts = [
  {id: "0", name: "Jerry", color: Colors.blue500},
  {id: "1", name: "Fairy", color: Colors.green500},
  {id: "2", name: "Larry", color: Colors.purple500},
  {id: "3", name: "Harry", color: Colors.orange500},
  {id: "4", name: "Merlin", color: Colors.red500}
  
]

function InboxScreen({ navigation }) {
  return (
    <SafeAreaView>
      <FlatList style={styles.list} data={contacts} renderItem={renderContact}/>
    </SafeAreaView>
  );

}

function renderContact({item}){
  return <ContactItem name={item.name} color={item.color}/>
}

function ContactItem (props) {
  const navigation = useNavigation();
  const color = props.color
  return (
      <List.Item
      title={props.name}
      left={() => <List.Icon color={props.color} icon="circle" />}
      onPress= {()=>navigation.navigate({
        name: "Conversation", 
        params: {contact: props.name, color: props.color}})}
      />
  )
}

export default function InboxStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inbox" component={InboxScreen} />
      <Stack.Screen name="Conversation" component={ConversationScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderBottomColor: "black",
    //alignText:'left',
    height: 60,
    fontSize: 40,
    fontWeight: "bold",
    width: "100%",
  },
});

  

// function InboxScreen({ navigation }) {
//   return (
//     <List.Section>
//         <List.Item
//         title="Jerry"
//         left={(props) => <List.Icon color={Colors.red500} icon="circle" />}
//         onPress= {()=>navigation.navigate("Conversation")}
//         />
//         <List.Item
//         title="Fairy"
//         left={(props) => <List.Icon {...props} icon="circle" />}
//         onPress= {()=>navigation.navigate("Conversation")}
//         />
//     </List.Section>
//   );
// }