import React, { Component } from "react";
import { Linking } from "react-native";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  ImageBackground
} from "react-native";

import { Button } from "native-base";

import * as firebase from "firebase";

import Firebase from "./../components/Firebase";

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import settingTimerWorkAround from "./../settingTimerWorkAround";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = { email: "", displayName: "" };

  registerForPushNotifications = async () => {
    //Check for existing permissions
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = status;

    //If no existing permissions, ask user for permission
    if (status != "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalState = status;
    }

    //If no permission, exit function
    if (finalStatus != "granted") {
      return;
    }

    //Get push notification token
    let token = await Notifications.getExpoPushTokenAsync();

    //Add token to firebase
    let uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users")
      .child(uid)
      .update({
        expoPushToken: token
      });
  };

  componentDidMount() {
    this.registerForPushNotifications();
    const { email, displayName } = firebase.auth().currentUser;

    this.setState({ email, displayName });
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require("./../images/background.jpg")}
      >
        <View style={styles.container}>
          <Text
            style={{
              marginTop: 20,
              marginBottom: 0,
              fontSize: 20,
              color: "#09414D"
            }}
          >
            Hello,{" "}
            <Text style={{ fontWeight: "bold" }}>{this.state.displayName}</Text>
            !
          </Text>

          <Button
            full
            rounded
            onPress={() => this.props.navigation.navigate("Map")}
            style={{
              marginTop: 15,
              marginHorizontal: 30,
              backgroundColor: "#F5F5F5"
            }}
          >
            <Text style={{ color: "#0E687A" }}>Go To Map</Text>
          </Button>

          <Button
            full
            rounded
            onPress={() => Linking.openURL(`tel:112`)}
            style={{
              marginTop: 20,
              marginHorizontal: 30,
              backgroundColor: "#F5F5F5"
            }}
          >
            <Text style={{ color: "#0E687A" }}>Call 112</Text>
          </Button>

          <Button
            full
            rounded
            onPress={this.signOutUser}
            style={{
              marginTop: 50,
              marginHorizontal: 30,
              backgroundColor: "#0E687A"
            }}
          >
            <Text style={{ color: "#F5F5F5" }}>Logout</Text>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});
