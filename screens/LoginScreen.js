import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import * as firebase from "firebase";

import Firebase from "../components/Firebase";

import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label
} from "native-base";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  logInUser = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(user) {
          console.log(user);
        });
    } catch (error) {
      console.log(error.toString());
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
            />
          </Item>

          <Button
            style={{
              marginTop: 20,
              marginHorizontal: 30,
              backgroundColor: "#6D98BA"
            }}
            full
            rounded
            onPress={() =>
              this.logInUser(this.state.email, this.state.password)
            }
          >
            <Text style={{ color: "white" }}>Log In</Text>
          </Button>

          <Button
            style={{
              marginTop: 20,
              marginHorizontal: 30,
              backgroundColor: "#C17767"
            }}
            full
            rounded
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text style={{ color: "white" }}>
              New around? Create An Account
            </Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});
