import React from "react";
import {
  asset,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton
} from "react-360";
import Entity from "Entity";
import Config from "react-native-config";
import { connect, nextCrypto } from "./store";

export default class CryptoModel extends React.Component {
  render() {
    return (
      <View>
        <Entity
          style={{
            transform: [
              { scaleX: 1 },
              { scaleY: 1 },
              { scaleZ: 1 },
              { rotateX: 90 }
            ]
          }}
          source={{
            obj: asset(`models/${this.props.crypto}.obj`),
            mtl: asset(`models/${this.props.crypto}.mtl`)
          }}
        />
      </View>
    );
  }
}

class LeftPanel extends React.Component {
  state = {
    cryptocurrency: {
      open: "",
      close: "",
      high: "",
      low: "",
      volumefrom: "",
      volumeto: ""
    }
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
    const { cryptocurrency } = this.state;
    return (
      <View style={styles.wrapper}>
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
      </View>
    );
  }
}

class RightPanel extends React.Component {
  state = {
    cryptoData: {
      symbol: "",
      algorithm: "",
      proofType: "",
      blockNumber: "",
      blockTime: "",
      blockReward: ""
    }
  };

  clickHandler = index => {
    nextCrypto(index);
  };

  componentDidMount() {
    this.fetchCryptoData(this.props.crypto);
  }

  fetchCryptoData = crypto => {
    fetch(
      `https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${crypto}&tsym=USD&api_key=${Config.API_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          cryptoData: {
            symbol: data["Data"][0]["CoinInfo"]["Name"],
            algorithm: data["Data"][0]["CoinInfo"]["Algorithm"],
            proofType: data["Data"][0]["CoinInfo"]["ProofType"],
            blockNumber: data["Data"][0]["CoinInfo"]["BlockNumber"],
            blockTime: data["Data"][0]["CoinInfo"]["BlockTime"],
            blockReward: data["Data"][0]["CoinInfo"]["BlockReward"]
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
    const { cryptoData } = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.textSize}>Information</Text>
        </View>
        <View>
          <Text>Symbol: {cryptoData.symbol}</Text>
          <Text>Algorithm: {cryptoData.algorithm}</Text>
          <Text>Proof Type: {cryptoData.proofType}</Text>
          <Text>Block Number: {cryptoData.blockNumber}</Text>
          <Text>Block Time: {cryptoData.blockTime}</Text>
          <Text>Block Reward: {cryptoData.blockReward}</Text>
        </View>
        <View>
          <VrButton
            style={styles.button}
            onClick={() => this.clickHandler(this.props.index)}
          ></VrButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: 300,
    height: 600,
    backgroundColor: "#00171F",
    borderColor: "#003459",
    borderWidth: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    padding: 10
  },
  header: {
    backgroundColor: "#003459"
  },
  textSize: {
    fontSize: 30,
    textAlign: "center"
  },
  button: {
    height: 60,
    width: 60,
    backgroundColor: `green`
  }
});

const ConnectLeftPanel = connect(LeftPanel);
const ConnectRightPanel = connect(RightPanel);
const ConnectCryptoModel = connect(CryptoModel);

AppRegistry.registerComponent("ConnectCryptoModel", () => ConnectCryptoModel);
AppRegistry.registerComponent("ConnectLeftPanel", () => ConnectLeftPanel);
AppRegistry.registerComponent("ConnectRightPanel", () => ConnectRightPanel);
