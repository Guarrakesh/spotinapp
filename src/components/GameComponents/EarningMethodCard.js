import React from 'react';
import {StyleSheet, Image} from "react-native";
import {View, Touchable, Typography} from "../common";
import themes from "../../newTheme";
import {Fonts} from "../common/Fonts";

const coinsImg = require("../../assets/img/coins.png");

const EarningMethodCard = (props) => {

  const { method } = props;
  const { image, title, tag, subtitle, profit } = method;

  return (
    <View style={styles.container}>
      <Touchable style={styles.innerTouchable}>
        <View style={styles.innerContainer}>
          <View>
            <Image resizeMode={'cover'} style={styles.methodImg} source={{uri: image}}/>
          </View>
          <View style={styles.textView}>
            <Typography style={styles.title} variant={"title"}>{title}</Typography>
            <Typography style={styles.tag} variant={"title"}>{tag}</Typography>
            <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
              <Typography variant={"caption"} style={styles.moreInfoText}>maggiori info</Typography>
              <View style={{flexDirection: "row"}}>
                <Image source={coinsImg} style={styles.coinsImg}/>
                <Typography style={styles.profitText}>{profit}</Typography>
              </View>
            </View>
          </View>
        </View>
      </Touchable>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
    borderRadius: themes.base.borderRadius*2,
    overflow: 'hidden',
    opacity: 0.4
  },
  innerTouchable: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: themes.borderRadius,
  },
  innerContainer: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center"
  },
  methodImg: {
    width: 64,
    height: 64
  },
  textView: {
    marginLeft: 16
  },
  title: {
    fontSize: 18,
    color: themes.base.colors.white.light
  },
  tag: {
    color: themes.base.colors.accent.default
  },
  moreInfoText: {
    color: 'yellow',
    fontFamily: Fonts.LatoItalic,

  },
  coinsImg: {
    width: 20,
    height: 20
  },
  profitText: {
    color: themes.base.colors.accent.default,
    marginLeft: 5,
    fontFamily: Fonts.LatoBlack
  }
});

export default EarningMethodCard