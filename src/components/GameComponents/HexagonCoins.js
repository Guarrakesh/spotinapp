import React from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, Text, StyleSheet } from "react-native";
import themes from "../../newTheme";
import {Fonts} from "../common/Fonts";
import {verticalScale} from "react-native-size-matters";

const img = require("../../assets/img/hexagonCoin/hexagonCoin.png");

const HexagonCoins = (props) => {

  const { number, size } = props;

  return (
    <ImageBackground
      style={[styles.backgroundImg, { width: size, height: size}]}
      source={img}
    >
      <Text style={[styles.number, { fontSize: size/5, marginTop: size/5 }]}>
        {number}
      </Text>
    </ImageBackground>
  )
};

HexagonCoins.propTypes = {
  number: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  backgroundImg: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  number: {
    color: themes.base.colors.white.light,
    fontFamily: Fonts.LatoBlack,
  }
});

export default HexagonCoins;
