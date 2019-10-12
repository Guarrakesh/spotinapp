import React from 'react';
import {Image, ScrollView, StyleSheet, Alert, ActivityIndicator, Text} from "react-native";
import {scale, verticalScale} from "react-native-size-matters";
import BottomSheet from 'reanimated-bottom-sheet';
import * as Animatable from 'react-native-animatable';
import AnimateNumber from 'react-native-animate-number';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from "react-redux";
import {Typography, View} from "../../components/common";
import LinearGradient from 'react-native-linear-gradient';
import TextInput from "../../components/common/TextView/TextInput";
import themes from "../../newTheme";
import {Fonts} from "../../components/common/Fonts";
import Button from "../../components/common/Button";
import NewButton from "../../components/common/NewButton";
import i18n from "../../i18n/i18n";
import {useCoupon} from "../../actions/coupon";
import MakeItRain from "../../components/GameComponents/MakeItRain";
import FormErrorBox from "../../components/common/FormError/FormErrorBox";
import Touchable from '../../components/common/Touchable';
const rugbyMascotte = require("../../assets/img/mascots/rugby/Rugby.png");
const soccerMascotte = require("../../assets/img/mascots/soccer/Soccer.png");
const gameMascotte = require("../../assets/img/mascots/gameMascotte/gameMascotte.png");
const logoGame = require("../../assets/img/logo-game/logo-game.png");
const coinsImg = require("../../assets/img/coins.png");
const logoImg = require('../../assets/img/logo-white/logo-white.png');
const greenColor = themes.base.colors.accent.default;
const gradientFirstColor = "#3A169E";
const gradientSecondColor = "#500F98";
const pointsBackground = "#6314BF";

