import React from 'react';
import {Image, StyleSheet, ScrollView} from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {Typography, View} from "../../components/common";
import useSimpleListController from '../../helpers/hooks/useSimpleListController';
import AwardCard from "../../components/GameComponents/AwardCard";
import EarningMethodCard from "../../components/GameComponents/EarningMethodCard";
import themes from "../../newTheme";

const topViewColor = "#3A169E";
const bottomViewColor = "#500F98";
const logoGame = require("../../assets/img/logo-game/logo-game.png");

const earningMethods = [
  {
    image: "https://seeklogo.net/wp-content/uploads/2016/09/facebook-icon-preview-1-400x400.png",
    title: "Seguici su Facebook",
    tag: "@spotin",
    subtitle: "maggiori info",
    profit: 25
  },
  {
    image: "https://www.edigitalagency.com.au/wp-content/uploads/new-instagram-logo-png-transparent-800x799.png",
    title: "Seguici su Instagram",
    tag: "@spotin_sport",
    subtitle: "maggiori info",
    profit: 25
  }
];

const renderCatalogList = (awards) => {

  const leftAwards = [];
  const rightAwards = [];

  for(let i = 0; i < awards.length; i++){
    if (i % 2 === 0){
      leftAwards.push(awards[i]);
    }
    else {
      rightAwards.push((awards[i]));
    }
  }
  return(
    <View style={styles.catalogView}>
      <View>
        {leftAwards.map((item, index) => (
          <AwardCard award={item}/>
        ))}
      </View>
      <View style={{marginTop: 32}}>
        {rightAwards.map((item, index) => (
          <AwardCard award={item}/>
        ))}
      </View>
    </View>
  )
};

const howToEarn = () => {

  return(
    <View>
      <Typography variant={"display1"} style={styles.howToEarn}>Guadagna Spot Coin</Typography>
      <ScrollView style={styles.methodsList} contentContainerStyle={{alignItems: "center"}}>
        {
          earningMethods.map((item, index) => (
            <EarningMethodCard method={item}/>
          ))
        }

      </ScrollView>
    </View>
  )
};

const CatalogScreen = (props) => {
  const [navState, setNavState] = React.useState({
    index: 0,
    routes: [
      { key: 'first', title: 'Catalogo' },
      { key: 'second', title: 'Come guadagnare' },
    ],
  });

  const { isLoading, data} = useSimpleListController('prizes');
  const catalogList = React.useCallback(() => renderCatalogList(data), [isLoading]);

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
        </View>
        <View style={styles.bottomView}/>
        <TabView
            style={styles.tabView}
            activeColor={'red'}
            indicatorStyle={{ color: 'red', backgroundColor: 'red'}}
            indicatorContainerStyle={{ backgroundColor: 'red' }}
            onIndexChange={index => setNavState({...navState,  index })}
            renderScene={SceneMap({
              first: catalogList,
              second: howToEarn,
            })}
            renderTabBar={(props) => renderTabBar(props)}
            navigationState={navState}/>
      </View>
  )

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  logoGame: {
    width: themes.base.deviceDimensions.width/2,
    height: themes.base.deviceDimensions.width/11,
    alignSelf: 'center',
    position: 'absolute',
    top: 8
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: themes.base.deviceDimensions.height/30
  },
  howToEarn: {
    alignSelf: 'center',
    color: 'yellow',
    marginTop: 8
  },
  methodsList: {
    marginTop: themes.base.deviceDimensions.height/10,
    paddingLeft: 32,
    paddingRight: 32
  }
});

export default CatalogScreen;
