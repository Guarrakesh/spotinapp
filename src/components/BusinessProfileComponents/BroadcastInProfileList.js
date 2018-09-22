import React from 'react';
import BroadcastCardInProfile from './BroadcastCardInProfile';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import broadcasts from "../../api/broadcasts";

const BroadcastInProfileList = (props) => {

  const { broadcasts, onReservePress } = props;

  const broadcastList = broadcasts.map(b =>

    <BroadcastCardInProfile
      key={b._id}
      broadcast={b}
      onReservePress={onReservePress}
    />

  )

  return (
    <View>
      {broadcastList}
    </View>
  );
};


BroadcastCardInProfile.propTypes = {
  broadcasts: PropTypes.array.isRequired,
  onReservePress: PropTypes.func.isRequired
};
export default BroadcastInProfileList;