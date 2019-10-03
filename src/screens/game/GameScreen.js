import React from 'react';
import {Image, StyleSheet, Text} from "react-native";
import {Input} from "react-native-elements";
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from "react-redux";
import {Typography, View} from "../../components/common";
import LinearGradient from 'react-native-linear-gradient';
import themes from "../../newTheme";
import {Fonts} from "../../components/common/Fonts";
import Button from "../../components/common/Button";
import i18n from "../../i18n/i18n";
import {useCoupon} from "../../actions/coupon";

const rugbyMascotte = require("../../assets/img/mascots/rugby/Rugby.png");
const motoriMascotte = require("../../assets/img/mascots/motori/Motori.png");
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
      code: ""
    };

  }

  componentDidMount(): void {

  }

  handleUseCoupon() {

    this.props.useCoupon(this.state.code);

  }

  handleInsertCode() {
    this.bottomSheetRef.snapTo(1);
  }

  bottomSheetContent = () => {
    return(
      <View style={styles.bottomSheetContentContainer}>
        <Typography variant={"title"} style={styles.receiveAward}>Ricevi il tuo premio!</Typography>
        <Typography variant={"caption"} style={styles.insertCode}>inserisci codice coupon:</Typography>
        <Input
          shake={true}
          onChangeText={(text) => this.setState({code: text})}
          inputContainerStyle={styles.codeInputText}
          containerStyle={styles.codeInputContainer}
          textAlignVertical={'center'}
          textAlign={'center'}
          textDecorationColor={'red'}
          textStyle={{color: 'red', textTransform: 'uppercase', fontSize: 200}}
          fontWeight={"900"}
          rightIcon={() => <Icon
            onPress={() => this.handleUseCoupon()}
            name={"ios-arrow-round-forward"}
            style={{marginRight: 16}}
            color={greenColor}
            size={40}/>}
        />
        <Typography variant={"heading"} style={styles.moreSpotCoin}>{"Vuoi ricevere altri\nSpot Coin?"}</Typography>
        <Button
          titleStyle={styles.discoverHowButtonTitle}
          containerStyle={styles.discoverHowButtonContainer}
        >
          SCOPRI COME
        </Button>
        <Typography variant={"caption"} style={styles.regulationText}>regolamento</Typography>
      </View>
    )
  }

  bottomSheetHeader() {

    return(
      <View style={styles.bottomSheetHeaderContainer}>
        <Image source={logoImg} style={styles.logoImg} resizeMode={'contain'}/>
      </View>
    )

  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return(
      <View style={styles.container}>
        <LinearGradient colors={[gradientFirstColor, gradientSecondColor]} style={{flex: 1}}>
          <View>
            <Image source={logoGame} resizeMode={'contain'} style={styles.logoGame}/>
          </View>
          <Image style={styles.gameMascotte} source={gameMascotte} resizeMode={'contain'}/>
          <View style={styles.titleContainer}>
            <Typography style={styles.aNewWay}>{i18n.t("game.gameScreen.aNewWay")}</Typography>
            <Typography style={styles.toSeeSport}>{i18n.t("game.gameScreen.toSeeSport")}</Typography>
            <Typography style={styles.moreInfo}>{i18n.t("game.gameScreen.moreInfo")}</Typography>
          </View>
          <View style={styles.coinsContainer}>
            <View style={styles.coinsNumberContainer}>
              <Image source={coinsImg} style={styles.coinsIcon}/>
              <Typography style={styles.coinsNumberText}>{this.props.spotCoins}</Typography>
            </View>
            <Typography style={styles.collectedCoins}>{i18n.t("game.gameScreen.collectedCoins")}</Typography>
            <Button titleStyle={styles.insertButtonTitle} containerStyle={styles.insertButtonContainer} onPress={() => this.handleInsertCode()}>
              {i18n.t("game.gameScreen.insertCode")}
            </Button>
          </View>
          <Typography style={styles.seeCatalog} onPress={() => this.props.navigation.navigate("CatalogScreen")}>{i18n.t("game.gameScreen.seeCatalog")}</Typography>
        </LinearGradient>
        <BottomSheet
          ref={ref => this.bottomSheetRef = ref}
          snapPoints={[0, themes.base.deviceDimensions.height*(3/4)]}
          renderContent={this.bottomSheetContent}
          renderHeader = {this.bottomSheetHeader}
        />
      </View>
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
    paddingBottom: themes.base.deviceDimensions.height/30,
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
    paddingLeft: 16,
    paddingRight : 16,
    paddingTop: 5,
    paddingBottom: 5,
    width: themes.base.deviceDimensions.width/1.5,
    marginTop: themes.base.deviceDimensions.height/50
  },
  insertButtonTitle: {
    color: themes.base.colors.white.light,
    fontSize: 16,
    fontWeight: "900"
  },
  seeCatalog: {
    color: 'yellow',
    alignSelf: 'center',
    marginTop: 8,
    fontWeight: "900",
    fontSize: 16
  },
  bottomSheetHeaderContainer: {
    backgroundColor: gradientSecondColor,
    borderTopLeftRadius: themes.base.borderRadius*3,
    borderTopRightRadius: themes.base.borderRadius*3,
    padding: 32
  },
  bottomSheetContentContainer: {
    backgroundColor: gradientSecondColor,
    height: themes.base.deviceDimensions.height,
    padding: 32
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
  codeInputContainer: {
    backgroundColor: themes.base.colors.white.light,
    borderRadius: themes.base.borderRadius,
    width: '100%',
    padding: 5,
    height: themes.base.deviceDimensions.height/15,
    marginTop: 16,
    borderWidth: 0
  },
  codeInputText: {
    fontSize: 100,
    borderColor: 'transparent',
    textTransform: 'uppercase'
  },
  moreSpotCoin: {
    color: themes.base.colors.white.light,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: themes.base.deviceDimensions.height/10
  },
  discoverHowButtonContainer: {
    alignSelf: 'center',
    borderRadius: themes.base.borderRadius,
    backgroundColor: greenColor,
    paddingTop: 5,
    paddingBottom: 5,
    width: themes.base.deviceDimensions.width/1.5,
    marginTop: themes.base.deviceDimensions.height/40
  },
  discoverHowButtonTitle: {
    color: themes.base.colors.white.light,
    fontSize: 22,
    fontWeight: "900"
  },
  regulationText: {
    color: 'yellow',
    alignSelf: 'center',
    fontFamily: Fonts.LatoItalic,
    marginTop: themes.base.deviceDimensions.height/15
  }
});

export default connect(state => ({
  spotCoins: state.auth.profile.spotCoins ? state.auth.profile.spotCoins : 0
}), {
  useCoupon
})(GameScreen);