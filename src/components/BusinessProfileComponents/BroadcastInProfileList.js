import React from 'react';
import {View, StyleSheet, FlatList, Text, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import BroadcastCardInProfile from './BroadcastCardInProfile';
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
        reservedBroadcasts,
        t
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
            <Text style={themes.base.inlineListTitleStyle}>
              {ids.length === 0 ? t("browse.businessProfile.noEvents") : t("browse.businessProfile.plannedEvents")}
            </Text>
          }
          data={ids}
          renderItem={({item}) =>  <BroadcastCardInProfile
              reserved={reservedBroadcasts.includes(item)}
              broadcast={data[item]}
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

    broadcasts: PropTypes.array.isRequired,

    reservedBroadcasts: PropTypes.array,
  };


  export default withNamespaces()(BroadcastInProfileList);