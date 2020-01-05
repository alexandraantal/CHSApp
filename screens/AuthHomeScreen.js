import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { Button } from "native-base";
import Logo from "./../components/Logo";

class AuthHomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require("./../images/background.jpg")}
      >
        <View style={styles.container}>
          <Button
            full
            rounded
            onPress={() => this.props.navigation.navigate("Login")}
            style={{
              marginTop: 60,
              marginHorizontal: 30,
              backgroundColor: "#F5F5F5"
            }}
          >
            <Text style={{ color: "#0E687A" }}>Log In</Text>
          </Button>

          <Button
            full
            rounded
            onPress={() => this.props.navigation.navigate("SignUp")}
            style={{
              marginTop: 20,
              marginHorizontal: 30,
              backgroundColor: "#F5F5F5"
            }}
          >
            <Text style={{ color: "#0E687A" }}>Sign Up</Text>
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

export default AuthHomeScreen;

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
