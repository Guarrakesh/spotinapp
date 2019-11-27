import React, {useRef} from 'react';
import {connect} from "react-redux";
import {Image, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import BottomSheet from 'reanimated-bottom-sheet';
import {Button, Typography, VersionedImageField, View} from "../../components/common";
import Icon from "react-native-vector-icons/Ionicons";
import themes from "../../newTheme";
import PrizeCircle from "../../components/GameComponents/PrizeCircle";
import NewButton from "../../components/common/NewButton";
import i18n from "../../i18n/i18n";
import LinearGradient from "react-native-linear-gradient";
import HexagonCoins from "../../components/GameComponents/HexagonCoins";
const logoGame = require("../../assets/img/logo-game/logo-game.png");

const yellowColor = themes.base.colors.yellow.default;

function PrizeDetailScreen(props) {

  const award = props.navigation.state.params.award;
  const buttonDisabled = props.spotCoins < award.cost;
  const bottomSheet = useRef();

  const handleRequestPrizePress = () => {
    //bottomSheet.current.snapTo(1);
    props.navigation.navigate("BusinessRequestScreen", {award});
  };

  const bottomSheetContent = () => (
    <View style={styles.bottomSheetContainer}>
      <VersionedImageField source={award.image.versions} imgSize={styles.imgAwardSize}/>
      <Typography variant={"title"} style={styles.congratulationText}>CONGRATULAZIONI!</Typography>
      <Typography variant={"heading"} style={styles.youWonText}>
        {i18n.t("game.prizeDetailScreen.confirmBottomSheet.processRequest")}
        <Typography variant={"title"} style={{color: yellowColor}}>
          {award.grantingTime}
        </Typography>
        {i18n.t("game.prizeDetailScreen.confirmBottomSheet.hours")}
      </Typography>
      <NewButton
        block
        uppercase
        round
        onPress={() => bottomSheet.current.snapTo(0)}
      >
        OK
      </NewButton>
    </View>
  );

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
                { award.description }
              </Typography>
              <View style={styles.awardInfoContainer}>
                <View style={styles.awardInfoRow}>
                  <Typography variant={"body"} style={styles.infoRight}>
                    {i18n.t("game.prizeDetailScreen.valueInSpot")}
                  </Typography>
                  <Typography variant={"subheading"} style={styles.infoLeft}>
                    {award.cost}
                  </Typography>
                </View>
                <View
                  style={[styles.awardInfoRow, { marginTop: verticalScale(8)}]}
                >
                  <Typography variant={"body"} style={styles.infoRight}>
                    {i18n.t("game.prizeDetailScreen.yourSpot")}
                  </Typography>
                  <Typography
                    variant={"heading"}
                    style={[styles.infoLeft, { color: themes.base.colors.accent.default}]}>
                    {props.spotCoins}
                  </Typography>
                </View>
              </View>
              <Button
                disabled={buttonDisabled}
                disabledStyle={{borderRadius: themes.base.borderRadius}}
                titleStyle={styles.awardRequestButtonTitle}
                containerStyle={styles.awardRequestButtonContainer}
                onPress={() => handleRequestPrizePress()}
              >
                {i18n.t("game.prizeDetailScreen.requestPrize")}
              </Button>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
      <BottomSheet
        ref={bottomSheet}
        snapPoints={[-100, themes.base.deviceDimensions.height]}
        renderContent={bottomSheetContent}
        renderHeader={null}
        enabledGestureInteraction={false}
        enabledContentTapInteraction={false}
        enabledInnerScrolling={false}
      />
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
  awardInfoContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: verticalScale(16),
    marginTop: verticalScale(24)
  },
  awardInfoRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: themes.base.deviceDimensions.width,
    justifyContent: 'space-between',
    paddingLeft: scale(64),
    paddingRight: scale(64)

  },
  infoRight: {
    color: themes.base.colors.white.light,
    fontWeight: '900'
  },
  infoLeft: {
    color: themes.base.colors.yellow.default,
    fontWeight: '900'
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
  },
  bottomSheetContainer: {
    width: themes.base.deviceDimensions.width,
    height: themes.base.deviceDimensions.height+100,
    backgroundColor: themes.old.colors.accent.dark,
    paddingLeft: scale(32),
    paddingRight: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  imgAwardSize: {
    height: scale(200),
    width: scale(200)
  },
  congratulationText: {
    marginTop: scale(16),
    color: themes.base.colors.white.light
  },
  youWonText: {
    marginTop: scale(16),
    marginBottom: scale(50),
    color: themes.base.colors.white.light,
    textAlign: 'center'
  },
});

export default connect(state => ({
  spotCoins: state.auth.profile.spotCoins ? state.auth.profile.spotCoins : 0,
}))(PrizeDetailScreen);
