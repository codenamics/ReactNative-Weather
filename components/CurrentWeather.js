import React, { Component } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import wind from "../assets/wind.png";
import press from "../assets/press.png";
import hum from "../assets/hum.png";
import axios from "axios";
import { AsyncStorage } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
export default class CurrenteWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.myKey,
      isLoading: true
    };
  }
  componentDidMount() {
    const { location } = this.state;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=4e2b39896dcc3622534cc498191bdc35`
      )
      .then(res =>
        this.setState({
          data: res.data,
          isLoading: false
        })
      )
      .catch(err => console.log(err));
  }
  async removeItemValue() {
    AsyncStorage.removeItem("myKey");
    this.props.navigation.navigate("Home");
  }
  render() {
    const { data } = this.state;
    const { isLoading } = this.state;
    console.log(data);
    return (
      <View
        style={{
          flex: 1.5
        }}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.currentWeather}>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "flex-end",
                backgroundColor: "#DDDDDD",
                marginTop: 25,

                height: 40,
                width: 40,
                borderRadius: 100
              }}
              onPress={this.removeItemValue}
            >
              <Text
                style={{
                  fontSize: 20
                }}
              >
                X
              </Text>
            </TouchableOpacity>
            <View style={styles.currentWeather}>
              <Text style={styles.location}> {data.name} </Text>
              <Text
                style={{
                  fontSize: 45,
                  ...white,
                  fontWeight: "600"
                }}
              >
                {data.main.temp} & #8451;
              </Text>
              <Text
                style={{
                  fontSize: 45,
                  ...white
                }}
              >
                {data.weather[0].main}
              </Text>
            </View>
            <View style={styles.currentConditionsRow}>
              <View
                style={{
                  ...centerXY
                }}
              >
                <Image
                  source={hum}
                  style={{
                    ...Icon
                  }}
                />
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 25
                  }}
                >
                  {data.main.humidity}
                </Text>
              </View>
              <View
                style={{
                  ...centerXY
                }}
              >
                <Image
                  source={press}
                  style={{
                    ...Icon
                  }}
                />
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 25
                  }}
                >
                  {data.main.pressure}
                </Text>
              </View>
              <View
                style={{
                  ...centerXY
                }}
              >
                <Image
                  source={wind}
                  style={{
                    ...Icon
                  }}
                />
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 25
                  }}
                >
                  {data.wind.speed}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export const white = {
  color: "#fff"
};
export const centerXY = {
  justifyContent: "center",
  alignItems: "center"
};
export const Icon = {
  width: 30,
  height: 30,
  marginBottom: 5
};
const styles = StyleSheet.create({
  currentWeather: {
    flex: 2,
    ...centerXY,
    padding: 20
  },
  location: {
    fontSize: 55,
    ...white,
    fontWeight: "700"
  },
  currentConditionsRow: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    fontSize: 55
  }
});
