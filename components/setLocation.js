import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { AsyncStorage } from "react-native";
export class SetLocation extends Component {
  constructor() {
    super();
    this.state = {
      myKey: ""
    };
  }
  saveData = value => {
    this.setState({
      myKey: value
    });
  };
  setAsyncStorage = () => {
    AsyncStorage.setItem("myKey", this.state.myKey);
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.formInput}
            onChangeText={text => this.saveData(text)}
            onSubmitEditing={this.setAsyncStorage}
          />
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
              backgroundColor: "#DDDDDD",
              height: 50,
              width: "100%",
              borderRadius: 6
            }}
            onPress={this.setAsyncStorage}
          >
            <Text
              style={{
                fontSize: 20
              }}
            >
              Set location
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF"
  },
  formInput: {
    height: 40,
    fontSize: 13,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 5,
    paddingLeft: 10
  },
  saved: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

export default SetLocation;
