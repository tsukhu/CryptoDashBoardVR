import React from "react";
import { Animated, asset, AppRegistry, View } from "react-360";
import Entity from "Entity";
import { connect } from "./store";
import ConnectLeftPanel from "./leftPanel";
import ConnectRightPanel from "./rightPanel";

const AnimatedEntity = Animated.createAnimatedComponent(Entity);

export default class CryptoModel extends React.Component {
  state = {
    rotation: new Animated.Value(0),
    bounceValue: new Animated.Value(0.5)
  };

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.rotation, {
        toValue: 360,
        duration: 6000
      })
    ).start();
  }

  rotations = {
    BTC: {
      rotateX: 90,
      rotateY: 0,
      rotateZ: this.state.rotation
    },
    DASH: {
      rotateX: 0,
      rotateY: this.state.rotation,
      rotateZ: 0
    },
    XMR: {
      rotateX: 0,
      rotateY: this.state.rotation,
      rotateZ: 0
    },
    ZEN: {
      rotateX: 0,
      rotateY: this.state.rotation,
      rotateZ: 0
    }
  };

  render() {
    return (
      <View>
        <AnimatedEntity
          style={{
            transform: [
              { scaleX: 1 },
              { scaleY: 1 },
              { scaleZ: 1 },
              { rotateX: this.rotations[`${this.props.crypto}`].rotateX },
              { rotateY: this.rotations[`${this.props.crypto}`].rotateY },
              { rotateZ: this.rotations[`${this.props.crypto}`].rotateZ }
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
