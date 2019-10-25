import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
//import { Google } from 'expo';

import FetchLocation from "../components/FetchLocation";
import UsersMap from "../components/UsersMap";

class MapScreen extends React.Component {
  state = {
    userLocation: null
  };

  // const GET_LOCATION_OPTIONS = {
  //   enableHighAccuracy: false,
  //   timeout: 20000,
  //   maximumAge: 1000,
  //  };

  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0421
          }
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FetchLocation onGetLocation={this.getUserLocationHandler} />
        <UsersMap userLocation={this.state.userLocation} />
      </View>
    );
  }
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
