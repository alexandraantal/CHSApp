import React, { Component } from "react";

import { StyleSheet } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import AuthHomeScreen from "./../screens/AuthHomeScreen";
import LoginScreen from "./../screens/LoginScreen";
import SignUpScreen from "./../screens/SignUpScreen";

const RootAuthNavigator = createStackNavigator(
  {
    AuthHome: { screen: AuthHomeScreen },
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen }
  },
  {
    initialRouteName: "AuthHome"
  }
);

const AuthNavigatorContainer = createAppContainer(RootAuthNavigator);

class AuthNavigator extends React.Component {
  render() {
    return <AuthNavigatorContainer />;
  }
}

export default AuthNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
