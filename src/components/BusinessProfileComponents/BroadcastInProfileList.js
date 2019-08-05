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
        <View style={{height: themes.base.deviceDimensions.height/2, marginTop: 16}}>
          <ActivityIndicator size="large" color={themes.base.colors.activityIndicator.default}/>
        </View>
      )
    }


    if(selectedBroadcast && ids[0] !== selectedBroadcast){

      this.reorderIds(ids, selectedBroadcast);
      this.setState({firstLoad: false, idsNum: ids.length});

    }

    //TODO: DA CANCELLARE (prova broadcast senza offerta)
    // const noOfferBroadcast = {
    //   bundle: "5d404a98361f2400204ccf89",
    //   business: "5bbd0a0006bc6d001f2b4f3b",
    //   created_at: "2019-07-30T13:48:15.703Z",
    //   end_at: "2019-08-04T15:00:00.000Z",
    //   event: "5d27485dceef480020fdf5b8",
    //   id: "5d404a9f361f2400204ccfa7",
    //   image_url: [],
    //   newsfeed: 0,
    //   offer: {
    //     // description: "",
    //     // isDefault: false,
    //     // title: "Menù completo",
    //     // type: 0,
    //     // value: 12,
    //     // _id: "5c6aef6d4938dd0021b068fc"
    //   },
    //   reservations: [],
    //   reserved: false,
    //   start_at: "2019-07-25T00:00:00.000Z",
    //   updated_at: "2019-07-30T13:48:15.703Z",
    //   __v: 0,
    //   _id: "5d404a9f361f2400204ccfa7"
    //
    // };
    //
    // ids.push("5d404a9f361f2400204ccfa7");
    // //data.push(noOfferBroadcast);
    //
    // //console.log("IDS:", ids);
    // data["5d404a9f361f2400204ccfa7"] = noOfferBroadcast;

    //TODO: FINO A QUI

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