import React, { Component } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { AsyncStorage } from "react-native";
import CurrentWeather from "./components/CurrentWeather";
import ForcastWeather from "./components/ForcastWeather";
import backgroudImg from "./assets/clouds.jpg";
import SetLocation from "./components/setLocation";
import { createStackNavigator, createAppContainer } from "react-navigation";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      dataForecast: null,
      isLoading: true,
      myKey: null
    };
  }

  componentDidMount() {
    this.checkAsyncStoreForKey();
  }
  checkAsyncStoreForKey = () => {
    AsyncStorage.getItem("myKey")
      .then(value => {
        this.setState({ myKey: value });
      })
      .done();
  };
  render() {
    const { myKey } = this.state;
    return (
      <AppContainer>
        <View
          style={{
            flex: 1
          }}
        >
          {myKey ? (
            <ImageBackground
              source={backgroudImg}
              style={{
                flex: 1
              }}
            >
              <CurrentWeather myKey={this.state.myKey} />
              <ForcastWeather myKey={this.state.myKey} />
            </ImageBackground>
          ) : (
            <SetLocation />
          )}
        </View>
      </AppContainer>
    );
  }
}
const RootStack = createStackNavigator(
  {
    Home: SetLocation
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);
const styles = StyleSheet.create({});
