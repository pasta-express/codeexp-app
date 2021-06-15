import React, { Component } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { View, Text, TextInput, StyleSheet, Button, Dimensions, Image, TouchableOpacity } from "react-native";

const DismissKeyboardHOC = (Comp) => {
  return ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};
const DismissKeyboardView = DismissKeyboardHOC(View);

export default class Login extends Component {
    
  signInWithGoogleAsync = async () => {}

  render() {
      return (
        <DismissKeyboardView style={styles.container}>
          <View style={styles.container}>
            <View style={styles.form}>
              <Text style={styles.header}>Login</Text>
              <TextInput 
                style={styles.input}
                placeholder="Email"
              ></TextInput>
              <TextInput 
                style={styles.input}
                placeholder="Password"
              ></TextInput>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.signInWithGoogleAsync()
                }}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <View style={styles.signUpText}>
                <Text style={styles.smallText}>Don't have an account? </Text>
                <TouchableOpacity>
                  <Text 
                    style={styles.smallButton}
                    onPress={() => this.props.navigation.navigate("Signup")}
                    >Sign up here</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.googleBlock}>
                <Image 
                style={styles.img}
                source={require("./assets/google.png")}></Image>
                <TouchableOpacity>
                    <Text style={styles.googleText}>Continue with Google</Text>
                </TouchableOpacity>
              </View>
              

            </View>
          </View>
        </DismissKeyboardView>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#afa9cf",
    flex: 1,
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },

  form: {
    width: "80%",
    height: "60%",
    alignItems: 'center',
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "black",
    shadowRadius: 2,
    shadowOffset: {width: 3,height: 3},
    shadowOpacity: 0.2
  },

  button: {
    width: "50%",
    height: 50,
    backgroundColor: "#454771",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  header: {
    fontSize: 30,
    color: "black",
    textAlign: "center",
    marginTop: "13%",
    marginBottom: "5%",
    fontWeight: "bold"
  },

  buttonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  },

  input: {
    backgroundColor: "white",
    width: "80%",
    height: 45,
    borderWidth: 3,
    borderColor: "#CBCBCB",
    borderRadius: 50,
    shadowColor: "black",
    shadowRadius: 2,
    shadowOffset: {width: 3,height: 3},
    shadowOpacity: 0.2,
    marginTop: "5%",
    paddingLeft: 20,
  },

  signUpText: {
    marginTop: "8%",
    display:"flex",
    flexDirection: "row",
  },

  smallText: {
    fontSize: 14,
    color: "#808080",
  },

  smallButton: {
    fontSize: 14,
    color: "#808080",
    textDecorationLine: "underline"
  },

  googleText: {
    fontSize: 16,
    color: "#808080",
  },

  googleBlock: {
    marginTop: "10%",
    display:"flex",
    flexDirection: "row",
    alignItems: "center"
  },

  img: {
    width: 30,
    height: 30,
    marginRight: 10
  }
});
