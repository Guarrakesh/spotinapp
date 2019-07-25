import React, { useState } from 'react';
import {withNamespaces} from "react-i18next";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {G, Path, Svg} from "react-native-svg";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSpring, animated, useTransition } from "react-spring/native";
import {Dimensions, Image, StyleSheet, Text, Animated} from 'react-native';

import {View} from "../../components/common";
import Button from "../../components/common/Button";
import themes from "../../styleTheme";
import LoginTab from "./LoginTab";
const Logo = require('../../assets/img/logo/logo.png');

const AnimatedImage = animated(Image);
const AnimatedView = animated(View);
const AnimatedSvg = animated(Svg);
const AnimatedText = animated(Text);
const SvgPath = ({pathProps}) => (
    <Path

        d={`
              M0 1
              C0 1, 32 92.5771, 182.5 34.0386
              C333 -24.5, 388 11.5386, 388 11.5386
              V${height - 200}
              H0
              L0 1
              Z`}
        fill={themes.base.colors.accent.default}
        {...pathProps}
    />

);
const { width, height} = Dimensions.get('screen');
const Login = ({t}) => {

  const [onBottom, setOnBottom] = useState(false);

  const { y, opacity, logoScale, logoY  }  = useSpring({
    y: onBottom ? height / 3 + 50 : 0,
    opacity: onBottom ? 0 : 1,
    logoScale: onBottom ? 0.7 : 1,
    logoY: onBottom ? -50 : 0,
  });
  const tabTransition = useTransition(onBottom, null, {
    from: { position: 'absolute', opacity: 0, top: height / 5 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
      <View style={styles.container}>
        <AnimatedImage
            source={Logo}
            style={[styles.logo, { transform: [ { scale: logoScale }, { translateY: logoY }]}]}
            resizeMode={"contain"} />
        <AnimatedText
            style={{...styles.title, opacity }}
            allowFontScaling={false}>
          {t("auth.login.title").toUpperCase()}
        </AnimatedText>
        <AnimatedText
            style={{...styles.subtitle, opacity }}
            allowFontScaling={false}>
          {t("auth.login.subtitle")}
        </AnimatedText>
        <Button onPress={() => setOnBottom(!onBottom)} title="ciao"/>

        {tabTransition.map(({ item, key, props}) => (
            item &&
            <AnimatedView key={key} style={props}>
              <LoginTab/>
            </AnimatedView>
        ))}
        <AnimatedSvg
            style={{ transform: [ { translateY: y }] }}

            height={Dimensions.get('window').height - 200}
            width={Dimensions.get('window').width}
        >
          <G>
            <SvgPath pathProps={{fill: themes.base.colors.accent.default}}/>
            <SvgPath pathProps={{scale: 1.5, fill: themes.base.colors.accent.dark}}/>

          </G>
        </AnimatedSvg>
        <AnimatedView style={[styles.mainContentViewWrapper, {
          opacity,
          transform: [ { translateY: y }]
        }]}>
            <Button
                block
                uppercase
                containerStyle={[{backgroundColor: themes.commonColors.facebook},
                  {borderRadius: 12, paddingTop: 8, paddingBottom: 8, marginBottom: 24}]}
                titleStyle={{color: '#fff'}}

                icon={<Icon
                    name='facebook'
                    size={18}
                    color='white'
                />
                }
                iconContainerStyle={{alignSelf: 'flex-start'}}
            >{t("auth.login.facebookSignIn")}</Button>
            <Button
                block
                uppercase
                round
                containerStyle={{ marginBottom: 14 }}


                iconContainerStyle={{alignSelf: 'flex-start'}}
            >{t("auth.login.signIn")}</Button>
            <Button
                block
                uppercase
                round
                titleStyle={{color: '#fff'}}

                containerStyle={[
                  { backgroundColor: 'transparent' ,
                    borderWidth: 2,
                    borderColor: '#fff',
                  }
                ]}

                iconContainerStyle={{alignSelf: 'flex-start'}}
            >{t("auth.login.register")}</Button>
            <Button
                block
                clear
                containerStyle={{position: 'absolute',bottom: 12}}
                titleStyle={{ color: '#fff'}}
            > {t("auth.login.later").toString().toUpperCase()}
            </Button>
        </AnimatedView>
      </View>
  )
};

const colors = themes.base.colors;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: "#ffffff"
  },
  logo: {
    marginTop: themes.base.deviceDimensions.height/10,
    height: 80,

  },
  title: {
    marginTop: 40,
    fontSize: 18,
    fontFamily: themes.base.fonts.LatoBlack,
    color: colors.accent.default,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  subtitle: {
    marginBottom: 20,
    marginTop: 8,
    fontSize: 16,
    fontFamily: themes.base.fonts.LatoMedium,
    color: colors.text.default,
    textAlign: 'center'
  },
  mainContentViewWrapper: {
    top: height / 2 + 40,
    position: 'absolute',
    height: height / 3,

  },
  mainContentFlex: {
    position: 'relative',
    flexDirection: 'column',

  }

});
export default withNamespaces()(Login);