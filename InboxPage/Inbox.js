import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity} from "react-native";
import { List, Colors } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import ConversationScreen from "./Conversation";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const Stack = createStackNavigator();

const contacts = [
  {id: "0", name: "Jerry", color: Colors.blue500},
  {id: "1", name: "Fairy", color: Colors.green500},
  {id: "2", name: "Larry", color: Colors.purple500},
  {id: "3", name: "Harry", color: Colors.orange500},
  {id: "4", name: "Merlin", color: Colors.red500},
  // {id: "5", name: "Merlin", color: Colors.red500},
  // {id: "6", name: "Merlin", color: Colors.red500},
  // {id: "7", name: "Merlin", color: Colors.red500},
  // {id: "8", name: "Merlin", color: Colors.red500},
  // {id: "9", name: "Merlin", color: Colors.red500},
  // {id: "10", name: "Merlin", color: Colors.red500},
  // {id: "11", name: "Merlin", color: Colors.red500},
  // {id: "12", name: "Merlin", color: Colors.red500},
  // {id: "13", name: "Merlin", color: Colors.red500},
  
]

function InboxScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.Container}>
        <FlatList style={styles.list} data={contacts} renderItem={renderContact} nestedScrollEnabled/>
    </SafeAreaView>
  );

}

function renderContact({item}){
  return <ContactItem name={item.name} color={item.color}/>
}

// function ContactItem (props) {
//   const navigation = useNavigation();
//   return (
//       <List.Item
//       title={props.name}
//       left={() => <List.Icon color={props.color} icon="circle" />}
//       onPress= {()=>navigation.navigate({
//         name: "Conversation", 
//         params: {contact: props.name}})}
//       />
//   )
// }

function ContactItem (props) {
  const navigation = useNavigation();
  return (
      <SafeAreaView style={styles.ContactBox}>
        <FontAwesome name="circle" color="red" style={styles.ContactIcon}/>
        <TouchableOpacity onPress= {()=>navigation.navigate({
          name: "Conversation", params: {contact: props.name}})} 
          style={styles.ContactTouchable}>
          <Text style={{fontSize: "30%", fontWeight: "200"}}>{props.name}</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
  Container: {
    flex:1,
  },

  ContactBox: {
    backgroundColor: "white",
    borderBottomColor: "black",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    flex: 1,
  },

  ContactTouchable: {
    flex:20,
    height: 100,
    justifyContent: "center",
    fontSize: 100,
    fontWeight: "bold",
  },

  ContactIcon: {
    paddingLeft: 10,
    flex:1
  }
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