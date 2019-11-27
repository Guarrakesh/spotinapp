import React from 'react';
import LinearGradient from "react-native-linear-gradient";
import themes from "../../newTheme";
import {Image, SafeAreaView, ScrollView, StyleSheet} from "react-native";
import {Button, Typography, View} from "../../components/common";
import Icon from "react-native-vector-icons/Ionicons";
import PrizeCircle from "../../components/GameComponents/PrizeCircle";
import {moderateScale, verticalScale} from "react-native-size-matters";
import HexagonCoins from "../../components/GameComponents/HexagonCoins";
import i18n from "../../i18n/i18n";
const logoGame = require("../../assets/img/logo-game/logo-game.png");

function PrizeConfirmationScreen(props) {

  const award = props.navigation.state.params.award;

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[themes.base.colors.purple.dark, themes.base.colors.purple.default]}
        style={{flex: 1}}
      >
        <ScrollView bounces={false} style={{flex: 1}}>
          <View style={styles.container}>
            <View style={styles.topView}>
              <Image
                source={logoGame}
                resizeMode={'contain'}
                style={styles.logoGame}
              />
              <Icon
                onPress={() => props.navigation.goBack()}
                color={themes.base.colors.white.light}
                name="ios-arrow-round-back"
                style={styles.backArrow}
                size={48}/>
              <View style={styles.awardCard}>
                <PrizeCircle disabled award={award}/>
                <View style={{marginTop: verticalScale(-24)}}>
                  <HexagonCoins
                    number={award.cost}
                    size={moderateScale(70)}
                  />
                </View>
                <Typography
                  variant={"heading"}
                  style={styles.awardName}
                >
                  {award.name}
                </Typography>
              </View>
            </View>
            <View style={styles.bottomView}>
              <Typography variant={'body'} style={styles.info}>
                In quale locale vorresti riscattare il tuo premio?
              </Typography>
              <Button
                disabled={false}
                disabledStyle={{borderRadius: themes.base.borderRadius}}
                titleStyle={styles.awardRequestButtonTitle}
                containerStyle={styles.awardRequestButtonContainer}
                //onPress={() => bottomSheet.current.snapTo(1)}
              >
                {i18n.t("game.prizeDetailScreen.requestPrize")}
              </Button>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: themes.base.colors.purple.dark
  },
  container: {
    flex: 1,
  },
  logoGame: {
    width: themes.base.deviceDimensions.width/2,
    height: themes.base.deviceDimensions.width/11,
    alignSelf: 'center',
    top: 8
  },
  backArrow: {
    position: 'absolute',
    top: 0,
    left: 16
  },
  topView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomView: {
    alignItems: 'center',
    paddingBottom: verticalScale(16),
    paddingTop: verticalScale(24)
  },
  awardCard: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: verticalScale(32)
  },
  awardName: {
    color: themes.base.colors.white.light,
    marginTop: verticalScale(24)
  },
  info: {
    color: themes.base.colors.white.light,
    width: '80%',
    lineHeight: verticalScale(20),
    paddingBottom: verticalScale(8),
    fontWeight: '900',
    textAlign: 'center',

  },
  awardRequestButtonTitle: {
    color: themes.base.colors.white.light,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 22,
    fontWeight: "900"
  },
  awardRequestButtonContainer: {
    borderRadius: themes.base.borderRadius,
    backgroundColor: themes.base.colors.accent.default,
    width: themes.base.deviceDimensions.width/1.5,
    marginTop: themes.base.deviceDimensions.height/20,
  }
});

export default PrizeConfirmationScreen;
