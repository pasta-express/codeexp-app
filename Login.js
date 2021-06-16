import React, { Component } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";
import firebase from "firebase";
import * as Google from 'expo-google-app-auth';

const DismissKeyboardHOC = (Comp) => {
  	return ({ children, ...props }) => (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<Comp {...props}>{children}</Comp>
		</TouchableWithoutFeedback>
	);
};
const DismissKeyboardView = DismissKeyboardHOC(View);

const config = {
	iosClientId:
		"730990039197-revec82u98ies30btp3f9uc72bsnhbqq.apps.googleusercontent.com",
	scopes: ["profile", "email"],
};

export default class Login extends Component {
  
	isUserEqual = (googleUser, firebaseUser) => {
		if (firebaseUser) {
			var providerData = firebaseUser.providerData;
			for (var i = 0; i < providerData.length; i++) {
				if (providerData[i].providerId === 
					firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
					providerData[i].uid === 
					googleUser.uid
				) {
					// We don't need to reauth the Firebase connection.
					return true;
				}
			}
		}
		return false;
	};

	onSignIn = (googleUser) => {
		console.log("Google Auth Response");
		// We need to register an Observer on Firebase Auth to make sure auth is initialized.
		var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
			unsubscribe();
			// Check if we are already signed-in Firebase with the correct user.
			if (!this.isUserEqual(googleUser, firebaseUser)) {
				// Build Firebase credential with the Google ID token.
				var credential = firebase.auth.GoogleAuthProvider.credential(
					googleUser.idToken,
					googleUser.accessToken, 
				);
				// Sign in with credential from the Google user.
				firebase.auth().signInWithCredential(credential)
					.then((result) => {
						console.log("user signed in");
					})
					.catch(function (error) {
						console.log(error);
					});
			} else {
				console.log("User already signed-in Firebase.");
			}
		})
		.bind(this);
	};

	signInWithGoogleAsync = async () => {
		try {
			const result = await Google.logInAsync(config);
			if (result.type === "success") {
				this.onSignIn(result);
				return result.accessToken;
			} else {
				console.log("log in failed: " + result.type)
				return { cancelled: true };
			}
		} catch (e) {
			console.log(e)
			return { error: true };
		}
	};

	render() {
		return (
			<DismissKeyboardView style={styles.container}>
				<View style={styles.container}>
					<View style={styles.form}>

						<Text style={styles.header}>Login</Text>
						<TextInput 
							style={styles.input}
							placeholder="Email"></TextInput>
						<TextInput 
							style={styles.input}
							placeholder="Password"></TextInput>

						<TouchableOpacity style={styles.button}>
							<Text style={styles.buttonText}>Login</Text>
						</TouchableOpacity>

						<View style={styles.signUpText}>
							<Text style={styles.smallText}>Don't have an account? </Text>
							<TouchableOpacity>
							<Text 
								style={styles.smallButton}
								onPress={() => navigation.navigate("Signup")}
								
								>Sign up here</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.googleBlock}>
							<Image 
								style={styles.img}
								source={require("./assets/google.png")}></Image>
							<TouchableOpacity
								onPress={() => {
									console.log("pressed")
									this.signInWithGoogleAsync()
								}}
							>
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
		backgroundColor: "#D7D7D7",
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
		backgroundColor: "black",
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
