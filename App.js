import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
//import { Google } from 'expo';

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Map: { screen: MapScreen }
});

const App = createAppContainer(MainNavigator);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
