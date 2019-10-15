import React from 'react';
import {StyleSheet, Image} from "react-native";
import {View, Touchable, Typography} from "../common";
import themes from "../../newTheme";
import {Fonts} from "../common/Fonts";

const coinsImg = require("../../assets/img/coins.png");

const EarningMethodCard = (props) => {

  const { method } = props;
  const { image, title, tag, subtitle, icon, profit, active } = method;

  return (
    <View style={[styles.container, { opacity: active ? 1 : 0.4 }]}>
      <Touchable disabled style={styles.innerTouchable}>
        <View style={styles.innerContainer}>
          <View style={styles.imageView}>
            {icon ? icon : <Image resizeMode={'cover'} style={styles.methodImg} source={{uri: image}}/>}
            <View style={{flexDirection: "row", justifyContent: 'center'}}>
              <Image source={coinsImg} style={styles.coinsImg}/>
              <Typography style={styles.profitText}>{profit}</Typography>
            </View>
          </View>
          <View style={styles.textView}>
            <Typography style={styles.title} variant={"title"}>{title}</Typography>
            {tag && <Typography style={styles.tag} variant={"title"}>{tag}</Typography>}
            <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
              <Typography variant={"caption"} style={styles.moreInfoText}>{subtitle}</Typography>
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
  imageView: {
    flexBasis: 54,
    flexGrow: 0,
    alignItems: 'center'
  },
  textView: {
    marginLeft: 16,
    flexGrow: 2,
  },
  title: {
    fontSize: 18,
    color: themes.base.colors.white.light
  },
  tag: {
    color: themes.base.colors.accent.default
  },
  moreInfoText: {
    flex: 1,
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
