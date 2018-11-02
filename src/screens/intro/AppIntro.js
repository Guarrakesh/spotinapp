import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { withNamespaces } from 'react-i18next';
import themes from '../../styleTheme';
import Images from '../../assets/images';

const BackgroundPattern = require('../../assets/img/patterns/app-intro.png');
const nextButtonMargin = themes.base.deviceDimensions.width/5;

const slides = ({t}) => [
  {
    key: 'slide1',
    title: t("intro.slide1.title"),
    text: t("intro.slide1.message"),
    image: require('../../assets/img/logo-full.png'),
    imageStyle: {
      width: 200,
      height: 100,
      marginTop: -150,
      marginBottom: 32
    }
  },
  {
    key: 'slide2',
    title: t("intro.slide2.title"),
    text: t("intro.slide2.message"),
    image: Images.icons.intro.sportsIcon,
    imageStyle: {
      width: 120,
      height: 120,
      marginTop: -150,
      marginBottom: 32
    }
  },
  {
    key: 'slide3',
    title: t("intro.slide3.title"),
    text: t("intro.slide3.message"),
    image: Images.icons.intro.businessIcon,
    imageStyle: {
      width: 130,
      height: 120,
      marginTop: -150,
      marginBottom: 32
    }
  },
  {
    key: 'slide4',
    title: t("intro.slide4.title"),
    text: t("intro.slide4.message"),
    image: Images.icons.intro.saveIcon,
    imageStyle: {
      width: 120,
      height: 120,
      marginTop: -150,
      marginBottom: 32
    }
  },
];

class AppIntro extends React.Component {
  _renderItem = props => (
    <View style={{flex: 1}}>
      <ImageBackground
        source={BackgroundPattern}
        style={styles.imageBack}

      >
        <Image source={props.image} style={props.imageStyle}/>
        <View level={200}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.text}>{props.text}</Text>
        </View>
      </ImageBackground>
    </View>
  );

  render() {
    return (
      <AppIntroSlider

        slides={slides({t: this.props.t})}
        onDone={this.props.navigation.state.params.onGetStarted}
        renderItem={this._renderItem}
        nextLabel={this.props.t("intro.button.continue")}
        doneLabel={this.props.t("intro.button.start")}
        bottomButton
        buttonStyle={styles.nextButton}
        buttonTextStyle={styles.buttonText}
      />
    );
  }
}

const styles = StyleSheet.create({
  imageBack: {
    height: themes.base.deviceDimensions.height,
    alignItems: 'center',
    width: themes.base.deviceDimensions.width,
    paddingTop: themes.base.deviceDimensions.height / 3,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 200,
    height: 100,
    marginTop: -150,
    marginBottom: 48
  },
  text: {
    color: themes.base.colors.text.default,
    fontSize: 24,
    fontFamily: themes.base.fonts.LatoBold,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 112,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    color: themes.base.colors.text.default,
    fontFamily: themes.base.fonts.LatoLight,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
  nextButton: {
    backgroundColor: themes.base.colors.white.light,
    marginRight: nextButtonMargin,
    marginLeft: nextButtonMargin,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: themes.base.colors.accent.default,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: themes.base.colors.accent.default,
    fontFamily: themes.base.fonts.LatoBold,
    fontSize: 18
  }
});

export default withNamespaces()(AppIntro);