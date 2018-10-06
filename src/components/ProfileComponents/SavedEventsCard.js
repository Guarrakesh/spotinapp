import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import View from '../../components/common/View';
import {  Text, Image, FlatList, StyleSheet } from 'react-native';
import themes from "../../styleTheme";

import SavedEventView from './SavedEventView';

const SavedEventsCard = ({
  ids,
  data,
  isLoading,
  style,
  onItemPress
}) => {


  return (
    isLoading ?
      null
      : <View style={styles.container} elevation={2}>
        <FlatList
          data={ids}
          renderItem={({item}) =>
            <SavedEventView event={data[item]}/>
          }/>

      </View>
  )
}


const styles = StyleSheet.create({

  container: {
    backgroundColor: themes.base.colors.white.light,
    borderRadius: themes.base.borderRadius,
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 8
  },

})

SavedEventsCard.propTypes = {
  ids: PropTypes.array,
  data: PropTypes.data
};

export default SavedEventsCard;