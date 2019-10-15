import React from 'react';
import {Image, StyleSheet, ScrollView, Platform} from "react-native";
import { SocialIcon } from 'react-native-elements'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons'
import { scale, verticalScale } from 'react-native-size-matters';
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
      //light
      style={{backgroundColor: 'rgba(185,45,92,1)'}}
      //underlayColor={'rgba(223,33,74,1)'}
    />,
    title: i18n.t("game.catalogScreen.earningMethods.instagramStory.title"),
    //tag: "@spotin",
    active: true,
    subtitle: i18n.t("game.catalogScreen.earningMethods.instagramStory.subtitle"),
    profit: 25
  },
  {
    icon: <Icon name="logo-facebook" color="#fff" size={48}/>,
    title: "Seguici su Instagram",
    tag: "@spotin_sport",
    active: false,

    subtitle: "maggiori info",
    profit: 25
  },
  {
    icon: <Icon name="logo-instagram" color="#fff" size={48}/>,
    title: "Seguici su Facebook",
    tag: "@spotin",
    active: false,
    subtitle: "maggiori info",
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

    const { isLoading, data } = useSimpleListController('prizes');

    //ordino i premi per valore in SpotCoin
    const sortedAwards = data.sort(function(a, b){return a.cost - b.cost});


    // Memoize dei dati, viene calcolato solo quando cambia isLoading
    // const [leftAwards, rightAwards] = React.useMemo(() => {
    //   const leftAwards = [];
    //   const rightAwards = [];
    //   for(let i = 0; i < data.length; i++){
    //     if (i % 2 === 0){
    //       leftAwards.push(data[i]);
    //     }
    //     else {
    //       rightAwards.push((data[i]));
    //     }
    //   }
    //   return [leftAwards, rightAwards];
    // }, [isLoading]);
    // console.log(leftAwards, rightAwards);

    // const handlePrizePress = (props) => {
    //   props.navigation.navigate("PrizeDetailScreen");
    // };


    return(
      <View style={styles.catalogView}>
        {isLoading
          ? <ActivtyIndicator color='#fff'/>
          : sortedAwards.map((item, index) => (
            <Animatable.View
              style={[styles.gridItem, {marginTop: index % 2 !== 0 ? verticalScale(32) : 0}]}
              delay={32 * index + 1}
              animation="fadeInLeft" useNativeDriver>
              <PrizeCard
                onPress={() => props.navigation.navigate("PrizeDetailScreen", { award: item })}
                award={item}/>
            </Animatable.View>
          ))
        }
      </View>
    )
  };



  const howToEarn = (_props) => {


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
      <View style={styles.container}>
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
              second: howToEarn,
            })}
            renderTabBar={(props) => renderTabBar(props)}
            navigationState={navState}/>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    top: themes.base.deviceDimensions.width/8,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  catalogView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: themes.base.deviceDimensions.height/30
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
  gridItem: {
    margin: 16,
    borderRadius: themes.base.borderRadius*3,
    flexBasis: themes.base.deviceDimensions.width / 2 - scale(16+16) // margini laterali + margini singoli
  }
});

export default CatalogScreen;
