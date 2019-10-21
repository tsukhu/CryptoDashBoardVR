import React from "react";
import {
  asset,
  AppRegistry,
  View,
} from "react-360";
import Entity from "Entity";
import { connect } from "./store";
import ConnectLeftPanel from './leftPanel'
import ConnectRightPanel from './rightPanel'

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

const ConnectCryptoModel = connect(CryptoModel);

AppRegistry.registerComponent("ConnectCryptoModel", () => ConnectCryptoModel);
AppRegistry.registerComponent("ConnectLeftPanel", () => ConnectLeftPanel);
AppRegistry.registerComponent("ConnectRightPanel", () => ConnectRightPanel);
