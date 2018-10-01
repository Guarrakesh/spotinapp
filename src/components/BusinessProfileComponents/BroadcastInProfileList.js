import React from 'react';
import BroadcastCardInProfile from './BroadcastCardInProfile';
import {View, StyleSheet, FlatList, Text, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import broadcasts from "../../api/broadcasts";
import {Fonts} from "../common/Fonts";
import themes from '../../styleTheme';

const BroadcastInProfileList = (
    {
        isLoading,
        data,
        ids,
        refresh,
        isRefreshing,
        onReservePress,
        userReservations
    }
) => {

  if (isLoading) {
    return(
      <View>
        <ActivityIndicator size="large" color={themes.base.colors.accent.default}/>
      </View>
    )
  };


  return (
      <FlatList
          ListHeaderComponent={
            <Text style={themes.base.listTitleStyle}>
              {ids.length === 0 ? "Nessuna offerta al momento" : "Eventi in programma"}
            </Text>
          }
          data={ids}
          renderItem={({item}) =>  <BroadcastCardInProfile
              broadcast={data[item]}
                reserved={userReservations.includes(item)}
                onReservePress={() => onReservePress(data[item])}
                />}
          />

            );
          };

  BroadcastInProfileList.propTypes = {

    onReservePress: PropTypes.func.isRequired,
    //Controller props
    data: PropTypes.object,
    ids: PropTypes.object,
    isLoading: PropTypes.bool,
    total: PropTypes.number,
    version: PropTypes.number,
    refresh: PropTypes.func,
    isRefreshing: PropTypes.bool,
  }
  BroadcastCardInProfile.propTypes = {
    broadcasts: PropTypes.array.isRequired,
    onReservePress: PropTypes.func.isRequired
  };

  export default BroadcastInProfileList;