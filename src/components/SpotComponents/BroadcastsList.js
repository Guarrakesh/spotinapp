import React from "react";
import BroadcastFloatingCard from "../BroadcastComponents/BroadcastFloatingCard";
import {StyleSheet, FlatList, View, Text, Animated, ActivityIndicator} from "react-native";
import {Button} from 'react-native-elements';
import PropTypes from "prop-types";
//import broadcasts from "../../api/broadcasts";

import themes from "../../styleTheme";
import {Fonts} from "../../components/common/Fonts";
import Icon from 'react-native-vector-icons/Feather';
import ActionButton from 'react-native-action-button';


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const colors = themes.base.colors;

class BroadcastsList extends React.Component {

  _keyExtractor = (item) => item._id;

  _onItemPress = (id, businessId, distance) => {
    this.props.onItemPress(id, businessId, distance);
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
      ...rest} = this.props;


    if (!isLoading && ids.length === 0) {
      return (
        <View style={themes.base.noContentView}>
          <Text style={styles.noBroadcastText}>Non ci sono locali che trasmettono questo evento...</Text>
          <Button
            title={"Contattaci"}
            titleStyle={styles.contactUsButtonText}
            buttonStyle={[styles.contactUsButton, {borderColor: colors.accent.default}]}
            onPress={() => onContactUsPress()}
          />
          <Text style={styles.noBroadcastText}>...e organizzeremo l'evento per te!</Text>
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
        <AnimatedFlatList
          {...rest}
          scrollEventThrottle={15}
          data={ids}
          renderItem={({item}) => <BroadcastFloatingCard
              overlayOpacity={0.8}
              titleStyle={{fontSize: 18}}
              elevation={2}
              onPress={() =>  this._onItemPress(item, data[item].business, data[item].dist)}
              broadcast={data[item]}/>}

          contentContainerStyle={[styles.container, style]}
        />

        <ActionButton
          active={ids.length !== 0}
          fixNativeFeedbackRadius={true}
          title=''
          position={"right"}
          buttonColor={themes.base.colors.accent.default}
          size={52}
          offsetY={32}
          degrees={0}
          onPress={() => onMapPress({data, ids})}
          renderIcon={() => <Icon name="map" size={24} style={{color: themes.base.colors.white.default}}/>}
        />
      </View>

    );
  }

};

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
  }
});

export default BroadcastsList;
