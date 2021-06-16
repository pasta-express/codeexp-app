import * as React from "react";

import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity} from "react-native";

import { TextInput, List, Colors} from "react-native-paper";

import { FontAwesome } from "@expo/vector-icons";

const profile = {
  "You": Colors.grey500, 
  "Jerry": Colors.blue500,
  "Fairy": Colors.green500,
  "Larry": Colors.purple500,
  "Harry": Colors.orange500,
  "Merlin": Colors.red500}

function renderMsg({item}){
  return <MsgBubble user={item.user} text={item.data}/>
}

function MsgBubble (props) {
  return (
      <SafeAreaView style={styles.MsgBox}>
        <FontAwesome name="circle" color={profile[props.user]} size="25px" style={styles.MsgIcon}/>
        <SafeAreaView style={styles.MsgView}>
          <Text style={{fontSize:20, fontWeight:"400"}}>{props.user}</Text>
          <Text style={{fontSize:18, fontWeight:"300", color:"grey"}}>{props.text}</Text>
        </SafeAreaView>
      </SafeAreaView>
  )
}

//Must pass params:{contact: "user"}
export default function ConversationScreen({navigation, route}) {
  const contact = route.params?.contact ? route.params?.contact: "Jerry";
  const SAMPLE_CONVERSATION=[
    {id:"0", user:"You", data:"Hello!"},
    {id:"1", user:contact, data:"Hi! do you have any queries?"},
    ]

  const [conversation, setConversation] = React.useState(SAMPLE_CONVERSATION)
  const [text, setText] = React.useState("");

  function SendMessage(){
    setConversation([
      ...conversation, 
      {user:"You", data:text, id:`${conversation.length}`},
    ])
    setText('');
  }

  const InputBar = ()=> {
    return( <TextInput style={styles.InputBar}
      placeholder="Send a message"
      value={text}
      onChangeText={setText}
      onSubmitEditing={SendMessage}
      right={<TextInput.Icon name="send" onPress={SendMessage}/>}
      />
    );
  }

  return (
    <SafeAreaView style={styles.Container}>
      <SafeAreaView style={styles.ListContainer}>
        <FlatList contentContainerStyle={{ flexGrow: 1 }} data={conversation} renderItem={renderMsg}/>
      </SafeAreaView>
      <SafeAreaView style={styles.InputContainer}> 
        {InputBar()}
      </SafeAreaView>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  Container:{
    backgroundColor: "white",
    flex: 1
  },
  
  ListContainer:{
    backgroundColor: Colors.grey300,
    flex: 10,
  },

  InputContainer: {
      margin: 12,
      flex: 1,
  },
  
  MsgBox: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey300,
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    flex: 1,
  },
  
  MsgIcon: {
    flex:1,
    paddingLeft: 20,
  },


  MsgView: {
    flex:20,
    height: 100,
    justifyContent: "center",
  },
});