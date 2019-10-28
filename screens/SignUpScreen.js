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

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  signUpUser = (email, password) => {
    try {
      if (this.state.password.length < 6) {
        alert("Please entern at least 6 characters");
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password);
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
            primary
            onPress={() =>
              this.signUpUser(this.state.email, this.state.password)
            }
          >
            <Text style={{ color: "white" }}>Sign Up</Text>
          </Button>

          <Button
            style={{
              marginTop: 20,
              marginHorizontal: 30,
              backgroundColor: "#C17767"
            }}
            full
            rounded
            primary
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={{ color: "white" }}>Already a member? Log In</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});
