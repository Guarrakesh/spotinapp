import React from "react";
import {StyleSheet, FlatList, View, Animated, Image} from "react-native";
import PropTypes from "prop-types";
import BroadcastFloatingCard from "../BroadcastComponents/BroadcastFloatingCard";
import { withNamespaces } from 'react-i18next';

import { Button, Typography, LoadingView} from '../../components/common';
import themes from "../../styleTheme";
import Icon from 'react-native-vector-icons/Feather';
import Images from "../../assets/images";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const colors = themes.base.colors;
const Fonts = themes.base.fonts;
class BroadcastsList extends React.Component {

  _keyExtractor = (item) => item._id;

  _onItemPress = (broadcast, distance) => {
    this.props.onItemPress(broadcast, distance);
  };


  render(){

    const {
      isLoading,
      data,
      ids,
      refresh,
      isRefreshing,
      onMapPress,
      onContactUsPress,
      onItemPress,
      onFavoritePress,
      style,
      noContent,
      t,
      ...rest} = this.props;


    if (noContent) {
      return (
        <View style={themes.base.noContentView}>
          <Image source={Images.icons.common.link} style={{ height: 64, width: 64}}/>
          <Typography variant="subheading" gutterBottom align={"center"}>{t("browse.noBroadcasts.contactUsCta.title")}</Typography>
          <Typography  style={{margin: 8, color: '000',fontWeight: '900'}}
                       uppercase  gutterBottom align="center">{t("browse.noBroadcasts.contactUsCta.subtitle")}</Typography>
          <Button variant="primary" onPress={onContactUsPress}
                  round uppercase>{t("browse.noBroadcasts.contactUsCta.buttonTitle")}</Button>
        </View>
      )
    }

    const footer = () => {
      if (isLoading){
        return (
          <LoadingView/>
        )
      }
      else {
        return (
          <View style={styles.noFoundView}>
            <Typography variant="body" gutterBottom align={"center"}>{t("browse.noFoundGeneric")}</Typography>
            <Button
              containerStyle={{marginBottom: 8}}
              variant="primary"
              onPress={onContactUsPress}
              round
              uppercase>{t("browse.noBroadcasts.contactUs")}</Button>
            <Typography variant="body" gutterBottom align={"center"}>{t("browse.weFindBusiness")}</Typography>
          </View>
        )
      }

    };

    return (
      <View style={{flex: 1}}>
        <AnimatedFlatList
          {...rest}
          ListFooterComponent={ids.length > 0 ? footer : null}
          scrollEventThrottle={15}
          data={ids}
          refreshing={isRefreshing}
          onRefresh={refresh}
          renderItem={({item, index}) => <BroadcastFloatingCard
            index={index}
            overlayOpacity={0.8}
            titleStyle={{fontSize: 18}}
            elevation={2}
            onPress={() =>  this._onItemPress(data[item], data[item].dist)}
            broadcast={data[item]}/>}
          contentContainerStyle={[styles.container, style]}
        />
        {
          ids.length > 0 ?
            <Button
              disabled={isLoading}
              onPress={() => onMapPress({data, ids})}
              variant="primary"
              containerStyle={styles.mapButton}
              titleStyle={{fontSize: 24}}
            >
              <Icon name="map" size={24} style={{color: themes.base.colors.white.default}}/>
            </Button>: null
        }
      </View>

    );
  }

}

BroadcastsList.propTypes = {
  //screen props
  onItemPress: PropTypes.func.isRequired,
  onScroll: PropTypes.func,
  onMomentumScrollBegin: PropTypes.func,
  onMomentumScrollEnd: PropTypes.func,
  onScrollEndDrag: PropTypes.func,
  style: PropTypes.object,
  onMapPress: PropTypes.func,


  //Controller props
  data: PropTypes.object,
  ids: PropTypes.object,
  isLoading: PropTypes.bool,
  total: PropTypes.number,
  version: PropTypes.number,
  refresh: PropTypes.func,
  isRefreshing: PropTypes.bool,

};
const styles = StyleSheet.create({
  container: {
    marginTop: -20,
    paddingBottom: 80 //l'ultimo viene coperto dal MapButton
  },
  noBroadcastText: {
    marginBottom: 16,
    fontFamily: Fonts.LatoMedium,
    fontSize: 20,
    color: colors.text.default,
    textAlign: 'center'
  },
  contactUsButton: {
    paddingLeft: 48,
    paddingRight: 48,
    borderRadius: 40,
    backgroundColor: colors.white.light,
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 16,
  },
  contactUsButtonText: {
    fontFamily: Fonts.LatoBold,
    fontSize: 18,
    color: colors.accent.default
  },
  mapButton: {
    position: 'absolute',
    width: 54,
    height: 54,
    right: 32,
    bottom: 16,
    borderRadius: 32,
    justifyContent: 'center',
  },
  noFoundView: {
    padding: 8,
    alignItems: "center",
    backgroundColor: themes.base.colors.white.light,
    borderRadius: themes.base.borderRadius,
    margin: 16,
    paddingTop: 8,
    borderWidth: 1,
    borderColor: themes.base.colors.white.divisor
  }
});

export default withNamespaces()(BroadcastsList);
