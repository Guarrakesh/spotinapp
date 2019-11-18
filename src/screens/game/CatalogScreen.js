import React from 'react';
import {Image, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView, StatusBar} from "react-native";
import { SocialIcon } from 'react-native-elements'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons'
import { scale } from 'react-native-size-matters';
import {Typography, View} from "../../components/common";
import PrizeCard from "../../components/GameComponents/PrizeCard";
import useSimpleListController from '../../helpers/hooks/useSimpleListController';
import EarningMethodCard from "../../components/GameComponents/EarningMethodCard";
import themes from "../../newTheme";
import i18n from "../../i18n/i18n";
import ActivtyIndicator from '../../components/ActivityIndicator/ActivityIndicator';
import * as Animatable from 'react-native-animatable';

const topViewColor = "#3A169E";
const bottomViewColor = "#500F98";
const yellowColor = themes.base.colors.yellow.default;

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
    tag: "@spotin.sport",
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

  const CatalogList = () => {

    const { isLoading, data } = useSimpleListController('prizes', { id: 'prize_list'});

    //ordino i premi per valore in SpotCoin
    const sortedAwards = data.sort(function(a, b){return a.cost - b.cost});



    // Memoize dei dati, viene calcolato solo quando cambia isLoading
      const leftAwards = [];
      const rightAwards = [];

      for(let i = 0; i < sortedAwards.length; i++){
        if (i % 2 === 0){
          leftAwards.push(sortedAwards[i]);
        }
        else {
          rightAwards.push((sortedAwards[i]));
        }
      }



    return(
      <ScrollView bounces={false} style={{flex: 1}}>
        {isLoading
          ? <ActivityIndicator color='#fff' style={styles.catalogActivityIndicator}/>
          :
          <View style={styles.catalogView}>
            <View>
              {leftAwards.map((item, index) => (
                <PrizeCard
                  onPress={() => props.navigation.navigate("PrizeDetailScreen", { award: item })}
                  award={item}/>
              ))}
            </View>
            <View style={{marginTop: 32}}>
              {rightAwards.map((item, index) => (
                <PrizeCard
                  onPress={() => props.navigation.navigate("PrizeDetailScreen", { award: item })}
                  award={item}/>
              ))}
            </View>
          </View>

        }
      </ScrollView>
    )
  };



  const HowToEarn = (_props) => {

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
          first: CatalogList,
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
  catalogView: {
    //flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: themes.base.deviceDimensions.height/30
  },
  howToEarn: {
    alignSelf: 'center',
    color: yellowColor,
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
  gridItem: {
    margin: 16,
    borderRadius: themes.base.borderRadius*3,
    flexBasis: themes.base.deviceDimensions.width / 2 - scale(16+16) // margini laterali + margini singoli
  },
  catalogActivityIndicator: {
    alignSelf: 'center'
  }
});

export default CatalogScreen;
