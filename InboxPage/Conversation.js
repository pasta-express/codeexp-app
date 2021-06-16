import * as React from "react";

import { View, Text, StyleSheet, FlatList, SafeAreaView} from "react-native";

import { TextInput, List, Colors} from "react-native-paper";

const profile = {"You": Colors.grey500, "Jerry": Colors.blue500}

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

  function InputBar(){
    return( <TextInput style={styles.InputBar}
      placeholder="Send a message"
      value={text}
      onChangeText={setText}
      right={<TextInput.Icon name="send" onPress={SendMessage}/>}
      />
    );
  }

  return (
    <SafeAreaView style={styles.Container}>
      <SafeAreaView style={styles.ListContainer}>
        <FlatList style={styles.list} data={conversation} renderItem={renderMsg}/>
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
  
  listContainer:{
    flex: 10
  },

  InputContainer: {
      height: 40,
      margin: 12,
      flex: 1,
<<<<<<< HEAD
      //absolute:""
=======
>>>>>>> 08d4ea03896fad4098fb583a028dc5c971b41130
  },

  List:{
    
  }

});
