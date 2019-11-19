import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
//import { Google } from 'expo';

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import AuthHomeScreen from "./screens/AuthHomeScreen";
import HomeScreen from "./screens/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen";
import MapScreen from "./screens/MapScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Map: MapScreen
});

const AuthStack = createStackNavigator({
  AuthHome: AuthHomeScreen,
  Login: LoginScreen,
  SignUp: SignUpScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
