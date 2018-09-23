import React from 'react';

import BroadcastCard from './BroadcastCard';
import {StyleSheet, FlatList, Animated} from 'react-native';

import Images from '../../assets/images';
import PropTypes from 'prop-types';
//import broadcasts from "../../api/broadcasts";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

//0 prezzo fisso, 1 sconto percentuale, 2 sconto assoluto

class BroadcastsList extends React.Component {

  _keyExtractor = (item) => item._id;

  _onItemPress = (id) => {
    const broadcast = this.props.broadcasts.find(broadcast => broadcast._id === id);

    //cerco tra i businesses quale ha l'id uguale a _id
    this.props.onItemPress(broadcast);
  }

  render(){

    const { broadcasts, style, ...rest} = this.props;
    if (!broadcasts || broadcasts.length <= 0) {
      return null;
    }


    return (
      <AnimatedFlatList
          {...rest}
          scrollEventThrottle={15}
          data={broadcasts}
          renderItem={({item}) => <BroadcastCard
          onItemPress={() => this._onItemPress(item._id)}
          {...item}/>}

        contentContainerStyle={[styles.container, style]}
      />

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
};
const styles = StyleSheet.create({
  container: {

    alignItems: 'stretch',
    flexWrap: 'wrap',
    padding: 8,
  }
});

export default BroadcastsList;
