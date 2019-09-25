import React from 'react';
import {Image, StyleSheet, Text} from "react-native";
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
const coinsImg = require("../../assets/img/coins.png");
const greenColor = themes.base.colors.accent.default;
const gradientFirstColor = "#3A169E";
const gradientSecondColor = "#500F98";
const pointsBackground = "#6314BF";

class GameScreen extends React.Component {

  constructor(){
    super();
  }

  componentDidMount(): void {

  }

  handleUseCoupon() {

    this.props.useCoupon("R54479");

  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return(
      <View style={styles.container}>
        <LinearGradient colors={[gradientFirstColor, gradientSecondColor]} style={{flex: 1}}>
          <View>
            <Text>SPOT IN GAME</Text>
          </View>
          <View style={styles.mascotsContainer}>
            <Image style={styles.leftMascotte} source={rugbyMascotte} resizeMode={'contain'}/>
            <Image style={styles.rightMascotte} source={motoriMascotte} resizeMode={'contain'}/>
          </View>
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
            <Button titleStyle={styles.insertButtonTitle} containerStyle={styles.insertButtonContainer} onPress={() => this.handleUseCoupon()}>
              {i18n.t("game.gameScreen.insertCode")}
            </Button>
          </View>
          <Typography style={styles.seeCatalog} onPress={() => this.props.navigation.navigate("CatalogScreen")}>{i18n.t("game.gameScreen.seeCatalog")}</Typography>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mascotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -themes.base.deviceDimensions.height/25
  },
  leftMascotte: {
    //width: themes.base.deviceDimensions.width/2,
    marginRight: -themes.base.deviceDimensions.width/2.5,
    zIndex: 1,
    marginTop: themes.base.deviceDimensions.height/8
  },
  rightMascotte: {
    //width: themes.base.deviceDimensions.width/2
  },
  titleContainer: {
    zIndex: -1,
    marginTop: -themes.base.deviceDimensions.height/9,
    paddingTop: themes.base.deviceDimensions.height/13,
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
    fontSize: 28,
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
    marginTop: 16,
    fontWeight: "900",
    fontSize: 16
  }
});

export default connect(state => ({
  spotCoins: state.auth.profile.spotCoins ? state.auth.profile.spotCoins : 0
}), {
  useCoupon
})(GameScreen);