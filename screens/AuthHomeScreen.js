import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import Logo from "./../components/Logo";

class AuthHomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.container}>
            <Button
              full
              onPress={() => this.props.navigation.navigate("Login")}
              style={{
                marginTop: 0,
                backgroundColor: "#6D98BA"
              }}
            >
              <Text style={{ color: "white" }}>Log In</Text>
            </Button>

            <Button
              full
              onPress={() => this.props.navigation.navigate("SignUp")}
              style={{
                marginTop: 20,
                backgroundColor: "#C17767"
              }}
            >
              <Text style={{ color: "white" }}>Sign Up</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default AuthHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  logoContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#6D98BA",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonContainer: {
    flex: 1
  }
});
