import React from "react";
import BroadcastCard from "./BroadcastCard";
import {StyleSheet, FlatList, Button, View, Text} from "react-native";
import PropTypes from "prop-types";
//import broadcasts from "../../api/broadcasts";

import themes from "../../styleTheme";
import {Fonts} from "../../components/common/Fonts";
import Icon from 'react-native-vector-icons/Feather';
import ActionButton from 'react-native-action-button';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);


class BroadcastsList extends React.Component {

  _keyExtractor = (item) => item._id;

  _onItemPress = (id, record, distance) => {
    this.props.onItemPress(id, record, distance);
  };

  render(){

    const {
        isLoading,
        data,
        ids,
        refresh,
        isRefreshing,
        onMapPress,
        onItemPress,
        onFavoritePress } = this.props;

    if (!isLoading && ids.length === 0) {
      return (<View style={themes.base.noContentView}>
        <Text style={{marginBottom: 16, fontFamily: Fonts.LatoMedium, fontSize: 16}}>Non ci sono locali che trasmettono questo evento</Text>
        <Button title={"Contattaci"}/>
      </View>)
    }


    return (
      <View style={{flex: 1}}>
      <AnimatedFlatList
          {...rest}
          scrollEventThrottle={15}
          data={broadcasts}
          renderItem={({item}) => <BroadcastCard
          onItemPress={() =>  this._onItemPress(item, data[item], data[item].business.dist)}
          {...item}/>}

        contentContainerStyle={[styles.container, style]}
      />

          <ActionButton
              active={ids.length !== 0}
              title=''
              position={"right"}
              buttonColor={themes.base.colors.accent.default}
              size={52}
              offsetY={32}
              onPress={() => onMapPress({data, ids})}
              icon={<Icon name="map" size={24}
                          style={{color: themes.base.colors.white.default}}/>}
          />
        </View>

    );
  }

};

BroadcastsList.propTypes = {
  onItemPress: PropTypes.func.isRequired,
  broadcasts: PropTypes.array,
  onScroll: PropTypes.func,
  onMomentumScrollBegin: PropTypes.func,
  onMomentumScrollEnd: PropTypes.func,
  onScrollEndDrag: PropTypes.func,
  style: PropTypes.object,
  //Controller props
  data: PropTypes.object,
  ids: PropTypes.object,
  isLoading: PropTypes.bool,
  total: PropTypes.number,
  version: PropTypes.number,
  refresh: PropTypes.func,
  isRefreshing: PropTypes.bool,
  onMapPress: PropTypes.func,
};
const styles = StyleSheet.create({
  container: {

    alignItems: 'stretch',
    flexWrap: 'wrap',
    padding: 8,
  }
});

export default BroadcastsList;