class GameScreen extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      code: null,
      coinRain: false,
      couponError: null,
      showCongratulation: false,
      showError: false
    };

    this.handleDiscoverHowPress = this.handleDiscoverHowPress.bind(this);

  }

  componentDidMount(): void {

  }



  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    if(this.props.usedCoupon !== prevProps.usedCoupon){
      if(this.props.usedCoupon[this.props.usedCoupon.length - 1].value) {
        //this.bottomSheetRef.snapTo(0);
        //this.showAlert();
        this.setState({coinRain: true, code: "", showCongratulation: true});
        this.bottomSheetContentRef.fadeOut().then(() => this.congratulationAppear());
        this.codeInput.clear();

      }
      else {
        const error = this.props.usedCoupon[this.props.usedCoupon.length - 1].errorCode;

        this.setState({couponError: this.couponErrorHandler(error), showError: true})
      }
    }
  }

  congratulationAppear() {
    this.congratulationRef.fadeInUpBig().then(() => this.setState({ showCongratulation: true }));
  }

  couponErrorHandler(error) {
    switch (error) {
      case 11:
        return i18n.t("game.gameScreen.couponErrors.notValid");
      case 12:
        return i18n.t("game.gameScreen.couponErrors.alreadyUsed");
      case 13:
        return i18n.t("game.gameScreen.couponErrors.notExist");
      case 14:
        return i18n.t("game.gameScreen.couponErrors.expired");
      default:
        return i18n.t("game.gameScreen.couponErrors.notValid");
    }
  };

  shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {

    if(
        nextProps.spotCoins !== this.props.spotCoins ||
        nextProps.usedCoupon !== this.props.usedCoupon ||
        nextProps.isLoading !== this.props.isLoading ||
        nextProps.isLoggedIn !== this.props.isLoggedIn ||
        nextState.coinRain !== this.state.coinRain ||
        nextState.couponError !== this.state.couponError ||
        nextState.showError !== this.state.showError ||
        nextState.code !== this.state.code
    ){
      return true;
    }
    else
      return false;

  }



  handleUseCoupon = () => {
    this.props.useCoupon(this.state.code);
  }

  handleInsertCode = () => {
    if(this.props.isLoggedIn) {
      this.bottomSheetRef.snapTo(1);
    }
    else {
      this.props.navigation.navigate("Auth")
    }
  }

  inputRightIcon = () => {
    const { code, showError } = this.state;
    const disabled = !code || code === '';
    return (
        <Touchable

            disabled={disabled || showError}
            style={[styles.inputIcon, {
              backgroundColor: disabled ?
                  themes.base.colors.text.default : (showError ? themes.base.colors.danger.light : themes.base.colors.accent.default)}]}
            onPress={this.handleUseCoupon}>
          <Icon
              color={themes.base.colors.white.light}
              name={!showError ? "check" : "exclamation"}
              size={40}/>
        </Touchable>
    )
  };

  handleInputChangeText = (text) => {
    this.setState({ code: text.toUpperCase(), showError: false });
  };

  handleDiscoverHowPress = () => {
    this.bottomSheetRef.snapTo(0);
    this.props.navigation.navigate("CatalogScreen", { method: true });
  };

  bottomSheetContent = () => {
    return(
        <View style={styles.bottomSheetContentContainer}>
          <Animatable.View style={{}} ref={ref => this.bottomSheetContentRef = ref}>
            <Typography variant={"title"} style={styles.receiveAward}>{i18n.t("game.gameScreen.bottomSheet.receiveAward")}</Typography>
            <Typography variant={"caption"} style={styles.insertCode}>{i18n.t("game.gameScreen.bottomSheet.insertCoupon")}</Typography>
            <TextInput
                hasError={this.state.showError}
                value={this.state.code}
                ref={ref => this.codeInput = ref}
                autoCapitalize="characters"
                //shake={true}
                onChangeText={this.handleInputChangeText}
                containerStyle={{marginTop: verticalScale(16), height: 55, paddingRight: 0, paddingTop: 0, paddingBottom: 0} }
                style={[styles.codeInputText, { height: 55 }]}
                fontWeight={"900"}
                append={this.inputRightIcon()}
            />
            <Typography variant={"heading"} style={styles.moreSpotCoin}>{i18n.t("game.gameScreen.bottomSheet.receiveMore")}</Typography>
            <Button
                uppercase
                titleStyle={styles.discoverHowButtonTitle}
                containerStyle={styles.discoverHowButtonContainer}
                onPress={this.handleDiscoverHowPress}
            >
              {i18n.t("game.gameScreen.bottomSheet.discoverHow")}
            </Button>
            <Typography variant={"caption"} style={styles.regulationText}>{i18n.t("game.gameScreen.bottomSheet.regulation")}</Typography>
          </Animatable.View>
          <Animatable.View
              ref={ref => this.congratulationRef = ref}
              style={styles.congratulationView}
              pointerEvents={this.state.showCongratulation ? "auto" : "none"}>
            <Image source={soccerMascotte} style={styles.soccerMascotte} resizeMode={'contain'}/>
            <Typography variant={"title"} style={styles.congratulationText}>CONGRATULAZIONI!</Typography>
            <Typography variant={"heading"} style={styles.youWonText}>
              {"Hai vinto "}
              <Typography variant={"title"} style={{color: 'yellow'}}>
                {this.props.usedCoupon ? this.props.usedCoupon[this.props.usedCoupon.length - 1].value : 0}
              </Typography>
              {" Spot Coins!"}
            </Typography>
            <NewButton
                block
                uppercase
                round
                onPress={() => this.handleCongratulationHide()}
            >
              OK
            </NewButton>
          </Animatable.View>
        </View>
    )
  };

  handleCongratulationHide() {
    this.setState({showCongratulation: false, coinRain: false});
    this.congratulationRef.fadeOut(0);
    this.bottomSheetContentRef.fadeIn(0);
    this.bottomSheetRef.snapTo(0);
  }

  bottomSheetHeader = () => {

    return(
        <View style={styles.bottomSheetHeaderContainer}>
          <Image source={logoImg} style={styles.logoImg} resizeMode={'contain'}/>
        </View>
    )

  };



  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return(
        <React.Fragment>
          <FormErrorBox
              autoHideDuration={3000}
              errors={[this.state.couponError]} show={this.state.showError} onSwipeAway={() => this.setState({showError: false})}/>
          <View style={styles.container}>
            <LinearGradient colors={[gradientFirstColor, gradientSecondColor]} style={{flex: 1}}>
              <ScrollView bounces={false}>
                <Image source={logoGame} resizeMode={'contain'} style={styles.logoGame}/>
                <Image style={styles.gameMascotte} source={gameMascotte} resizeMode={'contain'}/>
                <View style={styles.titleContainer}>
                  <Typography style={styles.aNewWay}>{i18n.t("game.gameScreen.aNewWay")}</Typography>
                  <Typography style={styles.toSeeSport}>{i18n.t("game.gameScreen.toSeeSport")}</Typography>
                  <Typography style={styles.moreInfo} onPress={() => this.setState({coinRain: !this.state.coinRain})}>{i18n.t("game.gameScreen.moreInfo")}</Typography>
                </View>
                <View style={styles.coinsContainer}>
                  {this.props.isLoggedIn ?
                      <View style={styles.coinsNumberContainer}>
                        <Image source={coinsImg} style={styles.coinsIcon}/>
                        <AnimateNumber style={styles.coinsNumberText}
                                       value={this.props.spotCoins}
                            //onFinish={() => this.showAlert()}
                                       formatter={(val) => {
                                         return parseFloat(val).toFixed(0)}}
                        />
                        {/*<Typography style={styles.coinsNumberText}>{this.props.spotCoins}</Typography>*/}
                      </View> : null
                  }
                  <Typography style={styles.collectedCoins}>{this.props.isLoggedIn ? i18n.t("game.gameScreen.collectedCoins") : i18n.t("game.gameScreen.loginToDiscover")}</Typography>
                  <Button titleStyle={styles.insertButtonTitle} containerStyle={styles.insertButtonContainer} onPress={() => this.handleInsertCode()}>
                    {this.props.isLoggedIn ? i18n.t("game.gameScreen.insertCode") : i18n.t("auth.login.signIn")}
                  </Button>
                </View>
                <Typography style={styles.seeCatalog} onPress={() => this.props.navigation.navigate("CatalogScreen")}>{i18n.t("game.gameScreen.seeCatalog")}</Typography>
              </ScrollView>
            </LinearGradient>
            <BottomSheet
                ref={ref => this.bottomSheetRef = ref}
                snapPoints={[0, themes.base.deviceDimensions.height*(3/4)]}
                renderContent={this.bottomSheetContent}
                renderHeader={this.bottomSheetHeader}
                enabledContentTapInteraction={false}
                enabledInnerScrolling={false}
                enabledGestureInteraction={!this.state.showCongratulation}
            />
            {this.state.coinRain ? <MakeItRain/> : null}
          </View>
        </React.Fragment>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoGame: {
    marginTop: 8,
    width: themes.base.deviceDimensions.width/2,
    height: themes.base.deviceDimensions.width/11,
    alignSelf: 'center'
  },
  gameMascotte: {
    alignSelf: 'center',
    width: themes.base.deviceDimensions.height*(1/3),
    height: themes.base.deviceDimensions.height*(1/3),
  },
  titleContainer: {
    zIndex: 1,
    //marginTop: -themes.base.deviceDimensions.height/15,
    //paddingTop: themes.base.deviceDimensions.height/13,
    paddingBottom: themes.base.deviceDimensions.height/50,
    alignItems: 'center'
  },
  aNewWay: {
    color: themes.base.colors.white.light,
    fontSize: 24,
    fontWeight: "900"
  },
  toSeeSport: {
    color: themes.base.colors.white.light,
    fontSize: 22,
    fontWeight: "900"
  },
  moreInfo: {
    color: 'yellow',
    fontFamily: Fonts.LatoBoldItalic,
    marginTop: 8

  },
  coinsContainer: {
    backgroundColor: pointsBackground,
    paddingTop: themes.base.deviceDimensions.height/30,
    paddingBottom: themes.base.deviceDimensions.height/30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  coinsNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  coinsIcon: {
    width: 40,
    height: 40,
    marginRight: 8
  },
  coinsNumberText: {
    color: greenColor,
    fontSize: 30,
    fontWeight: "900"
  },
  collectedCoins: {
    color: themes.base.colors.white.light,
    fontSize: 25,
    fontWeight: "900"
  },
  insertButtonContainer: {
    alignSelf: 'center',
    borderRadius: themes.base.borderRadius,
    backgroundColor: greenColor,
    width: themes.base.deviceDimensions.width/1.5,
    marginTop: themes.base.deviceDimensions.height/50
  },
  insertButtonTitle: {
    color: themes.base.colors.white.light,
    fontSize: 16,
    fontWeight: "900",
    marginLeft: 16,
    marginRight : 16,
    marginTop: 5,
    marginBottom: 5,
  },
  seeCatalog: {
    color: 'yellow',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
    fontWeight: "900",
    fontSize: 16
  },
  bottomSheetHeaderContainer: {
    backgroundColor: gradientSecondColor,
    borderTopLeftRadius: themes.base.borderRadius*3,
    borderTopRightRadius: themes.base.borderRadius*3,
    padding: 32,
    paddingBottom: 0
  },
  bottomSheetContentContainer: {
    backgroundColor: gradientSecondColor,
    height: themes.base.deviceDimensions.height,
    padding: 32,
    paddingTop: 16
  },
  logoImg: {
    width: themes.base.deviceDimensions.width/4,
    height: 50
  },
  receiveAward: {
    color: themes.base.colors.white.light
  },
  insertCode: {
    color: themes.base.colors.white.light,
    marginTop: 16
  },
  codeInputText: {
    fontSize: 100,
    borderColor: 'transparent',
    textTransform: 'uppercase',
    marginVertical: scale(16),
    marginRight: scale(16),

  },
  moreSpotCoin: {
    color: themes.base.colors.white.light,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: themes.base.deviceDimensions.height/20
  },
  discoverHowButtonContainer: {
    alignSelf: 'center',
    borderRadius: themes.base.borderRadius,
    backgroundColor: greenColor,
    width: themes.base.deviceDimensions.width/1.5,
    marginTop: themes.base.deviceDimensions.height/40
  },
  discoverHowButtonTitle: {
    color: themes.base.colors.white.light,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 22,
    fontWeight: "900"
  },
  regulationText: {
    color: 'yellow',
    alignSelf: 'center',
    fontFamily: Fonts.LatoItalic,
    marginTop: themes.base.deviceDimensions.height/25
  },
  congratulationView: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: themes.base.deviceDimensions.height/30,
    opacity: 0
  },
  soccerMascotte: {
    height: themes.base.deviceDimensions.width/2,
    width: themes.base.deviceDimensions.width/2
  },
  congratulationText: {
    marginTop: 16,
    color: themes.base.colors.white.light
  },
  youWonText: {
    marginTop: 16,
    marginBottom: 16,
    color: themes.base.colors.white.light
  },
  inputIcon: {
    position: 'absolute',
    top: -2,
    width: 80,
    right: -2,
    backgroundColor: themes.base.colors.accent.default,
    flex: 1,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    flexBasis: scale(50   ),
  }
});

export default connect(state => ({
  spotCoins: state.auth.profile.spotCoins ? state.auth.profile.spotCoins : 0,
  isLoading: state.loading > 0,
  usedCoupon: state.auth.profile.usedCoupon,
  isLoggedIn: !!state.auth.profile._id
}), {
  useCoupon
})(GameScreen);
