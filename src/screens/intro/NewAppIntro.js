import React from 'react';
import {StyleSheet, View, Image, SafeAreaView} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AppIntroSlider from 'react-native-app-intro-slider';
import { withNamespaces } from "react-i18next";
import {verticalScale} from "react-native-size-matters";
import { Typography, Button } from "../../components/common";
import themes from '../../newTheme';
import Images from '../../assets/images';
import i18n from "../../i18n/i18n";

const logoImg = require("../../assets/img/logo-white/logo-white.png");
const rugbyMascotte = require("../../assets/img/mascots/rugby/Rugby.png");
const motoriMascotte = require("../../assets/img/mascots/motori/Motori.png");
const coinsImg = require("../../assets/img/coins.png");
const greenColor = themes.base.colors.accent.default;
const gradientFirstColor = "#3A169E";
const gradientSecondColor = "#500F98";
const bottomViewBackground = "#6314BF";
const yellowColor = themes.base.colors.yellow.default;

const slides = ({t}) => [
  {
    key: 'slide1',
    titleTop: t("newIntro.slide1.titleTop"),
    titleBottom: t("newIntro.slide1.titleBottom"),
    titleTopFontSize: 24,
    titleBottomFontSize: 22,
    bottomText: t("newIntro.slide1.bottomText"),
    image: Images.icons.sports.martial
  },
  {
    key: 'slide2',
    titleTop: t("newIntro.slide2.titleTop"),
    titleBottom: t("newIntro.slide2.titleBottom"),
    titleTopFontSize: 24,
    titleBottomFontSize: 50,
    bottomText: t("newIntro.slide2.bottomText"),
    image: Images.icons.sports.football
  },
  {
    key: 'slide3',
    titleTop: t("newIntro.slide3.titleTop"),
    titleBottom: t("newIntro.slide3.titleBottom"),
    titleTopFontSize: 24,
    titleBottomFontSize: 27,
    bottomText: t("newIntro.slide3.bottomText"),
    buttonText: t("newIntro.slide3.buttonText"),
    image: Images.icons.sports.motori
  },
  {
    key: 'slide4',
    titleTop: t("newIntro.slide4.titleTop"),
    titleBottom: t("newIntro.slide4.titleBottom"),
    titleTopFontSize: 24,
    titleBottomFontSize: 28,
    bottomText: t("newIntro.slide4.bottomText"),
    buttonText: t("newIntro.slide4.buttonText"),
    image: Images.icons.sports.rugby
  },

];

class NewAppIntro extends React.Component {

  renderItem = props => (
    <View style={styles.slideView}>
      <Image source={props.image} resizeMode={'contain'} style={styles.mascotteImg}/>
      <View style={styles.titleView}>
        <Typography variant={"title"} style={[styles.titleStyle, {fontSize: props.titleTopFontSize}]}>{props.titleTop.toUpperCase()}</Typography>
        <Typography variant={"heading"} style={[styles.titleStyle, {fontSize: props.titleBottomFontSize}]}>{props.titleBottom.toUpperCase()}</Typography>
      </View>
      {
        props.buttonText ?
          <Button
            containerStyle={styles.actionButton}
            titleStyle={styles.buttonTitle}
            onPress={this.props.navigation.state.params.onGetStarted}>
            {props.buttonText}
          </Button> : null
      }
      <Typography style={styles.bottomTextStyle}>{props.bottomText}</Typography>
    </View>
  );

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (

      <SafeAreaView style={styles.container}>
        <View style={styles.gradientContainer}>
          <LinearGradient colors={[gradientFirstColor, gradientSecondColor]} style={styles.backgroundGradient}>
            <Image source={logoImg} style={styles.logoImg} resizeMode={'contain'}/>
            <View style={styles.bottomView}/>
          </LinearGradient>
        </View>
        <View style={styles.sliderContainer}>
          <AppIntroSlider
            slides={slides({t: this.props.t})}
            nextLabel={null}
            doneLabel={null}
            renderItem={this.renderItem}
            dotStyle={styles.dots}
            activeDotStyle={styles.activeDot}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  backgroundGradient: {
    flex: 1,
    alignItems: 'center'
  },
  logoImg: {
    position: 'absolute',
    top: verticalScale(40),
    width: themes.base.deviceDimensions.width/4,
    height: 50
  },
  bottomView: {
    backgroundColor: bottomViewBackground,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: themes.base.deviceDimensions.height/3
  },
  sliderContainer: {
    flex: 1
  },
  slideView: {
    flex: 1,
    width: themes.base.deviceDimensions.width,
    alignItems: 'center',
  },
  mascotteImg: {
    width: themes.base.deviceDimensions.height*(2/5),
    height: themes.base.deviceDimensions.height*(2/5),
    marginTop: themes.base.deviceDimensions.height/20
  },
  titleView: {
    alignItems: 'center',
    marginTop: -themes.base.deviceDimensions.height/40
  },
  titleStyle: {
    color: themes.base.colors.white.light,
    fontWeight: "900"
  },
  actionButton: {
    position: 'absolute',
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: greenColor,
    borderRadius: themes.base.borderRadius,
    bottom: themes.base.deviceDimensions.height*(3/10)
  },
  buttonTitle: {
    color: themes.base.colors.white.light,
    fontSize: 16,
    fontWeight: "900"
  },
  bottomTextStyle: {
    position: 'absolute',
    color: themes.base.colors.white.light,
    fontSize: 16,
    fontWeight: '700',
    bottom: themes.base.deviceDimensions.height/6,
    textAlign: 'center'
  },
  dots: {
    backgroundColor: themes.base.colors.white.light
  },
  activeDot: {
    backgroundColor: yellowColor
  }
});

export default withNamespaces()(NewAppIntro);
