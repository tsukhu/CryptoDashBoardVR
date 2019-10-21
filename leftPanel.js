import React from "react";
import { Animated, Text, View } from "react-360";
import styles from "./stylesheet";
import { connect } from "./store";

class LeftPanel extends React.Component {
  state = {
    cryptocurrency: {
      open: "",
      close: "",
      high: "",
      low: "",
      volumefrom: "",
      volumeto: ""
    },
    fade: new Animated.Value(0)
  };
  /*
    "time":1570665600,
    "high":8672.58,
    "low":8466.13,
    "open":8593.16,
    "volumefrom":29187.08,
    "volumeto":250267419.87,
    "close":8596.57,
    "conversionType":"direct",
    "conversionSymbol":""
    */
  componentDidMount() {
    this.fetchCryptoData(this.props.crypto);
    Animated.timing(this.state.fade, {
      toValue: 1,
      duration: 3000
    }).start();
  }

  fetchCryptoData = crypto => {
    fetch(
      `https://min-api.cryptocompare.com/data/histoday?fsym=${crypto}&tsym=USD`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          cryptocurrency: {
            open: data["Data"][30]["open"],
            close: data["Data"][30]["close"],
            high: data["Data"][30]["high"],
            low: data["Data"][30]["low"],
            volumefrom: data["Data"][30]["volumefrom"],
            volumeto: data["Data"][30]["volumeto"]
          }
        });
      });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.crypto !== this.props.crypto) {
      this.fetchCryptoData(this.props.crypto);
    }
  }

  render() {
    const { cryptocurrency, fade } = this.state;
    return (
      <Animated.View
        style={[
          styles.wrapper,
          {
            opacity: fade
          }
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.textSize}>Crypto</Text>
        </View>
        <View>
          <Text>Price Statistics</Text>
          <Text>High: {cryptocurrency.high}</Text>
          <Text>Low: {cryptocurrency.low}</Text>
          <Text>Open: {cryptocurrency.open}</Text>
          <Text>Close: {cryptocurrency.close}</Text>
          <Text>Volume From: {cryptocurrency.volumefrom}</Text>
          <Text>Volume To: {cryptocurrency.volumeto}</Text>
        </View>
      </Animated.View>
    );
  }
}

const ConnectLeftPanel = connect(LeftPanel);

export default ConnectLeftPanel;
