import * as React from "react";

import { Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity} from "react-native";

import { TextInput, Colors} from "react-native-paper";

import { FontAwesome } from "@expo/vector-icons";

import moment from "moment";

const profile = {
  "You": Colors.grey500, 
  "Jerry": Colors.blue500,
  "Fairy": Colors.green500,
  "Larry": Colors.purple500,
  "Harry": Colors.orange500,
  "Merlin": Colors.red500}

function renderMsg({item}){
  return <MsgItem user={item.user} text={item.data}/>
}

function MsgItem (props) {
  return (
      <SafeAreaView style={styles.MsgBox}>
        <SafeAreaView style ={{flex:1, alignItems:"center"}}>
          <FontAwesome name = "circle" color={profile[props.user]} size={25} style={styles.MsgIcon}/>
        </SafeAreaView>
        <SafeAreaView style={{flex:10}}>
          <SafeAreaView style={styles.MsgView}>
            <Text style={{fontSize:20, fontWeight:"400"}}>{props.user}</Text>
            <SafeAreaView style={{flex:1, flexDirection:"row"}}>
              <SafeAreaView style={{flex:4}}>
                <Text style={{fontSize:18, fontWeight:"300", color:"grey"}}>{props.text}</Text>
              </SafeAreaView>
              <SafeAreaView style={{flex:1, paddingRight:20}}>
                <Text style={{fontSize:15, fontWeight:"200", color:"grey", alignSelf:"flex-end"}}>{moment().format('LT')}</Text>
              </SafeAreaView>
            </SafeAreaView>
          </SafeAreaView>
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
    {id:"2", user:"You", data:"Yes, I'd like ask if the venue's workstations have a LAN Ports?"},
    {id:"3", user:contact, data:"Yup, do they have!"},
    {id:"4", user:"You", data:"oooh okay, thanks!"},
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
    justifyContent:"center",
  },

  MsgView: {
    marginTop:20, 
    marginBottom:20,
    paddingLeft:20,
    justifyContent:"center",
  }
});