import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Button } from "native-base";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
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
          onPress={() => this.props.navigation.navigate("Login")}
          style={{
            marginTop: 20,
            marginHorizontal: 30,
            backgroundColor: "#C17767"
          }}
        >
          <Text style={{ color: "white" }}>Log In</Text>
        </Button>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
