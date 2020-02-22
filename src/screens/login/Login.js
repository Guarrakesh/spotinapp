import React, { useState, useEffect } from 'react';
import {withNamespaces} from "react-i18next";
import {verticalScale} from "react-native-size-matters";
import {G, Path, Svg} from "react-native-svg";
import Icon from "react-native-vector-icons/FontAwesome";
import {Dimensions, Image, StyleSheet, Text, Animated, BackHandler, SafeAreaView,} from 'react-native';
import ActivityIndicator from "../../components/ActivityIndicator/ActivityIndicator";

import {View, Touchable} from "../../components/common";
import Button from "../../components/common/NewButton";
import themes from "../../styleTheme";
import LoginTab from "./LoginTab";
import SvgWave from "./SvgWave";
const Logo = require('../../assets/img/logo/logo.png');

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedTouchable = Animated.createAnimatedComponent(Touchable);


const { width, height} = Dimensions.get('screen');
const Login = ({
                 t,
                 goBack,
                 onSignIn,
                 onSignUp,
                 onPasswordForgot,
                 facebookLogin,
                 loading,
               }) => {

  const [onBottom, setOnBottom] = useState(false);
  const [signType, setSignType] = useState('signin');
  const [y] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(1));
  const [logoScale] = useState(new Animated.Value(1));
  const [logoY] = useState(new Animated.Value(0));
  const [tabBarY] = useState(new Animated.Value(-100));

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (onBottom) {
        setOnBottom(false);
        return true;
      } else {
        return false;
      }
    });
    return () => {
      backHandler.remove();
    }
  });

  const Tabbar = React.memo(() =>
      <LoginTab
          onSignIn={onSignIn}
          onSignUp={onSignUp}
          onPasswordForgot={onPasswordForgot}
          activeTab={signType}
      />);
  useEffect(() => {
    Animated.parallel([
      Animated.spring(y, {damping: 15, mass: 1,toValue: onBottom ? height/2.15   : 0, useNativeDriver: true}),
      Animated.spring(opacity, { toValue: onBottom ? 0 : 1, useNativeDriver: true }),
      Animated.spring(logoScale, { damping: 15, mass: 1,toValue: onBottom ? 0.5 : 1, useNativeDriver: true}),
      Animated.spring(logoY, { damping: 15, mass: 1,toValue: onBottom ? -150 : 0, useNativeDriver: true }),
      Animated.spring(tabBarY, { toValue: onBottom ? 0 : -50, useNativeDriver: true})
    ]).start();
  },[onBottom]);

// const { y, opacity, logoScale, logoY  }  = useSpring({
//   y: onBottom ? height / 3 + 50 : 0,
//   opacity: onBottom ? 0 : 1,
//   logoScale: onBottom ? 0.7 : 1,
//   logoY: onBottom ? -50 : 0,
// });
// const tabTransition = useTransition(onBottom, null, {
//   from: { position: 'absolute', opacity: 0, top: height / 5 },
//   enter: { opacity: 1 },
//   leave: { opacity: 0 },
// });
  return (
      <SafeAreaView style={styles.container}>

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


        <Animated.View style={{
          position: 'absolute',
          top:themes.base.deviceDimensions.height / 6,
          height: height - height/5,
          width: '100%',
          opacity: Animated.subtract(1, opacity),
          transform: [ { translateY: tabBarY }]
        }}>
          <Tabbar/>
        </Animated.View>


        <AnimatedSvg
            style={{ transform: [ { translateY: y }] }}

            height={Dimensions.get('window').height - 200}
            width={Dimensions.get('window').width}
        >
          <G>
            <SvgWave pathProps={{fill: themes.base.colors.accent.default}}/>
            <SvgWave pathProps={{scale: 1.5, fill: themes.base.colors.accent.default}}/>

          </G>
        </AnimatedSvg>
        {onBottom && <AnimatedTouchable
            clear
            style={[styles.backButton, { opacity: Animated.subtract(1,opacity) }]}
            onPress={() => setOnBottom(false)}
        ><Icon
            color={colors.text.dark}
            name='arrow-left'
            size={32}/></AnimatedTouchable>
        }
        <AnimatedView style={[styles.mainContentViewWrapper, {
          opacity,
          transform: [ { translateY: y }]
        }]}>
          {loading
              ? <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                <ActivityIndicator color="#fff"/>
                <Text style={{ marginTop: verticalScale(16), color: '#fff', fontWeight: 'bold'}}>{t("auth.login.loadingText")}</Text>
              </View>
              : (
                  <React.Fragment>
                    <Button
                        elevation={0}
                        disabled={onBottom}
                        block
                        uppercase
                        containerStyle={[{backgroundColor: themes.commonColors.facebook},
                          {borderRadius: 12, paddingTop: 8, paddingBottom: 8, marginBottom: 24}]}
                        titleStyle={{color: '#fff'}}
                        onPress={facebookLogin}
                        icon={<Icon
                            name='facebook'
                            size={18}
                            color='white'
                        />
                        }
                        iconContainerStyle={{alignSelf: 'flex-start'}}
                    >{t("auth.login.facebookSignIn")}</Button>
                    <Button
                        disabled={onBottom}
                        block
                        uppercase
                        round
                        containerStyle={{ marginBottom: 14 }}
                        buttonStyle={{ borderRadius: 12, backgroundColor: 'red'}}
                        onPress={() => { setOnBottom(!onBottom); setSignType('signin') }}
                        iconContainerStyle={{alignSelf: 'flex-start'}}
                    >{t("auth.login.signIn")}</Button>
                    <Button
                        disabled={onBottom}
                        block
                        uppercase
                        round
                        titleStyle={{color: '#fff'}}
                        onPress={() => { setOnBottom(!onBottom); setSignType('signup') }}
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
                        containerStyle={{marginTop: 24}}
                        onPress={() => goBack()}
                        titleStyle={{ color: '#fff'}}
                    > {t("auth.login.later").toString().toUpperCase()}
                    </Button>
                  </React.Fragment>
              )

          }

        </AnimatedView>
      </SafeAreaView>
  )
};

const colors = themes.base.colors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    top: height / 2,
    position: 'absolute',
    height: height / 3,
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,

  },
  mainContentFlex: {
    position: 'relative',
    flexDirection: 'column',
    width: '100%',

  },
  backButton: {
    position: 'absolute',
    bottom: height / 6,
    left: 'auto',
    zIndex: 100,

  }

});
export default withNamespaces()(Login);
