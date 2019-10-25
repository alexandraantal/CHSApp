import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Go to map"
          onPress={() => this.props.navigation.navigate("Map")}
        />
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
