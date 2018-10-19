import React from "react";
import BroadcastFloatingCard from "../BroadcastComponents/BroadcastFloatingCard";
import {StyleSheet, FlatList, Button, View, Text, Animated, ActivityIndicator} from "react-native";
import PropTypes from "prop-types";
//import broadcasts from "../../api/broadcasts";

import themes from "../../styleTheme";
import {Fonts} from "../../components/common/Fonts";
import Icon from 'react-native-vector-icons/Feather';
import ActionButton from 'react-native-action-button';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);


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
          <Text style={{marginBottom: 16, fontFamily: Fonts.LatoMedium, fontSize: 16}}>Non ci sono locali che trasmettono questo evento</Text>
          <Button
            title={"Contattaci"}
            onPress={() => onContactUsPress()}
          />
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
  }
});

export default BroadcastsList;
