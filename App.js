import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
//import { Google } from 'expo';

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import AuthHomeScreen from "./screens/AuthHomeScreen";
import HomeScreen from "./screens/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen";
import MapHomeScreen from "./screens/MapHomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MapMarkerScreen from "./screens/MapMarkerScreen";
import MapBuildingScreen from "./screens/MapBuildingScreen";
import MapRouteScreen from "./screens/MapRouteScreen";

const AppTabNavigator = createBottomTabNavigator({
  RefugePoints: {
    screen: MapMarkerScreen,
    navigationOptions: {
      title: "Refuge Points",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-locate" size={24} color={tintColor} />
      )
    }
  },
  BuildingRiskRates: {
    screen: MapBuildingScreen,
    navigationOptions: {
      title: "Building Risk Rates",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-home" size={24} color={tintColor} />
      )
    }
  },
  EscapeRoute: {
    screen: MapRouteScreen,
    navigationOptions: {
      title: "Escape Route",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-flag" size={24} color={tintColor} />
      )
    }
  }
});

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Map: AppTabNavigator
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
