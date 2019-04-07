import React, { Component } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  FlatList
} from "react-native";
import moment from "moment";
import axios from "axios";

export default class ForcastWeather extends Component {
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
        `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=4e2b39896dcc3622534cc498191bdc35`
      )
      .then(res =>
        this.setState({
          dataForecast: res.data.list,
          isLoading: false
        })
      )
      .catch(err => console.log(err));
  }
  render() {
    const { dataForecast } = this.state;
    const { isLoading } = this.state;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          opacity: 0.6
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView
            style={{
              padding: 20
            }}
          >
            <FlatList
              data={dataForecast}
              keyExtractor={(item, index) => "key" + index}
              renderItem={({ item }) => (
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    paddingTop: 10,
                    paddingBottom: 10
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "left",
                      flex: 1
                    }}
                  >
                    {moment.unix(item.dt).format("ddd")}
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      flex: 1
                    }}
                  >
                    {moment.unix(item.dt).format("HH:MM a")}
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "right",
                      flex: 1
                    }}
                  >
                    {item.weather[0].main}
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "right",
                      flex: 1
                    }}
                  >
                    {item.main.temp}&#8451;
                  </Text>
                </View>
              )}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}
