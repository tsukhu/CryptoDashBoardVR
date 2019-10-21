import React from "react";
import {
  Text,
  View,
  VrButton
} from "react-360";
import styles from './stylesheet';
import Config from "react-native-config";
import { connect, nextCrypto } from "./store";

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
  
  
  
  const ConnectRightPanel = connect(RightPanel);

  export default ConnectRightPanel;