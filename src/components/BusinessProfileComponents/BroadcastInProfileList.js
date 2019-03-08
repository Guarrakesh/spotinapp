import React from 'react';
import {View, FlatList, Text, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import BroadcastCardInProfile from './BroadcastCardInProfile';
import themes from '../../styleTheme';

class BroadcastInProfileList extends React.Component {

  constructor(){
    super();

  }

  componentDidMount() {
    // let wait = new Promise((resolve) => setTimeout(resolve, 5000));  // Smaller number should work
    // wait.then( () => {
    //   let flist = this.refs.flatList;
    //   console.log("SCROLL TO INDEX");
    //   flist.scrollToIndex({index: 4, animated: true});
    // });


  }


  componentDidUpdate(oldProps) {

    const { isLoading, ids, selectedBroadcast } = this.props;
    // if (oldProps.isLoading && !isLoading && ids.length > 0
    //   && selectedBroadcast) {
    //
    //   this.flatList.scrollToIndex({index: ids.indexOf(selectedBroadcast), animated: true})
    // }

  }



  reorderIds(ids, selectedBroadcast) {

    // this.setState({idsNum: ids.length});

    let selectedIndex = ids.indexOf(selectedBroadcast);
    let temp = ids[selectedIndex];

    for(let i = selectedIndex; i > 0; i--){
      ids[i] = ids[i-1];
    }

    ids[0] = temp;

  }

  render() {

    const {
      selectedBroadcast,
      isLoading,
      data,
      ids,
      refresh,
      isRefreshing,
      onReservePress,
      reservedBroadcasts,
      ref,
      fetchReferences,
      t
    } = this.props;


    if (isLoading) {
      return (
        <View style={{height: themes.base.deviceDimensions.height/2}}>
          <ActivityIndicator size="large" color={themes.base.colors.activityIndicator.default}/>
        </View>
      )
    }


    if(selectedBroadcast && ids[0] !== selectedBroadcast){

      this.reorderIds(ids, selectedBroadcast);
      this.setState({firstLoad: false, idsNum: ids.length});

    }

    return (


        <FlatList
          //ref={ref => this.flatList = ref}
          ref={"flatlist"}
          refreshing={isLoading}
          onRefresh={refresh}
          ListHeaderComponent={
            <Text style={themes.base.inlineListTitleStyle}>
              {ids.length === 0 ? t("browse.businessProfile.noEvents") : t("browse.businessProfile.plannedEvents")}
            </Text>
          }
          getItemLayout={(data, index) => ({ length: 150, offset: 150 * index, index})}
          data={ids}
          renderItem={({item}) =>  <BroadcastCardInProfile
            firstRed={!!selectedBroadcast && item === selectedBroadcast}
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