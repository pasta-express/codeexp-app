import * as React from "react";

import { View, Text, StyleSheet, FlatList, TextInput, SafeAreaView} from "react-native";

import { Card, List, Colors} from "react-native-paper";

const profile = {"Merlin": Colors.grey500, "Jerry": Colors.red500}

// const SAMPLE_CONVERSATION=[{
// id:"0",
// user:"Merlin",
// data: "Hello"
// }]

export default function ConversationScreen({navigation, route}) {
  const [conversation, setConversation] = React.useState([
  ])
  const [text, setText] = React.useState("");

  function SendMessage(){
    setConversation([
      ...conversation, 
      {user:"Merlin", data:text, id:`${conversation.length}`},
      {user: route.params?.contact, data:text, id:`${conversation.length + 1}`}
    ])
    setText('');
  }

  return (
    <SafeAreaView style={styles.Container}>
      <SafeAreaView style={{flex: 10}}>
        <FlatList style={styles.list} data={conversation} renderItem={renderMsg}/>
      </SafeAreaView>
      <SafeAreaView style={{flex: 1}}> 
        <TextInput style={styles.InputBar}
          placeholder="Send a message"
          value={text}
          onChangeText={setText}
          onSubmitEditing = {SendMessage}
          />
      </SafeAreaView>
    </SafeAreaView>
  );

}

function renderMsg({item}){
  return <MsgBubble user={item.user} text={item.data}/>
}


const MsgBubble = (props) => {
  const color = profile[props.user]
  return (
    <List.Item
    title={props.user}
    description={props.text}
    left={(props) => <List.Icon color={color} icon="circle" />}
    />
  )
}

const styles = StyleSheet.create({
  InputBar: {
      height: 40,
      margin: 12,
      borderWidth: 1,
  },
  Container:{
    backgroundColor: "white",
    flexDirection: "column"
  },

  list:{
  },

  listContainer:{
    flex: 10
  }

});
