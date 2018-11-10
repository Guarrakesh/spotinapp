import React from 'react';
import {View, StyleSheet, FlatList, Text, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import BroadcastCardInProfile from './BroadcastCardInProfile';
import broadcasts from "../../api/broadcasts";
import {Fonts} from "../common/Fonts";
import themes from '../../styleTheme';

class BroadcastInProfileList extends React.Component {


  componentDidUpdate(oldProps) {

    const { isLoading, ids, selectedBroadcast } = this.props;
    if (oldProps.isLoading && !isLoading && ids.length > 0
        && selectedBroadcast) {

        this.flatList.scrollToIndex({index: ids.indexOf(selectedBroadcast), animated: true})
    }
  }

  render() {

    const {
        isLoading,
        data,
        ids,
        refresh,
        isRefreshing,
        onReservePress,
        reservedBroadcasts,
        ref,
        t
    } = this.props;


    if (isLoading) {
      return (
          <View>
            <ActivityIndicator size="large" color={themes.base.colors.accent.default}/>
          </View>
      )
    }


    return (
        <FlatList
            ref={ref => this.flatList = ref}
            ListHeaderComponent={
            <Text style={themes.base.inlineListTitleStyle}>
              {ids.length === 0 ? t("browse.businessProfile.noEvents") : t("browse.businessProfile.plannedEvents")}
            </Text>
          }
            getItemLayout={(data, index) => ({ length: 150, offset: 150 * index, index})}
            data={ids}
            renderItem={({item}) =>  <BroadcastCardInProfile
              reserved={reservedBroadcasts.includes(item)}
              broadcast={data[item]}
                onReservePress={() => onReservePress(data[item])}
                />}
        />

    );
  };
}

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
  selectedBroadcast: PropTypes.string,
  reservedBroadcasts: PropTypes.array,
};


export default withNamespaces()(BroadcastInProfileList);