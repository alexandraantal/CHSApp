import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../images/logo.png")}
        style={{ height: 150, width: 150 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});

export default Logo;
