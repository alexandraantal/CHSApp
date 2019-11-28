import React, { Component } from "react";
import { Linking } from "react-native";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation
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
      <View style={styles.container}>
        <Text>Hi {this.state.email}!</Text>

        <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <Button
          full
          rounded
          onPress={() => this.props.navigation.navigate("Map")}
          style={{
            marginTop: 20,
            marginHorizontal: 30,
            backgroundColor: "#6D98BA"
          }}
        >
          <Text style={{ color: "white" }}>Go To Map</Text>
        </Button>

        <Button
          full
          rounded
          // onPress={() => this.props.navigation.navigate("Map")}
          style={{
            marginTop: 20,
            marginHorizontal: 30,
            backgroundColor: "#6D98BA"
          }}
        >
          <Text style={{ color: "white" }}>Mark Yourself Safe</Text>
        </Button>

        <Button
          full
          rounded
          onPress={() => Linking.openURL(`tel:112`)}
          style={{
            marginTop: 20,
            marginHorizontal: 30,
            backgroundColor: "#6D98BA"
          }}
        >
          <Text style={{ color: "white" }}>Call 112</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
