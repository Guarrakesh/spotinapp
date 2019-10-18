import React from 'react';
import {Image, SafeAreaView, ScrollView, StatusBar, StyleSheet} from "react-native";
import {SocialIcon} from 'react-native-elements'
import {scale} from 'react-native-size-matters';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons'
import {Typography, View} from "../../components/common";
import EarningMethodCard from "../../components/GameComponents/EarningMethodCard";
import i18n from "../../i18n/i18n";
import themes from "../../newTheme";
import PrizeList from "./PrizeList";

const topViewColor = "#3A169E";
const bottomViewColor = "#500F98";
const logoGame = require("../../assets/img/logo-game/logo-game.png");
// const awards = [
//   {
//     name: "Birra",
//     image: require("../../assets/img/awards/Birra.png")
//   },
//   {
//     name: "2 Birre",
//     image: require("../../assets/img/awards/BirraX2.png")
//   },
//   {
//     name: "Panino",
//     image: require("../../assets/img/awards/Panino.png")
//   },
//   {
//     name: "Ticket",
//     image: require("../../assets/img/awards/Ticket.png")
//   }
// ];

const earningMethods = [
  {
    image: "https://seeklogo.net/wp-content/uploads/2016/09/facebook-icon-preview-1-400x400.png",
    //icon: <Icon name="md-camera" color="#fff" size={48}/>,
    icon: <SocialIcon
      type='instagram'
      style={{backgroundColor: 'rgba(185,45,92,1)'}}
    />,
    title: i18n.t("game.catalogScreen.earningMethods.instagramStory.title"),
    //tag: "@spotin",
    active: true,
    subtitle: i18n.t("game.catalogScreen.earningMethods.instagramStory.subtitle"),
    profit: 100
  },
  {
    icon: <SocialIcon
      type='instagram'
      style={{backgroundColor: 'rgba(185,45,92,1)'}}
    />,
    title: i18n.t("game.catalogScreen.earningMethods.followInstagram.title"),
    tag: "@spotin_sport",
    active: false,
    subtitle: i18n.t("game.catalogScreen.earningMethods.followInstagram.subtitle"),
    profit: 25
  },
  {
    icon: <SocialIcon
      type='facebook'
    />,
    title: i18n.t("game.catalogScreen.earningMethods.followFb.title"),
    tag: "Spot In",
    active: false,
    subtitle: i18n.t("game.catalogScreen.earningMethods.followFb.subtitle"),
    profit: 25
  },

];



const CatalogScreen = (props) => {
  const [navState, setNavState] = React.useState({
    index: 0,
    routes: [
      { key: 'first', title: i18n.t("game.catalogScreen.catalog") },
      { key: 'second', title: i18n.t("game.catalogScreen.howToEarn") },
    ],
  });





  const HowToEarn = (_props) => {


    console.log("PROPS: ", props);
    React.useEffect(() => {
      if (props.navigation.state.params && props.navigation.state.params.method) {
        setTimeout(() => _props.jumpTo('second'), 500);
        props.navigation.setParams({method: false});
      }

    });

    return(
        <View>
          <Typography variant={"display1"} style={styles.howToEarn}>{i18n.t("game.catalogScreen.earnSpotCoins")}</Typography>
          <ScrollView

              style={styles.methodsList} contentContainerStyle={styles.methodsListContainer}>
            {
              earningMethods.map((item, index) => (
                  <EarningMethodCard method={item}/>
              ))
            }

          </ScrollView>
        </View>
    )
  };

  const renderTabBar = (props) => {
    return (
        <TabBar
            style={{backgroundColor: 'transparent'}}
            labelStyle={styles.catalog}
            textTransform={'none'}
            {...props}
            indicatorStyle={{backgroundColor: themes.base.colors.white.light, height: 2.5}}
            navigationState={navState}/>
    );
  };




  return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={"light-content"}/>

        <View style={styles.topView}>
          <Image source={logoGame} resizeMode={'contain'} style={styles.logoGame}/>
          <Icon
              onPress={() => props.navigation.goBack()}
              color={themes.base.colors.white.light}
              name="ios-arrow-round-back"
              style={styles.backArrow}
              size={48}/>
        </View>
        <View style={styles.bottomView}/>
        <TabView
            style={styles.tabView}
            // activeColor={'red'}
            // indicatorStyle={{ color: 'red', backgroundColor: 'red'}}
            //indicatorContainerStyle={{ backgroundColor: 'red' }}
            onIndexChange={index => setNavState({...navState,  index })}
            renderScene={SceneMap({
              first: PrizeList,
              second: HowToEarn,
            })}
            renderTabBar={(props) => renderTabBar(props)}
            navigationState={navState}/>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A169E',
  },
  logoGame: {
    width: themes.base.deviceDimensions.width/2,
    height: themes.base.deviceDimensions.width/11,
    alignSelf: 'center',
    position: 'absolute',
    top: 8
  },
  backArrow: {
    position: 'absolute',
    top: 0,
    left: 16
  },
  topView: {
    height: themes.base.deviceDimensions.height/4,
    backgroundColor: topViewColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  catalog: {
    color: themes.base.colors.white.light,
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: "900",
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: bottomViewColor,
  },
  tabView: {
    position: 'absolute',
    top: themes.base.deviceDimensions.width/4,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },

  howToEarn: {
    alignSelf: 'center',
    color: 'yellow',
    marginTop: 16,
  },
  methodsList: {
    marginTop: themes.base.deviceDimensions.height/30,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: themes.base.deviceDimensions.height/10
  },
  methodsListContainer: {
    alignItems: "center",
    alignSelf: 'stretch',
    paddingBottom: themes.base.deviceDimensions.height/10,

  },

});

export default CatalogScreen;
