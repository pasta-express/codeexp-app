import * as React from "react";
import { Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity} from "react-native";
import { Colors } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import ConversationScreen from "./Conversation";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";

const Stack = createStackNavigator();

const contacts = [
  {id: "0", name: "Jerry", color: Colors.blue500},
  {id: "1", name: "Fairy", color: Colors.green500},
  {id: "2", name: "Larry", color: Colors.purple500},
  {id: "3", name: "Harry", color: Colors.orange500},
  {id: "4", name: "Merlin", color: Colors.red500},  
]

function InboxScreen() {
  return (
    <SafeAreaView style={styles.Container}>
        <FlatList style={styles.list} data={contacts} renderItem={renderContact} nestedScrollEnabled/>
    </SafeAreaView>
  );

}

function renderContact({item}){
  return <ContactItem name={item.name} color={item.color}/>
}

function ContactItem (props) {
  const navigation = useNavigation();
  return (
      <SafeAreaView style={styles.ContactBox}>
        <SafeAreaView style = {{flex:1, alignItems: "center"}}>
          <FontAwesome name="circle" color={props.color} size={30} style={styles.ContactIcon}/>
        </SafeAreaView>
        <SafeAreaView style={{flex:10}}>
          <TouchableOpacity onPress= {()=>navigation.navigate({
            name: "Conversation", params: {contact: props.name}})} 
            style={styles.ContactTouchable}>
            <Text style={{fontSize:28, fontWeight:"400"}}>{props.name}</Text>
            <SafeAreaView style={{flexDirection: "row"}}>
              <SafeAreaView style={{flex: 1}}>
                <Text style={{fontSize:18, fontWeight:"200", color:"grey"}}>oooh okay, thanks!</Text>
              </SafeAreaView>
              <SafeAreaView style={{flex: 1, paddingRight:20}}>
                <Text style={{fontSize:18, fontWeight:"200", color:"grey", alignSelf:"flex-end"}}>{moment().format('LT')}</Text>
              </SafeAreaView>
            </SafeAreaView>
          </TouchableOpacity>
        </SafeAreaView>
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
    backgroundColor: Colors.grey300,
    flex:1,
  },

  ContactBox: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey300,
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    flex: 1,
  },

  ContactTouchable: {
    marginTop:20,
    marginBottom:20,
    paddingLeft: 20,
    justifyContent: "center",
  },

  ContactIcon: {
    justifyContent: "center",
  }
});